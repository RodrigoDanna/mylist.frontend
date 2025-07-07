/* eslint-disable testing-library/no-node-access */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskList from './TaskList';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockClearToken = jest.fn();
jest.mock('../../utils/auth', () => ({
  ...jest.requireActual('../../utils/auth'),
  clearToken: () => mockClearToken(),
}));

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('TaskList', () => {
  let localStorageMock: Record<string, string> = {};
  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    localStorageMock = {};
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((...args: unknown[]) => {
      const key = args[0] as string;
      return localStorageMock[key] ?? null;
    });
    jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation((...args: unknown[]) => {
      const key = args[0] as string;
      const value = args[1] as string;
      localStorageMock[key] = value;
    });
    jest.spyOn(window.localStorage.__proto__, 'removeItem').mockImplementation((...args: unknown[]) => {
      const key = args[0] as string;
      delete localStorageMock[key];
    });
    fetchMock = jest.spyOn(window, 'fetch');
    mockNavigate.mockReset();
    mockClearToken.mockReset();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function renderList() {
    return render(
      <MemoryRouter>
        <TaskList />
      </MemoryRouter>
    );
  }

  it('shows loading then empty state (no tasks)', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => [],
    });
    renderList();
    expect(screen.getByText('Carregando tarefas...')).toBeInTheDocument();
    await screen.findByText(/Começe criando suas tarefas/i);
    expect(document.querySelector('.task-list-container')).toBeInTheDocument();
    expect(document.querySelector('.task-list-grid')).toBeInTheDocument();
    expect(document.querySelector('.plus-button')).toBeInTheDocument();
  });

  it('shows unauthorized and navigates to login', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({})
    });
    renderList();
    await flushPromises();
    expect(mockClearToken).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });

  it('shows error and empty state on fetch error', async () => {
    fetchMock.mockRejectedValueOnce(new Error('fail'));
    renderList();
    await screen.findByText(/Começe criando suas tarefas/i);
  });

  it('renders tasks, search, filter, sort, and status change', async () => {
    const tasks = [
      { id: '1', title: 'Task A', priority: 'alta', status: 'pendente', createdAt: '2024-01-01', updatedAt: '2024-01-02', deadline: '2024-12-31' },
      { id: '2', title: 'Task B', priority: 'baixa', status: 'concluida', createdAt: '2024-01-03', updatedAt: '2024-01-04' },
      { id: '3', title: 'Task C', priority: 'media', status: 'pendente', createdAt: '2024-01-05', updatedAt: '2024-01-06', deadline: '2024-11-30' },
    ];
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => tasks,
    });
    renderList();
    await waitFor(() => expect(document.querySelectorAll('.task-card').length).toBe(3));

    // Search
    const input = document.querySelector('.search-bar input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Task D' } });
    expect(screen.getByText('Nenhuma task encontrada')).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'Task A' } });
    expect(document.querySelectorAll('.task-card').length).toBe(1);

    // Open filter panel
    fireEvent.click(document.querySelector('.actions .icon[title="Filtrar tarefas"]')!);
    expect(document.querySelector('.task-filter-panel.open')).toBeInTheDocument();

    // Filter by high priority
    const highPriorityCheckbox = screen.getByLabelText('Prioridade Alta') as HTMLInputElement;
    fireEvent.click(highPriorityCheckbox);
    await waitFor(() => expect(document.querySelectorAll('.task-card').length).toBe(1));

    // Sort by deadline asc
    const sortSelect = document.querySelector('.task-filter-panel select') as HTMLSelectElement;
    fireEvent.change(sortSelect, { target: { value: 'deadline-asc' } });
    expect(sortSelect.value).toBe('deadline-asc');

    // Close filter panel
    fireEvent.click(document.querySelector('.close-btn')!);
    expect(document.querySelector('.task-filter-panel.open')).not.toBeInTheDocument();

    // Status change (checkbox)
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({}) });
    const firstCheckbox = document.querySelectorAll('.task-card input[type="checkbox"]')[0] as HTMLInputElement;
    fireEvent.click(firstCheckbox); // check
    await flushPromises();
    expect(firstCheckbox.checked).toBe(true);

    // Edit button
    const editBtn = document.querySelector('.task-card .edit-btn') as HTMLButtonElement;
    fireEvent.click(editBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/edit-task/1');

    // Plus button
    fireEvent.click(document.querySelector('.plus-button')!);
    expect(mockNavigate).toHaveBeenCalledWith('/add-task');
  });

  it('shows empty state for filtered out tasks', async () => {
    const tasks = [
      { id: '1', title: 'Task A', priority: 'alta', status: 'pendente', createdAt: '2024-01-01', updatedAt: '2024-01-02', deadline: '2024-12-31' },
    ];
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: async () => tasks });
    renderList();
    await waitFor(() => expect(document.querySelectorAll('.task-card').length).toBe(1));
    // Open filter panel and filter by completed (no completed tasks)
    fireEvent.click(document.querySelector('.actions .icon[title="Filtrar tarefas"]')!);
    const completedCheckbox = screen.getByLabelText('Concluídas') as HTMLInputElement;
    fireEvent.click(completedCheckbox);
    expect(screen.getByText('Nenhuma task encontrada')).toBeInTheDocument();
  });

  it('saves and loads sort/filter options from localStorage', async () => {
    localStorageMock['sortOption'] = 'priority-asc';
    localStorageMock['filterOptions'] = JSON.stringify({
      high: false, medium: false, low: false, withDeadline: false, withoutDeadline: false, completed: false, pending: false
    });
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: async () => [] });
    renderList();
    await screen.findByText(/Começe criando suas tarefas/i);
    // Changing sort updates localStorage
    fireEvent.click(document.querySelector('.actions .icon[title="Filtrar tarefas"]')!);
    const sortSelect = document.querySelector('.task-filter-panel select') as HTMLSelectElement;
    fireEvent.change(sortSelect, { target: { value: 'created-desc' } });
    expect(localStorageMock['sortOption']).toBe('created-desc');
  });
});
