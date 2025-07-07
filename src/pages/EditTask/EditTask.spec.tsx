// Unit tests for EditTask page


import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditTask from './EditTask';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';


// Helper to render with router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => mockNavigate,
}));

describe('EditTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore
    global.fetch = jest.fn();
    localStorage.setItem('token', 'test-token');
  });

  it('renders edit task form', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ title: 'Tarefa', priority: 'alta', deadline: '2025-07-03', status: 'pendente' })
    });
    renderWithRouter(<EditTask />);
    expect(await screen.findByLabelText(/Título/i)).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Tarefa')).toBeInTheDocument();
    const prioridadeSelect = await screen.findByLabelText(/Prioridade/i);
    expect(prioridadeSelect).toHaveValue('alta');
    expect(await screen.findByDisplayValue('2025-07-03')).toBeInTheDocument();
  });

  // it('shows error if fetch fails', async () => {
  //   (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
  //   renderWithRouter(<EditTask />);
  //   expect(await screen.findByText(/Erro ao carregar tarefa/i)).toBeInTheDocument();
  // });

  // it('can change fields and submit (success)', async () => {
  //   (fetch as jest.Mock).mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ title: 'Tarefa', priority: 'baixa', deadline: '2025-07-03', status: 'pendente' })
  //   });
  //   (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({}) });
  //   renderWithRouter(<EditTask />);
  //   await screen.findByLabelText(/Título/i);
  //   fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Nova tarefa' } });
  //   fireEvent.click(screen.getByText(/Salvar/i));
  //   expect(await screen.findByText(/Tarefa atualizada com sucesso/i)).toBeInTheDocument();
  //   await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  // });

  // it('shows error on submit fail', async () => {
  //   (fetch as jest.Mock).mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ title: 'Tarefa', priority: 'baixa', deadline: '2025-07-03', status: 'pendente' })
  //   });
  //   (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, json: async () => ({ message: 'Erro custom' }) });
  //   renderWithRouter(<EditTask />);
  //   await screen.findByLabelText(/Título/i);
  //   fireEvent.click(screen.getByText(/Salvar/i));
  //   expect(await screen.findByText(/Erro custom/)).toBeInTheDocument();
  // });

  // it('opens and closes delete modal', async () => {
  //   (fetch as jest.Mock).mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ title: 'Tarefa', priority: 'baixa', deadline: '2025-07-03', status: 'pendente' })
  //   });
  //   renderWithRouter(<EditTask />);
  //   await screen.findByLabelText(/Título/i);
  //   fireEvent.click(screen.getByText(/Excluir/i));
  //   expect(screen.getByText(/Tem certeza que deseja excluir/i)).toBeInTheDocument();
  //   fireEvent.click(screen.getByText(/Cancelar/i));
  //   expect(screen.queryByText(/Tem certeza que deseja excluir/i)).not.toBeInTheDocument();
  // });

  // it('deletes task (success)', async () => {
  //   (fetch as jest.Mock).mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ title: 'Tarefa', priority: 'baixa', deadline: '2025-07-03', status: 'pendente' })
  //   });
  //   (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({}) });
  //   renderWithRouter(<EditTask />);
  //   await screen.findByLabelText(/Título/i);
  //   fireEvent.click(screen.getByText(/Excluir/i));
  //   fireEvent.click(screen.getByText(/^Excluir$/i));
  //   await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  // });

  // it('shows error on delete fail', async () => {
  //   (fetch as jest.Mock).mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ title: 'Tarefa', priority: 'baixa', deadline: '2025-07-03', status: 'pendente' })
  //   });
  //   (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, json: async () => ({ message: 'Erro ao excluir' }) });
  //   renderWithRouter(<EditTask />);
  //   await screen.findByLabelText(/Título/i);
  //   fireEvent.click(screen.getByText(/Excluir/i));
  //   fireEvent.click(screen.getByText(/^Excluir$/i));
  //   // Wait for the error message to appear in the form
  //   const error = await screen.findByRole('alert');
  //   expect(error).toBeInTheDocument();
  //   expect(error).toHaveClass('form-error');
  //   expect(error.textContent).toMatch(/Erro ao excluir/i);
  // });
});
