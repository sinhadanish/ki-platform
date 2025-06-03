'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KiOnboarding } from '../components/ki-onboarding';

type OnboardingData = {
  name: string;
  age: string;
  location: string;
  relationshipStatus: 'dating' | 'engaged' | 'married' | 'partnered' | '';
  relationshipLength: string;
  goals: string[];
  partnerEmail?: string;
};

export default function OnboardingPage() {
  const router = useRouter();
  const [isCompleting, setIsCompleting] = useState(false);

  const handleOnboardingComplete = async (data: OnboardingData) => {
    setIsCompleting(true);
    
    try {
      // Save onboarding data to backend
      const response = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          age: data.age,
          location: data.location,
          relationshipStatus: data.relationshipStatus,
          relationshipLength: data.relationshipLength,
          goals: data.goals,
          partnerEmail: data.partnerEmail,
          completedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Redirect to main app
        router.push('/');
      } else {
        console.error('Failed to save onboarding data');
        // Still redirect but show error notification
        router.push('/');
      }
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      // Still redirect but show error notification
      router.push('/');
    } finally {
      setIsCompleting(false);
    }
  };

  if (isCompleting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-medium">
            Setting up your Ki experience...
          </p>
        </div>
      </div>
    );
  }

  return <KiOnboarding onComplete={handleOnboardingComplete} />;
}