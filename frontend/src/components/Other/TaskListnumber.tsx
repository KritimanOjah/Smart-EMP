import React, { useEffect, useState } from 'react';

interface TaskNumbers {
  newTask: number;
  active: number;
  completed: number;
  failed: number;
}

interface Employee {
  id: string;
  taskNumber: TaskNumbers;
  firstName: string; // Optional: For displaying name
}

const TaskListNumber = () => {
  const [taskCounts, setTaskCounts] = useState({
    newTasks: 0,
    inProgress: 0,
    completed: 0,
    onHold: 0,
  });

  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    // 1. Get logged-in employee ID (from your auth system)
    const loggedInEmployeeId = localStorage.getItem('loggedInEmployeeId') || 'emp002';

    
    const employeesJSON = localStorage.getItem('employees');
    if (!employeesJSON) return;

    const employees: Employee[] = JSON.parse(employeesJSON);
    const employee = employees.find(emp => emp.id === loggedInEmployeeId);
    if (!employee) return;

    // 3. Update UI
    setEmployeeName(employee.firstName);
    setTaskCounts({
      newTasks: employee.taskNumber.newTask,
      inProgress: employee.taskNumber.active,
      completed: employee.taskNumber.completed,
      onHold: employee.taskNumber.failed,
    });
  }, []);

  const taskBoxes = [
    { count: taskCounts.newTasks, label: 'New Tasks' },
    { count: taskCounts.inProgress, label: 'In Progress' },
    { count: taskCounts.completed, label: 'Completed' },
    { count: taskCounts.onHold, label: 'On Hold' },
  ];

  return (
    <div className="p-40">
  <h2 className="text-xl font-bold mb-4">
    {employeeName}'s Task Dashboard
  </h2>
  <div className="grid grid-cols-2 gap-6">
    {taskBoxes.map((box, index) => (
      <div
        key={index}
        className={`${
          index % 4 === 0
            ? "bg-[#00c5c4]"
            : index % 4 === 1
            ? "bg-[#ff812c]"
            : index % 4 === 2
            ? "bg-[#f5c938]"
            : "bg-[#ca9dfd]"
        } p-6 rounded-lg shadow-md border-l-4 border-transparent  transition-all duration-300 ease-in-out hover:scale-[1.05] h-58 w-full`}
      >
        <h3 className="text-5xl anton-regular font-bold text-black mb-18">
          {box.count}
        </h3>
        <p className="text-5xl anton-regular font-extrabold text-black">{box.label}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default TaskListNumber;