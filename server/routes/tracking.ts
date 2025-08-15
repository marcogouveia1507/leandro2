import { RequestHandler } from "express";
import { z } from "zod";

// Validation schema for tracking data
const TrackingDataSchema = z.object({
  event_type: z.string(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  gclid: z.string().optional(),
  fbclid: z.string().optional(),
  timestamp: z.string(),
  page_url: z.string(),
  referrer: z.string(),
  user_agent: z.string(),
  session_id: z.string(),
  page_name: z.string().optional(),
  event_name: z.string().optional(),
  form_name: z.string().optional(),
  button_name: z.string().optional(),
});

type TrackingData = z.infer<typeof TrackingDataSchema>;

// In-memory storage for demonstration
// In production, you would use a proper database
let trackingEvents: (TrackingData & { id: string })[] = [];

/**
 * Handle tracking data submission
 */
export const handleTracking: RequestHandler = (req, res) => {
  try {
    // Validate request body
    const validatedData = TrackingDataSchema.parse(req.body);
    
    // Generate unique ID
    const id = `track_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store tracking event
    const trackingEvent = {
      id,
      ...validatedData,
      created_at: new Date().toISOString(),
      ip_address: req.ip || req.connection.remoteAddress || 'unknown'
    };
    
    trackingEvents.push(trackingEvent);
    
    // Log for monitoring
    console.log('📊 Tracking Event Received:', {
      event_type: validatedData.event_type,
      utm_source: validatedData.utm_source,
      utm_campaign: validatedData.utm_campaign,
      page_url: validatedData.page_url,
      timestamp: validatedData.timestamp
    });
    
    // In production, you might want to:
    // 1. Save to database
    // 2. Send to external analytics services
    // 3. Process conversion attribution
    // 4. Update campaign performance metrics
    
    res.json({ 
      success: true, 
      id,
      message: 'Tracking data received successfully' 
    });
    
  } catch (error) {
    console.error('❌ Tracking Error:', error);
    
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Invalid tracking data',
        details: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
};

/**
 * Get tracking analytics (for admin dashboard)
 */
export const handleTrackingAnalytics: RequestHandler = (req, res) => {
  try {
    const { days = '7', event_type } = req.query;
    const daysNumber = parseInt(days as string, 10);
    
    // Filter events by date range
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysNumber);
    
    let filteredEvents = trackingEvents.filter(event => {
      const eventDate = new Date(event.created_at || event.timestamp);
      return eventDate >= cutoffDate;
    });
    
    // Filter by event type if specified
    if (event_type) {
      filteredEvents = filteredEvents.filter(event => 
        event.event_type === event_type
      );
    }
    
    // Calculate analytics
    const analytics = {
      total_events: filteredEvents.length,
      unique_sessions: new Set(filteredEvents.map(e => e.session_id)).size,
      
      // UTM Source breakdown
      utm_sources: filteredEvents.reduce((acc, event) => {
        const source = event.utm_source || 'direct';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      
      // Campaign breakdown
      campaigns: filteredEvents.reduce((acc, event) => {
        const campaign = event.utm_campaign || 'none';
        acc[campaign] = (acc[campaign] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      
      // Event type breakdown
      event_types: filteredEvents.reduce((acc, event) => {
        acc[event.event_type] = (acc[event.event_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      
      // Google Ads specific
      google_ads_clicks: filteredEvents.filter(e => 
        e.gclid || (e.utm_source === 'google' && e.utm_medium === 'cpc')
      ).length,
      
      // Conversion events
      conversions: filteredEvents.filter(e => 
        e.event_type === 'conversion'
      ).length,
      
      // Form submissions
      form_submissions: filteredEvents.filter(e => 
        e.event_name === 'form_submission'
      ).length,
      
      // Recent events (last 10)
      recent_events: filteredEvents
        .sort((a, b) => new Date(b.created_at || b.timestamp).getTime() - 
                       new Date(a.created_at || a.timestamp).getTime())
        .slice(0, 10)
        .map(event => ({
          id: event.id,
          event_type: event.event_type,
          utm_source: event.utm_source,
          utm_campaign: event.utm_campaign,
          page_url: event.page_url,
          timestamp: event.timestamp
        }))
    };
    
    res.json({
      success: true,
      analytics,
      date_range: {
        from: cutoffDate.toISOString(),
        to: new Date().toISOString(),
        days: daysNumber
      }
    });
    
  } catch (error) {
    console.error('❌ Analytics Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve analytics'
    });
  }
};

/**
 * Clear tracking data (for testing)
 */
export const handleClearTracking: RequestHandler = (req, res) => {
  try {
    const eventCount = trackingEvents.length;
    trackingEvents = [];
    
    res.json({
      success: true,
      message: `Cleared ${eventCount} tracking events`
    });
    
  } catch (error) {
    console.error('❌ Clear Tracking Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear tracking data'
    });
  }
};
