import React from 'react';
import { render, screen } from '../../test-utils';
import { Spacer } from './Spacer';

describe('Spacer', () => {
  it('renders with testID', () => {
    render(<Spacer size={16} testID="spacer" />);
    expect(screen.getByTestId('spacer')).toBeTruthy();
  });

  it('renders with vertical direction by default', () => {
    const { getByTestId } = render(<Spacer size={16} testID="spacer" />);
    const spacer = getByTestId('spacer');
    expect(spacer).toBeTruthy();
  });
});
