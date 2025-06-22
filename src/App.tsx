
import React from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginForm from '@/components/auth/LoginForm';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import PortfolioManagerDashboard from '@/components/dashboard/PortfolioManagerDashboard';

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <LoginForm />;
  }

  // Route based on user role
  if (user.role === 'admin') {
    return <AdminDashboard />;
  } else if (user.role === 'portfolio_manager') {
    return <PortfolioManagerDashboard />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-red-600">Invalid user role</p>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
