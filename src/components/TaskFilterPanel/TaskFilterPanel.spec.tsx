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
    // eslint-disable-next-line testing-library/no-node-access
    const closeBtn = document.querySelector('.close-btn');
    fireEvent.click(closeBtn!);
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  it('renders closed panel', () => {
    render(<TaskFilterPanel {...baseProps} isOpen={false} />);
    // eslint-disable-next-line testing-library/no-node-access
    const panel = document.querySelector('.task-filter-panel');
    expect(panel).not.toHaveClass('open');
  });

  it('calls setSortOption when sort option is changed', () => {
    render(<TaskFilterPanel {...baseProps} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'priority-asc' } });
    expect(baseProps.setSortOption).toHaveBeenCalledWith('priority-asc');
  });

  it('calls setFilterOptions when a filter checkbox is toggled', () => {
    render(<TaskFilterPanel {...baseProps} />);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(baseProps.setFilterOptions).toHaveBeenCalledWith({ ...baseProps.filterOptions, high: true });
  });

  it('checkboxes reflect filterOptions state', () => {
    const filterOptions = { high: true, medium: false, low: true, withDeadline: false, withoutDeadline: true, completed: false, pending: true };
    render(<TaskFilterPanel {...baseProps} filterOptions={filterOptions} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked(); // high
    expect(checkboxes[1]).not.toBeChecked(); // medium
    expect(checkboxes[2]).toBeChecked(); // low
    expect(checkboxes[3]).not.toBeChecked(); // withDeadline
    expect(checkboxes[4]).toBeChecked(); // withoutDeadline
    expect(checkboxes[5]).not.toBeChecked(); // completed
    expect(checkboxes[6]).toBeChecked(); // pending
  });

  it('renders all sort options', () => {
    render(<TaskFilterPanel {...baseProps} />);
    expect(screen.getByText('Data de Criação ↓')).toBeInTheDocument();
    expect(screen.getByText('Data de Criação ↑')).toBeInTheDocument();
    expect(screen.getByText('Data de Atualização ↓')).toBeInTheDocument();
    expect(screen.getByText('Data de Atualização ↑')).toBeInTheDocument();
    expect(screen.getByText('Prioridade ↓')).toBeInTheDocument();
    expect(screen.getByText('Prioridade ↑')).toBeInTheDocument();
    expect(screen.getByText('Prazo ↓')).toBeInTheDocument();
    expect(screen.getByText('Prazo ↑')).toBeInTheDocument();
  });
});
