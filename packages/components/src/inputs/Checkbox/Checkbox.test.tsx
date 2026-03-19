import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with testID', () => {
    render(
      <Checkbox checked={false} onChange={jest.fn()} testID="checkbox" />,
    );
    expect(screen.getByTestId('checkbox')).toBeTruthy();
  });

  it('renders label', () => {
    render(
      <Checkbox
        checked={false}
        onChange={jest.fn()}
        label="Accept terms"
        testID="checkbox"
      />,
    );
    expect(screen.getByText('Accept terms')).toBeTruthy();
  });

  it('calls onChange on press', () => {
    const onChange = jest.fn();
    render(
      <Checkbox checked={false} onChange={onChange} testID="checkbox" />,
    );
    fireEvent.press(screen.getByTestId('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(
      <Checkbox
        checked={false}
        onChange={onChange}
        disabled
        testID="checkbox"
      />,
    );
    fireEvent.press(screen.getByTestId('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies accessibility role checkbox', () => {
    render(
      <Checkbox checked={false} onChange={jest.fn()} testID="checkbox" />,
    );
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.props.accessibilityRole).toBe('checkbox');
  });
});
