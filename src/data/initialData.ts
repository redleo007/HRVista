import {
  Employee,
  JobOpening,
  JobApplicant,
  AttendanceRecord,
  LeaveRequest,
  PerformanceReview,
  TrainingProgram,
  FeedbackSubmission,
  NotificationItem,
  UserProfile
} from '../types/hr';

export const INITIAL_USERS: Record<string, UserProfile> = {
  Admin: {
    id: 'u-admin',
    name: 'Dr. Arvind Sundaram',
    email: 'arvind.admin@smarthr.edu',
    role: 'Admin',
    employeeId: 'EMP001',
    department: 'Executive Management',
    designation: 'Director of People & Operations',
    avatarBg: 'bg-indigo-600'
  },
  'HR Manager': {
    id: 'u-hrmanager',
    name: 'Priya Natarajan',
    email: 'priya.hr@smarthr.edu',
    role: 'HR Manager',
    employeeId: 'EMP002',
    department: 'Human Resources',
    designation: 'Senior Talent & Operations Manager',
    avatarBg: 'bg-violet-600'
  },
  Employee: {
    id: 'u-employee',
    name: 'Karthik Ramanathan',
    email: 'karthik.r@smarthr.edu',
    role: 'Employee',
    employeeId: 'EMP003',
    department: 'Engineering',
    designation: 'Lead Software Engineer',
    avatarBg: 'bg-emerald-600'
  }
};

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    employeeId: 'EMP001',
    name: 'Dr. Arvind Sundaram',
    email: 'arvind.admin@smarthr.edu',
    phone: '+91 98401 23456',
    department: 'Executive Management',
    designation: 'Director of People & Operations',
    joiningDate: '2019-06-15',
    employmentStatus: 'Active',
    location: 'Chennai HQ',
    salary: 2400000,
    skills: ['Strategic HRM', 'Organizational Leadership', 'Talent Analytics', 'Workforce Planning'],
    emergencyContact: {
      name: 'Revathi Sundaram',
      relationship: 'Spouse',
      phone: '+91 98401 98765'
    },
    leaveBalances: {
      casual: { used: 3, total: 12 },
      sick: { used: 2, total: 10 },
      annual: { used: 5, total: 18 }
    },
    avatarColor: 'bg-indigo-600'
  },
  {
    id: 'emp-2',
    employeeId: 'EMP002',
    name: 'Priya Natarajan',
    email: 'priya.hr@smarthr.edu',
    phone: '+91 97910 87654',
    department: 'Human Resources',
    designation: 'Senior Talent & Operations Manager',
    joiningDate: '2021-03-10',
    employmentStatus: 'Active',
    location: 'Chennai HQ',
    salary: 1650000,
    skills: ['HR Information Systems', 'Employee Relations', 'Recruitment Pipelines', 'Policy Design'],
    emergencyContact: {
      name: 'Natarajan S.',
      relationship: 'Father',
      phone: '+91 97910 11223'
    },
    leaveBalances: {
      casual: { used: 4, total: 12 },
      sick: { used: 1, total: 10 },
      annual: { used: 7, total: 18 }
    },
    avatarColor: 'bg-violet-600'
  },
  {
    id: 'emp-3',
    employeeId: 'EMP003',
    name: 'Karthik Ramanathan',
    email: 'karthik.r@smarthr.edu',
    phone: '+91 94440 33445',
    department: 'Engineering',
    designation: 'Lead Software Engineer',
    joiningDate: '2022-01-17',
    employmentStatus: 'Active',
    location: 'Bangalore Tech Center',
    salary: 1950000,
    skills: ['React', 'TypeScript', 'Node.js', 'System Architecture', 'CI/CD'],
    emergencyContact: {
      name: 'Ananya Ramanathan',
      relationship: 'Spouse',
      phone: '+91 94440 99887'
    },
    leaveBalances: {
      casual: { used: 2, total: 12 },
      sick: { used: 0, total: 10 },
      annual: { used: 4, total: 18 }
    },
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 'emp-4',
    employeeId: 'EMP004',
    name: 'Sneha Balasubramanian',
    email: 'sneha.b@smarthr.edu',
    phone: '+91 98840 55667',
    department: 'Product Design',
    designation: 'Principal UX/UI Specialist',
    joiningDate: '2022-08-01',
    employmentStatus: 'Active',
    location: 'Chennai HQ',
    salary: 1550000,
    skills: ['Design Systems', 'Figma', 'User Research', 'Accessibility (WCAG)', 'Prototyping'],
    emergencyContact: {
      name: 'R. Balasubramanian',
      relationship: 'Father',
      phone: '+91 98840 11223'
    },
    leaveBalances: {
      casual: { used: 5, total: 12 },
      sick: { used: 3, total: 10 },
      annual: { used: 8, total: 18 }
    },
    avatarColor: 'bg-amber-600'
  },
  {
    id: 'emp-5',
    employeeId: 'EMP005',
    name: 'Vikramaditya Rao',
    email: 'vikram.rao@smarthr.edu',
    phone: '+91 97120 44556',
    department: 'Engineering',
    designation: 'DevOps & Cloud Engineer',
    joiningDate: '2023-04-12',
    employmentStatus: 'On Leave',
    location: 'Bangalore Tech Center',
    salary: 1400000,
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'Monitoring & Grafana'],
    emergencyContact: {
      name: 'Meera Rao',
      relationship: 'Mother',
      phone: '+91 97120 77889'
    },
    leaveBalances: {
      casual: { used: 6, total: 12 },
      sick: { used: 5, total: 10 },
      annual: { used: 12, total: 18 }
    },
    avatarColor: 'bg-blue-600'
  },
  {
    id: 'emp-6',
    employeeId: 'EMP006',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@smarthr.edu',
    phone: '+91 98230 66778',
    department: 'Marketing',
    designation: 'Brand & Growth Strategist',
    joiningDate: '2023-09-05',
    employmentStatus: 'Active',
    location: 'Mumbai Branch',
    salary: 1250000,
    skills: ['Content Strategy', 'SEO/SEM', 'Product Positioning', 'Campaign Analytics'],
    emergencyContact: {
      name: 'Sanjay Deshmukh',
      relationship: 'Brother',
      phone: '+91 98230 99001'
    },
    leaveBalances: {
      casual: { used: 1, total: 12 },
      sick: { used: 1, total: 10 },
      annual: { used: 2, total: 18 }
    },
    avatarColor: 'bg-rose-600'
  },
  {
    id: 'emp-7',
    employeeId: 'EMP007',
    name: 'Rahul Venugopal',
    email: 'rahul.v@smarthr.edu',
    phone: '+91 96550 11223',
    department: 'Finance',
    designation: 'Senior Financial Analyst',
    joiningDate: '2024-02-14',
    employmentStatus: 'Probation',
    location: 'Chennai HQ',
    salary: 1100000,
    skills: ['Corporate Budgeting', 'ERP Finance', 'Taxation Compliance', 'Payroll Audit'],
    emergencyContact: {
      name: 'K. Venugopal',
      relationship: 'Father',
      phone: '+91 96550 44556'
    },
    leaveBalances: {
      casual: { used: 1, total: 6 },
      sick: { used: 0, total: 5 },
      annual: { used: 0, total: 9 }
    },
    avatarColor: 'bg-teal-600'
  },
  {
    id: 'emp-8',
    employeeId: 'EMP008',
    name: 'Divya Krishnan',
    email: 'divya.k@smarthr.edu',
    phone: '+91 99401 77889',
    department: 'Operations',
    designation: 'Logistics & Supply Coordinator',
    joiningDate: '2023-11-20',
    employmentStatus: 'Active',
    location: 'Chennai HQ',
    salary: 980000,
    skills: ['Vendor Management', 'Procurement', 'Inventory Optimization', 'SLA Tracking'],
    emergencyContact: {
      name: 'S. Krishnan',
      relationship: 'Spouse',
      phone: '+91 99401 33221'
    },
    leaveBalances: {
      casual: { used: 3, total: 12 },
      sick: { used: 2, total: 10 },
      annual: { used: 3, total: 18 }
    },
    avatarColor: 'bg-cyan-600'
  }
];

