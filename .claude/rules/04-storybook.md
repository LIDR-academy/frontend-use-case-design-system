# Storybook Standards

Este proyecto usa **Storybook 7** para documentar y desarrollar componentes de forma aislada.

## Reglas Generales

- **DEBE** tener al menos una story por componente
- **DEBE** documentar todas las variantes principales
- **DEBE** incluir controles para props importantes
- **DEBE** añadir documentación con JSDoc cuando sea necesario
- **DEBE** usar CSF (Component Story Format) 3.0

## Estructura de Stories

Cada componente **DEBE** tener su archivo de stories:

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.stories.tsx     # Stories de Storybook
└── ComponentName.spec.tsx
```

## Template Básico de Story

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Metadata del componente
const meta = {
  title: 'Atoms/Button', // Sigue la estructura de Atomic Design
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'], // Genera documentación automática
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

// Story con interacción
export const WithClick: Story = {
  args: {
    children: 'Click Me',
    onClick: () => alert('Clicked!'),
  },
};
```

## Organización en Storybook

Usa la estructura de Atomic Design en los títulos:

```typescript
// ✅ CORRECTO
title: 'Atoms/Button';
title: 'Molecules/SearchBox';
title: 'Organisms/Header';
title: 'Templates/DashboardTemplate';

// ❌ INCORRECTO
title: 'Button';
title: 'Components/Button';
```

## Documentación en Stories

Usa JSDoc para documentar componentes que aparecerá en autodocs:

````typescript
/**
 * Button component following Atomic Design principles.
 *
 * Use buttons to trigger actions and events, such as submitting forms,
 * opening dialogs, canceling actions, or performing delete operations.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({ ... }) => { ... }
````

## Addons Importantes

Este proyecto usa los siguientes addons que **DEBE** considerar:

### 1. Addon A11y (Accesibilidad)

Valida automáticamente la accesibilidad de cada story.

### 2. Addon Controls

Permite manipular props dinámicamente.

### 3. Addon Actions

Registra eventos como clicks, cambios, etc.

```typescript
export const Interactive: Story = {
  args: {
    onClick: fn(), // De @storybook/test para logging
  },
};
```

### 4. Addon Interactions

Para testing de interacciones:

```typescript
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const ClickTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  },
};
```

## Variantes Comunes a Documentar

**DEBE** incluir stories para:

1. **Variantes visuales**: primary, secondary, outline, etc.
2. **Tamaños**: small, medium, large
3. **Estados**: default, hover, active, disabled, loading
4. **Con/sin contenido**: empty states
5. **Casos extremos**: texto muy largo, contenido dinámico

## Scripts de Storybook

```bash
# Iniciar Storybook en desarrollo
npm run storybook

# Build de Storybook para producción
npm run build-storybook

# Deploy a Chromatic para visual testing
npm run chromatic
```

## Chromatic

Este proyecto usa **Chromatic** para visual regression testing.
Las stories automáticamente se testean visualmente en cada PR.

## Mejores Prácticas

1. **DEBE** mantener stories simples y enfocadas
2. **DEBE** usar nombres descriptivos para stories
3. **DEBE** incluir descripciones en argTypes
4. **NO DEBE** incluir lógica compleja en stories
5. **DEBE** usar el addon de accesibilidad en todas las stories
6. **DEBE** documentar props complejas con ejemplos
