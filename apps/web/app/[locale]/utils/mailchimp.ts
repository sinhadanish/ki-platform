import { env } from '../../../env';
import { Buffer } from 'buffer';

interface MailchimpMember {
  email_address: string;
  status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
  merge_fields?: {
    FNAME?: string;
    LNAME?: string;
  };
  tags?: string[];
}

interface MailchimpResponse {
  success: boolean;
  alreadySubscribed?: boolean;
  error?: string;
}

/**
 * Add a subscriber to Mailchimp audience with Ki-specific tagging
 */
export async function addSubscriberToMailchimp(
  email: string,
  firstName?: string,
  lastName?: string,
  source: string = 'landing_page'
): Promise<MailchimpResponse> {
  try {
    const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID } = env;
    
    if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_AUDIENCE_ID) {
      console.warn('Mailchimp not fully configured, skipping subscription');
      return { success: false, error: 'Mailchimp not configured' };
    }

    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

    const subscriberData: MailchimpMember = {
      email_address: email,
      status: 'subscribed', // Direct subscription without double opt-in
      merge_fields: {
        ...(firstName && { FNAME: firstName }),
        ...(lastName && { LNAME: lastName }),
      },
      tags: [
        'early_access',
        'ki_waitlist',
        `source_${source}`,
        'landing_page_signup'
      ],
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`apikey:${MAILCHIMP_API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify(subscriberData),
    });

    const data = await response.json();

    // Handle successful subscription
    if (response.ok) {
      console.log('Successfully added subscriber to Mailchimp:', email);
      return { success: true };
    }

    // Handle "Member Exists" gracefully
    if (response.status === 400 && data.title === 'Member Exists') {
      console.log('Subscriber already exists in Mailchimp:', email);
      return { success: true, alreadySubscribed: true };
    }

    // Handle other errors
    console.error('Mailchimp API error:', data);
    return { 
      success: false, 
      error: data.detail || data.title || 'Failed to subscribe to newsletter' 
    };

  } catch (error) {
    console.error('Error adding subscriber to Mailchimp:', error);
    return { 
      success: false, 
      error: 'Network error while subscribing to newsletter' 
    };
  }
}

/**
 * Check if Mailchimp is properly configured
 */
export function isMailchimpConfigured(): boolean {
  try {
    const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID } = env;
    return !!(MAILCHIMP_API_KEY && MAILCHIMP_SERVER_PREFIX && MAILCHIMP_AUDIENCE_ID);
  } catch {
    return false;
  }
}

/**
 * Parse a full name into first and last name components
 */
export function parseFullName(fullName?: string): { firstName?: string; lastName?: string } {
  if (!fullName || typeof fullName !== 'string') {
    return {};
  }

  const nameParts = fullName.trim().split(/\s+/);
  
  if (nameParts.length === 0) {
    return {};
  }
  
  if (nameParts.length === 1) {
    return { firstName: nameParts[0] };
  }
  
  // First part is first name, rest is last name
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  
  return { firstName, lastName };
}

/**
 * Update subscriber tags (for segmentation)
 */
export async function updateSubscriberTags(
  email: string,
  tags: string[]
): Promise<MailchimpResponse> {
  try {
    const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID } = env;
    
    if (!isMailchimpConfigured()) {
      return { success: false, error: 'Mailchimp not configured' };
    }

    // Generate MD5 hash of email for Mailchimp member ID
    const crypto = require('crypto');
    const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    
    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${emailHash}/tags`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`apikey:${MAILCHIMP_API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify({
        tags: tags.map(tag => ({ name: tag, status: 'active' }))
      }),
    });

    if (response.ok) {
      return { success: true };
    }

    const data = await response.json();
    return { success: false, error: data.detail || 'Failed to update tags' };

  } catch (error) {
    console.error('Error updating subscriber tags:', error);
    return { success: false, error: 'Network error while updating tags' };
  }
}