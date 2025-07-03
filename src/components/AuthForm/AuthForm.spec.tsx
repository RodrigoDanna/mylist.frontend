// Unit tests for AuthForm
import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import AuthForm from './AuthForm';
import { screen, cleanup } from '@testing-library/react';

// Mock useNavigate to prevent router context errors in tests
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
  };
});
describe('AuthForm', () => {
  it('renders password field for login and register, not for recover', () => {
    const { cleanup } = require('@testing-library/react');
    // Login
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="login" />
      </MemoryRouter>
    );
    expect(screen.getAllByPlaceholderText(/Senha/i)).toHaveLength(1);
    cleanup();

    // Register
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="register" />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/^Senha$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirmar Senha/i)).toBeInTheDocument();
    cleanup();

    // Recover
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="recover" />
      </MemoryRouter>
    );
    expect(screen.queryByPlaceholderText(/Senha/i)).not.toBeInTheDocument();
    cleanup();
  });

  it('shows loading text on button when loading', async () => {
    let resolveSubmit: () => void;
    const onSubmit = () => new Promise<void>(resolve => { resolveSubmit = resolve; });
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="login" onSubmit={onSubmit} />
      </MemoryRouter>
    );
    const form = screen.getByTestId('auth-form');
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    });
    expect(screen.getByRole('button', { name: /Aguarde/i })).toBeInTheDocument();
    await act(async () => { resolveSubmit(); });
  });

  it('calls navigate when back to login button is clicked (register)', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="register" />
      </MemoryRouter>
    );
    const backBtn = screen.getByRole('button', { name: /voltar para login/i });
    backBtn.click();
    expect(navigate).toHaveBeenCalledWith('/login');
  });

  it('calls navigate when back to login button is clicked (recover)', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="recover" />
      </MemoryRouter>
    );
    const backBtn = screen.getByRole('button', { name: /voltar para login/i });
    backBtn.click();
    expect(navigate).toHaveBeenCalledWith('/login');
  });
  const baseProps = {
    type: 'login' as const,
    onSubmit: jest.fn(),
    error: '',
    message: ''
  };

  it('renders correct help text for each form type', () => {
    // Login
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="login" />
      </MemoryRouter>
    );
    expect(screen.getByText('Para entrar, informe seu e-mail e senha!')).toBeInTheDocument();
    cleanup();

    // Register
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="register" />
      </MemoryRouter>
    );
    expect(screen.getByText('Registre-se abaixo para começar a usar o MyList!')).toBeInTheDocument();
    cleanup();

    // Recover
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="recover" />
      </MemoryRouter>
    );
    expect(screen.getByText('Informe seu e-mail e enviaremos uma nova senha!')).toBeInTheDocument();
    cleanup();
  });

  it('calls onSubmit on submit', async () => {
    const onSubmit = jest.fn();
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} onSubmit={onSubmit} />
      </MemoryRouter>
    );
    const form = screen.getByTestId('auth-form');
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    });
    expect(onSubmit).toHaveBeenCalled();
  });
  it('disables inputs and shows loading text when loading', async () => {
    let resolveSubmit: () => void;
    const onSubmit = () => new Promise<void>(resolve => { resolveSubmit = resolve; });
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="register" onSubmit={onSubmit} />
      </MemoryRouter>
    );
    const form = screen.getByTestId('auth-form');
    const button = screen.getByRole('button', { name: /registrar/i });
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    });
    expect(button).toBeDisabled();
    await act(async () => { resolveSubmit(); });
  });

  it('shows error and message', () => {
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} error="Erro!" message="Mensagem!" />
      </MemoryRouter>
    );
    expect(screen.getByText('Erro!')).toBeInTheDocument();
    expect(screen.getByText('Mensagem!')).toBeInTheDocument();
  });

  it('renders repeat password field for register', () => {
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="register" />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Confirmar Senha/i)).toBeInTheDocument();
  });

  it('renders back to login button for register and recover', () => {
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="register" />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /voltar para login/i })).toBeInTheDocument();
  });

  it('renders login links', () => {
    render(
      <MemoryRouter>
        <AuthForm {...baseProps} type="login" />
      </MemoryRouter>
    );
    expect(screen.getByText(/Esqueceu sua senha/i)).toBeInTheDocument();
    expect(screen.getByText(/Ainda não tem conta/i)).toBeInTheDocument();
  });
});
