import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import {
  FileSpreadsheet,
  Printer,
  Download,
  Calendar,
  Users,
  Award,
  Briefcase,
  GraduationCap,
  Clock,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const {
    employees,
    attendanceRecords,
    leaveRequests,
    jobOpenings,
    applicants,
    performanceReviews,
    trainingPrograms
  } = useHR();

  const [activeReport, setActiveReport] = useState<
    'employee' | 'attendance' | 'performance' | 'recruitment' | 'training'
  >('employee');

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const reportDefinitions = [
    {
      id: 'employee',
      title: 'Employee Master Directory Report',
      description: 'Comprehensive roster with employee ID, department, salary band, and active employment status.',
      icon: Users,
      count: employees.length,
      recordsLabel: 'Active Profiles'
    },
    {
      id: 'attendance',
      title: 'Monthly Attendance & Timesheet Ledger',
      description: 'Timestamped punches, work hours, punctuality status, and verification method records.',
      icon: Clock,
      count: attendanceRecords.length,
      recordsLabel: 'Punches Logged'
    },
    {
      id: 'performance',
      title: 'Performance & KPI Appraisal Audit',
      description: 'Review cycle scores, MBO goal progression, self-appraisal submissions, and manager ratings.',
      icon: Award,
      count: performanceReviews.length,
      recordsLabel: 'Reviews Recorded'
    },
    {
      id: 'recruitment',
      title: 'ATS Recruitment & Candidate Funnel Report',
      description: 'End-to-end recruitment pipeline metrics, candidate ratings, education background, and hiring velocity.',
      icon: Briefcase,
      count: applicants.length,
      recordsLabel: 'Applicants Processed'
    },
    {
      id: 'training',
      title: 'LMS Skill Coverage & Certifications',
      description: 'Enrolled workforce cohorts, completion certificates issued, and duration hours audited.',
      icon: GraduationCap,
      count: trainingPrograms.length,
      recordsLabel: 'Active Programs'
    }
  ];

  const exportCurrentReport = () => {
    let headers = '';
    let rows = '';

    if (activeReport === 'employee') {
      headers = 'ID,Name,Email,Department,Designation,Status,Joining Date\n';
      rows = employees
        .map(e => `"${e.employeeId}","${e.name}","${e.email}","${e.department}","${e.designation}","${e.employmentStatus}","${e.joiningDate}"`)
        .join('\n');
    } else if (activeReport === 'attendance') {
      headers = 'Date,ID,Name,Department,CheckIn,CheckOut,WorkHours,Status,Method\n';
      rows = attendanceRecords
        .map(r => `"${r.date}","${r.employeeId}","${r.employeeName}","${r.department}","${r.checkIn}","${r.checkOut || 'N/A'}","${r.workHours || 8}","${r.status}","${r.method}"`)
        .join('\n');
    } else if (activeReport === 'performance') {
      headers = 'ID,Name,Department,Designation,ReviewPeriod,FinalScore,Status\n';
      rows = performanceReviews
        .map(p => `"${p.employeeId}","${p.employeeName}","${p.department}","${p.designation}","${p.reviewPeriod}","${p.finalScore}","${p.status}"`)
        .join('\n');
    } else if (activeReport === 'recruitment') {
      headers = 'ID,Name,AppliedRole,Email,Phone,Experience,Status,Rating\n';
      rows = applicants
        .map(a => `"${a.id}","${a.name}","${a.jobTitle}","${a.email}","${a.phone}","${a.experienceYears}","${a.status}","${a.rating}"`)
        .join('\n');
    } else {
      headers = 'ID,Title,Category,Trainer,DurationHours,EnrolledCount,CompletedCount,Status\n';
      rows = trainingPrograms
        .map(t => `"${t.id}","${t.title}","${t.category}","${t.trainer}","${t.durationHours}","${t.enrolledEmployeeIds.length}","${t.completedEmployeeIds.length}","${t.status}"`)
        .join('\n');
    }

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `HRVISTA_${activeReport.toUpperCase()}_REPORT_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const currentDef = reportDefinitions.find(r => r.id === activeReport) || reportDefinitions[0];

  return (
    <div className="space-y-5">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
              Statutory & Governance Auditing
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
            Enterprise Report Generation Center
          </h1>
          <p className="text-xs text-[#98A2B3] mt-0.5">
            Export executive summaries and regulatory audit documentation in CSV or printable PDF format.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {downloadSuccess && (
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> CSV Generated
            </span>
          )}
          <button
            onClick={exportCurrentReport}
            className="px-3.5 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm shadow-[#D4AF37]/20"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV Report</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-semibold text-[#F5F7FA] bg-[#151B23] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Document</span>
          </button>
        </div>
      </div>

      {/* Report Types Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {reportDefinitions.map(def => {
          const Icon = def.icon;
          const isSelected = activeReport === def.id;

          return (
            <div
              key={def.id}
              onClick={() => setActiveReport(def.id as any)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#151B23] border-[#D4AF37] ring-1 ring-[#D4AF37]/40 shadow-sm'
                  : 'bg-[#151B23]/60 border-[#212833] hover:border-[#D4AF37]/40'
              }`}
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#11161D] border border-[#212833] text-[#D4AF37] flex items-center justify-center mb-2.5">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-[#F5F7FA]">{def.title}</h3>
                <p className="text-[11px] text-[#98A2B3] mt-1 line-clamp-2">{def.description}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#212833] flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#98A2B3]">{def.recordsLabel}</span>
                <span className="font-bold text-[#E8C96A]">{def.count}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Document Preview Sheet */}
      <div className="bg-[#151B23] rounded-xl border border-[#212833] p-6 shadow-sm space-y-4">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#212833]">
          <div>
            <div className="text-[10px] uppercase font-mono text-[#D4AF37] tracking-widest">
              HRVISTA Platform · Executive Extract
            </div>
            <h2 className="text-base font-bold text-[#F5F7FA] mt-0.5">{currentDef.title}</h2>
            <p className="text-xs text-[#98A2B3]">{currentDef.description}</p>
          </div>

          <div className="text-right text-xs font-mono text-[#98A2B3]">
            <div>Generated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
            <div className="text-emerald-400">Status: Verified Official</div>
          </div>
        </div>

        {/* Live Table Preview */}
        <div className="rounded-xl border border-[#212833] overflow-hidden bg-[#11161D]">
          <div className="overflow-x-auto max-h-96">
            {activeReport === 'employee' && (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#212833] text-[10px] text-[#98A2B3] uppercase font-mono bg-[#151B23]">
                    <th className="p-3">ID</th>
                    <th className="p-3">Full Name</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Designation</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#212833] text-[#F5F7FA]">
                  {employees.map(e => (
                    <tr key={e.id}>
                      <td className="p-3 font-mono text-[#D4AF37]">{e.employeeId}</td>
                      <td className="p-3 font-medium">{e.name}</td>
                      <td className="p-3">{e.department}</td>
                      <td className="p-3 text-[#98A2B3]">{e.designation}</td>
                      <td className="p-3 text-emerald-400 font-semibold">{e.employmentStatus}</td>
                      <td className="p-3 font-mono text-[#98A2B3]">{e.joiningDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeReport === 'attendance' && (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#212833] text-[10px] text-[#98A2B3] uppercase font-mono bg-[#151B23]">
                    <th className="p-3">Date</th>
                    <th className="p-3">Employee</th>
                    <th className="p-3">Punch In</th>
                    <th className="p-3">Punch Out</th>
                    <th className="p-3">Hours</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#212833] text-[#F5F7FA]">
                  {attendanceRecords.map(r => (
                    <tr key={r.id}>
                      <td className="p-3 font-mono text-[#98A2B3]">{r.date}</td>
                      <td className="p-3 font-medium">{r.employeeName}</td>
                      <td className="p-3 font-mono text-[#E8C96A]">{r.checkIn}</td>
                      <td className="p-3 font-mono text-[#98A2B3]">{r.checkOut || '—'}</td>
                      <td className="p-3 font-mono">{r.workHours ? `${r.workHours} hrs` : 'Active'}</td>
                      <td className="p-3 text-emerald-400 font-semibold">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeReport === 'performance' && (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#212833] text-[10px] text-[#98A2B3] uppercase font-mono bg-[#151B23]">
                    <th className="p-3">ID</th>
                    <th className="p-3">Employee</th>
                    <th className="p-3">Cycle</th>
                    <th className="p-3">Self Rating</th>
                    <th className="p-3">Manager Rating</th>
                    <th className="p-3">Final Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#212833] text-[#F5F7FA]">
                  {performanceReviews.map(p => (
                    <tr key={p.id}>
                      <td className="p-3 font-mono text-[#D4AF37]">{p.employeeId}</td>
                      <td className="p-3 font-medium">{p.employeeName}</td>
                      <td className="p-3 font-mono text-[#98A2B3]">{p.reviewPeriod}</td>
                      <td className="p-3 font-mono text-[#F5F7FA]">{p.selfAppraisal?.selfRating ? `${p.selfAppraisal.selfRating}/5` : 'N/A'}</td>
                      <td className="p-3 font-mono text-[#F5F7FA]">{p.managerEvaluation?.managerRating ? `${p.managerEvaluation.managerRating}/5` : 'N/A'}</td>
                      <td className="p-3 font-mono text-[#E8C96A] font-bold">{p.finalScore} / 5.0</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeReport === 'recruitment' && (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#212833] text-[10px] text-[#98A2B3] uppercase font-mono bg-[#151B23]">
                    <th className="p-3">Candidate</th>
                    <th className="p-3">Target Opening</th>
                    <th className="p-3">Experience</th>
                    <th className="p-3">Applied Date</th>
                    <th className="p-3">Pipeline Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#212833] text-[#F5F7FA]">
                  {applicants.map(a => (
                    <tr key={a.id}>
                      <td className="p-3 font-medium">{a.name}</td>
                      <td className="p-3 text-[#98A2B3]">{a.jobTitle}</td>
                      <td className="p-3 font-mono text-[#E8C96A]">{a.experienceYears} Years</td>
                      <td className="p-3 font-mono text-[#98A2B3]">{a.appliedDate}</td>
                      <td className="p-3 font-semibold text-emerald-400">{a.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeReport === 'training' && (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#212833] text-[10px] text-[#98A2B3] uppercase font-mono bg-[#151B23]">
                    <th className="p-3">Program Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Faculty / Vendor</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Enrolled</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#212833] text-[#F5F7FA]">
                  {trainingPrograms.map(t => (
                    <tr key={t.id}>
                      <td className="p-3 font-medium">{t.title}</td>
                      <td className="p-3 text-[#D4AF37] font-mono text-[11px]">{t.category}</td>
                      <td className="p-3 text-[#98A2B3]">{t.trainer}</td>
                      <td className="p-3 font-mono text-[#98A2B3]">{t.durationHours} hrs</td>
                      <td className="p-3 font-mono text-[#E8C96A]">{t.enrolledEmployeeIds.length} / {t.capacity}</td>
                      <td className="p-3 text-emerald-400 font-semibold">{t.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Footer Seal */}
        <div className="pt-3 border-t border-[#212833] flex items-center justify-between text-[11px] text-[#98A2B3] font-mono">
          <span>Digital Seal: HRVISTA-SHA256-AUTHENTICATED</span>
          <span>Principles of Management · Regulation 2021</span>
        </div>
      </div>
    </div>
  );
};
