import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
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
  
  it('renders AppRoutes inside BrowserRouter', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('redirects to /list if authenticated and path is unknown', () => {
    // Mock isAuthenticated to return true
    jest.spyOn(require('./utils/auth'), 'isAuthenticated').mockReturnValue(true);
    render(<App />);
    expect(screen.getByRole('heading', { name: /listagem de tarefas/i })).toBeInTheDocument();
    jest.restoreAllMocks();
  });
});