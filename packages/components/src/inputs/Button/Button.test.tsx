import React from 'react';
import { View } from 'react-native';
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

  describe('variants', () => {
    it.each(['primary', 'secondary', 'ghost', 'danger'] as const)(
      'renders %s variant without crashing',
      (variant) => {
        render(
          <Button variant={variant} testID={`btn-${variant}`}>
            {variant}
          </Button>,
        );
        expect(screen.getByTestId(`btn-${variant}`)).toBeTruthy();
        expect(screen.getByText(variant)).toBeTruthy();
      },
    );
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)(
      'renders %s size without crashing',
      (size) => {
        render(
          <Button size={size} testID={`btn-${size}`}>
            {size}
          </Button>,
        );
        expect(screen.getByTestId(`btn-${size}`)).toBeTruthy();
      },
    );
  });

  describe('fullWidth', () => {
    it('renders with fullWidth prop', () => {
      render(
        <Button fullWidth testID="btn-full">
          Full Width
        </Button>,
      );
      expect(screen.getByTestId('btn-full')).toBeTruthy();
    });
  });

  describe('icons', () => {
    it('renders iconLeft', () => {
      render(
        <Button iconLeft={<View testID="icon-left" />} testID="btn">
          With Icon
        </Button>,
      );
      expect(screen.getByTestId('icon-left')).toBeTruthy();
      expect(screen.getByText('With Icon')).toBeTruthy();
    });

    it('renders iconRight', () => {
      render(
        <Button iconRight={<View testID="icon-right" />} testID="btn">
          With Icon
        </Button>,
      );
      expect(screen.getByTestId('icon-right')).toBeTruthy();
      expect(screen.getByText('With Icon')).toBeTruthy();
    });

    it('renders both iconLeft and iconRight', () => {
      render(
        <Button
          iconLeft={<View testID="icon-left" />}
          iconRight={<View testID="icon-right" />}
          testID="btn"
        >
          Both Icons
        </Button>,
      );
      expect(screen.getByTestId('icon-left')).toBeTruthy();
      expect(screen.getByTestId('icon-right')).toBeTruthy();
    });

    it('does not render icons when loading', () => {
      render(
        <Button
          loading
          iconLeft={<View testID="icon-left" />}
          iconRight={<View testID="icon-right" />}
          testID="btn"
        >
          Loading
        </Button>,
      );
      expect(screen.queryByTestId('icon-left')).toBeNull();
      expect(screen.queryByTestId('icon-right')).toBeNull();
    });
  });

  describe('loading state', () => {
    it('does not render children text when loading', () => {
      render(
        <Button loading testID="btn">
          Press
        </Button>,
      );
      expect(screen.queryByText('Press')).toBeNull();
    });

    it('does not call onPress when loading', () => {
      const onPress = jest.fn();
      render(
        <Button onPress={onPress} loading testID="btn">
          Press
        </Button>,
      );
      fireEvent.press(screen.getByTestId('btn'));
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('disabled + loading combined', () => {
    it('does not call onPress when both disabled and loading', () => {
      const onPress = jest.fn();
      render(
        <Button onPress={onPress} disabled loading testID="btn">
          Press
        </Button>,
      );
      fireEvent.press(screen.getByTestId('btn'));
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('textStyle override', () => {
    it('accepts textStyle prop without crashing', () => {
      render(
        <Button textStyle={{ color: 'red' }} testID="btn">
          Styled
        </Button>,
      );
      expect(screen.getByText('Styled')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('sets accessibilityState disabled when disabled', () => {
      render(
        <Button disabled testID="btn">
          Press
        </Button>,
      );
      const button = screen.getByTestId('btn');
      expect(button.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: true }),
      );
    });

    it('sets accessibilityState busy when loading', () => {
      render(
        <Button loading testID="btn">
          Press
        </Button>,
      );
      const button = screen.getByTestId('btn');
      expect(button.props.accessibilityState).toEqual(
        expect.objectContaining({ busy: true, disabled: true }),
      );
    });

    it('sets accessibilityState not disabled and not busy by default', () => {
      render(
        <Button testID="btn">
          Press
        </Button>,
      );
      const button = screen.getByTestId('btn');
      expect(button.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: false, busy: false }),
      );
    });
  });
});
