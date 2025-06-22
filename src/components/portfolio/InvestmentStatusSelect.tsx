
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { InvestmentWithDetails } from '@/types/database';
import { Edit3 } from 'lucide-react';

interface InvestmentStatusSelectProps {
  investment: InvestmentWithDetails;
  onStatusUpdate: (investment: InvestmentWithDetails, status: string, amount?: number) => void;
}

const InvestmentStatusSelect: React.FC<InvestmentStatusSelectProps> = ({
  investment,
  onStatusUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(investment.status);
  const [amount, setAmount] = useState(investment.amount.toString());

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    onStatusUpdate(investment, selectedStatus, numericAmount);
    setIsOpen(false);
  };

  const isAmountEditable = selectedStatus === 'refunded' || selectedStatus === 'ncd_conversion';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-1">
          <Edit3 className="h-3 w-3" />
          <span>Update</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Investment Status</DialogTitle>
          <DialogDescription>
            Update the status and amount for {investment.investor_name}'s investment
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="current-amount">Current Investment</Label>
            <div className="text-lg font-semibold text-slate-900">
              ${investment.amount.toLocaleString()}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">New Status</Label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                // Auto-fill amount for "On Hold" status
                if (e.target.value === 'on_hold') {
                  setAmount(investment.amount.toString());
                }
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="on_hold">On Hold</option>
              <option value="refunded">Refunded</option>
              <option value="ncd_conversion">NCD Conversion</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">
              Amount {!isAmountEditable && '(Read-only for On Hold)'}
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!isAmountEditable}
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
            {!isAmountEditable && (
              <p className="text-xs text-slate-500">
                Amount is automatically set to current investment for "On Hold" status
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Update Investment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentStatusSelect;
