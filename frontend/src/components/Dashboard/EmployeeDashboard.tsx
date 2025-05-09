import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, stagger, animate } from "framer-motion";
import TaskListnumber from "../Other/TaskListnumber";
import TaskList from "../TaskList/TaskList";
import Explore from "../Uiverse/Explore";
import YourTask from "../Uiverse/YourTask";
import Footer from "../Other/Taskbar";
import Profile from "../Other/Profile";

interface EmployeeDashboardProps {
  user: any;
  handleLogout: () => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  user,
  handleLogout,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [showTaskManager, setShowTaskManager] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      animate(
        ".animate-element",
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.1), duration: 0.8, ease: "easeOut" }
      );
    }
  }, [isInView, controls]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fde9ce] flex flex-col overflow-x-hidden">
      {/* Profile Button and Dropdown - Placed in the right corner */}
      <div className="fixed top-4 right-4 z-50" ref={profileRef}>
        <button 
          onClick={() => setShowProfile(!showProfile)}
          className="w-12 h-12 rounded-full bg-[#f85565] flex items-center justify-center text-white hover:bg-[#e67e51] transition-colors shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>

        {showProfile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Profile 
              onLogout={handleLogout}
              userName={user.name}
              userRole={user.role}
              userEmail={user.email}
            />
          </motion.div>
        )}
      </div>

      {/* Hero Section */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="flex-1 flex flex-col items-center justify-center mt-20 md:mt-28 lg:mt-32 px-4"
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="anton-regular text-5xl md:text-7xl lg:text-9xl font-extrabold text-[#280f03] tracking-tight leading-tight text-center"
        >
          <span className="inline-block">MAKE YOUR</span>
          <br />
          <motion.span 
            className="inline-block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            TASK LIST TODAY
          </motion.span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } },
          }}
          className="cascadia-code mt-8 md:mt-12 px-4 text-lg md:text-xl text-gray-700 tracking-tight leading-relaxed text-center max-w-4xl mx-auto"
        >
          Take control of your day with a beautifully simple yet powerful task
          dashboard designed to help you plan smarter, stay focused, and
          accomplish more — whether you're working solo or as part of a team.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.6 } },
          }}
          className="mt-12 md:mt-16 animate-element"
        >
          <Explore />
        </motion.div>
      </motion.div>

      

      {/* Task List Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
        className="mt-20 md:mt-32 p-4 md:p-8 animate-element"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="max-w-6xl mx-auto bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-white/20"
        >
          <TaskListnumber/>
          <div className="flex items-center justify-center">
            <YourTask onClick={() => setShowTaskManager(true)} />
          </div>
        </motion.div>
      </motion.div>

      {/* Task Manager Modal */}
      {showTaskManager && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTaskManager(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#fde9ce] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#280f03]">Your Tasks</h2>
                <button 
                  onClick={() => setShowTaskManager(false)}
                  className="text-[#280f03] hover:text-[#f85565]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <TaskList />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Subtle decorative elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#f8b56d] mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-2/3 right-1/4 w-96 h-96 rounded-full bg-[#e67e51] mix-blend-multiply filter blur-3xl opacity-20 animate-float-delay"></div>
      </motion.div>


{/* Welcome Section */}
<motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
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

        <div className=" mb-30 text-center">
          <p className="mt-4 text-gray-700 text-sm">Transform your workforce management in minutes</p>
        </div>
      </motion.div>
      <Footer/>
    </div>
  );
};

export default EmployeeDashboard;