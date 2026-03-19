import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'heading-xl',
        'heading-lg',
        'heading-md',
        'heading-sm',
        'body-lg',
        'body-md',
        'body-sm',
        'label-lg',
        'label-md',
        'label-sm',
        'caption',
      ],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    color: {
      control: 'color',
    },
  },
  args: {
    variant: 'body-md',
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text variant="heading-xl">heading-xl</Text>
      <Text variant="heading-lg">heading-lg</Text>
      <Text variant="heading-md">heading-md</Text>
      <Text variant="heading-sm">heading-sm</Text>
      <Text variant="body-lg">body-lg</Text>
      <Text variant="body-md">body-md</Text>
      <Text variant="body-sm">body-sm</Text>
      <Text variant="label-lg">label-lg</Text>
      <Text variant="label-md">label-md</Text>
      <Text variant="label-sm">label-sm</Text>
      <Text variant="caption">caption</Text>
    </View>
  ),
};

export const Alignment: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Text variant="body-md" align="left">Left aligned text</Text>
      <Text variant="body-md" align="center">Center aligned text</Text>
      <Text variant="body-md" align="right">Right aligned text</Text>
    </View>
  ),
};
