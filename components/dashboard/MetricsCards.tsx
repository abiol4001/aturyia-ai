import { Users, Clock, Mail, MessageCircle } from 'lucide-react';

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function MetricCard({ icon: Icon, value, label, trend }: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
            <Icon className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-600">{label}</p>
          </div>
        </div>
        {trend && (
          <div className={`text-sm font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
    </div>
  );
}

interface MetricsCardsProps {
  metrics?: {
    leadsGenerated: number;
    pendingApprovals: number;
    emailsSent: number;
    leadReplies: number;
  };
  className?: string;
}

export default function MetricsCards({ 
  metrics = {
    leadsGenerated: 10,
    pendingApprovals: 0,
    emailsSent: 2,
    leadReplies: 2
  },
  className = ""
}: MetricsCardsProps) {
  const metricsData = [
    {
      icon: Users,
      value: metrics.leadsGenerated,
      label: 'Leads Generated',
      trend: { value: 12, isPositive: true }
    },
    {
      icon: Clock,
      value: metrics.pendingApprovals,
      label: 'Pending Approvals',
      trend: { value: 0, isPositive: true }
    },
    {
      icon: Mail,
      value: metrics.emailsSent,
      label: 'Emails Sent',
      trend: { value: 8, isPositive: true }
    },
    {
      icon: MessageCircle,
      value: metrics.leadReplies,
      label: 'Lead Replies',
      trend: { value: 15, isPositive: true }
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {metricsData.map((metric, index) => (
        <MetricCard
          key={index}
          icon={metric.icon}
          value={metric.value}
          label={metric.label}
          trend={metric.trend}
        />
      ))}
    </div>
  );
}
