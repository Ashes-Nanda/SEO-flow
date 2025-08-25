import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface KeywordDistributionChartProps {
  data: {
    topKeywords: Array<{ position: number; keyword: string; volume?: number }>;
  };
}

export const KeywordDistributionChart = ({ data }: KeywordDistributionChartProps) => {
  if (!data?.topKeywords?.length) {
    return (
      <div className="h-64 bg-muted/20 brutal-border flex items-center justify-center">
        <p className="font-mono font-bold text-muted-foreground">NO KEYWORD DATA</p>
      </div>
    );
  }

  const top3 = data.topKeywords.filter(k => k.position <= 3).length;
  const top10 = data.topKeywords.filter(k => k.position <= 10).length - top3;
  const top50 = data.topKeywords.filter(k => k.position <= 50).length - top3 - top10;
  const beyond50 = data.topKeywords.filter(k => k.position > 50).length;

  const chartData = [
    { name: 'TOP 3', value: top3, color: '#4ade80', label: 'EXCELLENT' },
    { name: 'TOP 10', value: top10, color: '#fbbf24', label: 'GOOD' },
    { name: 'TOP 50', value: top50, color: '#f97316', label: 'FAIR' },
    { name: 'BEYOND 50', value: beyond50, color: '#ef4444', label: 'NEEDS WORK' }
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background brutal-border p-3 brutal-shadow">
          <p className="font-mono font-black text-sm">{data.name}</p>
          <p className="font-mono text-sm">Keywords: {data.value}</p>
          <p className="font-mono text-sm text-muted-foreground">{data.label}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-4 h-4 brutal-border" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-mono font-bold text-xs uppercase tracking-wider">
            {entry.value}: {entry.payload.value}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-background brutal-border p-4">
      <h4 className="font-mono font-black uppercase text-center mb-4 tracking-wider text-sm">
        KEYWORD POSITION DISTRIBUTION
      </h4>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={35}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
              stroke="#000000"
              strokeWidth={3}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend payload={chartData.map(item => ({ value: item.name, color: item.color, payload: item }))} />
    </div>
  );
};