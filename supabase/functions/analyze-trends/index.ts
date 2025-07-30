
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

    // Get OpenAI API key
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Fetch user's ads data for analysis
    const { data: ads, error: adsError } = await supabaseClient
      .from('ads')
      .select('*')
      .eq('user_id', user.id)
      .limit(50);

    if (adsError) {
      console.error('Error fetching ads:', adsError);
      throw new Error('Failed to fetch ads data');
    }

    // Prepare data for AI analysis
    const adsSummary = ads?.map(ad => ({
      title: ad.title,
      platform: ad.platform,
      category: ad.category,
      engagement: ad.likes + ad.comments + ad.shares,
      days_active: ad.days_active
    })) || [];

    const prompt = `Analyze the following ad performance data and identify the top 10 trending products for dropshipping. Consider engagement rates, platform performance, and market trends.

Ad Data Summary:
${JSON.stringify(adsSummary, null, 2)}

Please respond with a JSON array of exactly 10 trending products, each with the following structure:
{
  "name": "Product Name",
  "category": "Product Category",
  "score": 85,
  "trend": "+15%",
  "reason": "Detailed explanation of why this product is trending",
  "platforms": ["Facebook", "TikTok"],
  "avg_engagement": "12.5K",
  "rank": 1
}

Focus on realistic product names, categories, and trends based on the data provided.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in e-commerce trends and dropshipping product analysis. Always respond with valid JSON arrays.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const aiResponse = await response.json();
    const trendingProductsText = aiResponse.choices[0].message.content;
    
    // Parse AI response
    let trendingProducts;
    try {
      // Extract JSON from AI response, removing any markdown formatting
      let jsonText = trendingProductsText.trim();
      
      // Remove markdown code block wrappers if present
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Find JSON array in the response
      const jsonStart = jsonText.indexOf('[');
      const jsonEnd = jsonText.lastIndexOf(']');
      
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        jsonText = jsonText.substring(jsonStart, jsonEnd + 1);
      }
      
      trendingProducts = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('Raw AI response:', trendingProductsText);
      throw new Error('Invalid AI response format');
    }

    // Clear existing trending products for this user
    const { error: deleteError } = await supabaseClient
      .from('trending_products')
      .delete()
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Error clearing existing products:', deleteError);
    }

    // Insert new trending products
    const productsToInsert = trendingProducts.map((product: any) => ({
      user_id: user.id,
      name: product.name,
      category: product.category,
      score: product.score,
      trend: product.trend,
      reason: product.reason,
      platforms: product.platforms,
      avg_engagement: product.avg_engagement,
      rank: product.rank,
      analysis_date: new Date().toISOString().split('T')[0]
    }));

    const { data: insertedProducts, error: insertError } = await supabaseClient
      .from('trending_products')
      .insert(productsToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting trending products:', insertError);
      throw new Error('Failed to save trending products');
    }

    console.log(`Successfully analyzed and saved ${insertedProducts?.length || 0} trending products for user ${user.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        products: insertedProducts?.length || 0,
        message: 'Trending products analysis completed successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in analyze-trends function:', error);
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
