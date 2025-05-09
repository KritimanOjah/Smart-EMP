import React, { useState } from 'react';
import YourTask from "../Uiverse/YourTask";
import TaskList from './TaskList'; 

const TaskManager: React.FC = () => {
  const [isTaskListVisible, setIsTaskListVisible] = useState(false);

  const toggleTaskList = () => {
    setIsTaskListVisible(!isTaskListVisible);
  };

  return (
    <div className="task-manager-container">
      <YourTask onClick={toggleTaskList} />
      {isTaskListVisible && <TaskList />}
    </div>
  );
};

export default TaskManager;