import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Chart from '../shared/Chart';
import { ArrowRight } from 'lucide-react';

interface RootCauseAnalysis {
  id: string;
  title: string;
  status: 'to RCA' | 'todo' | 'in progress' | 'done' | 'failed';
  timeToRCA: string;
  MMTD: string;
  MMTR: string;
  costImpact: number;
  costDeviation: number;
  createdAt: string;
  description: string;
  app: string;
  cloudProvider: string;
}

interface DrillDownData {
  chartData: {
    name: string;
    expectedCost: number;
    actualCost: number;
    anomaly: number;
  }[];
  tableData: {
    id: string;
    service: string;
    cost: number;
    percentage: number;
  }[];
  potentialSavings: number;
  rewardPoints: number;
}

// Sample data
const mockRootCauseAnalyses: RootCauseAnalysis[] = [
  {
    id: "rca-001",
    title: "EC2 idle instances",
    status: "to RCA",
    timeToRCA: "",
    MMTD: "2 hr 15 min",
    MMTR: "",
    costImpact: 430,
    costDeviation: 12.5,
    createdAt: "2023-05-15T09:24:00Z",
    description: "Several EC2 instances are running at less than 5% CPU utilization for extended periods.",
    app: "App A",
    cloudProvider: "AWS"
  },
  {
    id: "rca-002",
    title: "S3 bucket policy misconfiguration",
    status: "todo",
    timeToRCA: "1 hr 20 min",
    MMTD: "2 hr 15 min",
    MMTR: "",
    costImpact: 280,
    costDeviation: 8.2,
    createdAt: "2023-05-14T14:37:00Z",
    description: "S3 bucket policies are not optimized for cost efficiency, resulting in unnecessary data transfer costs.",
    app: "App B",
    cloudProvider: "AWS"
  },
  {
    id: "rca-003",
    title: "RDS overprovisioned memory",
    status: "in progress",
    timeToRCA: "55 min",
    MMTD: "2 hr 15 min",
    MMTR: "",
    costImpact: 320,
    costDeviation: 9.5,
    createdAt: "2023-05-14T10:12:00Z",
    description: "RDS instances are provisioned with more memory than needed based on usage patterns.",
    app: "App C",
    cloudProvider: "AWS"
  },
  {
    id: "rca-004",
    title: "Lambda function execution time anomaly",
    status: "done",
    timeToRCA: "1 hr 5 min",
    MMTD: "2 hr 15 min",
    MMTR: "5 hr 20 min",
    costImpact: 150,
    costDeviation: 4.2,
    createdAt: "2023-05-13T16:48:00Z",
    description: "Lambda functions are taking longer to execute than usual, resulting in higher costs.",
    app: "App D",
    cloudProvider: "AWS"
  },
  {
    id: "rca-005",
    title: "Elastic IP addresses not attached",
    status: "todo",
    timeToRCA: "35 min",
    MMTD: "2 hr 15 min",
    MMTR: "",
    costImpact: 75,
    costDeviation: 2.1,
    createdAt: "2023-05-13T11:30:00Z",
    description: "Several Elastic IP addresses are not attached to running instances but are still being billed.",
    app: "App E",
    cloudProvider: "AWS"
  },
  {
    id: "rca-006",
    title: "DynamoDB provisioned capacity overutilization",
    status: "failed",
    timeToRCA: "1 hr 15 min",
    MMTD: "2 hr 15 min",
    MMTR: "2 hr",
    costImpact: 210,
    costDeviation: 6.3,
    createdAt: "2023-05-12T09:15:00Z",
    description: "DynamoDB tables have provisioned capacity significantly higher than actual usage.",
    app: "App F",
    cloudProvider: "AWS"
  },
  {
    id: "rca-007",
    title: "EBS volumes not deleted after instance termination",
    status: "to RCA",
    timeToRCA: "",
    MMTD: "2 hr 15 min",
    MMTR: "",
    costImpact: 185,
    costDeviation: 5.4,
    createdAt: "2023-05-12T08:22:00Z",
    description: "EBS volumes remain after EC2 instance termination, resulting in ongoing storage costs.",
    app: "App G",
    cloudProvider: "AWS"
  },
  {
    id: "rca-008",
    title: "CloudFront distribution caching not optimized",
    status: "to RCA",
    timeToRCA: "",
    MMTD: "2 hr 15 min",
    MMTR: "",
    costImpact: 240,
    costDeviation: 7.1,
    createdAt: "2023-05-11T15:40:00Z",
    description: "CloudFront distributions have suboptimal cache settings, resulting in higher origin request rates.",
    app: "App H",
    cloudProvider: "AWS"
  },
  {
    id: "rca-009",
    title: "NAT Gateway idle but active",
    status: "in progress",
    timeToRCA: "40 min",
    MMTD: "2 hr 15 min",
    MMTR: "",
    costImpact: 195,
    costDeviation: 5.7,
    createdAt: "2023-05-11T13:05:00Z",
    description: "NAT Gateways are deployed but have minimal data processing, resulting in unnecessary hourly charges.",
    app: "App I",
    cloudProvider: "AWS"
  },
  {
    id: "rca-010",
    title: "Redshift cluster running during non-business hours",
    status: "todo",
    timeToRCA: "1hr 10 min",
    MMTD: "2 hr 15 min",
    MMTR: "",
    costImpact: 520,
    costDeviation: 15.3,
    createdAt: "2023-05-10T17:20:00Z",
    description: "Redshift clusters are running 24/7 but are only actively queried during business hours.",
    app: "App J",
    cloudProvider: "AWS"
  },
  {
    id: "rca-011",
    title: "Autoscaling group misconfigured min capacity",
    status: "in progress",
    timeToRCA: "55 min",
    MMTD: "2 hr 15 min",
    MMTR: "",
    costImpact: 310,
    costDeviation: 9.1,
    createdAt: "2023-05-10T10:45:00Z",
    description: "Autoscaling groups have minimum capacity set too high for actual workload requirements.",
    app: "App K",
    cloudProvider: "AWS"
  },
  {
    id: "rca-012",
    title: "Elasticsearch domain oversized",
    status: "failed",
    timeToRCA: "1 hr 25 min",
    MMTD: "2 hr 15 min",
    MMTR: "3 hr 15 min",
    costImpact: 280,
    costDeviation: 8.2,
    createdAt: "2023-05-09T14:30:00Z",
    description: "Elasticsearch domains are provisioned with more instances or larger instance types than needed.",
    app: "App L",
    cloudProvider: "AWS"
  }
];

