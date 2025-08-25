import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Globe, Mail, Download, Loader2 } from 'lucide-react';
import { KeywordCard } from '@/components/seo-modules/KeywordCard';
import { ContentAuditCard } from '@/components/seo-modules/ContentAuditCard';
import { TechnicalSEOCard } from '@/components/seo-modules/TechnicalSEOCard';
import { BacklinkCard } from '@/components/seo-modules/BacklinkCard';
import { CompetitorCard } from '@/components/seo-modules/CompetitorCard';
import { SEOService } from '@/services/seoService';

interface SEODashboardState {
  isLoading: boolean;
  hasResults: boolean;
  keywordData: any;
  contentData: any;
  technicalData: any;
  backlinkData: any;
  competitorData: any;
  moduleLoadingStates: {
    keywords: boolean;
    content: boolean;
    technical: boolean;
    backlinks: boolean;
    competitors: boolean;
  };
}

export const SEODashboard = () => {
  const [url, setUrl] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [email, setEmail] = useState('');
  const [dashboardState, setDashboardState] = useState<SEODashboardState>({
    isLoading: false,
    hasResults: false,
    keywordData: null,
    contentData: null,
    technicalData: null,
    backlinkData: null,
    competitorData: null,
    moduleLoadingStates: {
      keywords: false,
      content: false,
      technical: false,
      backlinks: false,
      competitors: false,
    }
  });
  const { toast } = useToast();

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const updateModuleLoading = (module: keyof typeof dashboardState.moduleLoadingStates, loading: boolean) => {
    setDashboardState(prev => ({
      ...prev,
      moduleLoadingStates: {
        ...prev.moduleLoadingStates,
        [module]: loading
      }
    }));
  };

  const updateModuleData = (module: string, data: any) => {
    setDashboardState(prev => ({
      ...prev,
      [`${module}Data`]: data
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "ENTER URL!",
        description: "URL FIELD IS REQUIRED",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "INVALID URL!",
        description: "CHECK YOUR URL FORMAT",
        variant: "destructive",
      });
      return;
    }

    setDashboardState(prev => ({ ...prev, isLoading: true, hasResults: true }));
    
    toast({
      title: "AUDIT STARTED!",
      description: "GENERATING SEO REPORT...",
    });

    const competitorUrls = competitors.split(',').map(c => c.trim()).filter(Boolean);

    // Start all modules in parallel
    const modulePromises = [
      // Keywords module
      (async () => {
        updateModuleLoading('keywords', true);
        try {
          const data = await SEOService.getKeywordData(url, competitorUrls);
          updateModuleData('keyword', data);
        } catch (error) {
          console.error('Keywords module error:', error);
          updateModuleData('keyword', { error: 'Failed to load keyword data' });
        } finally {
          updateModuleLoading('keywords', false);
        }
      })(),
      
      // Content module
      (async () => {
        updateModuleLoading('content', true);
        try {
          const data = await SEOService.getContentAudit(url);
          updateModuleData('content', data);
        } catch (error) {
          console.error('Content module error:', error);
          updateModuleData('content', { error: 'Failed to load content data' });
        } finally {
          updateModuleLoading('content', false);
        }
      })(),
      
      // Technical SEO module
      (async () => {
        updateModuleLoading('technical', true);
        try {
          const data = await SEOService.getTechnicalAudit(url);
          updateModuleData('technical', data);
        } catch (error) {
          console.error('Technical module error:', error);
          updateModuleData('technical', { error: 'Failed to load technical data' });
        } finally {
          updateModuleLoading('technical', false);
        }
      })(),
      
      // Backlinks module
      (async () => {
        updateModuleLoading('backlinks', true);
        try {
          const data = await SEOService.getBacklinkData(url);
          updateModuleData('backlink', data);
        } catch (error) {
          console.error('Backlinks module error:', error);
          updateModuleData('backlink', { error: 'Failed to load backlink data' });
        } finally {
          updateModuleLoading('backlinks', false);
        }
      })(),
      
      // Competitors module
      (async () => {
        if (competitorUrls.length > 0) {
          updateModuleLoading('competitors', true);
          try {
            const data = await SEOService.getCompetitorAnalysis(url, competitorUrls);
            updateModuleData('competitor', data);
          } catch (error) {
            console.error('Competitors module error:', error);
            updateModuleData('competitor', { error: 'Failed to load competitor data' });
          } finally {
            updateModuleLoading('competitors', false);
          }
        }
      })()
    ];

    await Promise.allSettled(modulePromises);
    setDashboardState(prev => ({ ...prev, isLoading: false }));
    
    toast({
      title: "AUDIT COMPLETE!",
      description: "ALL MODULES LOADED",
    });
  };

  const handleExportPDF = async () => {
    if (!email.trim()) {
      toast({
        title: "EMAIL REQUIRED!",
        description: "ENTER EMAIL FOR PDF EXPORT",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "EXPORTING PDF...",
        description: "GENERATING REPORT",
      });

      await SEOService.exportPDF({
        url,
        email,
        data: {
          keywords: dashboardState.keywordData,
          content: dashboardState.contentData,
          technical: dashboardState.technicalData,
          backlinks: dashboardState.backlinkData,
          competitors: dashboardState.competitorData,
        }
      });

      toast({
        title: "PDF SENT!",
        description: "CHECK YOUR EMAIL",
      });
    } catch (error) {
      toast({
        title: "EXPORT FAILED!",
        description: "TRY AGAIN LATER",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Input Form */}
      <Card className="bg-card brutal-border brutal-shadow transform -rotate-1">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-3xl font-mono font-black uppercase tracking-widest">
            <Globe className="inline-block mr-3" />
            SEO AUDIT MACHINE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-mono font-black uppercase tracking-wider">
                  WEBSITE URL *
                </label>
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="text-lg brutal-border"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-mono font-black uppercase tracking-wider">
                  COMPETITORS (OPTIONAL)
                </label>
                <Input
                  type="text"
                  value={competitors}
                  onChange={(e) => setCompetitors(e.target.value)}
                  placeholder="competitor1.com, competitor2.com"
                  className="text-lg brutal-border"
                />
              </div>
            </div>

            {dashboardState.hasResults && (
              <div className="space-y-3">
                <label className="block text-sm font-mono font-black uppercase tracking-wider">
                  EMAIL FOR PDF EXPORT
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="text-lg brutal-border"
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={dashboardState.isLoading}
                className="flex-1 h-14 text-lg font-black uppercase tracking-wider brutal-border brutal-shadow"
                variant="default"
              >
                {dashboardState.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    GENERATING...
                  </>
                ) : (
                  "START AUDIT"
                )}
              </Button>

              {dashboardState.hasResults && (
                <Button
                  type="button"
                  onClick={handleExportPDF}
                  className="h-14 text-lg font-black uppercase tracking-wider brutal-border brutal-shadow"
                  variant="secondary"
                >
                  <Download className="mr-2 h-5 w-5" />
                  EXPORT PDF
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Dashboard Cards */}
      {dashboardState.hasResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <KeywordCard 
            data={dashboardState.keywordData} 
            isLoading={dashboardState.moduleLoadingStates.keywords}
          />
          
          <ContentAuditCard 
            data={dashboardState.contentData} 
            isLoading={dashboardState.moduleLoadingStates.content}
          />
          
          <TechnicalSEOCard 
            data={dashboardState.technicalData} 
            isLoading={dashboardState.moduleLoadingStates.technical}
          />
          
          <BacklinkCard 
            data={dashboardState.backlinkData} 
            isLoading={dashboardState.moduleLoadingStates.backlinks}
          />
          
          {competitors && (
            <CompetitorCard 
              data={dashboardState.competitorData} 
              isLoading={dashboardState.moduleLoadingStates.competitors}
              className="lg:col-span-2"
            />
          )}
        </div>
      )}
    </div>
  );
};