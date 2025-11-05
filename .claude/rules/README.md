# Design System Rules

Este directorio contiene las reglas y convenciones que Claude Code debe seguir cuando trabaja en este proyecto de Design System.

## Reglas Activas

### 01 - Atomic Design

Metodología de arquitectura de componentes siguiendo Atomic Design de Brad Frost.
Referencia: `docs/design-system/ATOMIC-DESIGN.md`

### 02 - TypeScript

Estándares de TypeScript, tipado estricto, y convenciones de tipos.

### 03 - Testing

Estrategia de testing con Playwright, incluyendo component testing y E2E.

### 04 - Storybook

Convenciones para documentación de componentes con Storybook.

### 05 - Accessibility

Estándares de accesibilidad WCAG 2.1 AA obligatorios.

### 06 - Styling

Uso de Tailwind CSS y convenciones de estilos.

### 07 - Code Quality

Estándares de calidad de código, linting, formatting y mejores prácticas.

## Cómo se usan estas Reglas

Claude Code lee automáticamente estas reglas cuando trabaja en el proyecto y las aplica en todas sus sugerencias y cambios de código.

## Estructura

Cada archivo de regla sigue este formato:

```markdown
# Título de la Regla

Descripción breve de qué cubre esta regla.

## Reglas Generales

- DEBE: Obligatorio
- NO DEBE: Prohibido
- PUEDE: Opcional pero recomendado

## Ejemplos

Código de ejemplo mostrando lo correcto e incorrecto.
```

## Prioridad

Todas las reglas son obligatorias. En caso de conflicto:

1. Accesibilidad (05) tiene máxima prioridad
2. Atomic Design (01) define la arquitectura
3. TypeScript (02) y Testing (03) aseguran calidad
4. Storybook (04) y Styling (06) guían implementación
5. Code Quality (07) mantiene consistencia

## Actualización de Reglas

Para actualizar estas reglas:

1. Discute con el equipo
2. Actualiza el archivo correspondiente
3. Documenta el cambio en commits
4. Comunica al equipo

## Referencia Rápida

| Regla         | Comando de Verificación                |
| ------------- | -------------------------------------- |
| TypeScript    | `npm run build`                        |
| Testing       | `npm run test`                         |
| Storybook     | `npm run storybook`                    |
| Accessibility | Addon A11y en Storybook                |
| Styling       | `npm run lint`                         |
| Code Quality  | `npm run lint && npm run format:check` |

## Recursos Adicionales

- `docs/design-system/ATOMIC-DESIGN.md` - Guía completa de Atomic Design
- `package.json` - Scripts disponibles
- `tsconfig.json` - Configuración TypeScript
- `tailwind.config.cjs` - Configuración Tailwind
- `.eslintrc` - Configuración ESLint
