
import React from "react";
import { TrendingUp, ArrowRight, Flag } from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";
import StatusBadge from "@/components/shared/StatusBadge";
import Chart from "@/components/shared/Chart";

const AppHealth: React.FC = () => {
  // Mock data for demonstration
  const appHealth = {
    name: "App X",
    score: 82,
    status: "green",
    totalSpend: "$12,450",
    anomalyCost: "$980",
    anomalyTrend: { value: 15, isPositive: false }
  };

  const anomalyDistribution = [
    { name: "S3", value: 60 },
    { name: "EC2", value: 30 },
    { name: "Lambda", value: 10 }
  ];

  const topAnomalies = [
    { 
      id: 1, 
      title: "S3 overprovisioning", 
      service: "S3", 
      potentialSavings: "$200",
      severity: "high" 
    },
    { 
      id: 2, 
      title: "Idle EC2 instances", 
      service: "EC2", 
      potentialSavings: "$150",
      severity: "medium" 
    },
    { 
      id: 3, 
      title: "Oversized Lambda functions", 
      service: "Lambda", 
      potentialSavings: "$80",
      severity: "low" 
    }
  ];

  const performanceData = [
    { name: "Mar 1", value: 5.2, secondValue: 8.4 },
    { name: "Mar 8", value: 4.8, secondValue: 7.9 },
    { name: "Mar 15", value: 3.5, secondValue: 6.2 },
    { name: "Mar 22", value: 4.1, secondValue: 7.0 },
    { name: "Mar 29", value: 3.2, secondValue: 5.8 }
  ];

  const statusLogs = [
    {
      date: "Mar 20", 
      status: "yellow", 
      description: "High S3 anomaly cost resolved by Jane (+200 points)"
    },
    {
      date: "Mar 15", 
      status: "green", 
      description: "Proactive cost optimization by team (+150 points)"
    },
    {
      date: "Mar 10", 
      status: "red", 
      description: "Critical EC2 cost spike detected"
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* App Header */}
      <div className="glass-card rounded-xl p-6 animate-fade-up">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight mr-3">
              {appHealth.name}
            </h1>
            <StatusBadge 
              status={appHealth.status as any} 
              label={`${appHealth.score}/100`} 
              className="text-sm px-3 py-1" 
            />
          </div>
          <div className="flex items-center text-finops-gray-600 dark:text-finops-gray-300">
            <span className="font-medium">Total Spend:</span>
            <span className="ml-2 font-semibold">{appHealth.totalSpend}</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel: Health Breakdown */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="glass-card rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">Health Breakdown</h2>
            <div className="space-y-4">
              <MetricCard
                title="Total Cost of Anomalies"
                value={appHealth.anomalyCost}
                trend={appHealth.anomalyTrend}
              />
              
              <div className="glass-card rounded-xl p-4">
                <h3 className="text-sm font-medium mb-3">Anomaly Cost Concentration</h3>
                <div className="h-[180px]">
                  <Chart type="pie" data={anomalyDistribution} height={180} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  title="Recurring Anomaly Cost"
                  value="12%"
                  className="border-finops-yellow/30 bg-finops-yellow/5"
                />
                <MetricCard
                  title="Cost Escalation Risk"
                  value="8%"
                  className="border-finops-green/30 bg-finops-green/5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel: Actionable Insights */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass-card rounded-xl p-5 h-full">
            <h2 className="text-lg font-semibold mb-4">Actionable Insights</h2>
            <div className="space-y-4">
              <h3 className="text-sm font-medium mb-2">Top Anomalies</h3>
              
              {topAnomalies.map((anomaly) => (
                <div 
                  key={anomaly.id}
                  className="glass-card hover:shadow-md transition-all duration-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{anomaly.title}</div>
                      <div className="text-xs text-finops-gray-500 dark:text-finops-gray-400">
                        Service: {anomaly.service}
                      </div>
                    </div>
                    <StatusBadge 
                      status={
                        anomaly.severity === "high" 
                          ? "red" 
                          : anomaly.severity === "medium" 
                            ? "yellow" 
                            : "green"
                      } 
                      label={anomaly.severity}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm">
                      <span className="text-finops-gray-500 dark:text-finops-gray-400">
                        Cost Avoidance:
                      </span>
                      <span className="ml-1 font-semibold text-finops-green">
                        {anomaly.potentialSavings}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-finops-blue text-white rounded-full px-3 py-1 text-xs font-medium flex items-center hover:bg-finops-blue/90 transition-colors">
                        Resolve Now
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </button>
                      <button className="bg-finops-gray-200 dark:bg-finops-gray-700 text-finops-gray-700 dark:text-finops-gray-200 rounded-full px-3 py-1 text-xs font-medium flex items-center hover:bg-finops-gray-300 dark:hover:bg-finops-gray-600 transition-colors">
                        <Flag className="h-3 w-3 mr-1" />
                        Flag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="glass-card bg-finops-blue/5 rounded-xl p-4 border border-finops-blue/20 mt-6">
                <h3 className="text-sm font-medium mb-2 text-finops-blue">AI Recommendation</h3>
                <p className="text-sm">Consider implementing lifecycle policies for S3 buckets to save up to $320/month.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Performance Timeline */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="glass-card rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">Performance Timeline</h2>
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-4">
                <h3 className="text-sm font-medium mb-3">MTTD & MTTR Trends</h3>
                <div className="text-xs text-finops-gray-500 dark:text-finops-gray-400 mb-2">
                  <span className="inline-block w-3 h-3 bg-finops-blue rounded-full mr-1"></span> MTTD
                  <span className="inline-block w-3 h-3 bg-finops-teal rounded-full ml-4 mr-1"></span> MTTR
                </div>
                <div className="h-[180px]">
                  <Chart type="line" data={performanceData} height={180} />
                </div>
              </div>
              
              <div className="glass-card bg-finops-green/5 rounded-xl p-4 border border-finops-green/20">
                <h3 className="text-sm font-medium mb-2 text-finops-green">Quick Wins</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Reduce MTTR by 1 hr</p>
                  <span className="text-xs font-semibold bg-finops-green/10 text-finops-green py-1 px-2 rounded-full">
                    +50 points
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Health Status Log</h3>
                <div className="space-y-3">
                  {statusLogs.map((log, index) => (
                    <div key={index} className="glass-card rounded-lg p-3">
                      <div className="flex items-center">
                        <StatusBadge status={log.status as any} className="mr-2" />
                        <div className="text-sm font-medium">{log.date}</div>
                      </div>
                      <p className="text-xs text-finops-gray-600 dark:text-finops-gray-300 mt-1">
                        {log.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHealth;
