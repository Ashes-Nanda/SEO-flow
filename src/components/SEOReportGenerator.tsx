import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle, TrendingUp, Globe, Zap, FileText } from 'lucide-react';
import { SEOAuditReport } from '@/components/SEOAuditReport';

interface SEOAuditData {
  sections: Array<{
    title: string;
    critical_issues: Array<{
      issue: string;
      recommendation: string;
    }>;
    quick_wins: Array<{
      issue: string;
      recommendation: string;
    }>;
    opportunities: Array<{
      issue: string;
      recommendation: string;
    }>;
  }>;
}

export const SEOReportGenerator = () => {
  const [url, setUrl] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [auditData, setAuditData] = useState<SEOAuditData | null>(null);
  const { toast } = useToast();

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
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
        const data = await response.json();
        setAuditData(data);
        toast({
          title: "AUDIT COMPLETE!",
          description: "SEO REPORT GENERATED!",
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

      {/* SEO Audit Report Dashboard */}
      {auditData && <SEOAuditReport data={auditData} />}
    </div>
  );
};