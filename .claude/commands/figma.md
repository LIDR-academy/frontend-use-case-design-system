---
argument-hint: [component-link]
description: Toma un componente de Figma para ser implementado
---

Toma el $1, utiliza el MCP de Figma para implementarlo
Sigue las reglas mencionadas en el CLAUDE.md
Al finalizar la implementación revisa
 que los Tests funcionen
 ejecuta el lint, npm run lint:fix
Ejecuta el comando npx chromatic --project-token=
Utiliza la variable de entorno para ejecutar el comando CHROMATIC_PROJECT_TOKEN

e.g.

npx chromatic --project-token=$CHROMATIC_PROJECT_TOKEN

Despues toma la URL del StoryBook de Chromatic
Crea una PR con la CLI de Github(gh) incluye un resumen
de las tareas ejecutadas y el URL del StoryBook de Chromatic
para su revisión
