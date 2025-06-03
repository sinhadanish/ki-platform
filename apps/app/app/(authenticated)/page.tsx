import { env } from '@/env';
import { auth, currentUser } from '@repo/auth/server';
import { database } from '@repo/database';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound, redirect } from 'next/navigation';
import { AvatarStack } from './components/avatar-stack';
import { Cursors } from './components/cursors';
import { Header } from './components/header';
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
      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <KiAvatar size="medium" state="idle" showSpeechBubble={false} />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Welcome back, {firstName}! 💕
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Ready to strengthen your relationship today?
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                Start Conversation
              </CardTitle>
              <CardDescription>
                Talk with Ki about your relationship
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Begin Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-green-500" />
                Partner Check-in
              </CardTitle>
              <CardDescription>
                See how your partner is feeling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Connect
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Daily Insight
              </CardTitle>
              <CardDescription>
                Personalized relationship tip
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Get Insight
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5 text-pink-500" />
                Relationship Goals
              </CardTitle>
              <CardDescription>
                Track your progress together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                View Goals
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest interactions and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="font-medium">Conversation completed</p>
                  <p className="text-sm text-muted-foreground">Discussed communication styles</p>
                </div>
                <span className="text-sm text-muted-foreground">2h ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="font-medium">Partner checked in</p>
                  <p className="text-sm text-muted-foreground">Shared daily reflection</p>
                </div>
                <span className="text-sm text-muted-foreground">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default App;
