/**
 * Comprehensive accessibility tests for all @zzem-design-system/components.
 *
 * Tests verify that components correctly set React Native accessibility props
 * (accessibilityRole, accessibilityLabel, accessibilityState, accessibilityLiveRegion)
 * so that assistive technologies can interpret them.
 */
import React from 'react';
import { View } from 'react-native';
import { screen } from '@testing-library/react-native';
import {
  renderForA11y,
  expectAccessible,
  expectDisabledState,
  expectCheckedState,
} from './setup';

// Primitives
import { Box } from '../../src/primitives/Box';
import { Text } from '../../src/primitives/Text';
import { Pressable } from '../../src/primitives/Pressable';
import { Stack, HStack, VStack } from '../../src/primitives/Stack';

// Inputs
import { Button } from '../../src/inputs/Button';
import { IconButton } from '../../src/inputs/IconButton';
import { TextInput } from '../../src/inputs/TextInput';
import { Checkbox } from '../../src/inputs/Checkbox';
import { Switch } from '../../src/inputs/Switch';
import { RadioGroup } from '../../src/inputs/Radio';

// Display
import { Avatar } from '../../src/display/Avatar';
import { Badge } from '../../src/display/Badge';
import { Card } from '../../src/display/Card';
import { Tag } from '../../src/display/Tag';

// Feedback
import { Toast } from '../../src/feedback/Toast';
import { Dialog } from '../../src/feedback/Dialog';
import { BottomSheet } from '../../src/feedback/BottomSheet';
import { Snackbar } from '../../src/feedback/Snackbar';

// Layout
import { Divider } from '../../src/layout/Divider';
import { Spacer } from '../../src/layout/Spacer';
import { SafeArea } from '../../src/layout/SafeArea';

// Navigation
import { Header } from '../../src/navigation/Header';
import { TabBar } from '../../src/navigation/TabBar';
import { NavigationBar } from '../../src/navigation/NavigationBar';

// ---------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------

