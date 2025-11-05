import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Campo de selección desplegable con diferentes estados y configuraciones. Basado en el elemento nativo HTML select con estilos mejorados y funcionalidades adicionales.',
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
            id: 'select-name',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    options: {
      description: 'Array de opciones para el select',
      control: 'object',
    },
    label: {
      control: 'text',
      description: 'Etiqueta del campo',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder mostrado como primera opción',
    },
    error: {
      control: 'text',
      description: 'Mensaje de error',
    },
    helperText: {
      control: 'text',
      description: 'Texto de ayuda',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Si el select está deshabilitado',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Si el campo es obligatorio',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Si ocupa todo el ancho disponible',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options for stories
const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const categoryOptions = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'food', label: 'Food & Beverages' },
  { value: 'books', label: 'Books' },
  { value: 'sports', label: 'Sports & Outdoors' },
];

// Basic variants
export const Default: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Select a country',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select básico con label y placeholder',
      },
    },
  },
};

export const WithoutLabel: Story = {
  args: {
    options: priorityOptions,
    placeholder: 'Select priority',
    'aria-label': 'Priority selector',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select sin label visible, usando aria-label para accesibilidad',
      },
    },
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: priorityOptions,
    label: 'Priority',
    defaultValue: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select con valor por defecto preseleccionado',
      },
    },
  },
};

export const WithoutPlaceholder: Story = {
  args: {
    options: categoryOptions,
    label: 'Category',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select sin placeholder - muestra la primera opción por defecto',
      },
    },
  },
};

// States
export const WithError: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Select a country',
    error: 'Please select a valid country',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select mostrando estado de error',
      },
    },
  },
};

export const WithHelperText: Story = {
  args: {
    options: countryOptions,
    label: 'Shipping Country',
    placeholder: 'Select a country',
    helperText: 'Select the country where your order will be shipped',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select con texto de ayuda',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Select a country',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Select deshabilitado',
      },
    },
  },
};

export const DisabledWithValue: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    defaultValue: 'us',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Select deshabilitado con valor preseleccionado',
      },
    },
  },
};

export const Required: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Select a country',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Select obligatorio con indicador visual (*)',
      },
    },
  },
};

// Options variations
export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      {
        value: 'mx',
        label: 'Mexico (Temporarily unavailable)',
        disabled: true,
      },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'de', label: 'Germany (Out of stock)', disabled: true },
      { value: 'fr', label: 'France' },
    ],
    label: 'Shipping Country',
    placeholder: 'Select a country',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select con algunas opciones deshabilitadas',
      },
    },
  },
};

export const ManyOptions: Story = {
  args: {
    options: [
      { value: 'af', label: 'Afghanistan' },
      { value: 'al', label: 'Albania' },
      { value: 'dz', label: 'Algeria' },
      { value: 'ar', label: 'Argentina' },
      { value: 'au', label: 'Australia' },
      { value: 'at', label: 'Austria' },
      { value: 'bd', label: 'Bangladesh' },
      { value: 'be', label: 'Belgium' },
      { value: 'br', label: 'Brazil' },
      { value: 'ca', label: 'Canada' },
      { value: 'cl', label: 'Chile' },
      { value: 'cn', label: 'China' },
      { value: 'co', label: 'Colombia' },
      { value: 'dk', label: 'Denmark' },
      { value: 'eg', label: 'Egypt' },
      { value: 'fi', label: 'Finland' },
      { value: 'fr', label: 'France' },
      { value: 'de', label: 'Germany' },
      { value: 'gr', label: 'Greece' },
      { value: 'in', label: 'India' },
      { value: 'id', label: 'Indonesia' },
      { value: 'ie', label: 'Ireland' },
      { value: 'il', label: 'Israel' },
      { value: 'it', label: 'Italy' },
      { value: 'jp', label: 'Japan' },
      { value: 'ke', label: 'Kenya' },
      { value: 'mx', label: 'Mexico' },
      { value: 'nl', label: 'Netherlands' },
      { value: 'nz', label: 'New Zealand' },
      { value: 'no', label: 'Norway' },
      { value: 'pk', label: 'Pakistan' },
      { value: 'pe', label: 'Peru' },
      { value: 'ph', label: 'Philippines' },
      { value: 'pl', label: 'Poland' },
      { value: 'pt', label: 'Portugal' },
      { value: 'ru', label: 'Russia' },
      { value: 'sa', label: 'Saudi Arabia' },
      { value: 'sg', label: 'Singapore' },
      { value: 'za', label: 'South Africa' },
      { value: 'kr', label: 'South Korea' },
      { value: 'es', label: 'Spain' },
      { value: 'se', label: 'Sweden' },
      { value: 'ch', label: 'Switzerland' },
      { value: 'th', label: 'Thailand' },
      { value: 'tr', label: 'Turkey' },
      { value: 'ua', label: 'Ukraine' },
      { value: 'ae', label: 'United Arab Emirates' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'us', label: 'United States' },
      { value: 've', label: 'Venezuela' },
      { value: 'vn', label: 'Vietnam' },
    ],
    label: 'Country',
    placeholder: 'Select a country',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select con muchas opciones - útil para testing de scroll',
      },
    },
  },
};

