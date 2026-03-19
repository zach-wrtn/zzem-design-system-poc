import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders with testID', () => {
    render(<Tag label="Feature" testID="tag" />);
    expect(screen.getByTestId('tag')).toBeTruthy();
  });

  it('renders label', () => {
    render(<Tag label="Feature" testID="tag" />);
    expect(screen.getByText('Feature')).toBeTruthy();
  });

  it('shows close button when closable', () => {
    const onClose = jest.fn();
    render(<Tag label="Feature" closable onClose={onClose} testID="tag" />);
    expect(screen.getByLabelText('Feature 삭제')).toBeTruthy();
  });

  it('calls onClose when close button is pressed', () => {
    const onClose = jest.fn();
    render(<Tag label="Feature" closable onClose={onClose} testID="tag" />);
    fireEvent.press(screen.getByLabelText('Feature 삭제'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies accessibility label', () => {
    render(<Tag label="Feature" accessibilityLabel="Feature tag" testID="tag" />);
    expect(screen.getByLabelText('Feature tag')).toBeTruthy();
  });
});
