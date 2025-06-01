import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const title = 'Welcome back to Ki';
const description = 'Continue your relationship intelligence journey.';
const SignIn = dynamic(() =>
  import('@repo/auth/components/sign-in').then((mod) => mod.SignIn)
);

export const metadata: Metadata = createMetadata({ title, description });

const SignInPage = () => (
  <>
    <div className="flex flex-col space-y-4 text-center mb-6">
      <div className="space-y-2">
        <h1 className="font-bold text-3xl tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Welcome message */}
      <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border border-purple-100 dark:border-purple-800">
        <p className="text-sm text-purple-700 dark:text-purple-300">
          ✨ Ready to strengthen your relationship with AI-powered insights?
        </p>
      </div>
    </div>
    
    <SignIn />
    
    {/* Additional message */}
    <div className="mt-6 text-center">
      <p className="text-xs text-muted-foreground">
        By continuing, you agree to Ki's commitment to your relationship privacy and growth.
      </p>
    </div>
  </>
);

export default SignInPage;