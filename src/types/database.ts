
export interface PortfolioOwner {
  portfolio_owner_id: string;
  name: string;
  email: string;
  created_at: string;
  status: 'active' | 'inactive';
}

export interface SubMarketer {
  sub_marketer_id: string;
  portfolio_owner_id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  status: 'active' | 'inactive';
}

export interface Investor {
  investor_id: string;
  sub_marketer_id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  status: 'active' | 'inactive';
}

export interface InvestorInvestment {
  investor_investment_id: string;
  investor_id: string;
  portfolio_owner_id: string;
  sub_marketer_id: string;
  amount: number;
  invested_date: string;
  status: 'refunded' | 'on_hold' | 'ncd_conversion';
  created_at: string;
  updated_at: string;
}

export interface StatusUpdate {
  update_id: string;
  investor_investment_id: string;
  new_status: 'refunded' | 'on_hold' | 'ncd_conversion';
  new_amount: number;
  updated_by: string;
  updated_at: string;
  previous_status?: string;
  previous_amount?: number;
}

export interface InvestmentWithDetails extends InvestorInvestment {
  investor_name: string;
  investor_email: string;
  sub_marketer_name: string;
  portfolio_owner_name: string;
}
