import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  UserProfile,
  Employee,
  JobOpening,
  JobApplicant,
  AttendanceRecord,
  LeaveRequest,
  PerformanceReview,
  TrainingProgram,
  FeedbackSubmission,
  NotificationItem,
  ApplicationStatus
} from '../types/hr';
import {
  INITIAL_USERS,
  INITIAL_EMPLOYEES,
  INITIAL_JOB_OPENINGS,
  INITIAL_APPLICANTS,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVES,
  INITIAL_PERFORMANCE,
  INITIAL_TRAINING,
  INITIAL_FEEDBACK,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';

interface HRContextType {
  // Auth & Roles
  currentUser: UserProfile;
  currentRole: UserRole;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
  login: (role: UserRole) => void;
  logout: () => void;

  // Active Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Employees
  employees: Employee[];
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, emp: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  getEmployeeById: (id: string) => Employee | undefined;

  // Recruitment
  jobOpenings: JobOpening[];
  applicants: JobApplicant[];
  addJobOpening: (job: Omit<JobOpening, 'id'>) => void;
  updateJobOpening: (id: string, job: Partial<JobOpening>) => void;
  addApplicant: (applicant: Omit<JobApplicant, 'id'>) => void;
  updateApplicantStatus: (id: string, status: ApplicationStatus, notes?: string) => void;

  // Attendance
  attendanceRecords: AttendanceRecord[];
  checkInEmployee: (empId: string, method?: AttendanceRecord['method']) => void;
  checkOutEmployee: (empId: string) => void;
  markManualAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  isEmployeeCheckedInToday: (empId: string) => boolean;
  getTodayAttendanceForEmployee: (empId: string) => AttendanceRecord | undefined;

  // Leaves
  leaveRequests: LeaveRequest[];
  applyLeave: (leave: Omit<LeaveRequest, 'id' | 'appliedDate' | 'status'>) => void;
  reviewLeave: (id: string, status: 'Approved' | 'Rejected', comment: string) => void;

  // Performance
  performanceReviews: PerformanceReview[];
  submitSelfAppraisal: (reviewId: string, selfAppraisal: { achievements: string; challenges: string; selfRating: number }) => void;
  evaluatePerformance: (reviewId: string, evaluation: { strengths: string; areasOfImprovement: string; managerRating: number }) => void;
  createPerformanceReview: (review: Omit<PerformanceReview, 'id'>) => void;

  // Training
  trainingPrograms: TrainingProgram[];
  createTrainingProgram: (prog: Omit<TrainingProgram, 'id'>) => void;
  enrollInTraining: (progId: string, empId: string) => void;
  completeTraining: (progId: string, empId: string) => void;

  // Feedback
  feedbackList: FeedbackSubmission[];
  submitFeedback: (fb: Omit<FeedbackSubmission, 'id' | 'date'>) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;

  // System
  resetToDefaultData: () => void;
  isOfflineSyncMode: boolean;
}

const HRContext = createContext<HRContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'smart_hr_';

function getStoredOrDefault<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
}

