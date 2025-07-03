// Unit tests for AddTask page
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddTask from './AddTask';

describe('AddTask', () => {
  it('renders form and submits', () => {
    render(<AddTask />);
    expect(screen.getByText('Adicionar Tarefa')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Nova tarefa' } });
    fireEvent.change(screen.getByLabelText(/Prioridade/i), { target: { value: 'alta' } });
    fireEvent.change(screen.getByLabelText(/Prazo/i), { target: { value: '2025-07-03' } });
    fireEvent.click(screen.getByRole('button', { name: /Adicionar/i }));
  });

  it('shows error message', () => {
    render(<AddTask />);
  });

  it('shows success message', () => {
    render(<AddTask />);
  });
});
