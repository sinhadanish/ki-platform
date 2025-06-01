import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const title = 'Start Your Journey with Ki';
const description = 'Begin transforming your relationship with AI-powered intelligence.';
const SignUp = dynamic(() =>
  import('@repo/auth/components/sign-up').then((mod) => mod.SignUp)
);

export const metadata: Metadata = createMetadata({ title, description });

const SignUpPage = () => (
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
      
      {/* Benefits highlight */}
      <div className="mt-4 space-y-3">
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 border border-purple-100 dark:border-purple-800">
            <div className="h-2 w-2 rounded-full bg-purple-500" />
            <span className="text-purple-700 dark:text-purple-300">
              Human-AI-Human relationship framework
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/50 dark:to-purple-950/50 border border-pink-100 dark:border-pink-800">
            <div className="h-2 w-2 rounded-full bg-pink-500" />
            <span className="text-pink-700 dark:text-pink-300">
              Privacy-first with end-to-end encryption
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/50 dark:to-green-950/50 border border-blue-100 dark:border-blue-800">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-blue-700 dark:text-blue-300">
              Real-time conflict resolution & empathy AI
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <SignUp />
    
    {/* Trust indicators */}
    <div className="mt-6 space-y-3">
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Join 3,000+ couples already strengthening their relationships with Ki
        </p>
      </div>
      
      <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span>94% success rate</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span>12 min avg breakthrough</span>
        </div>
      </div>
      
      <div className="text-center pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground">
          By creating an account, you agree to Ki's privacy-first approach to relationship intelligence.
        </p>
      </div>
    </div>
  </>
);

export default SignUpPage;