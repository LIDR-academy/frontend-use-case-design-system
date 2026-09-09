# Decisiones de implementación

- Átomo de Atomic Design; no conoce la API ni el kanban.
- Reutilizar los tokens Tailwind existentes del repositorio de Saúl. No copiar Chakra desde el ejercicio de estudiantes.
- Contrato público de la referencia: `onCheckedChange(boolean)`. `onChange` pertenece al input nativo y no sustituye ese contrato de interacción.
- El test monta una fixture React importada. No definir componentes con hooks dentro del archivo de tests de Playwright CT: el contexto Node no es el contexto del navegador.
- Afirmar el nombre/rol/estado accesible, no la invisibilidad geométrica de `sr-only` mediante `toBeVisible`.
- Revisar accesibilidad del componente y del documento de prueba por separado. Un documento CT sin `main` o encabezado puede producir hallazgos de página.
- Figma: falta el nodo específico del Switch; no afirmar fidelidad visual hasta contrastarlo. El Figma de kanban del PR #7 es un recurso distinto.
