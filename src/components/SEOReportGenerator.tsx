import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle, TrendingUp, Globe, Zap, FileText } from 'lucide-react';

interface SEOMetrics {
  overallScore: number;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  issues: string[];
  recommendations: string[];
}

export const SEOReportGenerator = () => {
  const [url, setUrl] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<SEOMetrics | null>(null);
  const { toast } = useToast();

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateMockReport = (): SEOMetrics => {
    return {
      overallScore: Math.floor(Math.random() * 40) + 60,
      performance: Math.floor(Math.random() * 30) + 70,
      accessibility: Math.floor(Math.random() * 25) + 75,
      bestPractices: Math.floor(Math.random() * 20) + 80,
      seo: Math.floor(Math.random() * 35) + 65,
      issues: [
        'Large Cumulative Layout Shift detected',
        'Missing meta descriptions on 12 pages',
        'Images without alt text found',
        'Slow loading JavaScript resources'
      ],
      recommendations: [
        'Optimize images for faster loading',
        'Add structured data markup',
        'Improve mobile responsiveness',
        'Fix broken internal links'
      ]
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "ERROR!",
        description: "ENTER A URL FIRST!",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "INVALID URL!",
        description: "CHECK YOUR URL FORMAT!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('https://as18.app.n8n.cloud/webhook/e467c6e2-7569-4b88-babd-68168939111b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          competitors: competitors,
        }),
      });

      if (response.ok) {
        toast({
          title: "REQUEST SENT!",
          description: "SEO AUDIT INITIATED!",
        });
      } else {
        throw new Error('Failed to send request');
      }
    } catch (error) {
      console.error('Error sending webhook:', error);
      toast({
        title: "ERROR!",
        description: "FAILED TO START AUDIT!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'bg-secondary text-secondary-foreground';
    if (score >= 70) return 'bg-muted text-muted-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* URL Input Form */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-mono font-black uppercase tracking-widest">
            SEO AUDIT GENERATOR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-mono font-bold uppercase tracking-wider">
                WEBSITE URL:
              </label>
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="text-lg"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-mono font-bold uppercase tracking-wider">
                COMPETITORS:
              </label>
              <Input
                type="text"
                value={competitors}
                onChange={(e) => setCompetitors(e.target.value)}
                placeholder="competitor1.com, competitor2.com"
                className="text-lg"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-lg"
              variant="default"
            >
              {isLoading ? "GENERATING REPORT..." : "START SEO AUDIT"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Report Results */}
      {report && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-mono font-black uppercase tracking-widest">
                  OVERALL SCORE
                </h2>
                <div className="text-8xl font-black font-mono">
                  {report.overallScore}
                </div>
                <div className="text-xl font-mono font-bold uppercase tracking-wider">
                  OUT OF 100
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className={getScoreColor(report.performance)}>
              <CardContent className="p-6 text-center space-y-2">
                <Zap className="w-8 h-8 mx-auto" />
                <div className="text-2xl font-black font-mono">{report.performance}</div>
                <div className="text-sm font-mono font-bold uppercase">PERFORMANCE</div>
              </CardContent>
            </Card>

            <Card className={getScoreColor(report.accessibility)}>
              <CardContent className="p-6 text-center space-y-2">
                <CheckCircle className="w-8 h-8 mx-auto" />
                <div className="text-2xl font-black font-mono">{report.accessibility}</div>
                <div className="text-sm font-mono font-bold uppercase">ACCESSIBILITY</div>
              </CardContent>
            </Card>

            <Card className={getScoreColor(report.bestPractices)}>
              <CardContent className="p-6 text-center space-y-2">
                <TrendingUp className="w-8 h-8 mx-auto" />
                <div className="text-2xl font-black font-mono">{report.bestPractices}</div>
                <div className="text-sm font-mono font-bold uppercase">BEST PRACTICES</div>
              </CardContent>
            </Card>

            <Card className={getScoreColor(report.seo)}>
              <CardContent className="p-6 text-center space-y-2">
                <Globe className="w-8 h-8 mx-auto" />
                <div className="text-2xl font-black font-mono">{report.seo}</div>
                <div className="text-sm font-mono font-bold uppercase">SEO</div>
              </CardContent>
            </Card>
          </div>

          {/* Issues & Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-destructive text-destructive-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-mono font-black uppercase">
                  <AlertTriangle className="w-6 h-6" />
                  CRITICAL ISSUES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-3 font-mono font-bold">
                      <span className="text-xl">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-secondary text-secondary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-mono font-black uppercase">
                  <TrendingUp className="w-6 h-6" />
                  RECOMMENDATIONS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3 font-mono font-bold">
                      <span className="text-xl">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" className="flex-1">
              <FileText className="w-5 h-5 mr-2" />
              DOWNLOAD PDF REPORT
            </Button>
            <Button variant="outline" className="flex-1">
              <Globe className="w-5 h-5 mr-2" />
              VIEW HTML REPORT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};