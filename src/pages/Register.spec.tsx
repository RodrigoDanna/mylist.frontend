// Unit tests for Register page
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Register } from './Register';

describe('Register', () => {
  it('renders register form', () => {
    render(<Register />);
    expect(screen.getByText(/Cadastro/i)).toBeInTheDocument();
  });
});
