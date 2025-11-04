# Migración de Jest a Playwright - Guía Completa

Este documento explica la migración del sistema de testing de Jest + React Testing Library a Playwright (Component Testing + E2E).

## 🎯 Resumen de Cambios

### Antes (Jest)
- Framework: Jest + React Testing Library
- Tests unitarios en JSDOM (entorno simulado)
- Archivos: `*.test.tsx`
- Configuración: `jest.config.cjs`, `setupTests.ts`

### Después (Playwright)
- Framework: Playwright Test + Component Testing
- Tests en navegadores reales (Chrome, Firefox, Safari)
- Archivos: `*.spec.tsx` (Component) + `e2e/*.spec.ts` (E2E)
- Configuración: `playwright-ct.config.ts`, `playwright.config.ts`

## 📦 Cambios en Dependencias

### Eliminadas
```json
- jest
- @types/jest
- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event
- babel-jest
- jest-environment-jsdom
```

### Agregadas
```json
+ @playwright/test
+ @playwright/experimental-ct-react
+ @axe-core/playwright
```

## 🔄 Tabla de Equivalencias

### Imports
```typescript
// Antes (Jest)
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Después (Playwright)
import { test, expect } from '@playwright/experimental-ct-react';
```

### Renderizado
```typescript
// Antes (Jest)
render(<Component prop="value" />);
const element = screen.getByRole('button');

// Después (Playwright)
const component = await mount(<Component prop="value" />);
const element = component.getByRole('button');
```

### Aserciones
```typescript
// Antes (Jest) - Síncrono
expect(element).toBeInTheDocument();
expect(element).toHaveClass('custom-class');
expect(element).toHaveAttribute('aria-label', 'Close');

// Después (Playwright) - Asíncrono
await expect(element).toBeVisible();
await expect(element).toHaveClass(/custom-class/);
await expect(element).toHaveAttribute('aria-label', 'Close');
```

### Interacciones
```typescript
// Antes (Jest)
fireEvent.click(button);
await userEvent.type(input, 'Hello');
button.focus();

// Después (Playwright)
await button.click();
await input.fill('Hello');
await button.focus();
```

### Mocks y Spies
```typescript
// Antes (Jest)
const handleClick = jest.fn();
expect(handleClick).toHaveBeenCalledTimes(1);

// Después (Playwright)
let clickCount = 0;
const handleClick = () => { clickCount++; };
expect(clickCount).toBe(1);
```

### Queries
```typescript
// Antes (Jest)
screen.getByRole('button')
screen.getByText('Submit')
screen.getByLabelText('Email')
screen.queryByText('Optional')

// Después (Playwright)
component.getByRole('button')
component.getByText('Submit')
component.getByLabel('Email')
component.getByText('Optional') // usa getByText en ambos casos
```

## 📝 Patrón de Migración

### Estructura de Test Antigua (Jest)
```tsx
describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Estructura de Test Nueva (Playwright)
```tsx
test.describe('Button Component', () => {
  test('should render button with text', async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);
    await expect(component.getByRole('button')).toBeVisible();
  });

  test('should call onClick when clicked', async ({ mount }) => {
    let clickCount = 0;
    const handleClick = () => { clickCount++; };
    
    const component = await mount(<Button onClick={handleClick}>Click me</Button>);
    await component.getByRole('button').click();
    
    expect(clickCount).toBe(1);
  });
});
```

## 🎨 Nuevos Tipos de Tests

### Component Testing (CT)
Tests unitarios de componentes en navegadores reales:
- Ubicación: junto a cada componente (`*.spec.tsx`)
- Propósito: verificar comportamiento y renderizado
- Ejemplo: `Button.spec.tsx`, `Input.spec.tsx`

### E2E Testing
Tests end-to-end de Storybook:
- Ubicación: directorio `e2e/`
- Propósito: validar historias y flujos completos
- Tipos:
  - `atoms.spec.ts` - Tests de componentes atómicos
  - `molecules.spec.ts` - Tests de componentes moleculares
  - `visual.spec.ts` - Regresión visual
  - `accessibility.spec.ts` - Tests de accesibilidad

## 🚀 Comandos Actualizados

```bash
# Antes (Jest)
npm test                # Todos los tests
npm run test:watch      # Modo watch
npm run test:coverage   # Cobertura

