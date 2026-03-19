import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Display/Tag',
  component: Tag,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: 'Tag',
    variant: 'default',
  },
};

export const AllVariants: Story = {
  render: () => (
    <>
      <Tag label="Default" variant="default" />
      <Tag label="Primary" variant="primary" />
      <Tag label="Success" variant="success" />
      <Tag label="Warning" variant="warning" />
      <Tag label="Danger" variant="danger" />
    </>
  ),
};

export const Closable: Story = {
  args: {
    label: 'Closable',
    variant: 'default',
    closable: true,
    onClose: () => {},
  },
};
