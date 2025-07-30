
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Star, Target, RefreshCw } from 'lucide-react';
import { useTrendingProducts, useGenerateTrendingProducts } from '@/hooks/useTrendingProducts';

export const TopProducts = () => {
  const { data: products, isLoading, error } = useTrendingProducts();
  const generateTrends = useGenerateTrendingProducts();

  const handleRefreshTrends = () => {
    generateTrends.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white text-lg">Loading trending products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Error loading trending products</p>
        <Button onClick={handleRefreshTrends} disabled={generateTrends.isPending}>
          <RefreshCw className={`w-4 h-4 mr-2 ${generateTrends.isPending ? 'animate-spin' : ''}`} />
          Retry
        </Button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">No trending products available</p>
        <Button onClick={handleRefreshTrends} disabled={generateTrends.isPending}>
          <RefreshCw className={`w-4 h-4 mr-2 ${generateTrends.isPending ? 'animate-spin' : ''}`} />
          {generateTrends.isPending ? 'Generating...' : 'Generate Trends'}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Top Winning Products</h2>
            <p className="text-gray-400">AI-analyzed trending products • Updated regularly</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
            {products.length} products found
          </Badge>
          <Button 
            onClick={handleRefreshTrends} 
            disabled={generateTrends.isPending}
            className="bg-gray-700 hover:bg-gray-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${generateTrends.isPending ? 'animate-spin' : ''}`} />
            {generateTrends.isPending ? 'Analyzing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.slice(0, 10).map((product, index) => (
          <Card key={product.id} className="bg-gray-800/50 border-gray-700 p-6 hover:bg-gray-800/70 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold">
                  #{product.rank}
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
                <p className="text-sm font-medium text-white">{product.avg_engagement}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
