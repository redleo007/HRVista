import React, { useEffect, useState } from 'react';
import { useHR } from '../../context/HRContext';
import {
  Users,
  UserCheck,
  CalendarOff,
  Briefcase,
  Star,
  Smile,
  Plus,
  Clock,
  FileSpreadsheet,
  ArrowRight,
  ClipboardList,
  CalendarDays,
  UserPlus,
  BarChart3
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const chartColors = { navy: '#172554', violet: '#6D28D9', green: '#16A34A', amber: '#D97706', slate: '#CBD5E1' };

const formatDate = (date: Date) => new Intl.DateTimeFormat('en-IN', {
  day: '2-digit', month: 'short', year: 'numeric'
}).format(date);

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getGreeting = (hour: number) => {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
};

export const DashboardOverview: React.FC = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(clock);
  }, []);

  const {
    employees, attendanceRecords, leaveRequests, jobOpenings, applicants,
    performanceReviews, feedbackList, notifications, setActiveTab, currentRole,
    currentUser, isEmployeeCheckedInToday, checkInEmployee
  } = useHR();

  const today = toDateKey(now);
  const reportingPeriod = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(now);
  const currentTime = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' }).format(now);
  const presentToday = attendanceRecords.filter(record =>
    record.date === today && ['Present', 'Late', 'Half-Day'].includes(record.status)
  ).length;
  const onLeaveToday = leaveRequests.filter(leave =>
    leave.status === 'Approved' && leave.startDate <= today && leave.endDate >= today
  ).length;
  const openPositions = jobOpenings.filter(job => job.status === 'Open').length;
  const completedReviews = performanceReviews.filter(review => review.finalScore > 0);
  const averagePerformance = completedReviews.length
    ? (completedReviews.reduce((sum, review) => sum + review.finalScore, 0) / completedReviews.length).toFixed(1)
    : '—';
  const averageSatisfaction = feedbackList.length
    ? (feedbackList.reduce((sum, feedback) => sum + feedback.overallRating, 0) / feedbackList.length).toFixed(1)
    : '—';
  const attendanceRate = employees.length ? Math.round((presentToday / employees.length) * 100) : 0;

  const departmentData = Array.from(new Set(employees.map(employee => employee.department))).map(department => ({
    department: department.length > 14 ? `${department.slice(0, 12)}...` : department,
    employees: employees.filter(employee => employee.department === department).length,
    present: attendanceRecords.filter(record =>
      record.date === today && record.department === department && record.status !== 'Absent'
    ).length
  }));

  const recruitmentData = [
    { stage: 'Applied', candidates: applicants.length },
    { stage: 'Shortlisted', candidates: applicants.filter(applicant => !['Applied', 'Rejected'].includes(applicant.status)).length },
    { stage: 'Interview', candidates: applicants.filter(applicant => ['Interview', 'Selected'].includes(applicant.status)).length },
    { stage: 'Selected', candidates: applicants.filter(applicant => applicant.status === 'Selected').length }
  ];

  const statusData = [
    { name: 'Present', value: presentToday, color: chartColors.violet },
    { name: 'On leave', value: onLeaveToday, color: chartColors.amber },
    { name: 'Not recorded', value: Math.max(employees.length - presentToday - onLeaveToday, 0), color: chartColors.slate }
  ].filter(item => item.value > 0);

  const kpis = [
    { label: 'Total employees', value: employees.length, detail: 'Active workforce records', icon: Users, tone: 'violet', tab: 'employees' },
    { label: 'Present today', value: presentToday, detail: `${attendanceRate}% of workforce recorded`, icon: UserCheck, tone: 'green', tab: 'attendance' },
    { label: 'On leave today', value: onLeaveToday, detail: 'Approved leave requests', icon: CalendarOff, tone: 'amber', tab: 'leave' },
    { label: 'Open positions', value: openPositions, detail: `${applicants.length} applicants in pipeline`, icon: Briefcase, tone: 'violet', tab: 'recruitment' },
    { label: 'Average performance', value: averagePerformance, detail: `${completedReviews.length} completed reviews`, icon: Star, tone: 'amber', tab: 'performance' },
    { label: 'Employee satisfaction', value: averageSatisfaction, detail: `${feedbackList.length} feedback responses`, icon: Smile, tone: 'green', tab: 'feedback' }
  ];

  const quickActions = [
    { label: 'Add employee', icon: UserPlus, tab: 'employees', visible: currentRole !== 'Employee' },
    { label: 'Publish job opening', icon: Plus, tab: 'recruitment', visible: currentRole !== 'Employee' },
    { label: 'Manage leave', icon: CalendarDays, tab: 'leave', visible: true },
    { label: 'Check in', icon: Clock, tab: 'attendance', visible: !isEmployeeCheckedInToday(currentUser.employeeId), action: () => checkInEmployee(currentUser.employeeId, 'Web Portal') },
    { label: 'Generate reports', icon: FileSpreadsheet, tab: 'reports', visible: true }
  ];

  return (
    <div className="space-y-7">
      <section className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-violet-700">HRVISTA overview</p>
          <h1 className="text-3xl font-bold tracking-tight text-[#172554]">{getGreeting(now.getHours())}, {currentRole}</h1>
          <p className="mt-2 text-base text-slate-600">A clear view of your workforce for {formatDate(now)}.</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500"><BarChart3 className="h-4 w-4 text-violet-700" /><span>Reporting period: {reportingPeriod}</span><span className="text-slate-300">|</span><span>Updated {currentTime}</span></div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6" aria-label="Workforce key performance indicators">
        {kpis.map(({ label, value, detail, icon: Icon, tone, tab }) => {
          const toneClasses = { violet: 'bg-violet-50 text-violet-700', green: 'bg-emerald-50 text-emerald-700', amber: 'bg-amber-50 text-amber-700' }[tone];
          return <button key={label} onClick={() => setActiveTab(tab)} className="group min-h-[142px] rounded-xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500">
            <div className="flex items-start justify-between gap-3"><span className="text-sm font-medium leading-5 text-slate-600">{label}</span><span className={`rounded-lg p-2 ${toneClasses}`}><Icon className="h-5 w-5" /></span></div>
            <div className="mt-4 text-3xl font-bold tabular-nums text-[#172554]">{value}</div><p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
          </button>;
        })}
      </section>

      <section className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5" aria-label="Quick actions">
        <div className="mb-3 flex items-center justify-between gap-3"><div><h2 className="text-lg font-semibold text-[#172554]">Quick actions</h2><p className="text-sm text-slate-500">Jump directly into common HR tasks.</p></div><ClipboardList className="h-5 w-5 text-slate-400" /></div>
        <div className="flex flex-wrap gap-2">{quickActions.filter(action => action.visible).map(({ label, icon: Icon, tab, action }) => <button key={label} onClick={() => action ? action() : setActiveTab(tab)} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-semibold text-[#172554] transition hover:border-violet-300 hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500"><Icon className="h-4 w-4 text-violet-700" />{label}</button>)}</div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 xl:col-span-3"><div className="mb-5"><h2 className="text-xl font-semibold text-[#172554]">Workforce by department</h2><p className="mt-1 text-sm text-slate-500">Headcount compared with attendance recorded today.</p></div>
          {departmentData.length ? <div className="h-[300px] w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={departmentData} margin={{ top: 8, right: 8, left: -20, bottom: 8 }}><CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="department" tick={{ fill: chartColors.navy, fontSize: 12 }} tickLine={false} axisLine={false} interval={0} /><YAxis allowDecimals={false} tick={{ fill: '#64748B', fontSize: 12 }} tickLine={false} axisLine={false} /><Tooltip contentStyle={{ border: '1px solid #E2E8F0', borderRadius: 8, color: chartColors.navy, fontSize: 13 }} /><Bar dataKey="employees" fill={chartColors.slate} name="Employees" radius={[4, 4, 0, 0]} /><Bar dataKey="present" fill={chartColors.violet} name="Present today" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div> : <EmptyState message="Department data will appear when employee records are available." />}
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 xl:col-span-2"><div className="mb-3"><h2 className="text-xl font-semibold text-[#172554]">Today&apos;s attendance</h2><p className="mt-1 text-sm text-slate-500">Status across the current workforce.</p></div>
          {statusData.length ? <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"><div className="h-52 w-52 shrink-0"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statusData} dataKey="value" innerRadius={58} outerRadius={82} paddingAngle={3} stroke="none">{statusData.map(item => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip contentStyle={{ border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13 }} /></PieChart></ResponsiveContainer></div><div className="w-full space-y-3">{statusData.map(item => <div key={item.name} className="flex items-center justify-between gap-4 text-sm"><span className="flex items-center gap-2 text-slate-600"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span><strong className="tabular-nums text-[#172554]">{item.value}</strong></div>)}</div></div> : <EmptyState message="No attendance has been recorded today." />}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 xl:col-span-3"><div className="mb-5 flex items-start justify-between gap-3"><div><h2 className="text-xl font-semibold text-[#172554]">Recruitment pipeline</h2><p className="mt-1 text-sm text-slate-500">Candidates progressing through active hiring stages.</p></div><button onClick={() => setActiveTab('recruitment')} className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:text-violet-900">View recruitment <ArrowRight className="h-4 w-4" /></button></div>
          {applicants.length ? <div className="h-[270px] w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={recruitmentData} margin={{ top: 8, right: 10, left: -20, bottom: 8 }}><CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="stage" tick={{ fill: chartColors.navy, fontSize: 12 }} tickLine={false} axisLine={false} /><YAxis allowDecimals={false} tick={{ fill: '#64748B', fontSize: 12 }} tickLine={false} axisLine={false} /><Tooltip contentStyle={{ border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13 }} /><Bar dataKey="candidates" fill={chartColors.violet} name="Candidates" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div> : <EmptyState message="No candidates are currently in the recruitment pipeline." />}
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 xl:col-span-2"><div className="mb-5 flex items-start justify-between gap-3"><div><h2 className="text-xl font-semibold text-[#172554]">Recent activity</h2><p className="mt-1 text-sm text-slate-500">Latest updates from your HR workspace.</p></div><button onClick={() => setActiveTab('reports')} className="text-sm font-semibold text-violet-700 hover:text-violet-900">Reports</button></div>
          {notifications.length ? <div className="space-y-4">{notifications.slice(0, 5).map(notification => <div key={notification.id} className="flex gap-3"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-600" /><div className="min-w-0"><p className="text-sm font-semibold leading-5 text-[#172554]">{notification.title}</p><p className="mt-0.5 text-sm leading-5 text-slate-500">{notification.message}</p><p className="mt-1 text-xs text-slate-400">{notification.timestamp}</p></div></div>)}</div> : <EmptyState message="No recent activity to display." />}
        </div>
      </section>
    </div>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => <div className="flex min-h-[180px] items-center justify-center rounded-lg border border-dashed border-slate-200 px-6 text-center text-sm text-slate-500">{message}</div>;
