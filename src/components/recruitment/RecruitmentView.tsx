import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { JobOpening, JobApplicant, ApplicationStatus } from '../../types/hr';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';
import {
  Briefcase,
  Plus,
  Search,
  UserCheck,
  UserX,
  FileText,
  Star,
  MapPin,
  X,
  Send,
  Building,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

const PIPELINE_STAGES: ApplicationStatus[] = [
  'Applied',
  'Shortlisted',
  'Interview',
  'Selected',
  'Rejected'
];

export const RecruitmentView: React.FC = () => {
  const {
    jobOpenings,
    applicants,
    addJobOpening,
    addApplicant,
    updateApplicantStatus,
    currentRole
  } = useHR();

  // Tab: Openings vs Candidate Pipeline
  const [activeSubTab, setActiveSubTab] = useState<'funnel' | 'openings' | 'pipeline'>('funnel');

  // Filters
  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [applicantSearch, setApplicantSearch] = useState('');

  // Modals
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);
  const [isNewApplicantModalOpen, setIsNewApplicantModalOpen] = useState(false);
  const [viewingApplicant, setViewingApplicant] = useState<JobApplicant | null>(null);

  // Form states
  const [newJob, setNewJob] = useState<Omit<JobOpening, 'id'>>({
    title: '',
    department: 'Engineering',
    location: 'Chennai HQ',
    type: 'Full-Time',
    experienceLevel: '3-5 Years',
    openings: 1,
    status: 'Open',
    postedDate: new Date().toISOString().split('T')[0],
    description: '',
    requirements: ['React / TypeScript', 'Problem Solving', 'Team Collaboration'],
    salaryRange: '₹14,00,000 - ₹20,00,000 PA'
  });
  const [reqInput, setReqInput] = useState('React, TypeScript, Agile Leadership');

  const [newApplicant, setNewApplicant] = useState<Omit<JobApplicant, 'id'>>({
    jobId: jobOpenings[0]?.id || 'job-1',
    jobTitle: jobOpenings[0]?.title || 'Senior Frontend Architect',
    name: '',
    email: '',
    phone: '',
    appliedDate: new Date().toISOString().split('T')[0],
    experienceYears: 4,
    education: 'B.Tech / M.Sc Software Systems',
    status: 'Applied',
    resumeSummary: '',
    skills: ['TypeScript', 'Cloud Systems'],
    rating: 4,
    notes: 'Candidate registered through NEXORA Careers Portal.'
  });

  // Filtered applicants
  const filteredApplicants = applicants.filter(app => {
    const matchesJob = selectedJobId === 'all' || app.jobId === selectedJobId;
    const matchesStage = selectedStage === 'all' || app.status === selectedStage;
    const matchesSearch =
      app.name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      app.skills.some(s => s.toLowerCase().includes(applicantSearch.toLowerCase()));
    return matchesJob && matchesStage && matchesSearch;
  });

  const getStageVariant = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied':
        return 'info';
      case 'Shortlisted':
        return 'gold';
      case 'Interview':
        return 'warning';
      case 'Selected':
        return 'success';
      case 'Rejected':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title) return;
    const reqs = reqInput.split(',').map(r => r.trim()).filter(Boolean);
    addJobOpening({
      ...newJob,
      requirements: reqs.length > 0 ? reqs : ['Enterprise Experience']
    });
    setIsNewJobModalOpen(false);
  };

  const handleCreateApplicant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApplicant.name) return;
    const targetJob = jobOpenings.find(j => j.id === newApplicant.jobId);
    addApplicant({
      ...newApplicant,
      jobTitle: targetJob ? targetJob.title : newApplicant.jobTitle
    });
    setIsNewApplicantModalOpen(false);
  };

  // Funnel chart data
  const funnelChartData = [
    { stage: 'Applied', count: applicants.length, fill: '#38BDF8' },
    { stage: 'Shortlisted', count: applicants.filter(a => a.status !== 'Applied' && a.status !== 'Rejected').length, fill: '#D4AF37' },
    { stage: 'Interview', count: applicants.filter(a => a.status === 'Interview' || a.status === 'Selected').length, fill: '#F59E0B' },
    { stage: 'Selected', count: applicants.filter(a => a.status === 'Selected').length, fill: '#22C55E' }
  ];

  return (
    <div className="space-y-5">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
              Talent Acquisition Suite
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
            Recruitment & Applicant Pipeline (ATS)
          </h1>
          <p className="text-xs text-[#98A2B3] mt-0.5">
            Cloud pipeline replacing manual newspaper hiring with real-time candidate progression.
          </p>
        </div>

        {currentRole !== 'Employee' && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsNewApplicantModalOpen(true)}
              className="px-3.5 py-2 text-xs font-medium text-[#F5F7FA] bg-[#151B23] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Submit Candidate</span>
            </button>
            <button
              onClick={() => setIsNewJobModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm shadow-[#D4AF37]/20"
            >
              <Plus className="w-4 h-4" />
              <span>Create Opening</span>
            </button>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-[#212833] pb-2">
        <div className="flex items-center gap-2">
          {[
            { id: 'funnel', label: 'Funnel & Analytics' },
            { id: 'openings', label: `Active Openings (${jobOpenings.length})` },
            { id: 'pipeline', label: `Candidates (${applicants.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-[#151B23] text-[#E8C96A] border border-[#D4AF37]/30'
                  : 'text-[#98A2B3] hover:text-[#F5F7FA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-mono text-[#98A2B3] hidden sm:inline">
          Average Time-to-Hire: <strong className="text-[#F5F7FA]">18.4 Days</strong>
        </span>
      </div>

      {/* SUB-TAB 1: FUNNEL & ANALYTICS */}
      {activeSubTab === 'funnel' && (
        <div className="space-y-5">
          {/* Visual Step Funnel Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {funnelChartData.map((step, idx) => (
              <div
                key={step.stage}
                className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono uppercase text-[#98A2B3] tracking-wider">
                    Stage {idx + 1}
                  </span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: step.fill }} />
                </div>
                <div className="text-xl font-bold font-mono text-[#F5F7FA] mt-1">
                  {step.count} <span className="text-xs font-normal text-[#98A2B3]">candidates</span>
                </div>
                <div className="text-xs font-semibold text-[#F5F7FA] mt-1">{step.stage}</div>
              </div>
            ))}
          </div>

          {/* Funnel Conversion Bar Chart */}
          <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#F5F7FA]">Recruitment Conversion Rates</h3>
                <p className="text-xs text-[#98A2B3]">Progression drop-off across evaluation phases</p>
              </div>
              <span className="text-xs font-mono text-[#D4AF37]">Active Q4 Pipeline</span>
            </div>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#212833" />
                  <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={{ stroke: '#212833' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#11161D',
                      border: '1px solid #212833',
                      borderRadius: '0.5rem',
                      fontSize: '12px',
                      color: '#F5F7FA'
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={28}>
                    {funnelChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ACTIVE JOB OPENINGS */}
      {activeSubTab === 'openings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobOpenings.map(job => {
            const count = applicants.filter(a => a.jobId === job.id).length;
            return (
              <div
                key={job.id}
                className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm flex flex-col justify-between hover:border-[#D4AF37]/40 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{job.department}</span>
                      <h3 className="text-base font-bold text-[#F5F7FA] mt-0.5">{job.title}</h3>
                    </div>
                    <Badge variant={job.status === 'Open' ? 'success' : 'neutral'} dot>
                      {job.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#98A2B3] mb-3 font-mono">
                    <span>{job.location}</span>
                    <span>·</span>
                    <span>{job.type}</span>
                    <span>·</span>
                    <span>{job.experienceLevel}</span>
                  </div>

                  <p className="text-xs text-[#98A2B3] leading-relaxed mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.requirements.map((req, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[11px] bg-[#11161D] text-[#F5F7FA] border border-[#212833] rounded-md"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#212833] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#98A2B3] block">Salary Band</span>
                    <span className="font-mono font-semibold text-[#E8C96A]">{job.salaryRange}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedJobId(job.id);
                      setActiveSubTab('pipeline');
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-[#F5F7FA] bg-[#11161D] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors cursor-pointer"
                  >
                    View {count} Candidates
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SUB-TAB 3: CANDIDATE PIPELINE */}
      {activeSubTab === 'pipeline' && (
        <div className="space-y-4">
          {/* Search & Filters */}
          <div className="bg-[#151B23] p-3.5 rounded-xl border border-[#212833] flex flex-col md:flex-row items-center gap-3 shadow-sm">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search candidates by name, position, or credentials..."
                value={applicantSearch}
                onChange={e => setApplicantSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] placeholder-[#98A2B3] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <select
                value={selectedJobId}
                onChange={e => setSelectedJobId(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">All Job Positions</option>
                {jobOpenings.map(j => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </select>

              <select
                value={selectedStage}
                onChange={e => setSelectedStage(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">All Stages</option>
                {PIPELINE_STAGES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Candidates Table */}
          {filteredApplicants.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No Candidates Found"
              description="No candidates match your selected pipeline stage or search query."
              actionText="Reset Filters"
              onAction={() => {
                setSelectedJobId('all');
                setSelectedStage('all');
                setApplicantSearch('');
              }}
            />
          ) : (
            <div className="bg-[#151B23] rounded-xl border border-[#212833] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#212833] bg-[#11161D] text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider font-mono">
                      <th className="py-3 px-4">Candidate</th>
                      <th className="py-3 px-4">Applied Role</th>
                      <th className="py-3 px-4">Experience & Degree</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4">Stage</th>
                      <th className="py-3 px-4 text-right">Pipeline Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#212833]/60 text-xs">
                    {filteredApplicants.map(app => (
                      <tr key={app.id} className="hover:bg-[#1A222C]/70 transition-colors">
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setViewingApplicant(app)}
                            className="font-semibold text-[#F5F7FA] hover:text-[#E8C96A] text-left cursor-pointer"
                          >
                            {app.name}
                          </button>
                          <div className="text-[11px] text-[#98A2B3] font-mono mt-0.5">{app.email}</div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="text-[#F5F7FA] font-medium">{app.jobTitle}</div>
                          <div className="text-[10px] text-[#98A2B3] font-mono">Applied {app.appliedDate}</div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-mono text-[#E8C96A]">{app.experienceYears} yrs exp</div>
                          <div className="text-[11px] text-[#98A2B3] truncate max-w-[180px]">{app.education}</div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-[#D4AF37]">
                            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                            <span className="font-mono font-bold">{app.rating}.0</span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <Badge variant={getStageVariant(app.status)} dot>
                            {app.status}
                          </Badge>
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {app.status === 'Applied' && (
                              <button
                                onClick={() => updateApplicantStatus(app.id, 'Shortlisted')}
                                className="px-2.5 py-1 text-[11px] font-semibold text-[#E8C96A] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-lg cursor-pointer"
                              >
                                Shortlist
                              </button>
                            )}

                            {app.status === 'Shortlisted' && (
                              <button
                                onClick={() => updateApplicantStatus(app.id, 'Interview')}
                                className="px-2.5 py-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg cursor-pointer"
                              >
                                Interview
                              </button>
                            )}

                            {app.status === 'Interview' && (
                              <button
                                onClick={() => updateApplicantStatus(app.id, 'Selected')}
                                className="px-2.5 py-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg cursor-pointer flex items-center gap-1"
                              >
                                <UserCheck className="w-3 h-3" />
                                <span>Select</span>
                              </button>
                            )}

                            {app.status !== 'Rejected' && app.status !== 'Selected' && (
                              <button
                                onClick={() => updateApplicantStatus(app.id, 'Rejected')}
                                className="p-1 text-[#98A2B3] hover:text-rose-400 hover:bg-rose-500/10 rounded-md cursor-pointer"
                                title="Reject"
                              >
                                <UserX className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={() => setViewingApplicant(app)}
                              className="px-2.5 py-1 text-[11px] font-medium text-[#F5F7FA] bg-[#11161D] hover:bg-[#1A222C] border border-[#212833] rounded-lg cursor-pointer"
                            >
                              Profile
                            </button>
                          </div>
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

      {/* Candidate Profile Modal */}
      {viewingApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-xl w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-[#212833] mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#F5F7FA]">{viewingApplicant.name}</h3>
                  <Badge variant={getStageVariant(viewingApplicant.status)} dot>
                    {viewingApplicant.status}
                  </Badge>
                </div>
                <p className="text-xs text-[#D4AF37] font-medium mt-0.5">
                  Applied for: {viewingApplicant.jobTitle}
                </p>
              </div>
              <button onClick={() => setViewingApplicant(null)} className="text-[#98A2B3] hover:text-[#F5F7FA]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#11161D] p-3 rounded-lg border border-[#212833]">
                <div>
                  <span className="text-[#98A2B3] block text-[10px]">Email</span>
                  <span className="text-[#F5F7FA] font-medium">{viewingApplicant.email}</span>
                </div>
                <div>
                  <span className="text-[#98A2B3] block text-[10px]">Phone</span>
                  <span className="text-[#F5F7FA] font-mono">{viewingApplicant.phone}</span>
                </div>
                <div>
                  <span className="text-[#98A2B3] block text-[10px]">Experience</span>
                  <span className="text-[#E8C96A] font-mono">{viewingApplicant.experienceYears} Years</span>
                </div>
                <div>
                  <span className="text-[#98A2B3] block text-[10px]">Applied Date</span>
                  <span className="text-[#F5F7FA] font-mono">{viewingApplicant.appliedDate}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#F5F7FA] mb-1">Education Background</h4>
                <p className="text-[#98A2B3] bg-[#11161D] p-2.5 rounded-lg border border-[#212833]">
                  {viewingApplicant.education}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#F5F7FA] mb-1">Resume Executive Summary</h4>
                <p className="text-[#98A2B3] bg-[#11161D] p-2.5 rounded-lg border border-[#212833] leading-relaxed">
                  {viewingApplicant.resumeSummary}
                </p>
              </div>

              {/* Status Update Actions */}
              <div className="pt-3 border-t border-[#212833]">
                <span className="text-[11px] font-semibold text-[#F5F7FA] block mb-2">
                  Update Pipeline Stage:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PIPELINE_STAGES.map(stage => (
                    <button
                      key={stage}
                      onClick={() => {
                        updateApplicantStatus(viewingApplicant.id, stage);
                        setViewingApplicant({ ...viewingApplicant, status: stage });
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        viewingApplicant.status === stage
                          ? 'bg-[#D4AF37] text-[#0B0F14] font-bold'
                          : 'bg-[#11161D] text-[#98A2B3] hover:text-[#F5F7FA] border border-[#212833]'
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#212833] flex justify-end">
              <button
                onClick={() => setViewingApplicant(null)}
                className="px-4 py-1.5 text-xs font-semibold text-[#F5F7FA] bg-[#11161D] hover:bg-[#1A222C] border border-[#212833] rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Opening Modal */}
      {isNewJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#212833] mb-4">
              <h3 className="text-base font-bold text-[#F5F7FA]">Publish Job Opening</h3>
              <button onClick={() => setIsNewJobModalOpen(false)} className="text-[#98A2B3] hover:text-[#F5F7FA]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Position Title *</label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="e.g. Lead Cloud Architect"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Department</label>
                  <select
                    value={newJob.department}
                    onChange={e => setNewJob({ ...newJob, department: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Compensation Range</label>
                  <input
                    type="text"
                    value={newJob.salaryRange}
                    onChange={e => setNewJob({ ...newJob, salaryRange: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newJob.description}
                  onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="Responsibilities and mission..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Competencies (comma separated)</label>
                <input
                  type="text"
                  value={reqInput}
                  onChange={e => setReqInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                />
              </div>

              <div className="pt-3 border-t border-[#212833] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewJobModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#F5F7FA] bg-[#11161D] border border-[#212833] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg cursor-pointer"
                >
                  Publish Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Candidate Registration Modal */}
      {isNewApplicantModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#212833] mb-4">
              <h3 className="text-base font-bold text-[#F5F7FA]">Submit Candidate Profile</h3>
              <button onClick={() => setIsNewApplicantModalOpen(false)} className="text-[#98A2B3] hover:text-[#F5F7FA]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateApplicant} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Target Opening</label>
                <select
                  value={newApplicant.jobId}
                  onChange={e => setNewApplicant({ ...newApplicant, jobId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                >
                  {jobOpenings.map(j => (
                    <option key={j.id} value={j.id}>{j.title} ({j.department})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newApplicant.name}
                    onChange={e => setNewApplicant({ ...newApplicant, name: e.target.value })}
                    placeholder="Candidate Name"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newApplicant.email}
                    onChange={e => setNewApplicant({ ...newApplicant, email: e.target.value })}
                    placeholder="candidate@gmail.com"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Summary</label>
                <textarea
                  rows={2}
                  value={newApplicant.resumeSummary}
                  onChange={e => setNewApplicant({ ...newApplicant, resumeSummary: e.target.value })}
                  placeholder="Key background..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                />
              </div>

              <div className="pt-3 border-t border-[#212833] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewApplicantModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#F5F7FA] bg-[#11161D] border border-[#212833] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg cursor-pointer"
                >
                  Add Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
