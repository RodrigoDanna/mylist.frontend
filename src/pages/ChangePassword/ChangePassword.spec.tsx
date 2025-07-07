
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ChangePasswordPage from './ChangePassword';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const setup = () => {
  return render(
    <BrowserRouter>
      <ChangePasswordPage />
    </BrowserRouter>
  );
};

describe('ChangePasswordPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('token', 'test-token');
  });

  it('renders all input fields and buttons', () => {
    setup();
    expect(screen.getByLabelText(/Senha Atual/i)).toBeInTheDocument();
    const novaSenhaInputs = screen.getAllByLabelText(/Nova Senha/i);
    expect(novaSenhaInputs.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByLabelText(/Repetir Nova Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument();
  });

  it('shows error message on failed password change', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Erro ao alterar senha' }),
    });
    setup();
    const inputs = screen.getAllByLabelText(/Senha/i);
    fireEvent.change(inputs[0], { target: { value: 'oldpass' } });
    fireEvent.change(inputs[1], { target: { value: 'newpass' } });
    fireEvent.change(inputs[2], { target: { value: 'newpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));
    await waitFor(() => {
      expect(screen.getByText(/Erro ao alterar senha/i)).toBeInTheDocument();
    });
  });

  it('shows success message on successful password change', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    setup();
    const inputs = screen.getAllByLabelText(/Senha/i);
    fireEvent.change(inputs[0], { target: { value: 'oldpass' } });
    fireEvent.change(inputs[1], { target: { value: 'newpass' } });
    fireEvent.change(inputs[2], { target: { value: 'newpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));
    await waitFor(() => {
      expect(screen.getByText(/Senha alterada com sucesso/i)).toBeInTheDocument();
    });
  });

  it('navigates to /list when Cancelar is clicked', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /Cancelar/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/list');
  });

  it('disables Salvar button when loading', async () => {
    // Simulate fetch never resolving
    mockFetch.mockImplementation(() => new Promise(() => {}));
    const { container } = setup();
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const inputs = container.querySelectorAll('input[type="password"]');
    fireEvent.change(inputs[0], { target: { value: 'oldpass' } });
    fireEvent.change(inputs[1], { target: { value: 'newpass' } });
    fireEvent.change(inputs[2], { target: { value: 'newpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));
    expect(screen.getByRole('button', { name: /Salvando/i })).toBeDisabled();
  });
});
