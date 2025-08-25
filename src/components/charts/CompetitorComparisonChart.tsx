import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CompetitorComparisonChartProps {
  data: {
    competitors?: Array<{
      url: string;
      technicalComparison?: {
        pageSpeed?: { theirs: number; yours: number };
        mobileScore?: { theirs: number; yours: number };
        backlinks?: { theirs: number; yours: number };
      };
      keywordGaps?: Array<{ keyword: string; theirPosition: number; yourPosition?: number }>;
    }>;
  };
}

export const CompetitorComparisonChart = ({ data }: CompetitorComparisonChartProps) => {
  if (!data?.competitors?.length) {
    return (
      <div className="h-64 bg-muted/20 brutal-border flex items-center justify-center">
        <p className="font-mono font-bold text-muted-foreground">NO COMPETITOR DATA</p>
      </div>
    );
  }

  // Prepare chart data
  const chartData = data.competitors.slice(0, 3).map((competitor, index) => {
    const tech = competitor.technicalComparison || {};
    const keywordCount = competitor.keywordGaps?.length || 0;
    
    return {
      name: `COMP ${index + 1}`,
      fullName: competitor.url,
      pageSpeed: tech.pageSpeed?.theirs || 0,
      yourPageSpeed: tech.pageSpeed?.yours || 0,
      mobileScore: tech.mobileScore?.theirs || 0,
      yourMobileScore: tech.mobileScore?.yours || 0,
      backlinks: Math.round((tech.backlinks?.theirs || 0) / 1000), // Convert to thousands
      yourBacklinks: Math.round((tech.backlinks?.yours || 0) / 1000),
      keywordGaps: keywordCount,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background brutal-border p-3 brutal-shadow max-w-xs">
          <p className="font-mono font-black text-sm mb-2">{data.fullName}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-mono text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey.includes('backlinks') ? 'K' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-background brutal-border p-4 mb-6">
      <h4 className="font-mono font-black uppercase text-center mb-4 tracking-wider">
        COMPETITOR PERFORMANCE COMPARISON
      </h4>
      
      {/* Chart Container with Fixed Height */}
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#000000" strokeWidth={1} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' }}
              stroke="#000000"
              strokeWidth={2}
              angle={-45}
              textAnchor="end"
              height={40}
            />
            <YAxis 
              tick={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' }}
              stroke="#000000"
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                fontSize: '10px', 
                fontFamily: 'monospace', 
                fontWeight: 'bold',
                textTransform: 'uppercase',
                paddingTop: '10px'
              }}
            />
            
            {/* Page Speed Comparison */}
            <Bar 
              dataKey="pageSpeed" 
              fill="#ef4444" 
              stroke="#000000" 
              strokeWidth={2}
              name="Their PageSpeed"
            />
            <Bar 
              dataKey="yourPageSpeed" 
              fill="#4ade80" 
              stroke="#000000" 
              strokeWidth={2}
              name="Your PageSpeed"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend and Metrics - Separate from chart */}
      <div className="grid grid-cols-2 gap-4 text-xs mt-4">
        <div className="bg-muted/20 p-3 brutal-border">
          <p className="font-mono font-bold mb-2">METRICS COMPARED:</p>
          <p className="font-mono">• Page Speed Scores</p>
          <p className="font-mono">• Mobile Performance</p>
          <p className="font-mono">• Backlink Counts (K)</p>
        </div>
        <div className="bg-muted/20 p-3 brutal-border">
          <p className="font-mono font-bold mb-2">LEGEND:</p>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-red-500 brutal-border"></div>
            <span className="font-mono">COMPETITORS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 brutal-border"></div>
            <span className="font-mono">YOUR SITE</span>
          </div>
        </div>
      </div>
    </div>
  );
};