import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { LeaveRequest, LeaveType, LeaveStatus } from '../../types/hr';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';
import {
  CalendarOff,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Calendar as CalendarIcon,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const LEAVE_TYPES: LeaveType[] = [
  'Casual Leave',
  'Sick Leave',
  'Annual Leave',
  'Maternity/Paternity',
  'Unpaid Leave'
];

export const LeaveView: React.FC = () => {
  const {
    leaveRequests,
    applyLeave,
    reviewLeave,
    currentUser,
    currentRole,
    employees
  } = useHR();

  const [activeView, setActiveView] = useState<'requests' | 'calendar'>('requests');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedLeaveType, setSelectedLeaveType] = useState<string>('All');
  const [searchEmp, setSearchEmp] = useState('');

  // Modals
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [reviewingLeave, setReviewingLeave] = useState<LeaveRequest | null>(null);
  const [reviewComment, setReviewComment] = useState('');

  // Apply form
  const [formData, setFormData] = useState<{
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    reason: string;
    totalDays: number;
  }>({
    leaveType: 'Casual Leave',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    reason: '',
    totalDays: 1
  });

  const handleDateChange = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    let diffDays = 1;
    if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && e >= s) {
      diffDays = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    }
    setFormData(prev => ({
      ...prev,
      startDate: start,
      endDate: end,
      totalDays: diffDays > 0 ? diffDays : 1
    }));
  };

  const userEmployeeRecord = employees.find(
    e => e.employeeId === currentUser.employeeId
  ) || employees[2];
  const balances = userEmployeeRecord.leaveBalances;

  // Filter leaves
  const filteredLeaves = leaveRequests.filter(lr => {
    const matchesUser = currentRole === 'Employee' ? lr.employeeId === currentUser.employeeId : true;
    const matchesStatus = selectedStatus === 'All' || lr.status === selectedStatus;
    const matchesType = selectedLeaveType === 'All' || lr.leaveType === selectedLeaveType;
    const matchesSearch =
      lr.employeeName.toLowerCase().includes(searchEmp.toLowerCase()) ||
      lr.employeeId.toLowerCase().includes(searchEmp.toLowerCase());
    return matchesUser && matchesStatus && matchesType && matchesSearch;
  });

  const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending');

  const getStatusVariant = (status: LeaveStatus) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.reason.trim()) return;

    applyLeave({
      employeeId: currentUser.employeeId,
      employeeName: currentUser.name,
      department: currentUser.department,
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalDays: formData.totalDays,
      reason: formData.reason
    });

    setIsApplyModalOpen(false);
    setFormData({
      leaveType: 'Casual Leave',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      reason: '',
      totalDays: 1
    });
  };

  const handleReviewSubmit = (status: 'Approved' | 'Rejected') => {
    if (reviewingLeave) {
      reviewLeave(
        reviewingLeave.id,
        status,
        reviewComment || (status === 'Approved' ? 'Approved by HR Operations.' : 'Overlaps with project milestone.')
      );
      setReviewingLeave(null);
      setReviewComment('');
    }
  };

  // Calendar days generation (e.g. October 2026)
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-10-${day < 10 ? '0' + day : day}`;
    const leavesOnThisDay = leaveRequests.filter(
      l => l.status === 'Approved' && l.startDate <= dateStr && l.endDate >= dateStr
    );
    return { day, dateStr, leaves: leavesOnThisDay };
  });

  return (
    <div className="space-y-5">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
              Absence & PTO Workflow
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
            Leave & Absence Management
          </h1>
          <p className="text-xs text-[#98A2B3] mt-0.5">
            Automated e-routing eliminating physical leave slips with 1-click HR approvals.
          </p>
        </div>

        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="px-3.5 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-sm shadow-[#D4AF37]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Leave Balances Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#98A2B3]">Casual Leave Quota</span>
            <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded">CL</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-1">
            {balances.casual.total - balances.casual.used}{' '}
            <span className="text-xs font-normal text-[#98A2B3]">/ {balances.casual.total} days</span>
          </div>
          <div className="w-full bg-[#11161D] rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-[#D4AF37] h-1.5 rounded-full"
              style={{ width: `${((balances.casual.total - balances.casual.used) / balances.casual.total) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#98A2B3]">Sick Leave Quota</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">SL</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-1">
            {balances.sick.total - balances.sick.used}{' '}
            <span className="text-xs font-normal text-[#98A2B3]">/ {balances.sick.total} days</span>
          </div>
          <div className="w-full bg-[#11161D] rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full"
              style={{ width: `${((balances.sick.total - balances.sick.used) / balances.sick.total) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#98A2B3]">Annual Paid Leave</span>
            <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">AL</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-1">
            {balances.annual.total - balances.annual.used}{' '}
            <span className="text-xs font-normal text-[#98A2B3]">/ {balances.annual.total} days</span>
          </div>
          <div className="w-full bg-[#11161D] rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-sky-400 h-1.5 rounded-full"
              style={{ width: `${((balances.annual.total - balances.annual.used) / balances.annual.total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Pending Approvals Queue for HR / Admin */}
      {currentRole !== 'Employee' && pendingLeaves.length > 0 && (
        <div className="bg-[#151B23] rounded-xl border border-amber-500/30 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-[#F5F7FA]">
                HR Approval Action Required: {pendingLeaves.length} Pending Application(s)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-amber-400">Direct Routing Queue</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingLeaves.map(leave => (
              <div
                key={leave.id}
                className="bg-[#11161D] rounded-xl border border-[#212833] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-semibold text-[#F5F7FA] text-xs">{leave.employeeName}</span>
                      <span className="text-[11px] text-[#98A2B3] font-mono ml-1.5">({leave.employeeId})</span>
                    </div>
                    <Badge variant="warning" dot>{leave.leaveType}</Badge>
                  </div>

                  <div className="text-xs text-[#98A2B3] mb-2 font-mono">
                    {leave.startDate} to {leave.endDate} (<strong className="text-[#F5F7FA]">{leave.totalDays} days</strong>)
                  </div>

                  <p className="text-xs text-[#98A2B3] italic bg-[#151B23] p-2.5 rounded-lg border border-[#212833] mb-3">
                    "{leave.reason}"
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#212833]">
                  <button
                    onClick={() => {
                      setReviewingLeave(leave);
                      setReviewComment('Leave approved per company policy.');
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => {
                      setReviewingLeave(leave);
                      setReviewComment('Shift coverage conflict; please adjust requested dates.');
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Switcher: Requests vs Calendar View */}
      <div className="flex items-center justify-between border-b border-[#212833] pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('requests')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeView === 'requests'
                ? 'bg-[#151B23] text-[#E8C96A] border border-[#D4AF37]/30'
                : 'text-[#98A2B3] hover:text-[#F5F7FA]'
            }`}
          >
            All Applications & History
          </button>
          <button
            onClick={() => setActiveView('calendar')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeView === 'calendar'
                ? 'bg-[#151B23] text-[#E8C96A] border border-[#D4AF37]/30'
                : 'text-[#98A2B3] hover:text-[#F5F7FA]'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Monthly Absence Calendar</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: REQUESTS TABLE */}
      {activeView === 'requests' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-[#151B23] p-3.5 rounded-xl border border-[#212833] flex flex-col md:flex-row items-center gap-3 shadow-sm">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by employee name or reason..."
                value={searchEmp}
                onChange={e => setSearchEmp(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] placeholder-[#98A2B3] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <select
                value={selectedLeaveType}
                onChange={e => setSelectedLeaveType(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="All">All Leave Types</option>
                {LEAVE_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Table */}
          {filteredLeaves.length === 0 ? (
            <EmptyState
              icon={CalendarOff}
              title="No Leave Records Found"
              description="No applications match your current status or search filter."
              actionText="Apply for Leave"
              onAction={() => setIsApplyModalOpen(true)}
            />
          ) : (
            <div className="bg-[#151B23] rounded-xl border border-[#212833] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#212833] bg-[#11161D] text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider font-mono">
                      <th className="py-3 px-4">Employee</th>
                      <th className="py-3 px-4">Leave Type</th>
                      <th className="py-3 px-4">Schedule</th>
                      <th className="py-3 px-4">Reason</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Audit Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#212833]/60 text-xs">
                    {filteredLeaves.map(l => (
                      <tr key={l.id} className="hover:bg-[#1A222C]/70 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-[#F5F7FA]">{l.employeeName}</div>
                          <div className="text-[11px] text-[#98A2B3] font-mono">{l.employeeId} · {l.department}</div>
                        </td>

                        <td className="py-3 px-4 text-[#F5F7FA] font-medium">
                          {l.leaveType}
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-mono text-[#F5F7FA]">{l.startDate} to {l.endDate}</div>
                          <div className="text-[11px] text-[#D4AF37] font-mono">{l.totalDays} day(s)</div>
                        </td>

                        <td className="py-3 px-4 text-[#98A2B3] max-w-xs truncate" title={l.reason}>
                          {l.reason}
                        </td>

                        <td className="py-3 px-4">
                          <Badge variant={getStatusVariant(l.status)} dot>
                            {l.status}
                          </Badge>
                        </td>

                        <td className="py-3 px-4 text-[#98A2B3] text-[11px]">
                          {l.reviewedBy ? (
                            <div>
                              <div className="text-[#F5F7FA] font-medium">{l.reviewedBy}</div>
                              <div className="text-[#98A2B3] italic line-clamp-1">"{l.reviewComment}"</div>
                            </div>
                          ) : (
                            <span className="italic text-[#98A2B3]/70">Pending Review</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: CALENDAR VIEW */}
      {activeView === 'calendar' && (
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#212833]">
            <h3 className="text-sm font-bold text-[#F5F7FA]">October 2026 Absence Calendar</h3>
            <span className="text-xs font-mono text-[#D4AF37]">Live Team Roster</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center font-mono text-[10px] uppercase font-bold text-[#98A2B3] py-1">
                {d}
              </div>
            ))}

            {calendarDays.map(item => (
              <div
                key={item.day}
                className={`min-h-20 p-2 rounded-lg border text-xs flex flex-col justify-between transition-colors ${
                  item.leaves.length > 0
                    ? 'bg-[#11161D] border-[#D4AF37]/30'
                    : 'bg-[#11161D]/50 border-[#212833]'
                }`}
              >
                <span className="font-mono text-[11px] font-semibold text-[#F5F7FA]">{item.day}</span>
                {item.leaves.length > 0 ? (
                  <div className="space-y-1 mt-1">
                    {item.leaves.map(l => (
                      <div
                        key={l.id}
                        className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#D4AF37]/10 text-[#E8C96A] truncate"
                        title={`${l.employeeName} (${l.leaveType})`}
                      >
                        {l.employeeName.split(' ')[0]}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] text-[#98A2B3]/40">Active</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Apply Leave Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#212833] mb-4">
              <div>
                <h3 className="text-base font-bold text-[#F5F7FA]">Submit Leave Application</h3>
                <p className="text-xs text-[#98A2B3]">Applicant: {currentUser.name}</p>
              </div>
              <button onClick={() => setIsApplyModalOpen(false)} className="text-[#98A2B3] hover:text-[#F5F7FA]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Leave Type *</label>
                <select
                  value={formData.leaveType}
                  onChange={e => setFormData({ ...formData, leaveType: e.target.value as LeaveType })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                >
                  {LEAVE_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={e => handleDateChange(e.target.value, formData.endDate)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">End Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={e => handleDateChange(formData.startDate, e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] font-mono"
                  />
                </div>
              </div>

              <div className="bg-[#11161D] p-3 rounded-lg border border-[#212833] flex items-center justify-between text-xs">
                <span className="text-[#98A2B3]">Calculated Days:</span>
                <span className="font-bold font-mono text-[#E8C96A] text-sm">{formData.totalDays} Day(s)</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Reason for Leave *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.reason}
                  onChange={e => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Outline purpose for manager review..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                />
              </div>

              <div className="pt-3 border-t border-[#212833] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#F5F7FA] bg-[#11161D] border border-[#212833] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Dialog */}
      {reviewingLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-[#F5F7FA] mb-1">Review Leave Request</h3>
            <p className="text-xs text-[#98A2B3] mb-4">
              {reviewingLeave.employeeName} ({reviewingLeave.leaveType} · {reviewingLeave.totalDays} Days)
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                HR Manager Feedback / Note
              </label>
              <textarea
                rows={2}
                value={reviewComment}
                onChange={e => setReviewComment(e.target.value)}
                placeholder="Audit notes..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setReviewingLeave(null)}
                className="px-3 py-1.5 text-xs text-[#F5F7FA] bg-[#11161D] rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReviewSubmit('Rejected')}
                className="px-3.5 py-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg cursor-pointer"
              >
                Reject Request
              </button>
              <button
                onClick={() => handleReviewSubmit('Approved')}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg cursor-pointer"
              >
                Approve Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
