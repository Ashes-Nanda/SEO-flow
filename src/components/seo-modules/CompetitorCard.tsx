import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, Target, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CompetitorComparisonChart } from '@/components/charts';

interface CompetitorCardProps {
  data: any;
  isLoading: boolean;
  className?: string;
}

export const CompetitorCard = ({ data, isLoading, className }: CompetitorCardProps) => {
  if (isLoading) {
    return (
      <Card className={cn("brutal-border brutal-shadow bg-purple-100 transform rotate-1", className)}>
        <CardHeader className="bg-purple-600 text-white">
          <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
            <Users className="inline-block mr-2" />
            COMPETITOR ANALYSIS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="font-mono font-bold uppercase tracking-wider">ANALYZING COMPETITORS...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data?.error) {
    return (
      <Card className={cn("brutal-border brutal-shadow bg-destructive/10 transform rotate-1", className)}>
        <CardHeader className="bg-destructive text-destructive-foreground">
          <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
            <Users className="inline-block mr-2" />
            COMPETITOR ANALYSIS
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

  return (
    <Card className={cn("brutal-border brutal-shadow bg-purple-100 transform rotate-1", className)}>
      <CardHeader className="bg-purple-600 text-white">
        <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
          <Users className="inline-block mr-2" />
          COMPETITOR ANALYSIS
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Competitor Comparison Chart */}
        <div className="mb-6">
          <CompetitorComparisonChart data={data} />
        </div>

        {/* Competitor Breakdown */}
        <div className="space-y-4">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm">COMPETITOR BREAKDOWN</h4>
          {data?.competitors?.map((competitor: any, index: number) => (
            <div key={index} className="bg-card p-4 brutal-border space-y-3">
              <div className="font-mono font-black text-lg text-purple-600">
                {competitor.url}
              </div>
              
              {/* Keyword Gaps */}
              <div className="space-y-2">
                <h5 className="font-mono font-bold uppercase text-sm flex items-center">
                  <Target className="mr-1 h-3 w-3" />
                  KEYWORD GAPS
                </h5>
                {competitor.keywordGaps?.slice(0, 2).map((gap: any, gapIndex: number) => (
                  <div key={gapIndex} className="bg-purple-50 p-2 brutal-border text-sm">
                    <div className="font-mono font-bold">{gap.keyword}</div>
                    <div className="text-muted-foreground">
                      Their: #{gap.theirPosition} | Yours: {gap.yourPosition || 'Not ranking'} | Vol: {gap.volume}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Comparison */}
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-card p-2 brutal-border text-center">
                  <div className="font-mono font-bold text-xs">PAGE SPEED</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-black">{competitor.technicalComparison?.pageSpeed?.theirs}</span>
                    {competitor.technicalComparison?.pageSpeed?.theirs > competitor.technicalComparison?.pageSpeed?.yours ? 
                      <TrendingUp className="h-3 w-3 text-red-500" /> : 
                      <TrendingDown className="h-3 w-3 text-green-500" />
                    }
                    <span className="text-muted-foreground">{competitor.technicalComparison?.pageSpeed?.yours}</span>
                  </div>
                </div>
                <div className="bg-card p-2 brutal-border text-center">
                  <div className="font-mono font-bold text-xs">MOBILE</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-black">{competitor.technicalComparison?.mobileScore?.theirs}</span>
                    {competitor.technicalComparison?.mobileScore?.theirs > competitor.technicalComparison?.mobileScore?.yours ? 
                      <TrendingUp className="h-3 w-3 text-red-500" /> : 
                      <TrendingDown className="h-3 w-3 text-green-500" />
                    }
                    <span className="text-muted-foreground">{competitor.technicalComparison?.mobileScore?.yours}</span>
                  </div>
                </div>
                <div className="bg-card p-2 brutal-border text-center">
                  <div className="font-mono font-bold text-xs">BACKLINKS</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-black">{competitor.technicalComparison?.backlinks?.theirs}</span>
                    {competitor.technicalComparison?.backlinks?.theirs > competitor.technicalComparison?.backlinks?.yours ? 
                      <TrendingUp className="h-3 w-3 text-red-500" /> : 
                      <TrendingDown className="h-3 w-3 text-green-500" />
                    }
                    <span className="text-muted-foreground">{competitor.technicalComparison?.backlinks?.yours}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Gaps */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm">KEY GAPS</h4>
          {data?.overallGaps?.slice(0, 3).map((gap: string, index: number) => (
            <div key={index} className="bg-red-50 p-3 brutal-border">
              <div className="text-sm font-mono font-bold text-red-700">{gap}</div>
            </div>
          ))}
        </div>

        {/* Opportunities */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm">OPPORTUNITIES</h4>
          {data?.opportunities?.slice(0, 3).map((opp: string, index: number) => (
            <div key={index} className="bg-green-50 p-3 brutal-border">
              <div className="text-sm font-mono font-bold text-green-700">{opp}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};