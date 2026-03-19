import React from 'react';
import { Text as RNText } from 'react-native';
import { render, screen } from '../../test-utils';
import { BottomSheet } from './BottomSheet';

describe('BottomSheet', () => {
  const onDismiss = jest.fn();

  it('renders when visible', () => {
    render(
      <BottomSheet visible onDismiss={onDismiss} testID="bottom-sheet">
        <RNText>Sheet content</RNText>
      </BottomSheet>,
    );
    expect(screen.getByTestId('bottom-sheet')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    render(
      <BottomSheet visible={false} onDismiss={onDismiss} testID="bottom-sheet">
        <RNText>Sheet content</RNText>
      </BottomSheet>,
    );
    expect(screen.queryByTestId('bottom-sheet')).toBeNull();
  });

  it('renders title', () => {
    render(
      <BottomSheet visible onDismiss={onDismiss} title="Sheet Title" testID="bottom-sheet">
        <RNText>Sheet content</RNText>
      </BottomSheet>,
    );
    expect(screen.getByText('Sheet Title')).toBeTruthy();
  });

  it('renders children', () => {
    render(
      <BottomSheet visible onDismiss={onDismiss} testID="bottom-sheet">
        <RNText>Sheet content</RNText>
      </BottomSheet>,
    );
    expect(screen.getByText('Sheet content')).toBeTruthy();
  });
});
