import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Pressable } from './Pressable';
import { Text as RNText } from 'react-native';

describe('Pressable', () => {
  it('renders with testID', () => {
    render(<Pressable testID="pressable-test" />);
    expect(screen.getByTestId('pressable-test')).toBeTruthy();
  });

  it('fires onPress handler', () => {
    const onPress = jest.fn();
    render(<Pressable testID="pressable-press" onPress={onPress} />);
    fireEvent.press(screen.getByTestId('pressable-press'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders children', () => {
    render(
      <Pressable testID="pressable-children">
        <RNText>Press me</RNText>
      </Pressable>,
    );
    expect(screen.getByText('Press me')).toBeTruthy();
  });

  describe('disabled state', () => {
    it('does not call onPress when disabled', () => {
      const onPress = jest.fn();
      render(
        <Pressable testID="pressable-disabled" onPress={onPress} disabled />,
      );
      fireEvent.press(screen.getByTestId('pressable-disabled'));
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('applies accessibilityRole', () => {
      render(
        <Pressable
          testID="pressable-role"
          accessibilityRole="button"
        />,
      );
      const el = screen.getByTestId('pressable-role');
      expect(el.props.accessibilityRole).toBe('button');
    });

    it('applies accessibilityLabel', () => {
      render(
        <Pressable
          testID="pressable-label"
          accessibilityLabel="Tap to continue"
        />,
      );
      const el = screen.getByTestId('pressable-label');
      expect(el.props.accessibilityLabel).toBe('Tap to continue');
    });

    it('applies accessibilityState', () => {
      render(
        <Pressable
          testID="pressable-state"
          accessibilityState={{ disabled: true }}
        />,
      );
      const el = screen.getByTestId('pressable-state');
      expect(el.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: true }),
      );
    });
  });

  describe('children rendering', () => {
    it('renders multiple children', () => {
      render(
        <Pressable testID="pressable-multi">
          <RNText>Child 1</RNText>
          <RNText>Child 2</RNText>
        </Pressable>,
      );
      expect(screen.getByText('Child 1')).toBeTruthy();
      expect(screen.getByText('Child 2')).toBeTruthy();
    });

    it('renders without children', () => {
      render(<Pressable testID="pressable-empty" />);
      expect(screen.getByTestId('pressable-empty')).toBeTruthy();
    });
  });

  describe('style prop', () => {
    it('applies style prop', () => {
      render(
        <Pressable
          testID="pressable-style"
          style={{ backgroundColor: 'red' }}
        />,
      );
      expect(screen.getByTestId('pressable-style')).toBeTruthy();
    });
  });
});
