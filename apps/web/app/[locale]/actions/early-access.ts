'use server';

import { z } from 'zod';
import { addSubscriberToMailchimp, isMailchimpConfigured, parseFullName } from '../utils/mailchimp';

// Validation schemas
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().optional(),
  source: z.string().default('landing_page'),
});

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  source: z.string().default('newsletter_section'),
});

export interface EarlyAccessFormData {
  email: string;
  name?: string;
  source?: string;
}

export interface NewsletterFormData {
  email: string;
  source?: string;
}

export interface SubscriptionResult {
  success: boolean;
  message: string;
  alreadySubscribed?: boolean;
}

/**
 * Subscribe user to Ki early access list with comprehensive error handling
 */
export async function subscribeToEarlyAccess(formData: EarlyAccessFormData): Promise<SubscriptionResult> {
  try {
    // Validate input data
    const validatedData = emailSchema.parse(formData);
    const { email, name, source } = validatedData;

    // Parse name into components
    const { firstName, lastName } = parseFullName(name);

    let mailchimpSuccess = false;
    let alreadySubscribed = false;

    // Add to Mailchimp (if configured)
    if (isMailchimpConfigured()) {
      try {
        const result = await addSubscriberToMailchimp(email, firstName, lastName, source);
        
        if (result.success) {
          mailchimpSuccess = true;
          alreadySubscribed = result.alreadySubscribed || false;
          
          console.log(`Successfully added ${email} to Mailchimp early access list`);
        } else {
          console.error('Failed to add to Mailchimp:', result.error);
        }
      } catch (error) {
        console.error('Mailchimp integration error:', error);
      }
    } else {
      console.warn('Mailchimp not configured, skipping email list subscription');
    }

    // Return appropriate success/error message
    if (mailchimpSuccess) {
      if (alreadySubscribed) {
        return {
          success: true,
          message: "You're already on our early access list! We'll keep you updated.",
          alreadySubscribed: true,
        };
      } else {
        return {
          success: true,
          message: "🎉 You're now on the Ki early access list! We'll notify you when it's ready.",
        };
      }
    } else {
      return {
        success: false,
        message: "Unable to sign you up right now. Please try again or contact us directly.",
      };
    }

  } catch (error) {
    console.error('Error in subscribeToEarlyAccess:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || 'Please check your email address',
      };
    }

    // Ensure we return a serializable object
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
    };
  }
}

/**
 * Subscribe user to Ki newsletter (simpler version for newsletter section)
 */
export async function subscribeToNewsletter(formData: NewsletterFormData): Promise<SubscriptionResult> {
  try {
    // Validate input data
    const validatedData = newsletterSchema.parse(formData);
    const { email, source } = validatedData;

    let mailchimpSuccess = false;
    let alreadySubscribed = false;

    // Add to Mailchimp (if configured)
    if (isMailchimpConfigured()) {
      try {
        const result = await addSubscriberToMailchimp(email, undefined, undefined, source);
        
        if (result.success) {
          mailchimpSuccess = true;
          alreadySubscribed = result.alreadySubscribed || false;
          
          console.log(`Successfully added ${email} to Mailchimp newsletter list`);
        } else {
          console.error('Failed to add to Mailchimp:', result.error);
        }
      } catch (error) {
        console.error('Mailchimp integration error:', error);
      }
    } else {
      console.warn('Mailchimp not configured, skipping newsletter subscription');
    }

    // Return appropriate success/error message
    if (mailchimpSuccess) {
      if (alreadySubscribed) {
        return {
          success: true,
          message: "You're already subscribed to our newsletter!",
          alreadySubscribed: true,
        };
      } else {
        return {
          success: true,
          message: "📬 Successfully subscribed to the Ki newsletter!",
        };
      }
    } else {
      return {
        success: false,
        message: "Unable to subscribe right now. Please try again.",
      };
    }

  } catch (error) {
    console.error('Error in subscribeToNewsletter:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || 'Please check your email address',
      };
    }

    // Ensure we return a serializable object
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
    };
  }
}

/**
 * Demo access subscription with focus area tracking
 */
export async function subscribeToDemoAccess(
  email: string, 
  focusArea?: string
): Promise<SubscriptionResult> {
  try {
    const formData: EarlyAccessFormData = {
      email,
      source: `demo_access_${focusArea || 'general'}`,
    };

    // Use the early access subscription with demo-specific source
    const result = await subscribeToEarlyAccess(formData);

    // Update message for demo context
    if (result.success && !result.alreadySubscribed) {
      return {
        ...result,
        message: "🚀 Demo access granted! You're now on our early access list too.",
      };
    }

    return result;

  } catch (error) {
    console.error('Error in subscribeToDemoAccess:', error);
    return {
      success: false,
      message: 'Unable to grant demo access right now. Please try again.',
    };
  }
}