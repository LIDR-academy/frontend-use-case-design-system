# Atomic Design System - Lidr

## 📚 Introducción

Este documento describe la implementación de la metodología **Atomic Design** de Brad Frost en nuestro Design System. Atomic Design es una metodología para crear sistemas de diseño de interfaces de usuario de manera jerárquica y modular.

## 🎯 Principios Fundamentales

Atomic Design no es un proceso lineal, sino un modelo mental que nos permite pensar en nuestras interfaces de usuario como:

- **Un todo cohesivo**: La experiencia completa del usuario
- **Una colección de partes**: Componentes reutilizables e independientes

### Beneficios Clave

1. **Reutilización**: Componentes que se pueden usar en múltiples contextos
2. **Consistencia**: Experiencia uniforme en toda la aplicación
3. **Mantenibilidad**: Cambios centralizados que se propagan automáticamente
4. **Escalabilidad**: Sistema que crece de forma organizada
5. **Testabilidad**: Componentes aislados fáciles de probar

## 🏗️ Los 5 Niveles de Atomic Design

### 1. Átomos (Atoms) ⚛️

Los **átomos** son los bloques de construcción más básicos de nuestra interfaz. Son elementos HTML fundamentales que no pueden descomponerse más sin perder su funcionalidad.

**Características:**

- Componentes más pequeños e indivisibles
- Sin lógica de negocio compleja
- Alta reutilización
- Props simples y predecibles

**Ejemplos:**

- Button
- Input
- Label
- Icon
- Badge
- Typography (headings, paragraphs)
- Avatar
- Checkbox
- Radio Button

**Ubicación en el proyecto:**

```
src/components/atoms/
├── Button/
│   ├── Button.tsx
│   ├── Button.stories.tsx
│   └── Button.test.tsx
├── Input/
│   ├── Input.tsx
│   ├── Input.stories.tsx
│   └── Input.test.tsx
└── ...
```

### 2. Moléculas (Molecules) 🧬

Las **moléculas** son grupos de átomos que funcionan juntos como una unidad. Combinan átomos simples para crear componentes con funcionalidad específica.

**Características:**

- Combinación de 2 o más átomos
- Funcionalidad cohesiva
- Props que orquestan múltiples átomos
- Pueden tener estado local simple

**Ejemplos:**

- SearchBox (Input + Button)
- FormField (Label + Input + ErrorMessage)
- Card (Container + Title + Content)
- NavigationItem (Icon + Text + Badge)
- InputGroup (Label + Input + HelpText)

**Ubicación en el proyecto:**

```
src/components/molecules/
├── SearchBox/
│   ├── SearchBox.tsx
│   ├── SearchBox.stories.tsx
│   └── SearchBox.test.tsx
├── FormField/
│   ├── FormField.tsx
│   ├── FormField.stories.tsx
│   └── FormField.test.tsx
└── ...
```

### 3. Organismos (Organisms) 🦠

Los **organismos** son componentes relativamente complejos que forman secciones distintas de una interfaz. Combinan moléculas, átomos y otros organismos.

**Características:**

- Componentes autónomos y funcionales
- Pueden manejar estado y lógica de negocio
- Forman secciones completas de UI
- Pueden realizar llamadas a APIs

**Ejemplos:**

- Header (Logo + Navigation + SearchBox + UserMenu)
- Footer (Links + Copyright + SocialMedia)
- ProductCard (Image + Title + Price + AddToCartButton)
- LoginForm (múltiples FormFields + SubmitButton)
- NavigationBar (múltiples NavigationItems)

**Ubicación en el proyecto:**

```
src/components/organisms/
├── Header/
│   ├── Header.tsx
│   ├── Header.stories.tsx
│   └── Header.test.tsx
├── ProductCard/
│   ├── ProductCard.tsx
│   ├── ProductCard.stories.tsx
│   └── ProductCard.test.tsx
└── ...
```

### 4. Plantillas (Templates) 📋

Las **plantillas** son estructuras de página que articulan el diseño subyacente. Colocan organismos en un layout sin contenido real.

**Características:**

