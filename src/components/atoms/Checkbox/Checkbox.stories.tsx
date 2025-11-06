import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A checkbox component that allows users to select one or more options from a set. Supports different sizes, states, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the checkbox',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the checkbox',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkbox without any label
 */
export const Default: Story = {
  args: {},
};

/**
 * Checkbox with a label
 */
export const WithLabel: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

/**
 * Small size checkbox
 */
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small checkbox',
  },
};

/**
 * Medium size checkbox (default)
 */
export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium checkbox',
  },
};

/**
 * Large size checkbox
 */
export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large checkbox',
  },
};

/**
 * Checkbox in checked state
 */
export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    defaultChecked: true,
  },
};

/**
 * Checkbox in disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

/**
 * Disabled checkbox in checked state
 */
export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    disabled: true,
    defaultChecked: true,
  },
};

/**
 * Checkbox with required indicator
 */
export const Required: Story = {
  args: {
    label: 'Required checkbox',
    required: true,
  },
};

/**
 * Checkbox with error message
 */
export const WithError: Story = {
  args: {
    label: 'Checkbox with error',
    error: 'You must accept the terms and conditions',
  },
};

/**
 * Checkbox with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'You can unsubscribe at any time',
  },
};

/**
 * Checkbox in indeterminate state
 */
export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
    indeterminate: true,
  },
};

/**
 * Interactive example with controlled state
 */
const ControlledExample = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="Controlled checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <p className="text-sm text-muted-foreground">
        Checkbox is {checked ? 'checked' : 'unchecked'}
      </p>
    </div>
  );
};

export const ControlledCheckbox: Story = {
  render: () => <ControlledExample />,
};

/**
 * Group of checkboxes example
 */
const CheckboxGroupExample = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (option: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold">Select your interests</h3>
      <Checkbox
        label="Technology"
        checked={selectedOptions.includes('technology')}
        onChange={(e) => handleChange('technology', e.target.checked)}
      />
      <Checkbox
        label="Design"
        checked={selectedOptions.includes('design')}
        onChange={(e) => handleChange('design', e.target.checked)}
      />
      <Checkbox
        label="Business"
        checked={selectedOptions.includes('business')}
        onChange={(e) => handleChange('business', e.target.checked)}
      />
      <Checkbox
        label="Marketing"
        checked={selectedOptions.includes('marketing')}
        onChange={(e) => handleChange('marketing', e.target.checked)}
      />
      <p className="text-sm text-muted-foreground mt-2">
        Selected: {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'none'}
      </p>
    </div>
  );
};

export const CheckboxGroup: Story = {
  render: () => <CheckboxGroupExample />,
};

/**
 * Select all with indeterminate state example
 */
const SelectAllExample = () => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const handleSelectAll = (checked: boolean) => {
    setCheckedItems([checked, checked, checked]);
  };

  const handleItemChange = (index: number, checked: boolean) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = checked;
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={(e) => handleSelectAll(e.target.checked)}
      />
      <div className="ml-6 flex flex-col gap-2">
        <Checkbox
          label="Option 1"
          checked={checkedItems[0]}
          onChange={(e) => handleItemChange(0, e.target.checked)}
        />
        <Checkbox
          label="Option 2"
          checked={checkedItems[1]}
          onChange={(e) => handleItemChange(1, e.target.checked)}
        />
        <Checkbox
          label="Option 3"
          checked={checkedItems[2]}
          onChange={(e) => handleItemChange(2, e.target.checked)}
        />
      </div>
    </div>
  );
};

export const SelectAllIndeterminate: Story = {
  render: () => <SelectAllExample />,
};

/**
 * All size variants comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox (default)" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
};

/**
 * All states demonstration
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Default" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="With error" error="This field is required" />
      <Checkbox label="Required" required />
      <Checkbox label="With helper text" helperText="Optional helper text" />
    </div>
  ),
};
