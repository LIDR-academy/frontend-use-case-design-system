# Design System - Lidr

Guía completa del sistema de diseño para mantener consistencia visual y experiencia de usuario.

## 📋 Tabla de Contenidos

1. [Principios de Diseño](#principios-de-diseño)
2. [Sistema de Colores](#sistema-de-colores)
3. [Tipografía](#tipografía)
4. [Espaciado](#espaciado)
5. [Componentes](#componentes)
6. [Patrones de Interacción](#patrones-de-interacción)
7. [Accesibilidad](#accesibilidad)
8. [Responsive Design](#responsive-design)
9. [Contribución](#contribución)

## 🎨 Principios de Diseño

### 1. Consistencia

Mantener la misma apariencia y comportamiento en todos los componentes.

### 2. Simplicidad

Interfaces limpias y fáciles de entender, sin elementos innecesarios.

### 3. Accesibilidad

Diseños inclusivos que funcionen para todos los usuarios.

### 4. Escalabilidad

Sistema que crece fácilmente con nuevos componentes y patrones.

### 5. Performance

Componentes optimizados que no afectan el rendimiento.

## 🎨 Sistema de Colores

### Paleta Primaria

```css
/* Primary Colors */
--color-primary-50: #eff6ff;
--color-primary-500: #3b82f6;
--color-primary-900: #1e3a8a;

/* Usage */
.primary-button {
  background-color: var(--color-primary-500);
  color: white;
}

.primary-button:hover {
  background-color: var(--color-primary-600);
}
```

### Paleta Semántica

#### Success (Éxito)

- **50**: `#f0fdf4` - Fondo muy claro
- **500**: `#22c55e` - Color principal
- **900**: `#14532d` - Texto oscuro

#### Warning (Advertencia)

- **50**: `#fffbeb` - Fondo muy claro
- **500**: `#f59e0b` - Color principal
- **900**: `#78350f` - Texto oscuro

#### Error (Error)

- **50**: `#fef2f2` - Fondo muy claro
- **500**: `#ef4444` - Color principal
- **900**: `#7f1d1d` - Texto oscuro

### Colores Neutrales

```css
/* Background */
--color-background-primary: #ffffff;
--color-background-secondary: #f8fafc;
--color-background-tertiary: #f1f5f9;

/* Text */
--color-text-primary: #0f172a;
--color-text-secondary: #475569;
--color-text-tertiary: #64748b;

/* Border */
--color-border-primary: #e2e8f0;
--color-border-secondary: #cbd5e1;
```

## 📝 Tipografía

### Familia de Fuentes

```css
/* Primary Font - Inter */
font-family:
  'Inter',
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  sans-serif;

/* Monospace Font - JetBrains Mono */
font-family:
  'JetBrains Mono', ui-monospace, SFMono-Regular, Monaco, Consolas, monospace;
```

### Escala Tipográfica

| Nombre | Tamaño          | Line Height | Uso                 |
| ------ | --------------- | ----------- | ------------------- |
| xs     | 0.75rem (12px)  | 1rem        | Etiquetas pequeñas  |
| sm     | 0.875rem (14px) | 1.25rem     | Texto secundario    |
| base   | 1rem (16px)     | 1.5rem      | Texto principal     |
| lg     | 1.125rem (18px) | 1.75rem     | Títulos pequeños    |
| xl     | 1.25rem (20px)  | 1.75rem     | Títulos             |
| 2xl    | 1.5rem (24px)   | 2rem        | Subtítulos          |
| 3xl    | 1.875rem (30px) | 2.25rem     | Títulos de sección  |
| 4xl    | 2.25rem (36px)  | 2.5rem      | Títulos principales |

### Pesos de Fuente

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

## 📏 Espaciado

### Escala de Espaciado

```css
/* Espaciado base: 0.25rem (4px) */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
```

### Aplicación del Espaciado

```tsx
// Espaciado consistente
<div className="p-4 space-y-4">
  <div className="space-y-2">
    <h3 className="text-lg font-semibold">Título</h3>
    <p className="text-sm text-secondary">Descripción</p>
  </div>
  <Button variant="primary">Acción</Button>
</div>
```

## 🧩 Componentes

### Estructura de Componentes

```
src/components/
├── ui/                    # Componentes base
│   ├── Button/
│   ├── Input/
│   ├── Card/
│   └── ...
├── layout/               # Componentes de layout
├── forms/               # Componentes de formularios
└── feedback/           # Componentes de feedback
```

### Estados de Componentes

#### Estados Visuales

- **Default**: Estado normal
- **Hover**: Al pasar el mouse
- **Active**: Al hacer click/presión
- **Focus**: Cuando tiene foco
- **Disabled**: No interactivo

#### Estados Lógicos

- **Loading**: Cargando datos
- **Error**: Error en la operación
- **Success**: Operación exitosa
- **Empty**: Sin contenido

### Props API Estándar

```tsx
interface BaseComponentProps {
  // Identificación
  id?: string;
  className?: string;

  // Estado
  disabled?: boolean;
  loading?: boolean;

  // Eventos
  onClick?: () => void;
  onChange?: (value: any) => void;

  // Accesibilidad
  'aria-label'?: string;
  'aria-describedby'?: string;
}
```

## 🔄 Patrones de Interacción

### Botones y Acciones

#### Jerarquía de Acciones

```tsx
// ❌ Incorrecto - múltiples acciones primarias
<Button variant="primary">Guardar</Button>
<Button variant="primary">Publicar</Button>

// ✅ Correcto - jerarquía clara
<Button variant="primary">Publicar</Button>
<Button variant="secondary">Guardar borrador</Button>
<Button variant="outline">Cancelar</Button>
```

#### Estados de Carga

```tsx
const [isLoading, setIsLoading] = useState(false);

<Button
  disabled={isLoading}
  onClick={async () => {
    setIsLoading(true);
    await saveData();
    setIsLoading(false);
  }}
>
  {isLoading ? 'Guardando...' : 'Guardar'}
</Button>;
```

### Formularios

#### Validación en Tiempo Real

```tsx
function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? '' : 'Email inválido';
  };

  return (
    <Input
      label="Email"
      type="email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        setError(validateEmail(e.target.value));
      }}
      error={error}
    />
  );
}
```

#### Agrupación de Campos

```tsx
// Formulario bien estructurado
<form className="space-y-6">
  <div className="space-y-4">
    <h3 className="text-lg font-medium">Información Personal</h3>
    <div className="grid grid-cols-2 gap-4">
      <Input label="Nombre" required />
      <Input label="Apellido" required />
    </div>
    <Input label="Email" type="email" required />
  </div>

  <div className="flex justify-end space-x-3">
    <Button variant="outline">Cancelar</Button>
    <Button variant="primary" type="submit">
      Guardar
    </Button>
  </div>
</form>
```

## ♿ Accesibilidad

### Principios WCAG 2.1

#### Perceptible

- ✅ Contraste de color mínimo 4.5:1
- ✅ Texto alternativo para imágenes
- ✅ Contenido no solo dependiente del color

#### Operable

- ✅ Navegación por teclado completa
- ✅ Tiempo suficiente para completar tareas
- ✅ Sin contenido que cause convulsiones

#### Comprensible

- ✅ Lenguaje claro y simple
- ✅ Ayuda disponible y claramente identificable
- ✅ Funcionalidad consistente

#### Robusto

- ✅ Compatibilidad con tecnologías asistivas
- ✅ Código válido y semántico

### Implementación Práctica

#### Labels y Descripciones

```tsx
// ✅ Correcto
<Input
  label="Buscar productos"
  placeholder="Ingresa el nombre del producto"
  aria-describedby="search-help"
/>
<p id="search-help" className="sr-only">
  Busca por nombre, categoría o marca del producto
</p>

// ❌ Incorrecto
<Input placeholder="Buscar..." /> // Sin label
```

#### Estados Interactivos

```tsx
// Estados claramente diferenciados
<Button
  aria-pressed={isActive}
  className={`
    ${
      isActive
        ? 'bg-primary-600 text-white'
        : 'bg-white border border-primary-600 text-primary-600'
    }
  `}
>
  {isActive ? 'Activado' : 'Desactivado'}
</Button>
```

#### Navegación por Teclado

```tsx
function KeyboardNavigation() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(Math.max(0, selectedIndex - 1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(Math.min(items.length - 1, selectedIndex + 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSelect(items[selectedIndex]);
        break;
    }
  };

  return (
    <ul role="listbox" onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <li
          key={item.id}
          role="option"
          aria-selected={index === selectedIndex}
          tabIndex={index === selectedIndex ? 0 : -1}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px; /* Small devices (phones) */
--breakpoint-md: 768px; /* Medium devices (tablets) */
--breakpoint-lg: 1024px; /* Large devices (desktops) */
--breakpoint-xl: 1280px; /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X large devices */
```

### Grid System

```tsx
// Sistema de grid responsive
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
</div>

// Layout con sidebar
<div className="flex flex-col lg:flex-row">
  <aside className="w-full lg:w-64 p-4">
    <nav>...</nav>
  </aside>
  <main className="flex-1 p-4">
    <Content />
  </main>
</div>
```

### Componentes Responsive

```tsx
// Button responsive
<Button className="w-full sm:w-auto">
  Acción
</Button>

// Card responsive
<Card className="w-full md:w-1/2 lg:w-1/3">
  <CardContent />
</Card>
```

## 🤝 Contribución

### Proceso de Contribución

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nuevo-componente`)
3. **Desarrolla** siguiendo las guidelines
4. **Testea** exhaustivamente
5. **Documenta** tu componente
6. **Crea** un Pull Request

### Guidelines para Nuevos Componentes

#### ✅ Requisitos Mínimos

- [ ] Componente funcional con TypeScript
- [ ] Props API bien definida
- [ ] Estados completos (default, hover, focus, disabled)
- [ ] Accesibilidad completa
- [ ] Tests unitarios
- [ ] Stories en Storybook
- [ ] Documentación completa
- [ ] Responsive design

#### 📝 Plantilla para Nuevos Componentes

```tsx
// 1. Definir la interfaz de props
export interface NewComponentProps {
  // Props específicas del componente
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;

  // Props estándar
  id?: string;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

// 2. Implementar el componente con forwardRef
export const NewComponent = forwardRef<HTMLDivElement, NewComponentProps>(
  ({ variant = 'default', size = 'md', className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          // Clases base
          // Variantes según props
          // Tamaños según props
          ${className}
        `}
        {...props}
      >
        {props.children}
      </div>
    );
  }
);

NewComponent.displayName = 'NewComponent';

// 3. Exportar tipos para uso externo
export type { NewComponentProps };
```

#### 🧪 Testing Guidelines

```tsx
// Tests unitarios
describe('NewComponent', () => {
  it('renders correctly', () => {
    render(<NewComponent>Test</NewComponent>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    render(<NewComponent variant="primary">Test</NewComponent>);
    expect(screen.getByText('Test')).toHaveClass('bg-primary-500');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<NewComponent onClick={handleClick}>Test</NewComponent>);
    fireEvent.click(screen.getByText('Test'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('is accessible', () => {
    render(<NewComponent aria-label="Test component">Test</NewComponent>);
    expect(screen.getByLabelText('Test component')).toBeInTheDocument();
  });
});
```

#### 📚 Documentación

````markdown
# NewComponent

Descripción breve del componente y su propósito.

## Uso Básico

```tsx
import { NewComponent } from '@/components/ui/NewComponent';

<NewComponent variant="primary">Contenido del componente</NewComponent>;
```
````

## Props API

| Prop       | Tipo                                    | Default     | Descripción           |
| ---------- | --------------------------------------- | ----------- | --------------------- |
| `variant`  | `'default' \| 'primary' \| 'secondary'` | `'default'` | Estilo visual         |
| `size`     | `'sm' \| 'md' \| 'lg'`                  | `'md'`      | Tamaño del componente |
| `children` | `React.ReactNode`                       | -           | Contenido (requerido) |

## Estados

- **Default**: Descripción del estado default
- **Hover**: Comportamiento al pasar el mouse
- **Focus**: Comportamiento al tener foco
- **Disabled**: Comportamiento cuando está deshabilitado

## Accesibilidad

- ✅ Descripción de características de accesibilidad
- ✅ Soporte para lectores de pantalla
- ✅ Navegación por teclado

````

### 🚀 Versionado

Seguimos [Semantic Versioning](https://semver.org/):

- **MAJOR**: Cambios incompatibles
- **MINOR**: Nuevas funcionalidades compatibles
- **PATCH**: Corrección de bugs

### 📋 Checklist de Revisión

Antes de mergear un PR:

- [ ] Code review aprobado
- [ ] Tests pasan
- [ ] Linting pasa
- [ ] Storybook se construye correctamente
- [ ] Documentación actualizada
- [ ] Accesibilidad verificada
- [ ] Responsive design probado
- [ ] Visual regression tests pasan

## 📞 Soporte

### Canales de Comunicación

- **Issues**: Para bugs y feature requests
- **Discussions**: Para preguntas generales
- **Pull Requests**: Para contribuciones de código

### Reportar Bugs

```markdown
## Bug Report

**Descripción**
Breve descripción del problema

**Pasos para reproducir**
1. Ir a '...'
2. Hacer click en '...'
3. Ver error

**Comportamiento esperado**
Descripción de lo que debería pasar

**Comportamiento actual**
Descripción de lo que está pasando

**Capturas de pantalla**
Si aplica, agregar capturas

**Contexto adicional**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Device: [e.g. Desktop, iPhone 12]
````

---

## 🎯 Resumen Ejecutivo

Este design system está construido con:

- **Tecnologías modernas**: React 18, TypeScript 5, Vite 4.3.9
- **Herramientas de calidad**: ESLint, Prettier, Chromatic
- **Testing completo**: Jest, React Testing Library, Storybook
- **Accesibilidad**: WCAG 2.1 AA compliance
- **Escalabilidad**: Componentes reutilizables y consistentes
- **Documentación**: Guías completas y ejemplos prácticos

El sistema asegura consistencia visual, experiencia de usuario óptima y mantenibilidad a largo plazo.
