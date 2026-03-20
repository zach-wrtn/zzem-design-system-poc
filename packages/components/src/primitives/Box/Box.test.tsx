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

  describe('style props', () => {
    it('applies backgroundColor', () => {
      render(
        <Box testID="box-bg" style={{ backgroundColor: 'blue' }} />,
      );
      const box = screen.getByTestId('box-bg');
      expect(box.props.style).toEqual(
        expect.objectContaining({ backgroundColor: 'blue' }),
      );
    });

    it('applies multiple style properties', () => {
      render(
        <Box
          testID="box-multi"
          style={{ padding: 8, margin: 4, borderRadius: 12 }}
        />,
      );
      const box = screen.getByTestId('box-multi');
      expect(box.props.style).toEqual(
        expect.objectContaining({
          padding: 8,
          margin: 4,
          borderRadius: 12,
        }),
      );
    });
  });

  describe('multiple children', () => {
    it('renders multiple children', () => {
      render(
        <Box testID="box-multi-children">
          <RNText>First</RNText>
          <RNText>Second</RNText>
          <RNText>Third</RNText>
        </Box>,
      );
      expect(screen.getByText('First')).toBeTruthy();
      expect(screen.getByText('Second')).toBeTruthy();
      expect(screen.getByText('Third')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('forwards accessibilityLabel', () => {
      render(
        <Box
          testID="box-a11y"
          accessibilityLabel="Content container"
        />,
      );
      const box = screen.getByTestId('box-a11y');
      expect(box.props.accessibilityLabel).toBe('Content container');
    });
  });

  describe('empty render', () => {
    it('renders without children', () => {
      render(<Box testID="box-empty" />);
      expect(screen.getByTestId('box-empty')).toBeTruthy();
    });
  });
});
