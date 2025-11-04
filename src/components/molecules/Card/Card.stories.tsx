import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente Card flexible para mostrar contenido agrupado con diferentes variantes y estados.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'heading-order',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'outlined', 'filled'],
      description: 'Estilo visual de la card',
    },
    title: {
      control: 'text',
      description: 'Título principal de la card',
    },
    subtitle: {
      control: 'text',
      description: 'Subtítulo o descripción adicional',
    },
    children: {
      control: 'text',
      description: 'Contenido principal de la card',
    },
    className: {
      control: 'text',
      description: 'Clases CSS adicionales',
    },
    onClick: {
      action: 'clicked',
      description:
        'Función que se ejecuta al hacer click (hace la card interactiva)',
    },
    headerActions: {
      control: false,
      description: 'Elementos de acción en el header (botones, iconos, etc.)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories básicas
export const Default: Story = {
  args: {
    children: 'Esta es una card básica con contenido simple.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card por defecto con variante elevated y contenido básico.',
      },
    },
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Título de la Card',
    children: 'Esta card tiene un título en el header.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con título en el header.',
      },
    },
  },
};

export const WithTitleAndSubtitle: Story = {
  args: {
    title: 'Título Principal',
    subtitle: 'Subtítulo descriptivo',
    children: 'Esta card tiene tanto título como subtítulo.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con título y subtítulo en el header.',
      },
    },
  },
};

export const WithHeaderActions: Story = {
  args: {
    title: 'Card con Acciones',
    headerActions: (
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
          Editar
        </button>
        <button className="px-3 py-1 text-sm border border-gray-300 rounded">
          Más
        </button>
      </div>
    ),
    children: 'Esta card tiene botones de acción en el header.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con elementos de acción en el header.',
      },
    },
  },
};

// Variantes
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'Card Elevated',
    children: 'Esta card usa la variante elevated con sombra.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Variante elevated con sombra para destacar el contenido.',
      },
    },
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    title: 'Card Outlined',
    children: 'Esta card usa la variante outlined con borde.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Variante outlined con borde sutil.',
      },
    },
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    title: 'Card Filled',
    children: 'Esta card usa la variante filled con fondo coloreado.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Variante filled con fondo de color diferenciado.',
      },
    },
  },
};

// Card interactiva
export const Clickable: Story = {
  args: {
    title: 'Card Interactiva',
    children: 'Esta card es clickeable. Prueba hacer click en ella.',
    onClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'Card interactiva que responde a clicks y navegación por teclado.',
      },
    },
  },
};

// Ejemplos con contenido complejo
export const ComplexContent: Story = {
  args: {
    title: 'Producto Premium',
    subtitle: 'Categoría: Electrónicos',
    headerActions: (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
        En stock
      </span>
    ),
    children: (
      <div className="space-y-4">
        <img
          src="https://via.placeholder.com/300x200/e2e8f0/64748b?text=Producto"
          alt="Producto"
          className="w-full h-32 object-cover rounded"
        />
        <p className="text-gray-600">
          Descripción detallada del producto con múltiples características y
          beneficios que lo hacen único en el mercado.
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">$299.99</span>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Añadir al carrito
          </button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplo de card con contenido complejo: imagen, texto, precio y botón.',
      },
    },
  },
};

export const InfoCard: Story = {
  args: {
    title: 'Información del Sistema',
    variant: 'filled',
    children: (
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">Versión:</span>
          <span>v2.1.0</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Estado:</span>
          <span className="text-green-600">Activo</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Último backup:</span>
          <span>Hace 2 horas</span>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card de información con datos estructurados.',
      },
    },
  },
};

// Interaction Testing
export const ClickInteraction: Story = {
  args: {
    title: 'Test de Interacción',
    children: 'Click me para probar la interactividad!',
    onClick: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('button');

    // Verificar que la card es clickeable
    await expect(card).toBeInTheDocument();
    await expect(card).toHaveAttribute('tabIndex', '0');

    // Simular click
    await userEvent.click(card);
  },
  parameters: {
    docs: {
      description: {
        story: 'Demostración de interaction testing con play function.',
      },
    },
  },
};

// Estados especiales
export const LongContent: Story = {
  args: {
    title: 'Card con Contenido Extenso',
    children: (
      <div className="space-y-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <div className="border-t pt-4">
          <button className="w-full py-2 text-blue-600 hover:text-blue-800">
            Leer más...
          </button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Card con contenido extenso que demuestra el manejo de espaciado.',
      },
    },
  },
};

export const MinimalCard: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div className="text-center py-8">
        <div className="text-4xl mb-2">📋</div>
        <p className="text-gray-500">Sin contenido</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card minimalista sin título, ideal para estados vacíos.',
      },
    },
  },
};
