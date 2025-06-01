'use client';

import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { Heart } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

type AuthLayoutProps = {
  readonly children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Panel - Ki Branding */}
      <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 h-32 w-32 rounded-full bg-white/10 blur-xl animate-pulse" />
          <div className="absolute top-60 right-20 h-24 w-24 rounded-full bg-white/10 blur-xl animate-pulse delay-1000" />
          <div className="absolute bottom-40 left-1/4 h-20 w-20 rounded-full bg-white/10 blur-xl animate-pulse delay-2000" />
        </div>

        {/* Header */}
        <div className={`relative z-20 flex items-center font-bold text-2xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-lg">Ki</span>
            </div>
            <span className="text-white">Ki</span>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex-1 flex items-center justify-center">
          <div className={`text-center max-w-md transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {/* Ki Avatar */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">Ki</span>
                </div>
                {/* Floating hearts */}
                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-pink-400 flex items-center justify-center animate-bounce delay-500">
                  <Heart className="h-3 w-3 text-white fill-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-purple-400 animate-bounce delay-1000" />
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Welcome to Ki
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Your relationship intelligence companion
            </p>
            <p className="text-white/80 leading-relaxed">
              Transform your relationship with AI that understands both partners. 
              Experience empathetic support, conflict resolution, and deeper connection.
            </p>
          </div>
        </div>

        {/* Bottom Testimonial */}
        <div className={`relative z-20 mt-auto transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <blockquote className="space-y-3">
            <p className="text-lg text-white/95">
              &ldquo;Ki helped us understand each other in ways we never thought possible. 
              Our relationship has never been stronger.&rdquo;
            </p>
            <footer className="text-white/80 text-sm">
              — Sarah & Michael, Beta Users
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="lg:p-8 bg-gradient-to-br from-purple-50/30 via-white to-pink-50/30 dark:from-purple-950/30 dark:via-gray-900 dark:to-pink-950/30">
        <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6 min-h-full">
          {/* Mobile Ki Logo */}
          <div className="flex lg:hidden justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Ki</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ki
              </span>
            </div>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;