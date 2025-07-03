// Unit tests for Recover page
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Recover } from './Recover';

import { MemoryRouter } from 'react-router-dom';

describe('Recover', () => {
  // Silence expected console.error in tests
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    (console.error as jest.Mock).mockRestore?.();
  });

  it('renders recover form', () => {
    render(
      <MemoryRouter>
        <Recover />
      </MemoryRouter>
    );
    expect(screen.getByText(/Recupera/i)).toBeInTheDocument();
  });

  it('shows error message on network error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    render(
      <MemoryRouter>
        <Recover />
      </MemoryRouter>
    );
    // Fill and submit form
    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await (await import('@testing-library/user-event')).default.type(emailInput, 'test@example.com');
    await (await import('@testing-library/user-event')).default.click(submitButton);
    expect(await screen.findByText(/Erro ao recuperar senha/i)).toBeInTheDocument();
  });

  it('shows error message from API', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Email não encontrado' })
    });
    render(
      <MemoryRouter>
        <Recover />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await (await import('@testing-library/user-event')).default.type(emailInput, 'notfound@example.com');
    await (await import('@testing-library/user-event')).default.click(submitButton);
    expect(await screen.findByText(/Email não encontrado/i)).toBeInTheDocument();
  });

  it('shows success message from API', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Email enviado com sucesso' })
    });
    render(
      <MemoryRouter>
        <Recover />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await (await import('@testing-library/user-event')).default.type(emailInput, 'success@example.com');
    await (await import('@testing-library/user-event')).default.click(submitButton);
    expect(await screen.findByText(/Email enviado com sucesso/i)).toBeInTheDocument();
  });
});
