import React from 'react';
import './TaskFilterPanel.less';
import { ReactComponent as ReturnIcon } from '../../assets/return.svg'
import { Button } from '../Button/Button';

interface TaskFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskFilterPanel: React.FC<TaskFilterPanelProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`task-filter-panel ${isOpen ? 'open' : ''}`}>
      <header>
        <ReturnIcon className="close-btn" onClick={onClose} />
      </header>

      <section className="sort-section">
        <div className="filter-section-title">Ordenar por</div>
        <select>
          <option>Prioridade ↓</option>
          <option>Prioridade ↑</option>
          <option>Prazo ↓</option>
          <option>Prazo ↑</option>
        </select>
      </section>

      <section className="filter-section">
        <div className="filter-section-title">Filtrar por</div>
        <div className="filter-options">
          <label><input type="checkbox" /> <span>Prioridade Alta</span></label>
          <label><input type="checkbox" /> <span>Prioridade Média</span></label>
          <label><input type="checkbox" /> <span>Prioridade Baixa</span></label>
          <label><input type="checkbox" /> <span>Com Prazo</span></label>
          <label><input type="checkbox" /> <span>Sem Prazo</span></label>
          <label><input type="checkbox" /> <span>Concluídas</span></label>
          <label><input type="checkbox" /> <span>Pendentes</span></label>
        </div>
      </section>

      <footer>
        <Button className="cancel" onClick={onClose}>Cancelar</Button>
        <Button className="apply" onClick={onClose}>Aplicar</Button>
      </footer>
    </div>
  );
};

export default TaskFilterPanel;
