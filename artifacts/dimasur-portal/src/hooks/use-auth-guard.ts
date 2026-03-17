import { useEffect } from "react";
import { useLocation } from "wouter";
import { useGetMe, useLogout } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export function useAuthGuard(requireAuth: boolean = true) {
  const [, setLocation] = useLocation();
  const { data: user, isLoading, error } = useGetMe({ 
    query: { 
      retry: false,
      staleTime: 5 * 60 * 1000 // 5 mins
    } 
  });
  
  const isError = error !== null;
  const isAuthenticated = !!user?.authenticated && !isError;

  useEffect(() => {
    if (isLoading) return;
    
    if (requireAuth && !isAuthenticated) {
      setLocation("/");
    } else if (!requireAuth && isAuthenticated) {
      setLocation("/portal");
    }
  }, [isAuthenticated, isLoading, requireAuth, setLocation]);

  return {
    user,
    isAuthenticated,
    isLoading
  };
}

export function useAppLogout() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const { mutateAsync: logout, isPending } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.clear();
      setLocation("/");
    } catch (e) {
      console.error("Logout failed", e);
      // Fallback redirect
      setLocation("/");
    }
  };

  return { handleLogout, isPending };
}
