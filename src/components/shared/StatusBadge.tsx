
import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "green" | "yellow" | "red" |  "low" | "medium" | "high" | "default" | "healthy" | "watch" | "critical";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  label,
  className 
}) => {
  const getStatusClass = () => {
    switch (status) {
      case "green":
        return "status-green";
      case "yellow":
        return "status-yellow";
      case "red":
        return "status-red";
      case "low":
        return "status-green";
      case "medium":
        return "status-yellow";
      case "high":
        return "status-red";
      case "healthy":
        return "status-green";
      case "watch":
        return "status-yellow";
      case "critical":
        return "status-red";
      default:
        return "bg-finops-gray-200 text-finops-gray-700";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        getStatusClass(),
        className
      )}
    >
      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
      {label || status}
    </span>
  );
};

export default StatusBadge;