describe('Accessibility — Inputs', () => {
  describe('Button', () => {
    it('has accessibilityRole "button"', () => {
      renderForA11y(<Button testID="btn">Submit</Button>);
      const el = screen.getByTestId('btn');
      expectAccessible(el, { role: 'button', interactive: true });
    });

    it('applies accessibilityLabel when provided', () => {
      renderForA11y(
        <Button accessibilityLabel="Submit form" testID="btn">Submit</Button>,
      );
      const el = screen.getByTestId('btn');
      expectAccessible(el, { role: 'button', requireLabel: true });
      expect(el.props.accessibilityLabel).toBe('Submit form');
    });

    it('reflects disabled state', () => {
      renderForA11y(<Button disabled testID="btn">Submit</Button>);
      expectDisabledState(screen.getByTestId('btn'), true);
    });

    it('reflects enabled state', () => {
      renderForA11y(<Button testID="btn">Submit</Button>);
      expectDisabledState(screen.getByTestId('btn'), false);
    });

    it('sets busy state when loading', () => {
      renderForA11y(<Button loading testID="btn">Submit</Button>);
      const el = screen.getByTestId('btn');
      expect(el.props.accessibilityState).toEqual(
        expect.objectContaining({ busy: true }),
      );
    });
  });

  describe('IconButton', () => {
    const icon = <View testID="icon" />;

    it('has accessibilityRole "button"', () => {
      renderForA11y(
        <IconButton icon={icon} accessibilityLabel="Close" testID="ib" />,
      );
      const el = screen.getByTestId('ib');
      expectAccessible(el, { role: 'button', interactive: true, requireLabel: true });
    });

    it('reflects disabled state', () => {
      renderForA11y(
        <IconButton icon={icon} accessibilityLabel="Close" disabled testID="ib" />,
      );
      expectDisabledState(screen.getByTestId('ib'), true);
    });

    it('reflects enabled state', () => {
      renderForA11y(
        <IconButton icon={icon} accessibilityLabel="Close" testID="ib" />,
      );
      expectDisabledState(screen.getByTestId('ib'), false);
    });
  });

  describe('TextInput', () => {
    it('sets accessibilityLabel from label prop', () => {
      renderForA11y(<TextInput label="Email" testID="ti" />);
      // The outer container gets the testID, but the actual RNTextInput has
      // the accessibilityLabel. We query by label text.
      const input = screen.getByLabelText('Email');
      expect(input).toBeTruthy();
    });

    it('reflects disabled state', () => {
      renderForA11y(<TextInput label="Email" disabled testID="ti" />);
      const input = screen.getByLabelText('Email');
      expect(input.props.accessibilityState).toEqual(
        expect.objectContaining({ disabled: true }),
      );
    });
  });

  describe('Checkbox', () => {
    it('has accessibilityRole "checkbox"', () => {
      renderForA11y(
        <Checkbox checked={false} onChange={jest.fn()} label="Agree" testID="cb" />,
      );
      const el = screen.getByTestId('cb');
      expectAccessible(el, { role: 'checkbox', interactive: true });
    });

    it('applies label as accessibilityLabel', () => {
      renderForA11y(
        <Checkbox checked={false} onChange={jest.fn()} label="Agree" testID="cb" />,
      );
      const el = screen.getByTestId('cb');
      expect(el.props.accessibilityLabel).toBe('Agree');
    });

    it('reflects checked state when checked', () => {
      renderForA11y(
        <Checkbox checked={true} onChange={jest.fn()} label="Agree" testID="cb" />,
      );
      expectCheckedState(screen.getByTestId('cb'), true);
    });

    it('reflects unchecked state', () => {
      renderForA11y(
        <Checkbox checked={false} onChange={jest.fn()} label="Agree" testID="cb" />,
      );
      expectCheckedState(screen.getByTestId('cb'), false);
    });

    it('reflects disabled state', () => {
      renderForA11y(
        <Checkbox checked={false} onChange={jest.fn()} label="Agree" disabled testID="cb" />,
      );
      expectDisabledState(screen.getByTestId('cb'), true);
    });

    it('prefers explicit accessibilityLabel over label', () => {
      renderForA11y(
        <Checkbox
          checked={false}
          onChange={jest.fn()}
          label="Terms"
          accessibilityLabel="Agree to terms and conditions"
          testID="cb"
        />,
      );
      expect(screen.getByTestId('cb').props.accessibilityLabel).toBe(
        'Agree to terms and conditions',
      );
    });
  });

  describe('Switch', () => {
    it('has accessibilityRole "switch"', () => {
      renderForA11y(
        <Switch value={false} onValueChange={jest.fn()} label="Notifications" testID="sw" />,
      );
      const el = screen.getByTestId('sw');
      expectAccessible(el, { role: 'switch', interactive: true });
    });

    it('reflects checked state when on', () => {
      renderForA11y(
        <Switch value={true} onValueChange={jest.fn()} label="Notifications" testID="sw" />,
      );
      expectCheckedState(screen.getByTestId('sw'), true);
    });

    it('reflects unchecked state when off', () => {
      renderForA11y(
        <Switch value={false} onValueChange={jest.fn()} label="Notifications" testID="sw" />,
      );
      expectCheckedState(screen.getByTestId('sw'), false);
    });

    it('reflects disabled state', () => {
      renderForA11y(
        <Switch value={false} onValueChange={jest.fn()} disabled testID="sw" />,
      );
      expectDisabledState(screen.getByTestId('sw'), true);
    });

    it('uses label as accessibilityLabel when no explicit label given', () => {
      renderForA11y(
        <Switch value={false} onValueChange={jest.fn()} label="Dark mode" testID="sw" />,
      );
      expect(screen.getByTestId('sw').props.accessibilityLabel).toBe('Dark mode');
    });
  });

  describe('RadioGroup', () => {
    const options = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C', disabled: true },
    ];

    it('has accessibilityRole "radiogroup" on the container', () => {
      renderForA11y(
        <RadioGroup
          options={options}
          value="a"
          onChange={jest.fn()}
          label="Choose"
          testID="rg"
        />,
      );
      const el = screen.getByTestId('rg');
      expectAccessible(el, { role: 'radiogroup' });
    });

    it('uses label as accessibilityLabel', () => {
      renderForA11y(
        <RadioGroup
          options={options}
          value="a"
          onChange={jest.fn()}
          label="Choose"
          testID="rg"
        />,
      );
      expect(screen.getByTestId('rg').props.accessibilityLabel).toBe('Choose');
    });

    it('individual radio options have accessibilityRole "radio"', () => {
      renderForA11y(
        <RadioGroup
          options={options}
          value="a"
          onChange={jest.fn()}
          label="Choose"
          testID="rg"
        />,
      );
      const optionA = screen.getByLabelText('Option A');
      expect(optionA.props.accessibilityRole).toBe('radio');
    });

    it('selected radio has accessibilityState selected true', () => {
      renderForA11y(
        <RadioGroup
          options={options}
          value="a"
          onChange={jest.fn()}
          label="Choose"
          testID="rg"
        />,
      );
      const optionA = screen.getByLabelText('Option A');
      expectCheckedState(optionA, true, 'selected');
    });

    it('unselected radio has accessibilityState selected false', () => {
      renderForA11y(
        <RadioGroup
          options={options}
          value="a"
          onChange={jest.fn()}
          label="Choose"
          testID="rg"
        />,
      );
      const optionB = screen.getByLabelText('Option B');
      expectCheckedState(optionB, false, 'selected');
    });

    it('disabled radio option reflects disabled state', () => {
      renderForA11y(
        <RadioGroup
          options={options}
          value="a"
          onChange={jest.fn()}
          label="Choose"
          testID="rg"
        />,
      );
      const optionC = screen.getByLabelText('Option C');
      expectDisabledState(optionC, true);
    });
  });
});

