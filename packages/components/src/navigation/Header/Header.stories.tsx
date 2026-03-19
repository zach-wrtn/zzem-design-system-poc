import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Navigation/Header',
  component: Header,
  argTypes: {
    title: { control: 'text' },
    border: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: 'Screen Title',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Screen Title',
    left: <Text>←</Text>,
    right: <Text>⋮</Text>,
  },
};

export const NoBorder: Story = {
  args: {
    title: 'Screen Title',
    border: false,
  },
};
