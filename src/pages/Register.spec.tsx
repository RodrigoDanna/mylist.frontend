// Unit tests for Register page
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Register } from './Register';

import { MemoryRouter } from 'react-router-dom';

// Mock AuthForm to control its rendering and simulate form submission
jest.mock('../components/AuthForm/AuthForm', () => (props: any) => {
  return (
    <div>
      <div>Cadastro</div>
      <button onClick={() => props.onSubmit && props.onSubmit({ email: 'test@email.com', password: '123' })} data-testid="submit-btn">Submit</button>
      {props.error && <div data-testid="error">{props.error}</div>}
      {props.message && <div data-testid="message">{props.message}</div>}
    </div>
  );
});

describe('Register', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, REACT_APP_API_URL: 'http://localhost' };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('renders register form', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cadastro/i)).toBeInTheDocument();
  });

  it('shows success message on successful registration', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({})
    });
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    screen.getByTestId('submit-btn').click();
    // Wait for message to appear
    await screen.findByTestId('message');
    expect(screen.getByTestId('message')).toHaveTextContent('Usuário registrado com sucesso! Faça login para continuar.');
  });

  it('shows error message from API on failed registration', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Email já existe' })
    });
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    screen.getByTestId('submit-btn').click();
    await screen.findByTestId('error');
    expect(screen.getByTestId('error')).toHaveTextContent('Email já existe');
  });

  it('shows error message on fetch/network error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    screen.getByTestId('submit-btn').click();
    await screen.findByTestId('error');
    expect(screen.getByTestId('error')).toHaveTextContent('Erro ao registrar usuário');
  });
});
