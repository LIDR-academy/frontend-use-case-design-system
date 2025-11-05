import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tooltip component displays contextual information when users hover over or focus on an element. It follows WCAG 2.1 AA accessibility guidelines with proper ARIA attributes and keyboard navigation support.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The content to display in the tooltip',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the trigger element',
    },
    showDelay: {
      control: 'number',
      description: 'Delay in milliseconds before showing the tooltip',
    },
    hideDelay: {
      control: 'number',
      description: 'Delay in milliseconds before hiding the tooltip',
    },
    children: {
      control: false,
      description: 'The trigger element that activates the tooltip',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the tooltip container',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tooltip positioned on top of the trigger element.
 * Hover or focus to see the tooltip.
 */
export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    position: 'top',
    children: (
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Hover me
      </button>
    ),
  },
};

/**
 * Tooltip positioned at the top of the trigger element.
 */
export const Top: Story = {
  args: {
    content: 'Tooltip on top',
    position: 'top',
    children: (
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Top position
      </button>
    ),
  },
};

/**
 * Tooltip positioned at the bottom of the trigger element.
 */
export const Bottom: Story = {
  args: {
    content: 'Tooltip on bottom',
    position: 'bottom',
    children: (
      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Bottom position
      </button>
    ),
  },
};

/**
 * Tooltip positioned to the left of the trigger element.
 */
export const Left: Story = {
  args: {
    content: 'Tooltip on left',
    position: 'left',
    children: (
      <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
        Left position
      </button>
    ),
  },
};

/**
 * Tooltip positioned to the right of the trigger element.
 */
export const Right: Story = {
  args: {
    content: 'Tooltip on right',
    position: 'right',
    children: (
      <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
        Right position
      </button>
    ),
  },
};

/**
 * All four positions demonstrated in a grid layout.
 */
export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-32">
      <div className="text-center">
        <Tooltip content="Top tooltip" position="top">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Top
          </button>
        </Tooltip>
      </div>
      <div className="flex gap-32">
        <Tooltip content="Left tooltip" position="left">
          <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            Left
          </button>
        </Tooltip>
        <Tooltip content="Right tooltip" position="right">
          <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            Right
          </button>
        </Tooltip>
      </div>
      <div className="text-center">
        <Tooltip content="Bottom tooltip" position="bottom">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Bottom
          </button>
        </Tooltip>
      </div>
    </div>
  ),
};

/**
 * Tooltip with a longer show delay (500ms) for better UX when scanning UI.
 */
export const CustomShowDelay: Story = {
  args: {
    content: 'This tooltip appears after 500ms',
    position: 'top',
    showDelay: 500,
    children: (
      <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
        Slow show (500ms delay)
      </button>
    ),
  },
};

/**
 * Tooltip with a custom hide delay (500ms) to allow reading before it disappears.
 */
export const CustomHideDelay: Story = {
  args: {
    content: 'This tooltip stays visible for 500ms after mouse leaves',
    position: 'top',
    showDelay: 100,
    hideDelay: 500,
    children: (
      <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
        Slow hide (500ms delay)
      </button>
    ),
  },
};

/**
 * Tooltip with instant show/hide (no delays).
 */
export const NoDelays: Story = {
  args: {
    content: 'Instant tooltip',
    position: 'top',
    showDelay: 0,
    hideDelay: 0,
    children: (
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Instant (no delays)
      </button>
    ),
  },
};

/**
 * Tooltip with longer content that might wrap.
 */
export const LongContent: Story = {
  args: {
    content:
      'This is a much longer tooltip with more detailed information that helps users understand the feature better',
    position: 'top',
    children: (
      <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
        Long content
      </button>
    ),
  },
};

/**
 * Tooltip with JSX content including formatting.
 */
export const RichContent: Story = {
  args: {
    content: (
      <span>
        Tooltip with <strong>bold text</strong>
      </span>
    ),
    position: 'top',
    children: (
      <button className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600">
        Rich content
      </button>
    ),
  },
};

/**
 * Tooltip on a text element (not just buttons).
 */
export const OnTextElement: Story = {
  args: {
    content: 'Additional information about this term',
    position: 'top',
    children: (
      <span className="border-b-2 border-dotted border-gray-400 cursor-help">
        Hover this text
      </span>
    ),
  },
};

/**
 * Tooltip on an icon or small element.
 */
export const OnIconElement: Story = {
  args: {
    content: 'Help information',
    position: 'right',
    children: (
      <button
        className="w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-gray-700 font-bold text-sm"
        aria-label="Help"
      >
        ?
      </button>
    ),
  },
};

/**
 * Multiple tooltips in a row to demonstrate independent behavior.
 */
export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="First tooltip" position="top">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          First
        </button>
      </Tooltip>
      <Tooltip content="Second tooltip" position="top">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Second
        </button>
      </Tooltip>
      <Tooltip content="Third tooltip" position="top">
        <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          Third
        </button>
      </Tooltip>
    </div>
  ),
};

/**
 * Demonstrates keyboard navigation support.
 * Use Tab to navigate and see tooltips appear on focus.
 * Press Escape to dismiss the tooltip.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="flex flex-col gap-4 text-center">
      <p className="text-sm text-gray-600 mb-4">
        Press Tab to navigate between buttons. Tooltips will appear on focus.
        <br />
        Press Escape to dismiss a visible tooltip.
      </p>
      <div className="flex gap-4 justify-center">
        <Tooltip content="First tooltip (Tab to focus)" position="top">
          <button className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            First
          </button>
        </Tooltip>
        <Tooltip content="Second tooltip (Tab to focus)" position="top">
          <button className="px-4 py-2 bg-green-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Second
          </button>
        </Tooltip>
        <Tooltip content="Third tooltip (Tab to focus)" position="top">
          <button className="px-4 py-2 bg-purple-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            Third
          </button>
        </Tooltip>
      </div>
    </div>
  ),
};

/**
 * Interactive playground to test all tooltip props.
 */
export const Playground: Story = {
  args: {
    content: 'Customize me in the controls below!',
    position: 'top',
    showDelay: 200,
    hideDelay: 0,
    children: (
      <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Interactive tooltip
      </button>
    ),
  },
};
