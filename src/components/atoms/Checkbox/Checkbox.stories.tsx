import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (partially checked)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the checkbox',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'I agree',
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Unchecked option',
    checked: false,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
    checked: true,
    disabled: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'You can unsubscribe at any time',
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept privacy policy',
    error: 'You must accept the privacy policy to continue',
  },
};

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Checkbox without visible label',
  },
};

const InteractiveCheckbox: React.FC<{ label: string }> = ({ label }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox
      label={label}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Interactive: Story = {
  args: {
    label: 'Click to toggle',
  },
  render: (args) => (
    <InteractiveCheckbox label={args.label || 'Click to toggle'} />
  ),
};

export const MultipleCheckboxes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Option 1" />
      <Checkbox label="Option 2" checked />
      <Checkbox label="Option 3" />
      <Checkbox label="Option 4 (disabled)" disabled />
    </div>
  ),
};