// ---------------------------------------------------------------------------
// Display
// ---------------------------------------------------------------------------

describe('Accessibility — Display', () => {
  describe('Avatar', () => {
    it('has accessibilityRole "image"', () => {
      renderForA11y(<Avatar initials="ZR" testID="av" />);
      const el = screen.getByTestId('av');
      expectAccessible(el, { role: 'image', requireLabel: true });
    });

    it('defaults accessibilityLabel to initials', () => {
      renderForA11y(<Avatar initials="ZR" testID="av" />);
      expect(screen.getByTestId('av').props.accessibilityLabel).toBe('ZR');
    });

    it('defaults to "Avatar" when no initials or label provided', () => {
      renderForA11y(<Avatar testID="av" />);
      expect(screen.getByTestId('av').props.accessibilityLabel).toBe('Avatar');
    });

    it('uses explicit accessibilityLabel when provided', () => {
      renderForA11y(
        <Avatar initials="ZR" accessibilityLabel="Zach Ryu" testID="av" />,
      );
      expect(screen.getByTestId('av').props.accessibilityLabel).toBe('Zach Ryu');
    });
  });

  describe('Badge', () => {
    it('has accessibilityRole "text"', () => {
      renderForA11y(<Badge label="New" testID="badge" />);
      const el = screen.getByTestId('badge');
      expectAccessible(el, { role: 'text' });
    });

    it('uses label as accessibilityLabel', () => {
      renderForA11y(<Badge label="5" testID="badge" />);
      expect(screen.getByTestId('badge').props.accessibilityLabel).toBe('5');
    });

    it('uses explicit accessibilityLabel when provided', () => {
      renderForA11y(
        <Badge label="5" accessibilityLabel="5 notifications" testID="badge" />,
      );
      expect(screen.getByTestId('badge').props.accessibilityLabel).toBe('5 notifications');
    });
  });

  describe('Card', () => {
    it('pressable card has accessibilityRole "button"', () => {
      renderForA11y(
        <Card onPress={jest.fn()} testID="card">
          <Text>Content</Text>
        </Card>,
      );
      const el = screen.getByTestId('card');
      expectAccessible(el, { role: 'button' });
    });

    it('pressable card applies accessibilityLabel', () => {
      renderForA11y(
        <Card onPress={jest.fn()} accessibilityLabel="Product card" testID="card">
          <Text>Content</Text>
        </Card>,
      );
      expect(screen.getByTestId('card').props.accessibilityLabel).toBe('Product card');
    });

    it('non-pressable card does not set role "button"', () => {
      renderForA11y(
        <Card testID="card">
          <Text>Content</Text>
        </Card>,
      );
      const el = screen.getByTestId('card');
      expect(el.props.accessibilityRole).toBeUndefined();
    });
  });

  describe('Tag', () => {
    it('has accessibilityRole "text"', () => {
      renderForA11y(<Tag label="Status" testID="tag" />);
      const el = screen.getByTestId('tag');
      expectAccessible(el, { role: 'text' });
    });

    it('uses label as accessibilityLabel', () => {
      renderForA11y(<Tag label="Active" testID="tag" />);
      expect(screen.getByTestId('tag').props.accessibilityLabel).toBe('Active');
    });

    it('closable tag close button has accessibilityRole "button"', () => {
      renderForA11y(
        <Tag label="Remove me" closable onClose={jest.fn()} testID="tag" />,
      );
      const closeBtn = screen.getByLabelText('Remove me 삭제');
      expect(closeBtn.props.accessibilityRole).toBe('button');
    });
  });
});

