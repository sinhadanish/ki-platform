'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Card, CardContent } from '@repo/design-system/components/ui/card';
import { CheckCircle, Mail, Send, Heart, Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { subscribeToNewsletter } from '../../actions/early-access';
import { toast } from 'sonner';

interface NewsletterProps {
  dictionary: any;
}

export function Newsletter({ dictionary }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    startTransition(async () => {
      try {
        const result = await subscribeToNewsletter({ 
          email: email.trim(),
          source: 'newsletter_section'
        });
        
        if (result.success) {
          setIsSubscribed(true);
          setEmail('');
          toast.success(result.message);
          
          // Track newsletter signup
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'newsletter_signup', {
              event_category: 'engagement',
              event_label: 'newsletter_section'
            });
          }
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        toast.error('Something went wrong. Please try again.');
      }
    });
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
            <CardContent className="p-8">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">
                {dictionary.newsletter.successTitle}
              </h3>
              <p className="text-green-700 dark:text-green-300">
                We'll share relationship insights, platform updates, and early access opportunities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Newsletter Header */}
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {dictionary.newsletter.title}
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            {dictionary.newsletter.description}
          </p>

          {/* Newsletter Form - Updated to match reference design */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative group">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dictionary.newsletter.inputPlaceholder}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none transition-colors bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  required
                  disabled={isPending}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              <div className="relative group">
                <Button
                  type="submit"
                  disabled={isPending || !email}
                  className="relative group bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 overflow-hidden"
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    <>
                      <span>{dictionary.newsletter.submitButton}</span>
                      <Send className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
                </Button>
              </div>
            </form>
          </div>

          {/* Privacy note */}
          <p className="text-xs text-gray-500 mt-8">
            {dictionary.newsletter.privacy}
          </p>

          {/* Social proof */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            {dictionary.newsletter.socialProof}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;