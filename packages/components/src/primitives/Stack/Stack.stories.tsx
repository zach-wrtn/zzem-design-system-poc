import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Stack, HStack, VStack } from './Stack';

const ColorBox = ({ color = '#4A90D9', size = 48 }: { color?: string; size?: number }) => (
  <View style={{ width: size, height: size, backgroundColor: color, borderRadius: 4 }} />
);

const meta: Meta<typeof Stack> = {
  title: 'Primitives/Stack',
  component: Stack,
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    gap: {
      control: 'number',
    },
    wrap: {
      control: 'boolean',
    },
  },
  args: {
    direction: 'vertical',
    gap: 8,
    wrap: false,
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  render: (args) => (
    <Stack {...args}>
      <ColorBox color="#4A90D9" />
      <ColorBox color="#7B61FF" />
      <ColorBox color="#E86C5D" />
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <Stack {...args} direction="horizontal">
      <ColorBox color="#4A90D9" />
      <ColorBox color="#7B61FF" />
      <ColorBox color="#E86C5D" />
    </Stack>
  ),
};

export const WithGap: Story = {
  render: (args) => (
    <Stack {...args} direction="horizontal" gap={16}>
      <ColorBox color="#4A90D9" />
      <ColorBox color="#7B61FF" />
      <ColorBox color="#E86C5D" />
    </Stack>
  ),
};

export const HStackExample: Story = {
  render: () => (
    <HStack gap={12}>
      <ColorBox color="#4A90D9" />
      <ColorBox color="#7B61FF" />
      <ColorBox color="#E86C5D" />
    </HStack>
  ),
};

export const VStackExample: Story = {
  render: () => (
    <VStack gap={12}>
      <ColorBox color="#4A90D9" />
      <ColorBox color="#7B61FF" />
      <ColorBox color="#E86C5D" />
    </VStack>
  ),
};
