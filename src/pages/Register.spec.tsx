// Unit tests for Register page
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Register } from './Register';

import { MemoryRouter } from 'react-router-dom';

describe('Register', () => {
  it('renders register form', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cadastro/i)).toBeInTheDocument();
  });
});
