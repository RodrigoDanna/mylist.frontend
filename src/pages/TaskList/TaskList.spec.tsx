// Unit tests for TaskList page
import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList', () => {
  it('renders task list', () => {
    render(<TaskList />);
    expect(screen.getByText(/Tarefas/i)).toBeInTheDocument();
  });
});
