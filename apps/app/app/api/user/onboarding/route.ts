import { auth } from '@repo/auth/server';
import { db } from '@repo/database';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      age,
      location,
      relationshipStatus,
      relationshipLength,
      goals,
      partnerEmail,
      completedAt,
    } = body;

    // Validate required fields
    if (!name || !age || !location || !relationshipStatus || !relationshipLength) {
      return NextResponse.json(
        { error: 'Missing required onboarding fields' },
        { status: 400 }
      );
    }

    // Update user record with onboarding data
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        firstName: name,
        onboardingData: {
          age,
          location,
          relationshipStatus,
          relationshipLength,
          goals: goals || [],
          partnerEmail: partnerEmail || null,
          completedAt,
        },
        onboardingCompleted: true,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Onboarding completed successfully',
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        onboardingCompleted: updatedUser.onboardingCompleted,
      }
    });

  } catch (error) {
    console.error('Onboarding API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}