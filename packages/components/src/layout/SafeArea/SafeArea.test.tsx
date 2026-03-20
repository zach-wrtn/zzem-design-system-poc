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

  describe('edges prop behavior', () => {
    it('renders with default edges (top and bottom)', () => {
      render(
        <SafeArea testID="safearea">
          <RNText>Content</RNText>
        </SafeArea>,
      );
      expect(screen.getByTestId('safearea')).toBeTruthy();
    });

    it('renders with only top edge', () => {
      render(
        <SafeArea edges={['top']} testID="safearea">
          <RNText>Content</RNText>
        </SafeArea>,
      );
      expect(screen.getByTestId('safearea')).toBeTruthy();
    });

    it('renders with only bottom edge', () => {
      render(
        <SafeArea edges={['bottom']} testID="safearea">
          <RNText>Content</RNText>
        </SafeArea>,
      );
      expect(screen.getByTestId('safearea')).toBeTruthy();
    });

    it('renders with all edges', () => {
      render(
        <SafeArea edges={['top', 'bottom', 'left', 'right']} testID="safearea">
          <RNText>Content</RNText>
        </SafeArea>,
      );
      expect(screen.getByTestId('safearea')).toBeTruthy();
    });

    it('renders with empty edges array', () => {
      render(
        <SafeArea edges={[]} testID="safearea">
          <RNText>Content</RNText>
        </SafeArea>,
      );
      expect(screen.getByTestId('safearea')).toBeTruthy();
    });
  });

  describe('multiple children', () => {
    it('renders multiple children', () => {
      render(
        <SafeArea testID="safearea">
          <RNText>Child 1</RNText>
          <RNText>Child 2</RNText>
          <RNText>Child 3</RNText>
        </SafeArea>,
      );
      expect(screen.getByText('Child 1')).toBeTruthy();
      expect(screen.getByText('Child 2')).toBeTruthy();
      expect(screen.getByText('Child 3')).toBeTruthy();
    });
  });

  describe('style override', () => {
    it('accepts custom style', () => {
      render(
        <SafeArea style={{ padding: 20 }} testID="safearea">
          <RNText>Content</RNText>
        </SafeArea>,
      );
      expect(screen.getByTestId('safearea')).toBeTruthy();
    });
  });

  describe('backgroundColor', () => {
    it('accepts custom backgroundColor', () => {
      render(
        <SafeArea backgroundColor="#FF0000" testID="safearea">
          <RNText>Content</RNText>
        </SafeArea>,
      );
      expect(screen.getByTestId('safearea')).toBeTruthy();
    });
  });
});
