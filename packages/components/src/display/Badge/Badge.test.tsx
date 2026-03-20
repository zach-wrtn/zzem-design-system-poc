import React from 'react';
import { render, screen } from '../../test-utils';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders with testID', () => {
    render(<Badge label="New" testID="badge" />);
    expect(screen.getByTestId('badge')).toBeTruthy();
  });

  it('renders label text', () => {
    render(<Badge label="New" testID="badge" />);
    expect(screen.getByText('New')).toBeTruthy();
  });

  it('applies accessibility role text', () => {
    render(<Badge label="New" testID="badge" />);
    expect(screen.getByRole('text')).toBeTruthy();
  });

  it('applies accessibility label', () => {
    render(<Badge label="New" accessibilityLabel="New badge" testID="badge" />);
    expect(screen.getByLabelText('New badge')).toBeTruthy();
  });

  describe('variant rendering', () => {
    const variants = ['default', 'success', 'warning', 'danger', 'info'] as const;

    variants.forEach((variant) => {
      it(`renders with variant="${variant}"`, () => {
        render(<Badge label="Status" variant={variant} testID={`badge-${variant}`} />);
        expect(screen.getByTestId(`badge-${variant}`)).toBeTruthy();
        expect(screen.getByText('Status')).toBeTruthy();
      });
    });
  });

  describe('size rendering', () => {
    it('renders with size="sm"', () => {
      render(<Badge label="Small" size="sm" testID="badge-sm" />);
      expect(screen.getByTestId('badge-sm')).toBeTruthy();
      expect(screen.getByText('Small')).toBeTruthy();
    });

    it('renders with size="md"', () => {
      render(<Badge label="Medium" size="md" testID="badge-md" />);
      expect(screen.getByTestId('badge-md')).toBeTruthy();
      expect(screen.getByText('Medium')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('defaults accessibilityLabel to label when not provided', () => {
      render(<Badge label="New" testID="badge" />);
      expect(screen.getByLabelText('New')).toBeTruthy();
    });

    it('uses custom accessibilityLabel over label', () => {
      render(<Badge label="3" accessibilityLabel="3 notifications" testID="badge" />);
      expect(screen.getByLabelText('3 notifications')).toBeTruthy();
    });
  });
});
