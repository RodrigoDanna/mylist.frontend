// Unit tests for Logout page
import React from 'react';
import { render } from '@testing-library/react';
import * as router from 'react-router-dom';
import Logout from './Logout';

describe('Logout', () => {
  it('removes token and redirects', () => {
    const navigate = jest.fn();
    jest.spyOn(router, 'useNavigate').mockReturnValue(navigate);
    render(<Logout />);
    expect(navigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
