import React, { useEffect, useState } from 'react';
import Header from '../Other/Header';
import CreateTask from '../Other/CreateTask';
import ThreeDash from '../Uiverse/ThreeDash';
import Footer from '../Other/Taskbar';

interface Task {
  id: string;
  employeeId: string;
  employeeName: string;
  title: string;
  description: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Failed';
  date: string;
  category: string;
}

interface AdminDashboardProps {
  handleLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ handleLogout }) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [employeeFilter, setEmployeeFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<'date' | 'employee' | 'status'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showCreateTask, setShowCreateTask] = useState(false);

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const tasks: Task[] = [];
    employees.forEach((employee: any) => {
      employee.tasks.forEach((task: any) => {
        tasks.push({
          id: `${employee.id}-${task.title}`,
          employeeId: employee.id,
          employeeName: employee.firstName,
          title: task.title,
          description: task.description,
          status: task.completed ? 'Completed' : 
                 task.failed ? 'Failed' : 
                 task.newTask ? 'New' : 'In Progress',
          date: task.date,
          category: task.category
        });
      });
    });
    setAllTasks(tasks);
    setFilteredTasks(tasks);
    setLoading(false);
  }, []);

  useEffect(() => {
    let result = [...allTasks];
    
    if (statusFilter !== 'All') {
      result = result.filter(task => task.status === statusFilter);
    }
    
    if (employeeFilter !== 'All') {
      result = result.filter(task => task.employeeName === employeeFilter);
    }
    
    if (categoryFilter !== 'All') {
      result = result.filter(task => task.category === categoryFilter);
    }

    result.sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortField === 'employee') {
        return sortDirection === 'asc'
          ? a.employeeName.localeCompare(b.employeeName)
          : b.employeeName.localeCompare(a.employeeName);
      } else {
        return sortDirection === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
    });

    setFilteredTasks(result);
  }, [statusFilter, employeeFilter, categoryFilter, sortField, sortDirection, allTasks]);

  const getUniqueEmployees = () => {
    const employees = new Set<string>();
    allTasks.forEach(task => employees.add(task.employeeName));
    return ['All', ...Array.from(employees).sort()];
  };

  const getUniqueCategories = () => {
    const categories = new Set<string>();
    allTasks.forEach(task => categories.add(task.category));
    return ['All', ...Array.from(categories).sort()];
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleSort = (field: 'date' | 'employee' | 'status') => {
    if (sortField === field) {
      toggleSortDirection();
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#fde9ce] to-[#fff5e6]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f85565]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fde9ce] to-[#fff5e6] font-sans">
      <div className="fixed top-6 right-6 z-50">
        <ThreeDash 
          onLogout={handleLogout}
          onCreateTask={() => setShowCreateTask(true)}
        />
      </div>

      {showCreateTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#280f03]">Create New Task</h2>
                <button 
                  onClick={() => setShowCreateTask(false)}
                  className="text-[#280f03] hover:text-[#f85565]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <CreateTask onClose={() => setShowCreateTask(false)} />
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <h1 className="text-4xl  font-extrabold text-[#280f03] mb-10 tracking-tight">Employee Task Dashboard</h1>
        
        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-10 grid grid-cols-1 md:grid-cols-4 gap-6 border border-white/30 transition-all duration-300 hover:shadow-2xl">
          <div>
            <label className="block text-sm font-semibold text-[#280f03] mb-2">Status</label>
            <select
              className="w-full rounded-xl border border-[#f8b56d]/40 bg-white/70 py-3 px-4 text-[#280f03] focus:outline-none focus:ring-2 focus:ring-[#f85565] focus:border-transparent transition-all duration-200"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-[#280f03] mb-2">Employee</label>
            <select
              className="w-full rounded-xl border border-[#f8b56d]/40 bg-white/70 py-3 px-4 text-[#280f03] focus:outline-none focus:ring-2 focus:ring-[#f85565] focus:border-transparent transition-all duration-200"
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
            >
              {getUniqueEmployees().map(employee => (
                <option key={employee} value={employee}>{employee}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-[#280f03] mb-2">Category</label>
            <select
              className="w-full rounded-xl border border-[#f8b56d]/40 bg-white/70 py-3 px-4 text-[#280f03] focus:outline-none focus:ring-2 focus:ring-[#f85565] focus:border-transparent transition-all duration-200"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {getUniqueCategories().map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={() => {
                setStatusFilter('All');
                setEmployeeFilter('All');
                setCategoryFilter('All');
              }}
              className="w-full bg-gradient-to-r from-[#f8b56d] to-[#f85565] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#f8b56d]/90 hover:to-[#f85565]/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {/* Sorting */}
        <div className="flex items-center space-x-4 mb-8">
          <span className="text-sm font-semibold text-[#280f03] tracking-wide">Sort by:</span>
          <button
            onClick={() => handleSort('date')}
            className={`px-4 py-2 rounded-xl text-sm font-medium border border-[#f8b56d]/40 ${
              sortField === 'date' 
                ? 'bg-gradient-to-r from-[#f85565]/20 to-[#f8b56d]/20 text-[#280f03] shadow-md' 
                : 'bg-white/70 text-[#280f03]/80 hover:bg-white/90'
            } transition-all duration-200`}
          >
            Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('employee')}
            className={`px-4 py-2 rounded-xl text-sm font-medium border border-[#f8b56d]/40 ${
              sortField === 'employee' 
                ? 'bg-gradient-to-r from-[#f85565]/20 to-[#f8b56d]/20 text-[#280f03] shadow-md' 
                : 'bg-white/70 text-[#280f03]/80 hover:bg-white/90'
            } transition-all duration-200`}
          >
            Employee {sortField === 'employee' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('status')}
            className={`px-4 py-2 rounded-xl text-sm font-medium border border-[#f8b56d]/40 ${
              sortField === 'status' 
                ? 'bg-gradient-to-r from-[#f85565]/20 to-[#f8b56d]/20 text-[#280f03] shadow-md' 
                : 'bg-white/70 text-[#280f03]/80 hover:bg-white/90'
            } transition-all duration-200`}
          >
            Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
        </div>
        
        {/* Task Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTasks.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-12 text-center border border-white/30 transition-all duration-300">
              <p className="text-[#280f03]/70 text-lg font-medium">No tasks match the current filters</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div 
                key={task.id} 
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-[#280f03] tracking-tight">{task.title}</h3>
                      <p className="text-sm text-[#280f03]/70 mt-2 font-medium">{task.employeeName} • {task.category}</p>
                    </div>
                    <span className="text-sm text-[#280f03]/70 font-medium whitespace-nowrap">{task.date}</span>
                  </div>
                  
                  <p className="text-[#280f03]/80 mb-6 leading-relaxed">{task.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      task.status === 'Completed' ? 'bg-[#4CAF50]/20 text-[#2E7D32]' :
                      task.status === 'Failed' ? 'bg-[#F44336]/20 text-[#C62828]' :
                      task.status === 'New' ? 'bg-[#2196F3]/20 text-[#1565C0]' :
                      'bg-[#FFC107]/20 text-[#F57F17]'
                    } shadow-sm`}>
                      {task.status}
                    </span>
                    
                    <div className="flex space-x-4">
                      <button className="text-sm font-semibold text-[#f85565] hover:text-[#e67e51] transition-colors duration-200">
                        View Details
                      </button>
                      <button className="text-sm font-semibold text-[#280f03]/70 hover:text-[#280f03] transition-colors duration-200">
                        Reassign
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Welcome Section */}
      <div
        className="flex-1 flex flex-col items-center justify-center p-8 mt-60 max-w-4xl mx-auto animate-element"
      >
        <div className="text-center mb-10">
          <h1 className="anton-regular text-4xl font-bold text-[#280f03] mb-4">Welcome to Your Smart Employee Management System</h1>
          <p className="cascadia-code text-xl text-gray-700 max-w-3xl mx-auto">
            Say goodbye to paperwork and complex spreadsheets – your Employee Management System is here to make work life smoother, smarter, and more connected!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 w-full">
          <div className="bg-white/30 p-6 rounded-lg shadow-md border-l-4 border-[#f85565] backdrop-blur-sm">
            <h3 className="anton-regular text-2xl font-semibold text-[#280f03] mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#f85565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
              For Administrators
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#f85565] mr-2">✓</span>
                <span>Effortlessly share tasks and keep your team on track.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#f85565] mr-2">✓</span>
                <span>Manage employee data without the hassle – all in one secure place.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#f85565] mr-2">✓</span>
                <span>Get a bird's-eye view of your team's progress and performance.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/30 p-6 rounded-lg shadow-md border-l-4 border-[#e67e51] backdrop-blur-sm">
            <h3 className="anton-regular text-2xl font-semibold text-[#280f03] mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-[#e67e51]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              For Employees
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#e67e51] mr-2">✓</span>
                <span>Save and manage your personal data securely.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#e67e51] mr-2">✓</span>
                <span>Instantly view your tasks, deadlines, and updates from anywhere.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#e67e51] mr-2">✓</span>
                <span>Stay organized and focused with a clutter-free dashboard.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-white/30 p-8 rounded-xl shadow-md w-full border-t-2 border-[#f8b56d] backdrop-blur-sm">
          <h3 className="anton-regular text-2xl font-semibold text-[#280f03] mb-6 text-center flex items-center justify-center">
            <svg className="w-6 h-6 mr-2 text-[#f8b56d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            What's Coming Next
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[#f8b56d]/20 p-4 rounded-lg">
              <h4 className="font-medium text-[#280f03] mb-2">Real-time task notifications</h4>
              <p className="text-sm text-gray-700">Stay updated with instant alerts</p>
            </div>
            <div className="bg-[#f8b56d]/20 p-4 rounded-lg">
              <h4 className="font-medium text-[#280f03] mb-2">Performance tracking</h4>
              <p className="text-sm text-gray-700">Personalized insights and analytics</p>
            </div>
            <div className="bg-[#f8b56d]/20 p-4 rounded-lg">
              <h4 className="font-medium text-[#280f03] mb-2">Team collaboration tools</h4>
              <p className="text-sm text-gray-700">Integrated chat and file sharing</p>
            </div>
          </div>
        </div>

        <div className="mb-30 text-center">
          <p className="mt-4 text-gray-700 text-sm">Transform your workforce management in minutes</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminDashboard;