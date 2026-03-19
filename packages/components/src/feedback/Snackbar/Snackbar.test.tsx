import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Snackbar } from './Snackbar';

describe('Snackbar', () => {
  it('renders when visible', () => {
    render(<Snackbar message="Hello" visible testID="snackbar" />);
    expect(screen.getByTestId('snackbar')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    render(<Snackbar message="Hello" visible={false} testID="snackbar" />);
    expect(screen.queryByTestId('snackbar')).toBeNull();
  });

  it('renders message', () => {
    render(<Snackbar message="Item deleted" visible testID="snackbar" />);
    expect(screen.getByText('Item deleted')).toBeTruthy();
  });

  it('renders action when actionLabel and onAction provided', () => {
    const onAction = jest.fn();
    render(
      <Snackbar
        message="Hello"
        visible
        actionLabel="Undo"
        onAction={onAction}
        testID="snackbar"
      />,
    );
    expect(screen.getByText('Undo')).toBeTruthy();
  });

  it('calls onAction when action is pressed', () => {
    const onAction = jest.fn();
    render(
      <Snackbar
        message="Hello"
        visible
        actionLabel="Undo"
        onAction={onAction}
        testID="snackbar"
      />,
    );
    fireEvent.press(screen.getByText('Undo'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
