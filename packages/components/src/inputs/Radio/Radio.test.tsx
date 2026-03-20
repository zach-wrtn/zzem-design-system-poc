import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { RadioGroup } from './Radio';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

describe('RadioGroup', () => {
  it('renders with testID', () => {
    render(
      <RadioGroup
        options={options}
        value="a"
        onChange={jest.fn()}
        testID="radio-group"
      />,
    );
    expect(screen.getByTestId('radio-group')).toBeTruthy();
  });

  it('renders all options', () => {
    render(
      <RadioGroup
        options={options}
        value="a"
        onChange={jest.fn()}
        testID="radio-group"
      />,
    );
    expect(screen.getByText('Option A')).toBeTruthy();
    expect(screen.getByText('Option B')).toBeTruthy();
    expect(screen.getByText('Option C')).toBeTruthy();
  });

  it('calls onChange on option press', () => {
    const onChange = jest.fn();
    render(
      <RadioGroup
        options={options}
        value="a"
        onChange={onChange}
        testID="radio-group"
      />,
    );
    fireEvent.press(screen.getByText('Option B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(
      <RadioGroup
        options={options}
        value="a"
        onChange={onChange}
        disabled
        testID="radio-group"
      />,
    );
    fireEvent.press(screen.getByText('Option B'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders group label', () => {
    render(
      <RadioGroup
        options={options}
        value="a"
        onChange={jest.fn()}
        label="Pick one"
        testID="radio-group"
      />,
    );
    expect(screen.getByText('Pick one')).toBeTruthy();
  });

  it('applies accessibility role radiogroup', () => {
    render(
      <RadioGroup
        options={options}
        value="a"
        onChange={jest.fn()}
        testID="radio-group"
      />,
    );
    const group = screen.getByTestId('radio-group');
    expect(group.props.accessibilityRole).toBe('radiogroup');
  });

  describe('selected value display', () => {
    it('renders selected option', () => {
      render(
        <RadioGroup
          options={options}
          value="b"
          onChange={jest.fn()}
          testID="radio-group"
        />,
      );
      expect(screen.getByText('Option B')).toBeTruthy();
    });
  });

  describe('onChange argument', () => {
    it('receives the selected option value when pressed', () => {
      const onChange = jest.fn();
      render(
        <RadioGroup
          options={options}
          value="a"
          onChange={onChange}
          testID="radio-group"
        />,
      );
      fireEvent.press(screen.getByText('Option C'));
      expect(onChange).toHaveBeenCalledWith('c');
    });

    it('receives the first option value when first option is pressed', () => {
      const onChange = jest.fn();
      render(
        <RadioGroup
          options={options}
          value="b"
          onChange={onChange}
          testID="radio-group"
        />,
      );
      fireEvent.press(screen.getByText('Option A'));
      expect(onChange).toHaveBeenCalledWith('a');
    });
  });

  describe('disabled state', () => {
    it('does not call onChange for any option when group is disabled', () => {
      const onChange = jest.fn();
      render(
        <RadioGroup
          options={options}
          value="a"
          onChange={onChange}
          disabled
          testID="radio-group"
        />,
      );
      fireEvent.press(screen.getByText('Option A'));
      fireEvent.press(screen.getByText('Option B'));
      fireEvent.press(screen.getByText('Option C'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when individual option is disabled', () => {
      const onChange = jest.fn();
      const optionsWithDisabled = [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b', disabled: true },
        { label: 'Option C', value: 'c' },
      ];
      render(
        <RadioGroup
          options={optionsWithDisabled}
          value="a"
          onChange={onChange}
          testID="radio-group"
        />,
      );
      fireEvent.press(screen.getByText('Option B'));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('empty options', () => {
    it('renders with empty options array', () => {
      render(
        <RadioGroup
          options={[]}
          value=""
          onChange={jest.fn()}
          testID="radio-group"
        />,
      );
      expect(screen.getByTestId('radio-group')).toBeTruthy();
    });
  });

  describe('single option', () => {
    it('renders with a single option', () => {
      render(
        <RadioGroup
          options={[{ label: 'Only Option', value: 'only' }]}
          value="only"
          onChange={jest.fn()}
          testID="radio-group"
        />,
      );
      expect(screen.getByText('Only Option')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('uses label as accessibilityLabel for the group', () => {
      render(
        <RadioGroup
          options={options}
          value="a"
          onChange={jest.fn()}
          label="Choose option"
          testID="radio-group"
        />,
      );
      const group = screen.getByTestId('radio-group');
      expect(group.props.accessibilityLabel).toBe('Choose option');
    });

    it('uses explicit accessibilityLabel over label', () => {
      render(
        <RadioGroup
          options={options}
          value="a"
          onChange={jest.fn()}
          label="Choose"
          accessibilityLabel="Choose an option from the list"
          testID="radio-group"
        />,
      );
      const group = screen.getByTestId('radio-group');
      expect(group.props.accessibilityLabel).toBe(
        'Choose an option from the list',
      );
    });
  });

  describe('direction', () => {
    it('renders with vertical direction by default', () => {
      render(
        <RadioGroup
          options={options}
          value="a"
          onChange={jest.fn()}
          testID="radio-group"
        />,
      );
      expect(screen.getByTestId('radio-group')).toBeTruthy();
    });

    it('renders with horizontal direction', () => {
      render(
        <RadioGroup
          options={options}
          value="a"
          onChange={jest.fn()}
          direction="horizontal"
          testID="radio-group"
        />,
      );
      expect(screen.getByTestId('radio-group')).toBeTruthy();
    });
  });
});
