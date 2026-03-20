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

  describe('variant rendering', () => {
    const variants = ['default', 'primary', 'success', 'warning', 'danger'] as const;

    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        render(<Tag label="Tag" variant={variant} testID={`tag-${variant}`} />);
        expect(screen.getByTestId(`tag-${variant}`)).toBeTruthy();
        expect(screen.getByText('Tag')).toBeTruthy();
      });
    });
  });

  describe('closable behavior', () => {
    it('does not show close button when closable is false (default)', () => {
      render(<Tag label="Feature" testID="tag" />);
      expect(screen.queryByLabelText('Feature 삭제')).toBeNull();
    });

    it('does not show close button when closable is explicitly false', () => {
      render(<Tag label="Feature" closable={false} testID="tag" />);
      expect(screen.queryByLabelText('Feature 삭제')).toBeNull();
    });

    it('shows close button with correct accessibility label when closable', () => {
      const onClose = jest.fn();
      render(<Tag label="React" closable onClose={onClose} testID="tag" />);
      const closeButton = screen.getByLabelText('React 삭제');
      expect(closeButton).toBeTruthy();
    });

    it('close button has button accessibility role', () => {
      const onClose = jest.fn();
      render(<Tag label="Feature" closable onClose={onClose} testID="tag" />);
      expect(screen.getByRole('button')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has text accessibility role', () => {
      render(<Tag label="Feature" testID="tag" />);
      expect(screen.getByRole('text')).toBeTruthy();
    });

    it('defaults accessibilityLabel to label text', () => {
      render(<Tag label="Feature" testID="tag" />);
      expect(screen.getByLabelText('Feature')).toBeTruthy();
    });
  });
});
