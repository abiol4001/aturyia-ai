import Link from 'next/link';
import { ArrowLeft, Grid3X3, Pause, Pencil } from 'lucide-react';
import { Button } from '../ui/button';

interface CampaignHeaderProps {
  campaignName: string;
  campaignId: string;
  status: 'running' | 'paused' | 'stopped';
  onPause?: () => void;
  onEdit?: () => void;
  onMenu?: () => void;
}

export default function CampaignHeader({
  campaignName,
  campaignId,
  status,
  onPause,
  onEdit,
  onMenu
}: CampaignHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'stopped':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running':
        return 'Running';
      case 'paused':
        return 'Paused';
      case 'stopped':
        return 'Stopped';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Link 
          href="/library/sdr/campaigns" 
          className="hover:text-gray-900 transition-colors"
        >
          ← Campaigns
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{campaignName}</span>
      </div>

      {/* Campaign Title and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-900">{campaignName}</h1>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {getStatusText(status)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenu}
            className="p-2 hover:bg-gray-100"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onPause}
            className="p-2 hover:bg-gray-100"
          >
            <Pause className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="p-2 hover:bg-gray-100"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
