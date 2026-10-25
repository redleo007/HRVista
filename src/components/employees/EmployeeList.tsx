import React, { useState, useMemo } from 'react';
import { useHR } from '../../context/HRContext';
import { Employee, EmploymentStatus } from '../../types/hr';
import { EmployeeModal } from './EmployeeModal';
import { EmployeeProfileModal } from './EmployeeProfileModal';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';
import {
  Search,
  Plus,
  Users,
  Eye,
  Edit2,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Star,
  CheckSquare,
  Square
} from 'lucide-react';

const DEPARTMENTS = [
  'All Departments',
  'Engineering',
  'Human Resources',
  'Product Design',
  'Marketing',
  'Finance',
  'Operations',
  'Executive Management'
];

type SortField = 'name' | 'employeeId' | 'department' | 'joiningDate' | 'performance';

export const EmployeeList: React.FC = () => {
  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    performanceReviews,
    currentRole
  } = useHR();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');

  // Sorting state
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Pagination state (5 per page for clean scannability, with pagination controls)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);
  const [deleteTargetEmployee, setDeleteTargetEmployee] = useState<Employee | null>(null);

  // Helper to get employee performance score
  const getEmpPerfScore = (empId: string) => {
    const rev = performanceReviews.find(r => r.employeeId === empId);
    return rev ? rev.finalScore : 4.4;
  };

  // Filtered & Sorted list
  const filteredAndSorted = useMemo(() => {
    let result = employees.filter(emp => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept =
        selectedDept === 'All Departments' || emp.department === selectedDept;

      const matchesStatus =
        selectedStatus === 'All Statuses' || emp.employmentStatus === selectedStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });

    // Sort
    result.sort((a, b) => {
      let valA: any = a[sortField as keyof Employee];
      let valB: any = b[sortField as keyof Employee];

      if (sortField === 'performance') {
        valA = getEmpPerfScore(a.employeeId);
        valB = getEmpPerfScore(b.employeeId);
      }

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [employees, searchTerm, selectedDept, selectedStatus, sortField, sortAsc]);

  // Paginated records
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage) || 1;
  const paginatedEmployees = filteredAndSorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedEmployees.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedEmployees.map(e => e.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSaveEmployee = (empData: Omit<Employee, 'id'>) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, empData);
    } else {
      addEmployee(empData);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetEmployee) {
      deleteEmployee(deleteTargetEmployee.id);
      setDeleteTargetEmployee(null);
    }
  };

  const getStatusVariant = (status: EmploymentStatus) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'On Leave':
        return 'warning';
      case 'Probation':
        return 'info';
      case 'Terminated':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-5">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
              Directory Management
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
            Personnel Roster & Central Master
          </h1>
          <p className="text-xs text-[#98A2B3] mt-0.5">
            Real-time digital identity database eliminating physical personnel filing cabinets.
          </p>
        </div>

        {currentRole !== 'Employee' && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => {
                setEditingEmployee(null);
                setIsAddEditOpen(true);
              }}
              className="px-3.5 py-2 text-xs font-semibold text-[#0B0F14] bg-[#D4AF37] hover:bg-[#E8C96A] rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm shadow-[#D4AF37]/20"
            >
              <Plus className="w-4 h-4" />
              <span>Onboard Employee</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#151B23] p-3.5 rounded-xl border border-[#212833] flex flex-col md:flex-row items-center gap-3 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, ID, role, or corporate email..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] placeholder-[#98A2B3] focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={e => {
              setSelectedDept(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37]"
          >
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={e => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs rounded-lg border border-[#212833] bg-[#11161D] text-[#F5F7FA] focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Probation">Probation</option>
            <option value="Terminated">Terminated</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Bar (when items selected) */}
      {selectedIds.length > 0 && (
        <div className="bg-[#11161D] px-4 py-2.5 rounded-lg border border-[#D4AF37]/30 flex items-center justify-between text-xs text-[#F5F7FA] animate-in fade-in">
          <span className="font-medium text-[#E8C96A]">
            {selectedIds.length} employee(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedIds([])}
              className="text-[#98A2B3] hover:text-[#F5F7FA] text-[11px] px-2 py-1"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}

      {/* Employees Table */}
      {filteredAndSorted.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Personnel Found"
          description="No employee records match your search query or department filters."
          actionText={currentRole !== 'Employee' ? 'Onboard Employee' : undefined}
          onAction={() => {
            setSearchTerm('');
            setSelectedDept('All Departments');
            setSelectedStatus('All Statuses');
            setIsAddEditOpen(true);
          }}
        />
      ) : (
        <div className="bg-[#151B23] rounded-xl border border-[#212833] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#212833] bg-[#11161D] text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider font-mono">
                  <th className="py-3 px-4 w-10">
                    <button
                      onClick={toggleSelectAll}
                      className="text-[#98A2B3] hover:text-[#D4AF37]"
                    >
                      {selectedIds.length === paginatedEmployees.length && paginatedEmployees.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-[#D4AF37]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1 hover:text-[#F5F7FA]">
                      <span>Employee</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('employeeId')}>
                    <div className="flex items-center gap-1 hover:text-[#F5F7FA]">
                      <span>Employee ID</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('department')}>
                    <div className="flex items-center gap-1 hover:text-[#F5F7FA]">
                      <span>Department</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('performance')}>
                    <div className="flex items-center gap-1 hover:text-[#F5F7FA]">
                      <span>Performance</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('joiningDate')}>
                    <div className="flex items-center gap-1 hover:text-[#F5F7FA]">
                      <span>Joined</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212833]/60 text-xs">
                {paginatedEmployees.map((emp) => {
                  const isSelected = selectedIds.includes(emp.id);
                  const perfScore = getEmpPerfScore(emp.employeeId);

                  return (
                    <tr
                      key={emp.id}
                      className={`hover:bg-[#1A222C]/70 transition-colors group cursor-pointer ${
                        isSelected ? 'bg-[#D4AF37]/5' : ''
                      }`}
                      onClick={() => setViewingEmployee(emp)}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => toggleSelectOne(emp.id)}
                          className="text-[#98A2B3] hover:text-[#D4AF37]"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#D4AF37]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Name & Avatar */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#11161D] border border-[#212833] text-[#E8C96A] flex items-center justify-center font-bold text-xs shrink-0 shadow-inner group-hover:border-[#D4AF37]/50 transition-colors">
                            {emp.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-[#F5F7FA] group-hover:text-[#E8C96A] transition-colors">
                              {emp.name}
                            </div>
                            <div className="text-[11px] text-[#98A2B3]">
                              {emp.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Employee ID */}
                      <td className="py-3 px-4 font-mono text-[#D4AF37] text-xs font-medium">
                        {emp.employeeId}
                      </td>

                      {/* Department */}
                      <td className="py-3 px-4 text-[#F5F7FA]">
                        {emp.department}
                      </td>

                      {/* Designation */}
                      <td className="py-3 px-4 text-[#98A2B3]">
                        {emp.designation}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <Badge variant={getStatusVariant(emp.employmentStatus)} dot>
                          {emp.employmentStatus}
                        </Badge>
                      </td>

                      {/* Performance */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-mono text-[#F5F7FA]">
                          <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                          <span>{perfScore.toFixed(1)}</span>
                        </div>
                      </td>

                      {/* Joined */}
                      <td className="py-3 px-4 text-[#98A2B3] font-mono text-[11px]">
                        {emp.joiningDate}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setViewingEmployee(emp)}
                            className="p-1.5 text-[#98A2B3] hover:text-[#D4AF37] hover:bg-[#11161D] rounded-md transition-colors cursor-pointer"
                            title="View Profile"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {currentRole !== 'Employee' && (
                            <button
                              onClick={() => {
                                setEditingEmployee(emp);
                                setIsAddEditOpen(true);
                              }}
                              className="p-1.5 text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#11161D] rounded-md transition-colors cursor-pointer"
                              title="Edit Record"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {currentRole === 'Admin' && (
                            <button
                              onClick={() => setDeleteTargetEmployee(emp)}
                              className="p-1.5 text-[#98A2B3] hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="py-3 px-4 border-t border-[#212833] bg-[#11161D] flex items-center justify-between text-xs text-[#98A2B3]">
            <span>
              Showing <strong className="font-mono text-[#F5F7FA]">{paginatedEmployees.length}</strong> of{' '}
              <strong className="font-mono text-[#F5F7FA]">{filteredAndSorted.length}</strong> records
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="p-1.5 rounded-lg border border-[#212833] text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#151B23] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs px-2 text-[#F5F7FA]">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="p-1.5 rounded-lg border border-[#212833] text-[#98A2B3] hover:text-[#F5F7FA] hover:bg-[#151B23] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Form Modal */}
      <EmployeeModal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        onSave={handleSaveEmployee}
        editingEmployee={editingEmployee}
      />

      {/* Executive Detailed Employee Profile Modal */}
      <EmployeeProfileModal
        employee={viewingEmployee}
        onClose={() => setViewingEmployee(null)}
        onEdit={currentRole !== 'Employee' ? (emp) => {
          setEditingEmployee(emp);
          setIsAddEditOpen(true);
        } : undefined}
      />

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!deleteTargetEmployee}
        title="Archive Personnel Record"
        message={`Are you sure you want to delete the record for ${deleteTargetEmployee?.name} (${deleteTargetEmployee?.employeeId})? This will revoke active platform permissions.`}
        confirmText="Archive Employee"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetEmployee(null)}
      />
    </div>
  );
};
