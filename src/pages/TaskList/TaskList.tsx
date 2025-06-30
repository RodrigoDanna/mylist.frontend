import { useEffect, useState } from 'react'
import './TaskList.less'
import PlusButton from '../../components/PlusButton/PlusButton'
import Header from '../../components/Header/Header'
import TaskCard from '../../components/TaskCard/TaskCard'

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
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Estudar React',
        deadline: '01/07/2025',
        priority: 'alta',
        status: 'pendente',
      },
      {
        id: '2',
        title: 'Fazer compras',
        deadline: '02/07/2025',
        priority: 'media',
        status: 'concluida',
      },
      {
        id: '3',
        title: 'Ler um livro',
        priority: 'nenhuma',
        status: 'pendente',
      },
      {
        id: '4',
        title: 'Lavar o carro',
        deadline: '02/07/2025',
        status: 'pendente',
      },
    ]
    setTasks(mockTasks)
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
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </main>

        <PlusButton onClick={handleAddTask} />
      </div>
    </>
  )
}
