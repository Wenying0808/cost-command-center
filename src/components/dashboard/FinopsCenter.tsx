import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import MetricCard from "../shared/MetricCard";

// Register the necessary components for Chart.js
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export interface MetricData {
    label: string;
    value: string | number;
    changePercent?: number;
    status?: 'positive' | 'negative' | 'neutral' | 'warning';
    info?: string;
  }
  
interface ChartDataPoint {
    month: string;
    year2023: number;
    year2024: number;
}

interface SectionData {
    title: string;
    metrics: MetricData[];
    chartData?: ChartDataPoint[];
}

const fpiRating = {
    title: "FinOps Maturity",
    value: 4.6,
    maxValue: 5,
    info: "Overall FinOps Practice Index rating across all dimensions"
};

const dashboardSections: SectionData[] = [
{
    title: "Allocation",
    metrics: [
    { label: "Actual Spend (YTD)", value: "$1,500,000", status: "neutral" },
    { label: "Unallocated (YTD)", value: "$400,000", status: "negative" },
    { label: "Unknown Spend (%)", value: "27%", status: "negative" },
    { label: "Tagging Compliance", value: "73%", status: "warning" },
    { label: "Cloud Spend (Month)", value: "$250,000", status: "neutral" },
    ],
    chartData: [
    { month: "Jan", year2023: 170, year2024: 80 },
    { month: "Feb", year2023: 120, year2024: 70 },
    { month: "Mar", year2023: 100, year2024: 50 },
    { month: "Apr", year2023: 80, year2024: 120 },
    { month: "May", year2023: 50, year2024: 130 },
    { month: "Jun", year2023: 70, year2024: 80 },
    { month: "Jul", year2023: 30, year2024: 70 },
    { month: "Aug", year2023: 50, year2024: 90 },
    { month: "Sep", year2023: 80, year2024: 110 },
    { month: "Oct", year2023: 130, year2024: 150 },
    { month: "Nov", year2023: 150, year2024: 135 },
    { month: "Dec", year2023: 80, year2024: 100 },
    ]
},
{
    title: "Anomalies",
    metrics: [
    { label: "Total Spend (YTD)", value: "$100,000", status: "neutral" },
    { label: "Total Spend (%)", value: "7%", status: "negative" },
    { label: "Average Variance", value: "3.25%", status: "positive" },
    { label: "Average Monthly Spend", value: "$6,500", status: "neutral" },
    ],
    chartData: [
    { month: "Jan", year2023: 160, year2024: 70 },
    { month: "Feb", year2023: 90, year2024: 60 },
    { month: "Mar", year2023: 110, year2024: 80 },
    { month: "Apr", year2023: 95, year2024: 60 },
    { month: "May", year2023: 80, year2024: 130 },
    { month: "Jun", year2023: 70, year2024: 100 },
    { month: "Jul", year2023: 30, year2024: 70 },
    { month: "Aug", year2023: 60, year2024: 90 },
    { month: "Sep", year2023: 90, year2024: 60 },
    { month: "Oct", year2023: 140, year2024: 150 },
    { month: "Nov", year2023: 160, year2024: 140 },
    { month: "Dec", year2023: 90, year2024: 100 },
    ]
},
{
    title: "Rate Reductions",
    metrics: [
    { label: "Total Purchased (YTD)", value: "$350,000", status: "neutral" },
    { label: "Total Saved (YTD)", value: "$200,000", status: "positive" },
    { label: "ROI", value: "64%", status: "positive" },
    { label: "Total Coverage %", value: "71%", status: "warning" },
    { label: "Total Utilization %", value: "93%", status: "positive" },
    { label: "Unutilized Spend", value: "$24,500", status: "negative" },
    { label: "Savings Opportunities", value: "$100,000", status: "positive" },
    { label: "Future Commitment Total", value: "$220,000", status: "neutral" },
    ],
    chartData: [
    { month: "Jan", year2023: 150, year2024: 70 },
    { month: "Feb", year2023: 100, year2024: 60 },
    { month: "Mar", year2023: 90, year2024: 80 },
    { month: "Apr", year2023: 60, year2024: 130 },
    { month: "May", year2023: 40, year2024: 120 },
    { month: "Jun", year2023: 70, year2024: 60 },
    { month: "Jul", year2023: 30, year2024: 50 },
    { month: "Aug", year2023: 60, year2024: 80 },
    { month: "Sep", year2023: 40, year2024: 100 },
    { month: "Oct", year2023: 70, year2024: 60 },
    { month: "Nov", year2023: 140, year2024: 150 },
    { month: "Dec", year2023: 90, year2024: 110 },
    ]
},
{
    title: "Usage Reductions",
    metrics: [
    { label: "Savings Opportunities (Current)", value: "$35,000", status: "positive" },
    { label: "Total Cloud Waste (%)", value: "14%", status: "negative" },
    { label: "Total Actions Available", value: "1,200", status: "positive" },
    { label: "Insights to Actions", value: "13 Days", status: "negative" },
    ],
    chartData: [
    { month: "Jan", year2023: 160, year2024: 70 },
    { month: "Feb", year2023: 90, year2024: 60 },
    { month: "Mar", year2023: 110, year2024: 80 },
    { month: "Apr", year2023: 95, year2024: 120 },
    { month: "May", year2023: 50, year2024: 130 },
    { month: "Jun", year2023: 70, year2024: 80 },
    { month: "Jul", year2023: 40, year2024: 40 },
    { month: "Aug", year2023: 50, year2024: 90 },
    { month: "Sep", year2023: 80, year2024: 110 },
    { month: "Oct", year2023: 130, year2024: 80 },
    { month: "Nov", year2023: 150, year2024: 135 },
    { month: "Dec", year2023: 80, year2024: 100 },
    ]
},
{
    title: "Forecasting",
    metrics: [
    { label: "Cloud Growth Rate (%)", value: "4.5%", status: "neutral" },
    { label: "Projected (EOY)", value: "$3,000,000", status: "neutral" },
    { label: "Variance to Plan (%)", value: "2%", status: "positive" },
    { label: "Commitment Required", value: "$2,500,000", status: "neutral" },
    { label: "Next Month Spend", value: "$285,000", status: "neutral" },
    { label: "Variance (%)", value: "4%", status: "warning" },
    ],
    chartData: [
    { month: "Jan", year2023: 160, year2024: 70 },
    { month: "Feb", year2023: 90, year2024: 60 },
    { month: "Mar", year2023: 110, year2024: 80 },
    { month: "Apr", year2023: 95, year2024: 120 },
    { month: "May", year2023: 80, year2024: 130 },
    { month: "Jun", year2023: 70, year2024: 80 },
    { month: "Jul", year2023: 30, year2024: 70 },
    { month: "Aug", year2023: 60, year2024: 90 },
    { month: "Sep", year2023: 80, year2024: 110 },
    { month: "Oct", year2023: 130, year2024: 150 },
    { month: "Nov", year2023: 150, year2024: 135 },
    { month: "Dec", year2023: 80, year2024: 100 },
    ]
},
{
    title: "Unit Costs",
    metrics: [
    { label: "Total CPU (Hr)", value: "$1.75", status: "positive" },
    { label: "Total Storage (GB)", value: "$0.34", status: "positive" },
    { label: "Total Network Transfer", value: "$2.80", status: "warning" },
    ],
    chartData: [
    { month: "Jan", year2023: 160, year2024: 70 },
    { month: "Feb", year2023: 90, year2024: 60 },
    { month: "Mar", year2023: 110, year2024: 80 },
    { month: "Apr", year2023: 95, year2024: 120 },
    { month: "May", year2023: 80, year2024: 130 },
    { month: "Jun", year2023: 70, year2024: 80 },
    { month: "Jul", year2023: 30, year2024: 70 },
    { month: "Aug", year2023: 60, year2024: 90 },
    { month: "Sep", year2023: 80, year2024: 110 },
    { month: "Oct", year2023: 130, year2024: 150 },
    { month: "Nov", year2023: 150, year2024: 135 },
    { month: "Dec", year2023: 80, year2024: 100 },
    ]
}
];