export const FewOptions: Story = {
  args: {
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    label: 'Do you agree?',
    placeholder: 'Select your answer',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select con pocas opciones (binario)',
      },
    },
  },
};

// Width variants
export const FullWidth: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Select a country',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Select que ocupa todo el ancho disponible',
      },
    },
  },
};

// Interaction testing
export const SelectInteraction: Story = {
  args: {
    options: priorityOptions,
    label: 'Priority',
    placeholder: 'Select priority',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    // Verificar que el select está visible
    await expect(select).toBeInTheDocument();

    // Simular selección de una opción
    await userEvent.selectOptions(select, 'high');

    // Verificar que el valor se actualizó
    await expect(select).toHaveValue('high');
  },
  parameters: {
    docs: {
      description: {
        story: 'Demostración de interaction testing - seleccionar una opción',
      },
    },
  },
};

// Controlled Select Example
const ControlledSelectExample = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Simple validation
    if (newValue === '') {
      setError('Please select an option');
    } else {
      setError('');
    }
  };

  return (
    <div className="w-80">
      <Select
        options={priorityOptions}
        label="Priority Level"
        placeholder="Select priority"
        value={value}
        onChange={handleChange}
        error={error}
      />
      {value && !error && (
        <p className="mt-2 text-sm text-green-600">
          Selected: {priorityOptions.find((opt) => opt.value === value)?.label}
        </p>
      )}
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledSelectExample />,
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de select controlado con validación en tiempo real',
      },
    },
  },
};

// Form integration example
const FormExample = () => {
  const [formData, setFormData] = useState({
    country: '',
    priority: '',
    category: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="w-96 space-y-4">
      <Select
        options={countryOptions}
        label="Country"
        placeholder="Select a country"
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        required
      />
      <Select
        options={priorityOptions}
        label="Priority"
        placeholder="Select priority"
        value={formData.priority}
        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        required
      />
      <Select
        options={categoryOptions}
        label="Category"
        placeholder="Select category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        helperText="Choose the most relevant category"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
      {submitted && (
        <div className="p-4 bg-green-100 border border-green-400 rounded-md">
          <p className="text-sm text-green-800">
            Form submitted successfully!
            <br />
            Country: {formData.country}
            <br />
            Priority: {formData.priority}
            <br />
            Category: {formData.category || 'Not selected'}
          </p>
        </div>
      )}
    </form>
  );
};

export const FormIntegration: Story = {
  render: () => <FormExample />,
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de integración en un formulario completo',
      },
    },
  },
};

// Real-world scenarios
export const ShippingForm: Story = {
  args: {
    options: countryOptions,
    label: 'Shipping Country',
    placeholder: 'Select shipping destination',
    helperText: 'Shipping costs will be calculated based on your selection',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Escenario real: formulario de envío',
      },
    },
  },
};

export const PrioritySelector: Story = {
  args: {
    options: priorityOptions,
    label: 'Task Priority',
    defaultValue: 'medium',
    helperText: 'Set the priority level for this task',
  },
  parameters: {
    docs: {
      description: {
        story: 'Escenario real: selector de prioridad en gestor de tareas',
      },
    },
  },
};

export const FilterDropdown: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Filter by category',
    'aria-label': 'Category filter',
    fullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Escenario real: dropdown de filtrado sin label visible',
      },
    },
  },
};