export const INITIAL_JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Architect',
    department: 'Engineering',
    location: 'Bangalore / Hybrid',
    type: 'Full-Time',
    experienceLevel: '5-8 Years',
    openings: 2,
    status: 'Open',
    postedDate: '2026-09-15',
    description: 'Lead web platform architecture, develop high-performance enterprise UI components, and mentor engineering teams.',
    requirements: ['Expert React & TypeScript knowledge', 'Experience with Design Systems', 'Web performance & accessibility standards', 'Modern CI/CD pipelines'],
    salaryRange: '₹22,00,000 - ₹28,00,000 PA'
  },
  {
    id: 'job-2',
    title: 'Talent Acquisition Partner',
    department: 'Human Resources',
    location: 'Chennai HQ',
    type: 'Full-Time',
    experienceLevel: '3-5 Years',
    openings: 1,
    status: 'Open',
    postedDate: '2026-09-20',
    description: 'Drive end-to-end recruitment for high-tech engineering and product management roles through modern ATS and AI screening platforms.',
    requirements: ['Proven technical recruiting track record', 'Hands-on ATS & LinkedIn Recruiter mastery', 'Structured competency-based interview skills'],
    salaryRange: '₹10,00,000 - ₹14,00,000 PA'
  },
  {
    id: 'job-3',
    title: 'Cloud Security Engineer',
    department: 'Engineering',
    location: 'Bangalore / Remote',
    type: 'Full-Time',
    experienceLevel: '4-6 Years',
    openings: 2,
    status: 'Open',
    postedDate: '2026-10-01',
    description: 'Implement zero-trust security postures, cloud auditing, vulnerability assessments, and automated compliance pipelines.',
    requirements: ['AWS / GCP Security Certification', 'Infrastructure as Code (Terraform)', 'Container security & DevSecOps'],
    salaryRange: '₹18,00,000 - ₹24,00,000 PA'
  },
  {
    id: 'job-4',
    title: 'HR Operations Associate',
    department: 'Human Resources',
    location: 'Chennai HQ',
    type: 'Full-Time',
    experienceLevel: '1-3 Years',
    openings: 1,
    status: 'Open',
    postedDate: '2026-09-28',
    description: 'Support employee onboarding, benefits administration, HRIS database updates, and digital employee engagement initiatives.',
    requirements: ['BBA/MBA in HR or related discipline', 'Strong analytical & communication skills', 'Familiarity with digital attendance and leave workflows'],
    salaryRange: '₹6,00,000 - ₹8,50,000 PA'
  }
];

