// Unit tests for TaskFilterPanel
import React from 'react';
import { render } from '@testing-library/react';
import TaskFilterPanel from './TaskFilterPanel';
import { screen, fireEvent } from '@testing-library/react';
import { SortOption, FilterOptions } from '../../types/TaskTypes';

describe('TaskFilterPanel', () => {
  const baseProps = {
    isOpen: true,
    onClose: jest.fn(),
    filterOptions: { high: false, medium: false, low: false, withDeadline: false, withoutDeadline: false, completed: false, pending: false } as FilterOptions,
    setFilterOptions: jest.fn(),
    sortOption: 'created-desc' as SortOption,
    setSortOption: jest.fn()
  };

  it('renders open panel', () => {
    render(<TaskFilterPanel {...baseProps} />);
    expect(screen.getByText('Ordenar por')).toBeInTheDocument();
    expect(screen.getByText('Filtrar por')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<TaskFilterPanel {...baseProps} />);
    const closeBtn = screen.getByRole('img');
    fireEvent.click(closeBtn);
    expect(baseProps.onClose).toHaveBeenCalled();
  });
});
