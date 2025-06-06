import { env } from '@/env';
import { auth, currentUser } from '@repo/auth/server';
import { database } from '@repo/database';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound, redirect } from 'next/navigation';
import { AvatarStack } from './components/avatar-stack';
import { Cursors } from './components/cursors';
import { Header } from './components/header';
import { KiDashboard } from './components/ki-dashboard';
import { KiAvatar } from '@repo/design-system/components/ki-avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/design-system/components/ui/card';
import { Button } from '@repo/design-system/components/ui/button';
import { Heart, MessageCircle, Users, Sparkles } from 'lucide-react';

const title = 'Ki - Relationship Intelligence';
const description = 'Your AI companion for strengthening relationships.';

const CollaborationProvider = dynamic(() =>
  import('./components/collaboration-provider').then(
    (mod) => mod.CollaborationProvider
  )
);

export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  const user = await currentUser();
  const { orgId } = await auth();

  if (!orgId || !user) {
    notFound();
  }

  // Check if user has completed onboarding
  // Temporarily disabled to test onboarding page - enable after testing
  // const hasCompletedOnboarding = user.publicMetadata?.onboardingCompleted || 
  //                                user.privateMetadata?.onboardingCompleted ||
  //                                false;

  // Redirect to onboarding if not completed
  // if (!hasCompletedOnboarding) {
  //   redirect('/onboarding');
  // }

  const firstName = user.firstName || 'there';

  return (
    <>
      <Header pages={['Dashboard', 'Conversations']} page="Dashboard">
        {env.LIVEBLOCKS_SECRET && (
          <CollaborationProvider orgId={orgId}>
            <AvatarStack />
            <Cursors />
          </CollaborationProvider>
        )}
      </Header>
      <KiDashboard firstName={firstName} />
    </>
  );
};

export default App;
