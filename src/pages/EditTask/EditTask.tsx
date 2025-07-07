import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import './EditTask.less'
import Select from '../../components/Select/Select'
import { useParams, useNavigate } from 'react-router-dom'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'

const priorities = [
  { value: 'nenhuma', label: 'Nenhuma' },
  { value: 'baixa', label: 'Baixa' },
  { value: 'media', label: 'Média' },
  { value: 'alta', label: 'Alta' }
]

const optionsCompleted = [
  { value: 'não', label: 'Não' },
  { value: 'sim', label: 'Sim' }
]

const EditTaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [completed, setCompleted] = useState('não')
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('nenhuma')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [message, setMessage] = useState<string | undefined>()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    async function fetchTask() {
      setLoading(true)
      setError(undefined)
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (!response.ok) {
          setError('Erro ao buscar tarefa')
        }
        const data = await response.json()
        setTitle(data.title || '')
        setPriority(data.priority || 'nenhuma')
        if (data.deadline) {
          setDueDate(data.deadline.slice(0, 10))
        }
        setCompleted(data.status === 'concluida' ? 'sim' : 'não')
      } catch (err) {
        setError('Erro ao carregar tarefa.')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchTask()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(undefined)
    setMessage(undefined)
    const dto = {
      title,
      priority,
      deadline: dueDate || null,
      status: completed === 'sim' ? 'concluida' : 'pendente'
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dto)
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        setError(data.message || 'Erro ao atualizar tarefa.')
      }
      setMessage('Tarefa atualizada com sucesso!')
      setTimeout(() => navigate('/'), 500)
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar tarefa.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(e?: React.MouseEvent) {
    if (e) e.preventDefault()
    setLoading(true)
    setError(undefined)
    setMessage(undefined)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        setError(data.message || 'Erro ao excluir tarefa.')
      }
      setMessage('Tarefa excluída com sucesso!')
      setShowDeleteModal(false)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir tarefa.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header type="return" />
      <form className="edit-task-form" onSubmit={handleSubmit}>
        <div className="form-inputs">
          <label className="input-label">
            <span>Concluída</span>
            <Select
              options={optionsCompleted}
              value={completed}
              onChange={(e) => setCompleted(e.target.value)}
              disabled={loading}
            />
          </label>
          <Input
            type="text"
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          <label className="input-label">
            <span>Prioridade</span>
            <Select
              options={priorities}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={loading}
            />
          </label>
          <Input
            type="date"
            label="Prazo"
            value={dueDate}
            className="custom-date"
            onChange={(e) => setDueDate(e.target.value)}
            disabled={loading}
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        {message && <div className="form-message">{message}</div>}
        <div className="form-buttons">
          <Button
            className="delete"
            onClick={(e) => {
              e.preventDefault()
              setShowDeleteModal(true)
            }}
            disabled={loading}
          >
            Excluir
          </Button>
          <Button className="apply" type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
      <ConfirmModal
        open={showDeleteModal}
        title="Excluir tarefa"
        message="Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        confirmText="Excluir"
        cancelText="Cancelar"
        loading={loading}
      />
    </>
  )
}

export default EditTaskPage