// Sample drilldown data
const mockDrillDownData: Record<string, DrillDownData> = {
  "rca-001": {
    chartData: [
      { name: "Apr 1", expectedCost: 300, actualCost: 305, anomaly: 0 },
      { name: "Apr 5", expectedCost: 310, actualCost: 315, anomaly: 0 },
      { name: "Apr 10", expectedCost: 320, actualCost: 350, anomaly: 0 },
      { name: "Apr 15", expectedCost: 330, actualCost: 380, anomaly: 0 },
      { name: "Apr 20", expectedCost: 340, actualCost: 420, anomaly: 1 },
      { name: "Apr 25", expectedCost: 350, actualCost: 470, anomaly: 1 },
      { name: "Apr 30", expectedCost: 360, actualCost: 520, anomaly: 1 },
      { name: "May 5", expectedCost: 370, actualCost: 570, anomaly: 1 },
      { name: "May 10", expectedCost: 380, actualCost: 620, anomaly: 1 },
      { name: "May 15", expectedCost: 390, actualCost: 670, anomaly: 1 },
    ],
    tableData: [
      { id: "1", service: "EC2 - t2.large", cost: 210, percentage: 48.8 },
      { id: "2", service: "EC2 - m5.xlarge", cost: 120, percentage: 27.9 },
      { id: "3", service: "EC2 - c5.large", cost: 65, percentage: 15.1 },
      { id: "4", service: "EC2 - t3.medium", cost: 35, percentage: 8.2 },
    ],
    potentialSavings: 430,
    rewardPoints: 100
  },
  "rca-002": {
    chartData: [
      { name: "Apr 1", expectedCost: 120, actualCost: 125, anomaly: 0 },
      { name: "Apr 5", expectedCost: 125, actualCost: 130, anomaly: 0 },
      { name: "Apr 10", expectedCost: 130, actualCost: 150, anomaly: 0 },
      { name: "Apr 15", expectedCost: 135, actualCost: 170, anomaly: 0 },
      { name: "Apr 20", expectedCost: 140, actualCost: 190, anomaly: 1 },
      { name: "Apr 25", expectedCost: 145, actualCost: 210, anomaly: 1 },
      { name: "Apr 30", expectedCost: 150, actualCost: 230, anomaly: 1 },
      { name: "May 5", expectedCost: 155, actualCost: 250, anomaly: 1 },
      { name: "May 10", expectedCost: 160, actualCost: 270, anomaly: 1 },
      { name: "May 15", expectedCost: 165, actualCost: 290, anomaly: 1 },
    ],
    tableData: [
      { id: "1", service: "S3 Standard Storage", cost: 120, percentage: 42.9 },
      { id: "2", service: "S3 Data Transfer OUT", cost: 95, percentage: 33.9 },
      { id: "3", service: "S3 PUT/COPY/POST Requests", cost: 35, percentage: 12.5 },
      { id: "4", service: "S3 GET Requests", cost: 30, percentage: 10.7 },
    ],
    potentialSavings: 280,
    rewardPoints: 75
  },
  // ... could add more for other RCAs
};

