import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import './AddTask.less';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/Select/Select';

const priorities = [
  { value: 'nenhuma', label: 'Nenhuma' },
  { value: 'baixa', label: 'Baixa' },
  { value: 'media', label: 'Média' },
  { value: 'alta', label: 'Alta' }
];

const AddTaskPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('nenhuma');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <Header type="return" />
      <form className="add-task-form">
        <div className="form-inputs">
          <Input
            type="text"
            label="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label className="input-label">
            <span>Prioridade</span>
            <Select
              options={priorities}
              value={priority} 
              onChange={e => setPriority(e.target.value)} />
          </label>
          <Input
            type="date"
            label="Prazo"
            value={dueDate}
            className="custom-date"
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <Button className="cancel" onClick={() => navigate('/list') }>Cancelar</Button>
          <Button className="apply">Criar</Button>
        </div>
      </form>
    </>
  );
};

export default AddTaskPage;
