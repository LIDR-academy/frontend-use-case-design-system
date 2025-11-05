# Code Quality Standards

Este proyecto mantiene altos estándares de calidad de código para asegurar mantenibilidad y escalabilidad.

## Linting y Formatting

### ESLint

**DEBE** pasar todas las reglas de ESLint antes de commit:

```bash
# Ejecutar linter
npm run lint

# Auto-fix cuando sea posible
npm run lint:fix
```

**NO DEBE** usar `eslint-disable` sin un comentario explicativo:

```typescript
// ❌ INCORRECTO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = fetchData();

// ✅ CORRECTO
// ESLint disable: Legacy API returns untyped data, will be migrated in TASK-123
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = legacyApi.fetchData();
```

### Prettier

**DEBE** formatear código con Prettier:

```bash
# Formatear todo el código
npm run format

# Verificar formato
npm run format:check
```

Prettier corre automáticamente en pre-commit hooks.

## Convenciones de Código

### Naming Conventions

#### Componentes y Tipos

```typescript
// ✅ CORRECTO - PascalCase
interface ButtonProps {}
type UserRole = 'admin' | 'user';
const Button: React.FC<ButtonProps> = () => {};

// ❌ INCORRECTO
interface buttonProps {}
const button = () => {};
```

#### Variables y Funciones

```typescript
// ✅ CORRECTO - camelCase
const userName = 'John';
const handleClick = () => {};

// ❌ INCORRECTO
const UserName = 'John';
const HandleClick = () => {};
```

#### Constantes

```typescript
// ✅ CORRECTO - UPPER_SNAKE_CASE para constantes globales
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';

// camelCase para constantes locales está bien
const defaultProps = {};
```

#### Archivos

```typescript
// ✅ CORRECTO - PascalCase para componentes
Button.tsx;
Button.stories.tsx;
Button.spec.tsx;

// ✅ CORRECTO - camelCase para utilities
formatDate.ts;
useDebounce.ts;

// ✅ CORRECTO - kebab-case para configs
tailwind.config.cjs;
playwright.config.ts;
```

### Imports

Orden de imports:

```typescript
// 1. React y librerías externas
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

// 2. Imports internos (componentes, hooks, utils)
import { Button } from '../atoms/Button';
import { useDebounce } from '@/hooks/useDebounce';
import { formatDate } from '@/utils/formatDate';

// 3. Tipos
import type { UserRole } from '@/types';

// 4. Estilos
import './styles.css';
```

**DEBE** usar imports absolutos cuando estén configurados:

```typescript
// ✅ CORRECTO
import { Button } from '@/components/atoms/Button';

// ⚠️ ACEPTABLE pero menos preferido
import { Button } from '../../../components/atoms/Button';
```

### Estructura de Componentes

```typescript
// 1. Imports
import React from 'react';

// 2. Tipos e interfaces
interface ButtonProps {
  // ...
}

// 3. Constantes
const BUTTON_VARIANTS = { };

// 4. Componente
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  ...props
}) => {
  // 4.1 Hooks
  const [isPressed, setIsPressed] = useState(false);

  // 4.2 Funciones auxiliares
  const handleClick = () => {
    setIsPressed(true);
  };

  // 4.3 Render
  return (
    <button onClick={handleClick}>
      {/* ... */}
    </button>
  );
};

// 5. Display name (para debugging)
Button.displayName = 'Button';
```

### Props Destructuring

**DEBE** desestructurar props en la firma de la función:

```typescript
// ✅ CORRECTO
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  ...rest
}) => {
  return <button {...rest}>{children}</button>;
};

// ❌ INCORRECTO
export const Button: React.FC<ButtonProps> = (props) => {
  return <button>{props.children}</button>;
};
```

### Event Handlers

**DEBE** usar el prefijo `handle` para funciones que manejan eventos:

```typescript
// ✅ CORRECTO
const handleClick = () => {};
const handleSubmit = (event: FormEvent) => {};
const handleChange = (value: string) => {};

// ❌ INCORRECTO
const onClick = () => {};
const submit = () => {};
```

### Boolean Props

**DEBE** usar prefijos `is`, `has`, `should` para props booleanas:

```typescript
// ✅ CORRECTO
interface ButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  hasIcon?: boolean;
  shouldAutoFocus?: boolean;
}

// ❌ INCORRECTO
interface ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  icon?: boolean;
}
```

### Comments

**DEBE** escribir comentarios útiles, no obvios:

```typescript
// ❌ INCORRECTO - comentario obvio
// Set loading to true
setIsLoading(true);

// ✅ CORRECTO - explica el "por qué"
// Delay loading state to prevent flash for fast responses
setTimeout(() => setIsLoading(true), 100);
```

**DEBE** usar JSDoc para funciones públicas y componentes:

````typescript
/**
 * Primary button component for user actions.
 *
 * @param variant - Visual style of the button
 * @param size - Size of the button
 * @param disabled - Whether the button is disabled
 * @param onClick - Handler called when button is clicked
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({ ... }) => { }
````

## Performance

### Evitar Re-renders Innecesarios

```typescript
// ✅ CORRECTO - usa React.memo para componentes puros
export const Button = React.memo<ButtonProps>(({ children, ...props }) => {
  return <button {...props}>{children}</button>;
});

// ✅ CORRECTO - usa useCallback para funciones
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

// ✅ CORRECTO - usa useMemo para cálculos costosos
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

### Lazy Loading

```typescript
// ✅ CORRECTO - lazy load componentes pesados
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

## Seguridad

**NO DEBE** usar `dangerouslySetInnerHTML` sin sanitizar:

```typescript
// ❌ PELIGROSO
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ CORRECTO - sanitiza primero
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

**NO DEBE** ejecutar código arbitrario del usuario:

```typescript
// ❌ PELIGROSO
eval(userCode);
new Function(userCode)();
```

## Pre-commit Hooks

El proyecto usa hooks que validan:

- Lint (ESLint)
- Format (Prettier)
- Types (TypeScript)
- Tests (si están configurados)

**NO DEBE** hacer commits que rompan estas validaciones.

## Code Review Checklist

Antes de crear un PR, verifica:

- [ ] Pasa `npm run lint`
- [ ] Pasa `npm run format:check`
- [ ] Pasa `npm run build`
- [ ] Pasa `npm run test`
- [ ] No hay `console.log` olvidados
- [ ] No hay imports sin usar
- [ ] No hay código comentado sin explicación
- [ ] Componentes tienen tests
- [ ] Componentes tienen stories
- [ ] Documentación actualizada si es necesario
