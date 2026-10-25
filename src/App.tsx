/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HRProvider, useHR } from './context/HRContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LoginView } from './components/auth/LoginView';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { EmployeeList } from './components/employees/EmployeeList';
import { RecruitmentView } from './components/recruitment/RecruitmentView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { LeaveView } from './components/leave/LeaveView';
import { PerformanceView } from './components/performance/PerformanceView';
import { TrainingView } from './components/training/TrainingView';
import { FeedbackView } from './components/feedback/FeedbackView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { ReportsView } from './components/reports/ReportsView';
import { TechImpactView } from './components/techImpact/TechImpactView';
import { SettingsView } from './components/settings/SettingsView';
import { Menu, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, activeTab } = useHR();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'employees':
        return <EmployeeList />;
      case 'recruitment':
        return <RecruitmentView />;
      case 'attendance':
        return <AttendanceView />;
      case 'leave':
        return <LeaveView />;
      case 'performance':
        return <PerformanceView />;
      case 'training':
        return <TrainingView />;
      case 'feedback':
        return <FeedbackView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'reports':
        return <ReportsView />;
      case 'impact':
        return <TechImpactView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] flex flex-col text-[#F5F7FA]">
      {/* Top Navbar */}
      <Header onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      {/* Floating Mobile Trigger */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-3 bg-[#D4AF37] text-[#0B0F14] rounded-full shadow-xl flex items-center justify-center cursor-pointer font-bold"
          aria-label="Toggle Menu"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 bg-[#0E131A] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {renderActiveView()}

          {/* Academic Footer */}
          <footer className="mt-14 pt-6 border-t border-[#212833] text-center text-xs text-[#98A2B3] pb-8">
            <div className="font-semibold text-[#F5F7FA] tracking-wide">
              NEXORA HR — Enterprise Human Resource Intelligence System
            </div>
            <div className="text-[11px] text-[#98A2B3] mt-1 font-mono">
              College Mini Project · Principles of Management (GE3791 / Regulation 2021) · Topic: Impact of Technology on HRM
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <HRProvider>
      <AppContent />
    </HRProvider>
  );
}
