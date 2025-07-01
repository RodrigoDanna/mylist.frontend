import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import './EditTask.less';
import { useNavigate } from 'react-router-dom';

const priorities = [
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' },
  { value: 'nenhuma', label: 'Nenhuma' }
];

const EditTaskPage: React.FC = () => {
  const [completed, setCompleted] = useState('não');
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('alta');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <Header type="return" />
      <form className="edit-task-form">
        <div className="form-inputs">
          <label className="input-label">
            <span>Concluída</span>
            <select
              className="custom-select"
              value={completed}
              onChange={e => setCompleted(e.target.value)}
            >
              <option value="não">Não</option>
              <option value="sim">Sim</option>
            </select>
          </label>
          <Input
            type="text"
            label="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label className="input-label">
            <span>Prioridade</span>
            <select
              className="custom-select"
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              {priorities.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </label>
          <Input
            type="date"
            label="Prazo"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <Button className="delete" onClick={e => { e.preventDefault(); /* lógica de exclusão */ }}>Excluir</Button>
          <Button className="apply">Salvar</Button>
        </div>
      </form>
    </>
  );
};

export default EditTaskPage;
