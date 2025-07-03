
// Unit tests for AddTask page

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddTask from './AddTask';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AddTask', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  it('renders form and submits successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
    render(<AddTask />, { wrapper: MemoryRouter });
    // Title input is the first textbox
    const titleInput = screen.getAllByRole('textbox')[0];
    expect(titleInput).toBeInTheDocument();
    fireEvent.change(titleInput, { target: { value: 'Nova tarefa' } });
    // Priority select
    const prioritySelect = screen.getByRole('combobox');
    fireEvent.change(prioritySelect, { target: { value: 'alta' } });
    // Date input by type
    const dateInput = document.querySelector('input[type="date"]');
    expect(dateInput).toBeInTheDocument();
    fireEvent.change(dateInput!, { target: { value: '2025-07-03' } });
    fireEvent.click(screen.getByRole('button', { name: /Criar/i }));
    expect(global.fetch).toHaveBeenCalled();
    // Wait for success message
    expect(await screen.findByText('Tarefa criada com sucesso!')).toBeInTheDocument();
  });

  it('shows error message on API error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Erro customizado' }),
    });
    render(<AddTask />, { wrapper: MemoryRouter });
    const titleInput = screen.getAllByRole('textbox')[0];
    fireEvent.change(titleInput, { target: { value: 'Nova tarefa' } });
    fireEvent.click(screen.getByRole('button', { name: /Criar/i }));
    expect(global.fetch).toHaveBeenCalled();
    expect(await screen.findByText('Erro customizado')).toBeInTheDocument();
  });

  it('shows fallback error message on API error without message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });
    render(<AddTask />, { wrapper: MemoryRouter });
    const titleInput = screen.getAllByRole('textbox')[0];
    fireEvent.change(titleInput, { target: { value: 'Nova tarefa' } });
    fireEvent.click(screen.getByRole('button', { name: /Criar/i }));
    expect(global.fetch).toHaveBeenCalled();
    expect(await screen.findByText('Erro ao criar tarefa')).toBeInTheDocument();
  });

  it('shows error message on fetch exception', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    render(<AddTask />, { wrapper: MemoryRouter });
    const titleInput = screen.getAllByRole('textbox')[0];
    fireEvent.change(titleInput, { target: { value: 'Nova tarefa' } });
    fireEvent.click(screen.getByRole('button', { name: /Criar/i }));
    expect(global.fetch).toHaveBeenCalled();
    expect(await screen.findByText('Erro ao criar tarefa')).toBeInTheDocument();
  });

  it('navigates to /list when cancel is clicked', () => {
    render(<AddTask />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', { name: /Cancelar/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/list');
  });
});