const FinopsCenter: React.FC = () => {
    const navigate = useNavigate();
    // Sample data for the radar chart
    const radarData = {
        labels: ['Allocation', 'Anomalies', 'Forecasting', 'Rate Reduction', 'Usage Reduction', 'Unit Economics'],
        datasets: [
        {
            label: 'Metrics',
            data: [70, 65, 61, 50, 56, 45], // Replace with your actual data
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        },
        ],
    };

    const radarOptions = {
        scales: {
        r: {
            beginAtZero: true,
        },
        },
    };

    return (
        <div className="pb-10 space-y-6">
            {/* Key Metrics Bar */}
            <div className="glass-card rounded-xl p-5 animate-fade-up" style={{ animationDelay: "0.15s" }}>
                <h2 className="text-lg font-semibold mb-4">My Org Performance</h2>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <MetricCard
                    title="FinOps Performance Indicator"
                    value="3.8"
                    trend={{ value: 0.1, isPositive: false }}
                    className="hover:border-finops-blue/30"
                />
                <MetricCard
                    title="Total Spend (YTD)"
                    value="$1,500,000"
                    trend={{ value: 2, isPositive: false }}
                    className="hover:border-finops-blue/30"
                    inverseTrend={true}
                />
                <MetricCard
                    title="Cloud Waste"
                    value="12.5%"
                    trend={{ value: 1.2, isPositive: false }}
                    className="hover:border-finops-blue/30"
                    inverseTrend={true}
                />
                <MetricCard
                    title="Cost Deviation"
                    value="$43,000"
                    trend={{ value: 3.8, isPositive: true }}
                    className="hover:border-finops-blue/30"
                    inverseTrend={true}
                />
                </div>
            </div>
            {/* Radar chart */}
            <div className="mt-6 flex flex-col bg-white p-6 rounded-lg">
                <h3 className="text-sm font-medium mb-4">Areas Radar Chart</h3>
                <div className="h-[500px]">
                <Radar data={radarData} options={radarOptions} />
                </div>
            </div>
        </div>
    );
}

export default FinopsCenter;