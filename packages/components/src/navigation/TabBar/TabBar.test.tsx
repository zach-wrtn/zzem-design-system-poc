import React from 'react';
import { Text as RNText } from 'react-native';
import { render, screen, fireEvent } from '../../test-utils';
import { TabBar } from './TabBar';

const items = [
  { key: 'home', label: 'Home', icon: <RNText>🏠</RNText> },
  { key: 'search', label: 'Search', icon: <RNText>🔍</RNText> },
];

describe('TabBar', () => {
  it('renders with testID', () => {
    render(<TabBar items={items} activeKey="home" onChange={jest.fn()} testID="tabbar" />);
    expect(screen.getByTestId('tabbar')).toBeTruthy();
  });

  it('renders all tab labels', () => {
    render(<TabBar items={items} activeKey="home" onChange={jest.fn()} testID="tabbar" />);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Search')).toBeTruthy();
  });

  it('calls onChange on tab press', () => {
    const onChange = jest.fn();
    render(<TabBar items={items} activeKey="home" onChange={onChange} testID="tabbar" />);
    fireEvent.press(screen.getByText('Search'));
    expect(onChange).toHaveBeenCalledWith('search');
  });

  it('applies tablist role', () => {
    render(<TabBar items={items} activeKey="home" onChange={jest.fn()} testID="tabbar" />);
    const tabbar = screen.getByTestId('tabbar');
    expect(tabbar.props.accessibilityRole).toBe('tablist');
  });

  it('shows badge when provided', () => {
    const itemsWithBadge = [
      ...items,
      { key: 'notifications', label: 'Notifications', icon: <RNText>🔔</RNText>, badge: 5 },
    ];
    render(<TabBar items={itemsWithBadge} activeKey="home" onChange={jest.fn()} testID="tabbar" />);
    expect(screen.getByText('5')).toBeTruthy();
  });

  describe('onChange receives correct tab key', () => {
    it('passes the key of the pressed tab to onChange', () => {
      const onChange = jest.fn();
      render(<TabBar items={items} activeKey="home" onChange={onChange} testID="tabbar" />);
      fireEvent.press(screen.getByText('Search'));
      expect(onChange).toHaveBeenCalledWith('search');
    });

    it('passes key when pressing the first tab', () => {
      const onChange = jest.fn();
      render(<TabBar items={items} activeKey="search" onChange={onChange} testID="tabbar" />);
      fireEvent.press(screen.getByText('Home'));
      expect(onChange).toHaveBeenCalledWith('home');
    });
  });

  describe('active tab identification', () => {
    it('marks active tab with selected state', () => {
      render(<TabBar items={items} activeKey="home" onChange={jest.fn()} testID="tabbar" />);
      const tabs = screen.getAllByRole('tab');
      // First tab (Home) should be selected
      expect(tabs[0].props.accessibilityState).toEqual({ selected: true });
      // Second tab (Search) should not be selected
      expect(tabs[1].props.accessibilityState).toEqual({ selected: false });
    });

    it('updates selected state when activeKey changes', () => {
      const { rerender } = render(
        <TabBar items={items} activeKey="home" onChange={jest.fn()} testID="tabbar" />,
      );
      let tabs = screen.getAllByRole('tab');
      expect(tabs[0].props.accessibilityState).toEqual({ selected: true });

      rerender(<TabBar items={items} activeKey="search" onChange={jest.fn()} testID="tabbar" />);
      tabs = screen.getAllByRole('tab');
      expect(tabs[0].props.accessibilityState).toEqual({ selected: false });
      expect(tabs[1].props.accessibilityState).toEqual({ selected: true });
    });
  });

  describe('icon rendering', () => {
    it('renders icons for each tab', () => {
      render(<TabBar items={items} activeKey="home" onChange={jest.fn()} testID="tabbar" />);
      expect(screen.getByText('🏠')).toBeTruthy();
      expect(screen.getByText('🔍')).toBeTruthy();
    });

    it('renders activeIcon when tab is active and activeIcon is provided', () => {
      const itemsWithActiveIcon = [
        {
          key: 'home',
          label: 'Home',
          icon: <RNText>🏠</RNText>,
          activeIcon: <RNText>🏡</RNText>,
        },
        { key: 'search', label: 'Search', icon: <RNText>🔍</RNText> },
      ];
      render(
        <TabBar items={itemsWithActiveIcon} activeKey="home" onChange={jest.fn()} testID="tabbar" />,
      );
      // Active icon should be shown for active tab
      expect(screen.getByText('🏡')).toBeTruthy();
      // Regular icon should be shown for inactive tab
      expect(screen.getByText('🔍')).toBeTruthy();
    });
  });

  describe('badge value rendering', () => {
    it('renders badge count as string', () => {
      const itemsWithBadge = [
        { key: 'inbox', label: 'Inbox', icon: <RNText>📥</RNText>, badge: 12 },
      ];
      render(
        <TabBar items={itemsWithBadge} activeKey="inbox" onChange={jest.fn()} testID="tabbar" />,
      );
      expect(screen.getByText('12')).toBeTruthy();
    });

    it('renders 99+ for badge values over 99', () => {
      const itemsWithLargeBadge = [
        { key: 'inbox', label: 'Inbox', icon: <RNText>📥</RNText>, badge: 150 },
      ];
      render(
        <TabBar items={itemsWithLargeBadge} activeKey="inbox" onChange={jest.fn()} testID="tabbar" />,
      );
      expect(screen.getByText('99+')).toBeTruthy();
    });

    it('does not render badge when badge is 0', () => {
      const itemsWithZeroBadge = [
        { key: 'inbox', label: 'Inbox', icon: <RNText>📥</RNText>, badge: 0 },
      ];
      render(
        <TabBar items={itemsWithZeroBadge} activeKey="inbox" onChange={jest.fn()} testID="tabbar" />,
      );
      expect(screen.queryByText('0')).toBeNull();
    });

    it('does not render badge when badge is undefined', () => {
      render(
        <TabBar items={items} activeKey="home" onChange={jest.fn()} testID="tabbar" />,
      );
      // No badge text should be rendered for items without badge
      expect(screen.queryByText('0')).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('each tab has tab role', () => {
      render(<TabBar items={items} activeKey="home" onChange={jest.fn()} testID="tabbar" />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(2);
    });

    it('tabs have accessibility labels matching their labels', () => {
      render(<TabBar items={items} activeKey="home" onChange={jest.fn()} testID="tabbar" />);
      expect(screen.getByLabelText('Home')).toBeTruthy();
      expect(screen.getByLabelText('Search')).toBeTruthy();
    });
  });
});
