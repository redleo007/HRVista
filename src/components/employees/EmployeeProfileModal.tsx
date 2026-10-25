import React, { useState } from 'react';
import { Employee } from '../../types/hr';
import { useHR } from '../../context/HRContext';
import { Badge } from '../common/Badge';
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  ShieldAlert,
  Award,
  Clock,
  Target,
  GraduationCap,
  CalendarCheck,
  MessageSquare,
  Star,
  CheckCircle2,
  TrendingUp,
  UserCheck
} from 'lucide-react';

interface EmployeeProfileModalProps {
  employee: Employee | null;
  onClose: () => void;
  onEdit?: (employee: Employee) => void;
}

export const EmployeeProfileModal: React.FC<EmployeeProfileModalProps> = ({
  employee,
  onClose,
  onEdit
}) => {
  const {
    attendanceRecords,
    leaveRequests,
    performanceReviews,
    trainingPrograms
  } = useHR();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'attendance' | 'performance' | 'training' | 'leaves'
  >('overview');

  if (!employee) return null;

  // Filter specific records for this employee
  const employeeAttendance = attendanceRecords.filter(r => r.employeeId === employee.employeeId);
  const employeeLeaves = leaveRequests.filter(l => l.employeeId === employee.employeeId);
  const employeeReview = performanceReviews.find(p => p.employeeId === employee.employeeId) || performanceReviews[0];
  const employeeTrainings = trainingPrograms.filter(t => t.enrolledEmployeeIds.includes(employee.employeeId));

  const presentDays = employeeAttendance.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const attendanceRate = employeeAttendance.length > 0 ? Math.round((presentDays / employeeAttendance.length) * 100) : 96;

  const getStatusVariant = (status: Employee['employmentStatus']) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'On Leave':
        return 'warning';
      case 'Probation':
        return 'info';
      case 'Terminated':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-3xl w-full my-8 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Profile Header Cover with Gold Trim */}
        <div className="bg-gradient-to-r from-[#11161D] via-[#151B23] to-[#1A222C] px-6 pt-6 pb-14 border-b border-[#212833] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#98A2B3] hover:text-[#F5F7FA] p-1.5 rounded-lg bg-[#11161D]/80 border border-[#212833] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
            <span>HRVISTA Personnel ID: {employee.employeeId}</span>
            <span>·</span>
            <span>{employee.department}</span>
          </div>
          <h2 className="text-xl font-bold mt-1 text-[#F5F7FA]">{employee.name}</h2>
          <p className="text-xs text-[#98A2B3] mt-0.5">{employee.designation}</p>
        </div>

        {/* Floating Avatar & Controls */}
        <div className="px-6 -mt-8 flex flex-wrap items-end justify-between gap-3">
          <div className="w-16 h-16 rounded-xl bg-[#11161D] border-2 border-[#D4AF37] text-[#E8C96A] flex items-center justify-center font-bold text-xl shadow-lg">
            {employee.name.slice(0, 2).toUpperCase()}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={getStatusVariant(employee.employmentStatus)} dot>
              {employee.employmentStatus}
            </Badge>

            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(employee);
                }}
                className="px-3 py-1.5 text-xs font-medium text-[#F5F7FA] bg-[#11161D] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors cursor-pointer"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation in Profile */}
        <div className="px-6 pt-4 border-b border-[#212833] flex items-center gap-4 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Info' },
            { id: 'attendance', label: `Attendance (${attendanceRate}%)` },
            { id: 'performance', label: 'Performance & Goals' },
            { id: 'training', label: `Training (${employeeTrainings.length})` },
            { id: 'leaves', label: 'Leave History' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 text-xs font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#D4AF37] text-[#E8C96A] font-semibold'
                  : 'border-transparent text-[#98A2B3] hover:text-[#F5F7FA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Contact Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#11161D] p-4 rounded-xl border border-[#212833]">
                <div className="flex items-center gap-2.5 text-[#F5F7FA]">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#F5F7FA]">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-mono">{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#F5F7FA]">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>{employee.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#F5F7FA]">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Joined: <strong className="font-mono text-[#E8C96A]">{employee.joiningDate}</strong></span>
                </div>
              </div>

              {/* Leave Balances Grid */}
              <div>
                <h4 className="text-xs font-semibold text-[#F5F7FA] mb-2.5 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Leave Quota Ledger</span>
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-[#11161D] border border-[#212833] rounded-lg text-center">
                    <div className="text-[11px] text-[#98A2B3]">Casual Leave</div>
                    <div className="text-base font-bold font-mono text-[#F5F7FA] mt-1">
                      {employee.leaveBalances.casual.total - employee.leaveBalances.casual.used} / {employee.leaveBalances.casual.total}
                    </div>
                    <div className="text-[10px] text-[#98A2B3] mt-0.5">days left</div>
                  </div>

                  <div className="p-3 bg-[#11161D] border border-[#212833] rounded-lg text-center">
                    <div className="text-[11px] text-[#98A2B3]">Sick Leave</div>
                    <div className="text-base font-bold font-mono text-[#F5F7FA] mt-1">
                      {employee.leaveBalances.sick.total - employee.leaveBalances.sick.used} / {employee.leaveBalances.sick.total}
                    </div>
                    <div className="text-[10px] text-[#98A2B3] mt-0.5">days left</div>
                  </div>

                  <div className="p-3 bg-[#11161D] border border-[#212833] rounded-lg text-center">
                    <div className="text-[11px] text-[#98A2B3]">Annual Leave</div>
                    <div className="text-base font-bold font-mono text-[#F5F7FA] mt-1">
                      {employee.leaveBalances.annual.total - employee.leaveBalances.annual.used} / {employee.leaveBalances.annual.total}
                    </div>
                    <div className="text-[10px] text-[#98A2B3] mt-0.5">days left</div>
                  </div>
                </div>
              </div>

              {/* Verified Competencies */}
              <div>
                <h4 className="text-xs font-semibold text-[#F5F7FA] mb-2 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Verified Competencies & Credentials</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {employee.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs text-[#E8C96A] bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="p-3.5 bg-[#11161D] rounded-xl border border-[#212833] text-xs">
                <h4 className="font-semibold text-[#F5F7FA] mb-1.5 flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>Emergency Next of Kin</span>
                </h4>
                <div className="text-[#98A2B3] space-y-0.5">
                  <div>Name: <strong className="text-[#F5F7FA]">{employee.emergencyContact.name || 'Not provided'}</strong> ({employee.emergencyContact.relationship || 'Next of kin'})</div>
                  <div>Phone: <span className="font-mono text-[#F5F7FA]">{employee.emergencyContact.phone || 'N/A'}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-[#11161D] border border-[#212833] rounded-lg text-center">
                  <span className="text-[#98A2B3] block text-[11px]">Attendance Rate</span>
                  <span className="text-lg font-bold font-mono text-emerald-400 mt-0.5 block">{attendanceRate}%</span>
                </div>
                <div className="p-3 bg-[#11161D] border border-[#212833] rounded-lg text-center">
                  <span className="text-[#98A2B3] block text-[11px]">Total Logged</span>
                  <span className="text-lg font-bold font-mono text-[#F5F7FA] mt-0.5 block">{employeeAttendance.length} records</span>
                </div>
                <div className="p-3 bg-[#11161D] border border-[#212833] rounded-lg text-center">
                  <span className="text-[#98A2B3] block text-[11px]">Verification</span>
                  <span className="text-lg font-bold font-mono text-[#D4AF37] mt-0.5 block">Biometric/Web</span>
                </div>
              </div>

              <div className="bg-[#11161D] rounded-xl border border-[#212833] overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#212833] text-[10px] text-[#98A2B3] uppercase font-mono">
                      <th className="p-3">Date</th>
                      <th className="p-3">Check-In</th>
                      <th className="p-3">Check-Out</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#212833]">
                    {employeeAttendance.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-[#98A2B3]">No recent punch logs found.</td>
                      </tr>
                    ) : (
                      employeeAttendance.map(att => (
                        <tr key={att.id} className="text-[#F5F7FA]">
                          <td className="p-3 font-mono text-[#98A2B3]">{att.date}</td>
                          <td className="p-3 font-mono font-medium">{att.checkIn}</td>
                          <td className="p-3 font-mono text-[#98A2B3]">{att.checkOut || '—'}</td>
                          <td className="p-3">
                            <span className="text-emerald-400 font-semibold">{att.status}</span>
                          </td>
                          <td className="p-3 text-[#98A2B3] text-[11px] font-mono">{att.method}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PERFORMANCE */}
          {activeTab === 'performance' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#11161D] rounded-xl border border-[#212833] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#D4AF37]">Active Review Period</span>
                  <div className="text-sm font-bold text-[#F5F7FA] mt-0.5">{employeeReview?.reviewPeriod || 'Q3 2026'}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-[#98A2B3]">Final Rating</span>
                  <div className="text-lg font-bold font-mono text-[#E8C96A]">{employeeReview?.finalScore || 4.75} / 5.0</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#F5F7FA] mb-2 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Assigned Goals & Objectives</span>
                </h4>
                <div className="space-y-2.5">
                  {employeeReview?.goals.map(g => (
                    <div key={g.id} className="p-3 bg-[#11161D] rounded-lg border border-[#212833]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-[#F5F7FA]">{g.title}</span>
                        <span className="font-mono text-[#E8C96A]">{g.progress}%</span>
                      </div>
                      <div className="w-full bg-[#151B23] rounded-full h-1.5 mb-1 overflow-hidden">
                        <div className="bg-[#D4AF37] h-1.5 rounded-full" style={{ width: `${g.progress}%` }} />
                      </div>
                      <p className="text-[11px] text-[#98A2B3]">{g.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {employeeReview?.managerEvaluation && (
                <div className="p-3.5 bg-[#11161D] rounded-xl border border-[#212833] space-y-1">
                  <div className="font-semibold text-[#F5F7FA] flex items-center gap-1.5 mb-1">
                    <Star className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Manager Feedback ({employeeReview.managerEvaluation.evaluatorName})</span>
                  </div>
                  <p className="text-[#98A2B3] italic leading-relaxed">
                    "{employeeReview.managerEvaluation.strengths}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: TRAINING */}
          {activeTab === 'training' && (
            <div className="space-y-3 text-xs">
              {employeeTrainings.length === 0 ? (
                <div className="p-6 text-center text-[#98A2B3] bg-[#11161D] rounded-xl border border-[#212833]">
                  No training programs enrolled yet.
                </div>
              ) : (
                employeeTrainings.map(t => {
                  const isDone = t.completedEmployeeIds.includes(employee.employeeId);
                  return (
                    <div key={t.id} className="p-3.5 bg-[#11161D] rounded-xl border border-[#212833] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#D4AF37] font-mono uppercase">{t.category}</span>
                        <h4 className="font-semibold text-[#F5F7FA] mt-0.5">{t.title}</h4>
                        <div className="text-[11px] text-[#98A2B3] mt-0.5">{t.trainer} · {t.durationHours} hrs</div>
                      </div>
                      <Badge variant={isDone ? 'success' : 'gold'}>
                        {isDone ? 'Certified Completed' : 'In Progress'}
                      </Badge>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 5: LEAVES */}
          {activeTab === 'leaves' && (
            <div className="space-y-2.5 text-xs">
              {employeeLeaves.length === 0 ? (
                <div className="p-6 text-center text-[#98A2B3] bg-[#11161D] rounded-xl border border-[#212833]">
                  No leave records logged for this employee.
                </div>
              ) : (
                employeeLeaves.map(l => (
                  <div key={l.id} className="p-3 bg-[#11161D] rounded-lg border border-[#212833] flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#F5F7FA]">{l.leaveType} ({l.totalDays} days)</div>
                      <div className="text-[11px] text-[#98A2B3] font-mono">{l.startDate} to {l.endDate}</div>
                      <div className="text-[11px] text-[#98A2B3] italic mt-0.5">"{l.reason}"</div>
                    </div>
                    <Badge variant={l.status === 'Approved' ? 'success' : l.status === 'Pending' ? 'warning' : 'danger'}>
                      {l.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#212833] bg-[#11161D] flex items-center justify-between text-xs text-[#98A2B3]">
          <span>HRVISTA Platform · Verified Profile</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-[#F5F7FA] bg-[#151B23] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
