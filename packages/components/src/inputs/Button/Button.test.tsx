import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders with testID', () => {
    render(<Button testID="btn">Press</Button>);
    expect(screen.getByTestId('btn')).toBeTruthy();
  });

  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<Button onPress={onPress} testID="btn">Press</Button>);
    fireEvent.press(screen.getByTestId('btn'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(<Button onPress={onPress} disabled testID="btn">Press</Button>);
    fireEvent.press(screen.getByTestId('btn'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    render(<Button loading testID="btn">Press</Button>);
    const button = screen.getByTestId('btn');
    expect(button.props.accessibilityState).toEqual(
      expect.objectContaining({ busy: true }),
    );
  });

  it('applies accessibilityRole button', () => {
    render(<Button testID="btn">Press</Button>);
    const button = screen.getByTestId('btn');
    expect(button.props.accessibilityRole).toBe('button');
  });

  it('applies accessibility label', () => {
    render(
      <Button accessibilityLabel="Submit form" testID="btn">
        Submit
      </Button>,
    );
    const button = screen.getByTestId('btn');
    expect(button.props.accessibilityLabel).toBe('Submit form');
  });
});
