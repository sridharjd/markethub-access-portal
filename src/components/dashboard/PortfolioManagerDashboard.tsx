
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SubMarketerList from '@/components/portfolio/SubMarketerList';
import InvestmentTable from '@/components/portfolio/InvestmentTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { subMarketerAPI, investmentAPI } from '@/services/api';
import { SubMarketer, InvestmentWithDetails } from '@/types/database';
import { useQuery } from '@tanstack/react-query';
import { DollarSign, TrendingUp, Users, Activity } from 'lucide-react';

const PortfolioManagerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedSubMarketer, setSelectedSubMarketer] = useState<SubMarketer | null>(null);
  const [investments, setInvestments] = useState<InvestmentWithDetails[]>([]);

  // Fetch sub-marketers for this portfolio manager
  const { data: subMarketers = [], isLoading: isLoadingSubMarketers } = useQuery({
    queryKey: ['subMarketers', user?.portfolio_owner_id],
    queryFn: () => user?.portfolio_owner_id ? subMarketerAPI.getByPortfolioOwner(user.portfolio_owner_id) : Promise.resolve([]),
    enabled: !!user?.portfolio_owner_id,
  });

  // Fetch investments for the portfolio manager
  const { data: allInvestments = [], isLoading: isLoadingInvestments } = useQuery({
    queryKey: ['investments', user?.portfolio_owner_id],
    queryFn: () => user?.portfolio_owner_id ? investmentAPI.getByPortfolioOwner(user.portfolio_owner_id) : Promise.resolve([]),
    enabled: !!user?.portfolio_owner_id,
  });

  // Filter investments based on selected sub-marketer
  useEffect(() => {
    if (selectedSubMarketer) {
      const filteredInvestments = allInvestments.filter(
        inv => inv.sub_marketer_id === selectedSubMarketer.sub_marketer_id
      );
      setInvestments(filteredInvestments);
    } else {
      setInvestments(allInvestments);
    }
  }, [selectedSubMarketer, allInvestments]);

  // Calculate stats
  const stats = {
    totalSubMarketers: subMarketers.length,
    totalInvestors: new Set(investments.map(inv => inv.investor_id)).size,
    totalInvestments: investments.reduce((sum, inv) => sum + inv.amount, 0),
    activeInvestments: investments.filter(inv => inv.status !== 'refunded').length,
  };

  const handleStatusUpdate = async (investment: InvestmentWithDetails, newStatus: 'refunded' | 'on_hold' | 'ncd_conversion', newAmount?: number) => {
    try {
      // Update the investment status
      await investmentAPI.updateStatus(
        investment.investor_investment_id, 
        newStatus, 
        newAmount
      );

      // Update local state
      setInvestments(prev => 
        prev.map(inv => 
          inv.investor_investment_id === investment.investor_investment_id
            ? { 
                ...inv, 
                status: newStatus,
                amount: newAmount || inv.amount,
                updated_at: new Date().toISOString()
              }
            : inv
        )
      );

      console.log('Investment status updated successfully');
    } catch (error) {
      console.error('Failed to update investment status:', error);
    }
  };

  const handleInvestmentUpdate = (investmentId: string, status: string, amount?: number) => {
    const investment = investments.find(inv => inv.investor_investment_id === investmentId);
    if (investment) {
      handleStatusUpdate(investment, status as 'refunded' | 'on_hold' | 'ncd_conversion', amount);
    }
  };

  if (isLoadingSubMarketers || isLoadingInvestments) {
    return (
      <DashboardLayout title="Portfolio Manager Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Portfolio Manager Dashboard">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInvestors}</div>
            <p className="text-xs text-muted-foreground">Across all sub-marketers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalInvestments.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Portfolio value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeInvestments}</div>
            <p className="text-xs text-muted-foreground">Non-refunded investments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sub-Marketers List */}
        <div className="lg:col-span-1">
          <SubMarketerList
            subMarketers={subMarketers}
            selectedSubMarketer={selectedSubMarketer}
            onSubMarketerSelect={setSelectedSubMarketer}
          />
        </div>

        {/* Investments Table */}
        <div className="lg:col-span-3">
          {selectedSubMarketer ? (
            <InvestmentTable
              investments={investments}
              subMarketer={selectedSubMarketer}
              onInvestmentUpdate={handleInvestmentUpdate}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>All Investments</CardTitle>
                <CardDescription>
                  Select a sub-marketer to view their specific investments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">
                  <Users className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                  <p>Select a sub-marketer to view investments</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioManagerDashboard;
