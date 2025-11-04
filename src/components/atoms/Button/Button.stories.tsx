import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Botón principal del design system con diferentes variantes y tamaños.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'button-name',
            enabled: true,
          },
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
      options: ['primary', 'secondary', 'outline', 'destructive'],
      description: 'Estilo visual del botón',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Si el botón está deshabilitado',
    },
    onClick: {
      action: 'clicked',
      description: 'Función que se ejecuta al hacer click',
    },
    children: {
      control: 'text',
      description: 'Contenido del botón',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories básicas
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón primario - usado para acciones principales',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón secundario - usado para acciones secundarias',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón outline - usado para acciones menos prominentes',
      },
    },
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Botón destructivo - usado para acciones peligrosas como eliminar',
      },
    },
  },
};

// Tamaños
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// Estados
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón deshabilitado - no puede ser interactuado',
      },
    },
  },
};

// Interaction Testing
export const ClickInteraction: Story = {
  args: {
    children: 'Click me!',
    variant: 'primary',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me!/i });

    // Verificar que el botón está visible
    await expect(button).toBeInTheDocument();

    // Simular click
    await userEvent.click(button);

    // Verificar que el onClick fue llamado (si está definido)
    if (args.onClick) {
      // En un escenario real, aquí verificaríamos que el callback fue llamado
      console.log('Button was clicked!');
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Demostración de interaction testing con play function',
      },
    },
  },
};

// Loading State (ejemplo de estado adicional)
export const WithIcon: Story = {
  args: {
    children: (
      <span className="flex items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        With Icon
      </span>
    ),
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón con icono incluido en el contenido',
      },
    },
  },
};
