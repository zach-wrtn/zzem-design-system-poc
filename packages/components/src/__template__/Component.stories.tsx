import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Category/Component',
  component: Component,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    children: 'Component',
    variant: 'default',
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <>
      <Component size="sm">Small</Component>
      <Component size="md">Medium</Component>
      <Component size="lg">Large</Component>
    </>
  ),
};
