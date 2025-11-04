import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente Icon para mostrar iconos SVG con diferentes tamaños y colores usando semantic tokens.',
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
    name: {
      control: { type: 'select' },
      options: ['leaf', 'accessibility', 'x', 'handshake', 'arrow-left'],
      description: 'Nombre del icono a mostrar',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del icono',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'muted', 'destructive', 'foreground'],
      description: 'Color del icono usando semantic tokens (modo estático)',
    },
    colorVariant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variante de color para modo interactivo',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'focus', 'disabled'],
      description: 'Estado controlado del icono',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Habilitar estados interactivos',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilitar el icono',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories básicas por icono
export const Leaf: Story = {
  args: {
    name: 'leaf',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icono de hoja - representa naturaleza, sostenibilidad',
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    name: 'accessibility',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Icono de accesibilidad - representa inclusión y diseño universal',
      },
    },
  },
};

export const X: Story = {
  args: {
    name: 'x',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icono X - representa cerrar, cancelar o eliminar',
      },
    },
  },
};

export const Handshake: Story = {
  args: {
    name: 'handshake',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Icono de handshake - representa colaboración, acuerdo, partnership',
      },
    },
  },
};

export const ArrowLeft: Story = {
  args: {
    name: 'arrow-left',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Icono de flecha izquierda - representa volver, anterior, navegación',
      },
    },
  },
};

// Tamaños
export const ExtraSmall: Story = {
  args: {
    name: 'leaf',
    size: 'xs',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tamaño extra pequeño (12px) - para uso en elementos muy compactos',
      },
    },
  },
};

export const Small: Story = {
  args: {
    name: 'leaf',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tamaño pequeño (16px) - para uso en texto o botones pequeños',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    name: 'leaf',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tamaño mediano (24px) - tamaño por defecto para uso general',
      },
    },
  },
};

export const Large: Story = {
  args: {
    name: 'leaf',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tamaño grande (32px) - para elementos destacados',
      },
    },
  },
};

export const ExtraLarge: Story = {
  args: {
    name: 'leaf',
    size: 'xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tamaño extra grande (40px) - para uso decorativo o headers',
      },
    },
  },
};

// Colores
export const Primary: Story = {
  args: {
    name: 'accessibility',
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Color primario - para iconos principales e importantes',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    name: 'accessibility',
    color: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Color secundario - para iconos de apoyo',
      },
    },
  },
};

export const Muted: Story = {
  args: {
    name: 'accessibility',
    color: 'muted',
  },
  parameters: {
    docs: {
      description: {
        story: 'Color apagado - para iconos decorativos o de baja prioridad',
      },
    },
  },
};

export const Destructive: Story = {
  args: {
    name: 'accessibility',
    color: 'destructive',
  },
  parameters: {
    docs: {
      description: {
        story: 'Color destructivo - para acciones peligrosas o errores',
      },
    },
  },
};

// Estados interactivos
export const InteractivePrimary: Story = {
  args: {
    name: 'leaf',
    interactive: true,
    colorVariant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Icono interactivo con variante primary - hover sobre el icono para ver el efecto',
      },
    },
  },
};

export const InteractiveSecondary: Story = {
  args: {
    name: 'accessibility',
    interactive: true,
    colorVariant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icono interactivo con variante secondary',
      },
    },
  },
};

export const InteractiveTertiary: Story = {
  args: {
    name: 'handshake',
    interactive: true,
    colorVariant: 'tertiary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icono interactivo con variante tertiary',
      },
    },
  },
};

export const DisabledInteractive: Story = {
  args: {
    name: 'x',
    interactive: true,
    disabled: true,
    colorVariant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icono interactivo deshabilitado',
      },
    },
  },
};