- Define la estructura y el layout
- No contiene contenido real (usa placeholders)
- Altamente reutilizable para diferentes páginas
- Define grids y espaciado

**Ejemplos:**

- DashboardTemplate
- ProductListTemplate
- ArticleTemplate
- CheckoutTemplate
- UserProfileTemplate

**Ubicación en el proyecto:**

```
src/components/templates/
├── DashboardTemplate/
│   ├── DashboardTemplate.tsx
│   ├── DashboardTemplate.stories.tsx
│   └── DashboardTemplate.test.tsx
└── ...
```

### 5. Páginas (Pages) 📄

Las **páginas** son instancias específicas de plantillas con contenido real. Representan lo que el usuario final verá.

**Características:**

- Contenido real y específico
- Gestión de estado global
- Integración con APIs y servicios
- Enrutamiento y navegación

**Ejemplos:**

- HomePage
- ProductDetailPage
- UserProfilePage
- CheckoutPage
- SearchResultsPage

**Ubicación en el proyecto:**

```
src/pages/
├── HomePage/
│   ├── HomePage.tsx
│   └── HomePage.test.tsx
├── ProductDetail/
│   ├── ProductDetail.tsx
│   └── ProductDetail.test.tsx
└── ...
```

## 📁 Estructura de Carpetas Completa

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Icon/
│   │   └── ...
│   ├── molecules/
│   │   ├── SearchBox/
│   │   ├── FormField/
│   │   ├── Card/
│   │   └── ...
│   ├── organisms/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── ProductCard/
│   │   └── ...
│   └── templates/
│       ├── DashboardTemplate/
│       ├── ProductListTemplate/
│       └── ...
├── pages/
│   ├── HomePage/
│   ├── ProductDetail/
│   └── ...
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── themes/
├── utils/
│   ├── helpers/
│   └── hooks/
├── services/
│   └── api/
└── App.tsx
```

## 🔄 Migración de Componentes Actuales

### Estado Actual

Actualmente, nuestros componentes están organizados como:

```
src/components/ui/
├── Button.tsx
├── Input.tsx
└── __stories__/
```

### Plan de Migración

1. **Fase 1: Átomos** (Actual)
   - ✅ Button → `atoms/Button/`
   - ✅ Input → `atoms/Input/`

2. **Fase 2: Moléculas** (Próximo)
   - Crear SearchBox combinando Input + Button
   - Crear FormField combinando Label + Input + ErrorMessage

3. **Fase 3: Organismos** (Futuro)
   - Desarrollar Header, Footer, Navigation
   - Crear formularios complejos

## 💡 Mejores Prácticas

### Para Átomos

- Mantener simples y sin estado
- Alta reutilización
- Documentar todas las variantes en Storybook
- Props tipadas con TypeScript

### Para Moléculas

- Combinar átomos de manera lógica
- Estado local mínimo
- Props que controlen los átomos internos

### Para Organismos

- Pueden tener lógica de negocio
- Gestión de estado permitida
- Integración con contextos y stores
- Lazy loading cuando sea apropiado

### Para Templates

- Solo estructura, sin contenido real
- Props para slots de contenido
- Responsive por defecto
- Accesibilidad incorporada

### Para Páginas

- Contenido específico del negocio
- Gestión de rutas
- SEO optimizado
- Performance monitoring

## 🧪 Testing Strategy

### Átomos y Moléculas

- Unit tests con React Testing Library
- Snapshot tests
- Tests de accesibilidad

### Organismos

- Integration tests
- Mock de dependencias externas
- Tests de interacción de usuario

### Templates y Páginas

- E2E tests con Cypress/Playwright
- Visual regression tests con Chromatic
- Performance tests

## 📚 Recursos Adicionales

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Storybook Documentation](https://storybook.js.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🚀 Próximos Pasos

1. Completar migración de componentes actuales a estructura atómica
2. Desarrollar nuevas moléculas reutilizables
3. Crear organismos para las secciones principales
4. Implementar templates base
5. Documentar todos los componentes en Storybook
6. Establecer visual regression testing con Chromatic

---

**Última actualización:** Septiembre 2025
**Mantenedores:** Equipo Design System Lidr
