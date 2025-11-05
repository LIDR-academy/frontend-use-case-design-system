# TypeScript Standards

Este proyecto usa TypeScript estricto para garantizar type safety y mejor DX.

## Reglas Generales

- **DEBE** usar TypeScript para todos los archivos `.tsx` y `.ts`
- **DEBE** evitar el uso de `any` - usar `unknown` si el tipo es realmente desconocido
- **DEBE** definir interfaces para todas las props de componentes
- **DEBE** exportar tipos e interfaces que puedan ser reutilizadas
- **NO DEBE** usar `@ts-ignore` sin un comentario explicativo

## Props de Componentes

### Siempre define interfaces para props:

```typescript
// ✅ CORRECTO
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ ... }) => { ... }

// ❌ INCORRECTO
export const Button = (props: any) => { ... }
```

### Extiende tipos HTML nativos cuando sea apropiado:

```typescript
// ✅ CORRECTO
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Esto permite usar todas las props nativas de <input> + props personalizadas
```

## Tipos para Variantes

Usa uniones de literales para variantes y tamaños:

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}
```

## Tipos Compartidos

Los tipos compartidos **DEBEN** estar en:

- `src/types/` para tipos globales
- Dentro del componente para tipos específicos del componente

## Generics

Usa generics cuando el componente necesite trabajar con diferentes tipos:

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function List<T>({ items, renderItem }: ListProps<T>) {
  return <>{items.map(renderItem)}</>;
}
```

## Eventos

Usa los tipos de eventos de React:

```typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  // ...
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // ...
};
```

## Type Guards

Usa type guards para validaciones:

```typescript
function isError(value: unknown): value is Error {
  return value instanceof Error;
}
```

## Configuración

El proyecto usa la configuración en `tsconfig.json` con strict mode habilitado.
**NO** cambies estas configuraciones sin discutir con el equipo.
