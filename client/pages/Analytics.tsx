import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Users, Target, MousePointer, Calendar, RefreshCw } from "lucide-react";

interface AnalyticsData {
  total_events: number;
  unique_sessions: number;
  utm_sources: Record<string, number>;
  campaigns: Record<string, number>;
  event_types: Record<string, number>;
  google_ads_clicks: number;
  conversions: number;
  form_submissions: number;
  recent_events: Array<{
    id: string;
    event_type: string;
    utm_source?: string;
    utm_campaign?: string;
    page_url: string;
    timestamp: string;
  }>;
}

interface AnalyticsResponse {
  success: boolean;
  analytics: AnalyticsData;
  date_range: {
    from: string;
    to: string;
    days: number;
  };
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(7);

  const fetchAnalytics = async (selectedDays: number = days) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/tracking/analytics?days=${selectedDays}`);
      const data: AnalyticsResponse = await response.json();
      
      if (data.success) {
        setAnalytics(data.analytics);
        setDateRange(data.date_range);
      } else {
        setError('Failed to fetch analytics data');
      }
    } catch (err) {
      setError('Network error while fetching analytics');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleDaysChange = (newDays: number) => {
    setDays(newDays);
    fetchAnalytics(newDays);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTopEntries = (data: Record<string, number>, limit = 5) => {
    return Object.entries(data)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-gold animate-spin mx-auto mb-4" />
          <p className="text-white/80">Carregando analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => fetchAnalytics()}
            className="bg-gold text-black px-6 py-2 rounded-full hover:bg-gold/90 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <span className="font-playfair font-bold text-black text-xl">LA</span>
              </div>
              <div>
                <h1 className="font-playfair font-bold text-xl text-gold">
                  Analytics Dashboard
                </h1>
                <p className="text-xs text-white/70">Acompanhamento de Campanhas</p>
              </div>
            </Link>

            {/* Date Range Controls */}
            <div className="flex items-center gap-2">
              {[7, 30, 90].map(periodDays => (
                <button
                  key={periodDays}
                  onClick={() => handleDaysChange(periodDays)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    days === periodDays
                      ? 'bg-gold text-black'
                      : 'bg-gray-850 text-white hover:bg-gray-800'
                  }`}
                >
                  {periodDays}d
                </button>
              ))}
              <button
                onClick={() => fetchAnalytics()}
                className="p-2 rounded-full bg-gray-850 hover:bg-gray-800 transition-colors"
                title="Atualizar dados"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          {/* Date Range Info */}
          {dateRange && (
            <div className="mb-8 text-center">
              <p className="text-white/60">
                Dados de {formatDate(dateRange.from)} até {formatDate(dateRange.to)}
                <span className="text-gold ml-2">({dateRange.days} dias)</span>
              </p>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-850 border border-gold/20 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{analytics?.total_events || 0}</p>
                  <p className="text-white/60">Total de Eventos</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-850 border border-gold/20 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{analytics?.unique_sessions || 0}</p>
                  <p className="text-white/60">Sessões Únicas</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-850 border border-gold/20 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{analytics?.conversions || 0}</p>
                  <p className="text-white/60">Conversões</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-850 border border-gold/20 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <MousePointer className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{analytics?.google_ads_clicks || 0}</p>
                  <p className="text-white/60">Cliques Google Ads</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* UTM Sources */}
            <div className="bg-gray-850 border border-gold/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-6 text-gold">Fontes de Tráfego</h3>
              <div className="space-y-4">
                {analytics && getTopEntries(analytics.utm_sources).map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between">
                    <span className="text-white capitalize">{source}</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="bg-gold/20 rounded-full h-2"
                        style={{ 
                          width: `${Math.max(20, (count / Math.max(...Object.values(analytics.utm_sources))) * 100)}px` 
                        }}
                      />
                      <span className="text-gold font-semibold w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaigns */}
            <div className="bg-gray-850 border border-gold/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-6 text-gold">Campanhas</h3>
              <div className="space-y-4">
                {analytics && getTopEntries(analytics.campaigns).map(([campaign, count]) => (
                  <div key={campaign} className="flex items-center justify-between">
                    <span className="text-white truncate max-w-[200px]" title={campaign}>
                      {campaign}
                    </span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="bg-gold/20 rounded-full h-2"
                        style={{ 
                          width: `${Math.max(20, (count / Math.max(...Object.values(analytics.campaigns))) * 100)}px` 
                        }}
                      />
                      <span className="text-gold font-semibold w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="bg-gray-850 border border-gold/20 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-gold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Eventos Recentes
            </h3>
            
            {analytics?.recent_events && analytics.recent_events.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gold/20">
                    <tr className="text-left">
                      <th className="pb-3 text-white/80">Tipo</th>
                      <th className="pb-3 text-white/80">Fonte</th>
                      <th className="pb-3 text-white/80">Campanha</th>
                      <th className="pb-3 text-white/80">Página</th>
                      <th className="pb-3 text-white/80">Data</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {analytics.recent_events.map(event => (
                      <tr key={event.id} className="border-b border-gold/10">
                        <td className="py-3">
                          <span className="bg-gold/20 text-gold px-2 py-1 rounded text-xs font-medium">
                            {event.event_type}
                          </span>
                        </td>
                        <td className="py-3 text-white/80">{event.utm_source || 'direct'}</td>
                        <td className="py-3 text-white/80 truncate max-w-[150px]" title={event.utm_campaign}>
                          {event.utm_campaign || 'none'}
                        </td>
                        <td className="py-3 text-white/80 truncate max-w-[200px]" title={event.page_url}>
                          {event.page_url}
                        </td>
                        <td className="py-3 text-white/60 text-xs">
                          {formatDate(event.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-white/60 text-center py-8">Nenhum evento encontrado para este período.</p>
            )}
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-full font-semibold hover:bg-gold/90 transition-colors"
            >
              Voltar para o Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
