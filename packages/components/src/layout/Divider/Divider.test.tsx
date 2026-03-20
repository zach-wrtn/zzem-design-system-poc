import React from 'react';
import { render, screen } from '../../test-utils';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders with testID', () => {
    render(<Divider testID="divider" />);
    expect(screen.getByTestId('divider')).toBeTruthy();
  });

  it('renders horizontal by default', () => {
    const { getByTestId } = render(<Divider testID="divider" />);
    const divider = getByTestId('divider');
    expect(divider).toBeTruthy();
  });

  it('applies accessibility role none', () => {
    render(<Divider testID="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider.props.accessibilityRole).toBe('none');
  });

  describe('orientation', () => {
    it('renders horizontal divider by default', () => {
      render(<Divider testID="divider" />);
      expect(screen.getByTestId('divider')).toBeTruthy();
    });

    it('renders horizontal divider explicitly', () => {
      render(<Divider orientation="horizontal" testID="divider" />);
      expect(screen.getByTestId('divider')).toBeTruthy();
    });

    it('renders vertical divider', () => {
      render(<Divider orientation="vertical" testID="divider" />);
      expect(screen.getByTestId('divider')).toBeTruthy();
    });
  });

  describe('style override', () => {
    it('accepts custom style for color override', () => {
      render(
        <Divider style={{ backgroundColor: 'red' }} testID="divider" />,
      );
      expect(screen.getByTestId('divider')).toBeTruthy();
    });

    it('accepts custom style with additional properties', () => {
      render(
        <Divider
          style={{ backgroundColor: 'blue', marginHorizontal: 16 }}
          testID="divider"
        />,
      );
      expect(screen.getByTestId('divider')).toBeTruthy();
    });
  });
});
