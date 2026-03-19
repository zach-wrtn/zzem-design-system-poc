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
      expect.objectContaining({ flexDirection: 'column' }),
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
      expect.objectContaining({ flexDirection: 'row' }),
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
      expect.objectContaining({ gap: 8 }),
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
      expect.objectContaining({ flexDirection: 'row' }),
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
      expect.objectContaining({ flexDirection: 'column' }),
    );
  });
});
