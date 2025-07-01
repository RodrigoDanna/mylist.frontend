import React, { useState } from 'react';
import './TaskCard.less';
import { Task } from '../../pages/TaskList/TaskList';
import { useNavigate } from 'react-router-dom';

const TaskCard: React.FC<Task> = ({ id, title, deadline, priority = 'nenhuma', status = 'pendente' }) => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(status === 'concluida');

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(e.target.checked);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-task/${id}`);
  };

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className="left-section">
        <input
          type="checkbox"
          checked={isCompleted}
          onClick={(e) => e.stopPropagation()}
          onChange={handleCheckboxChange}
        />
        <span className="title">{title}</span>
      </div>
      <div className="right-section">
        <button
          className="edit-btn"
          title="Editar tarefa"
          onClick={handleEditClick}
          tabIndex={0}
        >
          {/* Simple pencil SVG icon */}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M14.7 2.29a1 1 0 0 1 1.42 0l1.59 1.59a1 1 0 0 1 0 1.42l-9.29 9.3-3.3.71a1 1 0 0 1-1.18-1.18l.71-3.3 9.3-9.29zM3 17h14a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2z" />
          </svg>
        </button>
        {deadline && <span className="date">{deadline}</span>}
        {priority && <span className={`priority ${priority.toLowerCase()}`}>{priority}</span>}
      </div>
    </div>
  );
};

export default TaskCard;
