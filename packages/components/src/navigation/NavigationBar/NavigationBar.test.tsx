import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { NavigationBar } from './NavigationBar';

describe('NavigationBar', () => {
  it('renders with testID', () => {
    render(<NavigationBar title="Page" testID="navbar" />);
    expect(screen.getByTestId('navbar')).toBeTruthy();
  });

  it('renders title', () => {
    render(<NavigationBar title="Settings" testID="navbar" />);
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('renders large title', () => {
    render(<NavigationBar title="Settings" largeTitle testID="navbar" />);
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('calls leftAction onPress', () => {
    const onPress = jest.fn();
    render(
      <NavigationBar
        title="Page"
        leftAction={{ label: 'Back', onPress }}
        testID="navbar"
      />,
    );
    fireEvent.press(screen.getByText('Back'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders right actions', () => {
    const onPress = jest.fn();
    render(
      <NavigationBar
        title="Page"
        rightActions={[
          { label: 'Save', onPress },
          { label: 'Share', onPress },
        ]}
        testID="navbar"
      />,
    );
    expect(screen.getByText('Save')).toBeTruthy();
    expect(screen.getByText('Share')).toBeTruthy();
  });

  it('applies accessibility role header', () => {
    render(<NavigationBar title="Page" testID="navbar" />);
    const navbar = screen.getByTestId('navbar');
    expect(navbar.props.accessibilityRole).toBe('header');
  });

  describe('large title rendering', () => {
    it('renders title in large title area when largeTitle is true', () => {
      render(
        <NavigationBar title="Explore" largeTitle testID="navbar" />,
      );
      expect(screen.getByText('Explore')).toBeTruthy();
    });

    it('renders title in center when largeTitle is false', () => {
      render(
        <NavigationBar title="Explore" largeTitle={false} testID="navbar" />,
      );
      expect(screen.getByText('Explore')).toBeTruthy();
    });
  });

  describe('multiple right actions', () => {
    it('renders multiple right action buttons', () => {
      const onSave = jest.fn();
      const onShare = jest.fn();
      const onMore = jest.fn();
      render(
        <NavigationBar
          title="Page"
          rightActions={[
            { label: 'Save', onPress: onSave },
            { label: 'Share', onPress: onShare },
            { label: 'More', onPress: onMore },
          ]}
          testID="navbar"
        />,
      );
      expect(screen.getByText('Save')).toBeTruthy();
      expect(screen.getByText('Share')).toBeTruthy();
      expect(screen.getByText('More')).toBeTruthy();
    });
  });

  describe('no leftAction variant', () => {
    it('renders without left action', () => {
      render(<NavigationBar title="Home" testID="navbar" />);
      expect(screen.getByText('Home')).toBeTruthy();
      expect(screen.getByTestId('navbar')).toBeTruthy();
    });

    it('does not render back button when leftAction is not provided', () => {
      render(<NavigationBar title="Home" testID="navbar" />);
      expect(screen.queryByLabelText('뒤로')).toBeNull();
    });
  });

  describe('right action onPress', () => {
    it('calls correct onPress handler for each right action', () => {
      const onSave = jest.fn();
      const onShare = jest.fn();
      render(
        <NavigationBar
          title="Page"
          rightActions={[
            { label: 'Save', onPress: onSave },
            { label: 'Share', onPress: onShare },
          ]}
          testID="navbar"
        />,
      );
      fireEvent.press(screen.getByText('Save'));
      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onShare).not.toHaveBeenCalled();

      fireEvent.press(screen.getByText('Share'));
      expect(onShare).toHaveBeenCalledTimes(1);
    });
  });

  describe('left action accessibility', () => {
    it('left action has button role', () => {
      const onPress = jest.fn();
      render(
        <NavigationBar
          title="Page"
          leftAction={{ label: 'Back', onPress }}
          testID="navbar"
        />,
      );
      expect(screen.getByLabelText('Back')).toBeTruthy();
    });

    it('left action defaults accessibility label to 뒤로 when no label', () => {
      const onPress = jest.fn();
      render(
        <NavigationBar
          title="Page"
          leftAction={{ onPress }}
          testID="navbar"
        />,
      );
      expect(screen.getByLabelText('뒤로')).toBeTruthy();
    });
  });

  describe('right action accessibility', () => {
    it('right actions have accessibility labels', () => {
      const onPress = jest.fn();
      render(
        <NavigationBar
          title="Page"
          rightActions={[{ label: 'Settings', onPress }]}
          testID="navbar"
        />,
      );
      expect(screen.getByLabelText('Settings')).toBeTruthy();
    });
  });
});
