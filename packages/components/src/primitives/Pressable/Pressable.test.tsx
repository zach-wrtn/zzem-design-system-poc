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
});
