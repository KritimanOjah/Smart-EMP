import React, { useState, useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from '../../utils/LocalStorage';

interface Task {
  active: boolean;
  newTask: boolean;
  completed: boolean;
  failed: boolean;
  title: string;
  description: string;
  date: string;
  category: string;
}

interface Employee {
  id: string;
  firstName: string;
  email: string;
  password: string;
  taskNumber: {
    active: number;
    newTask: number;
    completed: number;
    failed: number;
  };
  tasks: Task[];
}

const CreateTask: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [taskData, setTaskData] = useState<Omit<Task, 'active' | 'newTask' | 'completed' | 'failed'>>({
    title: '',
    description: '',
    date: '',
    category: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const { employees } = getLocalStorage();
    setEmployees(employees);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEmployeeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmployee(e.target.value);
    
    // Clear error when user selects an employee
    if (formErrors.employeeId) {
      setFormErrors(prev => ({ ...prev, employeeId: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!selectedEmployee) {
      errors.employeeId = 'Please select an employee';
    }
    
    if (!taskData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!taskData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!taskData.date) {
      errors.date = 'Date is required';
    } else if (new Date(taskData.date) < new Date()) {
      errors.date = 'Date cannot be in the past';
    }
    
    if (!taskData.category) {
      errors.category = 'Category is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const updatedEmployees = employees.map(employee => {
      if (employee.id === selectedEmployee) {
        const newTask: Task = {
          ...taskData,
          active: true,
          newTask: true,
          completed: false,
          failed: false
        };
        
        return {
          ...employee,
          tasks: [...employee.tasks, newTask],
          taskNumber: {
            ...employee.taskNumber,
            active: employee.taskNumber.active + 1,
            newTask: employee.taskNumber.newTask + 1
          }
        };
      }
      return employee;
    });
    
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setIsSubmitted(true);
    
    // Reset form
    setSelectedEmployee('');
    setTaskData({
      title: '',
      description: '',
      date: '',
      category: ''
    });
    
    // Hide success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const categories = [
    'Design', 'Development', 'Testing', 'Documentation', 
    'Deployment', 'Research', 'Meeting', 'Frontend',
    'Backend', 'DevOps', 'Bug Fix', 'SEO', 'Performance'
  ];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl font-sans">
      <h2 className="text-2xl font-bold text-[#280f03] mb-6 tracking-tight">Create New Task</h2>
      
      {isSubmitted && (
        <div className="mb-6 p-4 bg-[#4CAF50]/10 text-[#2E7D32] rounded-xl border border-[#4CAF50]/30">
          Task created successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="employeeId" className="block text-sm font-semibold text-[#280f03] mb-2">
            Assign to Employee
          </label>
          <select
            id="employeeId"
            value={selectedEmployee}
            onChange={handleEmployeeSelect}
            className={`w-full rounded-xl border ${formErrors.employeeId ? 'border-[#f85565]' : 'border-[#f8b56d]/40'} bg-white/70 py-3 px-4 text-[#280f03] focus:outline-none focus:ring-2 focus:ring-[#f85565] focus:border-transparent transition-all duration-200`}
          >
            <option value="">Select an employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName} ({employee.email})
              </option>
            ))}
          </select>
          {formErrors.employeeId && (
            <p className="mt-2 text-sm text-[#f85565]">{formErrors.employeeId}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-[#280f03] mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            className={`w-full rounded-xl border ${formErrors.title ? 'border-[#f85565]' : 'border-[#f8b56d]/40'} bg-white/70 py-3 px-4 text-[#280f03] placeholder-[#280f03]/50 focus:outline-none focus:ring-2 focus:ring-[#f85565] focus:border-transparent transition-all duration-200`}
            placeholder="Enter task title"
          />
          {formErrors.title && (
            <p className="mt-2 text-sm text-[#f85565]">{formErrors.title}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-[#280f03] mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            rows={4}
            className={`w-full rounded-xl border ${formErrors.description ? 'border-[#f85565]' : 'border-[#f8b56d]/40'} bg-white/70 py-3 px-4 text-[#280f03] placeholder-[#280f03]/50 focus:outline-none focus:ring-2 focus:ring-[#f85565] focus:border-transparent transition-all duration-200`}
            placeholder="Enter task description"
          />
          {formErrors.description && (
            <p className="mt-2 text-sm text-[#f85565]">{formErrors.description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-[#280f03] mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={taskData.date}
              onChange={handleInputChange}
              className={`w-full rounded-xl border ${formErrors.date ? 'border-[#f85565]' : 'border-[#f8b56d]/40'} bg-white/70 py-3 px-4 text-[#280f03] focus:outline-none focus:ring-2 focus:ring-[#f85565] focus:border-transparent transition-all duration-200`}
            />
            {formErrors.date && (
              <p className="mt-2 text-sm text-[#f85565]">{formErrors.date}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-[#280f03] mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={taskData.category}
              onChange={handleInputChange}
              className={`w-full rounded-xl border ${formErrors.category ? 'border-[#f85565]' : 'border-[#f8b56d]/40'} bg-white/70 py-3 px-4 text-[#280f03] focus:outline-none focus:ring-2 focus:ring-[#f85565] focus:border-transparent transition-all duration-200`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {formErrors.category && (
              <p className="mt-2 text-sm text-[#f85565]">{formErrors.category}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#f8b56d] to-[#f85565] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#f8b56d]/90 hover:to-[#f85565]/90 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;