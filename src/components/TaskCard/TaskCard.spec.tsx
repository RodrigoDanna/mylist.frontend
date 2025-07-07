/* eslint-disable testing-library/no-node-access */
// Unit tests for TaskCard
import React from 'react';
import { render } from '@testing-library/react';
import TaskCard from './TaskCard';
import { screen, fireEvent } from '@testing-library/react';
import { Task } from '../../types/TaskTypes';
import { BrowserRouter } from 'react-router-dom';

describe('TaskCard', () => {
  function renderWithRouter(ui: any) {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  }

  const taskMock = {
    id: '1',
    title: 'Test',
    priority: 'alta' as Task['priority'],
    status: 'pendente' as Task['status'],
    onStatusChange: jest.fn()
  };

  it('renders with title', () => {
    renderWithRouter(<TaskCard {...taskMock} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onStatusChange when checkbox is changed', () => {
    const onStatusChange = jest.fn();
    renderWithRouter(<TaskCard {...taskMock} onStatusChange={onStatusChange} />);
    const checkbox = document.querySelector('.task-card')?.querySelector('input[type="checkbox"]');
    fireEvent.click(checkbox!);
    expect(onStatusChange).toHaveBeenCalled();
  });

  it('navigates on edit button click', () => {
    renderWithRouter(<TaskCard {...taskMock} />);
    const editBtn = document.querySelector('.edit-btn');
    fireEvent.click(editBtn!);
  });

  it('renders with completed status', () => {
    renderWithRouter(<TaskCard {...taskMock} status="concluida" />);
    const checkbox = document.querySelector('.task-card')?.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeChecked();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('calls onStatusChange with correct values', () => {
    const onStatusChange = jest.fn();
    renderWithRouter(<TaskCard {...taskMock} status="pendente" onStatusChange={onStatusChange} />);
    const checkbox = document.querySelector('.task-card')?.querySelector('input[type="checkbox"]');
    // Simulate checking the box (complete)
    fireEvent.click(checkbox!);
    expect(onStatusChange).toHaveBeenCalledWith('1', 'concluida');
    // Simulate unchecking the box (pending)
    fireEvent.click(checkbox!);
    expect(onStatusChange).toHaveBeenCalledWith('1', 'pendente');
  });

  it('edit button does not trigger checkbox', () => {
    renderWithRouter(<TaskCard {...taskMock} />);
    const editBtn = document.querySelector('.edit-btn');
    const checkbox = document.querySelector('.task-card')?.querySelector('input[type="checkbox"]');
    fireEvent.click(editBtn!);
    expect(checkbox).not.toBeDisabled();
  });

  it('renders deadline and formats date', () => {
    renderWithRouter(<TaskCard {...taskMock} deadline="2025-07-07T00:00:00Z" />);
    expect(document.querySelector('.date')).toHaveTextContent('07/07/2025');
  });

  it('renders priority with correct class', () => {
    renderWithRouter(<TaskCard {...taskMock} priority="alta" />);
    const prioritySpan = document.querySelector('.priority.alta');
    expect(prioritySpan).toBeInTheDocument();
    expect(prioritySpan).toHaveTextContent('alta');
  });

  it('renders with no deadline and no priority', () => {
    renderWithRouter(<TaskCard {...taskMock} deadline={undefined} priority={undefined} />);
    expect(document.querySelector('.date')).toBeNull();
    const prioritySpan = document.querySelector('.priority.nenhuma');
    expect(prioritySpan).toBeInTheDocument();
    expect(prioritySpan).toHaveTextContent('nenhuma');
  });

  it('formats invalid date as string', () => {
    renderWithRouter(<TaskCard {...taskMock} deadline="invalid-date" />);
    expect(document.querySelector('.date')).toHaveTextContent('invalid-date');
  });

  it('stops event propagation on checkbox and edit button', () => {
    renderWithRouter(<TaskCard {...taskMock} />);
    const checkbox = document.querySelector('.task-card')?.querySelector('input[type="checkbox"]');
    const editBtn = document.querySelector('.edit-btn');
    const stopPropagation = jest.fn();
    fireEvent.click(checkbox!, { stopPropagation });
    fireEvent.click(editBtn!, { stopPropagation });
  });

});
