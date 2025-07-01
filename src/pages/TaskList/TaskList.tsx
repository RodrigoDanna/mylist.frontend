import { useEffect, useState } from 'react'
import './TaskList.less'
import PlusButton from '../../components/PlusButton/PlusButton'
import Header from '../../components/Header/Header'
import TaskCard from '../../components/TaskCard/TaskCard'
import { useNavigate } from 'react-router-dom'

export interface Task {
  id: string
  title: string
  deadline?: string
  priority?: 'baixa' | 'media' | 'alta' | 'nenhuma'
  status: 'pendente' | 'concluida'
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    // fetch tasks from API and setTasks
  }, [])

  return (
    <>
      <Header />

      <div className="task-list-container">

        <main className="task-list-grid">
          {!tasks.length ? <><span className="no-task">Começe criando suas tarefas clicando no botão de "+" abaixo!</span></> : tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </main>

        <PlusButton onClick={() => navigate('/add-task')} />
      </div>
    </>
  )
}
