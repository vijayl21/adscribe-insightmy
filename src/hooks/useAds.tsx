
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Ad {
  id: string;
  title: string;
  description: string | null;
  platform: string;
  image_url: string | null;
  video_url: string | null;
  likes: number;
  comments: number;
  shares: number;
  country: string | null;
  days_active: number;
  brand: string | null;
  category: string | null;
  ad_url: string | null;
  scraped_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useAds = () => {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: ['ads'],
    queryFn: async (): Promise<Ad[]> => {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('scraped_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching ads:', error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useCreateAd = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (adData: Omit<Ad, 'id' | 'created_at' | 'updated_at' | 'scraped_at'> & { user_id?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('ads')
        .insert([{ 
          title: adData.title,
          description: adData.description,
          platform: adData.platform,
          image_url: adData.image_url,
          video_url: adData.video_url,
          likes: adData.likes || 0,
          comments: adData.comments || 0,
          shares: adData.shares || 0,
          country: adData.country,
          days_active: adData.days_active || 0,
          brand: adData.brand,
          category: adData.category,
          ad_url: adData.ad_url,
          user_id: user.id
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      toast({
        title: "Success",
        description: "Ad created successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create ad",
        variant: "destructive",
      });
      console.error('Error creating ad:', error);
    },
  });
};
