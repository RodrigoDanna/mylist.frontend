// Unit tests for ConfirmModal
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ConfirmModal from './ConfirmModal';
import { screen } from '@testing-library/react';

describe('ConfirmModal', () => {
  it('renders and handles confirm/cancel', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    render(
      <ConfirmModal open={true} message="Are you sure?" onConfirm={onConfirm} onCancel={onCancel} />
    );
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    screen.getByText('Cancelar').click();
    expect(onCancel).toHaveBeenCalled();
    screen.getByText('Confirmar').click();
    expect(onConfirm).toHaveBeenCalled();
  });

  it('does not render when open is false', () => {
    render(
      <ConfirmModal open={false} message="Hidden" onConfirm={jest.fn()} onCancel={jest.fn()} />
    );
    expect(screen.queryByText('Hidden')).toBeNull();
  });
});
