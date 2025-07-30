
-- Create ads table to store scraped ad data
CREATE TABLE public.ads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  platform TEXT NOT NULL CHECK (platform IN ('Facebook', 'TikTok', 'Pinterest')),
  image_url TEXT,
  video_url TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  country TEXT,
  days_active INTEGER DEFAULT 0,
  brand TEXT,
  category TEXT,
  ad_url TEXT,
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trending_products table for AI-generated product recommendations
CREATE TABLE public.trending_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  score INTEGER NOT NULL,
  trend TEXT NOT NULL,
  reason TEXT NOT NULL,
  platforms TEXT[] NOT NULL,
  avg_engagement TEXT NOT NULL,
  rank INTEGER NOT NULL,
  analysis_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create api_keys table to store encrypted API keys
CREATE TABLE public.api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  key_name TEXT NOT NULL,
  key_value TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, key_name)
);

-- Enable RLS on all tables
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trending_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- RLS policies for ads table
CREATE POLICY "Users can view their own ads" ON public.ads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ads" ON public.ads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ads" ON public.ads
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ads" ON public.ads
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for trending_products table
CREATE POLICY "Users can view their own trending products" ON public.trending_products
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trending products" ON public.trending_products
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trending products" ON public.trending_products
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trending products" ON public.trending_products
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for api_keys table
CREATE POLICY "Users can view their own API keys" ON public.api_keys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own API keys" ON public.api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own API keys" ON public.api_keys
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own API keys" ON public.api_keys
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_ads_user_id ON public.ads(user_id);
CREATE INDEX idx_ads_platform ON public.ads(platform);
CREATE INDEX idx_ads_scraped_at ON public.ads(scraped_at);
CREATE INDEX idx_trending_products_user_id ON public.trending_products(user_id);
CREATE INDEX idx_trending_products_rank ON public.trending_products(rank);
CREATE INDEX idx_api_keys_user_id ON public.api_keys(user_id);
