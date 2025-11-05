# Accessibility Standards (A11y)

La **accesibilidad es obligatoria**, no opcional. Todos los componentes **DEBEN** ser accesibles.

## Principios WCAG 2.1

Este proyecto sigue las pautas **WCAG 2.1 nivel AA** como mínimo.

## Reglas Obligatorias

### 1. Semántica HTML

**DEBE** usar elementos HTML semánticos correctos:

```typescript
// ✅ CORRECTO
<button onClick={handleClick}>Click me</button>

// ❌ INCORRECTO
<div onClick={handleClick}>Click me</div>
```

### 2. Roles ARIA

**DEBE** usar roles ARIA solo cuando sea necesario:

```typescript
// ✅ CORRECTO - elemento semántico nativo
<button>Click</button>

// ⚠️ ACEPTABLE - cuando necesitas un rol personalizado
<div role="button" tabIndex={0} onClick={handleClick}>
  Custom Button
</div>
```

### 3. Labels y Texto Alternativo

Todos los elementos interactivos **DEBEN** tener labels:

```typescript
// ✅ CORRECTO
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ CORRECTO - con aria-label
<button aria-label="Close dialog">
  <IconX />
</button>

// ❌ INCORRECTO - input sin label
<input type="email" />
```

### 4. Contraste de Colores

**DEBE** cumplir ratios mínimos de contraste:

- Texto normal: 4.5:1
- Texto grande (18pt+): 3:1
- Componentes UI: 3:1

Usa Tailwind con colores que cumplan estos ratios.

### 5. Navegación con Teclado

**DEBE** ser completamente navegable por teclado:

```typescript
// ✅ CORRECTO - maneja Enter y Space
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
};

<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  Custom Button
</div>
```

### 6. Focus Management

**DEBE** gestionar el foco correctamente:

```typescript
// ✅ CORRECTO - focus visible
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500">
  Click me
</button>

// ❌ INCORRECTO - sin indicador de foco
<button className="focus:outline-none">
  Click me
</button>
```

### 7. Estados Dinámicos

**DEBE** anunciar cambios dinámicos con ARIA:

```typescript
// ✅ CORRECTO - anuncia estado de carga
<button aria-busy={isLoading} aria-live="polite">
  {isLoading ? 'Loading...' : 'Submit'}
</button>

// ✅ CORRECTO - anuncia errores
<div role="alert" aria-live="assertive">
  {error && <p>{error}</p>}
</div>
```

## Testing de Accesibilidad

### 1. Con @axe-core/playwright

**DEBE** incluir test de accesibilidad en cada componente:

```typescript
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations', async ({ mount, page }) => {
  await mount(<Button>Click me</Button>);

  const accessibilityScanResults = await new AxeBuilder({ page })
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### 2. Con Storybook Addon A11y

El addon de accesibilidad **DEBE** estar activo en todas las stories y no debe mostrar violaciones.

### 3. Testing Manual

**DEBE** probar manualmente:

- ✅ Navegación completa con Tab/Shift+Tab
- ✅ Activación con Enter/Space
- ✅ Escape para cerrar modales
- ✅ Flechas para navegación en listas/menús
- ✅ Con lector de pantalla (VoiceOver/NVDA)

## Checklist de Accesibilidad

Antes de dar por completado un componente, verifica:

- [ ] Usa HTML semántico
- [ ] Tiene labels/aria-labels apropiados
- [ ] Es navegable por teclado
- [ ] Tiene indicadores de foco visibles
- [ ] Cumple ratios de contraste
- [ ] Anuncia estados dinámicos
- [ ] Pasa tests de axe-core
- [ ] No tiene violaciones en Storybook A11y
- [ ] Probado con lector de pantalla
- [ ] Documentado en Storybook con ejemplos accesibles

## Recursos

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)

## Herramientas Útiles

- **axe DevTools**: Extensión de navegador
- **WAVE**: Evaluador web
- **Lighthouse**: Auditoría de accesibilidad
- **Color Contrast Analyzer**: Para verificar contraste
