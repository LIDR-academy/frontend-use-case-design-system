# Civitatis

Un proyecto moderno de React configurado con las mejores herramientas de desarrollo.

## 🚀 Tecnologías

Este proyecto incluye las siguientes tecnologías:

- **React 18.3.1** - Biblioteca de interfaz de usuario
- **TypeScript 5.8.3** - JavaScript con tipos estáticos
- **Vite 4.3.9** - Herramienta de construcción rápida
- **TailwindCSS 3.4.3** - Framework de CSS utilitario
- **Storybook 7** - Herramienta para desarrollo de componentes
- **Jest 29.5.0** - Framework de pruebas
- **React Testing Library 14.0.0** - Utilidades de pruebas para React
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

```bash
npm test             # Ejecuta las pruebas
npm run test:watch   # Ejecuta las pruebas en modo watch
npm run test:coverage # Ejecuta las pruebas con reporte de cobertura
```

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

El proyecto incluye configuración completa para testing con Jest y React Testing Library:

- Tests unitarios para componentes
- Configuración de mocks para assets
- Setup file para Testing Library
- Scripts para coverage

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
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
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
