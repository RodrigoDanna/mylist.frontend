// Unit tests for EditTask page


import { render, screen, fireEvent, waitFor, cleanup, within } from '@testing-library/react';
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

  afterEach(() => {
    cleanup();
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

  it('shows error if fetch fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    renderWithRouter(<EditTask />);
    expect(await screen.findByText(/Erro ao carregar tarefa/i)).toBeInTheDocument();
  });

  it('can change fields and submit (success)', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ title: 'Tarefa', priority: 'baixa', deadline: '2025-07-03', status: 'pendente' })
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    renderWithRouter(<EditTask />);
    await screen.findByLabelText(/Título/i);
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Nova tarefa' } });
    fireEvent.click(screen.getByText(/Salvar/i));
    // Wait for loading state to show and then reset
    expect(await screen.findByText(/Salvando.../i)).toBeInTheDocument();
    expect(await screen.findByText(/Tarefa atualizada com sucesso/i)).toBeInTheDocument();
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });

  it('shows error on submit fail', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ title: 'Tarefa', priority: 'baixa', deadline: '2025-07-03', status: 'pendente' })
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, json: async () => ({ message: 'Erro ao atualizar tarefa' }) });
    renderWithRouter(<EditTask />);
    await screen.findByLabelText(/Título/i);
    const saveButton = await screen.findByText(/Salvar/i);
    fireEvent.click(saveButton);
    expect(await screen.findByText(/Salvando.../i)).toBeInTheDocument();
    expect(await screen.findByText(/Erro ao atualizar tarefa/)).toBeInTheDocument();
  });

  it('opens and closes delete modal', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ title: 'Tarefa', priority: 'baixa', deadline: '2025-07-03', status: 'pendente' })
    });
    renderWithRouter(<EditTask />);
    await screen.findByLabelText(/Título/i);
    const excludeButton = screen.getByText(/Excluir/i);
    await waitFor(() => expect(excludeButton).not.toBeDisabled());
    fireEvent.click(excludeButton);
    expect(await screen.findByText(/Tem certeza que deseja excluir/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Cancelar/i));
    await waitFor(() => {
      expect(screen.queryByText(/Tem certeza que deseja excluir/i)).not.toBeInTheDocument();
    });
  });

  it('deletes task (success)', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ title: 'Tarefa', priority: 'baixa', deadline: '2025-07-03', status: 'pendente' })
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    renderWithRouter(<EditTask />);
    await screen.findByLabelText(/Título/i);
    const excludeButton = screen.getByText(/Excluir/i);
    await waitFor(() => expect(excludeButton).not.toBeDisabled());
    fireEvent.click(excludeButton); // open modal
    // Wait for modal to appear
    expect(await screen.findByText(/Tem certeza que deseja excluir/i)).toBeInTheDocument();
    // Click the Excluir button inside the modal
    // eslint-disable-next-line testing-library/no-node-access
    const modal = document.querySelector('.confirm-modal');
    const modalDeleteButton = within(modal as HTMLElement).getByText(/^Excluir$/i);
    fireEvent.click(modalDeleteButton);
    // Wait for modal to disappear
    await waitFor(() => {
      expect(screen.queryByText(/Tem certeza que deseja excluir/i)).not.toBeInTheDocument();
    });
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/Tarefa excluída com sucesso/i)).toBeInTheDocument();
    });
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });

  it('shows error on delete fail', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ title: 'Tarefa', priority: 'baixa', deadline: '2025-07-03', status: 'pendente' })
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, json: async () => ({ message: 'Erro ao excluir' }) });
    renderWithRouter(<EditTask />);
    await screen.findByLabelText(/Título/i);
    const excludeButton = screen.getByText(/Excluir/i);
    await waitFor(() => expect(excludeButton).not.toBeDisabled());
    fireEvent.click(excludeButton); // open modal
    // Wait for modal to appear
    expect(await screen.findByText(/Tem certeza que deseja excluir/i)).toBeInTheDocument();
    // Click the Excluir button inside the modal
    // eslint-disable-next-line testing-library/no-node-access
    const modal = document.querySelector('.confirm-modal');
    const modalDeleteButton = within(modal as HTMLElement).getByText(/^Excluir$/i);
    fireEvent.click(modalDeleteButton);
    await waitFor(() => {
      expect(screen.getByText(/Erro ao excluir/i)).toBeInTheDocument();
    });
  });
});
