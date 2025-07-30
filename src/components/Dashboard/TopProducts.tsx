
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Star, Target } from 'lucide-react';

const topProducts = [
  {
    id: 1,
    name: "Smart Phone Ring Holder",
    category: "Phone Accessories",
    score: 94,
    trend: "+23%",
    reason: "High engagement across TikTok & Facebook. Viral unboxing videos showing convenience factor.",
    platforms: ["TikTok", "Facebook", "Pinterest"],
    avgEngagement: "12.5K"
  },
  {
    id: 2,
    name: "LED Strip Lights RGB",
    category: "Home Decor",
    score: 91,
    trend: "+19%",
    reason: "Seasonal trend spike. Room makeover content performing exceptionally well.",
    platforms: ["TikTok", "Pinterest"],
    avgEngagement: "8.9K"
  },
  {
    id: 3,
    name: "Wireless Ear Buds Pro",
    category: "Electronics",
    score: 88,
    trend: "+15%",
    reason: "Strong repetition across platforms. Multiple sellers using similar ad formats.",
    platforms: ["Facebook", "Pinterest"],
    avgEngagement: "15.2K"
  },
  {
    id: 4,
    name: "Posture Corrector Belt",
    category: "Health & Fitness",
    score: 85,
    trend: "+12%",
    reason: "Pain-point targeting ads with high conversion language. Before/after content.",
    platforms: ["Facebook", "TikTok"],
    avgEngagement: "6.8K"
  },
  {
    id: 5,
    name: "Car Dashboard Camera",
    category: "Automotive",
    score: 83,
    trend: "+11%",
    reason: "Safety-focused messaging resonating well. Insurance angle driving engagement.",
    platforms: ["Facebook"],
    avgEngagement: "4.7K"
  }
];

export const TopProducts = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Top 10 Winning Products</h2>
            <p className="text-gray-400">AI-analyzed trending products • Updated daily</p>
          </div>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
          Last updated: 2 hours ago
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topProducts.map((product, index) => (
          <Card key={product.id} className="bg-gray-800/50 border-gray-700 p-6 hover:bg-gray-800/70 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold">
                  #{index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                  <p className="text-sm text-gray-400">{product.category}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-xl font-bold text-white">{product.score}</span>
                </div>
                <p className="text-sm text-green-400">{product.trend}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">AI Analysis</span>
              </div>
              <p className="text-sm text-gray-400">{product.reason}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {product.platforms.map((platform) => (
                  <Badge 
                    key={platform} 
                    variant="secondary" 
                    className="bg-gray-700 text-gray-300 hover:bg-gray-600"
                  >
                    {platform}
                  </Badge>
                ))}
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Avg. Engagement</p>
                <p className="text-sm font-medium text-white">{product.avgEngagement}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
