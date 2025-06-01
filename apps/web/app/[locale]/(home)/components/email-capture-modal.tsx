'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { Checkbox } from '@repo/design-system/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/design-system/components/ui/dialog';
import { Card, CardContent } from '@repo/design-system/components/ui/card';
import { 
  Heart, 
  MessageCircle, 
  Users, 
  Rocket, 
  Mail,
  Loader2,
  Sparkles
} from 'lucide-react';
import { useState, useTransition } from 'react';
import { subscribeToDemoAccess, subscribeToNewsletter } from '../../actions/early-access';
import { toast } from 'sonner';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (email: string, focusArea?: string) => void;
}

type FocusArea = 'communication' | 'intimacy' | 'growth';

const focusAreas = [
  {
    id: 'communication' as FocusArea,
    title: 'Better Communication',
    description: 'Learn to express needs and listen deeply',
    icon: MessageCircle,
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'intimacy' as FocusArea,
    title: 'Deeper Intimacy',
    description: 'Build emotional and physical connection',
    icon: Heart,
    color: 'from-pink-500 to-red-500'
  },
  {
    id: 'growth' as FocusArea,
    title: 'Relationship Growth',
    description: 'Evolve together and strengthen your bond',
    icon: Users,
    color: 'from-green-500 to-emerald-500'
  }
];

export function EmailCaptureModal({ 
  isOpen, 
  onClose, 
  onSuccess 
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [selectedFocus, setSelectedFocus] = useState<FocusArea>('communication');
  const [subscribeToNewsletterOpt, setSubscribeToNewsletterOpt] = useState(true);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    startTransition(async () => {
      try {
        // Subscribe to demo access
        const demoResult = await subscribeToDemoAccess(email.trim(), selectedFocus);
        
        // Optionally subscribe to newsletter
        if (subscribeToNewsletterOpt && demoResult.success) {
          await subscribeToNewsletter({ 
            email: email.trim(),
            source: 'demo_modal_newsletter_opt_in'
          });
        }
        
        if (demoResult.success) {
          toast.success(demoResult.message);
          
          // Track demo access request
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'demo_access_requested', {
              event_category: 'engagement',
              event_label: selectedFocus,
              custom_parameters: {
                focus_area: selectedFocus,
                newsletter_opted_in: subscribeToNewsletterOpt
              }
            });
          }
          
          onSuccess?.(email.trim(), selectedFocus);
          onClose();
        } else {
          toast.error(demoResult.message);
        }
      } catch (error) {
        console.error('Demo access error:', error);
        toast.error('Something went wrong. Please try again.');
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Experience Ki's Relationship Intelligence
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Choose your focus area and get instant access to Ki's conversation insights
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Focus Area Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-gray-900 dark:text-white">
              What would you like to focus on first?
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {focusAreas.map((area) => {
                const Icon = area.icon;
                const isSelected = selectedFocus === area.id;
                
                return (
                  <Card
                    key={area.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/20' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setSelectedFocus(area.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`inline-flex p-2 rounded-full bg-gradient-to-r ${area.color} mb-3`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{area.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{area.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-semibold text-gray-900 dark:text-white">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email to get started"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base border-purple-200 dark:border-purple-800 focus:border-purple-500 dark:focus:border-purple-400"
              disabled={isPending}
            />
          </div>

          {/* Newsletter Opt-in */}
          <div className="flex items-start space-x-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <Checkbox
              id="newsletter"
              checked={subscribeToNewsletterOpt}
              onCheckedChange={(checked) => setSubscribeToNewsletterOpt(checked as boolean)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="newsletter" className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">
                Keep me updated with Ki's relationship insights
              </Label>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Get weekly tips, new features, and relationship guidance. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending || !email.trim()}
            className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-200 transform hover:scale-105"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Getting Your Demo Ready...
              </>
            ) : (
              <>
                <Rocket className="h-5 w-5 mr-2" />
                Start My Ki Experience
              </>
            )}
          </Button>

          {/* Privacy Notice */}
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Your email is safe with us. We use it only to provide your Ki experience and 
            send updates if you've opted in. 
            <br />
            <span className="text-purple-600 dark:text-purple-400">No spam, just relationship growth.</span>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EmailCaptureModal;