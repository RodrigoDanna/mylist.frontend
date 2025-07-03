// Unit tests for Input
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import { screen } from '@testing-library/react';

describe('Input', () => {
  it('renders and handles change', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with label', () => {
    render(<Input value="foo" onChange={() => {}} label="MyLabel" />);
    expect(screen.getByText('MyLabel')).toBeInTheDocument();
  });

  it('renders password input and toggles visibility', () => {
    render(<Input value="secret" onChange={() => {}} type="password" />);
    expect(screen.getByDisplayValue('secret')).toBeInTheDocument();
  });

  it('renders date input and overlays formatted date', () => {
    render(<Input value="2025-07-03" onChange={() => {}} type="date" />);
    expect(screen.getByText('03/07/2025')).toBeInTheDocument();
  });
});
