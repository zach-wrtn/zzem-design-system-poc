import React from 'react';
import { Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Inputs/IconButton',
  component: IconButton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    variant: 'filled',
    size: 'md',
    disabled: false,
    icon: <Text>★</Text>,
    onPress: () => {},
    accessibilityLabel: 'Icon button',
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: (args) => (
    <>
      <IconButton {...args} variant="filled" accessibilityLabel="Filled icon button" />
      <IconButton {...args} variant="outlined" accessibilityLabel="Outlined icon button" />
      <IconButton {...args} variant="ghost" accessibilityLabel="Ghost icon button" />
    </>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <>
      <IconButton {...args} size="sm" accessibilityLabel="Small icon button" />
      <IconButton {...args} size="md" accessibilityLabel="Medium icon button" />
      <IconButton {...args} size="lg" accessibilityLabel="Large icon button" />
    </>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