export const INITIAL_APPLICANTS: JobApplicant[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Frontend Architect',
    name: 'Siddharth Iyer',
    email: 'siddharth.iyer@gmail.com',
    phone: '+91 98410 77112',
    appliedDate: '2026-09-25',
    experienceYears: 6.5,
    education: 'B.Tech Computer Science, Anna University',
    status: 'Interview',
    resumeSummary: '6.5 years architecting enterprise React applications, micro-frontends, WebSockets real-time dashboards, and reusable UI libraries.',
    skills: ['React 19', 'TypeScript', 'Next.js', 'State Architectures', 'Performance Auditing'],
    rating: 5,
    notes: 'Completed technical coding round with high marks; scheduled for Cultural & Architecture round on Friday.'
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    jobTitle: 'Senior Frontend Architect',
    name: 'Meenakshi Chandran',
    email: 'meenakshi.c@outlook.com',
    phone: '+91 97908 44332',
    appliedDate: '2026-09-28',
    experienceYears: 5.0,
    education: 'M.Sc Software Systems, PSG Tech',
    status: 'Shortlisted',
    resumeSummary: 'Expertise in modern frontend tooling, responsive design patterns, and automated end-to-end testing with Playwright.',
    skills: ['TypeScript', 'Vue.js', 'React', 'Jest', 'Tailwind CSS'],
    rating: 4,
    notes: 'Screened by HR. Resume shortlisted by hiring manager.'
  },
  {
    id: 'app-3',
    jobId: 'job-2',
    jobTitle: 'Talent Acquisition Partner',
    name: 'Harish Raghavan',
    email: 'harish.raghavan@yahoo.com',
    phone: '+91 99620 11998',
    appliedDate: '2026-10-02',
    experienceYears: 4.2,
    education: 'MBA Human Resource Management, Loyola College',
    status: 'Selected',
    resumeSummary: 'Experienced technical recruiter having closed 75+ engineering hires in SaaS unicorn. Proficient in digital sourcing and employer branding.',
    skills: ['Talent Sourcing', 'ATS Mastery', 'Offer Negotiation', 'Candidate Experience'],
    rating: 5,
    notes: 'Salary discussion completed. Formal offer letter generated.'
  },
  {
    id: 'app-4',
    jobId: 'job-3',
    jobTitle: 'Cloud Security Engineer',
    name: 'Rohan Gupta',
    email: 'rohan.gupta.dev@gmail.com',
    phone: '+91 98112 55443',
    appliedDate: '2026-10-04',
    experienceYears: 3.8,
    education: 'B.E Information Technology, Delhi Tech University',
    status: 'Applied',
    resumeSummary: 'Cloud engineer with hands-on AWS security groups, IAM policy enforcement, and automated vulnerability scanning pipelines.',
    skills: ['AWS IAM', 'Terraform', 'Kubernetes', 'SonarQube'],
    rating: 4,
    notes: 'Application received via online job portal; resume queued for initial screening.'
  },
  {
    id: 'app-5',
    jobId: 'job-4',
    jobTitle: 'HR Operations Associate',
    name: 'Swathi Nambiar',
    email: 'swathi.nambiar@gmail.com',
    phone: '+91 94471 22883',
    appliedDate: '2026-09-29',
    experienceYears: 2.0,
    education: 'B.Com & PG Diploma in HRM, Madras Christian College',
    status: 'Rejected',
    resumeSummary: 'Entry-level HR associate handling employee records and documentation in traditional manufacturing setup.',
    skills: ['HR Documentation', 'MS Excel', 'Statutory Compliance'],
    rating: 2,
    notes: 'Candidate lacked requested digital HRIS platform exposure; politely notified via automated rejection email.'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    employeeId: 'EMP001',
    employeeName: 'Dr. Arvind Sundaram',
    department: 'Executive Management',
    date: '2026-10-07',
    checkIn: '08:45 AM',
    checkOut: '05:30 PM',
    workHours: 8.75,
    status: 'Present',
    method: 'Biometric RFID'
  },
  {
    id: 'att-2',
    employeeId: 'EMP002',
    employeeName: 'Priya Natarajan',
    department: 'Human Resources',
    date: '2026-10-07',
    checkIn: '08:55 AM',
    checkOut: '05:40 PM',
    workHours: 8.75,
    status: 'Present',
    method: 'Web Portal'
  },
  {
    id: 'att-3',
    employeeId: 'EMP003',
    employeeName: 'Karthik Ramanathan',
    department: 'Engineering',
    date: '2026-10-07',
    checkIn: '09:05 AM',
    checkOut: undefined,
    workHours: 8.0,
    status: 'Present',
    method: 'Web Portal'
  },
  {
    id: 'att-4',
    employeeId: 'EMP004',
    employeeName: 'Sneha Balasubramanian',
    department: 'Product Design',
    date: '2026-10-07',
    checkIn: '09:15 AM',
    checkOut: '05:45 PM',
    workHours: 8.5,
    status: 'Late',
    method: 'Mobile GPS'
  },
  {
    id: 'att-5',
    employeeId: 'EMP005',
    employeeName: 'Vikramaditya Rao',
    department: 'Engineering',
    date: '2026-10-07',
    checkIn: '—',
    checkOut: undefined,
    workHours: 0,
    status: 'Absent',
    method: 'Manual HR Punch'
  },
  {
    id: 'att-6',
    employeeId: 'EMP006',
    employeeName: 'Ananya Deshmukh',
    department: 'Marketing',
    date: '2026-10-07',
    checkIn: '08:50 AM',
    checkOut: '05:15 PM',
    workHours: 8.4,
    status: 'Present',
    method: 'Web Portal'
  },
  {
    id: 'att-7',
    employeeId: 'EMP007',
    employeeName: 'Rahul Venugopal',
    department: 'Finance',
    date: '2026-10-07',
    checkIn: '09:00 AM',
    checkOut: '01:30 PM',
    workHours: 4.5,
    status: 'Half-Day',
    method: 'Biometric RFID'
  },
  {
    id: 'att-8',
    employeeId: 'EMP008',
    employeeName: 'Divya Krishnan',
    department: 'Operations',
    date: '2026-10-07',
    checkIn: '08:40 AM',
    checkOut: '05:10 PM',
    workHours: 8.5,
    status: 'Present',
    method: 'Biometric RFID'
  }
];

