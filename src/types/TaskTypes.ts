export interface Task {
  id: string
  title: string
  deadline?: string
  priority?: 'baixa' | 'media' | 'alta' | 'nenhuma'
  status: 'pendente' | 'concluida'
  createdAt?: string
  updatedAt?: string
}

export type SortOption =
  | 'priority-asc'
  | 'priority-desc'
  | 'deadline-asc'
  | 'deadline-desc'
  | 'created-asc'
  | 'created-desc'
  | 'updated-asc'
  | 'updated-desc'

export type FilterOptions = {
  high: boolean
  medium: boolean
  low: boolean
  withDeadline: boolean
  withoutDeadline: boolean
  completed: boolean
  pending: boolean
}