// ---------------------------------------------------------------------------
// Feedback
// ---------------------------------------------------------------------------

describe('Accessibility — Feedback', () => {
  describe('Toast', () => {
    it('has accessibilityRole "alert"', () => {
      renderForA11y(
        <Toast message="Saved" visible testID="toast" />,
      );
      const el = screen.getByRole('alert');
      expectAccessible(el, { role: 'alert', requireLiveRegion: true });
    });

    it('sets accessibilityLiveRegion "polite"', () => {
      renderForA11y(
        <Toast message="Saved" visible testID="toast" />,
      );
      const el = screen.getByRole('alert');
      expect(el.props.accessibilityLiveRegion).toBe('polite');
    });

    it('does not render when not visible', () => {
      renderForA11y(
        <Toast message="Saved" visible={false} testID="toast" />,
      );
      expect(screen.queryByTestId('toast')).toBeNull();
    });
  });

  describe('Dialog', () => {
    it('dialog content has accessibilityRole "alert"', () => {
      renderForA11y(
        <Dialog visible title="Confirm" message="Are you sure?" testID="dlg" />,
      );
      const el = screen.getByTestId('dlg');
      expectAccessible(el, { role: 'alert', requireLabel: true });
    });

    it('uses title as accessibilityLabel', () => {
      renderForA11y(
        <Dialog visible title="Delete item" message="This cannot be undone." testID="dlg" />,
      );
      expect(screen.getByTestId('dlg').props.accessibilityLabel).toBe('Delete item');
    });

    it('action buttons have accessibilityRole "button"', () => {
      renderForA11y(
        <Dialog
          visible
          title="Confirm"
          actions={[
            { label: 'Cancel', onPress: jest.fn() },
            { label: 'OK', onPress: jest.fn(), variant: 'primary' },
          ]}
          testID="dlg"
        />,
      );
      const cancelBtn = screen.getByLabelText('Cancel');
      const okBtn = screen.getByLabelText('OK');
      expect(cancelBtn.props.accessibilityRole).toBe('button');
      expect(okBtn.props.accessibilityRole).toBe('button');
    });

    it('does not render when not visible', () => {
      renderForA11y(
        <Dialog visible={false} title="Hidden" testID="dlg" />,
      );
      expect(screen.queryByTestId('dlg')).toBeNull();
    });
  });

  describe('BottomSheet', () => {
    it('renders with accessibilityRole "none" on content container', () => {
      renderForA11y(
        <BottomSheet visible title="Options" testID="bs">
          <Text>Content</Text>
        </BottomSheet>,
      );
      const el = screen.getByTestId('bs');
      // BottomSheet uses accessibilityRole="none" on the content container
      expect(el.props.accessibilityRole).toBe('none');
    });

    it('does not render when not visible', () => {
      renderForA11y(
        <BottomSheet visible={false} title="Options" testID="bs">
          <Text>Content</Text>
        </BottomSheet>,
      );
      expect(screen.queryByTestId('bs')).toBeNull();
    });
  });

  describe('Snackbar', () => {
    it('has accessibilityRole "alert"', () => {
      renderForA11y(
        <Snackbar message="Item deleted" visible testID="snack" />,
      );
      const wrapper = screen.getByTestId('snack');
      const alertEl = wrapper.children[0] as { props: Record<string, unknown> };
      expect(alertEl.props.accessibilityRole).toBe('alert');
    });

    it('sets accessibilityLiveRegion "polite"', () => {
      renderForA11y(
        <Snackbar message="Item deleted" visible testID="snack" />,
      );
      const wrapper = screen.getByTestId('snack');
      const alertEl = wrapper.children[0] as { props: Record<string, unknown> };
      expect(alertEl.props.accessibilityLiveRegion).toBe('polite');
    });

    it('does not render when not visible', () => {
      renderForA11y(
        <Snackbar message="Item deleted" visible={false} testID="snack" />,
      );
      expect(screen.queryByTestId('snack')).toBeNull();
    });
  });
});

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

