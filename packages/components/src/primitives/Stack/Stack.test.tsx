import React from 'react';
import { render, screen } from '../../test-utils';
import { Stack, HStack, VStack } from './Stack';
import { Text as RNText } from 'react-native';

describe('Stack', () => {
  it('renders vertical by default', () => {
    render(
      <Stack testID="stack-default">
        <RNText>Item 1</RNText>
      </Stack>,
    );
    const stack = screen.getByTestId('stack-default');
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ flexDirection: 'column' }),
      ]),
    );
  });

  it('renders horizontal direction', () => {
    render(
      <Stack testID="stack-horizontal" direction="horizontal">
        <RNText>Item 1</RNText>
      </Stack>,
    );
    const stack = screen.getByTestId('stack-horizontal');
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ flexDirection: 'row' }),
      ]),
    );
  });

  it('applies gap', () => {
    render(
      <Stack testID="stack-gap" gap={8}>
        <RNText>Item 1</RNText>
        <RNText>Item 2</RNText>
      </Stack>,
    );
    const stack = screen.getByTestId('stack-gap');
    expect(stack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ gap: 8 }),
      ]),
    );
  });
});

describe('HStack', () => {
  it('renders as horizontal', () => {
    render(
      <HStack testID="hstack">
        <RNText>Item 1</RNText>
      </HStack>,
    );
    const hstack = screen.getByTestId('hstack');
    expect(hstack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ flexDirection: 'row' }),
      ]),
    );
  });
});

describe('VStack', () => {
  it('renders as vertical', () => {
    render(
      <VStack testID="vstack">
        <RNText>Item 1</RNText>
      </VStack>,
    );
    const vstack = screen.getByTestId('vstack');
    expect(vstack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ flexDirection: 'column' }),
      ]),
    );
  });

  it('applies gap', () => {
    render(
      <VStack testID="vstack-gap" gap={12}>
        <RNText>Item 1</RNText>
        <RNText>Item 2</RNText>
      </VStack>,
    );
    const vstack = screen.getByTestId('vstack-gap');
    expect(vstack.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ gap: 12 }),
      ]),
    );
  });

  it('renders children', () => {
    render(
      <VStack testID="vstack-children">
        <RNText>A</RNText>
        <RNText>B</RNText>
      </VStack>,
    );
    expect(screen.getByText('A')).toBeTruthy();
    expect(screen.getByText('B')).toBeTruthy();
  });
});

describe('Stack - additional tests', () => {
  describe('alignment', () => {
    it('applies align prop', () => {
      render(
        <Stack testID="stack-align" align="center">
          <RNText>Centered</RNText>
        </Stack>,
      );
      const stack = screen.getByTestId('stack-align');
      expect(stack.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ alignItems: 'center' }),
        ]),
      );
    });

    it('applies justify prop', () => {
      render(
        <Stack testID="stack-justify" justify="space-between">
          <RNText>Item 1</RNText>
          <RNText>Item 2</RNText>
        </Stack>,
      );
      const stack = screen.getByTestId('stack-justify');
      expect(stack.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ justifyContent: 'space-between' }),
        ]),
      );
    });
  });

  describe('wrap', () => {
    it('applies wrap when enabled', () => {
      render(
        <Stack testID="stack-wrap" wrap>
          <RNText>Item 1</RNText>
        </Stack>,
      );
      const stack = screen.getByTestId('stack-wrap');
      expect(stack.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ flexWrap: 'wrap' }),
        ]),
      );
    });

    it('applies nowrap by default', () => {
      render(
        <Stack testID="stack-nowrap">
          <RNText>Item 1</RNText>
        </Stack>,
      );
      const stack = screen.getByTestId('stack-nowrap');
      expect(stack.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ flexWrap: 'nowrap' }),
        ]),
      );
    });
  });

  describe('children layout', () => {
    it('renders multiple children in Stack', () => {
      render(
        <Stack testID="stack-children">
          <RNText>First</RNText>
          <RNText>Second</RNText>
          <RNText>Third</RNText>
        </Stack>,
      );
      expect(screen.getByText('First')).toBeTruthy();
      expect(screen.getByText('Second')).toBeTruthy();
      expect(screen.getByText('Third')).toBeTruthy();
    });

    it('renders without children', () => {
      render(<Stack testID="stack-empty" />);
      expect(screen.getByTestId('stack-empty')).toBeTruthy();
    });
  });

  describe('style override', () => {
    it('applies custom style', () => {
      render(
        <Stack testID="stack-style" style={{ padding: 16 }}>
          <RNText>Item</RNText>
        </Stack>,
      );
      const stack = screen.getByTestId('stack-style');
      expect(stack.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ padding: 16 }),
        ]),
      );
    });
  });

  describe('HStack children', () => {
    it('renders multiple children horizontally', () => {
      render(
        <HStack testID="hstack-children">
          <RNText>Left</RNText>
          <RNText>Right</RNText>
        </HStack>,
      );
      expect(screen.getByText('Left')).toBeTruthy();
      expect(screen.getByText('Right')).toBeTruthy();
    });

    it('applies gap to HStack', () => {
      render(
        <HStack testID="hstack-gap" gap={16}>
          <RNText>A</RNText>
          <RNText>B</RNText>
        </HStack>,
      );
      const hstack = screen.getByTestId('hstack-gap');
      expect(hstack.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ gap: 16, flexDirection: 'row' }),
        ]),
      );
    });
  });
});