const serviceData = [
    { name: "EC2", value: 300 },
    { name: "S3", value: 120 },
    { name: "RDS", value: 80 },
    { name: "Lambda", value: 40 },
];

const RootCauseAnalysisTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRCA, setSelectedRCA] = useState<RootCauseAnalysis | null>(null);
  const [drillDownOpen, setDrillDownOpen] = useState(false);
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockRootCauseAnalyses.length / itemsPerPage);
  
  const paginatedItems = mockRootCauseAnalyses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleDrillDown = (rca: RootCauseAnalysis) => {
    setSelectedRCA(rca);
    setDrillDownOpen(true);
  };
  
  const handleCreateJiraTicket = () => {
    if (!selectedRCA) return;
    
    toast.success("JIRA ticket created successfully", {
      description: `Ticket created for anomaly: ${selectedRCA.title}`
    });
    
    setDrillDownOpen(false);
  };
  
  const handleDiscardAnomaly = () => {
    if (!selectedRCA) return;
    
    toast.info("Anomaly has been discarded", {
      description: `Anomaly ${selectedRCA.title} has been discarded`
    });
    
    setDrillDownOpen(false);
  };
  
  const handleConfirmRCA = () => {
    if (!selectedRCA) return;
    
    toast.success("Root Cause Analysis confirmed", {
      description: `You earned ${mockDrillDownData[selectedRCA.id]?.rewardPoints || 100} points for confirming this RCA`
    });
    
    setDrillDownOpen(false);
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
        case 'to RCA': return 'bg-gray-500/10 text-gray-500'; // Gray
        case 'todo': return 'bg-yellow-500/10 text-yellow-500'; // Yellow
        case 'in progress': return 'bg-blue-500/10 text-blue-600'; // Blue
        case 'review': return 'bg-purple-500/10 text-purple-500'; // Purple
        case 'done': return 'bg-green-500/10 text-green-500'; // Green
        case 'failed': return 'bg-red-500/10 text-red-500'; // Red (optional)
        default: return 'bg-gray-300/10 text-gray-300'; // Default color
    }
  };
  
  const formatStatus = (status: string) => {
    switch (status) {
        case 'to RCA': return 'to RCA';
        case 'todo' : return 'Todo';
      case 'in progress': return 'In Progress';
      case 'done': return 'Done';
      case 'failed': return 'Failed';
      default: return 'Pending';
    }
  };
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">AI Suggestions</h2>
        <span className="text-sm text-finops-text-secondary">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, mockRootCauseAnalyses.length)} of {mockRootCauseAnalyses.length} items
        </span>
      </div>
      <div className="flex space-x-4 mb-4">
        <select className="border rounded p-2">
          <option value="">All Statuses</option>
          <option value="to RCA">To RCA</option>
          <option value="todo">Todo</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
          <option value="failed">Failed</option>
        </select>
        <select className="border rounded p-2">
          <option value="">All Cloud Providers</option>
          <option value="AWS">AWS</option>
          <option value="Azure">Azure</option>
          <option value="GCP">GCP</option>
          {/* Add more cloud providers as needed */}
        </select>
      </div>
      
      <div className="bg-white rounded-lg border border-finops-border-light overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-medium">Opportunity</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">MMTD</TableHead>
              <TableHead className="font-medium">Time to RCA</TableHead>
              <TableHead className="font-medium">MMTR</TableHead>
              <TableHead className="font-medium text-right">Cost Impact</TableHead>
              <TableHead className="font-medium text-right">Deviation %</TableHead>
              <TableHead className="font-medium">App</TableHead>
              <TableHead className="font-medium">Cloud Provider</TableHead>
              <TableHead className="font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((rca) => (
              <TableRow 
                key={rca.id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <TableCell className="font-medium">{rca.title}</TableCell>
                <TableCell>
                  <span className={`rounded-full px-2 py-1 text-white ${getStatusClass(rca.status)}`}>
                    {formatStatus(rca.status)}
                  </span>
                </TableCell>
                <TableCell>{rca.MMTD}</TableCell>
                <TableCell>{rca.timeToRCA}</TableCell>
                <TableCell>{rca.MMTR}</TableCell>
                <TableCell className="text-right">${rca.costImpact.toLocaleString()}</TableCell>
                <TableCell className="text-right">{rca.costDeviation}%</TableCell>
                <TableCell>{rca.app}</TableCell>
                <TableCell>{rca.cloudProvider}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-finops-blue/85 hover:bg-finops-blue/95 text-white hover:text-white transition-colors duration-200"
                    onClick={() => handleDrillDown(rca)}
                  >
                    Drill Down
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Pagination className="pt-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink 
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      {/* Drill Down Modal */}
      <Dialog open={drillDownOpen} onOpenChange={setDrillDownOpen}>
        <DialogContent className="sm:max-w-[1200px] p-0 overflow-hidden">
          {selectedRCA && mockDrillDownData[selectedRCA.id] && (
            <div className="flex flex-col max-h-[85vh]">
              <div className="p-6 border-b border-finops-border-light">
                <h2 className="text-xl font-medium">{selectedRCA.title}</h2>
                <p className="text-finops-text-secondary mt-1">{selectedRCA.description}</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Cost Anomaly Graph */}
                <div className="finops-card">
                  <h3 className="text-lg font-medium mb-4">Cost Trend & Anomaly Detection</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={mockDrillDownData[selectedRCA.id].chartData}
                        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="expectedCost" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0070F3" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#0070F3" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="actualCost" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                        <YAxis stroke="#6B7280" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #E5E7EB'
                          }} 
                          formatter={(value, name) => [`$${value}`, name === 'expectedCost' ? 'Expected Cost' : 'Actual Cost']}
                        />
                        <Legend 
                          formatter={(value) => value === 'expectedCost' ? 'Expected Cost' : value === 'actualCost' ? 'Actual Cost' : 'Anomaly'}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="expectedCost" 
                          stroke="#0070F3" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#expectedCost)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="actualCost" 
                          stroke="#EF4444" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#actualCost)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="mt-3 flex items-center justify-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-finops-blue"></div>
                        <span className="text-sm text-finops-text-secondary">Expected Cost</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-finops-red"></div>
                        <span className="text-sm text-finops-text-secondary">Actual Cost</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <span className="text-sm text-finops-text-secondary">Anomaly Period</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Drill-down table */}
                <div className="finops-card">
                  <h3 className="text-lg font-medium mb-4">Cost Breakdown</h3>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-medium">Service</TableHead>
                        <TableHead className="font-medium text-right">Cost</TableHead>
                        <TableHead className="font-medium text-right">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockDrillDownData[selectedRCA.id].tableData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.service}</TableCell>
                          <TableCell className="text-right">${item.cost.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{item.percentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                        {/* Service Drill-Down */}
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
                </div>
                </div>
                </div>

                
                
                {/* Savings & Rewards Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card bg-finops-green/5 rounded-xl p-4 border border-finops-green/20">
                        <h3 className="text-sm font-medium mb-3 text-finops-green">Cost Avoidance from Resolution</h3>
                        <div className="text-3xl font-bold text-finops-green">$430/month</div>
                        <p className="text-xs text-finops-gray-500 dark:text-finops-gray-400 mt-1">
                        Projected savings if issue is fully resolved
                        </p>
                    </div>
                  
                  <div className="glass-card bg-finops-purple/5 rounded-xl p-4 border border-finops-purple/20">
                    <h3 className="text-sm font-medium mb-2 text-finops-purple">RCA Rewards</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Confirm correct RCA</p>
                            <span className="text-xs font-semibold bg-finops-purple/10 text-finops-purple py-1 px-2 rounded-full">
                                +100 points
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Report False Alert</p>
                            <span className="text-xs font-semibold bg-finops-purple/10 text-finops-purple py-1 px-2 rounded-full">
                                +100 points
                            </span>
                        </div>
                    </div>
                    
                  </div>
                  <div className="glass-card bg-finops-purple/5 rounded-xl p-4 border border-finops-purple/20">
                    <h3 className="text-sm font-medium mb-2 text-finops-purple">Resolution Rewards</h3>
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
              
              <div className="p-6 border-t border-finops-border-light bg-gray-50 flex justify-between">
                <Button 
                  variant="outline"
                  className="finops-button-secondary"
                  onClick={handleDiscardAnomaly}
                >
                  Discard Anomaly
                </Button>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline"
                    className="finops-button-secondary"
                    onClick={handleCreateJiraTicket}
                  >
                    Create JIRA Ticket
                  </Button>
                  <Button 
                    className="finops-button-primary"
                    onClick={handleConfirmRCA}
                  >
                    Confirm Root Cause
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RootCauseAnalysisTable;