import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap, Monitor, Smartphone, AlertTriangle } from 'lucide-react';

interface TechnicalSEOCardProps {
  data: any;
  isLoading: boolean;
}

export const TechnicalSEOCard = ({ data, isLoading }: TechnicalSEOCardProps) => {
  if (isLoading) {
    return (
      <Card className="brutal-border brutal-shadow bg-accent/10 transform rotate-1">
        <CardHeader className="bg-accent text-accent-foreground">
          <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
            <Zap className="inline-block mr-2" />
            TECHNICAL SEO
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="font-mono font-bold uppercase tracking-wider">RUNNING TESTS...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data?.error) {
    return (
      <Card className="brutal-border brutal-shadow bg-destructive/10 transform rotate-1">
        <CardHeader className="bg-destructive text-destructive-foreground">
          <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
            <Zap className="inline-block mr-2" />
            TECHNICAL SEO
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="font-mono font-bold text-destructive uppercase tracking-wider">
            {data.error}
          </p>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getVitalStatus = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-500 text-white';
      case 'needs-improvement':
        return 'bg-yellow-500 text-black';
      case 'poor':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="brutal-border brutal-shadow bg-accent/10 transform rotate-1">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
          <Zap className="inline-block mr-2" />
          TECHNICAL SEO
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* PageSpeed Scores */}
        <div className="space-y-4">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm">PAGESPEED SCORES</h4>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Mobile Scores */}
            <div className="bg-card p-4 brutal-border">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="h-4 w-4" />
                <span className="font-mono font-bold uppercase text-sm">MOBILE</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Performance</span>
                  <span className={`font-black ${getScoreColor(data?.pageSpeedScores?.mobile?.performance)}`}>
                    {data?.pageSpeedScores?.mobile?.performance}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Accessibility</span>
                  <span className={`font-black ${getScoreColor(data?.pageSpeedScores?.mobile?.accessibility)}`}>
                    {data?.pageSpeedScores?.mobile?.accessibility}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Best Practices</span>
                  <span className={`font-black ${getScoreColor(data?.pageSpeedScores?.mobile?.bestPractices)}`}>
                    {data?.pageSpeedScores?.mobile?.bestPractices}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>SEO</span>
                  <span className={`font-black ${getScoreColor(data?.pageSpeedScores?.mobile?.seo)}`}>
                    {data?.pageSpeedScores?.mobile?.seo}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Scores */}
            <div className="bg-card p-4 brutal-border">
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="h-4 w-4" />
                <span className="font-mono font-bold uppercase text-sm">DESKTOP</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Performance</span>
                  <span className={`font-black ${getScoreColor(data?.pageSpeedScores?.desktop?.performance)}`}>
                    {data?.pageSpeedScores?.desktop?.performance}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Accessibility</span>
                  <span className={`font-black ${getScoreColor(data?.pageSpeedScores?.desktop?.accessibility)}`}>
                    {data?.pageSpeedScores?.desktop?.accessibility}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Best Practices</span>
                  <span className={`font-black ${getScoreColor(data?.pageSpeedScores?.desktop?.bestPractices)}`}>
                    {data?.pageSpeedScores?.desktop?.bestPractices}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>SEO</span>
                  <span className={`font-black ${getScoreColor(data?.pageSpeedScores?.desktop?.seo)}`}>
                    {data?.pageSpeedScores?.desktop?.seo}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm">CORE WEB VITALS</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card p-3 brutal-border text-center">
              <div className="text-lg font-black font-mono">{data?.coreWebVitals?.lcp?.value}s</div>
              <div className="text-xs font-mono font-bold uppercase">LCP</div>
              <Badge className={`mt-1 ${getVitalStatus(data?.coreWebVitals?.lcp?.status)}`}>
                {data?.coreWebVitals?.lcp?.status}
              </Badge>
            </div>
            <div className="bg-card p-3 brutal-border text-center">
              <div className="text-lg font-black font-mono">{data?.coreWebVitals?.fid?.value}ms</div>
              <div className="text-xs font-mono font-bold uppercase">FID</div>
              <Badge className={`mt-1 ${getVitalStatus(data?.coreWebVitals?.fid?.status)}`}>
                {data?.coreWebVitals?.fid?.status}
              </Badge>
            </div>
            <div className="bg-card p-3 brutal-border text-center">
              <div className="text-lg font-black font-mono">{data?.coreWebVitals?.cls?.value}</div>
              <div className="text-xs font-mono font-bold uppercase">CLS</div>
              <Badge className={`mt-1 ${getVitalStatus(data?.coreWebVitals?.cls?.status)}`}>
                {data?.coreWebVitals?.cls?.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Technical Issues */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm">ISSUES</h4>
          {data?.technicalIssues?.slice(0, 3).map((issue: any, index: number) => (
            <div key={index} className="bg-card p-3 brutal-border">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className={`h-4 w-4 ${
                  issue.type === 'critical' ? 'text-destructive' : 
                  issue.type === 'warning' ? 'text-yellow-500' : 'text-green-500'
                }`} />
                <div className="font-mono font-bold text-sm uppercase">{issue.issue}</div>
              </div>
              <div className="text-sm text-muted-foreground pl-6 mb-1">
                {issue.impact}
              </div>
              <div className="text-sm font-mono font-bold text-accent pl-6">
                {issue.recommendation}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};