import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Molecules/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tag component following Figma design system specifications. A molecule component that combines icons and text to display labels with consistent styling and accessibility.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'positive-green',
        'positive-blue',
        'positive-yellow',
        'positive-gray',
        'positive-orange',
        'positive-pink',
        'positive-purple',
        'negative-green',
        'negative-blue',
        'negative-yellow',
        'negative-gray',
        'negative-orange',
        'negative-pink',
        'negative-purple',
      ],
      description: 'Visual style variant following Figma design tokens',
    },
    showStartIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show the start icon (arrow)',
    },
    showEndIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show the end icon (close/x)',
    },
    children: {
      control: { type: 'text' },
      description: 'Text content of the tag',
    },
    onRemove: {
      description: 'Handler called when end icon (close) is clicked',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Positive Green (Figma design)
export const Default: Story = {
  args: {
    children: 'Tag',
    variant: 'positive-green',
    showStartIcon: true,
    showEndIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default Tag following Figma design specifications with positive-green variant',
      },
    },
  },
};

// Icon variations
export const WithoutIcons: Story = {
  args: {
    children: 'No Icons',
    variant: 'positive-blue',
    showStartIcon: false,
    showEndIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag without any icons, displaying only text',
      },
    },
  },
};

export const OnlyStartIcon: Story = {
  args: {
    children: 'Start Only',
    variant: 'positive-green',
    showStartIcon: true,
    showEndIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag with only the start icon (arrow)',
      },
    },
  },
};

export const OnlyEndIcon: Story = {
  args: {
    children: 'End Only',
    variant: 'positive-blue',
    showStartIcon: false,
    showEndIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag with only the end icon (close/remove)',
      },
    },
  },
};

// Positive variants
export const PositiveGreen: Story = {
  args: {
    children: 'Positive Green',
    variant: 'positive-green',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Positive green variant matching Figma design tokens (#dafaeb bg, #075e45 text)',
      },
    },
  },
};

export const PositiveBlue: Story = {
  args: {
    children: 'Positive Blue',
    variant: 'positive-blue',
  },
};

export const PositiveYellow: Story = {
  args: {
    children: 'Positive Yellow',
    variant: 'positive-yellow',
  },
};

export const PositiveGray: Story = {
  args: {
    children: 'Positive Gray',
    variant: 'positive-gray',
  },
};

export const PositiveOrange: Story = {
  args: {
    children: 'Positive Orange',
    variant: 'positive-orange',
  },
};

export const PositivePink: Story = {
  args: {
    children: 'Positive Pink',
    variant: 'positive-pink',
  },
};

export const PositivePurple: Story = {
  args: {
    children: 'Positive Purple',
    variant: 'positive-purple',
  },
};

// Negative variants
export const NegativeGreen: Story = {
  args: {
    children: 'Negative Green',
    variant: 'negative-green',
  },
  parameters: {
    docs: {
      description: {
        story: 'Negative green variant with dark background',
      },
    },
  },
};

export const NegativeBlue: Story = {
  args: {
    children: 'Negative Blue',
    variant: 'negative-blue',
  },
};

export const NegativeYellow: Story = {
  args: {
    children: 'Negative Yellow',
    variant: 'negative-yellow',
  },
};

export const NegativeGray: Story = {
  args: {
    children: 'Negative Gray',
    variant: 'negative-gray',
  },
};

export const NegativeOrange: Story = {
  args: {
    children: 'Negative Orange',
    variant: 'negative-orange',
  },
};

export const NegativePink: Story = {
  args: {
    children: 'Negative Pink',
    variant: 'negative-pink',
  },
};

export const NegativePurple: Story = {
  args: {
    children: 'Negative Purple',
    variant: 'negative-purple',
  },
};

// Interactive examples
export const WithRemoveHandler: Story = {
  args: {
    children: 'Click X to Remove',
    variant: 'positive-green',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tag with onRemove handler. Click the X icon to trigger the remove action.',
      },
    },
  },
};

// Showcase stories
export const AllPositiveVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="positive-green">Green</Tag>
      <Tag variant="positive-blue">Blue</Tag>
      <Tag variant="positive-yellow">Yellow</Tag>
      <Tag variant="positive-gray">Gray</Tag>
      <Tag variant="positive-orange">Orange</Tag>
      <Tag variant="positive-pink">Pink</Tag>
      <Tag variant="positive-purple">Purple</Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all positive variant colors',
      },
    },
  },
};

export const AllNegativeVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="negative-green">Green</Tag>
      <Tag variant="negative-blue">Blue</Tag>
      <Tag variant="negative-yellow">Yellow</Tag>
      <Tag variant="negative-gray">Gray</Tag>
      <Tag variant="negative-orange">Orange</Tag>
      <Tag variant="negative-pink">Pink</Tag>
      <Tag variant="negative-purple">Purple</Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all negative variant colors',
      },
    },
  },
};

export const IconVariations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="positive-green" showStartIcon showEndIcon>
        Both Icons
      </Tag>
      <Tag variant="positive-blue" showStartIcon showEndIcon={false}>
        Start Only
      </Tag>
      <Tag variant="positive-yellow" showStartIcon={false} showEndIcon>
        End Only
      </Tag>
      <Tag variant="positive-purple" showStartIcon={false} showEndIcon={false}>
        No Icons
      </Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all icon configuration variations',
      },
    },
  },
};

export const TagShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Positive Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="positive-green">Green</Tag>
          <Tag variant="positive-blue">Blue</Tag>
          <Tag variant="positive-yellow">Yellow</Tag>
          <Tag variant="positive-gray">Gray</Tag>
          <Tag variant="positive-orange">Orange</Tag>
          <Tag variant="positive-pink">Pink</Tag>
          <Tag variant="positive-purple">Purple</Tag>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Negative Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="negative-green">Green</Tag>
          <Tag variant="negative-blue">Blue</Tag>
          <Tag variant="negative-yellow">Yellow</Tag>
          <Tag variant="negative-gray">Gray</Tag>
          <Tag variant="negative-orange">Orange</Tag>
          <Tag variant="negative-pink">Pink</Tag>
          <Tag variant="negative-purple">Purple</Tag>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Icon Configurations</h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="positive-green" showStartIcon showEndIcon>
            Both Icons
          </Tag>
          <Tag variant="positive-blue" showStartIcon showEndIcon={false}>
            Start Only
          </Tag>
          <Tag variant="positive-yellow" showStartIcon={false} showEndIcon>
            End Only
          </Tag>
          <Tag
            variant="positive-purple"
            showStartIcon={false}
            showEndIcon={false}
          >
            No Icons
          </Tag>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete showcase of the Tag component with all variants and configurations',
      },
    },
  },
};
