# E2E Tests con Playwright

Este directorio contiene tests End-to-End (E2E) para el Design System usando Playwright.

## Estructura

```
e2e/
├── helpers/
│   └── storybook.ts      # Helper para navegar Storybook
├── storybook/
│   ├── atoms.spec.ts      # Tests de componentes atómicos
│   ├── molecules.spec.ts  # Tests de componentes moleculares
│   ├── visual.spec.ts     # Tests de regresión visual
│   └── accessibility.spec.ts # Tests de accesibilidad
└── README.md
```

## Tipos de Tests

### 1. Tests Funcionales (`atoms.spec.ts`, `molecules.spec.ts`)
Tests que verifican el comportamiento y renderizado de componentes en Storybook:
- Renderizado correcto de historias
- Interacciones (clicks, typing, etc.)
- Estados diferentes (disabled, error, etc.)
- Validación de variantes y tamaños

### 2. Tests de Regresión Visual (`visual.spec.ts`)
Tests que capturan screenshots y comparan con versiones previas:
- Variantes de componentes
- Estados diferentes
- Responsive design (mobile, tablet, desktop)
- Prevención de cambios visuales no intencionados

### 3. Tests de Accesibilidad (`accessibility.spec.ts`)
Tests que verifican cumplimiento de estándares WCAG 2.1 AA:
- Estructura semántica (roles, headings)
- Navegación por teclado
- Contraste de colores
- Etiquetas y descripciones apropiadas
- Mensajes de error accesibles

## Ejecutar Tests

```bash
# Todos los tests E2E
npm run test:e2e

# Con interfaz de usuario
npm run test:e2e -- --ui

# Solo un archivo
npm run test:e2e -- atoms.spec.ts

# Modo debug
npm run test:e2e -- --debug

# Ver reporte
npm run test:report
```

## Helper de Storybook

El helper `storybook.ts` proporciona métodos útiles para:
- Navegar a historias específicas
- Acceder al canvas de Storybook
- Interactuar con controles
- Capturar screenshots

### Ejemplo de uso

```typescript
import { createStorybookHelper } from '../helpers/storybook';

test('example test', async ({ page }) => {
  const storybook = createStorybookHelper(page);
  await storybook.navigateToStory('atoms-button--primary');
  
  const canvas = await storybook.getStoryCanvas();
  const button = canvas.getByRole('button');
  
  await expect(button).toBeVisible();
});
```

## Visual Regression

Los screenshots de referencia se almacenan en:
- Primera ejecución: se generan screenshots base
- Ejecuciones posteriores: se comparan con los base
- Diferencias: se guardan en `test-results/`

Para actualizar screenshots base:
```bash
npm run test:e2e -- --update-snapshots
```

## Accessibility Testing

Usa `@axe-core/playwright` para:
- Escaneo automático de violaciones WCAG
- Detección de problemas de contraste
- Validación de estructura semántica
- Verificación de navegación por teclado

## CI/CD

Los tests E2E se ejecutan automáticamente en:
- Pull Requests
- Merges a main
- Deploys

Configuración en `.github/workflows/` (si existe).

## Mejores Prácticas

1. **Selectores robustos**: Usar roles y labels en vez de clases CSS
2. **Tests independientes**: Cada test debe poder ejecutarse solo
3. **Esperas explícitas**: Usar `waitFor` cuando sea necesario
4. **Screenshots significativos**: Capturar estados importantes
5. **Accesibilidad primero**: Verificar WCAG en cada componente

## Troubleshooting

### Storybook no inicia
- Verificar que el puerto 6006 esté libre
- Ejecutar manualmente: `npm run storybook`

### Tests fallan localmente pero pasan en CI
- Diferencias de viewport o fuentes
- Ejecutar con el mismo navegador que CI
- Usar `--update-snapshots` si es necesario

### Error de timeout
- Aumentar timeout en configuración
- Verificar que Storybook cargue correctamente
- Revisar network throttling

## Recursos

- [Playwright Docs](https://playwright.dev/)
- [Storybook Test Runner](https://storybook.js.org/docs/react/writing-tests/test-runner)
- [Axe Accessibility](https://www.deque.com/axe/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

