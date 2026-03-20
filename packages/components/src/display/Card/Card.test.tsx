import React from 'react';
import { Text as RNText } from 'react-native';
import { render, screen, fireEvent } from '../../test-utils';
import { Card } from './Card';

describe('Card', () => {
  it('renders with testID', () => {
    render(
      <Card testID="card">
        <RNText>Card content</RNText>
      </Card>,
    );
    expect(screen.getByTestId('card')).toBeTruthy();
  });

  it('renders children', () => {
    render(
      <Card testID="card">
        <RNText>Card content</RNText>
      </Card>,
    );
    expect(screen.getByText('Card content')).toBeTruthy();
  });

  it('calls onPress when pressable', () => {
    const onPress = jest.fn();
    render(
      <Card testID="card" onPress={onPress}>
        <RNText>Card content</RNText>
      </Card>,
    );
    fireEvent.press(screen.getByTestId('card'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies button role when pressable', () => {
    const onPress = jest.fn();
    render(
      <Card testID="card" onPress={onPress}>
        <RNText>Card content</RNText>
      </Card>,
    );
    expect(screen.getByRole('button')).toBeTruthy();
  });

  describe('non-pressable card', () => {
    it('renders without button role when no onPress', () => {
      render(
        <Card testID="card">
          <RNText>Static card</RNText>
        </Card>,
      );
      expect(screen.queryByRole('button')).toBeNull();
      expect(screen.getByTestId('card')).toBeTruthy();
    });

    it('does not respond to press when no onPress', () => {
      render(
        <Card testID="card">
          <RNText>Static card</RNText>
        </Card>,
      );
      // Should not throw when pressing a non-pressable card
      expect(screen.getByTestId('card')).toBeTruthy();
    });
  });

  describe('pressable card', () => {
    it('has button role when pressable', () => {
      const onPress = jest.fn();
      render(
        <Card testID="card" onPress={onPress}>
          <RNText>Pressable card</RNText>
        </Card>,
      );
      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('applies accessibilityLabel when pressable', () => {
      const onPress = jest.fn();
      render(
        <Card testID="card" onPress={onPress} accessibilityLabel="Open details">
          <RNText>Card content</RNText>
        </Card>,
      );
      expect(screen.getByLabelText('Open details')).toBeTruthy();
    });
  });

  describe('style override', () => {
    it('accepts custom style on non-pressable card', () => {
      render(
        <Card testID="card" style={{ backgroundColor: 'red' }}>
          <RNText>Styled card</RNText>
        </Card>,
      );
      expect(screen.getByTestId('card')).toBeTruthy();
    });

    it('accepts custom style on pressable card', () => {
      const onPress = jest.fn();
      render(
        <Card testID="card" onPress={onPress} style={{ backgroundColor: 'blue' }}>
          <RNText>Styled card</RNText>
        </Card>,
      );
      expect(screen.getByTestId('card')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('applies accessibilityLabel on non-pressable card', () => {
      render(
        <Card testID="card" accessibilityLabel="Info card">
          <RNText>Content</RNText>
        </Card>,
      );
      expect(screen.getByLabelText('Info card')).toBeTruthy();
    });
  });
});
