# Styling Standards

Este proyecto usa **Tailwind CSS** para estilos con un enfoque utility-first.

## Principios Generales

- **DEBE** usar Tailwind classes como primera opción
- **PUEDE** usar CSS modules solo cuando Tailwind no sea suficiente
- **NO DEBE** usar inline styles excepto para valores dinámicos
- **DEBE** mantener consistencia con el design system

## Uso de Tailwind

### Clases Básicas

```typescript
// ✅ CORRECTO - usa Tailwind utilities
<button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
  Click me
</button>

// ❌ INCORRECTO - evita inline styles
<button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
  Click me
</button>
```

### Clases Condicionales

Usa `clsx` o similar para clases condicionales:

```typescript
import clsx from 'clsx';

const buttonClasses = clsx(
  'px-4 py-2 rounded-md font-medium transition-colors',
  {
    'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
    'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
    'opacity-50 cursor-not-allowed': disabled,
  }
);

<button className={buttonClasses}>Click me</button>
```

### Variantes con Maps

Para componentes con múltiples variantes:

```typescript
const buttonVariants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

<button className={clsx(
  'rounded-md font-medium transition-colors',
  buttonVariants[variant],
  buttonSizes[size]
)}>
  Click me
</button>
```

## Design Tokens

**DEBE** usar valores del theme de Tailwind configurado:

```typescript
// ✅ CORRECTO - usa tokens de Tailwind
<div className="text-primary-500 bg-gray-100">

// ❌ INCORRECTO - valores hardcodeados
<div className="text-[#3B82F6] bg-[#F3F4F6]">
```

## Responsive Design

**DEBE** ser mobile-first:

```typescript
// ✅ CORRECTO - mobile first
<div className="w-full md:w-1/2 lg:w-1/3">

// Define primero mobile, luego tablets (md:), luego desktop (lg:)
```

Breakpoints en Tailwind:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Estados Interactivos

**DEBE** incluir estados hover, focus, active:

```typescript
<button className="
  bg-blue-500
  hover:bg-blue-600
  focus:ring-2 focus:ring-blue-300 focus:outline-none
  active:bg-blue-700
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-colors
">
  Interactive Button
</button>
```

## Dark Mode

Si el proyecto soporta dark mode, usa el prefijo `dark:`:

```typescript
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

## Animaciones y Transiciones

**DEBE** usar utilidades de Tailwind para transiciones suaves:

```typescript
// ✅ CORRECTO
<button className="transition-all duration-200 ease-in-out hover:scale-105">

// Para animaciones complejas, usa @keyframes en tailwind.config
```

## Spacing y Layout

**DEBE** usar el sistema de spacing de Tailwind (4px base):

```typescript
// ✅ CORRECTO - spacing consistente
<div className="p-4 m-2 space-y-4">
  {/* p-4 = 16px, m-2 = 8px, space-y-4 = 16px entre hijos */}
</div>

// ❌ INCORRECTO - valores arbitrarios sin razón
<div className="p-[13px] m-[7px]">
```

## Organización de Clases

Ordena las clases de forma consistente (sugerencia):

1. Layout (display, position)
2. Box model (width, height, padding, margin)
3. Typography
4. Visual (background, border, shadow)
5. States (hover, focus, etc.)

```typescript
// Orden sugerido
<div className="
  flex items-center justify-between
  w-full p-4 mt-2
  text-lg font-medium
  bg-white border border-gray-200 rounded-lg shadow-sm
  hover:bg-gray-50
">
```

## CSS Custom cuando sea necesario

Solo cuando Tailwind no sea suficiente:

```typescript
// component.module.css
.customScrollbar::-webkit-scrollbar {
  width: 8px;
}

// Component.tsx
import styles from './component.module.css';

<div className={clsx('overflow-auto', styles.customScrollbar)}>
```

## Accesibilidad en Estilos

**DEBE** asegurar:

- Focus visible con `focus:ring-2` o similar
- Contraste de colores adecuado
- Tamaños de tap target mínimos (44x44px en mobile)

```typescript
// ✅ CORRECTO - focus visible
<button className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

// ✅ CORRECTO - tap target adecuado
<button className="min-w-[44px] min-h-[44px] p-2">
```

## Tailwind Config

Configuraciones custom **DEBEN** estar en `tailwind.config.cjs`.
No modifiques sin discutir con el equipo.

## Mejores Prácticas

1. **Reutiliza** componentes en lugar de duplicar clases
2. **Extrae** patrones comunes a componentes
3. **Documenta** variantes en Storybook
4. **Prueba** responsive en diferentes tamaños
5. **Valida** contraste de colores
