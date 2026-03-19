import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Box } from './Box';
import { Text as RNText } from 'react-native';

describe('Box', () => {
  it('renders with testID', () => {
    render(<Box testID="box-test" />);
    expect(screen.getByTestId('box-test')).toBeTruthy();
  });

  it('renders children', () => {
    render(
      <Box testID="box-children">
        <RNText>Hello</RNText>
      </Box>,
    );
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('applies custom style', () => {
    render(<Box testID="box-style" style={{ padding: 16 }} />);
    const box = screen.getByTestId('box-style');
    expect(box.props.style).toEqual(
      expect.objectContaining({ padding: 16 }),
    );
  });
});
