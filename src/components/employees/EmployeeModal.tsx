import React, { useState, useEffect } from 'react';
import { Employee, EmploymentStatus } from '../../types/hr';
import { X, UserPlus, Save } from 'lucide-react';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employeeData: Omit<Employee, 'id'>) => void;
  editingEmployee?: Employee | null;
}

const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Product Design',
  'Marketing',
  'Finance',
  'Operations',
  'Executive Management'
];

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingEmployee
}) => {
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    employeeId: '',
    name: '',
    email: '',
    phone: '',
    department: 'Engineering',
    designation: '',
    joiningDate: new Date().toISOString().split('T')[0],
    employmentStatus: 'Active',
    location: 'Chennai HQ',
    salary: 1200000,
    skills: ['TypeScript', 'Management'],
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    leaveBalances: {
      casual: { used: 0, total: 12 },
      sick: { used: 0, total: 10 },
      annual: { used: 0, total: 18 }
    },
    avatarColor: 'bg-[#D4AF37]'
  });

  const [skillsInput, setSkillsInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        employeeId: editingEmployee.employeeId,
        name: editingEmployee.name,
        email: editingEmployee.email,
        phone: editingEmployee.phone,
        department: editingEmployee.department,
        designation: editingEmployee.designation,
        joiningDate: editingEmployee.joiningDate,
        employmentStatus: editingEmployee.employmentStatus,
        location: editingEmployee.location,
        salary: editingEmployee.salary,
        skills: editingEmployee.skills,
        emergencyContact: editingEmployee.emergencyContact,
        leaveBalances: editingEmployee.leaveBalances,
        avatarColor: editingEmployee.avatarColor
      });
      setSkillsInput(editingEmployee.skills.join(', '));
    } else {
      const randomNum = Math.floor(100 + Math.random() * 900);
      setFormData({
        employeeId: `EMP0${randomNum}`,
        name: '',
        email: '',
        phone: '',
        department: 'Engineering',
        designation: '',
        joiningDate: new Date().toISOString().split('T')[0],
        employmentStatus: 'Active',
        location: 'Chennai HQ',
        salary: 1200000,
        skills: ['Enterprise HRM', 'Leadership'],
        emergencyContact: {
          name: '',
          relationship: '',
          phone: ''
        },
        leaveBalances: {
          casual: { used: 0, total: 12 },
          sick: { used: 0, total: 10 },
          annual: { used: 0, total: 18 }
        },
        avatarColor: 'bg-[#D4AF37]'
      });
      setSkillsInput('Enterprise HRM, Leadership');
    }
    setErrors({});
  }, [editingEmployee, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.employeeId.trim()) errs.employeeId = 'Employee ID is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid corporate email required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.designation.trim()) errs.designation = 'Designation is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedSkills = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    onSave({
      ...formData,
      skills: parsedSkills.length > 0 ? parsedSkills : ['Strategic Leadership']
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#151B23] rounded-xl border border-[#212833] shadow-2xl max-w-2xl w-full my-8 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#212833] flex items-center justify-between bg-[#11161D]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 text-[#E8C96A] border border-[#D4AF37]/30 flex items-center justify-center">
              {editingEmployee ? <Save className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">
                {editingEmployee ? 'Edit Personnel Record' : 'Onboard New Employee'}
              </h3>
              <p className="text-[11px] text-[#98A2B3]">
                Centralized HR Master Data Directory
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#98A2B3] hover:text-[#F5F7FA] p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Full Legal Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Anand Mahindra"
                className={`w-full px-3 py-2 text-xs rounded-lg border bg-[#11161D] text-[#F5F7FA] placeholder-[#98A2B3] ${
                  errors.name ? 'border-rose-500' : 'border-[#212833]'
                } focus:outline-none focus:border-[#D4AF37]`}
              />
              {errors.name && <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.name}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Employee Identifier *
              </label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
                placeholder="e.g. EMP009"
                className={`w-full px-3 py-2 text-xs rounded-lg border bg-[#11161D] text-[#F5F7FA] font-mono placeholder-[#98A2B3] ${
                  errors.employeeId ? 'border-rose-500' : 'border-[#212833]'
                } focus:outline-none focus:border-[#D4AF37]`}
              />
              {errors.employeeId && <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.employeeId}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Corporate Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="anand@smarthr.edu"
                className={`w-full px-3 py-2 text-xs rounded-lg border bg-[#11161D] text-[#F5F7FA] placeholder-[#98A2B3] ${
                  errors.email ? 'border-rose-500' : 'border-[#212833]'
                } focus:outline-none focus:border-[#D4AF37]`}
              />
              {errors.email && <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.email}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98401 00000"
                className={`w-full px-3 py-2 text-xs rounded-lg border bg-[#11161D] text-[#F5F7FA] font-mono placeholder-[#98A2B3] ${
                  errors.phone ? 'border-rose-500' : 'border-[#212833]'
                } focus:outline-none focus:border-[#D4AF37]`}
              />
              {errors.phone && <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.phone}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Department *
              </label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37]"
              >
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Designation *
              </label>
              <input
                type="text"
                value={formData.designation}
                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                placeholder="e.g. Principal Engineering Architect"
                className={`w-full px-3 py-2 text-xs rounded-lg border bg-[#11161D] text-[#F5F7FA] placeholder-[#98A2B3] ${
                  errors.designation ? 'border-rose-500' : 'border-[#212833]'
                } focus:outline-none focus:border-[#D4AF37]`}
              />
              {errors.designation && <span className="text-[10px] text-rose-400 mt-0.5 block">{errors.designation}</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Joining Date
              </label>
              <input
                type="date"
                value={formData.joiningDate}
                onChange={e => setFormData({ ...formData, joiningDate: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Employment Status
              </label>
              <select
                value={formData.employmentStatus}
                onChange={e => setFormData({ ...formData, employmentStatus: e.target.value as EmploymentStatus })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Active">Active</option>
                <option value="Probation">Probation</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Branch Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Chennai HQ / Bangalore / Hybrid"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                Annual CTC (₹ INR)
              </label>
              <input
                type="number"
                value={formData.salary}
                onChange={e => setFormData({ ...formData, salary: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
              Skills & Competencies (comma separated)
            </label>
            <input
              type="text"
              value={skillsInput}
              onChange={e => setSkillsInput(e.target.value)}
              placeholder="e.g. React 19, TypeScript, Leadership, System Design"
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Emergency Contact */}
          <div className="pt-3 border-t border-[#212833]">
            <h4 className="text-xs font-semibold text-[#F5F7FA] mb-2">Emergency Contact</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Contact Name"
                value={formData.emergencyContact.name}
                onChange={e =>
                  setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, name: e.target.value }
                  })
                }
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
              />
              <input
                type="text"
                placeholder="Relationship (e.g. Spouse/Parent)"
                value={formData.emergencyContact.relationship}
                onChange={e =>
                  setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, relationship: e.target.value }
                  })
                }
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA]"
              />
              <input
                type="text"
                placeholder="Emergency Phone"
                value={formData.emergencyContact.phone}
                onChange={e =>
                  setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
                  })
                }
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] font-mono"
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-[#212833] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#F5F7FA] bg-[#11161D] border border-[#212833] rounded-lg hover:bg-[#1A222C] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              {editingEmployee ? 'Update Personnel' : 'Save Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
