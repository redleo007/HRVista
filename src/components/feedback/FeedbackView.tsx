import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { FeedbackSubmission } from '../../types/hr';
import { Badge } from '../common/Badge';
import {
  MessageSquareHeart,
  Star,
  Send,
  Smile,
  ShieldCheck,
  TrendingUp,
  Heart,
  Users
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

export const FeedbackView: React.FC = () => {
  const {
    feedbackList,
    submitFeedback,
    currentUser
  } = useHR();

  const [formData, setFormData] = useState<{
    overallRating: number;
    workLifeBalance: number;
    careerGrowth: number;
    managementSupport: number;
    compensationBenefits: number;
    comments: string;
    isAnonymous: boolean;
    category: FeedbackSubmission['category'];
  }>({
    overallRating: 5,
    workLifeBalance: 4,
    careerGrowth: 4,
    managementSupport: 5,
    compensationBenefits: 4,
    comments: '',
    isAnonymous: false,
    category: 'Workplace Environment'
  });

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const totalSubmissions = feedbackList.length;
  const avgOverall = totalSubmissions > 0
    ? (feedbackList.reduce((sum, f) => sum + f.overallRating, 0) / totalSubmissions).toFixed(1)
    : '4.3';
  const avgWLB = totalSubmissions > 0
    ? (feedbackList.reduce((sum, f) => sum + f.workLifeBalance, 0) / totalSubmissions).toFixed(1)
    : '4.2';
  const avgGrowth = totalSubmissions > 0
    ? (feedbackList.reduce((sum, f) => sum + f.careerGrowth, 0) / totalSubmissions).toFixed(1)
    : '4.0';
  const avgSupport = totalSubmissions > 0
    ? (feedbackList.reduce((sum, f) => sum + f.managementSupport, 0) / totalSubmissions).toFixed(1)
    : '4.5';

  const pillarChartData = [
    { pillar: 'Overall', score: parseFloat(avgOverall) },
    { pillar: 'Work-Life Balance', score: parseFloat(avgWLB) },
    { pillar: 'Career Growth', score: parseFloat(avgGrowth) },
    { pillar: 'Mgmt Support', score: parseFloat(avgSupport) }
  ];

  const deptComparisonData = [
    { department: 'Engineering', score: 4.6 },
    { department: 'Design', score: 4.4 },
    { department: 'HR', score: 4.7 },
    { department: 'Marketing', score: 4.2 },
    { department: 'Finance', score: 4.1 },
    { department: 'Operations', score: 4.3 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback({
      employeeId: formData.isAnonymous ? 'ANON' : currentUser.employeeId,
      employeeName: formData.isAnonymous ? 'Anonymous Employee' : currentUser.name,
      department: currentUser.department,
      overallRating: formData.overallRating,
      workLifeBalance: formData.workLifeBalance,
      careerGrowth: formData.careerGrowth,
      managementSupport: formData.managementSupport,
      compensationBenefits: formData.compensationBenefits,
      comments: formData.comments || 'Very satisfied with company processes and digital workspace tools.',
      isAnonymous: formData.isAnonymous,
      category: formData.category
    });

    setSubmittedSuccess(true);
    setFormData({
      overallRating: 5,
      workLifeBalance: 4,
      careerGrowth: 4,
      managementSupport: 5,
      compensationBenefits: 4,
      comments: '',
      isAnonymous: false,
      category: 'Workplace Environment'
    });
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  const StarRatingSelector = ({
    value,
    onChange,
    label
  }: {
    value: number;
    onChange: (val: number) => void;
    label: string;
  }) => {
    return (
      <div className="flex items-center justify-between py-1.5 border-b border-[#212833] last:border-0">
        <span className="text-xs text-[#98A2B3]">{label}</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className="p-1 hover:scale-110 transition-transform cursor-pointer"
            >
              <Star
                className={`w-4 h-4 ${
                  star <= value
                    ? 'fill-[#D4AF37] text-[#D4AF37]'
                    : 'text-[#212833]'
                }`}
              />
            </button>
          ))}
          <span className="text-xs font-mono font-bold text-[#E8C96A] w-6 text-right">
            {value}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Title & Controls */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
            Organizational Health & Pulse
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
          Employee Engagement & Morale Analytics
        </h1>
        <p className="text-xs text-[#98A2B3] mt-0.5">
          Two-way sentiment surveys evaluating culture, psychological safety, and leadership trust.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#98A2B3]">Overall Satisfaction</span>
            <Smile className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-1">
            {avgOverall} <span className="text-xs font-normal text-[#98A2B3]">/ 5.0</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Excellent Net Promoter (eNPS +52)
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#98A2B3]">Work-Life Balance</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-1">
            {avgWLB} <span className="text-xs font-normal text-[#98A2B3]">/ 5.0</span>
          </div>
          <div className="text-[10px] text-[#98A2B3] mt-1 font-mono">
            Hybrid policy index
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#98A2B3]">Career Growth</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-1">
            {avgGrowth} <span className="text-xs font-normal text-[#98A2B3]">/ 5.0</span>
          </div>
          <div className="text-[10px] text-[#98A2B3] mt-1 font-mono">
            LMS training alignment
          </div>
        </div>

        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#98A2B3]">Management Trust</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-1">
            {avgSupport} <span className="text-xs font-normal text-[#98A2B3]">/ 5.0</span>
          </div>
          <div className="text-[10px] text-[#98A2B3] mt-1 font-mono">
            Leadership accessibility
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Submit Pulse Survey */}
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#212833]">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#E8C96A] border border-[#D4AF37]/30 flex items-center justify-center">
              <MessageSquareHeart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">Submit Pulse Survey</h3>
              <p className="text-[11px] text-[#98A2B3]">Feedback directly informs executive decisions</p>
            </div>
          </div>

          {submittedSuccess && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2 animate-in fade-in">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Feedback logged anonymously in enterprise vault.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Dimension Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
              >
                <option value="Workplace Environment">Workplace Environment</option>
                <option value="Leadership & Culture">Leadership & Culture</option>
                <option value="Tools & Processes">Tools & Processes</option>
                <option value="Career Growth">Career Growth</option>
              </select>
            </div>

            <div className="bg-[#11161D] p-3 rounded-lg border border-[#212833]">
              <StarRatingSelector
                label="Overall Satisfaction"
                value={formData.overallRating}
                onChange={v => setFormData({ ...formData, overallRating: v })}
              />
              <StarRatingSelector
                label="Work-Life Balance"
                value={formData.workLifeBalance}
                onChange={v => setFormData({ ...formData, workLifeBalance: v })}
              />
              <StarRatingSelector
                label="Career Growth"
                value={formData.careerGrowth}
                onChange={v => setFormData({ ...formData, careerGrowth: v })}
              />
              <StarRatingSelector
                label="Management Support"
                value={formData.managementSupport}
                onChange={v => setFormData({ ...formData, managementSupport: v })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Comments / Suggestions</label>
              <textarea
                rows={3}
                value={formData.comments}
                onChange={e => setFormData({ ...formData, comments: e.target.value })}
                placeholder="Share perspective on workflows or tools..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonCheck"
                checked={formData.isAnonymous}
                onChange={e => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="rounded accent-[#D4AF37] cursor-pointer"
              />
              <label htmlFor="anonCheck" className="text-xs text-[#98A2B3] cursor-pointer">
                Submit as Anonymous Feedback
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#D4AF37]/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Pulse Response</span>
            </button>
          </form>
        </div>

        {/* Right 2 Columns: Pillar Chart + Department Comparison + Feed */}
        <div className="lg:col-span-2 space-y-5">
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm">
              <h3 className="text-sm font-bold text-[#F5F7FA] mb-1">Satisfaction Dimensions</h3>
              <p className="text-xs text-[#98A2B3] mb-3">Overall score per pillar (1 to 5)</p>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pillarChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#212833" />
                    <XAxis dataKey="pillar" tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={{ stroke: '#212833' }} tickLine={false} />
                    <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#11161D',
                        border: '1px solid #212833',
                        borderRadius: '0.5rem',
                        fontSize: '12px',
                        color: '#F5F7FA'
                      }}
                    />
                    <Bar dataKey="score" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={24} name="Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm">
              <h3 className="text-sm font-bold text-[#F5F7FA] mb-1">Department Comparison</h3>
              <p className="text-xs text-[#98A2B3] mb-3">Average satisfaction by team</p>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#212833" />
                    <XAxis dataKey="department" tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={{ stroke: '#212833' }} tickLine={false} />
                    <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#11161D',
                        border: '1px solid #212833',
                        borderRadius: '0.5rem',
                        fontSize: '12px',
                        color: '#F5F7FA'
                      }}
                    />
                    <Bar dataKey="score" fill="#22C55E" radius={[4, 4, 0, 0]} barSize={20} name="Satisfaction" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Feedback Feed */}
          <div className="bg-[#151B23] rounded-xl border border-[#212833] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#212833]">
              <h3 className="text-sm font-bold text-[#F5F7FA]">Recent Employee Sentiment Entries</h3>
              <span className="text-xs font-mono text-[#D4AF37]">{feedbackList.length} Responses</span>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {feedbackList.map(item => (
                <div key={item.id} className="p-3 bg-[#11161D] rounded-xl border border-[#212833] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#F5F7FA]">
                        {item.isAnonymous ? 'Anonymous Employee' : item.employeeName}
                      </span>
                      <span className="text-[#98A2B3]">·</span>
                      <span className="text-[#98A2B3]">{item.department}</span>
                      <Badge variant="neutral">{item.category}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-[#D4AF37] font-mono font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      <span>{item.overallRating}.0</span>
                    </div>
                  </div>
                  <p className="text-[#98A2B3] italic leading-relaxed">
                    "{item.comments}"
                  </p>
                  <div className="text-[10px] text-[#98A2B3] font-mono text-right">
                    Logged on {item.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