describe('Accessibility — Navigation', () => {
  describe('Header', () => {
    it('has accessibilityRole "header"', () => {
      renderForA11y(<Header title="Home" testID="hdr" />);
      const el = screen.getByTestId('hdr');
      expectAccessible(el, { role: 'header' });
    });
  });

  describe('TabBar', () => {
    const tabItems = [
      { key: 'home', label: 'Home', icon: <View /> },
      { key: 'search', label: 'Search', icon: <View /> },
      { key: 'profile', label: 'Profile', icon: <View /> },
    ];

    it('has accessibilityRole "tablist" on the container', () => {
      renderForA11y(
        <TabBar items={tabItems} activeKey="home" onChange={jest.fn()} testID="tb" />,
      );
      const el = screen.getByTestId('tb');
      expectAccessible(el, { role: 'tablist' });
    });

    it('individual tabs have accessibilityRole "tab"', () => {
      renderForA11y(
        <TabBar items={tabItems} activeKey="home" onChange={jest.fn()} testID="tb" />,
      );
      const homeTab = screen.getByLabelText('Home');
      expect(homeTab.props.accessibilityRole).toBe('tab');
    });

    it('active tab has accessibilityState selected true', () => {
      renderForA11y(
        <TabBar items={tabItems} activeKey="home" onChange={jest.fn()} testID="tb" />,
      );
      const homeTab = screen.getByLabelText('Home');
      expectCheckedState(homeTab, true, 'selected');
    });

    it('inactive tab has accessibilityState selected false', () => {
      renderForA11y(
        <TabBar items={tabItems} activeKey="home" onChange={jest.fn()} testID="tb" />,
      );
      const searchTab = screen.getByLabelText('Search');
      expectCheckedState(searchTab, false, 'selected');
    });
  });

  describe('NavigationBar', () => {
    it('has accessibilityRole "header"', () => {
      renderForA11y(<NavigationBar title="Details" testID="nb" />);
      const el = screen.getByTestId('nb');
      expectAccessible(el, { role: 'header' });
    });

    it('left action button has accessibilityRole "button"', () => {
      renderForA11y(
        <NavigationBar
          title="Details"
          leftAction={{ label: 'Back', onPress: jest.fn(), icon: <View /> }}
          testID="nb"
        />,
      );
      const backBtn = screen.getByLabelText('Back');
      expect(backBtn.props.accessibilityRole).toBe('button');
    });

    it('left action defaults accessibilityLabel to "뒤로" when no label given', () => {
      renderForA11y(
        <NavigationBar
          title="Details"
          leftAction={{ onPress: jest.fn(), icon: <View /> }}
          testID="nb"
        />,
      );
      const backBtn = screen.getByLabelText('뒤로');
      expect(backBtn.props.accessibilityRole).toBe('button');
    });

    it('right action buttons have accessibilityRole "button"', () => {
      renderForA11y(
        <NavigationBar
          title="Details"
          rightActions={[
            { label: 'Share', onPress: jest.fn(), icon: <View /> },
            { label: 'More', onPress: jest.fn(), icon: <View /> },
          ]}
          testID="nb"
        />,
      );
      const shareBtn = screen.getByLabelText('Share');
      const moreBtn = screen.getByLabelText('More');
      expect(shareBtn.props.accessibilityRole).toBe('button');
      expect(moreBtn.props.accessibilityRole).toBe('button');
    });
  });
});

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

