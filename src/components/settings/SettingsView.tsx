import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { Badge } from '../common/Badge';
import {
  Building2,
  Users,
  Shield,
  Bell,
  Palette,
  Lock,
  Save,
  CheckCircle2,
  KeyRound,
  Check
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { currentRole } = useHR();

  const [activeTab, setActiveTab] = useState<
    'organization' | 'roles' | 'notifications' | 'security' | 'appearance'
  >('organization');

  const [orgData, setOrgData] = useState({
    name: 'Apex Global Technologies Ltd.',
    code: 'APEX-ENT-902',
    domain: 'apextech.corp',
    timezone: 'Asia/Kolkata (IST +5:30)',
    address: 'DLF CyberCity, IT Corridor, Chennai, TN 600089',
    currency: 'INR (₹)'
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Title & Controls */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
            Enterprise Governance
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
          Platform Configuration & Settings
        </h1>
        <p className="text-xs text-[#98A2B3] mt-0.5">
          Role-based permissions, organization profile, and compliance security settings.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#212833] pb-2">
        {[
          { id: 'organization', label: 'Organization Profile', icon: Building2 },
          { id: 'roles', label: 'Role Permissions & Access', icon: Shield },
          { id: 'notifications', label: 'Notification Protocols', icon: Bell },
          { id: 'security', label: 'Security & Audit Logs', icon: Lock },
          { id: 'appearance', label: 'Appearance & Themes', icon: Palette }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#151B23] text-[#E8C96A] border border-[#D4AF37]/30'
                  : 'text-[#98A2B3] hover:text-[#F5F7FA]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ORGANIZATION PROFILE */}
      {activeTab === 'organization' && (
        <form onSubmit={handleSave} className="bg-[#151B23] rounded-xl border border-[#212833] p-6 shadow-sm space-y-4 max-w-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#212833]">
            <h3 className="text-sm font-bold text-[#F5F7FA]">Corporate Entity Profile</h3>
            {saveSuccess && (
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved Successfully
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Company Legal Name</label>
              <input
                type="text"
                value={orgData.name}
                onChange={e => setOrgData({ ...orgData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Entity Enterprise Code</label>
              <input
                type="text"
                value={orgData.code}
                onChange={e => setOrgData({ ...orgData, code: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Authorized Domain</label>
              <input
                type="text"
                value={orgData.domain}
                onChange={e => setOrgData({ ...orgData, domain: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">Operating Timezone</label>
              <input
                type="text"
                value={orgData.timezone}
                onChange={e => setOrgData({ ...orgData, timezone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">HQ Address</label>
            <input
              type="text"
              value={orgData.address}
              onChange={e => setOrgData({ ...orgData, address: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
            />
          </div>

          <div className="pt-3 border-t border-[#212833] flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Save Organization Settings
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: ROLE PERMISSIONS */}
      {activeTab === 'roles' && (
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-6 shadow-sm space-y-4">
          <div className="pb-3 border-b border-[#212833]">
            <h3 className="text-sm font-bold text-[#F5F7FA]">Role-Based Access Control (RBAC) Matrix</h3>
            <p className="text-xs text-[#98A2B3]">Privilege boundaries enforced by NEXORA security engine</p>
          </div>

          <div className="space-y-3">
            {[
              {
                role: 'Admin',
                description: 'Full organizational authority, employee deletion, system reset, and executive analytics.',
                badge: 'gold',
                privileges: ['Master Data CRUD', 'Direct Leave Override', 'Executive Telemetry', 'Audit Purge']
              },
              {
                role: 'HR Manager',
                description: 'Talent recruitment, candidate pipeline staging, leave approvals, and employee evaluations.',
                badge: 'info',
                privileges: ['Recruitment Operations', 'Leave Approvals', 'Appraisal Reviews', 'Attendance Editing']
              },
              {
                role: 'Employee',
                description: 'Personal self-service, digital clock check-in, leave application, and self-appraisal submissions.',
                badge: 'success',
                privileges: ['Digital Punch Clock', 'Submit Leave Request', 'Fill Self-Appraisal', 'View Directory']
              }
            ].map(r => (
              <div key={r.role} className="p-4 bg-[#11161D] rounded-xl border border-[#212833] flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#F5F7FA] text-sm">{r.role}</h4>
                    <Badge variant={r.badge as any}>{r.role}</Badge>
                  </div>
                  <p className="text-xs text-[#98A2B3] mt-1">{r.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {r.privileges.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono text-[#F5F7FA] bg-[#151B23] border border-[#212833]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-6 shadow-sm space-y-4 max-w-xl">
          <div className="pb-3 border-b border-[#212833]">
            <h3 className="text-sm font-bold text-[#F5F7FA]">Event Triggers & Alerts</h3>
            <p className="text-xs text-[#98A2B3]">Automated push notifications for key workflow events</p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Leave Application Pending HR Review', state: true },
              { label: 'Candidate Shortlisted in ATS Pipeline', state: true },
              { label: 'Performance Review Self-Appraisal Submitted', state: true },
              { label: 'Upcoming LMS Cohort Reminder (24h before)', state: true },
              { label: 'Biometric Discrepancy Alerts', state: false }
            ].map((n, i) => (
              <div key={i} className="p-3 bg-[#11161D] rounded-lg border border-[#212833] flex items-center justify-between text-xs">
                <span className="text-[#F5F7FA]">{n.label}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SECURITY */}
      {activeTab === 'security' && (
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-6 shadow-sm space-y-4 max-w-xl">
          <div className="pb-3 border-b border-[#212833]">
            <h3 className="text-sm font-bold text-[#F5F7FA]">Enterprise Security Protocols</h3>
            <p className="text-xs text-[#98A2B3]">Bank-grade identity and data safeguarding</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-[#11161D] rounded-xl border border-[#212833] flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#F5F7FA]">Two-Factor Authentication (2FA)</span>
                <p className="text-[11px] text-[#98A2B3]">Hardware token or TOTP authenticator app</p>
              </div>
              <Badge variant="success">Enforced</Badge>
            </div>

            <div className="p-3.5 bg-[#11161D] rounded-xl border border-[#212833] flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#F5F7FA]">Data Encryption at Rest</span>
                <p className="text-[11px] text-[#98A2B3]">AES-256 GCM master key encryption</p>
              </div>
              <Badge variant="gold">Active</Badge>
            </div>

            <div className="p-3.5 bg-[#11161D] rounded-xl border border-[#212833] flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#F5F7FA]">Audit Trail Retention</span>
                <p className="text-[11px] text-[#98A2B3]">Immutable activity logging for compliance</p>
              </div>
              <Badge variant="info">7 Years</Badge>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: APPEARANCE */}
      {activeTab === 'appearance' && (
        <div className="bg-[#151B23] rounded-xl border border-[#212833] p-6 shadow-sm space-y-4 max-w-xl">
          <div className="pb-3 border-b border-[#212833]">
            <h3 className="text-sm font-bold text-[#F5F7FA]">Design Theme & Appearance</h3>
            <p className="text-xs text-[#98A2B3]">Corporate luxury palette configuration</p>
          </div>

          <div className="p-4 bg-[#11161D] rounded-xl border border-[#D4AF37]/30 flex items-center justify-between">
            <div>
              <div className="font-bold text-[#F5F7FA] text-xs">Executive Dark Luxury (Default)</div>
              <div className="text-[11px] text-[#98A2B3]">#0B0F14 obsidian background with #D4AF37 gold accent</div>
            </div>
            <span className="w-3 h-3 rounded-full bg-[#D4AF37]" />
          </div>
        </div>
      )}
    </div>
  );
};
