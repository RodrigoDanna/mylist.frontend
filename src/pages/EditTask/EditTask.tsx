import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import './EditTask.less'
import Select from '../../components/Select/Select'

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
  const [completed, setCompleted] = useState('não')
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('nenhuma')
  const [dueDate, setDueDate] = useState('')

  return (
    <>
      <Header type="return" />
      <form className="edit-task-form">
        <div className="form-inputs">
          <label className="input-label">
            <span>Concluída</span>
            <Select
              options={optionsCompleted}
              value={completed}
              onChange={(e) => setCompleted(e.target.value)}
            />
          </label>
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
        <div className="form-buttons">
          <Button
            className="delete"
            onClick={(e) => {
              e.preventDefault() /* lógica de exclusão */
            }}
          >
            Excluir
          </Button>
          <Button className="apply">Salvar</Button>
        </div>
      </form>
    </>
  )
}

export default EditTaskPage
