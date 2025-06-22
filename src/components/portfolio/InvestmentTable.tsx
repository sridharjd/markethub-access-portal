
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SubMarketer, InvestmentWithDetails } from '@/types/database';
import { Search, Filter, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import InvestmentStatusSelect from './InvestmentStatusSelect';

interface InvestmentTableProps {
  investments: InvestmentWithDetails[];
  subMarketer: SubMarketer;
  onInvestmentUpdate: (investmentId: string, status: string, amount?: number) => void;
}

const InvestmentTable: React.FC<InvestmentTableProps> = ({
  investments,
  subMarketer,
  onInvestmentUpdate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  // Filter investments based on search and status filter
  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = investment.investor_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      investment.investor_email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || investment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (investment: InvestmentWithDetails, newStatus: string, newAmount?: number) => {
    try {
      // Here you would call your API to update the investment
      // await investmentAPI.updateStatus(investment.investor_investment_id, newStatus, newAmount);
      
      onInvestmentUpdate(investment.investor_investment_id, newStatus, newAmount);
      
      toast({
        title: "Investment Updated",
        description: `Status changed to ${newStatus.replace('_', ' ')} for ${investment.investor_name}`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update investment status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      on_hold: { label: 'On Hold', className: 'bg-yellow-100 text-yellow-800' },
      refunded: { label: 'Refunded', className: 'bg-red-100 text-red-800' },
      ncd_conversion: { label: 'NCD Conversion', className: 'bg-green-100 text-green-800' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.className || 'bg-gray-100 text-gray-800'}`}>
        {config?.label || status}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investments - {subMarketer.name}</CardTitle>
        <CardDescription>
          Manage investor investments and update their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="search">Search Investors</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="search"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="sm:w-48">
            <Label htmlFor="status-filter">Filter by Status</Label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">All Status</option>
              <option value="on_hold">On Hold</option>
              <option value="refunded">Refunded</option>
              <option value="ncd_conversion">NCD Conversion</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Investments Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Investment Amount</TableHead>
                <TableHead>Invested Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestments.map((investment) => (
                <TableRow key={investment.investor_investment_id}>
                  <TableCell className="font-medium">
                    {investment.investor_name}
                  </TableCell>
                  <TableCell>{investment.investor_email}</TableCell>
                  <TableCell>
                    ${investment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(investment.invested_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(investment.status)}
                  </TableCell>
                  <TableCell>
                    <InvestmentStatusSelect
                      investment={investment}
                      onStatusUpdate={handleStatusUpdate}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredInvestments.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p>No investments found matching your criteria</p>
            </div>
          )}
        </div>
        
        {/* Summary */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-slate-600">Total Investments</p>
              <p className="font-semibold">{filteredInvestments.length}</p>
            </div>
            <div>
              <p className="text-slate-600">Total Amount</p>
              <p className="font-semibold">
                ${filteredInvestments.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-slate-600">On Hold</p>
              <p className="font-semibold">
                {filteredInvestments.filter(inv => inv.status === 'on_hold').length}
              </p>
            </div>
            <div>
              <p className="text-slate-600">NCD Conversions</p>
              <p className="font-semibold">
                {filteredInvestments.filter(inv => inv.status === 'ncd_conversion').length}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentTable;
