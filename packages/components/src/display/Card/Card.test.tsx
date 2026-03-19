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
});
