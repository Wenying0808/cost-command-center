import React from "react";
import { AlarmClock, CheckCircle2, AlertTriangle, ArrowRight, MoveRight } from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";
import StatusBadge from "@/components/shared/StatusBadge";
import Chart from "@/components/shared/Chart";
import RootCauseAnalysisTable from "@/components/ui/RootCauseAnalysisTable";

const AnomalyResolution: React.FC = () => {
  // Mock data
  const anomalyData = {
    totalCost: "$14,320",
    percentageAffected: "8.5%",
    detectedAgo: "2 hrs 15 min",
    mttdClock: "2 hrs 15 min",
    rcaTime: "0:45"
  };

  

  const aiSuggestions = [
    { id: 1, suggestion: "EC2 idle instances - 80% confidence", action: "Confirm" },
    { id: 2, suggestion: "S3 bucket policy misconfiguration - 65% confidence", action: "Confirm" },
    { id: 3, suggestion: "RDS overprovisioned memory - 45% confidence", action: "Confirm" }
  ];

  const workflowSteps = [
    { id: 1, name: "Review AI alert", status: "completed" },
    { id: 2, name: "Test fix", status: "in-progress" },
    { id: 3, name: "Submit", status: "pending" }
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Current Anomaly Snapshot */}
      <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-lg font-semibold mb-4">Current Anomaly Snapshot</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard
            title="Total Cost of Anomalies"
            value={anomalyData.totalCost}
            className="hover:border-finops-red/30"
          />
          <MetricCard
            title="Percentage of Spend Affected"
            value={anomalyData.percentageAffected}
            className="hover:border-finops-yellow/30"
          />
          <MetricCard
            title="Detected"
            value={`${anomalyData.detectedAgo} ago`}
            className="hover:border-finops-blue/30"
          />
          {/*
            <div className="flex items-center bg-finops-red/10 text-finops-red px-3 py-2 rounded-lg animate-pulse-soft">
                <AlarmClock className="h-4 w-4 mr-2" />
                <span className="font-medium">MTTD Clock: {anomalyData.mttdClock}</span>
            </div>
          */}
          
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* Center Panel: Resolution Workflow */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="glass-card rounded-xl p-5 h-full">
            <h2 className="text-lg font-semibold mb-4">Resolution Workflow</h2>
            <div className="flex space-x-6">
              <div className="flex flex-row gap-2 items-center">
                <h3 className="flex items-center justify-center text-base font-medium w-6 h-6 rounded-full bg-blue-700 text-white">0</h3>
                <p className="text-sm text-finops-gray-500">Tru+ Detection</p>
              </div>
              <div className="text-sm text-finops-blue bg-finops-blue/10 rounded-full px-2 py-1">MMTD</div>
              <MoveRight />
              <div className="flex flex-row gap-2 items-center">
                <h3 className="flex items-center justify-center text-base font-medium w-6 h-6 rounded-full bg-blue-700 text-white">1</h3>
                <p className="text-sm text-finops-gray-500">Review AI Alert</p>
              </div>
              <MoveRight />
              <div className="flex flex-row gap-2 items-center">
                <h3 className="flex items-center justify-center text-base font-medium w-6 h-6 rounded-full bg-blue-700 text-white">2</h3>
                <p className="text-sm text-finops-gray-500">Discard Anomaly / Confirm Alert</p>
              </div>
              <div className="text-sm text-finops-blue bg-finops-blue/10 rounded-full px-2 py-1">time to RCA</div>
              <MoveRight />
              <div className="flex flex-row gap-2 items-center">
                <h3 className="flex items-center justify-center text-base font-medium w-6 h-6 rounded-full bg-blue-700 text-white">3</h3>
                <p className="text-sm text-finops-gray-500">Implement The Solution</p>
              </div>
              <div className="text-sm text-finops-blue bg-finops-blue/10 rounded-full px-2 py-1">MMTR</div>
            </div>
          </div>
        </div>
      </div>

      <RootCauseAnalysisTable/>
    </div>
  );
};

export default AnomalyResolution;
