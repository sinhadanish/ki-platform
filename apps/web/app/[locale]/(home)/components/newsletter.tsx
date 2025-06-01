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
                Welcome to the Ki community! 💜
              </h3>
              <p className="text-green-700 dark:text-green-300">
                You're now subscribed to our newsletter. We'll share relationship insights, 
                platform updates, and early access opportunities.
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
            Stay Connected with Ki
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Get relationship insights, early access to new features, and updates 
            on how Ki is helping couples build stronger connections.
          </p>

          {/* Newsletter Form */}
          <Card className="border-purple-200 dark:border-purple-800 shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base border-purple-200 dark:border-purple-800 focus:border-purple-500 dark:focus:border-purple-400"
                      disabled={isPending}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isPending || !email.trim()}
                    className="h-12 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Subscribe
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 pt-2">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>No spam, just love</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Unsubscribe anytime</span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Social proof */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Join thousands of couples already using Ki to strengthen their relationships
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;