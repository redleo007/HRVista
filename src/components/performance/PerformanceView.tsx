import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { PerformanceReview, PerformanceGoal } from '../../types/hr';
import { Badge } from '../common/Badge';
import {
  Award,
  Target,
  Star,
  CheckCircle2,
  TrendingUp,
  FileText,
  User,
  X,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const PerformanceView: React.FC = () => {
  const {
    performanceReviews,
    submitSelfAppraisal,
    evaluatePerformance,
    currentUser,
    currentRole
  } = useHR();

  const [evaluatingReview, setEvaluatingReview] = useState<PerformanceReview | null>(null);
  const [selfAppraisingReview, setSelfAppraisingReview] = useState<PerformanceReview | null>(null);

  const [managerForm, setManagerForm] = useState({
    managerRating: 4.5,
    strengths: '',
    areasOfImprovement: ''
  });

  const [selfForm, setSelfForm] = useState({
    selfRating: 4.5,
    achievements: '',
    challenges: ''
  });

  const scoreDistribution = [
    { bracket: '4.5 - 5.0 (Outstanding)', count: performanceReviews.filter(r => r.finalScore >= 4.5).length || 2 },
    { bracket: '4.0 - 4.4 (Exceeds)', count: performanceReviews.filter(r => r.finalScore >= 4.0 && r.finalScore < 4.5).length || 1 },
    { bracket: '3.5 - 3.9 (Meets Standards)', count: performanceReviews.filter(r => r.finalScore >= 3.5 && r.finalScore < 4.0).length || 1 },
    { bracket: '< 3.5 (Requires Development)', count: performanceReviews.filter(r => r.finalScore < 3.5 && r.finalScore > 0).length || 0 }
  ];

  const handleManagerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingReview) return;
    evaluatePerformance(evaluatingReview.id, {
      strengths: managerForm.strengths || 'Consistent architectural excellence and timely squad execution.',
      areasOfImprovement: managerForm.areasOfImprovement || 'Expand delegation and lead architecture council workshops.',
      managerRating: managerForm.managerRating
    });
    setEvaluatingReview(null);
  };

  const handleSelfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selfAppraisingReview) return;
    submitSelfAppraisal(selfAppraisingReview.id, {
      achievements: selfForm.achievements || 'Accomplished milestone deliverables ahead of scheduled sprint dates.',
      challenges: selfForm.challenges || 'Inter-service dependency alignment during sprint transitions.',
      selfRating: selfForm.selfRating
    });
    setSelfAppraisingReview(null);
  };

  return (
    <div className="space-y-5">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
              Management by Objectives (MBO)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
            Performance Appraisals & KPI Management
          </h1>
          <p className="text-xs text-[#98A2B3] mt-0.5">
            Continuous milestone alignment replacing subjective memory-based annual reviews.
          </p>
        </div>

        <span className="text-xs font-mono text-[#E8C96A] bg-[#151B23] px-3 py-1.5 rounded-lg border border-[#212833]">
          Active Cycle: Q3 2026 Evaluation
        </span>
      </div>

      {/* Analytics KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#98A2B3]">Enterprise Performance Index</span>
            <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-1">
            4.42 <span className="text-xs font-normal text-[#98A2B3]">/ 5.0</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-mono">
            +0.35 pts vs previous cycle
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#98A2B3]">Milestone Completion Rate</span>
            <Target className="w-4 h-4 text-[#E8C96A]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-1">
            91.4%
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Objective KPI alignment
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#98A2B3]">Appraisal Completion</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-1">
            {performanceReviews.filter(r => r.status === 'Completed').length} / {performanceReviews.length}
          </div>
          <div className="text-[10px] text-[#98A2B3] mt-1 font-mono">
            100% digital audit compliance
          </div>
        </div>
      </div>

      {/* Bell-Curve Distribution Chart */}
      <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#F5F7FA]">Performance Score Distribution</h3>
            <p className="text-xs text-[#98A2B3]">Benchmark distribution of evaluated workforce</p>
          </div>
          <span className="text-xs font-mono text-[#D4AF37]">Normal Bell Curve</span>
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#212833" />
              <XAxis dataKey="bracket" tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={{ stroke: '#212833' }} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#11161D',
                  border: '1px solid #212833',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                  color: '#F5F7FA'
                }}
              />
              <Bar dataKey="count" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={28} name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Appraisals & Goals Progression List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#F5F7FA]">Departmental Performance Evaluations</h3>

        {performanceReviews.map(review => (
          <div
            key={review.id}
            className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm space-y-4 hover:border-[#D4AF37]/30 transition-colors"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#212833]">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[#F5F7FA]">{review.employeeName}</h4>
                  <span className="text-xs text-[#D4AF37] font-mono">({review.employeeId})</span>
                  <Badge variant={review.status === 'Completed' ? 'success' : 'warning'} dot>
                    {review.status}
                  </Badge>
                </div>
                <p className="text-xs text-[#98A2B3] mt-0.5 font-mono">
                  {review.designation} · {review.department} · {review.reviewPeriod}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-[#98A2B3] uppercase tracking-wider block font-mono">Final Score</span>
                  <span className="text-lg font-bold font-mono text-[#E8C96A]">
                    {review.finalScore ? `${review.finalScore} / 5.0` : 'Pending'}
                  </span>
                </div>

                {currentRole === 'Employee' && review.status === 'Pending Self-Appraisal' && (
                  <button
                    onClick={() => {
                      setSelfAppraisingReview(review);
                      setSelfForm({
                        selfRating: review.selfAppraisal?.selfRating || 4.5,
                        achievements: review.selfAppraisal?.achievements || '',
                        challenges: review.selfAppraisal?.challenges || ''
                      });
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Self-Appraisal
                  </button>
                )}

                {currentRole !== 'Employee' && (
                  <button
                    onClick={() => {
                      setEvaluatingReview(review);
                      setManagerForm({
                        managerRating: review.managerEvaluation?.managerRating || 4.5,
                        strengths: review.managerEvaluation?.strengths || '',
                        areasOfImprovement: review.managerEvaluation?.areasOfImprovement || ''
                      });
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#F5F7FA] bg-[#11161D] hover:bg-[#1A222C] border border-[#212833] rounded-lg transition-colors cursor-pointer"
                  >
                    {review.status === 'Completed' ? 'Re-evaluate' : 'Conduct Evaluation'}
                  </button>
                )}
              </div>
            </div>

            {/* Goals & Progress */}
            <div>
              <h5 className="text-xs font-semibold text-[#F5F7FA] mb-2.5 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Assigned KPIs & Milestone Progression</span>
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {review.goals.map(goal => (
                  <div key={goal.id} className="p-3 bg-[#11161D] border border-[#212833] rounded-lg">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-[#F5F7FA] truncate" title={goal.title}>
                        {goal.title}
                      </span>
                      <span className="font-mono text-[#E8C96A] font-bold">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-[#151B23] rounded-full h-1.5 mb-1.5 overflow-hidden">
                      <div className="bg-[#D4AF37] h-1.5 rounded-full" style={{ width: `${goal.progress}%` }} />
                    </div>
                    <div className="text-[11px] text-[#98A2B3] line-clamp-1">{goal.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Appraisal Comments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 bg-[#11161D] border border-[#212833] rounded-lg space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[#F5F7FA] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#98A2B3]" /> Employee Self-Appraisal
                  </span>
                  <span className="font-mono text-[#D4AF37]">
                    Rating: {review.selfAppraisal?.selfRating ? `${review.selfAppraisal.selfRating}/5` : 'Pending'}
                  </span>
                </div>
                <p className="text-[#98A2B3] text-[11px] leading-relaxed">
                  <strong>Achievements:</strong> {review.selfAppraisal?.achievements || 'Pending submission.'}
                </p>
              </div>

              <div className="p-3.5 bg-[#11161D] border border-[#212833] rounded-lg space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[#F5F7FA] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#D4AF37]" /> Manager Evaluation ({review.managerEvaluation?.evaluatorName || 'HR'})
                  </span>
                  <span className="font-mono text-[#22C55E]">
                    Rating: {review.managerEvaluation?.managerRating ? `${review.managerEvaluation.managerRating}/5` : 'Pending'}
                  </span>
                </div>
                <p className="text-[#98A2B3] text-[11px] leading-relaxed">
                  <strong>Feedback:</strong> {review.managerEvaluation?.strengths || 'Pending evaluation.'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manager Evaluation Modal */}
      {evaluatingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#212833] mb-4">
              <div>
                <h3 className="text-base font-bold text-[#F5F7FA]">Conduct Manager Evaluation</h3>
                <p className="text-xs text-[#98A2B3]">{evaluatingReview.employeeName} ({evaluatingReview.designation})</p>
              </div>
              <button onClick={() => setEvaluatingReview(null)} className="text-[#98A2B3] hover:text-[#F5F7FA]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleManagerSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Manager Rating (1.0 to 5.0)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.1"
                    value={managerForm.managerRating}
                    onChange={e => setManagerForm({ ...managerForm, managerRating: parseFloat(e.target.value) })}
                    className="flex-1 accent-[#D4AF37]"
                  />
                  <span className="font-mono font-bold text-base text-[#E8C96A] w-12 text-center">
                    {managerForm.managerRating}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Key Strengths & Deliverables</label>
                <textarea
                  rows={2}
                  value={managerForm.strengths}
                  onChange={e => setManagerForm({ ...managerForm, strengths: e.target.value })}
                  placeholder="Outline core technical or organizational contributions..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Areas for Development</label>
                <textarea
                  rows={2}
                  value={managerForm.areasOfImprovement}
                  onChange={e => setManagerForm({ ...managerForm, areasOfImprovement: e.target.value })}
                  placeholder="Goals for upcoming review cycle..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                />
              </div>

              <div className="pt-3 border-t border-[#212833] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEvaluatingReview(null)}
                  className="px-4 py-2 text-xs font-medium text-[#F5F7FA] bg-[#11161D] border border-[#212833] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg cursor-pointer"
                >
                  Save Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Self Appraisal Modal */}
      {selfAppraisingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#212833] mb-4">
              <div>
                <h3 className="text-base font-bold text-[#F5F7FA]">Submit Self-Appraisal</h3>
                <p className="text-xs text-[#98A2B3]">Cycle: {selfAppraisingReview.reviewPeriod}</p>
              </div>
              <button onClick={() => setSelfAppraisingReview(null)} className="text-[#98A2B3] hover:text-[#F5F7FA]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSelfSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Self-Rating (1.0 to 5.0)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.1"
                    value={selfForm.selfRating}
                    onChange={e => setSelfForm({ ...selfForm, selfRating: parseFloat(e.target.value) })}
                    className="flex-1 accent-[#D4AF37]"
                  />
                  <span className="font-mono font-bold text-base text-[#E8C96A] w-12 text-center">
                    {selfForm.selfRating}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Key Accomplishments</label>
                <textarea
                  rows={2}
                  value={selfForm.achievements}
                  onChange={e => setSelfForm({ ...selfForm, achievements: e.target.value })}
                  placeholder="Outline projects shipped..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Operational Challenges</label>
                <textarea
                  rows={2}
                  value={selfForm.challenges}
                  onChange={e => setSelfForm({ ...selfForm, challenges: e.target.value })}
                  placeholder="Obstacles or training requirements..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
                />
              </div>

              <div className="pt-3 border-t border-[#212833] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelfAppraisingReview(null)}
                  className="px-4 py-2 text-xs font-medium text-[#F5F7FA] bg-[#11161D] border border-[#212833] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
