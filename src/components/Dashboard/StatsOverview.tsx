
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Database, Target } from 'lucide-react';

const stats = [
  {
    title: "Total Ads Analyzed",
    value: "12,847",
    change: "+2.3%",
    trend: "up",
    icon: Database,
    color: "text-blue-400"
  },
  {
    title: "Active Campaigns",
    value: "1,245",
    change: "+8.1%",
    trend: "up",
    icon: Target,
    color: "text-green-400"
  },
  {
    title: "Avg. Engagement",
    value: "8.9K",
    change: "-1.2%",
    trend: "down",
    icon: TrendingUp,
    color: "text-purple-400"
  },
  {
    title: "Trending Products",
    value: "47",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-yellow-400"
  }
];

export const StatsOverview = () => {
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
