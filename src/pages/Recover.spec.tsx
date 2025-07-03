// Unit tests for Recover page
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Recover } from './Recover';

describe('Recover', () => {
  it('renders recover form', () => {
    render(<Recover />);
    expect(screen.getByText(/Recupera/i)).toBeInTheDocument();
  });
});
