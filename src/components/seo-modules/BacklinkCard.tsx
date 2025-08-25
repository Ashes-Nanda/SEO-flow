import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Link, TrendingUp, Shield } from 'lucide-react';
import { BacklinkQualityChart } from '@/components/charts';

interface BacklinkCardProps {
  data: any;
  isLoading: boolean;
}

export const BacklinkCard = ({ data, isLoading }: BacklinkCardProps) => {
  if (isLoading) {
    return (
      <Card className="brutal-border brutal-shadow bg-green-100 transform -rotate-1">
        <CardHeader className="bg-green-600 text-white">
          <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
            <Link className="inline-block mr-2" />
            BACKLINK PROFILE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="font-mono font-bold uppercase tracking-wider">ANALYZING BACKLINKS...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data?.error) {
    return (
      <Card className="brutal-border brutal-shadow bg-destructive/10 transform -rotate-1">
        <CardHeader className="bg-destructive text-destructive-foreground">
          <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
            <Link className="inline-block mr-2" />
            BACKLINK PROFILE
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

  const getAuthorityColor = (authority: number) => {
    if (authority >= 80) return 'text-green-600';
    if (authority >= 60) return 'text-blue-600';
    if (authority >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="brutal-border brutal-shadow bg-green-100 transform -rotate-1">
      <CardHeader className="bg-green-600 text-white">
        <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
          <Link className="inline-block mr-2" />
          BACKLINK PROFILE
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card p-4 brutal-border text-center">
            <div className="text-xl font-black font-mono text-green-600">
              {data?.totalBacklinks?.toLocaleString()}
            </div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider">BACKLINKS</div>
          </div>
          <div className="bg-card p-4 brutal-border text-center">
            <div className="text-xl font-black font-mono text-green-600">{data?.uniqueDomains}</div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider">DOMAINS</div>
          </div>
          <div className="bg-card p-4 brutal-border text-center">
            <div className="text-xl font-black font-mono text-green-600">{data?.domainAuthority}</div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider">AUTHORITY</div>
          </div>
        </div>

        {/* Backlink Quality Charts */}
        <div className="mb-6">
          <BacklinkQualityChart data={data} />
        </div>

        {/* Top Referring Domains */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm flex items-center">
            <TrendingUp className="mr-2 h-4 w-4" />
            TOP DOMAINS
          </h4>
          {data?.topReferringDomains?.slice(0, 4).map((domain: any, index: number) => (
            <div key={index} className="bg-card p-3 brutal-border flex justify-between items-center">
              <div>
                <div className="font-mono font-bold">{domain.domain}</div>
                <div className="text-sm text-muted-foreground">
                  {domain.backlinks} links • {domain.type}
                </div>
              </div>
              <Badge variant="outline" className={getAuthorityColor(domain.authority)}>
                DA {domain.authority}
              </Badge>
            </div>
          ))}
        </div>

        {/* Anchor Text Distribution */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm">ANCHOR TEXT</h4>
          {data?.anchorTextDistribution?.slice(0, 3).map((anchor: any, index: number) => (
            <div key={index} className="bg-card p-3 brutal-border">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono font-bold text-sm">{anchor.anchor}</span>
                <span className="text-sm font-black">{anchor.percentage}%</span>
              </div>
              <div className="w-full bg-muted h-2 brutal-border">
                <div 
                  className="bg-green-600 h-full" 
                  style={{ width: `${anchor.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Link Quality */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            LINK QUALITY
          </h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-100 p-3 brutal-border text-center">
              <div className="text-lg font-black font-mono text-green-600">
                {data?.linkQuality?.healthy}%
              </div>
              <div className="text-xs font-mono font-bold uppercase">HEALTHY</div>
            </div>
            <div className="bg-yellow-100 p-3 brutal-border text-center">
              <div className="text-lg font-black font-mono text-yellow-600">
                {data?.linkQuality?.spam}%
              </div>
              <div className="text-xs font-mono font-bold uppercase">SPAM</div>
            </div>
            <div className="bg-red-100 p-3 brutal-border text-center">
              <div className="text-lg font-black font-mono text-red-600">
                {data?.linkQuality?.toxic}%
              </div>
              <div className="text-xs font-mono font-bold uppercase">TOXIC</div>
            </div>
          </div>
        </div>

        {/* Opportunities */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm">OPPORTUNITIES</h4>
          {data?.opportunities?.slice(0, 2).map((opp: string, index: number) => (
            <div key={index} className="bg-accent/20 p-3 brutal-border">
              <div className="text-sm font-mono font-bold">{opp}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};