export const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: 'leave-1',
    employeeId: 'EMP005',
    employeeName: 'Vikramaditya Rao',
    department: 'Engineering',
    leaveType: 'Sick Leave',
    startDate: '2026-10-06',
    endDate: '2026-10-08',
    totalDays: 3,
    reason: 'Severe viral fever and doctor advised 3 days complete bed rest.',
    appliedDate: '2026-10-05',
    status: 'Approved',
    reviewedBy: 'Priya Natarajan (HR Manager)',
    reviewDate: '2026-10-05',
    reviewComment: 'Approved upon medical receipt review. Wishing speedy recovery.'
  },
  {
    id: 'leave-2',
    employeeId: 'EMP004',
    employeeName: 'Sneha Balasubramanian',
    department: 'Product Design',
    leaveType: 'Annual Leave',
    startDate: '2026-10-18',
    endDate: '2026-10-22',
    totalDays: 5,
    reason: 'Family trip to Munnar and personal vacation planned in advance.',
    appliedDate: '2026-10-06',
    status: 'Pending'
  },
  {
    id: 'leave-3',
    employeeId: 'EMP003',
    employeeName: 'Karthik Ramanathan',
    department: 'Engineering',
    leaveType: 'Casual Leave',
    startDate: '2026-10-12',
    endDate: '2026-10-12',
    totalDays: 1,
    reason: 'Attending parent-teacher conference and family errand.',
    appliedDate: '2026-10-07',
    status: 'Pending'
  },
  {
    id: 'leave-4',
    employeeId: 'EMP007',
    employeeName: 'Rahul Venugopal',
    department: 'Finance',
    leaveType: 'Casual Leave',
    startDate: '2026-09-22',
    endDate: '2026-09-23',
    totalDays: 2,
    reason: 'Personal work in hometown Coimbatore.',
    appliedDate: '2026-09-20',
    status: 'Approved',
    reviewedBy: 'Dr. Arvind Sundaram (Admin)',
    reviewDate: '2026-09-21',
    reviewComment: 'Approved. Handover to senior analyst confirmed.'
  },
  {
    id: 'leave-5',
    employeeId: 'EMP006',
    employeeName: 'Ananya Deshmukh',
    department: 'Marketing',
    leaveType: 'Annual Leave',
    startDate: '2026-09-10',
    endDate: '2026-09-18',
    totalDays: 7,
    reason: 'Vacation travel during product launch sprint without prior team backup.',
    appliedDate: '2026-09-08',
    status: 'Rejected',
    reviewedBy: 'Priya Natarajan (HR Manager)',
    reviewDate: '2026-09-09',
    reviewComment: 'Overlaps with critical Q3 marketing launch. Kindly reschedule to late October.'
  }
];

