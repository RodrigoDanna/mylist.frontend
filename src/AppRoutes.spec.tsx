import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

describe('AppRoutes', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation((msg) => {
      if (
        typeof msg === 'string' &&
        msg.includes('React Router Future Flag Warning')
      ) {
        return;
      }
      // @ts-ignore
      return console.warn.original ? console.warn.original(msg) : undefined;
    });
  });

  afterAll(() => {
    // @ts-ignore
    if (console.warn.mockRestore) console.warn.mockRestore();
  });

  it('renders Login page on /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('renders Register page on /register', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /cadastro/i })).toBeInTheDocument();
  });

  it('renders Recover page on /recover', () => {
    render(
      <MemoryRouter initialEntries={['/recover']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /recuperação de senha/i })).toBeInTheDocument();
  });

  it('redirects to Login if not authenticated and path is /list', () => {
    render(
      <MemoryRouter initialEntries={['/list']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('redirects to /list if authenticated and path is unknown', () => {
    jest.spyOn(require('./utils/auth'), 'isAuthenticated').mockReturnValue(true);
    render(
      <MemoryRouter initialEntries={['/unknown-path']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /listagem de tarefas/i })).toBeInTheDocument();
    jest.restoreAllMocks();
  });
});
