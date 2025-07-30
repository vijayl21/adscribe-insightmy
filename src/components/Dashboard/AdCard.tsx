
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, ExternalLink, Eye } from 'lucide-react';

interface AdCardProps {
  ad: {
    id: string;
    title: string;
    description: string;
    platform: string;
    imageUrl?: string;
    videoUrl?: string;
    likes: number;
    comments: number;
    shares: number;
    country: string;
    daysActive: number;
    brand: string;
    category: string;
  };
}

export const AdCard = ({ ad }: AdCardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'tiktok': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'pinterest': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-gray-800/40 border-gray-700 overflow-hidden hover:bg-gray-800/60 transition-all duration-300 group">
      {/* Media Section */}
      <div className="relative aspect-video bg-gray-900/50">
        {ad.videoUrl ? (
          <video 
            className="w-full h-full object-cover"
            poster={ad.imageUrl}
            muted
            loop
            onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
            onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
          >
            <source src={ad.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={ad.imageUrl || '/placeholder.svg'} 
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button size="sm" variant="secondary" className="bg-white/90 text-gray-900">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
        <Badge className={`absolute top-3 left-3 ${getPlatformColor(ad.platform)}`}>
          {ad.platform}
        </Badge>
        <Badge className="absolute top-3 right-3 bg-black/50 text-white border-0">
          {ad.daysActive}d active
        </Badge>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
              {ad.title}
            </h3>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2 mb-3">
            {ad.description}
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-blue-400 font-medium">{ad.brand}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{ad.category}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{ad.country}</span>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-400">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">{formatNumber(ad.likes)}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{formatNumber(ad.comments)}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <Share className="w-4 h-4" />
              <span className="text-sm font-medium">{formatNumber(ad.shares)}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total Engagement</p>
            <p className="text-sm font-bold text-white">
              {formatNumber(ad.likes + ad.comments + ad.shares)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
