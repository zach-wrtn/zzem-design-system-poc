/**
 * Accessibility test utilities for React Native components.
 *
 * Since jest-axe is designed for web DOM, this module provides custom helpers
 * that verify accessibility props are correctly set on React Native components.
 */
import React from 'react';
import { render, type RenderAPI, type RenderOptions } from '@testing-library/react-native';
import { ZDSProvider } from '@zzem-design-system/engine';
import type { ReactTestInstance } from 'react-test-renderer';

// ---------------------------------------------------------------------------
// Provider wrapper
// ---------------------------------------------------------------------------

const A11yProviders = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(ZDSProvider, { mode: 'light' }, children);
};

/**
 * Render a component wrapped in ZDSProvider for accessibility testing.
 */
export const renderForA11y = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderAPI => render(ui, { wrapper: A11yProviders, ...options });

// ---------------------------------------------------------------------------
// Assertion helpers
// ---------------------------------------------------------------------------

interface A11yExpectOptions {
  /** Expected accessibilityRole value. */
  role?: string;
  /** If true, the element is interactive and must have accessibilityState. */
  interactive?: boolean;
  /** If true, require accessibilityLabel to be a non-empty string. */
  requireLabel?: boolean;
  /** If true, require accessibilityLiveRegion to be set. */
  requireLiveRegion?: boolean;
}

/**
 * Assert that a rendered React Native element has the expected accessibility
 * properties set.
 *
 * This inspects the raw props on the host element, mirroring what assistive
 * technologies will read.
 */
export function expectAccessible(
  element: ReactTestInstance,
  options: A11yExpectOptions = {},
): void {
  const { role, interactive = false, requireLabel = false, requireLiveRegion = false } = options;

  // Check accessibilityRole
  if (role !== undefined) {
    expect(element.props.accessibilityRole).toBe(role);
  }

  // Check accessibilityLabel
  if (requireLabel) {
    expect(typeof element.props.accessibilityLabel).toBe('string');
    expect((element.props.accessibilityLabel as string).length).toBeGreaterThan(0);
  }

  // Interactive elements must expose accessibilityState
  if (interactive) {
    expect(element.props.accessibilityState).toBeDefined();
    expect(typeof element.props.accessibilityState).toBe('object');
  }

  // Live-region check (for alerts/toasts)
  if (requireLiveRegion) {
    expect(element.props.accessibilityLiveRegion).toBeDefined();
    expect(['polite', 'assertive', 'none']).toContain(
      element.props.accessibilityLiveRegion,
    );
  }
}

/**
 * Assert that an interactive element correctly reflects the disabled state.
 */
export function expectDisabledState(
  element: ReactTestInstance,
  disabled: boolean,
): void {
  expect(element.props.accessibilityState).toBeDefined();
  expect(element.props.accessibilityState.disabled).toBe(disabled);
}

/**
 * Assert that a checkable element (checkbox, switch, radio) correctly reflects
 * its checked/selected state.
 */
export function expectCheckedState(
  element: ReactTestInstance,
  checked: boolean,
  stateKey: 'checked' | 'selected' = 'checked',
): void {
  expect(element.props.accessibilityState).toBeDefined();
  expect(element.props.accessibilityState[stateKey]).toBe(checked);
}
