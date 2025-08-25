import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, TrendingUp, Search, Target } from 'lucide-react';
import { KeywordDistributionChart } from '@/components/charts';

interface KeywordCardProps {
  data: any;
  isLoading: boolean;
}

export const KeywordCard = ({ data, isLoading }: KeywordCardProps) => {
  if (isLoading) {
    return (
      <Card className="brutal-border brutal-shadow bg-primary/10 transform rotate-1">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
            <Search className="inline-block mr-2" />
            KEYWORD RANKINGS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="font-mono font-bold uppercase tracking-wider">ANALYZING KEYWORDS...</p>
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
            <Search className="inline-block mr-2" />
            KEYWORD RANKINGS
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
    <Card className="brutal-border brutal-shadow bg-primary/10 transform rotate-1">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
          <Search className="inline-block mr-2" />
          KEYWORD RANKINGS
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card p-4 brutal-border">
            <div className="text-2xl font-black font-mono text-primary">{data?.totalKeywords}</div>
            <div className="text-sm font-mono font-bold uppercase tracking-wider">TOTAL KEYWORDS</div>
          </div>
          <div className="bg-card p-4 brutal-border">
            <div className="text-2xl font-black font-mono text-primary">{data?.averagePosition}</div>
            <div className="text-sm font-mono font-bold uppercase tracking-wider">AVG POSITION</div>
          </div>
        </div>

        {/* Keyword Distribution Chart */}
        <div className="mb-6">
          <KeywordDistributionChart data={data} />
        </div>

        {/* Top Keywords */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm">TOP KEYWORDS</h4>
          {data?.topKeywords?.map((keyword: any, index: number) => (
            <div key={index} className="bg-card p-3 brutal-border flex justify-between items-center">
              <div>
                <div className="font-mono font-bold">{keyword.keyword}</div>
                <div className="text-sm text-muted-foreground">
                  Vol: {keyword.volume.toLocaleString()} | Diff: {keyword.difficulty}
                </div>
              </div>
              <Badge variant={keyword.position <= 3 ? "default" : keyword.position <= 10 ? "secondary" : "outline"}>
                #{keyword.position}
              </Badge>
            </div>
          ))}
        </div>

        {/* Opportunities */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm flex items-center">
            <Target className="mr-2 h-4 w-4" />
            OPPORTUNITIES
          </h4>
          {data?.opportunities?.slice(0, 2).map((opp: any, index: number) => (
            <div key={index} className="bg-accent/20 p-3 brutal-border">
              <div className="font-mono font-bold">{opp.keyword}</div>
              <div className="text-sm text-muted-foreground">
                Current: #{opp.currentPosition} | Potential: +{opp.potentialTraffic} traffic
              </div>
              <div className="text-sm font-mono font-bold text-accent mt-1">
                {opp.opportunity}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};