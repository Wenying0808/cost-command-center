
import React from "react";
import { AlarmClock, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";
import StatusBadge from "@/components/shared/StatusBadge";
import Chart from "@/components/shared/Chart";
import RootCauseAnalysisTable from "@/components/ui/RootCauseAnalysisTable";

const AnomalyResolution: React.FC = () => {
  // Mock data
  const anomalyData = {
    totalCost: "$4,320",
    percentageAffected: "8.5%",
    detectedAgo: "2 hrs 15 min",
    mttdClock: "2 hrs 15 min",
    rcaTime: "0:45"
  };

  const serviceData = [
    { name: "EC2", value: 300 },
    { name: "S3", value: 120 },
    { name: "RDS", value: 80 },
    { name: "Lambda", value: 40 },
  ];

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
      {/* Anomaly Header */}
      <div className="glass-card rounded-xl p-6 animate-fade-up bg-finops-blue/5 border border-finops-blue/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Action Station
            </h1>
            <p className="text-finops-gray-600 dark:text-finops-gray-300 mt-1">
              Active anomaly resolution workspace
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-finops-red/10 text-finops-red px-3 py-2 rounded-full animate-pulse-soft">
              <AlarmClock className="h-4 w-4 mr-2" />
              <span className="font-medium">MTTD Clock: {anomalyData.mttdClock}</span>
            </div>
          </div>
        </div>
      </div>

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
            title="Status"
            value={`Detected ${anomalyData.detectedAgo} ago`}
            className="hover:border-finops-blue/30"
          />
        </div>
      </div>

      <RootCauseAnalysisTable/>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel: Root Cause Analysis */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass-card rounded-xl p-5 h-full">
            <h2 className="text-lg font-semibold mb-4">Root Cause Analysis</h2>
            <div className="space-y-4">
              <div className="glass-card bg-finops-blue/5 rounded-xl p-4 border border-finops-blue/20">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-finops-blue">Time to RCA</h3>
                  <div className="text-finops-blue font-mono font-medium animate-pulse-soft">
                    {anomalyData.rcaTime} min
                  </div>
                </div>
                <div className="w-full bg-finops-gray-200 dark:bg-finops-gray-700 rounded-full h-2">
                  <div 
                    className="bg-finops-blue h-2 rounded-full animate-pulse-soft" 
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">AI Suggestions</h3>
                <div className="space-y-3">
                  {aiSuggestions.map((item) => (
                    <div 
                      key={item.id}
                      className="glass-card rounded-lg p-4 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-finops-yellow mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm">{item.suggestion}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button className="bg-finops-blue text-white rounded-full px-3 py-1 text-xs font-medium flex items-center hover:bg-finops-blue/90 transition-colors">
                          {item.action} RCA
                          <CheckCircle2 className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card bg-finops-purple/5 rounded-xl p-4 border border-finops-purple/20">
                <h3 className="text-sm font-medium mb-2 text-finops-purple">RCA Rewards</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Confirm correct RCA</p>
                  <span className="text-xs font-semibold bg-finops-purple/10 text-finops-purple py-1 px-2 rounded-full">
                    +100 points
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel: Resolution Workflow */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="glass-card rounded-xl p-5 h-full">
            <h2 className="text-lg font-semibold mb-4">Resolution Workflow</h2>
            <div className="space-y-6">
              <div className="relative">
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start mb-8 last:mb-0">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                      step.status === "completed" 
                        ? "bg-finops-green text-white" 
                        : step.status === "in-progress" 
                          ? "bg-finops-blue text-white animate-pulse-soft"
                          : "bg-finops-gray-200 dark:bg-finops-gray-700 text-finops-gray-500"
                    }`}>
                      {step.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className={`text-base font-medium ${
                        step.status === "in-progress" ? "text-finops-blue" : ""
                      }`}>
                        {step.name}
                      </h3>
                      <p className="text-sm text-finops-gray-500 dark:text-finops-gray-400 mt-1">
                        {step.status === "completed" && "Completed"}
                        {step.status === "in-progress" && "In progress..."}
                        {step.status === "pending" && "Pending"}
                      </p>
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <div className="absolute left-4 top-8 w-[1px] h-12 bg-finops-gray-200 dark:bg-finops-gray-700 transform -translate-x-1/2"></div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="glass-card bg-finops-green/5 rounded-xl p-4 border border-finops-green/20">
                <h3 className="text-sm font-medium mb-3 text-finops-green">Cost Avoidance from Resolution</h3>
                <div className="text-3xl font-bold text-finops-green">$430/month</div>
                <p className="text-xs text-finops-gray-500 dark:text-finops-gray-400 mt-1">
                  Projected savings if issue is fully resolved
                </p>
              </div>
              
              <button className="w-full bg-finops-blue text-white rounded-lg py-3 font-medium hover:bg-finops-blue/90 transition-colors">
                Implement Fix Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Service Drill-Down */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="glass-card rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">Service Drill-Down</h2>
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-4">
                <h3 className="text-sm font-medium mb-3">Anomaly Cost Concentration</h3>
                <div className="h-[250px]">
                  <Chart type="bar" data={serviceData} height={250} />
                </div>
              </div>
              
              <div className="glass-card bg-finops-orange/5 rounded-xl p-4 border border-finops-orange/20">
                <h3 className="text-sm font-medium mb-2 text-finops-orange">Service Spotlight Challenge</h3>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm">Fix EC2 anomaly</p>
                  <span className="text-xs font-semibold bg-finops-orange/10 text-finops-orange py-1 px-2 rounded-full">
                    +200 points
                  </span>
                </div>
                <button className="w-full mt-1 bg-finops-orange/10 text-finops-orange rounded-lg py-2 text-sm font-medium hover:bg-finops-orange/20 transition-colors flex items-center justify-center">
                  Take Challenge
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              
              <div className="glass-card rounded-xl p-4">
                <h3 className="text-sm font-medium mb-3">Resolution Rewards</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Resolve in &lt;1 hr</div>
                    <div className="text-xs font-semibold bg-finops-purple/10 text-finops-purple py-1 px-2 rounded-full">
                      +50 points
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Eliminate recurrence</div>
                    <div className="text-xs font-semibold bg-finops-purple/10 text-finops-purple py-1 px-2 rounded-full">
                      +500 points
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Document solution</div>
                    <div className="text-xs font-semibold bg-finops-purple/10 text-finops-purple py-1 px-2 rounded-full">
                      +100 points
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomalyResolution;
