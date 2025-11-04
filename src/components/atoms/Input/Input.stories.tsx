import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Campo de entrada de texto con diferentes variantes y estados.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'label',
            enabled: true,
          },
          {
            id: 'autocomplete-valid',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
      description: 'Estilo visual del input',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Tipo de input HTML',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Si el input está deshabilitado',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Si el campo es obligatorio',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Si ocupa todo el ancho disponible',
    },
    label: {
      control: 'text',
      description: 'Etiqueta del campo',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
    },
    error: {
      control: 'text',
      description: 'Mensaje de error',
    },
    helperText: {
      control: 'text',
      description: 'Texto de ayuda',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Variants
export const Outlined: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input con borde - variante más común',
      },
    },
  },
};

export const Filled: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    variant: 'filled',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input con fondo relleno',
      },
    },
  },
};

export const Standard: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    variant: 'standard',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input estilo material design con línea inferior',
      },
    },
  },
};

// States
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    error: 'Please enter a valid email address',
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input mostrando estado de error',
      },
    },
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    helperText: 'Password must be at least 8 characters',
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input con texto de ayuda',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input deshabilitado',
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input obligatorio con indicador visual',
      },
    },
  },
};

// With Icons
export const WithStartIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    startIcon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input con icono al inicio',
      },
    },
  },
};

export const WithEndIcon: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    endIcon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input con icono al final',
      },
    },
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This input takes full width',
    fullWidth: true,
    variant: 'outlined',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Input que ocupa todo el ancho disponible',
      },
    },
  },
};

// Interaction Testing
export const TypeInteraction: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    variant: 'outlined',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Name');

    // Verificar que el input está visible
    await expect(input).toBeInTheDocument();

    // Simular escritura
    await userEvent.type(input, 'John Doe');

    // Verificar que el valor se actualizó
    await expect(input).toHaveValue('John Doe');
  },
  parameters: {
    docs: {
      description: {
        story: 'Demostración de interaction testing - escribir en el input',
      },
    },
  },
};

// Controlled Input Example
const ControlledInputExample = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Validación simple
    if (newValue.length < 3) {
      setError('Mínimo 3 caracteres');
    } else {
      setError('');
    }
  };

  return (
    <div className="w-80">
      <Input
        label="Controlled Input"
        placeholder="Type something..."
        value={value}
        onChange={handleChange}
        error={error}
        variant="outlined"
      />
      <p className="mt-2 text-sm text-text-secondary">
        Characters: {value.length}
      </p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledInputExample />,
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de input controlado con validación en tiempo real',
      },
    },
  },
};