export const INITIAL_PERFORMANCE: PerformanceReview[] = [
  {
    id: 'perf-1',
    employeeId: 'EMP003',
    employeeName: 'Karthik Ramanathan',
    department: 'Engineering',
    designation: 'Lead Software Engineer',
    reviewPeriod: 'Q3 2026 (July - September)',
    goals: [
      {
        id: 'g-1',
        title: 'Modernize UI Core Architecture',
        description: 'Migrate legacy modules to React 19 and Tailwind CSS with sub-100ms render latency.',
        targetMetric: '100% components migrated',
        progress: 95,
        weight: 40
      },
      {
        id: 'g-2',
        title: 'Zero Downtime CI/CD Pipeline',
        description: 'Implement automated build validation and regression suites.',
        targetMetric: '99.9% build reliability',
        progress: 90,
        weight: 30
      },
      {
        id: 'g-3',
        title: 'Junior Developer Mentorship',
        description: 'Conduct bi-weekly architectural code reviews for junior engineers.',
        targetMetric: '6 mentorship sessions held',
        progress: 100,
        weight: 30
      }
    ],
    selfAppraisal: {
      achievements: 'Delivered the new HR platform core modules ahead of schedule; mentored 3 junior frontend engineers.',
      challenges: 'Coordinating cross-service contract tests with backend during heavy sprint deadlines.',
      selfRating: 4.8,
      submittedDate: '2026-09-30'
    },
    managerEvaluation: {
      evaluatorName: 'Dr. Arvind Sundaram',
      strengths: 'Exceptional technical leadership, strong code quality discipline, and proactive collaboration.',
      areasOfImprovement: 'Can delegate more low-level PR reviews to mid-level engineers to free up architecture bandwidth.',
      managerRating: 4.7,
      evaluatedDate: '2026-10-04'
    },
    finalScore: 4.75,
    status: 'Completed'
  },
  {
    id: 'perf-2',
    employeeId: 'EMP004',
    employeeName: 'Sneha Balasubramanian',
    department: 'Product Design',
    designation: 'Principal UX/UI Specialist',
    reviewPeriod: 'Q3 2026 (July - September)',
    goals: [
      {
        id: 'g-4',
        title: 'Enterprise Design System v2.0',
        description: 'Standardize tokens, typography, and dark-mode contrast tokens.',
        targetMetric: 'Complete component token audit',
        progress: 88,
        weight: 50
      },
      {
        id: 'g-5',
        title: 'WCAG 2.1 AA Compliance',
        description: 'Audit and resolve contrast issues across entire employee portal.',
        targetMetric: 'Zero high-severity a11y tickets',
        progress: 100,
        weight: 50
      }
    ],
    selfAppraisal: {
      achievements: 'Launched unified accessible component kit adopted across all internal SaaS tools.',
      challenges: 'Balancing quick feature requests with deep user experience testing rounds.',
      selfRating: 4.6,
      submittedDate: '2026-10-02'
    },
    managerEvaluation: {
      evaluatorName: 'Priya Natarajan',
      strengths: 'Sharp eye for visual simplicity, high user empathy, and swift prototyping.',
      areasOfImprovement: 'Establish earlier syncs with engineering before locking design specs.',
      managerRating: 4.5,
      evaluatedDate: '2026-10-05'
    },
    finalScore: 4.55,
    status: 'Completed'
  },
  {
    id: 'perf-3',
    employeeId: 'EMP005',
    employeeName: 'Vikramaditya Rao',
    department: 'Engineering',
    designation: 'DevOps & Cloud Engineer',
    reviewPeriod: 'Q3 2026 (July - September)',
    goals: [
      {
        id: 'g-6',
        title: 'Cloud Cost Optimization',
        description: 'Reduce non-production cluster spend by 20% through scale-to-zero autoscaling.',
        targetMetric: '20% cost savings achieved',
        progress: 75,
        weight: 60
      },
      {
        id: 'g-7',
        title: 'Disaster Recovery Drill',
        description: 'Simulate cross-region failover and verify RTO under 15 minutes.',
        targetMetric: 'RTO < 15 mins verified',
        progress: 60,
        weight: 40
      }
    ],
    selfAppraisal: {
      achievements: 'Configured scheduled shutdowns for testing clusters, saving approx 18% month-over-month.',
      challenges: 'Recovering from network firewall misconfigurations during staging tests.',
      selfRating: 4.0,
      submittedDate: '2026-10-04'
    },
    managerEvaluation: {
      evaluatorName: 'Dr. Arvind Sundaram',
      strengths: 'Deep Linux and Kubernetes fundamentals, reliable on-call support response.',
      areasOfImprovement: 'Needs to complete the DR rehearsal documentation for internal audit compliance.',
      managerRating: 3.9,
      evaluatedDate: undefined
    },
    finalScore: 3.95,
    status: 'Pending Manager Review'
  }
];

