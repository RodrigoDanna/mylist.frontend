import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import './AddTask.less'
import { useNavigate } from 'react-router-dom'
import Select from '../../components/Select/Select'

const priorities = [
  { value: 'nenhuma', label: 'Nenhuma' },
  { value: 'baixa', label: 'Baixa' },
  { value: 'media', label: 'Média' },
  { value: 'alta', label: 'Alta' }
]

const AddTaskPage: React.FC = () => {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('nenhuma')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setMessage(undefined)
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tasks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            title,
            priority,
            deadline: dueDate || undefined,
          }),
        }
      )
      if (!response.ok) {
        const result = await response.json()
        setError(result.message || 'Erro ao criar tarefa')
      } else {
        setMessage('Tarefa criada com sucesso!')
        setTimeout(() => navigate('/list'), 1000)
      }
    } catch (error) {
      setError('Erro ao criar tarefa')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header type="return" />
      <form className="add-task-form" onSubmit={handleSubmit}>
        <div className="form-inputs">
          <Input
            type="text"
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="input-label">
            <span>Prioridade</span>
            <Select
              options={priorities}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
          </label>
          <Input
            type="date"
            label="Prazo"
            value={dueDate}
            className="custom-date"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        {message && <div className="form-message">{message}</div>}
        <div className="form-buttons">
          <Button className="cancel" onClick={() => navigate('/list')} type="button">
            Cancelar
          </Button>
          <Button className="apply" type="submit" disabled={loading}>
            {loading ? 'Criando...' : 'Criar'}
          </Button>
        </div>
      </form>
    </>
  )
}

export default AddTaskPage
