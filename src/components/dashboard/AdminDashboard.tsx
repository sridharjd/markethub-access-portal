
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  UserPlus, 
  FileText, 
  Settings,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual API calls
  const stats = {
    totalPortfolioManagers: 12,
    totalSubMarketers: 45,
    totalInvestors: 234,
    totalInvestments: 1250000,
    monthlyGrowth: {
      portfolioManagers: 8.5,
      subMarketers: 12.3,
      investors: 15.7,
      investments: 22.1
    },
    statusDistribution: {
      onHold: 142,
      ncdConversion: 67,
      refunded: 25
    }
  };

  const recentActivities = [
    {
      id: 1,
      type: 'new_investor',
      description: 'New investor registration: John Doe',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'status_update',
      description: 'Investment status updated: $50,000 → NCD Conversion',
      timestamp: '15 minutes ago',
      status: 'info'
    },
    {
      id: 3,
      type: 'new_sub_marketer',
      description: 'New sub-marketer added: Sarah Wilson',
      timestamp: '1 hour ago',
      status: 'success'
    },
    {
      id: 4,
      type: 'refund',
      description: 'Investment refunded: $25,000 by Portfolio Manager Alex',
      timestamp: '2 hours ago',
      status: 'warning'
    },
    {
      id: 5,
      type: 'new_pm',
      description: 'New Portfolio Manager onboarded: Michael Chen',
      timestamp: '1 day ago',
      status: 'success'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'new_investor':
      case 'new_sub_marketer':
      case 'new_pm':
        return <UserPlus className="h-4 w-4" />;
      case 'status_update':
        return <Activity className="h-4 w-4" />;
      case 'refund':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Managers</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPortfolioManagers}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+{stats.monthlyGrowth.portfolioManagers}%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sub-Marketers</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubMarketers}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+{stats.monthlyGrowth.subMarketers}%</span>
              <span className="ml-1">from last month</span>
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
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+{stats.monthlyGrowth.investors}%</span>
              <span className="ml-1">from last month</span>
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
              <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+{stats.monthlyGrowth.investments}%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio-managers">Portfolio Managers</TabsTrigger>
          <TabsTrigger value="sub-marketers">Sub-Marketers</TabsTrigger>
          <TabsTrigger value="investments">All Investments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Status & Quick Stats */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    <span>System Status</span>
                  </CardTitle>
                  <CardDescription>
                    Real-time platform health and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">API Status</p>
                          <p className="text-sm text-green-700">All systems operational</p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Online
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Database</p>
                          <p className="text-sm text-blue-700">Response time: 45ms</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Optimal
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Status Distribution</CardTitle>
                  <CardDescription>
                    Current breakdown of investment statuses across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">On Hold</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{stats.statusDistribution.onHold} investments</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">NCD Conversion</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{stats.statusDistribution.ncdConversion} investments</span>
                    </div>
                    <Progress value={35} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium">Refunded</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{stats.statusDistribution.refunded} investments</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Recent Activity</span>
                  </CardTitle>
                  <CardDescription>Latest platform activities and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                        <div className={`${getActivityColor(activity.status)} mt-0.5`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 leading-5">
                            {activity.description}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {activity.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription>Frequently used administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Portfolio Manager
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Monthly Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics Dashboard
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    System Configuration
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="portfolio-managers">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Managers</CardTitle>
              <CardDescription>
                Manage portfolio managers and their access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button>Add New Portfolio Manager</Button>
              </div>
              <p className="text-muted-foreground">
                Portfolio managers table will be implemented here with full CRUD operations.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sub-marketers">
          <Card>
            <CardHeader>
              <CardTitle>Sub-Marketers</CardTitle>
              <CardDescription>
                View and manage all sub-marketers across all portfolio managers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Sub-marketers management interface will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments">
          <Card>
            <CardHeader>
              <CardTitle>All Investments</CardTitle>
              <CardDescription>
                Comprehensive view of all investments across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Comprehensive investments table with advanced search and filtering will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminDashboard;
