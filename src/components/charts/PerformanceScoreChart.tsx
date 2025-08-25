import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PerformanceScoreChartProps {
  data: {
    pageSpeedScores?: {
      mobile?: {
        performance?: number;
        accessibility?: number;
        bestPractices?: number;
        seo?: number;
      };
      desktop?: {
        performance?: number;
        accessibility?: number;
        bestPractices?: number;
        seo?: number;
      };
    };
  };
}

export const PerformanceScoreChart = ({ data }: PerformanceScoreChartProps) => {
  if (!data?.pageSpeedScores) {
    return (
      <div className="h-64 bg-muted/20 brutal-border flex items-center justify-center">
        <p className="font-mono font-bold text-muted-foreground">NO PERFORMANCE DATA</p>
      </div>
    );
  }

  const mobile = data.pageSpeedScores.mobile || {};
  const desktop = data.pageSpeedScores.desktop || {};

  const chartData = [
    {
      metric: 'PERFORMANCE',
      mobile: mobile.performance || 0,
      desktop: desktop.performance || 0,
    },
    {
      metric: 'ACCESSIBILITY',
      mobile: mobile.accessibility || 0,
      desktop: desktop.accessibility || 0,
    },
    {
      metric: 'BEST PRACTICES',
      mobile: mobile.bestPractices || 0,
      desktop: desktop.bestPractices || 0,
    },
    {
      metric: 'SEO',
      mobile: mobile.seo || 0,
      desktop: desktop.seo || 0,
    },
  ];

  const getBarColor = (value: number) => {
    if (value >= 90) return '#4ade80';
    if (value >= 70) return '#fbbf24';
    return '#ef4444';
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background brutal-border p-3 brutal-shadow">
          <p className="font-mono font-black text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-mono text-sm" style={{ color: entry.color }}>
              {entry.dataKey.toUpperCase()}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-background brutal-border p-4">
      <h4 className="font-mono font-black uppercase text-center mb-4 tracking-wider text-sm">
        PAGESPEED PERFORMANCE SCORES
      </h4>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#000000" strokeWidth={1} />
            <XAxis 
              dataKey="metric" 
              tick={{ fontSize: 9, fontFamily: 'monospace', fontWeight: 'bold' }}
              stroke="#000000"
              strokeWidth={2}
              angle={-45}
              textAnchor="end"
              height={40}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fontSize: 9, fontFamily: 'monospace', fontWeight: 'bold' }}
              stroke="#000000"
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="mobile" 
              fill="#7c3aed" 
              stroke="#000000" 
              strokeWidth={2}
              name="Mobile"
            >
              {chartData.map((entry, index) => (
                <Cell key={`mobile-${index}`} fill={getBarColor(entry.mobile)} />
              ))}
            </Bar>
            <Bar 
              dataKey="desktop" 
              fill="#0ea5e9" 
              stroke="#000000" 
              strokeWidth={2}
              name="Desktop"
            >
              {chartData.map((entry, index) => (
                <Cell key={`desktop-${index}`} fill={getBarColor(entry.desktop)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-600 brutal-border"></div>
          <span className="font-mono font-bold text-xs">MOBILE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-sky-500 brutal-border"></div>
          <span className="font-mono font-bold text-xs">DESKTOP</span>
        </div>
      </div>
    </div>
  );
};