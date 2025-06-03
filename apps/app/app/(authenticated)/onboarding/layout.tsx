'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';

type OnboardingLayoutProperties = {
  readonly children: ReactNode;
};

const OnboardingLayout = ({ children }: OnboardingLayoutProperties) => {
  useEffect(() => {
    // Add CSS animations to the document head
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(15px, -8px) scale(1.1); }
        50% { transform: translate(30px, -15px) scale(1.2); }
        75% { transform: translate(15px, -8px) scale(1.1); }
      }
      
      @keyframes float-2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(-10px, 10px) scale(1.05); }
        50% { transform: translate(-20px, 20px) scale(1.1); }
        75% { transform: translate(-10px, 10px) scale(1.05); }
      }
      
      @keyframes breathe {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }
      
      @keyframes fade-in {
        0% { opacity: 0; transform: scale(0.8) translateY(20px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
      
      @keyframes slide-up {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      .animate-float-1 {
        animation: float-1 20s ease-in-out infinite;
      }
      
      .animate-float-2 {
        animation: float-2 20s ease-in-out infinite 5s;
      }
      
      .animate-breathe {
        animation: breathe 8s ease-in-out infinite;
      }
      
      .animate-fade-in {
        animation: fade-in 0.6s ease-out;
      }
      
      .animate-fade-in-delayed {
        animation: fade-in 0.5s ease-out 2s both;
      }
      
      .animate-slide-up {
        animation: slide-up 0.5s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Simple layout for onboarding - no sidebar, no complex layout
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

export default OnboardingLayout;