// Estados controlados
export const ControlledStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Estados Primary</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <Icon
              name="leaf"
              interactive
              colorVariant="primary"
              state="default"
            />
            <div className="text-xs mt-1">Default</div>
          </div>
          <div className="text-center">
            <Icon
              name="leaf"
              interactive
              colorVariant="primary"
              state="hover"
            />
            <div className="text-xs mt-1">Hover</div>
          </div>
          <div className="text-center">
            <Icon
              name="leaf"
              interactive
              colorVariant="primary"
              state="focus"
            />
            <div className="text-xs mt-1">Focus</div>
          </div>
          <div className="text-center">
            <Icon
              name="leaf"
              interactive
              colorVariant="primary"
              state="disabled"
            />
            <div className="text-xs mt-1">Disabled</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Estados Secondary</h3>
        <div className="flex items-center gap-4 bg-gray-800 p-4 rounded">
          <div className="text-center">
            <Icon
              name="accessibility"
              interactive
              colorVariant="secondary"
              state="default"
            />
            <div className="text-xs mt-1 text-white">Default</div>
          </div>
          <div className="text-center">
            <Icon
              name="accessibility"
              interactive
              colorVariant="secondary"
              state="hover"
            />
            <div className="text-xs mt-1 text-white">Hover</div>
          </div>
          <div className="text-center">
            <Icon
              name="accessibility"
              interactive
              colorVariant="secondary"
              state="focus"
            />
            <div className="text-xs mt-1 text-white">Focus</div>
          </div>
          <div className="text-center">
            <Icon
              name="accessibility"
              interactive
              colorVariant="secondary"
              state="disabled"
            />
            <div className="text-xs mt-1 text-white">Disabled</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Estados Tertiary</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <Icon
              name="handshake"
              interactive
              colorVariant="tertiary"
              state="default"
            />
            <div className="text-xs mt-1">Default</div>
          </div>
          <div className="text-center">
            <Icon
              name="handshake"
              interactive
              colorVariant="tertiary"
              state="hover"
            />
            <div className="text-xs mt-1">Hover</div>
          </div>
          <div className="text-center">
            <Icon
              name="handshake"
              interactive
              colorVariant="tertiary"
              state="focus"
            />
            <div className="text-xs mt-1">Focus</div>
          </div>
          <div className="text-center">
            <Icon
              name="handshake"
              interactive
              colorVariant="tertiary"
              state="disabled"
            />
            <div className="text-xs mt-1">Disabled</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demostración de todos los estados interactivos controlados',
      },
    },
  },
};

// Combinaciones en showcase
export const IconShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Iconos disponibles</h3>
        <div className="flex items-center gap-4">
          <Icon name="leaf" size="lg" />
          <span>Leaf</span>
        </div>
        <div className="flex items-center gap-4">
          <Icon name="accessibility" size="lg" />
          <span>Accessibility</span>
        </div>
        <div className="flex items-center gap-4">
          <Icon name="x" size="lg" />
          <span>X (Close)</span>
        </div>
        <div className="flex items-center gap-4">
          <Icon name="handshake" size="lg" />
          <span>Handshake</span>
        </div>
        <div className="flex items-center gap-4">
          <Icon name="arrow-left" size="lg" />
          <span>Arrow Left</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tamaños</h3>
        <div className="flex items-center gap-4">
          <Icon name="leaf" size="xs" />
          <Icon name="leaf" size="sm" />
          <Icon name="leaf" size="md" />
          <Icon name="leaf" size="lg" />
          <Icon name="leaf" size="xl" />
        </div>

        <h3 className="text-lg font-semibold">Colores estáticos</h3>
        <div className="flex items-center gap-4">
          <Icon name="accessibility" color="primary" />
          <Icon name="accessibility" color="secondary" />
          <Icon name="accessibility" color="muted" />
          <Icon name="accessibility" color="destructive" />
          <Icon name="accessibility" color="foreground" />
        </div>

        <h3 className="text-lg font-semibold">Iconos interactivos</h3>
        <div className="flex items-center gap-4">
          <Icon name="leaf" interactive colorVariant="primary" />
          <Icon name="accessibility" interactive colorVariant="secondary" />
          <Icon name="handshake" interactive colorVariant="tertiary" />
          <Icon name="x" interactive colorVariant="primary" disabled />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Showcase completo: iconos estáticos, tamaños, colores e interactivos',
      },
    },
  },
};
