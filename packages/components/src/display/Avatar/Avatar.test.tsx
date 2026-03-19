import React from 'react';
import { render, screen } from '../../test-utils';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders with testID', () => {
    render(<Avatar testID="avatar" />);
    expect(screen.getByTestId('avatar')).toBeTruthy();
  });

  it('renders initials (shows first 2 chars uppercased)', () => {
    render(<Avatar initials="john" testID="avatar" />);
    expect(screen.getByText('JO')).toBeTruthy();
  });

  it('applies accessibility role image', () => {
    render(<Avatar testID="avatar" />);
    expect(screen.getByRole('image')).toBeTruthy();
  });

  it('applies accessibility label from prop', () => {
    render(<Avatar accessibilityLabel="User avatar" testID="avatar" />);
    expect(screen.getByLabelText('User avatar')).toBeTruthy();
  });

  it('uses initials as fallback accessibility label', () => {
    render(<Avatar initials="AB" testID="avatar" />);
    expect(screen.getByLabelText('AB')).toBeTruthy();
  });

  it('uses Avatar as fallback accessibility label when no initials', () => {
    render(<Avatar testID="avatar" />);
    expect(screen.getByLabelText('Avatar')).toBeTruthy();
  });
});