# Después (Playwright)
npm test                # Todos los tests
npm run test:ct         # Solo Component Tests
npm run test:e2e        # Solo E2E Tests
npm run test:ui         # Interfaz interactiva
npm run test:debug      # Modo debug
npm run test:report     # Ver reporte
npm run test:install    # Instalar navegadores
```

## 🔧 Configuración

### playwright-ct.config.ts
Configuración para Component Testing:
- Tests: `**/*.spec.tsx`
- Puerto: 3100
- Navegadores: Chrome, Firefox, Safari
- Vite config incluido para TailwindCSS

### playwright.config.ts
Configuración para E2E:
- Tests: `e2e/**/*.spec.ts`
- WebServer: Storybook en puerto 6006
- Screenshots y videos en fallos
- Múltiples viewports (mobile, tablet, desktop)

### playwright/index.tsx
Wrapper para Component Testing:
- Importa estilos globales (`index.css`)
- Necesario para que TailwindCSS funcione

## 📊 Ventajas de la Migración

1. **Tests en Navegadores Reales**
   - Chrome, Firefox, Safari
   - Mejor detección de bugs visuales
   - Comportamiento real del DOM

2. **Visual Regression Testing**
   - Screenshots automáticos
   - Comparación pixel por pixel
   - Detecta cambios visuales no intencionados

3. **Mejor Debugging**
   - UI Mode interactivo
   - Traces de ejecución
   - Screenshots y videos automáticos

4. **Accesibilidad Integrada**
   - Axe incluido nativamente
   - Tests WCAG 2.1 AA
   - Validación automática

5. **Más Rápido**
   - Parallelización nativa
   - Cache inteligente
   - Mejores timeouts

## 🐛 Problemas Comunes y Soluciones

### 1. Tests fallan por timeout
**Problema**: Los tests en Playwright son asíncronos
```typescript
// ❌ Incorrecto
test('test', ({ mount }) => {
  const component = mount(<Button />);
  expect(component).toBeVisible();
});

// ✅ Correcto
test('test', async ({ mount }) => {
  const component = await mount(<Button />);
  await expect(component.getByRole('button')).toBeVisible();
});
```

### 2. Clases CSS no se aplican
**Problema**: Falta importar estilos en `playwright/index.tsx`
```typescript
// playwright/index.tsx debe tener:
import '../src/index.css';
```

### 3. Queries no encuentran elementos
**Problema**: Usar queries síncronas o incorrectas
```typescript
// ❌ Incorrecto
const button = component.getByRole('button');
expect(button).toBeVisible(); // Síncrono

// ✅ Correcto
await expect(component.getByRole('button')).toBeVisible();
```

### 4. Mocks no funcionan
**Problema**: Playwright no usa jest.fn()
```typescript
// ❌ Jest style
const mock = jest.fn();
expect(mock).toHaveBeenCalled();

// ✅ Playwright style
let called = false;
const mock = () => { called = true; };
expect(called).toBe(true);
```

## 📚 Recursos Adicionales

- [Playwright Docs](https://playwright.dev/)
- [Component Testing Guide](https://playwright.dev/docs/test-components)
- [Migration Guide](https://playwright.dev/docs/test-migration)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 🎓 Guía Rápida para Desarrolladores

### Crear un nuevo componente con tests

1. Crear estructura:
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.spec.tsx
├── ComponentName.stories.tsx
└── index.ts
```

2. Test básico:
```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { ComponentName } from './ComponentName';

test.describe('ComponentName', () => {
  test('should render', async ({ mount }) => {
    const component = await mount(<ComponentName />);
    await expect(component).toBeVisible();
  });
});
```

3. Ejecutar:
```bash
npm run test:ct
```

### Migrar un test existente

1. Renombrar `*.test.tsx` → `*.spec.tsx`
2. Cambiar imports de RTL a Playwright
3. Hacer funciones async con `await`
4. Usar `mount` en lugar de `render`
5. Cambiar aserciones a async
6. Actualizar mocks a estilo Playwright

## ✅ Checklist de Migración

- [x] Instalar Playwright y dependencias
- [x] Crear configuraciones (`playwright-ct.config.ts`, `playwright.config.ts`)
- [x] Migrar tests de componentes (5 componentes)
- [x] Crear tests E2E de Storybook
- [x] Eliminar Jest y dependencias
- [x] Actualizar scripts en package.json
- [x] Actualizar README.md
- [x] Actualizar .cursorrules
- [x] Crear documentación de migración

## 🎉 Resultado Final

El proyecto ahora usa un stack de testing moderno:
- ✅ Component Testing con navegadores reales
- ✅ E2E Testing de Storybook
- ✅ Visual Regression Testing
- ✅ Accessibility Testing con Axe
- ✅ Mejor experiencia de desarrollo
- ✅ Más confiable y completo

---

**Fecha de migración**: Noviembre 2025
**Versión Playwright**: 1.56.1

