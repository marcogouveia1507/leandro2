/**
 * UTM Parameter Tracking Service
 * Captures and manages Google Ads UTM parameters for campaign tracking
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string; // Google Click ID
  fbclid?: string; // Facebook Click ID
}

export interface TrackingData extends UTMParams {
  timestamp: string;
  page_url: string;
  referrer: string;
  user_agent: string;
  session_id: string;
}

class TrackingService {
  private static instance: TrackingService;
  private sessionId: string;
  private utmParams: UTMParams = {};

  constructor() {
    this.sessionId = this.generateSessionId();
    this.captureUTMParams();
  }

  static getInstance(): TrackingService {
    if (!TrackingService.instance) {
      TrackingService.instance = new TrackingService();
    }
    return TrackingService.instance;
  }

  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Capture UTM parameters from URL
   */
  private captureUTMParams(): void {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    
    // Capture all UTM parameters
    const utmKeys: (keyof UTMParams)[] = [
      'utm_source',
      'utm_medium', 
      'utm_campaign',
      'utm_content',
      'utm_term',
      'gclid',
      'fbclid'
    ];

    utmKeys.forEach(key => {
      const value = urlParams.get(key);
      if (value) {
        this.utmParams[key] = value;
      }
    });

    // Store in localStorage for session persistence
    if (Object.keys(this.utmParams).length > 0) {
      localStorage.setItem('utm_params', JSON.stringify(this.utmParams));
      localStorage.setItem('utm_timestamp', new Date().toISOString());
    }

    // Also check for existing UTM params in localStorage
    const storedParams = localStorage.getItem('utm_params');
    if (storedParams && Object.keys(this.utmParams).length === 0) {
      try {
        this.utmParams = JSON.parse(storedParams);
      } catch (e) {
        console.warn('Failed to parse stored UTM params:', e);
      }
    }
  }

  /**
   * Get current UTM parameters
   */
  getUTMParams(): UTMParams {
    return { ...this.utmParams };
  }

  /**
   * Get complete tracking data
   */
  getTrackingData(): TrackingData {
    return {
      ...this.utmParams,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      session_id: this.sessionId
    };
  }

  /**
   * Track a page view with UTM data
   */
  trackPageView(pageName: string): void {
    const trackingData = this.getTrackingData();
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 Page View Tracked:', {
        page: pageName,
        ...trackingData
      });
    }

    // Send to analytics service
    this.sendToAnalytics('page_view', {
      page_name: pageName,
      ...trackingData
    });
  }

  /**
   * Track a conversion event
   */
  trackConversion(eventName: string, eventData?: Record<string, any>): void {
    const trackingData = this.getTrackingData();
    
    const conversionData = {
      event_name: eventName,
      ...trackingData,
      ...eventData
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 Conversion Tracked:', conversionData);
    }

    // Send to analytics service
    this.sendToAnalytics('conversion', conversionData);
  }

  /**
   * Track form submission
   */
  trackFormSubmission(formName: string, formData?: Record<string, any>): void {
    this.trackConversion('form_submission', {
      form_name: formName,
      ...formData
    });
  }

  /**
   * Track button click
   */
  trackButtonClick(buttonName: string, buttonData?: Record<string, any>): void {
    this.trackConversion('button_click', {
      button_name: buttonName,
      ...buttonData
    });
  }

  /**
   * Send data to analytics service
   */
  private sendToAnalytics(eventType: string, data: any): void {
    // Here you would integrate with your analytics service
    // Examples: Google Analytics 4, Facebook Pixel, etc.
    
    // Google Analytics 4 example:
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventType, {
        ...data,
        custom_parameter_1: data.utm_campaign,
        custom_parameter_2: data.utm_source,
      });
    }

    // Send to your backend API for storage
    this.sendToBackend(eventType, data);
  }

  /**
   * Send tracking data to backend
   */
  private async sendToBackend(eventType: string, data: any): Promise<void> {
    try {
      await fetch('/api/tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: eventType,
          ...data
        })
      });
    } catch (error) {
      console.warn('Failed to send tracking data to backend:', error);
    }
  }

  /**
   * Clear UTM parameters (useful for testing)
   */
  clearUTMParams(): void {
    this.utmParams = {};
    localStorage.removeItem('utm_params');
    localStorage.removeItem('utm_timestamp');
  }

  /**
   * Check if user came from Google Ads
   */
  isFromGoogleAds(): boolean {
    return !!(this.utmParams.gclid || 
             (this.utmParams.utm_source === 'google' && 
              this.utmParams.utm_medium === 'cpc'));
  }

  /**
   * Check if user came from Facebook Ads
   */
  isFromFacebookAds(): boolean {
    return !!(this.utmParams.fbclid || 
             (this.utmParams.utm_source === 'facebook' && 
              this.utmParams.utm_medium === 'cpc'));
  }

  /**
   * Get campaign information
   */
  getCampaignInfo(): {
    source: string;
    medium: string;
    campaign: string;
    isFromAds: boolean;
  } {
    return {
      source: this.utmParams.utm_source || 'direct',
      medium: this.utmParams.utm_medium || 'none',
      campaign: this.utmParams.utm_campaign || 'none',
      isFromAds: this.isFromGoogleAds() || this.isFromFacebookAds()
    };
  }
}

// Export singleton instance
export const tracking = TrackingService.getInstance();

// Export helper hook for React components
export function useTracking() {
  return tracking;
}
