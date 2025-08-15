import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { tracking, UTMParams } from '../lib/tracking';

/**
 * Custom hook for tracking page views and events
 */
export function useTracking() {
  const location = useLocation();

  // Auto-track page views
  useEffect(() => {
    const pageName = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');
    tracking.trackPageView(pageName);
  }, [location]);

  // Tracking functions
  const trackConversion = useCallback((eventName: string, eventData?: Record<string, any>) => {
    tracking.trackConversion(eventName, eventData);
  }, []);

  const trackFormSubmission = useCallback((formName: string, formData?: Record<string, any>) => {
    tracking.trackFormSubmission(formName, formData);
  }, []);

  const trackButtonClick = useCallback((buttonName: string, buttonData?: Record<string, any>) => {
    tracking.trackButtonClick(buttonName, buttonData);
  }, []);

  const getUTMParams = useCallback((): UTMParams => {
    return tracking.getUTMParams();
  }, []);

  const getCampaignInfo = useCallback(() => {
    return tracking.getCampaignInfo();
  }, []);

  const isFromGoogleAds = useCallback((): boolean => {
    return tracking.isFromGoogleAds();
  }, []);

  const isFromFacebookAds = useCallback((): boolean => {
    return tracking.isFromFacebookAds();
  }, []);

  return {
    trackConversion,
    trackFormSubmission,
    trackButtonClick,
    getUTMParams,
    getCampaignInfo,
    isFromGoogleAds,
    isFromFacebookAds
  };
}

/**
 * Hook for tracking button clicks with automatic event binding
 */
export function useTrackButton(buttonName: string, eventData?: Record<string, any>) {
  const { trackButtonClick } = useTracking();

  const handleClick = useCallback(() => {
    trackButtonClick(buttonName, eventData);
  }, [buttonName, eventData, trackButtonClick]);

  return handleClick;
}

/**
 * Hook for tracking form submissions
 */
export function useTrackForm(formName: string) {
  const { trackFormSubmission } = useTracking();

  const handleSubmit = useCallback((formData?: Record<string, any>) => {
    trackFormSubmission(formName, formData);
  }, [formName, trackFormSubmission]);

  return handleSubmit;
}
