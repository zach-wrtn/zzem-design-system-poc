import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders when visible', () => {
    render(<Toast message="Hello" visible testID="toast" />);
    expect(screen.getByTestId('toast')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    render(<Toast message="Hello" visible={false} testID="toast" />);
    expect(screen.queryByTestId('toast')).toBeNull();
  });

  it('renders message', () => {
    render(<Toast message="Operation successful" visible testID="toast" />);
    expect(screen.getByText('Operation successful')).toBeTruthy();
  });

  it('renders action button when actionLabel and onAction provided', () => {
    const onAction = jest.fn();
    render(
      <Toast
        message="Hello"
        visible
        actionLabel="Undo"
        onAction={onAction}
        testID="toast"
      />,
    );
    expect(screen.getByText('Undo')).toBeTruthy();
  });

  it('calls onAction when action button is pressed', () => {
    const onAction = jest.fn();
    render(
      <Toast
        message="Hello"
        visible
        actionLabel="Undo"
        onAction={onAction}
        testID="toast"
      />,
    );
    fireEvent.press(screen.getByText('Undo'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
