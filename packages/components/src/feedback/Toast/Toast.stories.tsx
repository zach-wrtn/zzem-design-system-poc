import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
    position: {
      control: 'select',
      options: ['top', 'bottom'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    message: 'This is a toast message',
    variant: 'info',
    visible: true,
    position: 'top',
    onDismiss: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <>
      <Toast message="Info toast" variant="info" visible={true} onDismiss={() => {}} />
      <Toast message="Success toast" variant="success" visible={true} onDismiss={() => {}} />
      <Toast message="Warning toast" variant="warning" visible={true} onDismiss={() => {}} />
      <Toast message="Danger toast" variant="danger" visible={true} onDismiss={() => {}} />
    </>
  ),
};

export const WithAction: Story = {
  args: {
    message: 'Toast with action',
    variant: 'info',
    visible: true,
    position: 'top',
    actionLabel: 'Undo',
    onAction: () => {},
    onDismiss: () => {},
  },
};

export const BottomPosition: Story = {
  args: {
    message: 'Bottom positioned toast',
    variant: 'info',
    visible: true,
    position: 'bottom',
    onDismiss: () => {},
  },
};
