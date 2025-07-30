
import { useState } from 'react';
import { Header } from '@/components/Dashboard/Header';
import { StatsOverview } from '@/components/Dashboard/StatsOverview';
import { TopProducts } from '@/components/Dashboard/TopProducts';
import { FilterBar } from '@/components/Dashboard/FilterBar';
import { AdCard } from '@/components/Dashboard/AdCard';
import { mockAds } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { RefreshCw, BarChart3 } from 'lucide-react';

interface DashboardPageProps {
  onLogout: () => void;
}

export const DashboardPage = ({ onLogout }: DashboardPageProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentView, setCurrentView] = useState<'products' | 'ads'>('products');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header onLogout={onLogout} />
      
      <main className="p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
            <p className="text-gray-400 mt-1">Monitor trending products and ad performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-800 rounded-lg p-1">
              <Button
                variant={currentView === 'products' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('products')}
                className={currentView === 'products' ? 'bg-blue-600 hover:bg-blue-700' : 'text-gray-400 hover:text-white'}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Top Products
              </Button>
              <Button
                variant={currentView === 'ads' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('ads')}
                className={currentView === 'ads' ? 'bg-blue-600 hover:bg-blue-700' : 'text-gray-400 hover:text-white'}
              >
                Ads Library
              </Button>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-gray-700 hover:bg-gray-600"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        <StatsOverview />

        {currentView === 'products' ? (
          <TopProducts />
        ) : (
          <div className="space-y-6">
            <FilterBar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};
