
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Filter, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const FilterBar = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (filter: string, value: string) => {
    if (value && !activeFilters.includes(`${filter}: ${value}`)) {
      setActiveFilters([...activeFilters, `${filter}: ${value}`]);
    }
  };

  const removeFilter = (filterToRemove: string) => {
    setActiveFilters(activeFilters.filter(filter => filter !== filterToRemove));
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
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
              <SelectItem value="tiktok" className="text-gray-300">TikTok</SelectItem>
              <SelectItem value="pinterest" className="text-gray-300">Pinterest</SelectItem>
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
              <SelectItem value="us" className="text-gray-300">United States</SelectItem>
              <SelectItem value="uk" className="text-gray-300">United Kingdom</SelectItem>
              <SelectItem value="ca" className="text-gray-300">Canada</SelectItem>
              <SelectItem value="au" className="text-gray-300">Australia</SelectItem>
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
