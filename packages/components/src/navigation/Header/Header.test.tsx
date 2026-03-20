import React from 'react';
import { Text as RNText } from 'react-native';
import { render, screen, fireEvent } from '../../test-utils';
import { Header } from './Header';

describe('Header', () => {
  it('renders with testID', () => {
    render(<Header title="Title" testID="header" />);
    expect(screen.getByTestId('header')).toBeTruthy();
  });

  it('renders title text', () => {
    render(<Header title="My Header" testID="header" />);
    expect(screen.getByText('My Header')).toBeTruthy();
  });

  it('renders left content', () => {
    render(
      <Header title="Title" left={<RNText>Back</RNText>} testID="header" />,
    );
    expect(screen.getByText('Back')).toBeTruthy();
  });

  it('renders right content', () => {
    render(
      <Header title="Title" right={<RNText>Menu</RNText>} testID="header" />,
    );
    expect(screen.getByText('Menu')).toBeTruthy();
  });

  it('has header accessibility role', () => {
    render(<Header title="Title" testID="header" />);
    const header = screen.getByTestId('header');
    expect(header.props.accessibilityRole).toBe('header');
  });

  describe('header with no left/right content', () => {
    it('renders with only title', () => {
      render(<Header title="Page Title" testID="header" />);
      expect(screen.getByText('Page Title')).toBeTruthy();
      expect(screen.getByTestId('header')).toBeTruthy();
    });

    it('renders without left content', () => {
      render(
        <Header title="Title" right={<RNText>Action</RNText>} testID="header" />,
      );
      expect(screen.getByText('Action')).toBeTruthy();
      expect(screen.getByText('Title')).toBeTruthy();
    });

    it('renders without right content', () => {
      render(
        <Header title="Title" left={<RNText>Back</RNText>} testID="header" />,
      );
      expect(screen.getByText('Back')).toBeTruthy();
      expect(screen.getByText('Title')).toBeTruthy();
    });
  });

  describe('header with all slots filled', () => {
    it('renders left, title, and right simultaneously', () => {
      render(
        <Header
          title="Settings"
          left={<RNText>Back</RNText>}
          right={<RNText>Save</RNText>}
          testID="header"
        />,
      );
      expect(screen.getByText('Back')).toBeTruthy();
      expect(screen.getByText('Settings')).toBeTruthy();
      expect(screen.getByText('Save')).toBeTruthy();
    });
  });

  describe('style override', () => {
    it('accepts custom style', () => {
      render(<Header title="Title" style={{ backgroundColor: 'red' }} testID="header" />);
      expect(screen.getByTestId('header')).toBeTruthy();
    });
  });
});
