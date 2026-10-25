import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { UserRole } from '../../types/hr';
import { CommandPalette } from '../common/CommandPalette';
import {
  Search,
  Bell,
  HelpCircle,
  RotateCcw,
  LogOut,
  ChevronDown,
  Calendar,
  Award,
  Users,
  Briefcase,
  CheckCircle2,
  Building2,
  X
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const {
    currentUser,
    currentRole,
    switchRole,
    logout,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    clearAllNotifications,
    setActiveTab,
    resetToDefaultData
  } = useHR();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const roles: UserRole[] = ['Admin', 'HR Manager', 'Employee'];

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'leave':
        return <Calendar className="w-3.5 h-3.5 text-amber-400" />;
      case 'appraisal':
        return <Award className="w-3.5 h-3.5 text-[#E8C96A]" />;
      case 'recruitment':
        return <Briefcase className="w-3.5 h-3.5 text-sky-400" />;
      case 'training':
        return <Users className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />;
    }
  };

  return (
    <>
      <header className="h-14 bg-[#11161D] border-b border-[#212833] px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
        {/* Left Zone: Organization context & Academic Project Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#151B23] border border-[#212833]">
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-semibold text-[#F5F7FA] tracking-tight">
              Apex Global
            </span>
            <span className="text-[10px] font-mono text-[#98A2B3] border-l border-[#212833] pl-2 hidden sm:inline">
              Enterprise v4.2
            </span>
          </div>

          <button
            onClick={() => setActiveTab('impact')}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-[#E8C96A] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/15 rounded-md border border-[#D4AF37]/25 transition-colors cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>GE3791 Principles of Management</span>
          </button>
        </div>

        {/* Center Zone: Global Search & Cmd+K Shortcut */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-[#98A2B3] bg-[#151B23] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#98A2B3] group-hover:text-[#D4AF37] transition-colors" />
              <span>Search employees, roles, records...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-[#98A2B3] bg-[#11161D] border border-[#212833] rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Zone: Controls, Notifications, Role Switcher, Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Mobile search trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="md:hidden p-2 text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#151B23] rounded-lg transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRoleMenu(!showRoleMenu);
                setShowNotifMenu(false);
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#F5F7FA] bg-[#151B23] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors cursor-pointer"
              title="Switch user perspective for project demonstration"
            >
              <span className="text-[#98A2B3] text-[11px] hidden sm:inline">Role:</span>
              <span className="font-semibold text-[#E8C96A]">{currentRole}</span>
              <ChevronDown className="w-3 h-3 text-[#98A2B3]" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-[#151B23] rounded-xl shadow-2xl border border-[#212833] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 border-b border-[#212833] text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider">
                  Select User Perspective
                </div>
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      switchRole(role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#11161D] transition-colors cursor-pointer ${
                      currentRole === role ? 'bg-[#11161D] text-[#E8C96A] font-semibold' : 'text-[#F5F7FA]'
                    }`}
                  >
                    <div>
                      <div>{role}</div>
                      <div className="text-[10px] text-[#98A2B3]">
                        {role === 'Admin' && 'Executive director & full controls'}
                        {role === 'HR Manager' && 'Recruitment, approvals & appraisal review'}
                        {role === 'Employee' && 'Self-service check-in, leaves & goals'}
                      </div>
                    </div>
                    {currentRole === role && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowRoleMenu(false);
              }}
              className="relative p-2 text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#151B23] rounded-lg transition-colors cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4AF37] rounded-full ring-2 ring-[#11161D]" />
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#151B23] rounded-xl shadow-2xl border border-[#212833] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-3 border-b border-[#212833] flex items-center justify-between bg-[#11161D]">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-semibold text-[#F5F7FA]">Activity Notifications</h4>
                    {unreadNotificationCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium bg-[#D4AF37]/10 text-[#E8C96A] border border-[#D4AF37]/25 rounded">
                        {unreadNotificationCount} unread
                      </span>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-[11px] text-[#98A2B3] hover:text-[#F5F7FA] transition-colors cursor-pointer"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-[#212833]/60">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#98A2B3]">
                      No pending notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationRead(notif.id);
                          if (notif.actionRoute) {
                            setActiveTab(notif.actionRoute);
                            setShowNotifMenu(false);
                          }
                        }}
                        className={`p-3 text-xs flex items-start gap-3 hover:bg-[#11161D] transition-colors cursor-pointer ${
                          !notif.read ? 'bg-[#D4AF37]/5' : ''
                        }`}
                      >
                        <div className="mt-0.5 p-1 rounded-md bg-[#11161D] border border-[#212833] shrink-0">
                          {getNotifIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className={`font-medium ${!notif.read ? 'text-[#F5F7FA] font-semibold' : 'text-[#98A2B3]'}`}>
                              {notif.title}
                            </span>
                            <span className="text-[10px] text-[#98A2B3] shrink-0 font-mono">
                              {notif.timestamp}
                            </span>
                          </div>
                          <p className="text-[#98A2B3] text-[11px] leading-relaxed line-clamp-2">
                            {notif.message}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Academic Help modal button */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-2 text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#151B23] rounded-lg transition-colors cursor-pointer"
            title="Principles of Management (GE3791) Academic Overview"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Reset Demo Data button */}
          <button
            onClick={() => setShowResetConfirm(true)}
            className="p-2 text-[#98A2B3] hover:text-[#D4AF37] hover:bg-[#151B23] rounded-lg transition-colors cursor-pointer"
            title="Reset to default mock dataset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* User Profile Lockup */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#212833]">
            <div className="w-7 h-7 rounded-lg bg-[#151B23] border border-[#D4AF37]/40 text-[#E8C96A] flex items-center justify-center font-bold text-xs shadow-sm">
              {currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-left hidden xl:block">
              <div className="text-xs font-semibold text-[#F5F7FA] leading-tight truncate max-w-[120px]">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-[#98A2B3] leading-tight">
                {currentRole}
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <button
            onClick={logout}
            className="p-2 text-[#98A2B3] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Academic Project Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-[#212833] mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#E8C96A] tracking-wider uppercase">
                  Regulation 2021 / Syllabus GE3791
                </span>
                <h3 className="text-base font-bold text-[#F5F7FA] mt-0.5">
                  Principles of Management — College Mini Project
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-[#98A2B3] hover:text-[#F5F7FA] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-[#98A2B3] space-y-3 leading-relaxed">
              <p>
                <strong className="text-[#F5F7FA]">Project Topic:</strong> "Impact of Technology on Human Resource Management"
              </p>
              <p>
                This application serves as an empirical, interactive demonstration for Anna University / Engineering colleges. 
                It illustrates how digital HR solutions modernize the classical <strong>Staffing</strong> and <strong>Controlling</strong> management functions.
              </p>
              <div className="p-3 rounded-lg bg-[#11161D] border border-[#212833] space-y-1.5">
                <div className="text-[11px] font-semibold text-[#F5F7FA]">Core Demonstrations for Evaluators:</div>
                <ul className="list-disc list-inside space-y-1 text-[11px]">
                  <li>Live ATS pipeline replacing paper newspaper job applications</li>
                  <li>Biometric timestamped punch ledger replacing muster roll tampering</li>
                  <li>1-click digital leave approval SLA with automated quotas</li>
                  <li>Continuous KPI & MBO goal tracker replacing annual memory appraisals</li>
                  <li>Dedicated side-by-side Technology Impact study with ROI estimator</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#212833] flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Data Confirmation */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-sm w-full p-5">
            <h3 className="text-sm font-semibold text-[#F5F7FA] mb-2">Reset Dataset to Default?</h3>
            <p className="text-xs text-[#98A2B3] mb-5 leading-relaxed">
              This will restore all default mock employees, attendance punches, and recruitment pipelines to the clean initial demo state.
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 text-xs font-medium text-[#F5F7FA] bg-[#11161D] border border-[#212833] hover:bg-[#151B23] rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToDefaultData();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg cursor-pointer"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
