import React from "react";
import { Users, Trophy, TrendingUp, CheckCircle2, BarChart } from "lucide-react";
import MetricCard from "@/components/shared/MetricCard";
import StatusBadge from "@/components/shared/StatusBadge";
import Chart from "@/components/shared/Chart";

const TeamScorecard: React.FC = () => {
  // Mock data
  const teamData = {
    name: "Cloud Optimizers",
    totalPoints: 12450,
    rank: "3 of 12",
    savings: "$42,320"
  };

  const teamFPIs = {
    anomaliesReduced: "$18,540",
    recurringCost: "5.8%",
    mttd: "1.8 hrs",
    mttr: "4.2 hrs",
    detectionAccuracy: "91%"
  };

  const teamApps = [
    { name: "App A", score: 90, status: "green", risk: "2%" },
    { name: "App B", score: 60, status: "yellow", risk: "8%" },
    { name: "App C", score: 85, status: "green", risk: "3%" },
    { name: "App D", score: 42, status: "red", risk: "15%" },
  ];

  const teamChallenges = [
    { 
      id: 1, 
      title: "Cut escalation risk by 10%", 
      reward: "Team Lunch", 
      progress: 65 
    },
    { 
      id: 2, 
      title: "Resolve all critical anomalies", 
      reward: "500 bonus points", 
      progress: 80 
    },
    { 
      id: 3, 
      title: "Reduce MTTR by 20%", 
      reward: "Recognition Award", 
      progress: 40 
    }
  ];

  const topTeamMembers = [
    { name: "Jane", points: 1200, avatar: "J" },
    { name: "Mike", points: 900, avatar: "M" },
    { name: "Sarah", points: 850, avatar: "S" },
    { name: "Alex", points: 720, avatar: "A" },
  ];

  const trendData = [
    { name: "Jan", value: 5200 },
    { name: "Feb", value: 4800 },
    { name: "Mar", value: 3200 },
    { name: "Apr", value: 2700 },
    { name: "May", value: 1900 },
    { name: "Jun", value: 1450 },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Team Header */}
      <div className="glass-card rounded-xl p-6 animate-fade-up bg-finops-purple/5 border border-finops-purple/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-finops-purple mr-3" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {teamData.name}
              </h1>
              <p className="text-finops-gray-600 dark:text-finops-gray-300 mt-1">
                Team Scorecard
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <div className="text-sm text-finops-gray-500 dark:text-finops-gray-400">Total Points</div>
              <div className="font-bold text-xl text-finops-purple">{teamData.totalPoints}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-finops-gray-500 dark:text-finops-gray-400">Rank</div>
              <div className="font-bold text-xl">#{teamData.rank}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-finops-gray-500 dark:text-finops-gray-400">Savings</div>
              <div className="font-bold text-xl text-finops-green">{teamData.savings}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel: Team FPIs */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="glass-card rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">Team FPIs</h2>
            <div className="space-y-4">
              <MetricCard
                title="Total Cost of Anomalies Reduced"
                value={teamFPIs.anomaliesReduced}
                icon={<TrendingUp className="h-4 w-4" />}
                trend={{ value: 15, isPositive: true }}
              />
              
              <MetricCard
                title="Recurring Cost Percentage"
                value={teamFPIs.recurringCost}
                trend={{ value: 2.5, isPositive: true }}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  title="MTTD Average"
                  value={teamFPIs.mttd}
                  trend={{ value: 8, isPositive: true }}
                />
                <MetricCard
                  title="MTTR Average"
                  value={teamFPIs.mttr}
                  trend={{ value: 5, isPositive: true }}
                />
              </div>
              
              <MetricCard
                title="Detection Accuracy"
                value={teamFPIs.detectionAccuracy}
                trend={{ value: 3, isPositive: true }}
              />
            </div>
          </div>
        </div>

        {/* Center Panel: App Ownership */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass-card rounded-xl p-5 h-full">
            <h2 className="text-lg font-semibold mb-4">App Ownership</h2>
            <div className="space-y-4">
              {teamApps.map((app) => (
                <div 
                  key={app.name}
                  className="glass-card hover:shadow-md transition-all duration-200 cursor-pointer rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <div className="font-medium">{app.name}</div>
                        <StatusBadge 
                          status={app.status as any} 
                          label={app.score.toString()} 
                          className="ml-2" 
                        />
                      </div>
                      <div className="text-xs text-finops-gray-500 dark:text-finops-gray-400 mt-1">
                        Cost Escalation Risk: {app.risk}
                      </div>
                    </div>
                    <div>
                      <button className="text-finops-blue hover:text-finops-blue/80 transition-colors">
                        <BarChart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="glass-card bg-finops-blue/5 rounded-xl p-4 border border-finops-blue/20 mt-4">
                <h3 className="text-sm font-medium mb-3 text-finops-blue">App Health Summary</h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-finops-green">2</div>
                      <div className="text-xs text-finops-gray-500 dark:text-finops-gray-400">
                        Green
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-finops-yellow">1</div>
                      <div className="text-xs text-finops-gray-500 dark:text-finops-gray-400">
                        Yellow
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-finops-red">1</div>
                      <div className="text-xs text-finops-gray-500 dark:text-finops-gray-400">
                        Red
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">69</div>
                    <div className="text-xs text-finops-gray-500 dark:text-finops-gray-400">
                      Avg Score
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Gamified Progress */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="glass-card rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">Gamified Progress</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Team Challenges</h3>
                <div className="space-y-4">
                  {teamChallenges.map((challenge) => (
                    <div 
                      key={challenge.id}
                      className="glass-card rounded-lg p-4"
                    >
                      <div className="flex items-center mb-2">
                        <Trophy className="h-4 w-4 text-finops-yellow mr-2" />
                        <div className="font-medium text-sm">{challenge.title}</div>
                      </div>
                      <div className="flex justify-between items-center text-xs mb-2">
                        <div className="text-finops-gray-500 dark:text-finops-gray-400">Reward: {challenge.reward}</div>
                        <div className="font-medium">{challenge.progress}%</div>
                      </div>
                      <div className="w-full bg-finops-gray-200 dark:bg-finops-gray-700 rounded-full h-2">
                        <div 
                          className="bg-finops-blue h-2 rounded-full" 
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Top Performers</h3>
                <div className="space-y-2">
                  {topTeamMembers.map((member, index) => (
                    <div 
                      key={member.name}
                      className="glass-card rounded-lg p-3 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-finops-blue/10 text-finops-blue flex items-center justify-center font-medium mr-3">
                          {member.avatar}
                        </div>
                        <div className="font-medium">{member.name}</div>
                        {index === 0 && (
                          <div className="ml-2 bg-finops-yellow/10 text-finops-yellow text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                            <Trophy className="h-3 w-3 mr-1" />
                            Leader
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-semibold">{member.points}</span>
                        <span className="text-finops-gray-500 dark:text-finops-gray-400 text-xs ml-1">pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Line */}
      <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-lg font-semibold mb-4">Anomaly Cost Reduction Over Time</h2>
        <div className="h-[300px]">
          <Chart type="area" data={trendData} height={300} />
        </div>
        <div className="mt-4 flex items-center justify-center text-sm text-finops-gray-500 dark:text-finops-gray-400">
          <CheckCircle2 className="h-4 w-4 text-finops-green mr-2" />
          <span>
            Your team reduced anomaly costs by <span className="font-semibold text-finops-green">72%</span> over the last 6 months
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamScorecard;
