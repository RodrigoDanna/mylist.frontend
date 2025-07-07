/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
// Unit tests for Header
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  function renderWithRouter(ui: any) {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  }

  it('applies default class and not-fixed for return type when not scrolled', () => {
    const { container } = renderWithRouter(<Header type="return" />);
    // Simulate not scrolled (default)
    const header = container.querySelector('#header');
    expect(header).toHaveClass('header');
    expect(header).toHaveClass('not-fixed');
    expect(header).not.toHaveClass('scrolled');
  });
  
  it('renders logo', () => {
    renderWithRouter(<Header />);
    expect(screen.getByAltText('MyList')).toBeInTheDocument();
  });

  it('renders search bar for list type', () => {
    const { container } = renderWithRouter(<Header type="list" />);
    expect(container.querySelector('.search-bar input')).toBeInTheDocument();
  });

  it('renders return icon for return type', () => {
    const { container } = renderWithRouter(<Header type="return" />);
    expect(container.querySelector('.icon')).toBeInTheDocument();
  });

  it('calls onSearchTermChange when typing in search', () => {
    const onSearchTermChange = jest.fn();
    renderWithRouter(<Header type="list" onSearchTermChange={onSearchTermChange} />);
    fireEvent.change(screen.getByPlaceholderText('Pesquise sua tarefa'), { target: { value: 'abc' } });
    expect(onSearchTermChange).toHaveBeenCalledWith('abc');
  });

  it('opens filter panel when filter icon is clicked', () => {
    renderWithRouter(<Header type="list" filterOptions={{}} setFilterOptions={jest.fn()} sortOption={{}} setSortOption={jest.fn()} />);
    fireEvent.click(screen.getByTitle('Filtrar tarefas'));
    // Use Testing Library query
    expect(screen.getByText('Ordenar por')).toBeInTheDocument();
  });

  it('opens and closes menu dropdown', () => {
    renderWithRouter(<Header type="list" />);
    fireEvent.click(screen.getByTitle('Menu'));
    expect(screen.getByText('Trocar Senha')).toBeInTheDocument();
    expect(screen.getByText('Sair')).toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Menu'));
    expect(screen.queryByText('Trocar Senha')).not.toBeInTheDocument();
  });

  it('menu links navigate to correct routes', () => {
    renderWithRouter(<Header type="list" />);
    fireEvent.click(screen.getByTitle('Menu'));
    expect(screen.getByRole('link', { name: 'Trocar Senha' })).toHaveAttribute('href', '/change-password');
    expect(screen.getByRole('link', { name: 'Sair' })).toHaveAttribute('href', '/logout');
  });

  it('adds scrolled class on scroll', () => {
    const { container } = renderWithRouter(<Header type="list" />);
    Object.defineProperty(window, 'scrollY', { value: 20, writable: true });
    fireEvent.scroll(window);
    const header = container.querySelector('#header');
    expect(header).toHaveClass('scrolled');
  });
});
