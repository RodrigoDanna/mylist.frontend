import { useEffect, useState } from 'react'
import './TaskList.less'
import PlusButton from '../../components/PlusButton/PlusButton'
import Header from '../../components/Header/Header'
import TaskCard from '../../components/TaskCard/TaskCard'
import TaskFilterPanel from '../../components/TaskFilterPanel/TaskFilterPanel'

export interface Task {
  id: string
  title: string
  deadline?: string
  priority?: 'baixa' | 'media' | 'alta' | 'nenhuma'
  status: 'pendente' | 'concluida'
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // fetch tasks from API and setTasks
  }, [])

  const priorities: Task['priority'][] = ['baixa', 'media', 'alta', 'nenhuma']

  // Function to add a mock task
  const handleAddTask = () => {
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)]

    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title: `Nova tarefa ${tasks.length + 1}`,
      deadline: '03/07/2025',
      priority: randomPriority,
      status: 'pendente',
    }
    setTasks([...tasks, newTask])
  }

  return (
    <>
      <Header />

      <div className="task-list-container">

        <main className="task-list-grid">
          {!tasks.length ? <><span className="no-task">Começe criando suas tarefas clicando no botão de "+" abaixo!</span></> : tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </main>

        <PlusButton onClick={handleAddTask} />
      </div>
    </>
  )
}
