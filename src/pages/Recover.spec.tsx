// Unit tests for Recover page
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Recover } from './Recover';

import { MemoryRouter } from 'react-router-dom';

describe('Recover', () => {
  it('renders recover form', () => {
    render(
      <MemoryRouter>
        <Recover />
      </MemoryRouter>
    );
    expect(screen.getByText(/Recupera/i)).toBeInTheDocument();
  });
});