describe('Accessibility — Primitives', () => {
  describe('Box', () => {
    it('passes through accessibility props', () => {
      renderForA11y(
        <Box accessibilityRole="summary" accessibilityLabel="Summary" testID="box">
          <Text>Content</Text>
        </Box>,
      );
      const el = screen.getByTestId('box');
      expect(el.props.accessibilityRole).toBe('summary');
      expect(el.props.accessibilityLabel).toBe('Summary');
    });
  });

  describe('Text', () => {
    it('renders text content that is readable by screen readers', () => {
      renderForA11y(<Text testID="txt">Hello world</Text>);
      expect(screen.getByText('Hello world')).toBeTruthy();
    });
  });

  describe('Pressable', () => {
    it('passes through accessibility props', () => {
      renderForA11y(
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Custom action"
          testID="press"
        >
          <Text>Action</Text>
        </Pressable>,
      );
      const el = screen.getByTestId('press');
      expect(el.props.accessibilityRole).toBe('button');
      expect(el.props.accessibilityLabel).toBe('Custom action');
    });
  });

  describe('Stack / HStack / VStack', () => {
    it('Stack renders without requiring accessibility role', () => {
      renderForA11y(
        <Stack testID="stack">
          <Text>Item</Text>
        </Stack>,
      );
      expect(screen.getByTestId('stack')).toBeTruthy();
    });

    it('HStack renders without requiring accessibility role', () => {
      renderForA11y(
        <HStack testID="hstack">
          <Text>Item</Text>
        </HStack>,
      );
      expect(screen.getByTestId('hstack')).toBeTruthy();
    });

    it('VStack renders without requiring accessibility role', () => {
      renderForA11y(
        <VStack testID="vstack">
          <Text>Item</Text>
        </VStack>,
      );
      expect(screen.getByTestId('vstack')).toBeTruthy();
    });
  });
});

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

describe('Accessibility — Layout', () => {
  describe('Divider', () => {
    it('has accessibilityRole "none" (decorative element)', () => {
      renderForA11y(<Divider testID="div" />);
      const el = screen.getByTestId('div');
      expectAccessible(el, { role: 'none' });
    });
  });

  describe('Spacer', () => {
    it('renders as a purely visual spacer without accessibility role', () => {
      renderForA11y(<Spacer size={16} testID="spacer" />);
      const el = screen.getByTestId('spacer');
      expect(el.props.accessibilityRole).toBeUndefined();
    });
  });

  describe('SafeArea', () => {
    it('renders children in safe area without requiring accessibility role', () => {
      renderForA11y(
        <SafeArea testID="sa">
          <Text>Content</Text>
        </SafeArea>,
      );
      expect(screen.getByTestId('sa')).toBeTruthy();
      expect(screen.getByText('Content')).toBeTruthy();
    });
  });
});
