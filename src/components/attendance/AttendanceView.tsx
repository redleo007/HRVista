import React, { useState, useEffect } from 'react';
import { useHR } from '../../context/HRContext';
import { AttendanceRecord, AttendanceStatus } from '../../types/hr';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Search,
  Plus,
  X,
  TrendingUp,
  Building,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

export const AttendanceView: React.FC = () => {
  const {
    attendanceRecords,
    employees,
    currentUser,
    currentRole,
    checkInEmployee,
    checkOutEmployee,
    markManualAttendance,
    isEmployeeCheckedInToday,
    getTodayAttendanceForEmployee
  } = useHR();

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');
  const [searchEmployee, setSearchEmployee] = useState('');

  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualRecord, setManualRecord] = useState<{
    employeeId: string;
    date: string;
    checkIn: string;
    checkOut: string;
    status: AttendanceStatus;
    method: AttendanceRecord['method'];
  }>({
    employeeId: employees[0]?.employeeId || 'EMP001',
    date: new Date().toISOString().split('T')[0],
    checkIn: '09:00 AM',
    checkOut: '05:30 PM',
    status: 'Present',
    method: 'Manual HR Punch'
  });

  const isCheckedIn = isEmployeeCheckedInToday(currentUser.employeeId);
  const todayRecord = getTodayAttendanceForEmployee(currentUser.employeeId);

  // Filtered records
  const filteredRecords = attendanceRecords.filter(rec => {
    const matchesDept = selectedDept === 'All Departments' || rec.department === selectedDept;
    const matchesStatus = selectedStatus === 'All Statuses' || rec.status === selectedStatus;
    const matchesSearch =
      rec.employeeName.toLowerCase().includes(searchEmployee.toLowerCase()) ||
      rec.employeeId.toLowerCase().includes(searchEmployee.toLowerCase());
    return matchesDept && matchesStatus && matchesSearch;
  });

  // Calculate metrics
  const totalLogs = attendanceRecords.length;
  const presentLogs = attendanceRecords.filter(r => r.status === 'Present' || r.status === 'Late').length;
  const onTimeLogs = attendanceRecords.filter(r => r.status === 'Present').length;
  const avgWorkHours = attendanceRecords.filter(r => r.workHours && r.workHours > 0).reduce((sum, r) => sum + (r.workHours || 0), 0) / (attendanceRecords.filter(r => r.workHours && r.workHours > 0).length || 1);

  // Department attendance comparison
  const deptAttendance = [
    { department: 'Engineering', presentRate: 98, avgHours: 8.4 },
    { department: 'HR', presentRate: 100, avgHours: 8.5 },
    { department: 'Design', presentRate: 92, avgHours: 8.2 },
    { department: 'Marketing', presentRate: 95, avgHours: 8.3 },
    { department: 'Finance', presentRate: 94, avgHours: 8.1 },
    { department: 'Operations', presentRate: 97, avgHours: 8.6 }
  ];

  // Weekly attendance trend
  const weeklyTrend = [
    { day: 'Mon', attendance: 98, punctuality: 94 },
    { day: 'Tue', attendance: 97, punctuality: 95 },
    { day: 'Wed', attendance: 99, punctuality: 96 },
    { day: 'Thu', attendance: 96, punctuality: 92 },
    { day: 'Fri', attendance: 95, punctuality: 90 }
  ];

  const getStatusVariant = (status: AttendanceStatus) => {
    switch (status) {
      case 'Present':
        return 'success';
      case 'Late':
        return 'warning';
      case 'Half-Day':
        return 'info';
      case 'Absent':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find(e => e.employeeId === manualRecord.employeeId);
    markManualAttendance({
      employeeId: manualRecord.employeeId,
      employeeName: emp ? emp.name : 'Staff Member',
      department: emp ? emp.department : 'General',
      date: manualRecord.date,
      checkIn: manualRecord.checkIn,
      checkOut: manualRecord.checkOut,
      workHours: 8.5,
      status: manualRecord.status,
      method: manualRecord.method
    });
    setIsManualModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
              Time & Attendance Terminal
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
            Attendance Analytics & Digital Timesheets
          </h1>
          <p className="text-xs text-[#98A2B3] mt-0.5">
            Biometric cryptographic ledger eliminating physical register book buddy-punching.
          </p>
        </div>

        {currentRole !== 'Employee' && (
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="px-3.5 py-2 text-xs font-medium text-[#F5F7FA] bg-[#151B23] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>Mark Manual HR Punch</span>
          </button>
        )}
      </div>

      {/* Real-time Punch Terminal Card */}
      <div className="bg-[#151B23] rounded-xl p-6 text-[#F5F7FA] border border-[#212833] shadow-md flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#11161D] border border-[#212833] flex items-center justify-center shrink-0">
            <Clock className="w-7 h-7 text-[#D4AF37] animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] text-[#E8C96A] font-medium tracking-widest uppercase font-mono">
              Live Terminal Time · IST (UTC+5:30)
            </div>
            <div className="text-3xl font-extrabold font-mono tracking-tight text-[#F5F7FA] mt-0.5">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-xs text-[#98A2B3] mt-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Punch Actions */}
        <div className="bg-[#11161D] p-4 rounded-xl border border-[#212833] w-full md:w-auto min-w-[320px]">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-[#98A2B3]">
              User: <strong className="text-[#F5F7FA]">{currentUser.name}</strong> ({currentUser.employeeId})
            </span>
            {isCheckedIn ? (
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Present
              </span>
            ) : (
              <span className="text-[11px] text-amber-400 font-mono flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Pending Punch
              </span>
            )}
          </div>

          {!isCheckedIn ? (
            <button
              onClick={() => checkInEmployee(currentUser.employeeId, 'Web Portal')}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <Clock className="w-4 h-4" />
              <span>Punch Check-In Now</span>
            </button>
          ) : !todayRecord?.checkOut ? (
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 text-center py-2 bg-[#151B23] rounded-lg border border-[#212833] text-xs font-mono text-[#F5F7FA]">
                In: <strong className="text-emerald-400">{todayRecord?.checkIn}</strong>
              </div>
              <button
                onClick={() => checkOutEmployee(currentUser.employeeId)}
                className="py-2 px-4 bg-[#D4AF37] hover:bg-[#E8C96A] text-[#0B0F14] text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Punch Out
              </button>
            </div>
          ) : (
            <div className="w-full text-center py-2 bg-[#151B23] rounded-lg border border-[#212833] text-xs font-mono text-emerald-400 flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Shift Concluded (In: {todayRecord.checkIn} · Out: {todayRecord.checkOut})</span>
            </div>
          )}
        </div>
      </div>

      {/* Attendance Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <span className="text-xs text-[#98A2B3]">Today's Attendance</span>
          <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-1">
            {totalLogs > 0 ? Math.round((presentLogs / totalLogs) * 100) : 96}%
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14% vs manual muster roll
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <span className="text-xs text-[#98A2B3]">On-Time Punctuality</span>
          <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-1">
            {totalLogs > 0 ? Math.round((onTimeLogs / totalLogs) * 100) : 92}%
          </div>
          <div className="text-[10px] text-[#98A2B3] mt-1 font-mono">
            Check-ins before 09:15 AM
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <span className="text-xs text-[#98A2B3]">Average Daily Hours</span>
          <div className="text-2xl font-bold font-mono text-[#E8C96A] mt-1">
            {avgWorkHours.toFixed(1)} hrs
          </div>
          <div className="text-[10px] text-[#98A2B3] mt-1 font-mono">
            8.0 hrs standard schedule
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <span className="text-xs text-[#98A2B3]">Tampering & Buddy Punch</span>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            0.0%
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-mono">
            Cryptographic Biometric Proof
          </div>
        </div>
      </div>

      {/* Row 2: Weekly Trends Line + Department Comparison Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Weekly Attendance Trend */}
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">Weekly Attendance Trend (%)</h3>
              <p className="text-xs text-[#98A2B3]">Day-over-day workforce presence</p>
            </div>
            <span className="text-xs font-mono text-[#D4AF37]">Current Week</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#212833" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={{ stroke: '#212833' }} tickLine={false} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11161D',
                    border: '1px solid #212833',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#F5F7FA'
                  }}
                />
                <Line type="monotone" dataKey="attendance" stroke="#D4AF37" strokeWidth={2} dot={{ r: 3, fill: '#D4AF37' }} name="Attendance %" />
                <Line type="monotone" dataKey="punctuality" stroke="#22C55E" strokeWidth={2} dot={{ r: 3, fill: '#22C55E' }} name="Punctuality %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Comparison Bar */}
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">Department Attendance Rate (%)</h3>
              <p className="text-xs text-[#98A2B3]">Cross-departmental reliability index</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">96.8% Average</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptAttendance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#212833" />
                <XAxis dataKey="department" tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={{ stroke: '#212833' }} tickLine={false} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#11161D',
                    border: '1px solid #212833',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#F5F7FA'
                  }}
                />
                <Bar dataKey="presentRate" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={20} name="Present Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#151B23] p-3.5 rounded-xl border border-[#212833] flex flex-col md:flex-row items-center gap-3 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search employee name or identifier in punch logs..."
            value={searchEmployee}
            onChange={e => setSearchEmployee(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] placeholder-[#98A2B3] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All Departments">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Product Design">Product Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Half-Day">Half-Day</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      {filteredRecords.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No Attendance Logs Found"
          description="No punch records match your current filter selection."
          actionText="Reset Filters"
          onAction={() => {
            setSelectedDept('All Departments');
            setSelectedStatus('All Statuses');
            setSearchEmployee('');
          }}
        />
      ) : (
        <div className="bg-[#151B23] rounded-xl border border-[#212833] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#212833] bg-[#11161D] text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider font-mono">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Check-In</th>
                  <th className="py-3 px-4">Check-Out</th>
                  <th className="py-3 px-4">Work Hours</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Verification Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212833]/60 text-xs">
                {filteredRecords.map(rec => (
                  <tr key={rec.id} className="hover:bg-[#1A222C]/70 transition-colors">
                    <td className="py-3 px-4 font-mono text-[#98A2B3]">{rec.date}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#F5F7FA]">{rec.employeeName}</div>
                      <div className="text-[11px] text-[#98A2B3] font-mono">{rec.employeeId}</div>
                    </td>
                    <td className="py-3 px-4 text-[#F5F7FA]">{rec.department}</td>
                    <td className="py-3 px-4 font-mono text-[#E8C96A] font-medium">{rec.checkIn}</td>
                    <td className="py-3 px-4 font-mono text-[#98A2B3]">{rec.checkOut || '—'}</td>
                    <td className="py-3 px-4 font-mono text-[#F5F7FA] font-medium">
                      {rec.workHours ? `${rec.workHours} hrs` : 'Active'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusVariant(rec.status)} dot>
                        {rec.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-[11px] font-mono text-[#98A2B3] bg-[#11161D] px-2 py-0.5 rounded border border-[#212833]">
                        {rec.method}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manual HR Punch Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#212833] mb-4">
              <h3 className="text-base font-bold text-[#F5F7FA]">Mark Manual Attendance</h3>
              <button onClick={() => setIsManualModalOpen(false)} className="text-[#98A2B3] hover:text-[#F5F7FA]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Select Employee</label>
                <select
                  value={manualRecord.employeeId}
                  onChange={e => setManualRecord({ ...manualRecord, employeeId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                >
                  {employees.map(e => (
                    <option key={e.id} value={e.employeeId}>{e.name} ({e.employeeId} - {e.department})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Date</label>
                <input
                  type="date"
                  value={manualRecord.date}
                  onChange={e => setManualRecord({ ...manualRecord, date: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Check-In</label>
                  <input
                    type="text"
                    value={manualRecord.checkIn}
                    onChange={e => setManualRecord({ ...manualRecord, checkIn: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Check-Out</label>
                  <input
                    type="text"
                    value={manualRecord.checkOut}
                    onChange={e => setManualRecord({ ...manualRecord, checkOut: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#212833] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#F5F7FA] bg-[#11161D] border border-[#212833] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg cursor-pointer"
                >
                  Save Punch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
