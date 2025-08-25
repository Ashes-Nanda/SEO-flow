import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

interface ContentAuditCardProps {
  data: any;
  isLoading: boolean;
}

export const ContentAuditCard = ({ data, isLoading }: ContentAuditCardProps) => {
  if (isLoading) {
    return (
      <Card className="brutal-border brutal-shadow bg-secondary/10 transform -rotate-1">
        <CardHeader className="bg-secondary text-secondary-foreground">
          <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
            <FileText className="inline-block mr-2" />
            CONTENT AUDIT
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="font-mono font-bold uppercase tracking-wider">ANALYZING CONTENT...</p>
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
            <FileText className="inline-block mr-2" />
            CONTENT AUDIT
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

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'opportunity':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card className="brutal-border brutal-shadow bg-secondary/10 transform -rotate-1">
      <CardHeader className="bg-secondary text-secondary-foreground">
        <CardTitle className="text-xl font-mono font-black uppercase tracking-wider">
          <FileText className="inline-block mr-2" />
          CONTENT AUDIT
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Content Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card p-4 brutal-border text-center">
            <div className="text-xl font-black font-mono text-secondary">{data?.wordCount}</div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider">WORDS</div>
          </div>
          <div className="bg-card p-4 brutal-border text-center">
            <div className="text-xl font-black font-mono text-secondary">{data?.readabilityScore}</div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider">READABILITY</div>
          </div>
          <div className="bg-card p-4 brutal-border text-center">
            <div className={`text-xl font-black font-mono ${getGradeColor(data?.contentGrade)}`}>
              {data?.contentGrade}
            </div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider">GRADE</div>
          </div>
        </div>

        {/* Meta Data */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm">META DATA</h4>
          
          <div className="bg-card p-3 brutal-border">
            <div className="flex justify-between items-start mb-1">
              <span className="font-mono font-bold text-sm">TITLE TAG</span>
              <Badge variant={data?.metaData?.title?.status === 'optimal' ? 'default' : 'outline'}>
                {data?.metaData?.title?.length} chars
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {data?.metaData?.title?.content}
            </div>
          </div>

          <div className="bg-card p-3 brutal-border">
            <div className="flex justify-between items-start mb-1">
              <span className="font-mono font-bold text-sm">META DESCRIPTION</span>
              <Badge variant={data?.metaData?.description?.status === 'optimal' ? 'default' : 'outline'}>
                {data?.metaData?.description?.length} chars
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {data?.metaData?.description?.content}
            </div>
          </div>
        </div>

        {/* Content Analysis */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm">ANALYSIS</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-card p-3 brutal-border">
              <div className="font-mono font-bold">KEYWORD DENSITY</div>
              <div className="text-secondary font-black">{data?.contentAnalysis?.keywordDensity}%</div>
            </div>
            <div className="bg-card p-3 brutal-border">
              <div className="font-mono font-bold">INTERNAL LINKS</div>
              <div className="text-secondary font-black">{data?.contentAnalysis?.internalLinks}</div>
            </div>
            <div className="bg-card p-3 brutal-border">
              <div className="font-mono font-bold">EXTERNAL LINKS</div>
              <div className="text-secondary font-black">{data?.contentAnalysis?.externalLinks}</div>
            </div>
            <div className="bg-card p-3 brutal-border">
              <div className="font-mono font-bold">MISSING ALT</div>
              <div className="text-destructive font-black">{data?.contentAnalysis?.imagesWithoutAlt}</div>
            </div>
          </div>
        </div>

        {/* Issues */}
        <div className="space-y-3">
          <h4 className="font-mono font-black uppercase tracking-wider text-sm">ISSUES</h4>
          {data?.issues?.map((issue: any, index: number) => (
            <div key={index} className="bg-card p-3 brutal-border">
              <div className="flex items-start gap-2 mb-2">
                {getIssueIcon(issue.type)}
                <div className="font-mono font-bold text-sm uppercase">{issue.issue}</div>
              </div>
              <div className="text-sm text-muted-foreground pl-6">
                {issue.recommendation}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};