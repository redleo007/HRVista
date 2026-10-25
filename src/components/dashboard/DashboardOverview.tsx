import React from 'react';
import { useHR } from '../../context/HRContext';
import {
  Users,
  UserCheck,
  CalendarOff,
  Briefcase,
  Star,
  Smile,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  Clock,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  FileSpreadsheet
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
  CartesianGrid
} from 'recharts';

export const DashboardOverview: React.FC = () => {
  const {
    employees,
    attendanceRecords,
    leaveRequests,
    jobOpenings,
    applicants,
    performanceReviews,
    trainingPrograms,
    feedbackList,
    setActiveTab,
    currentRole,
    currentUser,
    isEmployeeCheckedInToday,
    checkInEmployee
  } = useHR();

  const totalEmployees = employees.length;
  const today = new Date().toISOString().split('T')[0];
  const presentToday = attendanceRecords.filter(
    r => r.date === today && (r.status === 'Present' || r.status === 'Late')
  ).length;

  const employeesOnLeave = leaveRequests.filter(
    l => l.status === 'Approved' && l.startDate <= today && l.endDate >= today
  ).length || employees.filter(e => e.employmentStatus === 'On Leave').length;

  const openPositions = jobOpenings.filter(j => j.status === 'Open').length;

  // Average Performance
  const completedReviews = performanceReviews.filter(r => r.finalScore > 0);
  const avgPerformance = completedReviews.length > 0
    ? (completedReviews.reduce((sum, r) => sum + r.finalScore, 0) / completedReviews.length).toFixed(1)
    : '4.4';

  // Training Completion Rate
  let totalEnrollments = 0;
  let totalCompletions = 0;
  trainingPrograms.forEach(t => {
    totalEnrollments += t.enrolledEmployeeIds.length;
    totalCompletions += t.completedEmployeeIds.length;
  });
  const trainingCompletionRate = totalEnrollments > 0
    ? Math.round((totalCompletions / totalEnrollments) * 100)
    : 72;

  // Employee Satisfaction
  const avgSatisfaction = feedbackList.length > 0
    ? (feedbackList.reduce((sum, f) => sum + f.overallRating, 0) / feedbackList.length).toFixed(1)
    : '4.3';

  // Department distribution
  const deptCounts: Record<string, { total: number; present: number }> = {};
  employees.forEach(emp => {
    if (!deptCounts[emp.department]) deptCounts[emp.department] = { total: 0, present: 0 };
    deptCounts[emp.department].total += 1;
  });
  attendanceRecords.filter(r => r.date === today && r.status !== 'Absent').forEach(att => {
    if (deptCounts[att.department]) deptCounts[att.department].present += 1;
  });

  const departmentData = Object.keys(deptCounts).map(dept => ({
    department: dept.length > 11 ? dept.substring(0, 9) + '..' : dept,
    headcount: deptCounts[dept].total,
    present: deptCounts[dept].present
  }));

  // Attendance Line Trend
  const monthlyTrendData = [
    { month: 'Jun', attendance: 91, punctuality: 88 },
    { month: 'Jul', attendance: 93, punctuality: 89 },
    { month: 'Aug', attendance: 95, punctuality: 92 },
    { month: 'Sep', attendance: 97, punctuality: 94 },
    { month: 'Oct MTD', attendance: 98, punctuality: 96 }
  ];

  // Performance distribution
  const performanceDist = [
    { bracket: '4.5 - 5.0 (Outstanding)', count: performanceReviews.filter(r => r.finalScore >= 4.5).length || 2 },
    { bracket: '4.0 - 4.4 (Exceeds)', count: performanceReviews.filter(r => r.finalScore >= 4.0 && r.finalScore < 4.5).length || 1 },
    { bracket: '3.5 - 3.9 (Meets)', count: performanceReviews.filter(r => r.finalScore >= 3.5 && r.finalScore < 4.0).length || 1 },
    { bracket: '< 3.5 (Developing)', count: 0 }
  ];

  // Recruitment Funnel
  const recruitmentFunnel = [
    { stage: 'Applied', candidates: applicants.length },
    { stage: 'Shortlisted', candidates: applicants.filter(a => a.status !== 'Applied' && a.status !== 'Rejected').length },
    { stage: 'Interview', candidates: applicants.filter(a => a.status === 'Interview' || a.status === 'Selected').length },
    { stage: 'Selected', candidates: applicants.filter(a => a.status === 'Selected').length }
  ];

  // Status segmentation for Donut
  const statusPieData = [
    { name: 'Active On Site', value: presentToday, color: '#D4AF37' },
    { name: 'On Approved Leave', value: employeesOnLeave || 1, color: '#F59E0B' },
    { name: 'Late / Half-Day', value: attendanceRecords.filter(r => r.date === today && (r.status === 'Late' || r.status === 'Half-Day')).length || 1, color: '#38BDF8' },
    { name: 'Probation / Remote', value: employees.filter(e => e.employmentStatus === 'Probation').length || 1, color: '#22C55E' }
  ];

  // Executive KPI Cards
  const kpis = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      change: '+12.5%',
      trend: 'up',
      period: 'vs last quarter',
      icon: Users,
      color: 'text-[#D4AF37]',
      bg: 'bg-[#D4AF37]/10 border-[#D4AF37]/25',
      tab: 'employees'
    },
    {
      title: 'Present Today',
      value: presentToday,
      change: `${totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 100}%`,
      trend: 'up',
      period: 'on-time rate: 96%',
      icon: UserCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/25',
      tab: 'attendance'
    },
    {
      title: 'Employees On Leave',
      value: employeesOnLeave,
      change: '-2.4%',
      trend: 'down',
      period: 'planned absences',
      icon: CalendarOff,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/25',
      tab: 'leave'
    },
    {
      title: 'Open Job Positions',
      value: openPositions,
      change: `${applicants.length} candidates`,
      trend: 'up',
      period: 'avg SLA: 18 days',
      icon: Briefcase,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/25',
      tab: 'recruitment'
    },
    {
      title: 'Average Performance',
      value: `${avgPerformance}/5.0`,
      change: '+0.3 pts',
      trend: 'up',
      period: 'Q3 appraisal cycle',
      icon: Star,
      color: 'text-[#E8C96A]',
      bg: 'bg-[#D4AF37]/10 border-[#D4AF37]/25',
      tab: 'performance'
    },
    {
      title: 'Employee Satisfaction',
      value: `${avgSatisfaction}/5.0`,
      change: '+4.8%',
      trend: 'up',
      period: `${feedbackList.length} pulse surveys`,
      icon: Smile,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/25',
      tab: 'feedback'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="bg-[#151B23] rounded-xl border border-[#212833] p-6 shadow-md relative overflow-hidden">
        {/* Subtle decorative gold ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#D4AF37]/10 text-[#E8C96A] border border-[#D4AF37]/30">
                Executive Telemetry
              </span>
              <span className="text-xs text-[#98A2B3]">Apex Enterprise HQ · Q4 2026</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F7FA]">
              Good morning, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-xs text-[#98A2B3] mt-1 max-w-2xl leading-relaxed">
              Here's your workforce overview for today. Modern HR information architecture has reduced administrative turnaround by 68%.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('impact')}
              className="px-4 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-sm shadow-[#D4AF37]/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Technology Impact Study</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Executive KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(kpi.tab)}
              className="bg-[#151B23] hover:bg-[#1A222C] rounded-xl border border-[#212833] hover:border-[#D4AF37]/40 p-4 transition-all duration-150 cursor-pointer group shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-[#98A2B3] line-clamp-1">
                    {kpi.title}
                  </span>
                  <div className={`w-7 h-7 rounded-lg ${kpi.bg} border flex items-center justify-center ${kpi.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-xl sm:text-2xl font-bold text-[#F5F7FA] font-mono tabular-nums tracking-tight">
                  {kpi.value}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#212833]/60 flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1 font-mono font-medium text-emerald-400">
                  {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3 text-amber-400" />}
                  <span className={kpi.trend === 'down' ? 'text-amber-400' : ''}>{kpi.change}</span>
                </span>
                <span className="text-[#98A2B3] truncate max-w-[70px]">{kpi.period}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Enterprise Action Ribbon */}
      <div className="bg-[#151B23] rounded-xl border border-[#212833] p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F7FA]">
          <span className="text-[#D4AF37]">✦</span>
          <span>Enterprise Shortcuts:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {currentRole !== 'Employee' && (
            <button
              onClick={() => setActiveTab('employees')}
              className="px-3 py-1.5 text-xs font-medium text-[#F5F7FA] bg-[#11161D] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Add Employee</span>
            </button>
          )}

          {currentRole !== 'Employee' && (
            <button
              onClick={() => setActiveTab('recruitment')}
              className="px-3 py-1.5 text-xs font-medium text-[#F5F7FA] bg-[#11161D] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-sky-400" />
              <span>Publish Job Opening</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('leave')}
            className="px-3 py-1.5 text-xs font-medium text-[#F5F7FA] bg-[#11161D] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CalendarOff className="w-3.5 h-3.5 text-amber-400" />
            <span>Leave Management</span>
          </button>

          {!isEmployeeCheckedInToday(currentUser.employeeId) && (
            <button
              onClick={() => checkInEmployee(currentUser.employeeId, 'Web Portal')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Digital Punch In</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('reports')}
            className="px-3 py-1.5 text-xs font-medium text-[#F5F7FA] bg-[#11161D] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Generate Reports</span>
          </button>
        </div>
      </div>

      {/* Row 1 Charts: Workforce Overview (Bar) + Workforce Status (Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Workforce Overview Bar Chart */}
        <div className="lg:col-span-2 bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">Workforce Allocation & Presence</h3>
              <p className="text-xs text-[#98A2B3]">Department headcount vs live recorded presence</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#98A2B3]">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#212833] inline-block" />
                <span>Headcount</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#E8C96A]">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#D4AF37] inline-block" />
                <span>Present</span>
              </span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#212833" />
                <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={{ stroke: '#212833' }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11161D',
                    border: '1px solid #212833',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#F5F7FA'
                  }}
                />
                <Bar dataKey="headcount" fill="#212833" radius={[4, 4, 0, 0]} barSize={16} name="Headcount" />
                <Bar dataKey="present" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={16} name="Present" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Segmentation Donut Chart */}
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-[#F5F7FA]">Workforce Status Today</h3>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                100% Tracked
              </span>
            </div>
            <p className="text-xs text-[#98A2B3] mb-4">Real-time attendance segmentation</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={72}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11161D',
                    border: '1px solid #212833',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#F5F7FA'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-[#212833] text-xs">
            {statusPieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[#98A2B3]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] text-[#F5F7FA]">{item.name}</span>
                </span>
                <span className="font-mono font-semibold text-[#F5F7FA]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Attendance Trendline + Recruitment Funnel + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Attendance & Punctuality Trend Line */}
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">Attendance Trendline (%)</h3>
              <p className="text-xs text-[#98A2B3]">Biometric precision gains over time</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">98% MTD</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#212833" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={{ stroke: '#212833' }} tickLine={false} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11161D',
                    border: '1px solid #212833',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#F5F7FA'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#D4AF37"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#D4AF37' }}
                  name="Attendance %"
                />
                <Line
                  type="monotone"
                  dataKey="punctuality"
                  stroke="#22C55E"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#22C55E' }}
                  name="Punctuality %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recruitment Funnel Bar Chart */}
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">Recruitment Funnel</h3>
              <p className="text-xs text-[#98A2B3]">Candidate conversion stages</p>
            </div>
            <span className="text-xs font-mono text-sky-400">{applicants.length} total</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recruitmentFunnel} layout="vertical" margin={{ top: 5, right: 20, left: 15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#212833" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="stage" type="category" tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11161D',
                    border: '1px solid #212833',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#F5F7FA'
                  }}
                />
                <Bar dataKey="candidates" fill="#38BDF8" radius={[0, 4, 4, 0]} barSize={16} name="Candidates" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Audit Activities Stream */}
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#212833]">
              <h3 className="text-sm font-bold text-[#F5F7FA]">Recent HR Activity</h3>
              <span className="text-[10px] font-mono text-[#D4AF37]">Live Stream</span>
            </div>

            <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-[#F5F7FA] font-medium leading-tight">
                    Dr. Arvind Sundaram clocked in via Biometric RFID
                  </p>
                  <p className="text-[10px] text-[#98A2B3] mt-0.5 font-mono">08:45 AM · Executive Management</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-[#F5F7FA] font-medium leading-tight">
                    Sneha Balasubramanian requested 5-day Annual Leave
                  </p>
                  <p className="text-[10px] text-[#98A2B3] mt-0.5 font-mono">Yesterday · Pending Review</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                <div>
                  <p className="text-[#F5F7FA] font-medium leading-tight">
                    Harish Raghavan selected for Talent Acquisition Partner
                  </p>
                  <p className="text-[10px] text-[#98A2B3] mt-0.5 font-mono">2 days ago · Offer Issued</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-[#F5F7FA] font-medium leading-tight">
                    Karthik Ramanathan submitted Q3 appraisal (4.75)
                  </p>
                  <p className="text-[10px] text-[#98A2B3] mt-0.5 font-mono">3 days ago · Engineering</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#212833] mt-3">
            <button
              onClick={() => setActiveTab('reports')}
              className="w-full text-center text-xs font-semibold text-[#E8C96A] hover:text-[#D4AF37] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View Full Audit Logs & Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
