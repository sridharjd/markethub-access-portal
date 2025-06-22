
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'portfolio_manager';
  name: string;
  portfolio_owner_id?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
