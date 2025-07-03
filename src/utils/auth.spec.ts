// Unit tests for auth utils
import { isAuthenticated, setToken, clearToken, getToken } from './auth';

describe('auth utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('setToken and getToken', () => {
    setToken('abc');
    expect(getToken()).toBe('abc');
  });

  it('isAuthenticated returns true if token exists', () => {
    setToken('abc');
    expect(isAuthenticated()).toBe(true);
  });

  it('isAuthenticated returns false if no token', () => {
    clearToken();
    expect(isAuthenticated()).toBe(false);
  });

  it('clearToken removes token', () => {
    setToken('abc');
    clearToken();
    expect(getToken()).toBeNull();
  });
  it('getToken returns null if token is not set', () => {
    localStorage.removeItem('token');
    expect(getToken()).toBeNull();
  });

  it('setToken overwrites existing token', () => {
    setToken('first');
    setToken('second');
    expect(getToken()).toBe('second');
  });
});
