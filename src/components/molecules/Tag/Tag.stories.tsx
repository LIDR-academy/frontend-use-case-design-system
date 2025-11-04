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
          'Componente Tag para mostrar etiquetas con iconos, diferentes colores, tamaños y tipos.',
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
    text: {
      control: { type: 'text' },
      description: 'Texto a mostrar en el tag',
    },
    color: {
      control: { type: 'select' },
      options: ['yellow', 'gray', 'blue', 'green', 'orange', 'pink', 'purple'],
      description: 'Color del tag',
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
      description: 'Tamaño del tag',
    },
    type: {
      control: { type: 'select' },
      options: ['positive', 'negative'],
      description: 'Tipo de tag (positivo o negativo)',
    },
    startIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono al inicio (arrow-left)',
    },
    endIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono al final (x)',
    },
    showText: {
      control: { type: 'boolean' },
      description: 'Mostrar texto',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories básicas
export const Default: Story = {
  args: {
    text: 'Tag',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag por defecto con configuración estándar',
      },
    },
  },
};

export const WithoutIcons: Story = {
  args: {
    text: 'Sin iconos',
    startIcon: false,
    endIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag sin iconos, solo texto',
      },
    },
  },
};

export const OnlyStartIcon: Story = {
  args: {
    text: 'Con inicio',
    startIcon: true,
    endIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag solo con icono de inicio (arrow-left)',
      },
    },
  },
};

export const OnlyEndIcon: Story = {
  args: {
    text: 'Con final',
    startIcon: false,
    endIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag solo con icono final (x)',
      },
    },
  },
};

// Tamaños
export const Small: Story = {
  args: {
    text: 'Pequeño',
    size: 's',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag tamaño pequeño',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    text: 'Mediano',
    size: 'm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag tamaño mediano (por defecto)',
      },
    },
  },
};

export const Large: Story = {
  args: {
    text: 'Grande',
    size: 'l',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag tamaño grande',
      },
    },
  },
};

// Tipos
export const Positive: Story = {
  args: {
    text: 'Positivo',
    type: 'positive',
    color: 'green',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag tipo positivo con fondo claro',
      },
    },
  },
};

export const Negative: Story = {
  args: {
    text: 'Negativo',
    type: 'negative',
    color: 'blue',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag tipo negativo con fondo oscuro',
      },
    },
  },
};

// Colores positivos
export const PositiveColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag text="Yellow" color="yellow" type="positive" />
      <Tag text="Gray" color="gray" type="positive" />
      <Tag text="Blue" color="blue" type="positive" />
      <Tag text="Green" color="green" type="positive" />
      <Tag text="Orange" color="orange" type="positive" />
      <Tag text="Pink" color="pink" type="positive" />
      <Tag text="Purple" color="purple" type="positive" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase de todos los colores disponibles en tipo positivo',
      },
    },
  },
};

// Colores negativos
export const NegativeColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag text="Yellow" color="yellow" type="negative" />
      <Tag text="Gray" color="gray" type="negative" />
      <Tag text="Blue" color="blue" type="negative" />
      <Tag text="Green" color="green" type="negative" />
      <Tag text="Orange" color="orange" type="negative" />
      <Tag text="Pink" color="pink" type="negative" />
      <Tag text="Purple" color="purple" type="negative" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase de todos los colores disponibles en tipo negativo',
      },
    },
  },
};

// Showcase completo
export const TagShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Tamaños</h3>
        <div className="flex items-center gap-4">
          <Tag text="Small" size="s" color="blue" />
          <Tag text="Medium" size="m" color="green" />
          <Tag text="Large" size="l" color="purple" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Variaciones de iconos</h3>
        <div className="flex flex-wrap gap-2">
          <Tag text="Ambos iconos" startIcon endIcon />
          <Tag text="Solo inicio" startIcon endIcon={false} />
          <Tag text="Solo final" startIcon={false} endIcon />
          <Tag text="Sin iconos" startIcon={false} endIcon={false} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Tipos</h3>
        <div className="flex flex-wrap gap-2">
          <Tag text="Positivo" type="positive" color="green" />
          <Tag text="Negativo" type="negative" color="blue" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase completo del componente Tag con todas sus variaciones',
      },
    },
  },
};
