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

  it('updates date overlay when date input changes', () => {
    const handleChange = jest.fn();
    render(<Input value="2025-07-03" onChange={handleChange} type="date" />);
    const input = screen.getByDisplayValue('2025-07-03');
    fireEvent.change(input, { target: { value: '2025-12-25' } });
    expect(screen.getByText('25/12/2025')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls showPicker and focuses input on date input click', () => {
    const showPicker = jest.fn();
    const focus = jest.fn();
    render(<Input value="2025-07-03" onChange={() => {}} type="date" />);
    const input = screen.getByDisplayValue('2025-07-03');
    // Patch input ref methods
    Object.defineProperty(input, 'showPicker', { value: showPicker });
    Object.defineProperty(input, 'focus', { value: focus });
    fireEvent.click(input);
    expect(focus).toHaveBeenCalled();
    expect(showPicker).toHaveBeenCalled();
  });

  it('does not call showPicker if not date input', () => {
    const showPicker = jest.fn();
    const focus = jest.fn();
    render(<Input value="foo" onChange={() => {}} type="text" />);
    const input = screen.getByDisplayValue('foo');
    Object.defineProperty(input, 'showPicker', { value: showPicker });
    Object.defineProperty(input, 'focus', { value: focus });
    fireEvent.click(input);
    expect(focus).not.toHaveBeenCalled();
    expect(showPicker).not.toHaveBeenCalled();
  });

  it('stops event propagation on input click', () => {
    render(<Input value="2025-07-03" onChange={() => {}} type="date" />);
    const input = screen.getByDisplayValue('2025-07-03');
    const event = new MouseEvent('click', { bubbles: true });
    event.stopPropagation = jest.fn();
    input.dispatchEvent(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });
  it('generates a unique id if not provided', () => {
    render(<Input value="foo" onChange={() => {}} label="UniqueLabel" />);
    const input = screen.getByDisplayValue('foo');
    expect(input.id).toMatch(/^input-uniquelabel/);
    const label = screen.getByText('UniqueLabel');
    expect(label).toHaveAttribute('for', input.id);
  });

  it('renders password toggle and toggles visibility', () => {
    render(<Input value="secret" onChange={() => {}} type="password" />);
    const button = screen.getByRole('button', { hidden: true });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const input = screen.getByDisplayValue('secret');
    expect(input).toHaveAttribute('type', 'text');
    fireEvent.click(button);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders date input as readOnly if readOnly prop is set', () => {
    render(<Input value="2025-07-03" onChange={() => {}} type="date" readOnly />);
    const input = screen.getByDisplayValue('2025-07-03');
    expect(input).toHaveAttribute('readOnly');
  });
});
