import React from 'react'
import './TaskFilterPanel.less'
import { ReactComponent as ReturnIcon } from '../../assets/return.svg'

type SortOption =
  | 'priority-desc'
  | 'priority-asc'
  | 'deadline-desc'
  | 'deadline-asc'
  | 'created-desc'
  | 'created-asc'
  | 'updated-desc'
  | 'updated-asc'

type FilterOptions = {
  high: boolean
  medium: boolean
  low: boolean
  withDeadline: boolean
  withoutDeadline: boolean
  completed: boolean
  pending: boolean
}

interface TaskFilterPanelProps {
  isOpen: boolean
  onClose: () => void
  filterOptions: FilterOptions
  setFilterOptions: (opts: FilterOptions) => void
  sortOption: SortOption
  setSortOption: (opt: SortOption) => void
}

const TaskFilterPanel: React.FC<TaskFilterPanelProps> = ({
  isOpen,
  onClose,
  filterOptions,
  setFilterOptions,
  sortOption,
  setSortOption,
}) => {
  const handleFilterChange = (key: keyof FilterOptions) => {
    setFilterOptions({ ...filterOptions, [key]: !filterOptions[key] })
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption)
  }

  return (
    <div className={`task-filter-panel ${isOpen ? 'open' : ''}`}>
      <header>
        <ReturnIcon className="close-btn" onClick={onClose} />
      </header>

      <section className="sort-section">
        <div className="section-title">Ordenar por</div>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="priority-desc">Prioridade ↓</option>
          <option value="priority-asc">Prioridade ↑</option>
          <option value="deadline-desc">Prazo ↓</option>
          <option value="deadline-asc">Prazo ↑</option>
          <option value="created-desc">Criada ↓</option>
          <option value="created-asc">Criada ↑</option>
          <option value="updated-desc">Atualizada ↓</option>
          <option value="updated-asc">Atualizada ↑</option>
        </select>
      </section>

      <section className="filter-section">
        <div className="section-title">Filtrar por</div>
        <div className="filter-options">
          <label>
            <input
              type="checkbox"
              checked={filterOptions.high}
              onChange={() => handleFilterChange('high')}
            />{' '}
            <span>Prioridade Alta</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterOptions.medium}
              onChange={() => handleFilterChange('medium')}
            />{' '}
            <span>Prioridade Média</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterOptions.low}
              onChange={() => handleFilterChange('low')}
            />{' '}
            <span>Prioridade Baixa</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterOptions.withDeadline}
              onChange={() => handleFilterChange('withDeadline')}
            />{' '}
            <span>Com Prazo</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterOptions.withoutDeadline}
              onChange={() => handleFilterChange('withoutDeadline')}
            />{' '}
            <span>Sem Prazo</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterOptions.completed}
              onChange={() => handleFilterChange('completed')}
            />{' '}
            <span>Concluídas</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterOptions.pending}
              onChange={() => handleFilterChange('pending')}
            />{' '}
            <span>Pendentes</span>
          </label>
        </div>
      </section>
    </div>
  )
}

export default TaskFilterPanel
