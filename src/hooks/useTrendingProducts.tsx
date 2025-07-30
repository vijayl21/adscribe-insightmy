
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TrendingProduct {
  id: string;
  name: string;
  category: string;
  score: number;
  trend: string;
  reason: string;
  platforms: string[];
  avg_engagement: string;
  rank: number;
  analysis_date: string;
  created_at: string;
  updated_at: string;
}

export const useTrendingProducts = () => {
  return useQuery({
    queryKey: ['trending-products'],
    queryFn: async (): Promise<TrendingProduct[]> => {
      const { data, error } = await supabase
        .from('trending_products')
        .select('*')
        .order('rank', { ascending: true });
      
      if (error) {
        console.error('Error fetching trending products:', error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useGenerateTrendingProducts = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('analyze-trends');
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trending-products'] });
      toast({
        title: "Success",
        description: "Trending products analysis completed!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to analyze trending products",
        variant: "destructive",
      });
      console.error('Error analyzing trends:', error);
    },
  });
};
