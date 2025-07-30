
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useScrapeAds = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (dateRange: number = 30) => {
      const { data, error } = await supabase.functions.invoke('scrape-ads', {
        body: { dateRange }
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      toast({
        title: "Success",
        description: data.message || "Ads scraped successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to scrape ads. Please try again.",
        variant: "destructive",
      });
      console.error('Error scraping ads:', error);
    },
  });
};
