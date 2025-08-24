import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Zap, TrendingUp } from 'lucide-react';

interface AuditItem {
  issue: string;
  recommendation: string;
}

interface AuditSection {
  title: string;
  critical_issues: AuditItem[];
  quick_wins: AuditItem[];
  opportunities: AuditItem[];
}

interface SEOAuditData {
  sections: AuditSection[];
}

interface SEOAuditReportProps {
  data: SEOAuditData;
}

export const SEOAuditReport = ({ data }: SEOAuditReportProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {data.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-8">
          {/* Main Section Title */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-mono font-black uppercase tracking-widest text-foreground mb-4">
              {section.title}
            </h1>
            <div className="h-1 bg-primary w-32 mx-auto"></div>
          </div>

          {/* Sub-Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Critical Issues */}
            <Card className="bg-destructive text-destructive-foreground">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl md:text-2xl font-mono font-black uppercase tracking-wider">
                  <AlertTriangle className="w-8 h-8 flex-shrink-0" />
                  <span>Critical Issues</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.critical_issues.length > 0 ? (
                  section.critical_issues.map((item, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl font-black mt-1">•</span>
                        <div className="space-y-2">
                          <p className="font-mono font-bold text-sm md:text-base">
                            <span className="font-black uppercase tracking-wider">Issue:</span> {item.issue}
                          </p>
                          <p className="font-mono font-bold text-sm md:text-base">
                            <span className="font-black uppercase tracking-wider">Recommendation:</span> {item.recommendation}
                          </p>
                        </div>
                      </div>
                      {index < section.critical_issues.length - 1 && (
                        <div className="h-px bg-destructive-foreground/20 my-4"></div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="font-mono font-bold text-center py-8 text-destructive-foreground/60">
                    NO CRITICAL ISSUES FOUND
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Wins */}
            <Card className="bg-secondary text-secondary-foreground">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl md:text-2xl font-mono font-black uppercase tracking-wider">
                  <Zap className="w-8 h-8 flex-shrink-0" />
                  <span>Quick Wins</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.quick_wins.length > 0 ? (
                  section.quick_wins.map((item, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl font-black mt-1">•</span>
                        <div className="space-y-2">
                          <p className="font-mono font-bold text-sm md:text-base">
                            <span className="font-black uppercase tracking-wider">Issue:</span> {item.issue}
                          </p>
                          <p className="font-mono font-bold text-sm md:text-base">
                            <span className="font-black uppercase tracking-wider">Recommendation:</span> {item.recommendation}
                          </p>
                        </div>
                      </div>
                      {index < section.quick_wins.length - 1 && (
                        <div className="h-px bg-secondary-foreground/20 my-4"></div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="font-mono font-bold text-center py-8 text-secondary-foreground/60">
                    NO QUICK WINS IDENTIFIED
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Opportunities */}
            <Card className="bg-accent text-accent-foreground">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl md:text-2xl font-mono font-black uppercase tracking-wider">
                  <TrendingUp className="w-8 h-8 flex-shrink-0" />
                  <span>Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.opportunities.length > 0 ? (
                  section.opportunities.map((item, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl font-black mt-1">•</span>
                        <div className="space-y-2">
                          <p className="font-mono font-bold text-sm md:text-base">
                            <span className="font-black uppercase tracking-wider">Issue:</span> {item.issue}
                          </p>
                          <p className="font-mono font-bold text-sm md:text-base">
                            <span className="font-black uppercase tracking-wider">Recommendation:</span> {item.recommendation}
                          </p>
                        </div>
                      </div>
                      {index < section.opportunities.length - 1 && (
                        <div className="h-px bg-accent-foreground/20 my-4"></div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="font-mono font-bold text-center py-8 text-accent-foreground/60">
                    NO OPPORTUNITIES FOUND
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};