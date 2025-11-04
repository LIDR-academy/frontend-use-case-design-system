# Testing Guide

Este documento describe cómo ejecutar y trabajar con los tests del Design System.

## 📦 Prerequisitos

### Primera vez (Setup inicial)

1. **Instalar dependencias del proyecto:**
```bash
npm install
```

2. **Instalar navegadores de Playwright:**
```bash
npm run test:install
```
Este comando descarga Chromium, Firefox, WebKit y las dependencias del sistema necesarias (~400MB).

3. **Iniciar Storybook (requerido para tests E2E):**
```bash
npm run storybook
```
Storybook debe estar corriendo en `http://localhost:6006` antes de ejecutar tests E2E.

---

## 🧪 Tests E2E (End-to-End)

Los tests E2E prueban los componentes en Storybook usando Playwright. Cubren:
- ✅ **Accesibilidad** (WCAG 2.1 AA)
- ✅ **Funcionalidad** de componentes
- ✅ **Visual Regression** (comparación de screenshots)
- ✅ **Responsive Design** (mobile, tablet, desktop)

### Comandos Principales

#### Ejecutar tests (recomendado)
```bash
npm test
# o
npm run test:e2e
```
Ejecuta todos los tests E2E en **Chromium** únicamente (~30 segundos).
- ✅ Rápido para desarrollo
- ✅ Suficiente para validación local
- 📊 Resultado: 43 tests

#### Ejecutar en TODOS los navegadores
```bash
npm run test:e2e:all
```
Ejecuta tests en los 5 navegadores (~1-2 minutos):
- Chromium (Desktop)
- Firefox (Desktop)
- WebKit/Safari (Desktop)
- Mobile Chrome
- Mobile Safari

📊 Resultado: 215 tests (43 tests × 5 navegadores)

#### Modo interactivo (UI)
```bash
npm run test:e2e:ui
```
Abre interfaz gráfica para:
- Ver tests en tiempo real
- Ejecutar tests individuales
- Ver screenshots y traces
- Debuggear fallos

#### Modo visual (headed)
```bash
npm run test:e2e:headed
```
Muestra el navegador mientras ejecuta los tests (útil para ver qué está pasando).

#### Modo debug
```bash
npm run test:e2e:debug
```
Ejecuta tests paso a paso con inspector de Playwright.

#### Ver reporte HTML
```bash
npm run test:report
```
Abre el reporte HTML interactivo con:
- Resultados de todos los tests
- Screenshots de fallos
- Videos de ejecución
- Traces detallados

---

## 📸 Visual Regression Tests

### ¿Qué son?
Los visual regression tests comparan screenshots de los componentes contra imágenes "baseline" guardadas en el repositorio.

### Ubicación de snapshots
```
e2e/storybook/visual.spec.ts-snapshots/
├── button-primary-chromium-darwin.png
├── button-primary-firefox-darwin.png
├── button-primary-webkit-darwin.png
└── ... (55 imágenes total)
```

### Actualizar snapshots (cuando cambias estilos)
```bash
npm run test:e2e:update-snapshots
```
**⚠️ Importante**: Solo ejecuta esto cuando hayas cambiado intencionalmente los estilos visuales.

### Proceso recomendado:
1. Haces cambio visual en un componente
2. Tests fallan con "screenshot doesn't match"
3. Revisas el reporte HTML para ver las diferencias
4. Si el cambio es correcto: `npm run test:e2e:update-snapshots`
5. Commit de los nuevos snapshots

---

## 🏗️ Estructura de Tests

```
e2e/
├── helpers/
│   └── storybook.ts          # Helper para navegar Storybook
└── storybook/
    ├── accessibility.spec.ts  # 12 tests de accesibilidad
    ├── atoms.spec.ts          # 12 tests de atoms (Button, Input, Icon)
    ├── molecules.spec.ts      #  8 tests de molecules (Tag, Card)
    └── visual.spec.ts         # 11 tests visuales + responsive
```

### Tipos de tests:

#### 1. Tests de Accesibilidad (12 tests)
- Compliance WCAG 2.1 AA con AxeBuilder
- Tests de navegación por teclado
- Tests de ARIA labels y roles
- Contraste de colores

#### 2. Tests de Componentes (20 tests)
- Renderizado correcto
- Interactividad (clicks, typing)
- Estados (disabled, error, loading)
- Variantes de componentes

