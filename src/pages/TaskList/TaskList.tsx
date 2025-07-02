import { useEffect, useState } from 'react'
import './TaskList.less'
import PlusButton from '../../components/PlusButton/PlusButton'
import Header from '../../components/Header/Header'
import TaskCard from '../../components/TaskCard/TaskCard'
import { useNavigate } from 'react-router-dom'
import { clearToken } from '../../utils/auth'
import { Task, SortOption, FilterOptions } from '../../types/TaskTypes'

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  // Load sortOption and filterOptions from localStorage, or use defaults
  const getInitialSortOption = (): SortOption => {
    const stored = localStorage.getItem('sortOption')
    return (stored as SortOption) || 'created-desc'
  }
  const getInitialFilterOptions = (): FilterOptions => {
    const stored = localStorage.getItem('filterOptions')
    return (
      (stored && JSON.parse(stored)) || {
        high: false,
        medium: false,
        low: false,
        withDeadline: false,
        withoutDeadline: false,
        completed: false,
        pending: false
      }
    )
  }

  const [sortOption, setSortOptionState] = useState<SortOption>(getInitialSortOption)
  const [filterOptions, setFilterOptionsState] = useState<FilterOptions>(getInitialFilterOptions)
  const navigate = useNavigate()

  // Save sortOption and filterOptions to localStorage when they change
  useEffect(() => {
    localStorage.setItem('sortOption', sortOption)
  }, [sortOption])

  useEffect(() => {
    localStorage.setItem('filterOptions', JSON.stringify(filterOptions))
  }, [filterOptions])

  const setSortOption = (opt: SortOption) => {
    setSortOptionState(opt)
  }
  const setFilterOptions = (opts: FilterOptions) => {
    setFilterOptionsState(opts)
  }

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true)
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.status === 401) {
          clearToken()
          setTasks([])
          setLoading(false)
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
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [navigate])

  async function handleStatusChange(id: string, newStatus: 'pendente' | 'concluida') {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      })
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
      )
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error)
    }
  }

  // Filtering logic
  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((task) => {
      // Priority
      if (filterOptions.high || filterOptions.medium || filterOptions.low) {
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
      if (filterOptions.withDeadline && filterOptions.withoutDeadline) return true
      if (filterOptions.withDeadline && !task.deadline) return false
      if (filterOptions.withoutDeadline && task.deadline) return false
      // Status
      if (filterOptions.completed && filterOptions.pending) return true
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
          {loading ? (
            <span className="no-task">Carregando tarefas...</span>
          ) : !sortedTasks.length ? (
            <span className="no-task">
              {searchTerm || Object.values(filterOptions).some(Boolean)
                ? 'Nenhuma task encontrada'
                : 'Começe criando suas tarefas clicando no botão de "+" abaixo!'}
            </span>
          ) : (
            sortedTasks.map((task) => (
              <TaskCard key={task.id} {...task} onStatusChange={handleStatusChange} />
            ))
          )}
        </main>
        <PlusButton onClick={() => navigate('/add-task')} />
      </div>
    </>
  )
}
