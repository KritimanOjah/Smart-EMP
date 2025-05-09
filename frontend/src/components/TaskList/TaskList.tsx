import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiSearch, FiCalendar, FiCheckCircle, FiXCircle, FiClock, FiPlusCircle, FiAlertCircle } from 'react-icons/fi';

interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
  date: string;
  category: string;
  priority?: 'low' | 'medium' | 'high';
}

const statusConfig = {
  'Completed': { 
    bg: 'bg-green-100', 
    text: 'text-green-800', 
    border: 'border-green-300',
    icon: <FiCheckCircle className="mr-1" /> 
  },
  'Failed': { 
    bg: 'bg-red-100', 
    text: 'text-red-800', 
    border: 'border-red-300',
    icon: <FiXCircle className="mr-1" /> 
  },
  'New': { 
    bg: 'bg-blue-100', 
    text: 'text-blue-800', 
    border: 'border-blue-300',
    icon: <FiPlusCircle className="mr-1" /> 
  },
  'In Progress': { 
    bg: 'bg-yellow-100', 
    text: 'text-yellow-800', 
    border: 'border-yellow-300',
    icon: <FiClock className="mr-1" /> 
  },
  'Pending': { 
    bg: 'bg-purple-100', 
    text: 'text-purple-800', 
    border: 'border-purple-300',
    icon: <FiAlertCircle className="mr-1" /> 
  }
};

const priorityConfig = {
  'low': 'bg-gray-100 text-gray-800',
  'medium': 'bg-amber-100 text-amber-800',
  'high': 'bg-rose-100 text-rose-800'
};

const categoryColors = [
  'bg-indigo-100 text-indigo-800 border-indigo-200',
  'bg-pink-100 text-pink-800 border-pink-200',
  'bg-cyan-100 text-cyan-800 border-cyan-200',
  'bg-orange-100 text-orange-800 border-orange-200',
  'bg-teal-100 text-teal-800 border-teal-200',
  'bg-lime-100 text-lime-800 border-lime-200',
  'bg-violet-100 text-violet-800 border-violet-200'
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const loggedInEmployeeId = localStorage.getItem('loggedInEmployeeId');
    if (!loggedInEmployeeId) return;

    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const currentEmployee = employees.find((emp: any) => emp.id === loggedInEmployeeId);

    if (currentEmployee) {
      const formattedTasks = currentEmployee.tasks.map((task: any, index: number) => ({
        id: index + 1,
        title: task.title,
        description: task.description,
        status: task.completed ? 'Completed' : 
                task.failed ? 'Failed' : 
                task.newTask ? 'New' : 
                task.active ? 'In Progress' : 'Pending',
        date: task.date,
        category: task.category || 'General',
        priority: task.priority || 'medium'
      }));

      // Simulate API loading delay
      setTimeout(() => {
        setTasks(formattedTasks);
        setLoading(false);
      }, 1200);
    } else {
      setLoading(false);
    }
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'All' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority!] - priorityOrder[a.priority!];
    }
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
          }}
          className="rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mb-4"
        />
        <motion.p
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="text-gray-600 text-lg"
        >
          Loading your tasks...
        </motion.p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center p-6"
      >
        <div className="bg-blue-50 p-6 rounded-full mb-4">
          <FiCalendar className="text-blue-500 text-4xl" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">No tasks assigned yet</h3>
        <p className="text-gray-500 max-w-md">
          You don't have any tasks assigned to you at the moment. When tasks are assigned, they'll appear here.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <FiPlusCircle className="mr-2" />
          Request New Task
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Management</h1>
        <p className="text-gray-600">View and manage all your assigned tasks</p>
      </div>

      {/* Controls Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <motion.input
            whileFocus={{ boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)' }}
            type="text"
            placeholder="Search tasks..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.03 }}
          >
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center px-4 py-2.5 rounded-lg border shadow-sm text-sm font-medium transition-colors ${
                isFilterOpen || filter !== 'All'
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <FiFilter className="mr-2" />
              {filter === 'All' ? 'Filter' : filter}
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200 overflow-hidden"
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setFilter('All');
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        filter === 'All' 
                          ? 'bg-blue-50 text-blue-700 font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All Tasks
                    </button>
                    {Object.entries(statusConfig).map(([status, _]) => (
                      <button
                        key={status}
                        onClick={() => {
                          setFilter(status);
                          setIsFilterOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filter === status 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          {statusConfig[status as keyof typeof statusConfig].icon}
                          {status}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSortBy(sortBy === 'date' ? 'priority' : 'date')}
            className={`flex items-center px-4 py-2.5 rounded-lg border shadow-sm text-sm font-medium transition-colors ${
              sortBy === 'date'
                ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                : 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700'
            }`}
          >
            {sortBy === 'date' ? (
              <>
                <FiCalendar className="mr-2" />
                Sort by Date
              </>
            ) : (
              <>
                <FiAlertCircle className="mr-2" />
                Sort by Priority
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = tasks.filter(t => t.status === status).length;
          return (
            <motion.div 
              key={status}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-xl border ${config.border} ${config.bg} cursor-pointer transition-all ${
                filter === status ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
              onClick={() => setFilter(status === filter ? 'All' : status)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-semibold ${config.text} uppercase tracking-wider`}>
                    {status}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{count}</p>
                </div>
                <div className={`p-2 rounded-full ${config.bg}`}>
                  {React.cloneElement(config.icon, { className: `text-xl ${config.text}` })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Task grid */}
      {sortedTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {sortedTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 500, 
                  damping: 30,
                  duration: 0.3
                }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                className={`rounded-xl overflow-hidden border bg-white ${
                  statusConfig[task.status as keyof typeof statusConfig].border
                }`}
              >
                <div className={`h-1.5 ${
                  statusConfig[task.status as keyof typeof statusConfig].bg
                }`} />
                
                <div className="p-5 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <motion.h3 
                        whileHover={{ color: '#3B82F6' }}
                        className="text-lg font-bold text-gray-800 transition-colors line-clamp-1"
                      >
                        {task.title}
                      </motion.h3>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">
                          <FiCalendar className="inline mr-1" />
                          {task.date}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      priorityConfig[task.priority as keyof typeof priorityConfig]
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  
                  <motion.p 
                    className="text-gray-600 text-sm mb-4 line-clamp-3"
                  >
                    {task.description}
                  </motion.p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          statusConfig[task.status as keyof typeof statusConfig].bg
                        } ${statusConfig[task.status as keyof typeof statusConfig].text}`}
                      >
                        {statusConfig[task.status as keyof typeof statusConfig].icon}
                        {task.status}
                      </motion.span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        categoryColors[task.category.length % categoryColors.length]
                      }`}>
                        {task.category}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        View Details
                      </motion.button>
                      <div className="text-xs text-gray-500">
                        ID: {task.id}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl"
        >
          <div className="bg-blue-50 p-5 rounded-full mb-4">
            <FiSearch className="text-blue-500 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No tasks found</h3>
          <p className="text-gray-500 max-w-md text-center mb-4">
            No tasks match your current search and filter criteria. Try adjusting your filters or search term.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setFilter('All');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </motion.button>
        </motion.div>
      )}

      {/* Empty state for no tasks at all (shouldn't show if we have tasks but none match filters) */}
      {tasks.length > 0 && sortedTasks.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl"
        >
          <div className="bg-blue-50 p-5 rounded-full mb-4">
            <FiSearch className="text-blue-500 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No tasks found</h3>
          <p className="text-gray-500 max-w-md text-center mb-4">
            No tasks match your current search and filter criteria. Try adjusting your filters or search term.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setFilter('All');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;