#### 3. Tests Visuales (11 tests)
- 8 tests de variantes de componentes
- 3 tests responsive (mobile, tablet, desktop)

---

## 🔧 Configuración

### playwright.config.ts (E2E)
- Puerto: 6006 (Storybook)
- 5 proyectos (navegadores)
- Reportes en: `playwright-report/e2e/`
- Screenshots: solo en fallos
- Videos: solo en fallos

### playwright-ct.config.ts (Component Testing)
- Tests unitarios de componentes
- Puerto: 3100
- ⚠️ Actualmente en desarrollo

---

## 🐛 Troubleshooting

### "Error: browserType.launch: Executable doesn't exist"
**Solución:**
```bash
npm run test:install
```

### "Error: page.goto: net::ERR_CONNECTION_REFUSED"
**Solución:** Storybook no está corriendo
```bash
# En otra terminal:
npm run storybook
```

### Tests visuales fallan con "snapshot doesn't match"
**Opciones:**
1. Ver diferencias: `npm run test:report`
2. Si el cambio es intencional: `npm run test:e2e:update-snapshots`
3. Si no debería haber cambiado: revisar tu código CSS

### Tests pasan localmente pero fallan en CI
**Posibles causas:**
- Snapshots generados en diferente OS (los snapshots son específicos por plataforma)
- Fuentes no disponibles en CI
- Tamaños de viewport diferentes

**Solución:** Generar snapshots en CI o usar Docker para consistencia.

---

## 📊 Resumen de Comandos

| Comando | Descripción | Tiempo | Tests |
|---------|-------------|--------|-------|
| `npm test` | Tests E2E rápidos (Chromium) | ~30s | 43 |
| `npm run test:e2e:all` | Todos los navegadores | ~1-2min | 215 |
| `npm run test:e2e:ui` | Modo interactivo | - | - |
| `npm run test:e2e:headed` | Con UI visible | ~30s | 43 |
| `npm run test:e2e:debug` | Modo debug | - | - |
| `npm run test:report` | Ver reporte HTML | - | - |
| `npm run test:e2e:update-snapshots` | Actualizar imágenes | ~1min | - |
| `npm run test:install` | Instalar navegadores | ~2min | - |

---

## 🎯 Workflow Recomendado

### Para desarrollo diario:
```bash
# Terminal 1: Storybook
npm run storybook

# Terminal 2: Tests
npm test
```

### Antes de hacer commit:
```bash
npm run test:e2e:all
```

### Cuando cambias estilos:
```bash
# 1. Ejecutar tests
npm test

# 2. Si fallan por visuals, revisar
npm run test:report

# 3. Si es correcto el cambio
npm run test:e2e:update-snapshots

# 4. Commit de snapshots
git add e2e/storybook/visual.spec.ts-snapshots/
git commit -m "chore: update visual regression snapshots"
```

---

## 📈 Estadísticas

- **Total tests E2E**: 215 (43 × 5 navegadores)
- **Tiempo ejecución (todos)**: ~1-2 minutos
- **Tiempo ejecución (chromium)**: ~30 segundos
- **Coverage**:
  - 12 tests accesibilidad
  - 20 tests componentes
  - 11 tests visuales/responsive
- **Navegadores soportados**: 5
  - Chromium
  - Firefox
  - WebKit (Safari)
  - Mobile Chrome
  - Mobile Safari

---

## 🔗 Recursos

- [Playwright Docs](https://playwright.dev)
- [Storybook Testing](https://storybook.js.org/docs/react/writing-tests/introduction)
- [Axe Accessibility](https://www.deque.com/axe/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🤝 Contribuir

Cuando agregues nuevos componentes:

1. **Crea tests en Storybook** (`*.stories.tsx`)
2. **Agrega tests E2E** en archivos apropiados:
   - Atoms → `e2e/storybook/atoms.spec.ts`
   - Molecules → `e2e/storybook/molecules.spec.ts`
3. **Tests de accesibilidad** → `e2e/storybook/accessibility.spec.ts`
4. **Tests visuales** (opcional) → `e2e/storybook/visual.spec.ts`
5. **Ejecuta todos los tests**: `npm run test:e2e:all`
6. **Genera snapshots**: `npm run test:e2e:update-snapshots`
7. **Commit todo junto**

---

*Última actualización: Noviembre 2025*
*100% tests pasando ✅*
