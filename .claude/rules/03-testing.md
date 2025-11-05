# Testing Standards

Este proyecto usa **Playwright** para testing tanto E2E como de componentes.

## Estrategia de Testing por Nivel

### Átomos y Moléculas

- **DEBE** tener tests de componente (Component Testing)
- **DEBE** probar todas las variantes
- **DEBE** incluir tests de accesibilidad
- **DEBE** probar interacciones básicas

### Organismos

- **DEBE** tener integration tests
- **DEBE** mockear dependencias externas (APIs, contextos)
- **DEBE** probar flujos de usuario completos

### Templates y Páginas

- **DEBE** tener E2E tests
- **PUEDE** incluir visual regression tests
- **DEBE** probar navegación y rutas

## Estructura de Tests

Cada componente **DEBE** tener su archivo de test:

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.stories.tsx
└── ComponentName.spec.tsx        # Tests con Playwright
```

## Ejemplo de Test de Componente

```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from './Button';

test.describe('Button', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);
    await expect(component).toBeVisible();
    await expect(component).toContainText('Click me');
  });

  test('should call onClick when clicked', async ({ mount }) => {
    let clicked = false;
    const component = await mount(
      <Button onClick={() => { clicked = true; }}>Click me</Button>
    );
    await component.click();
    expect(clicked).toBe(true);
  });

  test('should be disabled when disabled prop is true', async ({ mount }) => {
    const component = await mount(<Button disabled>Click me</Button>);
    await expect(component).toBeDisabled();
  });

  test('should render all variants', async ({ mount }) => {
    for (const variant of ['primary', 'secondary', 'outline']) {
      const component = await mount(
        <Button variant={variant as any}>Button</Button>
      );
      await expect(component).toBeVisible();
    }
  });
});
```

## Tests de Accesibilidad

Usa `@axe-core/playwright` para tests de accesibilidad:

```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations', async ({ mount, page }) => {
  await mount(<Button>Click me</Button>);

  const accessibilityScanResults = await new AxeBuilder({ page })
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

## Tests E2E con Storybook

Los tests E2E **DEBEN** estar en `e2e/storybook/`:

```typescript
import { test, expect } from '@playwright/test';

test('Button stories render correctly', async ({ page }) => {
  await page.goto('http://localhost:6006/?path=/story/atoms-button--primary');

  const button = page.getByRole('button');
  await expect(button).toBeVisible();
  await button.click();
});
```

## Scripts de Testing

```bash
# Ejecutar todos los tests E2E
npm run test:e2e

# Ejecutar tests de componentes
npm run test:ct

# Ejecutar tests con UI de Playwright
npm run test:e2e:ui

# Debug tests
npm run test:e2e:debug

# Ver reporte
npm run test:report
```

## Mejores Prácticas

1. **DEBE** usar locators semánticos (getByRole, getByLabel, getByText)
2. **NO DEBE** usar selectores CSS/XPath frágiles
3. **DEBE** esperar a que elementos estén visibles antes de interactuar
4. **DEBE** probar casos de error y edge cases
5. **DEBE** mantener tests simples y enfocados
6. **DEBE** usar fixtures cuando sea necesario para reutilizar setup

## Coverage

Objetivo mínimo de coverage:

- **Átomos**: 90%
- **Moléculas**: 85%
- **Organismos**: 80%
