import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface BacklinkQualityChartProps {
  data: {
    linkQuality?: {
      healthy?: number;
      spam?: number;
      toxic?: number;
    };
    topReferringDomains?: Array<{
      domain: string;
      backlinks: number;
      authority: number;
    }>;
  };
}

export const BacklinkQualityChart = ({ data }: BacklinkQualityChartProps) => {
  if (!data?.linkQuality) {
    return (
      <div className="h-64 bg-muted/20 brutal-border flex items-center justify-center">
        <p className="font-mono font-bold text-muted-foreground">NO BACKLINK DATA</p>
      </div>
    );
  }

  const qualityData = [
    { 
      name: 'HEALTHY', 
      value: data.linkQuality.healthy || 0, 
      color: '#4ade80',
      description: 'High-quality links'
    },
    { 
      name: 'SPAM', 
      value: data.linkQuality.spam || 0, 
      color: '#fbbf24',
      description: 'Low-quality links'
    },
    { 
      name: 'TOXIC', 
      value: data.linkQuality.toxic || 0, 
      color: '#ef4444',
      description: 'Harmful links'
    }
  ];

  const topDomainsData = (data.topReferringDomains || [])
    .slice(0, 5)
    .map(domain => ({
      domain: domain.domain.length > 15 ? domain.domain.substring(0, 15) + '...' : domain.domain,
      fullDomain: domain.domain,
      backlinks: domain.backlinks,
      authority: domain.authority
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background brutal-border p-3 brutal-shadow">
          <p className="font-mono font-black text-sm">{data.name}</p>
          <p className="font-mono text-sm">{data.value}%</p>
          {data.description && (
            <p className="font-mono text-xs text-muted-foreground">{data.description}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const DomainTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background brutal-border p-3 brutal-shadow">
          <p className="font-mono font-black text-sm">{data.fullDomain}</p>
          <p className="font-mono text-sm">Backlinks: {data.backlinks}</p>
          <p className="font-mono text-sm">Authority: {data.authority}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Link Quality Pie Chart */}
      <div className="h-80 bg-background brutal-border p-4">
        <h4 className="font-mono font-black uppercase text-center mb-4 tracking-wider text-sm">
          LINK QUALITY DISTRIBUTION
        </h4>
        <ResponsiveContainer width="100%" height="70%">
          <PieChart>
            <Pie
              data={qualityData}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
              stroke="#000000"
              strokeWidth={3}
            >
              {qualityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-3 mt-2">
          {qualityData.map((entry, index) => (
            <div key={index} className="flex items-center gap-1">
              <div 
                className="w-3 h-3 brutal-border" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-mono font-bold text-xs">
                {entry.name}: {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Domains Bar Chart */}
      <div className="h-80 bg-background brutal-border p-4">
        <h4 className="font-mono font-black uppercase text-center mb-4 tracking-wider text-sm">
          TOP REFERRING DOMAINS
        </h4>
        <ResponsiveContainer width="100%" height="70%">
          <BarChart
            data={topDomainsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#000000" strokeWidth={1} />
            <XAxis 
              dataKey="domain" 
              tick={{ fontSize: 8, fontFamily: 'monospace', fontWeight: 'bold' }}
              stroke="#000000"
              strokeWidth={2}
              angle={-45}
              textAnchor="end"
              height={40}
            />
            <YAxis 
              tick={{ fontSize: 8, fontFamily: 'monospace', fontWeight: 'bold' }}
              stroke="#000000"
              strokeWidth={2}
            />
            <Tooltip content={<DomainTooltip />} />
            <Bar 
              dataKey="backlinks" 
              fill="#7c3aed" 
              stroke="#000000" 
              strokeWidth={2}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="text-center mt-2">
          <span className="font-mono font-bold text-xs text-muted-foreground">
            BACKLINKS PER DOMAIN
          </span>
        </div>
      </div>
    </div>
  );
};