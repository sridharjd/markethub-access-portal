
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { SubMarketer, InvestmentWithDetails } from '@/types/database';
import { subMarketerAPI, investmentAPI } from '@/services/api';
import SubMarketerList from '@/components/portfolio/SubMarketerList';
import InvestmentTable from '@/components/portfolio/InvestmentTable';
import { Users, DollarSign, TrendingUp } from 'lucide-react';

const PortfolioManagerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [subMarketers, setSubMarketers] = useState<SubMarketer[]>([]);
  const [selectedSubMarketer, setSelectedSubMarketer] = useState<SubMarketer | null>(null);
  const [investments, setInvestments] = useState<InvestmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const loadMockData = () => {
      // Mock sub-marketers
      const mockSubMarketers: SubMarketer[] = [
        {
          sub_marketer_id: 'sm1',
          portfolio_owner_id: user?.portfolio_owner_id || 'pm1',
          name: 'Alice Johnson',
          email: 'alice@example.com',
          phone: '+1-555-0101',
          created_at: '2024-01-15T00:00:00Z',
          status: 'active'
        },
        {
          sub_marketer_id: 'sm2',
          portfolio_owner_id: user?.portfolio_owner_id || 'pm1',
          name: 'Bob Smith',
          email: 'bob@example.com',
          phone: '+1-555-0102',
          created_at: '2024-02-01T00:00:00Z',
          status: 'active'
        },
        {
          sub_marketer_id: 'sm3',
          portfolio_owner_id: user?.portfolio_owner_id || 'pm1',
          name: 'Carol Davis',
          email: 'carol@example.com',
          phone: '+1-555-0103',
          created_at: '2024-02-15T00:00:00Z',
          status: 'active'
        }
      ];

      setSubMarketers(mockSubMarketers);
      setLoading(false);
    };

    loadMockData();
  }, [user]);

  const loadInvestments = async (subMarketerId: string) => {
    try {
      // Mock investments data
      const mockInvestments: InvestmentWithDetails[] = [
        {
          investor_investment_id: 'inv1',
          investor_id: 'i1',
          portfolio_owner_id: user?.portfolio_owner_id || 'pm1',
          sub_marketer_id: subMarketerId,
          amount: 50000,
          invested_date: '2024-01-20T00:00:00Z',
          status: 'on_hold',
          created_at: '2024-01-20T00:00:00Z',
          updated_at: '2024-01-20T00:00:00Z',
          investor_name: 'John Doe',
          investor_email: 'john@example.com',
          sub_marketer_name: selectedSubMarketer?.name || 'Unknown',
          portfolio_owner_name: user?.name || 'Unknown'
        },
        {
          investor_investment_id: 'inv2',
          investor_id: 'i2',
          portfolio_owner_id: user?.portfolio_owner_id || 'pm1',
          sub_marketer_id: subMarketerId,
          amount: 75000,
          invested_date: '2024-02-10T00:00:00Z',
          status: 'ncd_conversion',
          created_at: '2024-02-10T00:00:00Z',
          updated_at: '2024-03-01T00:00:00Z',
          investor_name: 'Jane Smith',
          investor_email: 'jane@example.com',
          sub_marketer_name: selectedSubMarketer?.name || 'Unknown',
          portfolio_owner_name: user?.name || 'Unknown'
        },
        {
          investor_investment_id: 'inv3',
          investor_id: 'i3',
          portfolio_owner_id: user?.portfolio_owner_id || 'pm1',
          sub_marketer_id: subMarketerId,
          amount: 30000,
          invested_date: '2024-03-05T00:00:00Z',
          status: 'refunded',
          created_at: '2024-03-05T00:00:00Z',
          updated_at: '2024-03-10T00:00:00Z',
          investor_name: 'Mike Wilson',
          investor_email: 'mike@example.com',
          sub_marketer_name: selectedSubMarketer?.name || 'Unknown',
          portfolio_owner_name: user?.name || 'Unknown'
        }
      ];

      setInvestments(mockInvestments);
    } catch (error) {
      console.error('Failed to load investments:', error);
    }
  };

  const handleSubMarketerSelect = (subMarketer: SubMarketer) => {
    setSelectedSubMarketer(subMarketer);
    loadInvestments(subMarketer.sub_marketer_id);
  };

  const stats = {
    totalSubMarketers: subMarketers.length,
    totalInvestors: investments.length,
    totalAmount: investments.reduce((sum, inv) => sum + inv.amount, 0),
  };

  if (loading) {
    return (
      <DashboardLayout title="Portfolio Manager Dashboard">
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Portfolio Manager Dashboard">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sub-Marketers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubMarketers}</div>
            <p className="text-xs text-muted-foreground">Under your management</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investors</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInvestors}</div>
            <p className="text-xs text-muted-foreground">
              {selectedSubMarketer ? `Under ${selectedSubMarketer.name}` : 'Select a sub-marketer'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedSubMarketer ? 'For selected sub-marketer' : 'Select a sub-marketer'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sub-Marketers List */}
        <div className="lg:col-span-1">
          <SubMarketerList
            subMarketers={subMarketers}
            selectedSubMarketer={selectedSubMarketer}
            onSubMarketerSelect={handleSubMarketerSelect}
          />
        </div>

        {/* Investments Table */}
        <div className="lg:col-span-2">
          {selectedSubMarketer ? (
            <InvestmentTable
              investments={investments}
              subMarketer={selectedSubMarketer}
              onInvestmentUpdate={(investmentId, status, amount) => {
                // Update investment in the list
                setInvestments(prev => prev.map(inv => 
                  inv.investor_investment_id === investmentId 
                    ? { ...inv, status, amount: amount || inv.amount }
                    : inv
                ));
              }}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Select a Sub-Marketer</CardTitle>
                <CardDescription>
                  Choose a sub-marketer from the list to view their investors and investments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Select a sub-marketer to view detailed investment information
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioManagerDashboard;
