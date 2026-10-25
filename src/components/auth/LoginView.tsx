import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { UserRole } from '../../types/hr';
import {
  ShieldCheck,
  Briefcase,
  User,
  ArrowRight,
  Lock,
  Mail,
  Sparkles,
  Building2,
  Check
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export const LoginView: React.FC = () => {
  const { login } = useHR();
  const [selectedRole, setSelectedRole] = useState<UserRole>('Admin');
  const [email, setEmail] = useState('arvind.admin@smarthr.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'Admin') setEmail('arvind.admin@smarthr.edu');
    else if (role === 'HR Manager') setEmail('priya.hr@smarthr.edu');
    else setEmail('karthik.r@smarthr.edu');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F5F7FA] flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Subtle abstract geometric background grid & gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#212833_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="max-w-md w-full bg-[#151B23] rounded-2xl border border-[#212833] shadow-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Banner */}
        <div className="p-8 text-center pb-6 border-b border-[#212833] bg-[#11161D]/70">
          <BrandLogo className="justify-center" />
          <p className="text-xs text-[#98A2B3] mt-1 font-mono uppercase tracking-widest">
            Enterprise Workforce Platform
          </p>
          <div className="text-[11px] text-[#E8C96A] mt-2 font-mono flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>Principles of Management Mini Project</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Quick Perspective Role Presets */}
          <div>
            <span className="block text-[11px] font-mono text-[#98A2B3] uppercase tracking-wider mb-2">
              Select Demo Perspective:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: 'Admin', desc: 'Full Access', icon: ShieldCheck },
                { role: 'HR Manager', desc: 'Operations', icon: Briefcase },
                { role: 'Employee', desc: 'Self-Service', icon: User }
              ].map(item => {
                const Icon = item.icon;
                const isSelected = selectedRole === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleRoleSelect(item.role as UserRole)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#11161D] border-[#D4AF37] ring-1 ring-[#D4AF37]/40 shadow-sm'
                        : 'bg-[#11161D]/50 border-[#212833] hover:border-[#2E3846]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mx-auto mb-1 ${isSelected ? 'text-[#D4AF37]' : 'text-[#98A2B3]'}`} />
                    <div className="text-xs font-bold text-[#F5F7FA]">{item.role}</div>
                    <div className="text-[9px] text-[#98A2B3] font-mono">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1.5">
                Corporate Credentials Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#98A2B3] absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1.5">
                Authentication Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#98A2B3] absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-[#98A2B3] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded accent-[#D4AF37] cursor-pointer"
                />
                <span>Remember session</span>
              </label>

              <a
                href="#forgot"
                onClick={e => {
                  e.preventDefault();
                  alert('Demo Mode: Session credentials automatically provisioned.');
                }}
                className="text-[11px] text-[#D4AF37] hover:text-[#E8C96A] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-bold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#D4AF37]/20 mt-2"
            >
              <span>Authenticate as {selectedRole}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#212833] text-center text-[10px] text-[#98A2B3] font-mono">
            Topic: Impact of Technology on Human Resource Management
          </div>
        </div>
      </div>
    </div>
  );
};
