
import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

type ChartType = "area" | "bar" | "line" | "pie";

interface ChartProps {
  type: ChartType;
  data: any[];
  height?: number;
  width?: number;
  colors?: string[];
  className?: string;
}

const Chart: React.FC<ChartProps> = ({
  type,
  data,
  height = 300,
  width = 500,
  colors = ["#0A84FF", "#30B0C7", "#32D74B", "#FF9F0A", "#FF453A", "#BF5AF2"],
  className,
}) => {
  const defaultColors = {
    primary: "#0A84FF",
    secondary: "#30B0C7",
  };

  const renderChart = () => {
    switch (type) {
      case "area":
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={defaultColors.primary} stopOpacity={0.8} />
                <stop offset="95%" stopColor={defaultColors.primary} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={defaultColors.secondary} stopOpacity={0.8} />
                <stop offset="95%" stopColor={defaultColors.secondary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
            <Area type="monotone" dataKey="value" stroke={defaultColors.primary} fillOpacity={1} fill="url(#colorPrimary)" />
            {data[0] && data[0].secondValue && (
              <Area type="monotone" dataKey="secondValue" stroke={defaultColors.secondary} fillOpacity={1} fill="url(#colorSecondary)" />
            )}
          </AreaChart>
        );
      
      case "bar":
        return (
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
            <Bar dataKey="value" fill={defaultColors.primary} radius={[4, 4, 0, 0]} />
            {data[0] && data[0].secondValue && (
              <Bar dataKey="secondValue" fill={defaultColors.secondary} radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        );
      
      case "line":
        return (
          <LineChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
            <Line type="monotone" dataKey="value" stroke={defaultColors.primary} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            {data[0] && data[0].secondValue && (
              <Line type="monotone" dataKey="secondValue" stroke={defaultColors.secondary} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            )}
          </LineChart>
        );
      
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
          </PieChart>
        );
      
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <div className={cn("overflow-hidden", className)}>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
