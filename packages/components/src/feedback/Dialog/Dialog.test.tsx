import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  const defaultActions = [
    { label: 'Cancel', onPress: jest.fn() },
    { label: 'Confirm', onPress: jest.fn() },
  ];

  beforeEach(() => {
    defaultActions.forEach((action) => action.onPress.mockClear());
  });

  it('renders when visible', () => {
    render(
      <Dialog
        visible
        title="Title"
        message="Message"
        actions={defaultActions}
        testID="dialog"
      />,
    );
    expect(screen.getByTestId('dialog')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    render(
      <Dialog
        visible={false}
        title="Title"
        message="Message"
        actions={defaultActions}
        testID="dialog"
      />,
    );
    expect(screen.queryByTestId('dialog')).toBeNull();
  });

  it('renders title', () => {
    render(
      <Dialog
        visible
        title="Dialog Title"
        message="Message"
        actions={defaultActions}
        testID="dialog"
      />,
    );
    expect(screen.getByText('Dialog Title')).toBeTruthy();
  });

  it('renders message', () => {
    render(
      <Dialog
        visible
        title="Title"
        message="Are you sure?"
        actions={defaultActions}
        testID="dialog"
      />,
    );
    expect(screen.getByText('Are you sure?')).toBeTruthy();
  });

  it('renders action buttons', () => {
    render(
      <Dialog
        visible
        title="Title"
        message="Message"
        actions={defaultActions}
        testID="dialog"
      />,
    );
    expect(screen.getByText('Cancel')).toBeTruthy();
    expect(screen.getByText('Confirm')).toBeTruthy();
  });

  it('calls action onPress when button is pressed', () => {
    render(
      <Dialog
        visible
        title="Title"
        message="Message"
        actions={defaultActions}
        testID="dialog"
      />,
    );
    fireEvent.press(screen.getByText('Confirm'));
    expect(defaultActions[1].onPress).toHaveBeenCalledTimes(1);
  });
});
