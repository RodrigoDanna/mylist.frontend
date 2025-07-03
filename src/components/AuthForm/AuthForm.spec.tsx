// Unit tests for AuthForm
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AuthForm from './AuthForm';

import { screen } from '@testing-library/react';
describe('AuthForm', () => {
  const baseProps = {
    type: 'login' as const,
    onSubmit: jest.fn(),
    error: '',
    message: ''
  };

  it('renders login form', () => {
    render(<AuthForm {...baseProps} />);
    expect(screen.getByText(/Para entrar/i)).toBeInTheDocument();
  });

  it('renders register form', () => {
    render(<AuthForm {...baseProps} type="register" />);
    expect(screen.getByText(/Registre-se/i)).toBeInTheDocument();
  });

  it('renders recover form', () => {
    render(<AuthForm {...baseProps} type="recover" />);
    expect(screen.getByText(/Informe seu e-mail/i)).toBeInTheDocument();
  });

  it('calls onSubmit on submit', async () => {
    const onSubmit = jest.fn();
    render(<AuthForm {...baseProps} onSubmit={onSubmit} />);
    const form = screen.getByRole('form');
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    expect(onSubmit).toHaveBeenCalled();
  });
});
