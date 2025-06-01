'use client';

import { env } from '@/env';
import { Button } from '@repo/design-system/components/ui/button';
import type { Dictionary } from '@repo/internationalization';
import { MoveRight, PhoneCall, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { EmailCaptureModal } from './email-capture-modal';

type CTAProps = {
  dictionary: Dictionary;
};

export const CTA = ({ dictionary }: CTAProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDemoSuccess = (email: string, focusArea?: string) => {
    // Redirect to demo or app after successful email capture
    console.log('Demo access granted for:', email, 'Focus area:', focusArea);
    // You can add analytics tracking here
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'demo_access_granted', {
        event_category: 'conversion',
        event_label: focusArea || 'general',
        custom_parameters: {
          email_captured: true
        }
      });
    }
  };

  return (
    <>
      <div className="w-full py-20 lg:py-40">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-8 rounded-md bg-muted p-4 text-center lg:p-14">
            <div className="flex flex-col gap-2">
              <h3 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">
                {dictionary.web.home.cta.title}
              </h3>
              <p className="max-w-xl text-lg text-muted-foreground leading-relaxed tracking-tight">
                {dictionary.web.home.cta.description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="gap-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-200 transform hover:scale-105" 
                onClick={() => setIsModalOpen(true)}
              >
                <Sparkles className="h-4 w-4" />
                Try Ki Demo
              </Button>
              <Button className="gap-4" variant="outline" asChild>
                <Link href="/contact">
                  {dictionary.web.global.primaryCta}{' '}
                  <PhoneCall className="h-4 w-4" />
                </Link>
              </Button>
              <Button className="gap-4" variant="ghost" asChild>
                <Link href={env.NEXT_PUBLIC_APP_URL}>
                  {dictionary.web.global.secondaryCta}{' '}
                  <MoveRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleDemoSuccess}
      />
    </>
  );
};
