import { useEffect, useState } from 'react'
import './TaskList.less'
import PlusButton from '../../components/PlusButton/PlusButton'
import Header from '../../components/Header/Header'
import TaskCard from '../../components/TaskCard/TaskCard'
import { useNavigate } from 'react-router-dom'
import { clearToken } from '../../utils/auth' // <-- Add this import

export interface Task {
  id: string
  title: string
  deadline?: string
  priority?: 'baixa' | 'media' | 'alta' | 'nenhuma'
  status: 'pendente' | 'concluida'
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        if (response.status === 401) {
          clearToken()
          setTasks([])
          navigate('/login', { replace: true })
          return
        }
        if (!response.ok) {
          throw new Error('Erro ao buscar tarefas')
        }
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        setTasks([])
        console.error('Erro ao buscar tarefas:', error)
      }
    }
    fetchTasks()
  }, [navigate])

  async function handleStatusChange(
    id: string,
    newStatus: 'pendente' | 'concluida'
  ) {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      )
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error)
    }
  }

  return (
    <>
      <Header />

      <div className="task-list-container">
        <main className="task-list-grid">
          {!tasks.length ? (
            <>
              <span className="no-task">
                Começe criando suas tarefas clicando no botão de "+" abaixo!
              </span>
            </>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </main>

        <PlusButton onClick={() => navigate('/add-task')} />
      </div>
    </>
  )
}
