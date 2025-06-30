import React from 'react';
import './TaskCard.less';
import { Task } from '../../pages/TaskList/TaskList';

const TaskCard: React.FC<Task> = ({ id, title, deadline, priority = 'nenhuma', status = 'pendente' }) => {
  const isCompleted = status === 'concluida';

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className="left-section">
        <input type="checkbox" checked={isCompleted} />
        <span className="title">{title}</span>
      </div>
      <div className="right-section">
        {deadline && <span className="date">{deadline}</span>}
        {priority && <span className={`priority ${priority.toLowerCase()}`}>{priority}</span>}
      </div>
    </div>
  );
};

export default TaskCard;
