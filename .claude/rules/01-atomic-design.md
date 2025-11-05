# Atomic Design Architecture

Este proyecto sigue estrictamente la metodología **Atomic Design** según se documenta en `docs/design-system/ATOMIC-DESIGN.md`.

## Estructura de Componentes

```
src/components/
├── atoms/        # Componentes básicos e indivisibles
├── molecules/    # Combinación de 2+ átomos
├── organisms/    # Componentes complejos que forman secciones de UI
└── templates/    # Estructuras de página sin contenido real
```

## Reglas por Nivel

### Átomos (Atoms)

- **DEBE** ser componentes simples y sin estado cuando sea posible
- **DEBE** tener props simples y predecibles
- **NO DEBE** contener lógica de negocio compleja
- **NO DEBE** depender de otros átomos (excepto elementos HTML básicos)
- **DEBE** ser altamente reutilizable
- Ejemplos: Button, Input, Label, Icon, Badge

### Moléculas (Molecules)

- **DEBE** combinar 2 o más átomos
- **PUEDE** tener estado local simple
- **DEBE** tener una funcionalidad cohesiva y específica
- **NO DEBE** realizar llamadas a APIs
- **DEBE** orquestar átomos a través de props
- Ejemplos: SearchBox, FormField, Card, Tag

### Organismos (Organisms)

- **PUEDE** ser componentes complejos y autónomos
- **PUEDE** manejar estado y lógica de negocio
- **PUEDE** realizar llamadas a APIs
- **DEBE** formar secciones completas de UI
- **PUEDE** usar contextos y stores
- Ejemplos: Header, Footer, ProductCard, LoginForm

### Templates

- **DEBE** definir estructura y layout sin contenido real
- **DEBE** usar placeholders en lugar de datos reales
- **DEBE** ser responsive por defecto
- **DEBE** incorporar accesibilidad
- **NO DEBE** contener lógica de negocio

### Pages (en src/pages/)

- **DEBE** usar contenido real y específico
- **DEBE** gestionar estado global y rutas
- **PUEDE** integrar con APIs y servicios externos

## Estructura de Archivos

Cada componente **DEBE** seguir esta estructura:

```
ComponentName/
├── ComponentName.tsx          # Implementación
├── ComponentName.stories.tsx  # Storybook stories
└── ComponentName.spec.tsx     # Tests con Playwright
```

## Clasificación de Nuevos Componentes

Cuando crees un nuevo componente, pregúntate:

1. **¿Se puede dividir más?** → Probablemente es un átomo
2. **¿Combina átomos simples?** → Es una molécula
3. **¿Tiene lógica de negocio?** → Es un organismo
4. **¿Es solo estructura?** → Es un template
5. **¿Tiene datos reales?** → Es una página

## Referencias

Para más detalles, consulta `docs/design-system/ATOMIC-DESIGN.md`
