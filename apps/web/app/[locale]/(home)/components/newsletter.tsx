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

          {/* Newsletter Form */}
          <Card className="border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative group">
                    <Input
                      type="email"
                      placeholder={dictionary.newsletter.inputPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 text-base border-2 border-purple-200 dark:border-purple-800 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20 group-hover:border-purple-300 dark:group-hover:border-purple-700"
                      disabled={isPending}
                    />
                    {/* Enhanced focus ring */}
                    <div className="absolute inset-0 rounded-xl border-2 border-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  <div className="relative group">
                    <Button
                      type="submit"
                      disabled={isPending || !email.trim()}
                      className="h-14 px-10 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 hover:from-purple-700 hover:via-purple-600 hover:to-pink-700 text-white font-bold text-base rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-purple-400/30 relative overflow-hidden group"
                    >
                      {/* Enhanced shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                      
                      {/* Button content */}
                      <span className="relative z-10 flex items-center gap-3">
                        {isPending ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Subscribing...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            <span>{dictionary.newsletter.submitButton}</span>
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                </div>
                
                {/* Enhanced trust indicators */}
                <div className="flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400 pt-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-950/20 rounded-full">
                    <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                    <span className="font-medium">No spam, just love</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950/20 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Unsubscribe anytime</span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

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