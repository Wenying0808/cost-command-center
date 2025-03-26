
import React, { useState } from "react";
import { DollarSign, Clock, TrendingUp, Award, Shield, X } from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";
import StatusBadge from "@/components/shared/StatusBadge";
import Chart from "@/components/shared/Chart";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { truncate } from "node:fs";

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [anomalyDetails, setAnomalyDetails] = useState<{
    app: string;
    cost: string;
    service: string;
  } | null>(null);
  
  // Mock data for demonstration
  const anomalyMapData = [
    { name: "App A", value: 3, status: "healthy", cost: "$240", service: "S3" },
    { name: "App B", value: 12, status: "critical", cost: "$1,250", service: "EC2" },
    { name: "App C", value: 7, status: "watch", cost: "$520", service: "Lambda" },
    { name: "App D", value: 4, status: "healthy", cost: "$310", service: "DynamoDB" },
    { name: "App E", value: 8, status: "watch", cost: "$680", service: "RDS" },
    { name: "App F", value: 2, status: "healthy", cost: "$180", service: "CloudFront" },
  ];

  const leaderboardData = [
    { name: "Alex", points: 1250, savings: "$3,400" },
    { name: "Jamie", points: 980, savings: "$2,100" },
    { name: "Casey", points: 820, savings: "$1,800" },
    { name: "Morgan", points: 760, savings: "$1,500" },
    { name: "Taylor", points: 640, savings: "$1,200" },
  ];

  const costDataByService = [
    { name: "S3", value: 60 },
    { name: "EC2", value: 30 },
    { name: "Other", value: 10 },
  ];

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const handleAppClick = (app: string) => {
    navigate("/app-health", { state: { appName: app } });
  };

  const handleHeatmapItemClick = (app: any) => {
    setAnomalyDetails({
      app: app.name,
      cost: app.cost,
      service: app.service
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="glass-card rounded-xl p-6 animate-fade-up">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              My Cost Command Hub
            </h1>
            <p className="text-finops-gray-600 dark:text-finops-gray-300 mt-1">
              {date} • 
              <span className="ml-2 font-medium text-finops-red animate-pulse-soft">
                Total Anomaly Cost Today: $1,234
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Bar */}
      <div className="glass-card rounded-xl p-5 animate-fade-up" style={{ animationDelay: "0.15s" }}>
        <h2 className="text-lg font-semibold mb-4">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <MetricCard
            title="Recurring Anomaly Cost %"
            value="7.2%"
            trend={{ value: 2.5, isPositive: true }}
            className="hover:border-finops-blue/30"
            inverseTrend={true}
          />
          <MetricCard
            title="Cost Escalation Risk %"
            value="4.8%"
            trend={{ value: 1.2, isPositive: true }}
            className="hover:border-finops-blue/30"
            inverseTrend={true}
          />
          <MetricCard
            title="Anomaly Detection Accuracy %"
            value="92.5%"
            trend={{ value: 3.8, isPositive: true }}
            className="hover:border-finops-blue/30"
          />
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel: Personal Scorecard */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="glass-card rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">My Stats</h2>
            <div className="space-y-4">
              <MetricCard
                title="Total Cost of Anomalies Resolved"
                value="$3,547"
                icon={<DollarSign className="h-4 w-4" />}
                trend={{ value: 12, isPositive: true }}
              />
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  title="MTTD"
                  value="1.4 hrs"
                  icon={<Clock className="h-4 w-4" />}
                  trend={{ value: 8, isPositive: true }}
                  inverseTrend={true}
                />
                <MetricCard
                  title="MTTR"
                  value="3.2 hrs"
                  icon={<Clock className="h-4 w-4" />}
                  trend={{ value: 5, isPositive: true }}
                  inverseTrend={true}
                />
              </div>
              <MetricCard
                title="Savings Avoided"
                value="$12,840"
                icon={<TrendingUp className="h-4 w-4" />}
                trend={{ value: 24, isPositive: true }}
              />
              <div className="glass-card bg-finops-gray-50/50 dark:bg-finops-gray-800/50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Points Earned</h3>
                  <span className="text-sm text-finops-blue font-semibold">
                    Rank: #3 of 18
                  </span>
                </div>
                <div className="text-3xl font-bold text-finops-blue">820</div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-3">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-finops-purple/10 text-finops-purple rounded-full px-3 py-1 text-xs font-medium flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    Cost Slayer
                  </div>
                  <div className="bg-finops-teal/10 text-finops-teal rounded-full px-3 py-1 text-xs font-medium flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Quick Fix
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel: Heatmap & Cost by Service */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass-card rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">Percentage of Spend Affected by Anomalies Per App</h2>           
            <div className="space-y-4 mb-6">
              {anomalyMapData.map((app) => (
                <div 
                  key={app.name}
                  className="glass-card hover:shadow-md transition-all duration-200 cursor-pointer rounded-lg p-3 flex justify-between items-center"
                  onClick={() => handleHeatmapItemClick(app)}
                >
                  <div>
                    <div className="font-medium text-finops-blue">{app.name}</div>
                    <div className="text-xs text-finops-gray-500 dark:text-finops-gray-400">
                      {app.value}% anomaly cost
                    </div>
                  </div>
                  <StatusBadge status={app.status as any} />
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-center">
              <button 
                className="text-xs text-finops-blue underline"
                onClick={() => navigate("/app-health")}
              >
                View All Applications
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Gamification Hub */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="glass-card rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">Gamification Hub</h2>
            <div className="space-y-4">
              <div className="glass-card bg-finops-blue/5 rounded-xl p-4 border border-finops-blue/20">
                <h3 className="text-sm font-medium mb-2 text-finops-blue">Challenge of the Week</h3>
                <p className="text-sm">Cut MTTR by 20% – 500 bonus points!</p>
                <div className="mt-3 w-full bg-finops-gray-200 dark:bg-finops-gray-700 rounded-full h-2">
                  <div 
                    className="bg-finops-blue h-2 rounded-full animate-pulse-soft" 
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-right text-finops-gray-500 dark:text-finops-gray-400">
                  13% achieved
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Leaderboard</h3>
                <div className="space-y-2">
                  {leaderboardData.map((user, index) => (
                    <div 
                      key={user.name}
                      className="glass-card rounded-lg p-3 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          index === 0 
                            ? "bg-finops-yellow text-finops-gray-900" 
                            : index === 1 
                              ? "bg-finops-gray-200 text-finops-gray-700"
                              : index === 2
                                ? "bg-finops-teal"
                                : "bg-finops-gray-200 text-finops-gray-700"
                        }`}>
                          {index + 1}
                        </div>
                        <div className="ml-3 font-medium">{user.name}</div>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">{user.points}</span>
                        <span className="text-finops-gray-500 dark:text-finops-gray-400 ml-1 text-xs">
                          pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Anomaly Details
              <DialogClose className="h-4 w-4 opacity-70 hover:opacity-100">
              </DialogClose>
            </DialogTitle>
            <DialogDescription>
              Detailed information about the application anomaly cost.
            </DialogDescription>
          </DialogHeader>
          
          {anomalyDetails && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="font-medium">Application:</span>
                <span className="text-finops-blue font-semibold">{anomalyDetails.app}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="font-medium">Anomaly Cost:</span>
                <span className="text-finops-red font-semibold">{anomalyDetails.cost}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="font-medium">Primary Service:</span>
                <span>{anomalyDetails.service}</span>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-4">Anomaly Cost by Service</h3>
                <div className="h-[180px]">
                  <Chart type="pie" data={costDataByService} height={180} />
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  className="bg-finops-blue hover:bg-finops-blue/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={() => {
                    setShowModal(false);
                    handleAppClick(anomalyDetails.app);
                  }}
                >
                  View Application Details
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardHome;
