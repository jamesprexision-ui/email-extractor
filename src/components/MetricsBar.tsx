import { Mail, CheckCircle, Copy, Clock } from 'lucide-react';

interface MetricsBarProps {
  totalEmails: number;
  validEmails: number;
  duplicatesRemoved: number;
  extractionTime: number;
  isExtracting: boolean;
}

export default function MetricsBar({
  totalEmails,
  validEmails,
  duplicatesRemoved,
  extractionTime,
  isExtracting,
}: MetricsBarProps) {
  const metrics = [
    {
      label: 'Emails Found',
      value: totalEmails,
      icon: Mail,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Valid Emails',
      value: validEmails,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      label: 'Duplicates Removed',
      value: duplicatesRemoved,
      icon: Copy,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      label: 'Extraction Time',
      value: `${extractionTime}s`,
      icon: Clock,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${metric.iconColor}`} />
              </div>
              {isExtracting && index === 0 && (
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">{metric.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{metric.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
