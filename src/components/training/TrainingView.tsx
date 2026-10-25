import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { TrainingProgram } from '../../types/hr';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';
import {
  GraduationCap,
  Plus,
  Calendar,
  Clock,
  Award,
  X,
  Search,
  Check,
  Calendar as CalendarIcon
} from 'lucide-react';

export const TrainingView: React.FC = () => {
  const {
    trainingPrograms,
    createTrainingProgram,
    enrollInTraining,
    completeTraining,
    currentUser,
    currentRole
  } = useHR();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'programs' | 'calendar' | 'certificates'>('programs');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProgram, setNewProgram] = useState<Omit<TrainingProgram, 'id'>>({
    title: '',
    category: 'Technical Skills',
    trainer: '',
    format: 'Virtual (Online)',
    department: 'Engineering',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    durationHours: 16,
    capacity: 30,
    enrolledEmployeeIds: [],
    completedEmployeeIds: [],
    description: '',
    status: 'Upcoming'
  });

  const categories = [
    'All',
    'Technical Skills',
    'Leadership',
    'Compliance & Safety',
    'Productivity'
  ];

  const filteredPrograms = trainingPrograms.filter(prog => {
    const matchesCategory = selectedCategory === 'All' || prog.category === selectedCategory;
    const matchesSearch =
      prog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.trainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgram.title) return;
    createTrainingProgram(newProgram);
    setIsCreateModalOpen(false);
  };

  const getStatusVariant = (status: TrainingProgram['status']) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'gold';
      case 'Upcoming':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-5">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
              Workforce Competency Platform (LMS)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
            Learning & Development Management
          </h1>
          <p className="text-xs text-[#98A2B3] mt-0.5">
            Cloud LMS replacing physical classroom circulars with verified credentials.
          </p>
        </div>

        {currentRole !== 'Employee' && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-sm shadow-[#D4AF37]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Training Program</span>
          </button>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-[#212833] pb-2">
        <div className="flex items-center gap-2">
          {[
            { id: 'programs', label: `Programs Catalog (${trainingPrograms.length})` },
            { id: 'calendar', label: 'Training Calendar' },
            { id: 'certificates', label: 'Verified Certificates' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#151B23] text-[#E8C96A] border border-[#D4AF37]/30'
                  : 'text-[#98A2B3] hover:text-[#F5F7FA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-TAB 1: PROGRAMS CATALOG */}
      {activeTab === 'programs' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-[#151B23] p-3.5 rounded-xl border border-[#212833] flex flex-col md:flex-row items-center gap-3 shadow-sm">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search programs by title, instructor, or skill domain..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] placeholder-[#98A2B3] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#D4AF37] text-[#0B0F14] font-bold'
                      : 'bg-[#11161D] text-[#98A2B3] hover:text-[#F5F7FA] border border-[#212833]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Programs Grid */}
          {filteredPrograms.length === 0 ? (
            <EmptyState
              icon={GraduationCap}
              title="No Training Programs Found"
              description="No programs match your search criteria. Check back or schedule a program."
              actionText={currentRole !== 'Employee' ? 'Create Program' : undefined}
              onAction={() => setIsCreateModalOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPrograms.map(prog => {
                const isEnrolled = prog.enrolledEmployeeIds.includes(currentUser.employeeId);
                const isCompleted = prog.completedEmployeeIds.includes(currentUser.employeeId);
                const enrolledCount = prog.enrolledEmployeeIds.length;
                const completedCount = prog.completedEmployeeIds.length;

                return (
                  <div
                    key={prog.id}
                    className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm flex flex-col justify-between hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{prog.category}</span>
                          <h3 className="text-base font-bold text-[#F5F7FA] mt-0.5">{prog.title}</h3>
                        </div>
                        <Badge variant={getStatusVariant(prog.status)} dot>
                          {prog.status}
                        </Badge>
                      </div>

                      <p className="text-xs text-[#98A2B3] leading-relaxed mb-4">
                        {prog.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-[#11161D] p-3 rounded-lg border border-[#212833] mb-4">
                        <div>
                          <span className="text-[#98A2B3] block text-[10px]">Faculty / Vendor</span>
                          <span className="text-[#F5F7FA] font-medium truncate block">{prog.trainer}</span>
                        </div>
                        <div>
                          <span className="text-[#98A2B3] block text-[10px]">Format & Mode</span>
                          <span className="text-[#F5F7FA] font-medium">{prog.format}</span>
                        </div>
                        <div>
                          <span className="text-[#98A2B3] block text-[10px]">Schedule</span>
                          <span className="text-[#E8C96A] font-mono text-[11px]">{prog.startDate} to {prog.endDate}</span>
                        </div>
                        <div>
                          <span className="text-[#98A2B3] block text-[10px]">Capacity</span>
                          <span className="text-[#F5F7FA] font-mono text-[11px]">{enrolledCount} / {prog.capacity} Enrolled</span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-[11px] text-[#98A2B3] mb-1">
                          <span>Completion Rate</span>
                          <span className="font-mono text-[#F5F7FA] font-semibold">
                            {completedCount} / {enrolledCount || 1} ({enrolledCount > 0 ? Math.round((completedCount / enrolledCount) * 100) : 0}%)
                          </span>
                        </div>
                        <div className="w-full bg-[#11161D] rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-1.5 rounded-full"
                            style={{ width: `${enrolledCount > 0 ? (completedCount / enrolledCount) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-[#212833] flex items-center justify-between text-xs">
                      <div>
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-xs">
                            <Award className="w-4 h-4" /> Certified Complete
                          </span>
                        ) : isEnrolled ? (
                          <span className="inline-flex items-center gap-1 text-[#E8C96A] font-medium text-xs">
                            <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> Enrolled
                          </span>
                        ) : (
                          <span className="text-[#98A2B3] text-[11px]">Seats open</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {!isEnrolled && (
                          <button
                            onClick={() => enrollInTraining(prog.id, currentUser.employeeId)}
                            className="px-3.5 py-1.5 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-colors cursor-pointer"
                          >
                            Enroll Now
                          </button>
                        )}

                        {isEnrolled && !isCompleted && (
                          <button
                            onClick={() => completeTraining(prog.id, currentUser.employeeId)}
                            className="px-3.5 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors cursor-pointer"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#212833]">
            <h3 className="text-sm font-bold text-[#F5F7FA]">Active Cohort Timeline & Schedule</h3>
            <span className="text-xs font-mono text-[#D4AF37]">Fall 2026 Curriculum</span>
          </div>

          <div className="space-y-3">
            {trainingPrograms.map(p => (
              <div key={p.id} className="p-4 bg-[#11161D] rounded-xl border border-[#212833] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#151B23] border border-[#D4AF37]/30 text-[#E8C96A] flex items-center justify-center font-bold">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#F5F7FA] text-xs">{p.title}</h4>
                    <p className="text-[11px] text-[#98A2B3] font-mono mt-0.5">
                      {p.startDate} to {p.endDate} · {p.durationHours} hours · {p.trainer}
                    </p>
                  </div>
                </div>
                <Badge variant="gold">{p.format}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainingPrograms.filter(t => t.completedEmployeeIds.length > 0).map(prog => (
            <div key={prog.id} className="bg-[#151B23] rounded-xl border border-[#D4AF37]/30 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase">Enterprise Verified Credential</span>
                <Award className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-bold text-[#F5F7FA] text-sm">{prog.title}</h4>
                <p className="text-xs text-[#98A2B3] mt-1">{prog.trainer} · Issued upon completion</p>
              </div>
              <div className="pt-2 border-t border-[#212833] flex items-center justify-between text-xs font-mono text-[#E8C96A]">
                <span>{prog.completedEmployeeIds.length} Verified Graduates</span>
                <span>Audit Verified</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Program Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#212833] mb-4">
              <h3 className="text-base font-bold text-[#F5F7FA]">Schedule Training Program</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-[#98A2B3] hover:text-[#F5F7FA]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newProgram.title}
                  onChange={e => setNewProgram({ ...newProgram, title: e.target.value })}
                  placeholder="e.g. Distributed Cloud Systems Mastery"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Category</label>
                  <select
                    value={newProgram.category}
                    onChange={e => setNewProgram({ ...newProgram, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                  >
                    <option value="Technical Skills">Technical Skills</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Compliance & Safety">Compliance & Safety</option>
                    <option value="Productivity">Productivity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Format</label>
                  <select
                    value={newProgram.format}
                    onChange={e => setNewProgram({ ...newProgram, format: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                  >
                    <option value="Virtual (Online)">Virtual (Online)</option>
                    <option value="In-Person Workshop">In-Person Workshop</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Instructor / Vendor</label>
                  <input
                    type="text"
                    required
                    value={newProgram.trainer}
                    onChange={e => setNewProgram({ ...newProgram, trainer: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Duration (Hours)</label>
                  <input
                    type="number"
                    value={newProgram.durationHours}
                    onChange={e => setNewProgram({ ...newProgram, durationHours: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProgram.description}
                  onChange={e => setNewProgram({ ...newProgram, description: e.target.value })}
                  placeholder="Curriculum overview..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                />
              </div>

              <div className="pt-3 border-t border-[#212833] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#F5F7FA] bg-[#11161D] border border-[#212833] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg cursor-pointer"
                >
                  Publish Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
