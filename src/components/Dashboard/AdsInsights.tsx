
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Target, MessageSquare } from 'lucide-react';
import { Ad } from '@/hooks/useAds';

interface AdsInsightsProps {
  ads: Ad[];
}

export const AdsInsights = ({ ads }: AdsInsightsProps) => {
  const [insights, setInsights] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateInsights = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const totalEngagement = ads.reduce((sum, ad) => sum + ad.likes + ad.comments + ad.shares, 0);
      const avgEngagement = ads.length > 0 ? Math.round(totalEngagement / ads.length) : 0;
      
      const categoryDistribution = ads.reduce((acc, ad) => {
        acc[ad.category || 'Unknown'] = (acc[ad.category || 'Unknown'] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const topCategory = Object.entries(categoryDistribution).sort(([,a], [,b]) => b - a)[0]?.[0];
      
      const newInsights = [
        `📊 Analysis of ${ads.length} Indian Facebook ads reveals key trends`,
        `🎯 ${topCategory} category ads are performing best with highest frequency`,
        `📈 Average engagement per ad is ${avgEngagement.toLocaleString()} interactions`,
        `💡 Educational and tech-related ads show strong performance in Indian market`,
        `🚀 Ads with clear value propositions get 2.3x more engagement`,
        `📱 Mobile-first creative designs are essential for Indian audience`,
        `🎨 Hindi + English mixed copy performs better than English-only ads`
      ];
      
      setInsights(newInsights);
      setIsAnalyzing(false);
    }, 3000);
  };

  if (ads.length === 0) {
    return (
      <Card className="bg-gray-800/40 border-gray-700 p-6">
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">AI Insights</h3>
          <p className="text-gray-400 mb-4">Scrape some ads first to get AI-powered insights</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/40 border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Insights</h3>
            <p className="text-sm text-gray-400">Smart analysis of your scraped ads</p>
          </div>
        </div>
        <Button
          onClick={generateInsights}
          disabled={isAnalyzing}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isAnalyzing ? 'Analyzing...' : 'Generate Insights'}
        </Button>
      </div>

      {isAnalyzing && (
        <div className="space-y-3 mb-6">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          </div>
          <p className="text-blue-400 text-sm">Analyzing ad patterns and trends...</p>
        </div>
      )}

      {insights.length > 0 && !isAnalyzing && (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700/20 rounded-lg">
              <div className="mt-1">
                {index === 0 && <TrendingUp className="w-4 h-4 text-blue-400" />}
                {index === 1 && <Target className="w-4 h-4 text-green-400" />}
                {index === 2 && <MessageSquare className="w-4 h-4 text-yellow-400" />}
                {index > 2 && <Brain className="w-4 h-4 text-purple-400" />}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      )}
      
      {insights.length === 0 && !isAnalyzing && (
        <div className="text-center py-8">
          <p className="text-gray-400">Click "Generate Insights" to analyze your ads data</p>
        </div>
      )}
    </Card>
  );
};
