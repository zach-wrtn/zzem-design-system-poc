import React from 'react';
import { render, screen } from '../../test-utils';
import { Spacer } from './Spacer';

describe('Spacer', () => {
  it('renders with testID', () => {
    render(<Spacer size={16} testID="spacer" />);
    expect(screen.getByTestId('spacer')).toBeTruthy();
  });

  it('renders with vertical direction by default', () => {
    const { getByTestId } = render(<Spacer size={16} testID="spacer" />);
    const spacer = getByTestId('spacer');
    expect(spacer).toBeTruthy();
  });

  describe('vertical direction', () => {
    it('applies height style for vertical spacer', () => {
      const { getByTestId } = render(
        <Spacer size={24} direction="vertical" testID="spacer" />,
      );
      const spacer = getByTestId('spacer');
      expect(spacer.props.style).toEqual({ height: 24 });
    });

    it('applies height by default (no direction specified)', () => {
      const { getByTestId } = render(<Spacer size={8} testID="spacer" />);
      const spacer = getByTestId('spacer');
      expect(spacer.props.style).toEqual({ height: 8 });
    });
  });

  describe('horizontal direction', () => {
    it('applies width style for horizontal spacer', () => {
      const { getByTestId } = render(
        <Spacer size={16} direction="horizontal" testID="spacer" />,
      );
      const spacer = getByTestId('spacer');
      expect(spacer.props.style).toEqual({ width: 16 });
    });

    it('applies correct width for different sizes', () => {
      const { getByTestId } = render(
        <Spacer size={32} direction="horizontal" testID="spacer" />,
      );
      const spacer = getByTestId('spacer');
      expect(spacer.props.style).toEqual({ width: 32 });
    });
  });

  describe('size values', () => {
    it('renders with small size', () => {
      const { getByTestId } = render(<Spacer size={4} testID="spacer" />);
      const spacer = getByTestId('spacer');
      expect(spacer.props.style).toEqual({ height: 4 });
    });

    it('renders with large size', () => {
      const { getByTestId } = render(<Spacer size={64} testID="spacer" />);
      const spacer = getByTestId('spacer');
      expect(spacer.props.style).toEqual({ height: 64 });
    });
  });
});
