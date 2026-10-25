import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Clock,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

export const AnalyticsView: React.FC = () => {
  const {
    employees,
    attendanceRecords,
    leaveRequests,
    jobOpenings,
    applicants,
    performanceReviews,
    trainingPrograms
  } = useHR();

  const [activeMetric, setActiveMetric] = useState<
    'all' | 'workforce' | 'retention' | 'performance' | 'attendance' | 'recruitment' | 'training'
  >('all');

  // Retention analytics data
  const retentionTrends = [
    { year: '2023', retentionRate: 88, industryAvg: 82 },
    { year: '2024', retentionRate: 91, industryAvg: 83 },
    { year: '2025', retentionRate: 94, industryAvg: 84 },
    { year: '2026 MTD', retentionRate: 96.5, industryAvg: 85 }
  ];

  // Headcount growth
  const headcountGrowth = [
    { quarter: 'Q1 2025', headcount: 52 },
    { quarter: 'Q2 2025', headcount: 68 },
    { quarter: 'Q3 2025', headcount: 85 },
    { quarter: 'Q4 2025', headcount: 104 },
    { quarter: 'Q1 2026', headcount: 128 },
    { quarter: 'Q2 2026', headcount: 145 },
    { quarter: 'Q3 2026', headcount: 162 }
  ];

  // Departmental Performance Breakdown
  const deptPerformance = [
    { department: 'Engineering', score: 4.6, target: 4.2 },
    { department: 'Product Design', score: 4.5, target: 4.3 },
    { department: 'Human Resources', score: 4.5, target: 4.0 },
    { department: 'Marketing', score: 4.2, target: 4.0 },
    { department: 'Finance', score: 4.1, target: 4.0 },
    { department: 'Operations', score: 4.3, target: 4.1 }
  ];

  return (
    <div className="space-y-5">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
              Executive HR Intelligence
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
            Workforce Telemetry & Predictive Analytics
          </h1>
          <p className="text-xs text-[#98A2B3] mt-0.5">
            Holistic metrics tracking retention, performance alignment, and operational velocity.
          </p>
        </div>

        <span className="text-xs font-mono text-[#E8C96A] bg-[#151B23] px-3 py-1.5 rounded-lg border border-[#212833]">
          Audit Coverage: 100% Digital Data
        </span>
      </div>

      {/* Analytics Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#212833] pb-2">
        {[
          { id: 'all', label: 'Consolidated Suite' },
          { id: 'workforce', label: 'Workforce & Growth' },
          { id: 'retention', label: 'Retention & Morale' },
          { id: 'performance', label: 'Performance Analytics' },
          { id: 'attendance', label: 'Attendance Telemetry' },
          { id: 'recruitment', label: 'Recruitment Velocity' },
          { id: 'training', label: 'Skill Coverage' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveMetric(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeMetric === tab.id
                ? 'bg-[#151B23] text-[#E8C96A] border border-[#D4AF37]/30'
                : 'text-[#98A2B3] hover:text-[#F5F7FA]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 4 Macro Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <span className="text-xs text-[#98A2B3]">Annual Retention Rate</span>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            96.5%
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +11.5% vs Tech Industry Benchmark
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <span className="text-xs text-[#98A2B3]">Average Time to Fill</span>
          <div className="text-2xl font-bold font-mono text-[#D4AF37] mt-1">
            18.4 Days
          </div>
          <div className="text-[10px] text-[#98A2B3] mt-1 font-mono">
            vs 52 days traditional paper
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <span className="text-xs text-[#98A2B3]">Training Skill Coverage</span>
          <div className="text-2xl font-bold font-mono text-sky-400 mt-1">
            84.2%
          </div>
          <div className="text-[10px] text-sky-400 mt-1 font-mono">
            4 active enterprise programs
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <span className="text-xs text-[#98A2B3]">Payroll Discrepancy SLA</span>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            0.02%
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-mono">
            Automated Biometric Timesheets
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Retention vs Industry Benchmark */}
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">Retention Rate Trend (%)</h3>
              <p className="text-xs text-[#98A2B3]">Company retention vs market average</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1 text-[#D4AF37]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span>HRVISTA</span>
              </span>
              <span className="flex items-center gap-1 text-[#98A2B3]">
                <span className="w-2 h-2 rounded-full bg-[#98A2B3]" />
                <span>Benchmark</span>
              </span>
            </div>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionTrends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#212833" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={{ stroke: '#212833' }} tickLine={false} />
                <YAxis domain={[75, 100]} tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11161D',
                    border: '1px solid #212833',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#F5F7FA'
                  }}
                />
                <Line type="monotone" dataKey="retentionRate" stroke="#D4AF37" strokeWidth={2.5} dot={{ r: 4, fill: '#D4AF37' }} name="HRVISTA Retention" />
                <Line type="monotone" dataKey="industryAvg" stroke="#98A2B3" strokeWidth={1.5} strokeDasharray="3 3" dot={false} name="Industry Baseline" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Headcount Scaling Velocity */}
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">Headcount Growth Curve</h3>
              <p className="text-xs text-[#98A2B3]">Active talent roster trajectory</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">+211% Total Growth</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={headcountGrowth} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#212833" />
                <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={{ stroke: '#212833' }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11161D',
                    border: '1px solid #212833',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#F5F7FA'
                  }}
                />
                <Area type="monotone" dataKey="headcount" stroke="#D4AF37" fillOpacity={1} fill="url(#goldGradient)" name="Headcount" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Performance vs Target */}
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">Department Performance vs Target Standards</h3>
              <p className="text-xs text-[#98A2B3]">Average MBO rating achieved against target threshold (out of 5.0)</p>
            </div>
            <span className="text-xs font-mono text-[#D4AF37]">Q3 Review Results</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#212833" />
                <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={{ stroke: '#212833' }} tickLine={false} />
                <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11161D',
                    border: '1px solid #212833',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#F5F7FA'
                  }}
                />
                <Bar dataKey="score" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={22} name="Achieved Score" />
                <Bar dataKey="target" fill="#212833" radius={[4, 4, 0, 0]} barSize={22} name="Target Threshold" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
