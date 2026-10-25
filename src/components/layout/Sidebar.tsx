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
      className={`bg-[#0E131A] border-r border-[#212833] flex flex-col shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 select-none transition-all duration-200 z-20 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header Brand: NEXORA HR */}
      <div className="h-16 px-4 border-b border-[#212833] flex items-center justify-between">
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group overflow-hidden"
        >
          {/* Gold Gem Insignia */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E8C96A] via-[#D4AF37] to-[#997B20] text-[#0B0F14] font-black text-sm flex items-center justify-center shrink-0 shadow-sm shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform">
            N
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-wider text-[#F5F7FA] font-sans">
                NEXORA <span className="text-[#D4AF37]">HR</span>
              </span>
              <span className="text-[10px] text-[#98A2B3] tracking-widest uppercase font-mono">
                Enterprise
              </span>
            </div>
          )}
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
          <div className="px-2 pb-1.5 text-[10px] font-bold text-[#98A2B3]/70 uppercase tracking-widest font-mono">
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
                      ? 'bg-[#D4AF37] text-[#0B0F14] shadow-sm shadow-[#D4AF37]/20 font-bold'
                      : 'bg-[#D4AF37]/10 text-[#E8C96A] hover:bg-[#D4AF37]/15 border border-[#D4AF37]/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0B0F14]' : 'text-[#D4AF37]'}`} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider ${
                        isActive ? 'bg-[#0B0F14]/20 text-[#0B0F14]' : 'bg-[#D4AF37]/20 text-[#E8C96A]'
                      }`}
                    >
                      GE3791
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
                  ? 'bg-[#151B23] text-[#F5F7FA] font-semibold border-l-2 border-[#D4AF37] shadow-sm'
                  : 'text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#151B23]/60'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#D4AF37]' : 'text-[#98A2B3] group-hover:text-[#F5F7FA]'
                  }`}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
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
      <div className="p-2.5 border-t border-[#212833] bg-[#0B0F14]/60">
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
