# Civitatis

Un proyecto moderno de React configurado con las mejores herramientas de desarrollo.

## 🚀 Tecnologías

Este proyecto incluye las siguientes tecnologías:

- **React 18.3.1** - Biblioteca de interfaz de usuario
- **TypeScript 5.8.3** - JavaScript con tipos estáticos
- **Vite 4.3.9** - Herramienta de construcción rápida
- **TailwindCSS 3.4.3** - Framework de CSS utilitario
- **Storybook 7** - Herramienta para desarrollo de componentes
- **Playwright 1.56.1** - Framework moderno de testing E2E y Component Testing
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formateador de código
- **Chromatic** - Despliegue automatizado de Storybook

## ⚙️ Configuración Inicial

### Variables de Entorno

1. **Copia el template:**

   ```bash
   cp env-template.txt .env
   ```

2. **Configura las variables secretas en GitHub:**
   - Ve a tu repositorio → **Settings** → **Secrets and variables** → **Actions**
   - Agrega: `CHROMATIC_PROJECT_TOKEN` (obtenlo de [chromatic.com](https://chromatic.com))
   - Opcional: `CODECOV_TOKEN` (de [codecov.io](https://codecov.io))

### Primeros Pasos

```bash
npm install          # Instalar dependencias
npm run dev          # Iniciar desarrollo
npm run storybook    # Abrir Storybook
npm test             # Ejecutar pruebas
```

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── ui/           # Componentes de interfaz reutilizables
│   └── layout/       # Componentes de layout
├── hooks/            # Custom hooks
├── utils/            # Funciones utilitarias
├── types/            # Definiciones de tipos TypeScript
├── lib/              # Configuraciones y librerías
├── assets/           # Imágenes, iconos y otros recursos
└── __mocks__/        # Mocks para pruebas
```

## 🛠️ Scripts disponibles

### Desarrollo

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye el proyecto para producción
npm run preview      # Vista previa de la build de producción
```

### Testing

> 📖 **Documentación completa**: Ver [TESTING.md](./TESTING.md) para guía detallada

```bash
npm test                          # Tests E2E rápidos (Chromium) - 43 tests en ~30s
npm run test:e2e:all             # Todos los navegadores - 215 tests en ~1min
npm run test:e2e:ui              # Interfaz interactiva de Playwright
npm run test:e2e:headed          # Tests con navegador visible
npm run test:e2e:debug           # Modo debug paso a paso
npm run test:e2e:update-snapshots # Actualizar screenshots de visual regression
npm run test:report              # Ver reporte HTML interactivo
npm run test:install             # Instalar navegadores de Playwright (primera vez)
```

**Estado actual**: ✅ 215/215 tests pasando (100%)
- 12 tests de accesibilidad (WCAG 2.1 AA)
- 20 tests de componentes (Atoms + Molecules)
- 11 tests visuales + responsive

**Navegadores soportados**: Chromium, Firefox, WebKit/Safari, Mobile Chrome, Mobile Safari

### Code Quality

```bash
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Ejecuta ESLint y corrige errores automáticamente
npm run format       # Formatea el código con Prettier
npm run format:check # Verifica el formato del código
```

### Storybook

```bash
npm run storybook    # Inicia Storybook en modo desarrollo
npm run build-storybook # Construye Storybook para producción
```

### Chromatic

```bash
npm run chromatic    # Ejecuta Chromatic para despliegue de Storybook
```

## 🏁 Primeros pasos

1. **Instalación de dependencias:**

   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

3. **Abrir Storybook:**

   ```bash
   npm run storybook
   ```

4. **Ejecutar pruebas:**
   ```bash
   npm test
   ```

## 📦 Construcción del proyecto

Para construir el proyecto para producción:

```bash
npm run build
```

Los archivos generados estarán en el directorio `dist/`.

## 🧪 Testing

El proyecto utiliza Playwright para testing moderno con dos tipos de tests:

### Component Testing (CT)
- Tests unitarios de componentes en navegadores reales
- Reemplaza a Jest/RTL con mejor rendimiento visual
- Archivos: `*.spec.tsx` junto a cada componente
- Configuración: `playwright-ct.config.ts`

### E2E Testing
- Tests end-to-end de Storybook
- Validación de historias y comportamiento
- Regresión visual automática
- Tests de accesibilidad con Axe
- Archivos: `e2e/storybook/*.spec.ts`
- Configuración: `playwright.config.ts`

### Ventajas de Playwright
- ✅ Tests en navegadores reales (Chrome, Firefox, Safari)
- ✅ Visual regression testing incluido
- ✅ Mejor debugging con UI mode y traces
- ✅ Tests de accesibilidad integrados
- ✅ Soporte nativo para múltiples navegadores
- ✅ Más rápido que configuraciones tradicionales

## 🎨 Storybook

Storybook está configurado para desarrollo de componentes:

- Historias para componentes UI
- Documentación automática
- Controles interactivos
- Visual testing con Chromatic

## 📝 Code Quality

### ESLint

Configurado con:

- Reglas recomendadas para React
- Reglas de TypeScript
- Integración con Prettier
- Reglas específicas de Storybook

### Prettier

Configurado con:

- Longitud máxima de línea: 80 caracteres
- Comillas simples
- Punto y coma obligatorio
- Espacios de indentación: 2

## 🔧 Configuraciones

### TailwindCSS

- Configurado para escanear archivos en `src/**/*.{js,ts,jsx,tsx}`
- Modo JIT activado
- PostCSS configurado

### TypeScript

- Configuración estricta activada
- Tipos de React incluidos
- Configuración para Vite

### Vite

- Configurado para React con SWC
- Soporte completo para TypeScript
- Optimización de dependencias

## 📚 Recursos adicionales

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Playwright Documentation](https://playwright.dev)
- [Playwright Component Testing](https://playwright.dev/docs/test-components)
- [Axe Accessibility Testing](https://www.deque.com/axe/)
- [ESLint Documentation](https://eslint.org/docs/user-guide/getting-started)
- [Prettier Documentation](https://prettier.io/docs/en/index.html)

## 🤝 Contribuyendo

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
