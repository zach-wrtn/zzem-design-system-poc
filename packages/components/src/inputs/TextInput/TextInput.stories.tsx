import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Inputs/TextInput',
  component: TextInput,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
  args: {
    size: 'md',
    disabled: false,
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: true,
    helperText: 'Please enter a valid email address',
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Password',
    helperText: 'Must be at least 8 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <>
      <TextInput {...args} size="sm" label="Small" />
      <TextInput {...args} size="md" label="Medium" />
      <TextInput {...args} size="lg" label="Large" />
    </>
  ),
};
