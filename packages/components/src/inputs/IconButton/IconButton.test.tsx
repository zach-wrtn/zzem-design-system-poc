import React from 'react';
import { Text as RNText } from 'react-native';
import { render, screen, fireEvent } from '../../test-utils';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders with testID', () => {
    render(
      <IconButton
        icon={<RNText>★</RNText>}
        accessibilityLabel="Star"
        testID="icon-btn"
      />,
    );
    expect(screen.getByTestId('icon-btn')).toBeTruthy();
  });

  it('renders icon', () => {
    render(
      <IconButton
        icon={<RNText>★</RNText>}
        accessibilityLabel="Star"
        testID="icon-btn"
      />,
    );
    expect(screen.getByText('★')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(
      <IconButton
        icon={<RNText>★</RNText>}
        accessibilityLabel="Star"
        onPress={onPress}
        testID="icon-btn"
      />,
    );
    fireEvent.press(screen.getByTestId('icon-btn'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(
      <IconButton
        icon={<RNText>★</RNText>}
        accessibilityLabel="Star"
        onPress={onPress}
        disabled
        testID="icon-btn"
      />,
    );
    fireEvent.press(screen.getByTestId('icon-btn'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies accessibility label', () => {
    render(
      <IconButton
        icon={<RNText>★</RNText>}
        accessibilityLabel="Favorite"
        testID="icon-btn"
      />,
    );
    const button = screen.getByTestId('icon-btn');
    expect(button.props.accessibilityLabel).toBe('Favorite');
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)(
      'renders %s size without crashing',
      (size) => {
        render(
          <IconButton
            icon={<RNText>★</RNText>}
            accessibilityLabel="Star"
            size={size}
            testID={`icon-btn-${size}`}
          />,
        );
        expect(screen.getByTestId(`icon-btn-${size}`)).toBeTruthy();
      },
    );
  });

  describe('variants', () => {
    it.each(['filled', 'outlined', 'ghost'] as const)(
      'renders %s variant without crashing',
      (variant) => {
        render(
          <IconButton
            icon={<RNText>★</RNText>}
            accessibilityLabel="Star"
            variant={variant}
            testID={`icon-btn-${variant}`}
          />,
        );
        expect(screen.getByTestId(`icon-btn-${variant}`)).toBeTruthy();
      },
    );
  });

  describe('accessibility', () => {
    it('applies accessibilityRole button', () => {
      render(
        <IconButton
          icon={<RNText>★</RNText>}
          accessibilityLabel="Star"
          testID="icon-btn"
        />,
      );
      const button = screen.getByTestId('icon-btn');
      expect(button.props.accessibilityRole).toBe('button');
    });

    it('sets accessibilityState disabled when disabled', () => {
      render(
        <IconButton
          icon={<RNText>★</RNText>}
          accessibilityLabel="Star"
          disabled
          testID="icon-btn"
        />,
      );
      const button = screen.getByTestId('icon-btn');
      expect(button.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: true }),
      );
    });

    it('sets accessibilityState not disabled by default', () => {
      render(
        <IconButton
          icon={<RNText>★</RNText>}
          accessibilityLabel="Star"
          testID="icon-btn"
        />,
      );
      const button = screen.getByTestId('icon-btn');
      expect(button.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: false }),
      );
    });
  });
});
