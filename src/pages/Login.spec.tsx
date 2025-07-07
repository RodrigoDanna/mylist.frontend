  // Unit tests for Login page
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as authUtils from '../utils/auth';
import { Login } from './Login';

it('shows error message on network error', async () => {
    jest.spyOn(authUtils, 'isAuthenticated').mockReturnValue(false);
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    await userEvent.type(screen.getByPlaceholderText(/E-mail/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText(/Senha/i), 'password');
    await userEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    expect(await screen.findByText(/Ocorreu um erro/i)).toBeInTheDocument();
  });

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Login', () => {
  it('renders login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('redirects if already authenticated', () => {
    jest.spyOn(authUtils, 'isAuthenticated').mockReturnValue(true);
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  it('shows error message on failed login', async () => {
    jest.spyOn(authUtils, 'isAuthenticated').mockReturnValue(false);
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Usuário ou Senha inválidos' })
    });
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    // Fill and submit form
    await userEvent.type(screen.getByPlaceholderText(/E-mail/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText(/Senha/i), 'password');
    await userEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    // Wait for error message
    expect(await screen.findByText(/Usuário ou Senha inválidos/i)).toBeInTheDocument();
  });

  it('shows success message and redirects on successful login', async () => {
    jest.spyOn(authUtils, 'isAuthenticated').mockReturnValue(false);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => 'mock-token'
    });
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    // Fill and submit form
    await userEvent.type(screen.getByPlaceholderText(/E-mail/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText(/Senha/i), 'password');
    await userEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    // Wait for success message
    expect(await screen.findByText(/Login realizado com sucesso/i)).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBe('mock-token');
    expect(mockNavigate).toHaveBeenCalledWith('/list');
  });
});
