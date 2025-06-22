
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';
import { Download, TrendingUp, DollarSign, Users, Activity } from 'lucide-react';

interface PortfolioAnalyticsProps {
  portfolioData: any[];
}

const PortfolioAnalytics: React.FC<PortfolioAnalyticsProps> = ({ portfolioData }) => {
  // Mock data for demonstration
  const mockPortfolioData = [
    { name: 'Portfolio A', totalInvestment: 450000, investors: 45, subMarketers: 8, activeInvestments: 38 },
    { name: 'Portfolio B', totalInvestment: 320000, investors: 32, subMarketers: 6, activeInvestments: 28 },
    { name: 'Portfolio C', totalInvestment: 280000, investors: 28, subMarketers: 5, activeInvestments: 22 },
    { name: 'Portfolio D', totalInvestment: 200000, investors: 20, subMarketers: 4, activeInvestments: 18 },
  ];

  const statusData = [
    { name: 'On Hold', value: 142, color: '#3b82f6' },
    { name: 'NCD Conversion', value: 67, color: '#10b981' },
    { name: 'Refunded', value: 25, color: '#ef4444' },
  ];

  const monthlyTrends = [
    { month: 'Jan', investments: 180000, investors: 15 },
    { month: 'Feb', investments: 220000, investors: 22 },
    { month: 'Mar', investments: 280000, investors: 28 },
    { month: 'Apr', investments: 320000, investors: 35 },
    { month: 'May', investments: 450000, investors: 42 },
    { month: 'Jun', investments: 520000, investors: 48 },
  ];

  const chartConfig = {
    totalInvestment: {
      label: 'Total Investment',
      color: '#3b82f6',
    },
    investors: {
      label: 'Investors',
      color: '#10b981',
    },
  };

  const downloadReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalPortfolios: mockPortfolioData.length,
        totalInvestments: mockPortfolioData.reduce((sum, p) => sum + p.totalInvestment, 0),
        totalInvestors: mockPortfolioData.reduce((sum, p) => sum + p.investors, 0),
        totalSubMarketers: mockPortfolioData.reduce((sum, p) => sum + p.subMarketers, 0),
      },
      portfolios: mockPortfolioData,
      statusDistribution: statusData,
      monthlyTrends,
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with Download Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Analytics Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive portfolio performance analysis</p>
        </div>
        <Button onClick={downloadReport} className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download Report</span>
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPortfolioData.length}</div>
            <p className="text-xs text-muted-foreground">Active portfolios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockPortfolioData.reduce((sum, p) => sum + p.totalInvestment, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all portfolios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPortfolioData.reduce((sum, p) => sum + p.investors, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Active investors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Portfolio Size</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(mockPortfolioData.reduce((sum, p) => sum + p.totalInvestment, 0) / mockPortfolioData.length).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Average value</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Investment Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Investment Comparison</CardTitle>
            <CardDescription>Total investment value by portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={mockPortfolioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="totalInvestment" fill="var(--color-totalInvestment)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Investment Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Status Distribution</CardTitle>
            <CardDescription>Current status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Investment Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Investment Trends</CardTitle>
            <CardDescription>Investment growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line 
                  type="monotone" 
                  dataKey="investments" 
                  stroke="var(--color-totalInvestment)" 
                  strokeWidth={2}
                  name="Investment Value"
                />
                <Line 
                  type="monotone" 
                  dataKey="investors" 
                  stroke="var(--color-investors)" 
                  strokeWidth={2}
                  name="Number of Investors"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance Summary</CardTitle>
          <CardDescription>Detailed breakdown by portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Portfolio</th>
                  <th className="text-right p-2">Total Investment</th>
                  <th className="text-right p-2">Investors</th>
                  <th className="text-right p-2">Sub-Marketers</th>
                  <th className="text-right p-2">Active Investments</th>
                  <th className="text-right p-2">Performance</th>
                </tr>
              </thead>
              <tbody>
                {mockPortfolioData.map((portfolio, index) => (
                  <tr key={index} className="border-b hover:bg-slate-50">
                    <td className="p-2 font-medium">{portfolio.name}</td>
                    <td className="p-2 text-right">${portfolio.totalInvestment.toLocaleString()}</td>
                    <td className="p-2 text-right">{portfolio.investors}</td>
                    <td className="p-2 text-right">{portfolio.subMarketers}</td>
                    <td className="p-2 text-right">{portfolio.activeInvestments}</td>
                    <td className="p-2 text-right">
                      <Badge variant={portfolio.activeInvestments > 30 ? "default" : "secondary"}>
                        {portfolio.activeInvestments > 30 ? "High" : "Medium"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioAnalytics;
