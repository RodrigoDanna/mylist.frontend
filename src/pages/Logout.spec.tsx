// Unit tests for Logout page
import React from 'react';

import { render } from '@testing-library/react';
import Logout from './Logout';

// Mock useNavigate once at the top level
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Logout', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });


  it('removes token and redirects', () => {
    localStorage.setItem('token', 'test-token');
    render(<Logout />);
    expect(localStorage.getItem('token')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });

  it('does not throw if token is not present', () => {
    expect(() => render(<Logout />)).not.toThrow();
    expect(localStorage.getItem('token')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});