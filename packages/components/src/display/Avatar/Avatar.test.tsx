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
    const avatar = screen.getByTestId('avatar');
    expect(avatar.props.accessibilityRole).toBe('image');
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

  describe('size variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      it(`renders with size="${size}"`, () => {
        render(<Avatar size={size} initials="AB" testID={`avatar-${size}`} />);
        expect(screen.getByTestId(`avatar-${size}`)).toBeTruthy();
      });
    });
  });

  describe('image source', () => {
    it('renders image when source is provided', () => {
      render(
        <Avatar
          source={{ uri: 'https://example.com/photo.png' }}
          testID="avatar"
        />,
      );
      expect(screen.getByTestId('avatar')).toBeTruthy();
    });

    it('does not render initials when source is provided', () => {
      render(
        <Avatar
          source={{ uri: 'https://example.com/photo.png' }}
          initials="AB"
          testID="avatar"
        />,
      );
      expect(screen.queryByText('AB')).toBeNull();
    });
  });

  describe('initials formatting', () => {
    it('renders single character initial uppercased', () => {
      render(<Avatar initials="a" testID="avatar" />);
      expect(screen.getByText('A')).toBeTruthy();
    });

    it('renders exactly 2 characters for 2-char input', () => {
      render(<Avatar initials="ab" testID="avatar" />);
      expect(screen.getByText('AB')).toBeTruthy();
    });

    it('truncates 3+ character string to first 2 characters', () => {
      render(<Avatar initials="john" testID="avatar" />);
      expect(screen.getByText('JO')).toBeTruthy();
      expect(screen.queryByText('JOHN')).toBeNull();
    });

    it('truncates long string to first 2 characters', () => {
      render(<Avatar initials="Alexander" testID="avatar" />);
      expect(screen.getByText('AL')).toBeTruthy();
    });
  });

  describe('style override', () => {
    it('accepts custom style', () => {
      render(<Avatar style={{ margin: 10 }} testID="avatar" />);
      expect(screen.getByTestId('avatar')).toBeTruthy();
    });
  });
});
