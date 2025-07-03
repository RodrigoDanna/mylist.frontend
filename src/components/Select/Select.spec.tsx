// Unit tests for Select
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from './Select';
import { screen } from '@testing-library/react';

describe('Select', () => {
  it('renders and handles change', () => {
    const handleChange = jest.fn();
    render(
      <Select
        value={''}
        onChange={handleChange}
        options={[{ value: '1', label: 'One' }, { value: '2', label: 'Two' }]}
      />
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders all options', () => {
    render(
      <Select
        value={''}
        onChange={() => {}}
        options={[{ value: '1', label: 'One' }, { value: '2', label: 'Two' }]}
      />
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });
});
