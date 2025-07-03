// Unit tests for Header
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders logo', () => {
    render(<Header />);
    expect(screen.getByAltText('MyList')).toBeInTheDocument();
  });

  it('renders search bar for list type', () => {
    render(<Header type="list" />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders return icon for return type', () => {
    render(<Header type="return" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
