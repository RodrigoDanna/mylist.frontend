import React, { useState } from 'react'
import './TaskCard.less'
import { Task } from '../../pages/TaskList/TaskList'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as EditIcon } from '../../assets/edit.svg'

interface TaskCardProps extends Task {
  onStatusChange?: (id: string, newStatus: 'pendente' | 'concluida') => void
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  deadline,
  priority = 'nenhuma',
  status = 'pendente',
  onStatusChange
}) => {
  const navigate = useNavigate()
  const [isCompleted, setIsCompleted] = useState(status === 'concluida')

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsCompleted(checked)
    if (onStatusChange) {
      onStatusChange(id, checked ? 'concluida' : 'pendente')
    }
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/edit-task/${id}`)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString // fallback if invalid
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }

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
        <button className="edit-btn" title="Editar tarefa" onClick={handleEditClick} tabIndex={0}>
          <EditIcon />
        </button>
        {deadline && <span className="date">{formatDate(deadline)}</span>}
        {priority && <span className={`priority ${priority.toLowerCase()}`}>{priority}</span>}
      </div>
    </div>
  )
}

export default TaskCard
