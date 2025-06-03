import { env } from '@/env';
import { authMiddleware } from '@repo/auth/middleware';
import { internationalizationMiddleware } from '@repo/internationalization/middleware';
import { parseError } from '@repo/observability/error';
import { secure } from '@repo/security';
import {
  noseconeMiddleware,
  noseconeOptions,
  noseconeOptionsWithToolbar,
} from '@repo/security/middleware';
import {
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from 'next/server';

export const config = {
  // matcher tells Next.js which routes to run the middleware on. This runs the
  // middleware on all routes except for static assets, API routes, server actions, and Posthog ingest
  matcher: ['/((?!api|_next/static|_next/image|ingest|favicon.ico|__nextjs_original-stack-frame).*)'],
};

const securityHeaders = env.FLAGS_SECRET
  ? noseconeMiddleware(noseconeOptionsWithToolbar)
  : noseconeMiddleware(noseconeOptions);

const middleware = (async (request) => {
  // Skip middleware for server actions (Next.js internal routes)
  if (
    request.headers.get('next-action') || 
    request.headers.get('content-type')?.includes('multipart/form-data') ||
    request.headers.get('accept')?.includes('text/x-component')
  ) {
    return;
  }

  // First try i18n middleware
  try {
    const i18nResponse = internationalizationMiddleware(
      request as unknown as NextRequest
    );
    if (i18nResponse) {
      return i18nResponse;
    }
  } catch (error) {
    console.error('Internationalization middleware error:', error);
  }

  // Then run auth middleware
  return authMiddleware(async (_auth, request) => {
    if (!env.ARCJET_KEY) {
      return securityHeaders();
    }

    try {
      await secure(
        [
          // See https://docs.arcjet.com/bot-protection/identifying-bots
          'CATEGORY:SEARCH_ENGINE', // Allow search engines
          'CATEGORY:PREVIEW', // Allow preview links to show OG images
          'CATEGORY:MONITOR', // Allow uptime monitoring services
        ],
        request
      );

      return securityHeaders();
    } catch (error) {
      const message = parseError(error);

      return NextResponse.json({ error: message }, { status: 403 });
    }
  })(request);
}) as unknown as NextMiddleware;

export default middleware;
