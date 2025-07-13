"use client";

import React from "react";
import { DailyTaskList, ExpensesOverviewChart, LeadAnalyticsChart, LeadTypeChart, ProjectRenewalList, ProjectSnapshotChart, StatsCards } from "./components";
// Mock data for the dashboard components
const stats = [
  { label: "Total Leads", value: 234, sub: "Over All leads" },
  { label: "Follow-Ups Due Today", value: 20, sub: "Today's pending work" },
  { label: "Converted Leads", value: 12, sub: "Weekly Leads" },
  { label: "Lost Leads", value: 12, sub: "Weekly Leads" },
  { label: "Conversion Rate", value: "80%", sub: "Lead to Customer" },
];

const projectSnapshotData = [
  { name: "In Progress", value: 20 },
  { name: "Completed", value: 80 },
];
const projectSnapshotColors = ["#3B82F6", "#6366F1"];

const leadAnalyticsData = [
  { name: "New", value: 40 },
  { name: "Profile Sent", value: 35 },
  { name: "Quotation", value: 30 },
  { name: "Not Interested", value: 20 },
  { name: "Call Me Later", value: 25 },
  { name: "Phone Not Received", value: 15 },
  { name: "Business Done", value: 30 },
];

const leadTypeData = [
  { name: "Website", value: 20 },
  { name: "Completed", value: 20 },
  { name: "SEO", value: 20 },
  { name: "Training", value: 20 },
];
const leadTypeColors = ["#10B981", "#3B82F6", "#F59E42", "#6366F1"];

const projectRenewalData = [
  {
    category: "E-Commerce",
    projects: [
      { name: "Flipkart", date: "20 June, 2024", status: 60 },
      { name: "Amazon", date: "21 June, 2024", status: 40 },
    ],
  },
  {
    category: "Shopping",
    projects: [{ name: "Big Bazaar", date: "21 June, 2024", status: 80 }],
  },
  {
    category: "Real Estate",
    projects: [{ name: "DLF", date: "22 June, 2024", status: 50 }],
  },
  {
    category: "Crypto Related",
    projects: [{ name: "Coinbase", date: "22 June, 2024", status: 30 }],
  },
];

const expensesData = [
  { month: "Jan", income: 10000, expense: 5000 },
  { month: "Feb", income: 20000, expense: 10000 },
  { month: "Mar", income: 15000, expense: 8000 },
  { month: "Apr", income: 25000, expense: 12000 },
  { month: "May", income: 30000, expense: 15000 },
  { month: "Jun", income: 20000, expense: 10000 },
  { month: "Jul", income: 35000, expense: 20000 },
  { month: "Aug", income: 40000, expense: 25000 },
  { month: "Sep", income: 30000, expense: 18000 },
  { month: "Oct", income: 25000, expense: 12000 },
  { month: "Nov", income: 45000, expense: 30000 },
  { month: "Dec", income: 50000, expense: 35000 },
];

const dailyTasks = [
  {
    name: "Product List",
    description: "This Project Belongs to the...",
    status: "Open",
    priority: "High",
    due: "24-02-2021",
  },
  {
    name: "Offer List",
    description: "This Project Belongs to the...",
    status: "In Progress",
    priority: "Medium",
    due: "24-02-2021",
  },
  {
    name: "Offer List",
    description: "This Project Belongs to the...",
    status: "Completed",
    priority: "Moderate",
    due: "24-02-2021",
  },
];

const statusColors: Record<string, string> = {
  Open: "bg-green-100 text-green-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-200 text-green-900",
};
const priorityColors: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Moderate: "bg-blue-100 text-blue-700",
};

function Dashboard() {
  return (
    <div className="p-6 md:p-8 bg-[#fafbfc] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Welcome</h1>
        <p className="text-gray-500 text-base">
          Wishing you a productive and fulfilling day ahead!
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <ProjectSnapshotChart
            data={projectSnapshotData}
            colors={projectSnapshotColors}
          />
          <ProjectRenewalList data={projectRenewalData} />
        </div>

        {/* Center Column */}
        <div className="flex flex-col gap-6">
          <LeadAnalyticsChart data={leadAnalyticsData} />
          <ExpensesOverviewChart data={expensesData} />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <LeadTypeChart data={leadTypeData} colors={leadTypeColors} />
        </div>
      </div>

      {/* Daily Task List */}
      <DailyTaskList
        tasks={dailyTasks}
        statusColors={statusColors}
        priorityColors={priorityColors}
      />
    </div>
  );
}

export default Dashboard;
