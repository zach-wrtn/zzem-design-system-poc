import React from 'react';
import { render, screen } from '../../test-utils';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders with testID', () => {
    render(<Divider testID="divider" />);
    expect(screen.getByTestId('divider')).toBeTruthy();
  });

  it('renders horizontal by default', () => {
    const { getByTestId } = render(<Divider testID="divider" />);
    const divider = getByTestId('divider');
    expect(divider).toBeTruthy();
  });

  it('applies accessibility role none', () => {
    render(<Divider testID="divider" />);
    expect(screen.getByRole('none')).toBeTruthy();
  });
});
