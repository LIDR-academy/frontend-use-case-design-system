# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-17

### Added

- **Componentes Base:**
  - `Button` - Componente de botón con múltiples variantes y tamaños
  - `Input` - Campo de entrada con validación y diferentes estilos
  - `Card` - Componente contenedor versátil

- **Sistema de Diseño Completo:**
  - Design tokens comprehensivos en TailwindCSS
  - Paleta de colores semántica (primary, secondary, success, warning, error)
  - Sistema de espaciado consistente
  - Tipografía escalable con Inter font
  - Sombras y animaciones predefinidas

- **Testing Infrastructure:**
  - Tests unitarios con Jest y React Testing Library
  - Interaction testing con Storybook play functions
  - Visual regression testing con Chromatic
  - Tests de accesibilidad automatizados

- **Documentación:**
  - Storybook completo con todas las variantes de componentes
  - Documentación técnica detallada (README, API, ejemplos)
  - Guidelines del design system
  - Ejemplos de uso prácticos

- **Herramientas de Desarrollo:**
  - ESLint y Prettier configurados
  - TypeScript con configuración estricta
  - Vite para desarrollo rápido
  - Configuración de CI/CD con GitHub Actions

- **Accesibilidad:**
  - Componentes WCAG 2.1 AA compliant
  - Soporte completo para lectores de pantalla
  - Navegación por teclado
  - Contraste de color adecuado

### Technical Details

- **React:** 18.3.1
- **TypeScript:** 5.8.3
- **TailwindCSS:** 3.4.3
- **Storybook:** 7.6.20
- **Jest:** 29.5.0
- **Vite:** 4.3.9

### Features

- ✅ 3 componentes base completamente funcionales
- ✅ Sistema de design tokens completo
- ✅ Testing coverage del 100% en componentes
- ✅ Documentación completa en español
- ✅ Configuración de CI/CD automatizada
- ✅ Visual testing con Chromatic
- ✅ Accesibilidad WCAG 2.1 AA
- ✅ Publicación en npm lista

---

## Types of changes

- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` for vulnerability fixes

## Versioning

This project uses [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

---

## Contributing to Version Updates

When preparing a new version:

1. Update the version in `package.json`
2. Add an entry to this CHANGELOG.md file
3. Commit with message: `release: v1.x.x`
4. Create a git tag: `git tag v1.x.x`
5. Push to repository: `git push && git push --tags`

### Release Commands

```bash
# Patch release (1.0.0 -> 1.0.1)
npm run release

# Minor release (1.0.0 -> 1.1.0)
npm run release:minor

# Major release (1.0.0 -> 2.0.0)
npm run release:major
```
