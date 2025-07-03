// Unit tests for TaskCard
import React from 'react';
import { render } from '@testing-library/react';
import TaskCard from './TaskCard';
import { screen, fireEvent } from '@testing-library/react';
import { Task } from '../../types/TaskTypes';

describe('TaskCard', () => {
  const baseProps = {
    id: '1',
    title: 'Test',
    priority: 'alta' as Task['priority'],
    status: 'pendente' as Task['status'],
    onStatusChange: jest.fn()
  };

  it('renders with title', () => {
    render(<TaskCard {...baseProps} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onStatusChange when checkbox is changed', () => {
    render(<TaskCard {...baseProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(baseProps.onStatusChange).toHaveBeenCalled();
  });

  it('navigates on edit button click', () => {
    render(<TaskCard {...baseProps} />);
    const editBtn = screen.getByRole('button');
    fireEvent.click(editBtn);
  });
});
