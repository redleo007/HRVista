export type UserRole = 'Admin' | 'HR Manager' | 'Employee';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  employeeId: string;
  department: string;
  designation: string;
  avatarBg: string;
}

export type EmploymentStatus = 'Active' | 'On Leave' | 'Probation' | 'Terminated';

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  employmentStatus: EmploymentStatus;
  location: string;
  salary: number;
  skills: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  leaveBalances: {
    casual: { used: number; total: number };
    sick: { used: number; total: number };
    annual: { used: number; total: number };
  };
  avatarColor: string;
}

export type ApplicationStatus = 'Applied' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Remote';
  experienceLevel: string;
  openings: number;
  status: 'Open' | 'Closed';
  postedDate: string;
  description: string;
  requirements: string[];
  salaryRange: string;
}

export interface JobApplicant {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  appliedDate: string;
  experienceYears: number;
  education: string;
  status: ApplicationStatus;
  resumeSummary: string;
  skills: string[];
  rating: number; // 1-5
  notes?: string;
}

export type AttendanceStatus = 'Present' | 'Late' | 'Half-Day' | 'Absent';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string; // YYYY-MM-DD
  checkIn: string; // HH:MM AM/PM
  checkOut?: string;
  workHours?: number; // decimal e.g. 8.5
  status: AttendanceStatus;
  method: 'Biometric RFID' | 'Web Portal' | 'Mobile GPS' | 'Manual HR Punch';
}

export type LeaveType = 'Casual Leave' | 'Sick Leave' | 'Annual Leave' | 'Maternity/Paternity' | 'Unpaid Leave';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  appliedDate: string;
  status: LeaveStatus;
  reviewedBy?: string;
  reviewDate?: string;
  reviewComment?: string;
}

export interface PerformanceGoal {
  id: string;
  title: string;
  description: string;
  targetMetric: string;
  progress: number; // 0 - 100
  weight: number; // percentage out of 100
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
  reviewPeriod: string; // e.g., 'Q3 2026'
  goals: PerformanceGoal[];
  selfAppraisal: {
    achievements: string;
    challenges: string;
    selfRating: number; // 1-5
    submittedDate: string;
  };
  managerEvaluation: {
    evaluatorName: string;
    strengths: string;
    areasOfImprovement: string;
    managerRating: number; // 1-5
    evaluatedDate?: string;
  };
  finalScore: number; // Calculated 1.0 - 5.0
  status: 'Pending Self-Appraisal' | 'Pending Manager Review' | 'Completed';
}

export interface TrainingProgram {
  id: string;
  title: string;
  category: 'Technical Skills' | 'Leadership' | 'Compliance & Safety' | 'Productivity';
  trainer: string;
  format: 'Virtual (Online)' | 'In-Person Workshop' | 'Hybrid';
  department: string;
  startDate: string;
  endDate: string;
  durationHours: number;
  capacity: number;
  enrolledEmployeeIds: string[];
  completedEmployeeIds: string[];
  description: string;
  status: 'Upcoming' | 'In Progress' | 'Completed';
  digitalBadgeUrl?: string;
}

export interface FeedbackSubmission {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  overallRating: number; // 1-5
  workLifeBalance: number; // 1-5
  careerGrowth: number; // 1-5
  managementSupport: number; // 1-5
  compensationBenefits: number; // 1-5
  comments: string;
  isAnonymous: boolean;
  category: 'Workplace Environment' | 'Leadership & Culture' | 'Tools & Processes' | 'Career Growth';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'leave' | 'appraisal' | 'training' | 'recruitment' | 'attendance';
  timestamp: string;
  read: boolean;
  targetRole?: UserRole | 'All';
  actionRoute?: string;
}
