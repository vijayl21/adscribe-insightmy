
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header is required');
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Invalid authentication');
    }

    const { platform, keywords } = await req.json();

    // Get Facebook access token from environment
    const facebookToken = Deno.env.get('FACEBOOK_ACCESS_TOKEN');
    if (!facebookToken) {
      throw new Error('Facebook API token not configured');
    }

    console.log(`Scraping ${platform} ads for keywords: ${keywords}`);

    // Mock ad data for demonstration (replace with actual Facebook API calls)
    const mockAds = [
      {
        title: "Smart Phone Ring Holder - Ultimate Convenience",
        description: "Never drop your phone again! This innovative ring holder provides secure grip and works as a stand. Perfect for video calls, watching movies, and one-handed texting.",
        platform: platform,
        image_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
        likes: Math.floor(Math.random() * 5000) + 1000,
        comments: Math.floor(Math.random() * 500) + 50,
        shares: Math.floor(Math.random() * 200) + 20,
        country: "United States",
        days_active: Math.floor(Math.random() * 30) + 1,
        brand: "TechGrip",
        category: "Phone Accessories"
      },
      {
        title: "LED Strip Lights RGB - Transform Your Room",
        description: "Create the perfect ambiance with these smart LED strip lights. 16 million colors, music sync, app control. Easy installation, perfect for bedroom, living room, or gaming setup.",
        platform: platform,
        image_url: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop",
        likes: Math.floor(Math.random() * 8000) + 2000,
        comments: Math.floor(Math.random() * 800) + 100,
        shares: Math.floor(Math.random() * 300) + 50,
        country: "Canada",
        days_active: Math.floor(Math.random() * 45) + 5,
        brand: "LightUp",
        category: "Home Decor"
      }
    ];

    // Insert ads into database
    const adsToInsert = mockAds.map(ad => ({
      ...ad,
      user_id: user.id,
      scraped_at: new Date().toISOString()
    }));

    const { data: insertedAds, error: insertError } = await supabaseClient
      .from('ads')
      .insert(adsToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting ads:', insertError);
      throw new Error('Failed to save scraped ads');
    }

    console.log(`Successfully scraped and saved ${insertedAds?.length || 0} ads for user ${user.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        ads: insertedAds?.length || 0,
        message: 'Ads scraped successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in scrape-ads function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
