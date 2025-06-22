
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PortfolioAnalytics from '@/components/analytics/PortfolioAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  BarChart3,
  Download
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  // Core portfolio stats
  const stats = {
    totalPortfolioManagers: 12,
    totalSubMarketers: 45,
    totalInvestors: 234,
    totalInvestments: 1250000,
    monthlyGrowth: {
      portfolioManagers: 8.5,
      investments: 22.1
    },
    statusDistribution: {
      onHold: 142,
      ncdConversion: 67,
      refunded: 25
    }
  };

  return (
    <DashboardLayout title="Portfolio Analytics Dashboard">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Managers</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPortfolioManagers}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+{stats.monthlyGrowth.portfolioManagers}%</span>
              <span className="ml-1">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sub-Marketers</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubMarketers}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Active across all portfolios
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInvestors}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Platform-wide investor base
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment Value</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalInvestments.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+{stats.monthlyGrowth.investments}%</span>
              <span className="ml-1">this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analytics">Portfolio Analytics</TabsTrigger>
          <TabsTrigger value="status">Investment Status</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <PortfolioAnalytics portfolioData={[]} />
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Investment Status Overview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span>Investment Status Overview</span>
                </CardTitle>
                <CardDescription>
                  Current breakdown of investment statuses across all portfolios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-blue-900">On Hold</p>
                        <p className="text-2xl font-bold text-blue-800">{stats.statusDistribution.onHold}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">60%</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-green-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-900">NCD Conversion</p>
                        <p className="text-2xl font-bold text-green-800">{stats.statusDistribution.ncdConversion}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">29%</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-red-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-900">Refunded</p>
                        <p className="text-2xl font-bold text-red-800">{stats.statusDistribution.refunded}</p>
                      </div>
                      <Badge className="bg-red-100 text-red-800">11%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Reports & Exports</span>
                </CardTitle>
                <CardDescription>Generate and download reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center py-8 text-slate-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                  <p>Use the Analytics tab for detailed reports and download options</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminDashboard;
