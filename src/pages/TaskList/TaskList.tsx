import { useEffect, useState } from 'react'
import './TaskList.less'
import PlusButton from '../../components/PlusButton/PlusButton'
import Header from '../../components/Header/Header'
import TaskCard from '../../components/TaskCard/TaskCard'
import { useNavigate } from 'react-router-dom'
import { clearToken } from '../../utils/auth'

export interface Task {
  id: string
  title: string
  deadline?: string
  priority?: 'baixa' | 'media' | 'alta' | 'nenhuma'
  status: 'pendente' | 'concluida'
  createdAt?: string
  updatedAt?: string
}

type SortOption =
  | 'priority-asc'
  | 'priority-desc'
  | 'deadline-asc'
  | 'deadline-desc'
  | 'created-asc'
  | 'created-desc'
  | 'updated-asc'
  | 'updated-desc'

type FilterOptions = {
  high: boolean
  medium: boolean
  low: boolean
  withDeadline: boolean
  withoutDeadline: boolean
  completed: boolean
  pending: boolean
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('priority-desc')
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    high: false,
    medium: false,
    low: false,
    withDeadline: false,
    withoutDeadline: false,
    completed: false,
    pending: false,
  })
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

  // Filtering logic
  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) => {
      // Priority
      if (
        filterOptions.high ||
        filterOptions.medium ||
        filterOptions.low
      ) {
        if (
          (filterOptions.high && task.priority === 'alta') ||
          (filterOptions.medium && task.priority === 'media') ||
          (filterOptions.low && task.priority === 'baixa')
        ) {
          // pass
        } else {
          return false
        }
      }
      // Deadline
      if (filterOptions.withDeadline && !task.deadline) return false
      if (filterOptions.withoutDeadline && task.deadline) return false
      // Status
      if (filterOptions.completed && task.status !== 'concluida') return false
      if (filterOptions.pending && task.status !== 'pendente') return false
      return true
    })

  // Sorting logic
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortOption) {
      case 'priority-asc':
        return priorityValue(a.priority) - priorityValue(b.priority)
      case 'priority-desc':
        return priorityValue(b.priority) - priorityValue(a.priority)
      case 'deadline-asc':
        return dateValue(a.deadline) - dateValue(b.deadline)
      case 'deadline-desc':
        return dateValue(b.deadline) - dateValue(a.deadline)
      case 'created-asc':
        return dateValue(a.createdAt) - dateValue(b.createdAt)
      case 'created-desc':
        return dateValue(b.createdAt) - dateValue(a.createdAt)
      case 'updated-asc':
        return dateValue(a.updatedAt) - dateValue(b.updatedAt)
      case 'updated-desc':
        return dateValue(b.updatedAt) - dateValue(a.updatedAt)
      default:
        return 0
    }
  })

  function priorityValue(priority?: string) {
    switch (priority) {
      case 'alta':
        return 3
      case 'media':
        return 2
      case 'baixa':
        return 1
      default:
        return 0
    }
  }
  function dateValue(date?: string) {
    return date ? new Date(date).getTime() : 0
  }

  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <div className="task-list-container">
        <main className="task-list-grid">
          {!sortedTasks.length ? (
            <span className="no-task">
              {searchTerm
                ? 'Nenhuma task encontrada'
                : 'Começe criando suas tarefas clicando no botão de "+" abaixo!'}
            </span>
          ) : (
            sortedTasks.map((task) => (
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
