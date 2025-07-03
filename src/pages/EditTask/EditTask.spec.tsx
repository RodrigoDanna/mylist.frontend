// Unit tests for EditTask page
import React from 'react';
import { render, screen } from '@testing-library/react';
import EditTask from './EditTask';

describe('EditTask', () => {
  it('renders edit task form', () => {
    render(<EditTask />);
    expect(screen.getByText(/Editar/i)).toBeInTheDocument();
  });
});
