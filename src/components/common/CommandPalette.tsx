import React, { useState, useEffect } from 'react';
import { useHR } from '../../context/HRContext';
import {
  Search,
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
  X,
  ArrowRight
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { setActiveTab, employees, jobOpenings } = useHR();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigationCommands = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: BarChart3, category: 'Navigation' },
    { id: 'employees', label: 'Employee Directory', icon: Users, category: 'Navigation' },
    { id: 'recruitment', label: 'Recruitment & ATS', icon: Briefcase, category: 'Navigation' },
    { id: 'attendance', label: 'Attendance Terminal & Timesheets', icon: Clock, category: 'Navigation' },
    { id: 'leave', label: 'Leave Approvals & Balances', icon: CalendarCheck, category: 'Navigation' },
    { id: 'performance', label: 'Performance Appraisals & KPIs', icon: Award, category: 'Navigation' },
    { id: 'training', label: 'Training & Skill Development (LMS)', icon: GraduationCap, category: 'Navigation' },
    { id: 'feedback', label: 'Employee Feedback & Morale', icon: MessageSquareHeart, category: 'Navigation' },
    { id: 'analytics', label: 'Executive Workforce Analytics', icon: BarChart3, category: 'Navigation' },
    { id: 'impact', label: 'Technology Impact on HRM', icon: Cpu, category: 'Academic Research' },
    { id: 'reports', label: 'Report Generation & Data Export', icon: FileSpreadsheet, category: 'Navigation' },
    { id: 'settings', label: 'Organization & Role Settings', icon: Settings, category: 'Settings' }
  ];

  // Filter commands and employees
  const filteredNav = navigationCommands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const matchedEmployees = employees.filter(e =>
    e.name.toLowerCase().includes(query.toLowerCase()) ||
    e.employeeId.toLowerCase().includes(query.toLowerCase()) ||
    e.designation.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-[#212833] flex items-center gap-3 bg-[#11161D]">
          <Search className="w-4 h-4 text-[#D4AF37]" />
          <input
            autoFocus
            type="text"
            placeholder="Search commands, employees, or modules... (Esc to exit)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-[#F5F7FA] placeholder-[#98A2B3] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-[#98A2B3] hover:text-[#F5F7FA] p-1 text-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-2 max-h-96 overflow-y-auto space-y-3">
          {/* Matched Navigation */}
          {filteredNav.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider">
                Modules & Views
              </div>
              <div className="space-y-0.5">
                {filteredNav.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        onClose();
                      }}
                      className="w-full px-3 py-2 text-xs flex items-center justify-between rounded-lg text-[#F5F7FA] hover:bg-[#11161D] hover:text-[#E8C96A] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#98A2B3] group-hover:text-[#D4AF37]" />
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#98A2B3] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Matched Employees */}
          {matchedEmployees.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider">
                Employee Records
              </div>
              <div className="space-y-0.5">
                {matchedEmployees.map(emp => (
                  <button
                    key={emp.id}
                    onClick={() => {
                      setActiveTab('employees');
                      onClose();
                    }}
                    className="w-full px-3 py-2 text-xs flex items-center justify-between rounded-lg text-[#F5F7FA] hover:bg-[#11161D] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#11161D] border border-[#212833] text-[#D4AF37] flex items-center justify-center font-bold text-[10px]">
                        {emp.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-[#F5F7FA]">{emp.name}</div>
                        <div className="text-[10px] text-[#98A2B3]">{emp.designation} · {emp.department}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#98A2B3]">{emp.employeeId}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredNav.length === 0 && matchedEmployees.length === 0 && (
            <div className="py-8 text-center text-xs text-[#98A2B3]">
              No commands or personnel matching "{query}"
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-3.5 py-2 border-t border-[#212833] bg-[#11161D] flex items-center justify-between text-[10px] text-[#98A2B3] font-mono">
          <span>Navigate with mouse or search</span>
          <span>HRVISTA Platform</span>
        </div>
      </div>
    </div>
  );
};
