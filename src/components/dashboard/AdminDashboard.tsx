
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual API calls
  const stats = {
    totalPortfolioManagers: 12,
    totalSubMarketers: 45,
    totalInvestors: 234,
    totalInvestments: 1250000,
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Managers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPortfolioManagers}</div>
            <p className="text-xs text-muted-foreground">Active managers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sub-Marketers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubMarketers}</div>
            <p className="text-xs text-muted-foreground">Total sub-marketers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInvestors}</div>
            <p className="text-xs text-muted-foreground">Active investors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalInvestments.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total portfolio value</p>
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
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>
                Complete overview of the investment banking platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">System Status</p>
                      <p className="text-sm text-muted-foreground">All systems operational</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Online
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p>• New investor registration: John Doe</p>
                        <p>• Investment status updated: $50,000 → NCD Conversion</p>
                        <p>• New sub-marketer added: Sarah Wilson</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Add Portfolio Manager
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Generate Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        System Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio-managers">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Managers</CardTitle>
              <CardDescription>
                Manage portfolio managers and their access
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
                Complete view of all investments across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Comprehensive investments table with search and filtering will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminDashboard;
