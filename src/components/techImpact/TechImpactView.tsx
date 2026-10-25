import React, { useState } from 'react';
import { TECH_IMPACT_COMPARISONS } from '../../data/initialData';
import {
  Cpu,
  ArrowRight,
  Clock,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  BookOpen,
  Calculator,
  Layers,
  Users,
  Search,
  FileSpreadsheet,
  Building2,
  ChevronRight,
  Smile
} from 'lucide-react';

export const TechImpactView: React.FC = () => {
  const [selectedProcessId, setSelectedProcessId] = useState<string>(TECH_IMPACT_COMPARISONS[0].id);
  const [workforceSize, setWorkforceSize] = useState<number>(250);

  const activeProcess = TECH_IMPACT_COMPARISONS.find(c => c.id === selectedProcessId) || TECH_IMPACT_COMPARISONS[0];

  // Quantitative savings calculator
  const annualPaperSheetsSaved = workforceSize * 140; // ~140 sheets/employee/year
  const hoursReconciliationSaved = Math.round(workforceSize * 1.8 * 12);
  const estimatedCostSavingsINR = Math.round(workforceSize * 4800);

  // 6 Core Architectural Transformations
  const coreTransformations = [
    {
      id: 'impact-1',
      traditional: 'Manual Recruitment',
      digital: 'Online Recruitment (ATS)',
      metric: '65% Faster Time-to-Hire',
      subtext: 'From 52 days postal to 18 days ATS'
    },
    {
      id: 'impact-2',
      traditional: 'Paper Employee Records',
      digital: 'Digital Employee Records',
      metric: '95% Retrieval Speedup',
      subtext: 'From 30 minutes in cabinets to < 2 seconds'
    },
    {
      id: 'impact-3',
      traditional: 'Manual Attendance',
      digital: 'Digital Attendance Tracking',
      metric: '99.8% Punctuality Accuracy',
      subtext: 'Buddy punching eliminated with biometrics'
    },
    {
      id: 'impact-4',
      traditional: 'Manual Appraisal',
      digital: 'Digital Performance Management',
      metric: 'Continuous MBO Alignment',
      subtext: 'Objective KPIs replace memory-bias reviews'
    },
    {
      id: 'impact-5',
      traditional: 'Physical Training',
      digital: 'Digital Learning Management',
      metric: '100% Audit Verified Badges',
      subtext: 'On-demand skill modules replace rigid classrooms'
    },
    {
      id: 'impact-6',
      traditional: 'Manual Reports',
      digital: 'Real-Time HR Analytics',
      metric: 'Zero-Latency Executive Telemetry',
      subtext: 'Automated predictive charts replace manual Excel'
    }
  ];

  // 8 Measurable Benefits requested
  const measurableBenefits = [
    {
      title: 'Reduced Paperwork & Filing',
      description: '100% paperless administration eliminates physical file folders, physical storage rooms, and printer consumables.',
      metric: '92% Reduction',
      icon: FileCheck
    },
    {
      title: 'Faster HR Processes',
      description: 'Leave approvals, candidate shortlisting, and employee onboarding drop from days to minutes.',
      metric: '< 2 Hr Turnaround',
      icon: Clock
    },
    {
      title: 'Improved Data Accuracy',
      description: 'Automated attendance calculation and leave balance checks eliminate payroll miscalculations and human errors.',
      metric: '99.8% Precision',
      icon: ShieldCheck
    },
    {
      title: 'Better Employee Communication',
      description: 'Transparent 2-way feedback channels, real-time approval alerts, and clear KPI progression visibility.',
      metric: 'Real-Time Sync',
      icon: Users
    },
    {
      title: 'Centralized Employee Information',
      description: 'A single, encrypted cloud master record accessible seamlessly across remote branches and HQ departments.',
      metric: 'Sub-2s Retrieval',
      icon: Layers
    },
    {
      title: 'Data-Driven Decision Making',
      description: 'Predictive dashboards analyze turnover factors, skill gaps, and department morale before operational issues arise.',
      metric: 'Predictive Insights',
      icon: TrendingUp
    },
    {
      title: 'Better Monitoring & Statutory Compliance',
      description: 'Complete immutable audit trails ensure compliance with labor laws, PF, ESIC, and corporate governance.',
      metric: '100% Audit Readiness',
      icon: CheckCircle2
    },
    {
      title: 'Improved Employee Experience',
      description: 'Self-service mobile/web check-ins, transparent goal tracking, and accessible HR policies build team morale.',
      metric: '+52 Net eNPS',
      icon: Smile
    }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Academic Banner */}
      <div className="bg-white rounded-xl p-6 text-[#F5F7FA] border border-slate-200 border-l-4 border-l-violet-700 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E8C96A] mb-1 font-mono">
            <span className="px-2.5 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              Regulation 2021 / Mini Project
            </span>
            <span>Anna University Principles of Management Mini Project</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172554] mt-1">
            Impact of Technology on Human Resource Management
          </h1>

          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-6">
            This module provides the core empirical research demonstration for the course project. 
            It analyzes the transition from bureaucratic, paper-centric personnel management into a modern, 
            data-driven, strategic Human Resource Information System (HRIS).
          </p>
        </div>
      </div>

      {/* 6 Core Transformations: Process Flow Cards */}
      <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-[#172554]">
            Traditional HR Process → Digital HR Process
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Key operational shifts mandated by the Principles of Management syllabus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {coreTransformations.map((t, idx) => {
            const isSelected = activeProcess.category.toLowerCase().includes(t.traditional.toLowerCase().split(' ')[1] || '');
            return (
              <div
                key={idx}
                onClick={() => {
                  const match = TECH_IMPACT_COMPARISONS.find(c =>
                    c.category.toLowerCase().includes(t.traditional.toLowerCase().split(' ')[1] || '')
                  );
                  if (match) setSelectedProcessId(match.id);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#11161D] border-[#D4AF37] ring-1 ring-[#D4AF37]/40 shadow-sm'
                    : 'bg-[#11161D] border-[#212833] hover:border-[#D4AF37]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#98A2B3] mb-2">
                    <span className="line-through opacity-70">{t.traditional}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#F5F7FA] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{t.digital}</span>
                  </h3>
                  <div className="text-xs text-emerald-400 font-mono font-bold mt-2">
                    {t.metric}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#212833] text-[10px] text-[#98A2B3]">
                  {t.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Deep Dive Comparison */}
      <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#212833]">
          <div>
            <h3 className="text-sm font-bold text-[#F5F7FA]">
              Detailed Operational Audit: {activeProcess.category}
            </h3>
            <p className="text-xs text-[#98A2B3]">Direct contrast of legacy pain points vs automated cloud workflow</p>
          </div>
          <span className="text-xs font-mono text-[#D4AF37]">Selected Domain</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Traditional Process */}
          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-rose-500/20">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest font-mono">
                  Legacy Model: Manual
                </span>
                <XCircle className="w-4 h-4 text-rose-400" />
              </div>
              <h4 className="text-sm font-bold text-[#F5F7FA] mb-3">
                {activeProcess.traditionalProcess}
              </h4>
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-rose-300 block">Observed Bottlenecks:</span>
                {activeProcess.traditionalPainPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#98A2B3]">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-rose-500/20 text-[10px] text-rose-400 font-mono">
              Administrative Latency: 3 to 14 Business Days
            </div>
          </div>

          {/* Digital Process */}
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-500/20">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
                  Smart HR Architecture: Digital
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-sm font-bold text-[#F5F7FA] mb-3">
                {activeProcess.digitalProcess}
              </h4>
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-emerald-300 block">Digital Efficiencies:</span>
                {activeProcess.digitalAdvantages.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#F5F7FA]">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-500/20 grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-[#98A2B3] block">Time Saved</span>
                <span className="font-bold text-emerald-400">{activeProcess.timeReduction}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#98A2B3] block">Accuracy Metric</span>
                <span className="font-bold text-emerald-400">{activeProcess.accuracyGain}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Mapping Tag */}
        <div className="p-3 bg-[#11161D] rounded-lg border border-[#212833] flex items-center gap-2.5 text-xs">
          <BookOpen className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <div className="text-[#98A2B3]">
            <strong className="text-[#F5F7FA]">Management Concept:</strong> {activeProcess.managementPrinciple}
          </div>
        </div>
      </div>

      {/* Interactive Quantitative ROI Estimator */}
      <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#212833]">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-sm font-bold text-[#F5F7FA]">
                Interactive Digital HR Savings Estimator
              </h3>
            </div>
            <p className="text-xs text-[#98A2B3] mt-0.5">
              Simulate quantitative efficiency gains as an organization scales
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#98A2B3]">Headcount:</span>
            <select
              value={workforceSize}
              onChange={e => setWorkforceSize(Number(e.target.value))}
              className="px-3 py-1.5 text-xs font-mono font-bold text-[#E8C96A] bg-[#11161D] border border-[#212833] rounded-lg focus:outline-none focus:border-[#D4AF37]"
            >
              <option value={50}>50 Employees</option>
              <option value={100}>100 Employees</option>
              <option value={250}>250 Employees</option>
              <option value={500}>500 Employees</option>
              <option value={1000}>1,000 Employees</option>
              <option value={2500}>2,500 Employees</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="p-4 bg-[#11161D] rounded-xl border border-[#212833]">
            <span className="text-[11px] text-[#98A2B3]">Paper Saved Annually</span>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
              {annualPaperSheetsSaved.toLocaleString()} sheets
            </div>
            <span className="text-[10px] text-[#98A2B3] mt-0.5 block">Zero physical storage rooms</span>
          </div>

          <div className="p-4 bg-[#11161D] rounded-xl border border-[#212833]">
            <span className="text-[11px] text-[#98A2B3]">Admin Hours Liberated</span>
            <div className="text-xl font-bold font-mono text-[#D4AF37] mt-1">
              {hoursReconciliationSaved.toLocaleString()} hours/yr
            </div>
            <span className="text-[10px] text-[#98A2B3] mt-0.5 block">Reinvested into strategic talent</span>
          </div>

          <div className="p-4 bg-[#11161D] rounded-xl border border-[#212833]">
            <span className="text-[11px] text-[#98A2B3]">Hiring Velocity Gain</span>
            <div className="text-xl font-bold font-mono text-sky-400 mt-1">
              -34 days
            </div>
            <span className="text-[10px] text-[#98A2B3] mt-0.5 block">From 52 days to 18 days average</span>
          </div>

          <div className="p-4 bg-[#11161D] rounded-xl border border-[#212833]">
            <span className="text-[11px] text-[#98A2B3]">Estimated Operational Savings</span>
            <div className="text-xl font-bold font-mono text-[#F5F7FA] mt-1">
              ₹{estimatedCostSavingsINR.toLocaleString()} PA
            </div>
            <span className="text-[10px] text-[#98A2B3] mt-0.5 block">Direct administrative efficiency</span>
          </div>
        </div>
      </div>

      {/* 8 Measurable Benefits Requested */}
      <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm space-y-4">
        <div>
          <h2 className="text-sm font-bold text-[#F5F7FA] uppercase tracking-wider font-mono">
            8 Core Organizational Benefits of HR Digitization
          </h2>
          <p className="text-xs text-[#98A2B3] mt-0.5">
            Key theoretical advantages outlined in the Principles of Management curriculum
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {measurableBenefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-4 bg-[#11161D] rounded-xl border border-[#212833] hover:border-[#D4AF37]/30 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#151B23] border border-[#212833] text-[#D4AF37] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-[#E8C96A] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/25">
                      {b.metric}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#F5F7FA] mb-1">{b.title}</h4>
                  <p className="text-[11px] text-[#98A2B3] leading-relaxed">{b.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Viva Academic Defense Summary */}
      <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#212833]">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-sm font-bold text-[#F5F7FA]">
              Academic Defense Points for Project Evaluation (Viva Voce)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#E8C96A]">Regulation 2021 Syllabus Defense</span>
        </div>

        <div className="text-xs text-[#98A2B3] space-y-2 leading-relaxed">
          <p>
            <strong className="text-[#F5F7FA]">1. Staffing Function Modernization:</strong> Classical management (Henri Fayol) classifies Staffing 
            as human resource planning, recruitment, selection, training, and development. Technology elevates staffing from clerical record keeping 
            to strategic human capital alignment.
          </p>
          <p>
            <strong className="text-[#F5F7FA]">2. Scientific Management (Taylor):</strong> Frederick Winslow Taylor emphasized scientific selection 
            and training of workers. ATS keyword screening and structured rating scales ensure meritocratic, bias-free candidate selection.
          </p>
          <p>
            <strong className="text-[#F5F7FA]">3. Controlling Loop (Management by Objectives):</strong> The live attendance punches and quarterly KPI meters 
            implement the classic controlling loop: establishing benchmarks, measuring actual performance, and enacting development plans.
          </p>
        </div>
      </div>
    </div>
  );
};
