// Unit tests for ChangePassword page
import React from 'react';
import { render, screen } from '@testing-library/react';
import ChangePassword from './ChangePassword';

describe('ChangePassword', () => {
  it('renders change password form', () => {
    render(<ChangePassword />);
    expect(screen.getByText(/Senha Atual/i)).toBeInTheDocument();
  });
});
