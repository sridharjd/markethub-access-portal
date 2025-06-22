import { 
  PortfolioOwner, 
  SubMarketer, 
  Investor, 
  InvestorInvestment, 
  InvestmentWithDetails,
  StatusUpdate 
} from '@/types/database';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem('auth_token');

// Helper function for API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  
  return response.json();
};

// Portfolio Owner API
export const portfolioOwnerAPI = {
  getAll: (): Promise<PortfolioOwner[]> => apiRequest('/portfolio-owners'),
  getById: (id: string): Promise<PortfolioOwner> => apiRequest(`/portfolio-owners/${id}`),
  create: (data: Omit<PortfolioOwner, 'portfolio_owner_id' | 'created_at'>): Promise<PortfolioOwner> =>
    apiRequest('/portfolio-owners', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<PortfolioOwner>): Promise<PortfolioOwner> =>
    apiRequest(`/portfolio-owners/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string): Promise<void> => apiRequest(`/portfolio-owners/${id}`, { method: 'DELETE' }),
};

// Sub Marketer API
export const subMarketerAPI = {
  getAll: (): Promise<SubMarketer[]> => apiRequest('/sub-marketers'),
  getByPortfolioOwner: (portfolioOwnerId: string): Promise<SubMarketer[]> => 
    apiRequest(`/portfolio-owners/${portfolioOwnerId}/sub-marketers`),
  getById: (id: string): Promise<SubMarketer> => apiRequest(`/sub-marketers/${id}`),
  create: (data: Omit<SubMarketer, 'sub_marketer_id' | 'created_at'>): Promise<SubMarketer> =>
    apiRequest('/sub-marketers', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<SubMarketer>): Promise<SubMarketer> =>
    apiRequest(`/sub-marketers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string): Promise<void> => apiRequest(`/sub-marketers/${id}`, { method: 'DELETE' }),
};

// Investor API
export const investorAPI = {
  getAll: (): Promise<Investor[]> => apiRequest('/investors'),
  getBySubMarketer: (subMarketerId: string): Promise<Investor[]> => 
    apiRequest(`/sub-marketers/${subMarketerId}/investors`),
  getById: (id: string): Promise<Investor> => apiRequest(`/investors/${id}`),
  create: (data: Omit<Investor, 'investor_id' | 'created_at'>): Promise<Investor> =>
    apiRequest('/investors', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Investor>): Promise<Investor> =>
    apiRequest(`/investors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string): Promise<void> => apiRequest(`/investors/${id}`, { method: 'DELETE' }),
};

// Investment API
export const investmentAPI = {
  getAll: (): Promise<InvestmentWithDetails[]> => apiRequest('/investments'),
  getByPortfolioOwner: (portfolioOwnerId: string): Promise<InvestmentWithDetails[]> =>
    apiRequest(`/portfolio-owners/${portfolioOwnerId}/investments`),
  getBySubMarketer: (subMarketerId: string): Promise<InvestmentWithDetails[]> =>
    apiRequest(`/sub-marketers/${subMarketerId}/investments`),
  getById: (id: string): Promise<InvestorInvestment> => apiRequest(`/investments/${id}`),
  create: (data: Omit<InvestorInvestment, 'investor_investment_id' | 'created_at' | 'updated_at'>): Promise<InvestorInvestment> =>
    apiRequest('/investments', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id: string, status: string, amount?: number): Promise<InvestorInvestment> =>
    apiRequest(`/investments/${id}/status`, { 
      method: 'PUT', 
      body: JSON.stringify({ status, amount }) 
    }),
  delete: (id: string): Promise<void> => apiRequest(`/investments/${id}`, { method: 'DELETE' }),
};

// Status Updates API
export const statusUpdateAPI = {
  getByInvestment: (investmentId: string): Promise<StatusUpdate[]> =>
    apiRequest(`/investments/${investmentId}/status-updates`),
  getAll: (): Promise<StatusUpdate[]> => apiRequest('/status-updates'),
};
