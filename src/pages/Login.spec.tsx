// Unit tests for Login page
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as authUtils from '../utils/auth';
import { Login } from './Login';

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
});