export const INITIAL_TRAINING: TrainingProgram[] = [
  {
    id: 'trn-1',
    title: 'Modern HR Analytics & Data-Driven Decision Making',
    category: 'Productivity',
    trainer: 'Prof. S. Ranganathan (IIM Bangalore Alumni)',
    format: 'Virtual (Online)',
    department: 'Human Resources & Management',
    startDate: '2026-10-10',
    endDate: '2026-10-25',
    durationHours: 16,
    capacity: 25,
    enrolledEmployeeIds: ['EMP001', 'EMP002', 'EMP006', 'EMP008'],
    completedEmployeeIds: ['EMP001', 'EMP002'],
    description: 'Learn how statistical analytics, retention prediction models, and digital HR dashboards optimize talent decisions.',
    status: 'In Progress'
  },
  {
    id: 'trn-2',
    title: 'Enterprise Cyber Safety & GDPR/DPDP Compliance',
    category: 'Compliance & Safety',
    trainer: 'CyberSafe Corporate Solutions',
    format: 'Virtual (Online)',
    department: 'All Departments',
    startDate: '2026-09-01',
    endDate: '2026-09-20',
    durationHours: 8,
    capacity: 100,
    enrolledEmployeeIds: ['EMP001', 'EMP002', 'EMP003', 'EMP004', 'EMP005', 'EMP006', 'EMP007', 'EMP008'],
    completedEmployeeIds: ['EMP001', 'EMP002', 'EMP003', 'EMP004', 'EMP006', 'EMP008'],
    description: 'Mandatory annual compliance program on safeguarding confidential employee data, password hygiene, and phishing defense.',
    status: 'Completed'
  },
  {
    id: 'trn-3',
    title: 'Agile Leadership & Cross-Functional Team Synergy',
    category: 'Leadership',
    trainer: 'Kavitha Narayanan (Agile Coach)',
    format: 'Hybrid',
    department: 'Engineering & Product',
    startDate: '2026-10-20',
    endDate: '2026-11-05',
    durationHours: 20,
    capacity: 15,
    enrolledEmployeeIds: ['EMP003', 'EMP004'],
    completedEmployeeIds: [],
    description: 'Practical workshop on servant leadership, conflict resolution, velocity tracking, and psychological safety in technical squads.',
    status: 'Upcoming'
  },
  {
    id: 'trn-4',
    title: 'Cloud Architecture & Microservices Best Practices',
    category: 'Technical Skills',
    trainer: 'Amazon Web Services Certified Instructor',
    format: 'In-Person Workshop',
    department: 'Engineering',
    startDate: '2026-08-15',
    endDate: '2026-08-30',
    durationHours: 24,
    capacity: 20,
    enrolledEmployeeIds: ['EMP003', 'EMP005'],
    completedEmployeeIds: ['EMP003'],
    description: 'Hands-on architectural labs covering serverless designs, distributed caching, and zero-downtime database migrations.',
    status: 'Completed'
  }
];

export const INITIAL_FEEDBACK: FeedbackSubmission[] = [
  {
    id: 'fb-1',
    employeeId: 'EMP003',
    employeeName: 'Karthik Ramanathan',
    department: 'Engineering',
    date: '2026-10-02',
    overallRating: 5,
    workLifeBalance: 5,
    careerGrowth: 4,
    managementSupport: 5,
    compensationBenefits: 4,
    comments: 'The transition from manual paperwork to this digital self-service portal has drastically cut down administrative bottlenecks! Applying for leave and checking benefits takes 30 seconds.',
    isAnonymous: false,
    category: 'Tools & Processes'
  },
  {
    id: 'fb-2',
    employeeId: 'EMP004',
    employeeName: 'Sneha Balasubramanian',
    department: 'Product Design',
    date: '2026-09-29',
    overallRating: 4,
    workLifeBalance: 4,
    careerGrowth: 5,
    managementSupport: 4,
    compensationBenefits: 4,
    comments: 'Great transparent review cycle. Having visible KPIs and digital appraisal history provides clarity on promotions and performance bonuses.',
    isAnonymous: false,
    category: 'Leadership & Culture'
  },
  {
    id: 'fb-3',
    employeeId: 'EMP006',
    employeeName: 'Ananya Deshmukh',
    department: 'Marketing',
    date: '2026-09-25',
    overallRating: 4,
    workLifeBalance: 4,
    careerGrowth: 4,
    managementSupport: 4,
    compensationBenefits: 4,
    comments: 'The hybrid work flexibility and automated attendance check-in makes morning routines very smooth.',
    isAnonymous: true,
    category: 'Workplace Environment'
  },
  {
    id: 'fb-4',
    employeeId: 'EMP007',
    employeeName: 'Rahul Venugopal',
    department: 'Finance',
    date: '2026-09-18',
    overallRating: 4,
    workLifeBalance: 4,
    careerGrowth: 3,
    managementSupport: 4,
    compensationBenefits: 4,
    comments: 'Onboarding process was swift thanks to digital employee file uploads. Would love more advanced training programs for financial modeling tools.',
    isAnonymous: false,
    category: 'Career Growth'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Leave Application Pending Review',
    message: 'Sneha Balasubramanian applied for 5 days of Annual Leave starting 2026-10-18.',
    type: 'leave',
    timestamp: '15 mins ago',
    read: false,
    targetRole: 'HR Manager',
    actionRoute: 'leave'
  },
  {
    id: 'notif-2',
    title: 'Performance Appraisal Acknowledged',
    message: 'Karthik Ramanathan completed Q3 2026 performance review with final rating 4.75.',
    type: 'appraisal',
    timestamp: '2 hours ago',
    read: false,
    targetRole: 'Admin',
    actionRoute: 'performance'
  },
  {
    id: 'notif-3',
    title: 'New Applicant Received',
    message: 'Rohan Gupta applied for Cloud Security Engineer with 3.8 years experience.',
    type: 'recruitment',
    timestamp: '5 hours ago',
    read: true,
    targetRole: 'HR Manager',
    actionRoute: 'recruitment'
  },
  {
    id: 'notif-4',
    title: 'Upcoming Training Reminder',
    message: 'Modern HR Analytics program commences on 2026-10-10. Verify enrolled seats.',
    type: 'training',
    timestamp: '1 day ago',
    read: true,
    targetRole: 'All',
    actionRoute: 'training'
  }
];

