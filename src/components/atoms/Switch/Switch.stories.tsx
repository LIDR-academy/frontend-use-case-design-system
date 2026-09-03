import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the switch',
    },
    label: {
      control: 'text',
      description: 'Optional label text for the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    label: 'Default Switch',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked Switch',
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
    label: 'Unchecked Switch',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    label: 'Disabled Switch',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    label: 'Disabled Checked',
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};

export const SmallSize: Story = {
  args: {
    checked: false,
    label: 'Small Switch',
    size: 'sm',
  },
};

export const MediumSize: Story = {
  args: {
    checked: false,
    label: 'Medium Switch',
    size: 'md',
  },
};

export const LargeSize: Story = {
  args: {
    checked: false,
    label: 'Large Switch',
    size: 'lg',
  },
};

const InteractiveExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        label="Interactive Switch"
      />
      <p className="text-sm text-muted-foreground">
        Switch is {checked ? 'ON' : 'OFF'}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveExample />,
};

const MultipleSizesExample = () => {
  const [small, setSmall] = useState(false);
  const [medium, setMedium] = useState(false);
  const [large, setLarge] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Switch
        checked={small}
        onCheckedChange={setSmall}
        label="Small"
        size="sm"
      />
      <Switch
        checked={medium}
        onCheckedChange={setMedium}
        label="Medium"
        size="md"
      />
      <Switch
        checked={large}
        onCheckedChange={setLarge}
        label="Large"
        size="lg"
      />
    </div>
  );
};

export const MultipleSizes: Story = {
  render: () => <MultipleSizesExample />,
};

const FormIntegrationExample = () => {
  const [formData, setFormData] = useState({
    notifications: true,
    marketing: false,
    analytics: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h3 className="text-lg font-semibold mb-2">Preferences</h3>
      <Switch
        checked={formData.notifications}
        onCheckedChange={(checked) =>
          setFormData({ ...formData, notifications: checked })
        }
        label="Enable notifications"
      />
      <Switch
        checked={formData.marketing}
        onCheckedChange={(checked) =>
          setFormData({ ...formData, marketing: checked })
        }
        label="Marketing emails"
      />
      <Switch
        checked={formData.analytics}
        onCheckedChange={(checked) =>
          setFormData({ ...formData, analytics: checked })
        }
        label="Analytics tracking"
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Save Preferences
      </button>
    </form>
  );
};

export const FormIntegration: Story = {
  render: () => <FormIntegrationExample />,
};
