
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Filter, Download, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useScrapeAds } from '@/hooks/useScrapeAds';

export const FilterBar = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { mutate: scrapeAds, isPending: isScraping } = useScrapeAds();

  const handleFilterChange = (filter: string, value: string) => {
    if (value && !activeFilters.includes(`${filter}: ${value}`)) {
      setActiveFilters([...activeFilters, `${filter}: ${value}`]);
    }
  };

  const removeFilter = (filterToRemove: string) => {
    setActiveFilters(activeFilters.filter(filter => filter !== filterToRemove));
  };

  const handleScrapeAds = (days: number) => {
    scrapeAds(days);
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Ads Controls</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Scrape Ads Section */}
      <div className="bg-gray-700/20 rounded-lg p-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-blue-400" />
          <h4 className="text-sm font-medium text-white">Scrape Indian Facebook Ads</h4>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => handleScrapeAds(7)}
            disabled={isScraping}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Last 7 Days
          </Button>
          <Button
            onClick={() => handleScrapeAds(14)}
            disabled={isScraping}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Last 14 Days
          </Button>
          <Button
            onClick={() => handleScrapeAds(30)}
            disabled={isScraping}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Last 30 Days
          </Button>
        </div>
        {isScraping && (
          <div className="text-sm text-blue-400 animate-pulse">
            Scraping Facebook ads from India...
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Date Range</label>
          <Select onValueChange={(value) => handleFilterChange('Date', value)}>
            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="today" className="text-gray-300">Today</SelectItem>
              <SelectItem value="yesterday" className="text-gray-300">Yesterday</SelectItem>
              <SelectItem value="7days" className="text-gray-300">Last 7 days</SelectItem>
              <SelectItem value="30days" className="text-gray-300">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Platform</label>
          <Select onValueChange={(value) => handleFilterChange('Platform', value)}>
            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
              <SelectValue placeholder="All platforms" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="facebook" className="text-gray-300">Facebook</SelectItem>
              <SelectItem value="instagram" className="text-gray-300">Instagram</SelectItem>
              <SelectItem value="tiktok" className="text-gray-300">TikTok</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Country</label>
          <Select onValueChange={(value) => handleFilterChange('Country', value)}>
            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
              <SelectValue placeholder="All countries" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="in" className="text-gray-300">India</SelectItem>
              <SelectItem value="us" className="text-gray-300">United States</SelectItem>
              <SelectItem value="uk" className="text-gray-300">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Min Engagement</label>
          <Input
            type="number"
            placeholder="e.g. 1000"
            className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
            onChange={(e) => e.target.value && handleFilterChange('Engagement', e.target.value)}
          />
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="bg-blue-500/10 text-blue-400 border-blue-500/20"
            >
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="ml-2 hover:text-blue-300"
              >
                ×
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilters([])}
            className="text-gray-400 hover:text-white"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};
