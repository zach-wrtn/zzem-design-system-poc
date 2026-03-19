import React from 'react';
import { render, screen } from '../../test-utils';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders with testID', () => {
    render(<Badge label="New" testID="badge" />);
    expect(screen.getByTestId('badge')).toBeTruthy();
  });

  it('renders label text', () => {
    render(<Badge label="New" testID="badge" />);
    expect(screen.getByText('New')).toBeTruthy();
  });

  it('applies accessibility role text', () => {
    render(<Badge label="New" testID="badge" />);
    expect(screen.getByRole('text')).toBeTruthy();
  });

  it('applies accessibility label', () => {
    render(<Badge label="New" accessibilityLabel="New badge" testID="badge" />);
    expect(screen.getByLabelText('New badge')).toBeTruthy();
  });
});