export const HRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => 
    getStoredOrDefault<UserRole>('role', 'Admin')
  );
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => 
    INITIAL_USERS[currentRole] || INITIAL_USERS.Admin
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isOfflineSyncMode] = useState<boolean>(true);

  // Entities
  const [employees, setEmployees] = useState<Employee[]>(() =>
    getStoredOrDefault<Employee[]>('employees', INITIAL_EMPLOYEES)
  );
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(() =>
    getStoredOrDefault<JobOpening[]>('jobs', INITIAL_JOB_OPENINGS)
  );
  const [applicants, setApplicants] = useState<JobApplicant[]>(() =>
    getStoredOrDefault<JobApplicant[]>('applicants', INITIAL_APPLICANTS)
  );
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() =>
    getStoredOrDefault<AttendanceRecord[]>('attendance', INITIAL_ATTENDANCE)
  );
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() =>
    getStoredOrDefault<LeaveRequest[]>('leaves', INITIAL_LEAVES)
  );
  const [performanceReviews, setPerformanceReviews] = useState<PerformanceReview[]>(() =>
    getStoredOrDefault<PerformanceReview[]>('performance', INITIAL_PERFORMANCE)
  );
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>(() =>
    getStoredOrDefault<TrainingProgram[]>('training', INITIAL_TRAINING)
  );
  const [feedbackList, setFeedbackList] = useState<FeedbackSubmission[]>(() =>
    getStoredOrDefault<FeedbackSubmission[]>('feedback', INITIAL_FEEDBACK)
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    getStoredOrDefault<NotificationItem[]>('notifications', INITIAL_NOTIFICATIONS)
  );

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'role', JSON.stringify(currentRole));
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'jobs', JSON.stringify(jobOpenings));
  }, [jobOpenings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'applicants', JSON.stringify(applicants));
  }, [applicants]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'leaves', JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'performance', JSON.stringify(performanceReviews));
  }, [performanceReviews]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'training', JSON.stringify(trainingPrograms));
  }, [trainingPrograms]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Handle Role Switching
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(INITIAL_USERS[role]);
    setIsAuthenticated(true);
  };

  const login = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(INITIAL_USERS[role]);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Employee CRUD
  const addEmployee = (empData: Omit<Employee, 'id'>) => {
    const newEmp: Employee = {
      ...empData,
      id: `emp-${Date.now()}`
    };
    setEmployees(prev => [newEmp, ...prev]);
    addNotification({
      title: 'New Employee Onboarded',
      message: `${newEmp.name} was added to ${newEmp.department} as ${newEmp.designation}.`,
      type: 'recruitment',
      targetRole: 'HR Manager',
      actionRoute: 'employees'
    });
  };

  const updateEmployee = (id: string, updatedFields: Partial<Employee>) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === id ? { ...emp, ...updatedFields } : emp))
    );
  };

  const deleteEmployee = (id: string) => {
    const emp = employees.find(e => e.id === id);
    setEmployees(prev => prev.filter(e => e.id !== id));
    if (emp) {
      addNotification({
        title: 'Employee Record Archived',
        message: `${emp.name} (${emp.employeeId}) was removed from active records.`,
        type: 'recruitment',
        targetRole: 'Admin'
      });
    }
  };

  const getEmployeeById = (id: string) => {
    return employees.find(e => e.id === id || e.employeeId === id);
  };

  // Recruitment
  const addJobOpening = (jobData: Omit<JobOpening, 'id'>) => {
    const newJob: JobOpening = {
      ...jobData,
      id: `job-${Date.now()}`
    };
    setJobOpenings(prev => [newJob, ...prev]);
    addNotification({
      title: 'New Job Position Published',
      message: `${newJob.title} (${newJob.department}) is now accepting digital applications.`,
      type: 'recruitment',
      targetRole: 'All',
      actionRoute: 'recruitment'
    });
  };

  const updateJobOpening = (id: string, updatedFields: Partial<JobOpening>) => {
    setJobOpenings(prev =>
      prev.map(j => (j.id === id ? { ...j, ...updatedFields } : j))
    );
  };

  const addApplicant = (applicantData: Omit<JobApplicant, 'id'>) => {
    const newApplicant: JobApplicant = {
      ...applicantData,
      id: `app-${Date.now()}`
    };
    setApplicants(prev => [newApplicant, ...prev]);
    addNotification({
      title: 'New Application Received',
      message: `${newApplicant.name} submitted an application for ${newApplicant.jobTitle}.`,
      type: 'recruitment',
      targetRole: 'HR Manager',
      actionRoute: 'recruitment'
    });
  };

  const updateApplicantStatus = (id: string, status: ApplicationStatus, notes?: string) => {
    setApplicants(prev =>
      prev.map(app => {
        if (app.id === id) {
          return {
            ...app,
            status,
            notes: notes !== undefined ? notes : app.notes
          };
        }
        return app;
      })
    );
  };

  // Attendance
  const getTodayDateStr = () => new Date().toISOString().split('T')[0];

  const getTodayAttendanceForEmployee = (empId: string) => {
    const today = getTodayDateStr();
    return attendanceRecords.find(
      r => r.employeeId === empId && r.date === today
    );
  };

  const isEmployeeCheckedInToday = (empId: string) => {
    const rec = getTodayAttendanceForEmployee(empId);
    return !!rec;
  };

  const checkInEmployee = (
    empId: string,
    method: AttendanceRecord['method'] = 'Web Portal'
  ) => {
    const today = getTodayDateStr();
    const existing = attendanceRecords.find(
      r => r.employeeId === empId && r.date === today
    );
    if (existing) return;

    const emp = employees.find(e => e.employeeId === empId || e.id === empId);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Determine status (Late after 9:15 AM)
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const isLate = hours > 9 || (hours === 9 && minutes > 15);

    const newRec: AttendanceRecord = {
      id: `att-${Date.now()}`,
      employeeId: empId,
      employeeName: emp ? emp.name : currentUser.name,
      department: emp ? emp.department : currentUser.department,
      date: today,
      checkIn: timeStr,
      status: isLate ? 'Late' : 'Present',
      method,
      workHours: 0
    };

    setAttendanceRecords(prev => [newRec, ...prev]);
    addNotification({
      title: 'Digital Check-in Recorded',
      message: `${newRec.employeeName} checked in at ${timeStr} (${method}).`,
      type: 'attendance',
      targetRole: 'HR Manager',
      actionRoute: 'attendance'
    });
  };

  const checkOutEmployee = (empId: string) => {
    const today = getTodayDateStr();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setAttendanceRecords(prev =>
      prev.map(r => {
        if (r.employeeId === empId && r.date === today) {
          // Estimate hours
          const workHours = 8.5;
          return {
            ...r,
            checkOut: timeStr,
            workHours
          };
        }
        return r;
      })
    );
  };

  const markManualAttendance = (recordData: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = {
      ...recordData,
      id: `att-${Date.now()}`
    };
    setAttendanceRecords(prev => [newRecord, ...prev]);
  };

  // Leaves
  const applyLeave = (leaveData: Omit<LeaveRequest, 'id' | 'appliedDate' | 'status'>) => {
    const newLeave: LeaveRequest = {
      ...leaveData,
      id: `leave-${Date.now()}`,
      appliedDate: getTodayDateStr(),
      status: 'Pending'
    };
    setLeaveRequests(prev => [newLeave, ...prev]);
    addNotification({
      title: 'New Leave Request',
      message: `${newLeave.employeeName} applied for ${newLeave.totalDays} day(s) of ${newLeave.leaveType}.`,
      type: 'leave',
      targetRole: 'HR Manager',
      actionRoute: 'leave'
    });
  };

  const reviewLeave = (id: string, status: 'Approved' | 'Rejected', comment: string) => {
    const today = getTodayDateStr();
    setLeaveRequests(prev =>
      prev.map(lr => {
        if (lr.id === id) {
          return {
            ...lr,
            status,
            reviewedBy: `${currentUser.name} (${currentUser.role})`,
            reviewDate: today,
            reviewComment: comment
          };
        }
        return lr;
      })
    );

    const targetLeave = leaveRequests.find(l => l.id === id);
    if (targetLeave) {
      addNotification({
        title: `Leave ${status}`,
        message: `Your ${targetLeave.leaveType} (${targetLeave.startDate} to ${targetLeave.endDate}) was ${status.toLowerCase()} by HR.`,
        type: 'leave',
        targetRole: 'Employee',
        actionRoute: 'leave'
      });
    }
  };

  // Performance
  const submitSelfAppraisal = (
    reviewId: string,
    selfAppraisal: { achievements: string; challenges: string; selfRating: number }
  ) => {
    const today = getTodayDateStr();
    setPerformanceReviews(prev =>
      prev.map(pr => {
        if (pr.id === reviewId) {
          return {
            ...pr,
            selfAppraisal: {
              ...selfAppraisal,
              submittedDate: today
            },
            status: 'Pending Manager Review'
          };
        }
        return pr;
      })
    );
    addNotification({
      title: 'Self-Appraisal Submitted',
      message: `${currentUser.name} completed self-appraisal with rating ${selfAppraisal.selfRating}/5.`,
      type: 'appraisal',
      targetRole: 'HR Manager',
      actionRoute: 'performance'
    });
  };

  const evaluatePerformance = (
    reviewId: string,
    evalData: { strengths: string; areasOfImprovement: string; managerRating: number }
  ) => {
    const today = getTodayDateStr();
    setPerformanceReviews(prev =>
      prev.map(pr => {
        if (pr.id === reviewId) {
          const selfRate = pr.selfAppraisal?.selfRating || evalData.managerRating;
          // Calculate weighted final score (50% self, 50% manager)
          const finalScore = Number(((selfRate * 0.4) + (evalData.managerRating * 0.6)).toFixed(2));
          return {
            ...pr,
            managerEvaluation: {
              evaluatorName: currentUser.name,
              strengths: evalData.strengths,
              areasOfImprovement: evalData.areasOfImprovement,
              managerRating: evalData.managerRating,
              evaluatedDate: today
            },
            finalScore,
            status: 'Completed'
          };
        }
        return pr;
      })
    );
    addNotification({
      title: 'Performance Review Completed',
      message: `Performance evaluation completed by ${currentUser.name}.`,
      type: 'appraisal',
      targetRole: 'Employee',
      actionRoute: 'performance'
    });
  };

  const createPerformanceReview = (reviewData: Omit<PerformanceReview, 'id'>) => {
    const newReview: PerformanceReview = {
      ...reviewData,
      id: `perf-${Date.now()}`
    };
    setPerformanceReviews(prev => [newReview, ...prev]);
  };

  // Training
  const createTrainingProgram = (progData: Omit<TrainingProgram, 'id'>) => {
    const newProg: TrainingProgram = {
      ...progData,
      id: `trn-${Date.now()}`
    };
    setTrainingPrograms(prev => [newProg, ...prev]);
    addNotification({
      title: 'New Training Program Scheduled',
      message: `"${newProg.title}" has been created. Enrollment is now open.`,
      type: 'training',
      targetRole: 'All',
      actionRoute: 'training'
    });
  };

  const enrollInTraining = (progId: string, empId: string) => {
    setTrainingPrograms(prev =>
      prev.map(p => {
        if (p.id === progId && !p.enrolledEmployeeIds.includes(empId)) {
          return {
            ...p,
            enrolledEmployeeIds: [...p.enrolledEmployeeIds, empId]
          };
        }
        return p;
      })
    );
  };

  const completeTraining = (progId: string, empId: string) => {
    setTrainingPrograms(prev =>
      prev.map(p => {
        if (p.id === progId && !p.completedEmployeeIds.includes(empId)) {
          return {
            ...p,
            completedEmployeeIds: [...p.completedEmployeeIds, empId]
          };
        }
        return p;
      })
    );
  };

  // Feedback
  const submitFeedback = (fbData: Omit<FeedbackSubmission, 'id' | 'date'>) => {
    const newFeedback: FeedbackSubmission = {
      ...fbData,
      id: `fb-${Date.now()}`,
      date: getTodayDateStr()
    };
    setFeedbackList(prev => [newFeedback, ...prev]);
    addNotification({
      title: 'New Employee Pulse Feedback',
      message: `Pulse survey submitted for category: ${newFeedback.category} (${newFeedback.overallRating}/5)`,
      type: 'appraisal',
      targetRole: 'HR Manager',
      actionRoute: 'feedback'
    });
  };

  // Notifications
  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (notifData: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notifData,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Reset to default
  const resetToDefaultData = () => {
    setEmployees(INITIAL_EMPLOYEES);
    setJobOpenings(INITIAL_JOB_OPENINGS);
    setApplicants(INITIAL_APPLICANTS);
    setAttendanceRecords(INITIAL_ATTENDANCE);
    setLeaveRequests(INITIAL_LEAVES);
    setPerformanceReviews(INITIAL_PERFORMANCE);
    setTrainingPrograms(INITIAL_TRAINING);
    setFeedbackList(INITIAL_FEEDBACK);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.clear();
  };

  return (
    <HRContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthenticated,
        switchRole,
        login,
        logout,
        activeTab,
        setActiveTab,
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
        jobOpenings,
        applicants,
        addJobOpening,
        updateJobOpening,
        addApplicant,
        updateApplicantStatus,
        attendanceRecords,
        checkInEmployee,
        checkOutEmployee,
        markManualAttendance,
        isEmployeeCheckedInToday,
        getTodayAttendanceForEmployee,
        leaveRequests,
        applyLeave,
        reviewLeave,
        performanceReviews,
        submitSelfAppraisal,
        evaluatePerformance,
        createPerformanceReview,
        trainingPrograms,
        createTrainingProgram,
        enrollInTraining,
        completeTraining,
        feedbackList,
        submitFeedback,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        clearAllNotifications,
        addNotification,
        resetToDefaultData,
        isOfflineSyncMode
      }}
    >
      {children}
    </HRContext.Provider>
  );
};

export const useHR = () => {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error('useHR must be used within an HRProvider');
  }
  return context;
};
