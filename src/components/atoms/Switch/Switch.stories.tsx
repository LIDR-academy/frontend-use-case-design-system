import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle switch component for binary on/off states. Follows WCAG 2.1 AA accessibility standards with keyboard navigation support.',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is in the on (checked) state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback fired when the switch state changes',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the switch',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    label: {
      control: 'text',
      description: 'Optional label text displayed next to the switch',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/**
 * Default switch in the unchecked state.
 */
export const Default: Story = {
  args: {
    checked: false,
  },
};

/**
 * Switch in the checked (on) state.
 */
export const Checked: Story = {
  args: {
    checked: true,
  },
};

/**
 * Small size variant.
 */
export const Small: Story = {
  args: {
    size: 'sm',
    checked: false,
  },
};

/**
 * Medium size variant (default).
 */
export const Medium: Story = {
  args: {
    size: 'md',
    checked: false,
  },
};

/**
 * Large size variant.
 */
export const Large: Story = {
  args: {
    size: 'lg',
    checked: false,
  },
};

/**
 * Switch with a label text.
 */
export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
    checked: false,
  },
};

/**
 * Disabled switch in unchecked state.
 */
export const DisabledUnchecked: Story = {
  args: {
    disabled: true,
    checked: false,
    label: 'Disabled switch',
  },
};

/**
 * Disabled switch in checked state.
 */
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    label: 'Disabled switch',
  },
};

/**
 * Interactive controlled switch with state management.
 * Demonstrates how to use the Switch component with React state.
 */
const ControlledExample = (args: typeof Switch) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="space-y-4">
      <Switch
        {...args}
        checked={isChecked}
        onCheckedChange={setIsChecked}
        label="Toggle me"
      />
      <div className="text-sm text-muted-foreground">
        Switch is: <strong>{isChecked ? 'ON' : 'OFF'}</strong>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: ControlledExample,
};

/**
 * Multiple switches with different sizes and states.
 */
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch size="sm" label="Small" checked={false} />
      <Switch size="md" label="Medium" checked={false} />
      <Switch size="lg" label="Large" checked={false} />
    </div>
  ),
};

/**
 * Switches demonstrating different states.
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Unchecked" checked={false} />
      <Switch label="Checked" checked={true} />
      <Switch label="Disabled unchecked" disabled checked={false} />
      <Switch label="Disabled checked" disabled checked={true} />
    </div>
  ),
};

/**
 * Form integration example showing switch in a form context.
 */
const FormIntegrationExample = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
  });

  return (
    <form className="space-y-4 p-4 border border-input rounded-md bg-background">
      <h3 className="text-lg font-semibold mb-4">Settings</h3>
      <Switch
        label="Enable notifications"
        checked={settings.notifications}
        onCheckedChange={(checked) =>
          setSettings({ ...settings, notifications: checked })
        }
      />
      <Switch
        label="Dark mode"
        checked={settings.darkMode}
        onCheckedChange={(checked) =>
          setSettings({ ...settings, darkMode: checked })
        }
      />
      <Switch
        label="Auto-save"
        checked={settings.autoSave}
        onCheckedChange={(checked) =>
          setSettings({ ...settings, autoSave: checked })
        }
      />
      <div className="mt-4 pt-4 border-t border-input">
        <p className="text-sm text-muted-foreground">Current settings:</p>
        <pre className="mt-2 text-xs bg-muted p-2 rounded">
          {JSON.stringify(settings, null, 2)}
        </pre>
      </div>
    </form>
  );
};

export const FormIntegration: Story = {
  render: FormIntegrationExample,
};
