
import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void;
  // New prop to indicate metrics where negative trend is actually positive
  inverseTrend?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
  onClick,
  inverseTrend = false,
}) => {
  // Determine if this is a cost metric that should be inverse colored
  const isCostMetric = inverseTrend || 
    title.toLowerCase().includes("cost") || 
    title.toLowerCase().includes("mttd") || 
    title.toLowerCase().includes("mttr");
  
  // Calculate the actual positive/negative display based on the metric type
  const displayPositive = isCostMetric 
    ? !trend?.isPositive 
    : trend?.isPositive;

  return (
    <div
      className={cn(
        "glass-card rounded-xl p-4 transition-all duration-300 hover-scale",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-finops-gray-500 dark:text-finops-gray-400">
            {title}
          </p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        {icon && (
          <div className="rounded-full bg-finops-blue/10 p-2 text-finops-blue">
            {icon}
          </div>
        )}
      </div>
      
      {trend && (
        <div className="mt-2 flex items-center text-xs font-medium">
          <div
            className={cn(
              "flex items-center rounded-full px-1.5 py-0.5",
              displayPositive
                ? "bg-finops-green/10 text-finops-green"
                : "bg-finops-red/10 text-finops-red"
            )}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </div>
          <span className="ml-1.5 text-finops-gray-500 dark:text-finops-gray-400">
            vs last period
          </span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
