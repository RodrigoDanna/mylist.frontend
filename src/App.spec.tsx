import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App routing', () => {
  it('renders Login page on /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('renders Register page on /register', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  });

  it('renders Recover page on /recover', () => {
    render(
      <MemoryRouter initialEntries={['/recover']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /recover/i })).toBeInTheDocument();
  });

  it('redirects to Login if not authenticated and path is /list', () => {
    render(
      <MemoryRouter initialEntries={['/list']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });
});