export interface TechImpactItem {
  id: string;
  category: string;
  traditionalProcess: string;
  digitalProcess: string;
  traditionalPainPoints: string[];
  digitalAdvantages: string[];
  timeReduction: string;
  costEfficiency: string;
  accuracyGain: string;
  managementPrinciple: string; // GE3791 syllabus principle (e.g. Planning, Organizing, Staffing, Directing, Controlling)
}

export const TECH_IMPACT_COMPARISONS: TechImpactItem[] = [
  {
    id: 'impact-1',
    category: 'Recruitment & Selection',
    traditionalProcess: 'Paper Job Advertisements & Physical Resumes',
    digitalProcess: 'Cloud ATS & Multi-Channel Online Portals',
    traditionalPainPoints: [
      'Manual sorting through physical postal resumes takes weeks',
      'High advertisement costs in print newspapers with limited reach',
      'Risk of losing resumes and zero tracking of candidate communication',
      'Unconscious human bias without structured scoring'
    ],
    digitalAdvantages: [
      'Automated resume filtering and keyword indexing in seconds',
      'Global reach across multiple talent networks simultaneously',
      'Centralized candidate pipeline tracking (Applied → Selected)',
      'Transparent rubrics and digital feedback for hiring panels'
    ],
    timeReduction: '65% faster time-to-hire (18 days vs 52 days)',
    costEfficiency: '72% drop in agency & printing costs',
    accuracyGain: '98% candidate data match precision',
    managementPrinciple: 'Staffing (Recruitment & Scientific Selection - Taylor & Fayol)'
  },
  {
    id: 'impact-2',
    category: 'Employee Records & Documentation',
    traditionalProcess: 'Physical Paper Filing Cabinets & Ledgers',
    digitalProcess: 'Centralized Digital Employee Database (HRIS)',
    traditionalPainPoints: [
      'Physical storage rooms consuming floor space and filing cabinets',
      'Vulnerability to fire, moisture, ink fading, and physical theft',
      'Retrieving employee records takes 20-40 minutes per inquiry',
      'Difficult to update emergency contacts or address changes'
    ],
    digitalAdvantages: [
      'Instant search and retrieval in milliseconds by ID, department, or skill',
      'Role-based access control with bank-grade encryption',
      'Employee self-service profile updates without HR intervention',
      'Zero paper storage footprint with automated cloud backups'
    ],
    timeReduction: '95% faster employee record retrieval (<2 seconds)',
    costEfficiency: '90% savings in paper, printing, and file storage',
    accuracyGain: '100% data consistency across all HR modules',
    managementPrinciple: 'Organizing (Departmentation & Centralized Information Flow)'
  },
  {
    id: 'impact-3',
    category: 'Attendance & Punctuality Tracking',
    traditionalProcess: 'Physical Register Book Signatures / Manual Punch Cards',
    digitalProcess: 'Biometric RFID & Geo-Validated Web Portal',
    traditionalPainPoints: [
      'Prevalent "buddy punching" and falsified arrival times in muster rolls',
      'Manual month-end tallying takes HR staff 4-5 days of overtime',
      'Disputes over overtime hours, late deductions, and missing signatures',
      'Zero real-time visibility into who is present on site right now'
    ],
    digitalAdvantages: [
      'Cryptographically verified timestamps eliminating buddy punching',
      'Live real-time dashboard showing present, late, on-leave, and absent headcount',
      'Instant automated payroll-ready timesheets with zero manual entry',
      'Seamless multi-location and hybrid remote work check-ins'
    ],
    timeReduction: '98% reduction in monthly attendance calculation time',
    costEfficiency: 'Eliminated fraudulent overtime payouts (saving ~8% payroll)',
    accuracyGain: '99.8% punctuality and attendance precision',
    managementPrinciple: 'Controlling (Establishing Standards & Measuring Actual Performance)'
  },
  {
    id: 'impact-4',
    category: 'Leave Management & Approvals',
    traditionalProcess: 'Paper Leave Application Slips & Sign-off Routing',
    digitalProcess: '1-Click Digital Workflow with Live Balance Tracking',
    traditionalPainPoints: [
      'Employees walk physical paper slips across managers for signatures',
      'Uncertainty about remaining sick/casual leave balances',
      'Delayed emergency leave approvals due to traveling managers',
      'Muster roll mismatch between approved slips and payroll records'
    ],
    digitalAdvantages: [
      'Instant leave submission with real-time balance quota validation',
      'Push notification alerts to managers with 1-click Approve/Reject',
      'Transparent audit log with manager feedback and review dates',
      'Automatic sync with team calendars and attendance ledgers'
    ],
    timeReduction: '85% faster turnaround (from 3 days to under 2 hours)',
    costEfficiency: '100% paperless leave administration',
    accuracyGain: 'Zero leave quota overdrafts or payroll disputes',
    managementPrinciple: 'Directing & Motivation (Fostering Trust & Operational Clarity)'
  },
  {
    id: 'impact-5',
    category: 'Performance Appraisal',
    traditionalProcess: 'Annual Subjective Paper Reviews & Memory-Based Ratings',
    digitalProcess: 'Continuous KPI Tracking & 360° Digital Appraisal',
    traditionalPainPoints: [
      'Recency bias where managers only remember the past month',
      'Opaque rating scales causing employee resentment and attrition',
      'Paper appraisal forms lost or archived without actionable development plans',
      'No tie-in between day-to-day project milestones and company goals'
    ],
    digitalAdvantages: [
      'Continuous goal progression metrics (weighted progress 0-100%)',
      'Structured self-appraisal followed by transparent manager evaluation',
      'Historical performance analytics to track high-potential talent',
      'Merit-based, objective data for increments and promotions'
    ],
    timeReduction: '60% faster annual review cycle completion',
    costEfficiency: '35% reduction in high-performer turnover',
    accuracyGain: 'Objective quantitative KPI scoring eliminating bias',
    managementPrinciple: 'Controlling & Directing (MBO - Management by Objectives)'
  },
  {
    id: 'impact-6',
    category: 'Training & Skill Development',
    traditionalProcess: 'Classroom Circulars & Manual Attendance Sheets',
    digitalProcess: 'Digital Learning Management & Competency Tracking',
    traditionalPainPoints: [
      'Difficult to track who completed mandatory compliance or safety modules',
      'High logistics and travel expenditure for offline training sessions',
      'Disruption to daily operational hours with rigid schedules',
      'Zero post-training competency assessment or digital badges'
    ],
    digitalAdvantages: [
      'On-demand virtual training modules accessible anytime on any device',
      'Automated seat registration, capacity alerts, and completion badges',
      'Live HR tracking of departmental skill coverage and certifications',
      'Direct linking between skill gaps identified in appraisals and training modules'
    ],
    timeReduction: '50% faster skill onboarding for new recruits',
    costEfficiency: '65% reduction in training venue and travel expenses',
    accuracyGain: '100% verified compliance audit records',
    managementPrinciple: 'Staffing (Employee Development & Human Asset Appreciation)'
  },
  {
    id: 'impact-7',
    category: 'HR Decision Making & Reporting',
    traditionalProcess: 'Manual Tabulation, Ledger Sheets, and Static Reports',
    digitalProcess: 'Real-Time Interactive Analytics & Predictive Dashboards',
    traditionalPainPoints: [
      'Compiling quarterly executive reports took 2 weeks of manual Excel merging',
      'Human calculation errors and stale data by the time reports were printed',
      'Reactive decision making after attrition or absenteeism already caused loss',
      'Siloed information between payroll, recruitment, and department heads'
    ],
    digitalAdvantages: [
      'Live visual dashboards for headcount, turnover, satisfaction, and costs',
      'Data-driven insights for strategic workforce planning and succession',
      'Instant export to CSV or executive visual summaries',
      'Cross-departmental correlation between training and employee performance'
    ],
    timeReduction: '90% faster executive reporting (instant vs 14 days)',
    costEfficiency: 'Eliminates costly consultant reporting overhead',
    accuracyGain: '100% automated real-time aggregation precision',
    managementPrinciple: 'Planning & Decision Making (Herbert Simon’s Rational Decision Model)'
  }
];
