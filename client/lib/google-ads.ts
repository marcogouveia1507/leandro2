/**
 * Google Ads Integration Helper
 * Provides utilities for Google Ads conversion tracking and enhanced conversions
 */

export interface GoogleAdsConfig {
  conversionId: string;
  conversionLabel: string;
  trackingId?: string;
}

// Configuration for Google Ads
// Replace with your actual Google Ads conversion tracking IDs
export const GOOGLE_ADS_CONFIG: GoogleAdsConfig = {
  conversionId: 'AW-XXXXXXXXX', // Replace with your actual conversion ID
  conversionLabel: 'XXXXXXXX', // Replace with your actual conversion label
  trackingId: 'G-XXXXXXXXXX' // Replace with your GA4 tracking ID if using
};

/**
 * Load Google Ads script
 */
export function loadGoogleAdsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    // Check if gtag is already loaded
    if ((window as any).gtag) {
      resolve();
      return;
    }

    // Create script tag
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CONFIG.conversionId}`;
    
    script.onload = () => {
      // Initialize gtag
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function() {
        (window as any).dataLayer.push(arguments);
      };
      
      // Configure Google Ads
      (window as any).gtag('js', new Date());
      (window as any).gtag('config', GOOGLE_ADS_CONFIG.conversionId);
      
      // Configure GA4 if tracking ID is provided
      if (GOOGLE_ADS_CONFIG.trackingId) {
        (window as any).gtag('config', GOOGLE_ADS_CONFIG.trackingId);
      }
      
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Google Ads script'));
    };
    
    document.head.appendChild(script);
  });
}

/**
 * Track Google Ads conversion
 */
export function trackGoogleAdsConversion(
  conversionValue?: number,
  orderId?: string,
  customParams?: Record<string, any>
): void {
  if (typeof window === 'undefined' || !(window as any).gtag) {
    console.warn('Google Ads gtag not loaded');
    return;
  }

  const conversionData: any = {
    send_to: `${GOOGLE_ADS_CONFIG.conversionId}/${GOOGLE_ADS_CONFIG.conversionLabel}`,
    transaction_id: orderId || `conversion_${Date.now()}`,
    ...customParams
  };

  if (conversionValue !== undefined) {
    conversionData.value = conversionValue;
    conversionData.currency = 'BRL';
  }

  // Send conversion event
  (window as any).gtag('event', 'conversion', conversionData);
  
  console.log('🎯 Google Ads Conversion Tracked:', conversionData);
}

/**
 * Track enhanced conversion with customer data
 */
export function trackEnhancedConversion(
  customerData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    address?: {
      street?: string;
      city?: string;
      region?: string;
      postalCode?: string;
      country?: string;
    };
  },
  conversionValue?: number,
  orderId?: string
): void {
  if (typeof window === 'undefined' || !(window as any).gtag) {
    console.warn('Google Ads gtag not loaded');
    return;
  }

  // Hash customer data for privacy
  const enhancedConversionData: any = {
    send_to: `${GOOGLE_ADS_CONFIG.conversionId}/${GOOGLE_ADS_CONFIG.conversionLabel}`,
    transaction_id: orderId || `enhanced_${Date.now()}`,
    user_data: {}
  };

  // Add customer data
  if (customerData.email) {
    enhancedConversionData.user_data.email_address = customerData.email.toLowerCase();
  }
  
  if (customerData.phone) {
    enhancedConversionData.user_data.phone_number = customerData.phone.replace(/\D/g, '');
  }
  
  if (customerData.firstName) {
    enhancedConversionData.user_data.first_name = customerData.firstName.toLowerCase();
  }
  
  if (customerData.lastName) {
    enhancedConversionData.user_data.last_name = customerData.lastName.toLowerCase();
  }

  if (customerData.address) {
    enhancedConversionData.user_data.address = {
      ...(customerData.address.street && { street: customerData.address.street.toLowerCase() }),
      ...(customerData.address.city && { city: customerData.address.city.toLowerCase() }),
      ...(customerData.address.region && { region: customerData.address.region.toLowerCase() }),
      ...(customerData.address.postalCode && { postal_code: customerData.address.postalCode }),
      ...(customerData.address.country && { country: customerData.address.country.toLowerCase() })
    };
  }

  if (conversionValue !== undefined) {
    enhancedConversionData.value = conversionValue;
    enhancedConversionData.currency = 'BRL';
  }

  // Send enhanced conversion
  (window as any).gtag('event', 'conversion', enhancedConversionData);
  
  console.log('🎯 Enhanced Conversion Tracked:', enhancedConversionData);
}

/**
 * Track page view with Google Analytics
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window === 'undefined' || !(window as any).gtag) {
    return;
  }

  (window as any).gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: pagePath,
    page_title: pageTitle || document.title
  });
}

/**
 * Track custom event
 */
export function trackCustomEvent(
  eventName: string,
  parameters?: Record<string, any>
): void {
  if (typeof window === 'undefined' || !(window as any).gtag) {
    return;
  }

  (window as any).gtag('event', eventName, parameters);
}

/**
 * Track form submission
 */
export function trackFormSubmission(
  formName: string,
  conversionValue?: number
): void {
  trackCustomEvent('form_submit', {
    form_name: formName,
    value: conversionValue,
    currency: 'BRL'
  });
}

/**
 * Track button click
 */
export function trackButtonClick(
  buttonName: string,
  location?: string
): void {
  trackCustomEvent('click', {
    button_name: buttonName,
    button_location: location
  });
}

/**
 * Initialize Google Ads tracking
 * Call this in your app initialization
 */
export async function initializeGoogleAds(): Promise<void> {
  try {
    await loadGoogleAdsScript();
    console.log('✅ Google Ads tracking initialized');
  } catch (error) {
    console.error('❌ Failed to initialize Google Ads tracking:', error);
  }
}
