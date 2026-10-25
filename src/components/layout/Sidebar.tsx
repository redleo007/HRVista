import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Clock,
  CalendarCheck,
  Award,
  GraduationCap,
  MessageSquareHeart,
  BarChart3,
  Cpu,
  FileSpreadsheet,
  Settings,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    currentUser,
    leaveRequests,
    jobOpenings,
    isEmployeeCheckedInToday,
    checkInEmployee,
    checkOutEmployee,
    getTodayAttendanceForEmployee
  } = useHR();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending').length;
  const activeJobs = jobOpenings.filter(j => j.status === 'Open').length;
  const isCheckedIn = isEmployeeCheckedInToday(currentUser.employeeId);
  const todayRecord = getTodayAttendanceForEmployee(currentUser.employeeId);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, roles: ['Admin', 'HR Manager', 'Employee'] },
    { id: 'employees', label: 'Employees', icon: Users, roles: ['Admin', 'HR Manager', 'Employee'] },
    { id: 'recruitment', label: 'Recruitment', icon: Briefcase, badge: activeJobs > 0 ? `${activeJobs}` : undefined, roles: ['Admin', 'HR Manager'] },
    { id: 'attendance', label: 'Attendance', icon: Clock, roles: ['Admin', 'HR Manager', 'Employee'] },
    { id: 'leave', label: 'Leave Management', icon: CalendarCheck, badge: currentRole !== 'Employee' && pendingLeaves > 0 ? `${pendingLeaves}` : undefined, badgeColor: 'bg-amber-500/10 text-amber-400 border border-amber-500/20', roles: ['Admin', 'HR Manager', 'Employee'] },
    { id: 'performance', label: 'Performance', icon: Award, roles: ['Admin', 'HR Manager', 'Employee'] },
    { id: 'training', label: 'Training', icon: GraduationCap, roles: ['Admin', 'HR Manager', 'Employee'] },
    { id: 'feedback', label: 'Feedback', icon: MessageSquareHeart, roles: ['Admin', 'HR Manager', 'Employee'] },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['Admin', 'HR Manager'] },
    { id: 'impact', label: 'Technology Impact', icon: Cpu, isAcademic: true, roles: ['Admin', 'HR Manager', 'Employee'] },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet, roles: ['Admin', 'HR Manager'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['Admin', 'HR Manager', 'Employee'] }
  ];

  const visibleNav = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside
      className={`bg-white border-r border-slate-200 flex flex-col shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 select-none transition-all duration-200 z-20 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header Brand: HRVISTA */}
      <div className="h-16 px-4 border-b border-slate-200 flex items-center justify-between">
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group overflow-hidden"
        >
          <BrandLogo compact={isCollapsed} className="group-hover:scale-[1.02] transition-transform" />
        </div>

        {/* Collapse toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#151B23] transition-colors cursor-pointer hidden md:flex items-center justify-center"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1">
        {!isCollapsed && (
          <div className="px-2 pb-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Platform Modules
          </div>
        )}

        {visibleNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isAcademic) {
            return (
              <div key={item.id} className="pt-1.5 pb-0.5">
                <button
                  onClick={() => setActiveTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
                  } rounded-lg text-xs font-semibold transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-violet-700 text-white shadow-sm font-bold'
                      : 'bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-violet-700'}`} />
                    {!isCollapsed && <span className="whitespace-normal leading-5">{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                        isActive ? 'bg-white/20 text-white' : 'bg-violet-100 text-violet-700 border border-violet-200'
                      }`}
                    >
                      Academic
                    </span>
                  )}
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
              } rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer relative group ${
                  isActive
                  ? 'bg-violet-50 text-violet-900 font-semibold border-l-2 border-violet-700'
                  : 'text-slate-600 hover:text-[#172554] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#D4AF37]' : 'text-[#98A2B3] group-hover:text-[#F5F7FA]'
                  }`}
                />
                {!isCollapsed && <span className="whitespace-normal leading-5">{item.label}</span>}
              </div>

              {!isCollapsed && item.badge && (
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-medium ${
                    item.badgeColor || 'bg-[#11161D] text-[#98A2B3] border border-[#212833]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Area: Digital Punch Terminal Widget */}
      <div className="p-2.5 border-t border-slate-200 bg-slate-50">
        {!isCollapsed ? (
          <div className="bg-[#151B23] p-3 rounded-xl border border-[#212833] shadow-inner space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-semibold text-[#F5F7FA] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Punch Terminal</span>
              </span>
              {isCheckedIn ? (
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {todayRecord?.checkIn}
                </span>
              ) : (
                <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Not In
                </span>
              )}
            </div>

            {!isCheckedIn ? (
              <button
                onClick={() => checkInEmployee(currentUser.employeeId, 'Web Portal')}
                className="w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Check In Now</span>
              </button>
            ) : !todayRecord?.checkOut ? (
              <button
                onClick={() => checkOutEmployee(currentUser.employeeId)}
                className="w-full py-1.5 px-2 bg-[#11161D] hover:bg-[#1A222C] text-[#F5F7FA] border border-[#212833] text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Check Out</span>
              </button>
            ) : (
              <div className="text-center text-[10px] text-[#98A2B3] font-mono py-0.5">
                Finished · Out at {todayRecord.checkOut}
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <button
              onClick={() => {
                if (!isCheckedIn) checkInEmployee(currentUser.employeeId, 'Web Portal');
                else if (!todayRecord?.checkOut) checkOutEmployee(currentUser.employeeId);
              }}
              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors cursor-pointer ${
                isCheckedIn
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-[#D4AF37]/10 text-[#E8C96A] border-[#D4AF37]/30'
              }`}
              title={isCheckedIn ? 'Checked in today' : 'Quick Check In'}
            >
              <Clock className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* User Mini Card */}
        {!isCollapsed && (
          <div className="mt-2.5 px-2 flex items-center justify-between text-[11px] text-[#98A2B3]">
            <span className="truncate max-w-[130px] font-medium text-[#F5F7FA]">
              {currentUser.name}
            </span>
            <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.2 rounded border border-[#D4AF37]/20">
              {currentRole}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
