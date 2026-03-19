import React from 'react';
import { Text as RNText } from 'react-native';
import { render, screen } from '../../test-utils';
import { SafeArea } from './SafeArea';

describe('SafeArea', () => {
  it('renders with testID', () => {
    render(
      <SafeArea testID="safearea">
        <RNText>Content</RNText>
      </SafeArea>,
    );
    expect(screen.getByTestId('safearea')).toBeTruthy();
  });

  it('renders children', () => {
    render(
      <SafeArea testID="safearea">
        <RNText>Content</RNText>
      </SafeArea>,
    );
    expect(screen.getByText('Content')).toBeTruthy();
  });
});
