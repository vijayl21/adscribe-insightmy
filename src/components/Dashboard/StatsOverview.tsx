
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Database, Target } from 'lucide-react';
import { useAds } from '@/hooks/useAds';
import { useTrendingProducts } from '@/hooks/useTrendingProducts';

export const StatsOverview = () => {
  const { data: ads } = useAds();
  const { data: products } = useTrendingProducts();

  const totalAds = ads?.length || 0;
  const totalEngagement = ads?.reduce((sum, ad) => sum + ad.likes + ad.comments + ad.shares, 0) || 0;
  const avgEngagement = totalAds > 0 ? Math.round(totalEngagement / totalAds) : 0;
  const trendingProducts = products?.length || 0;

  const stats = [
    {
      title: "Total Ads Analyzed",
      value: totalAds.toLocaleString(),
      change: "+2.3%",
      trend: "up" as const,
      icon: Database,
      color: "text-blue-400"
    },
    {
      title: "Active Campaigns",
      value: ads?.filter(ad => ad.days_active > 0).length.toLocaleString() || "0",
      change: "+8.1%",
      trend: "up" as const,
      icon: Target,
      color: "text-green-400"
    },
    {
      title: "Avg. Engagement",
      value: avgEngagement > 1000 ? `${(avgEngagement / 1000).toFixed(1)}K` : avgEngagement.toString(),
      change: "-1.2%",
      trend: "down" as const,
      icon: TrendingUp,
      color: "text-purple-400"
    },
    {
      title: "Trending Products",
      value: trendingProducts.toString(),
      change: "+12.5%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-yellow-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="bg-gray-800/40 border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-700/50 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
