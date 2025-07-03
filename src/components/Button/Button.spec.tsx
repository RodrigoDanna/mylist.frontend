// Unit tests for Button
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { screen } from '@testing-library/react';

describe('Button', () => {
  it('renders and handles click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Button className="test-class">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('test-class');
  });
});
