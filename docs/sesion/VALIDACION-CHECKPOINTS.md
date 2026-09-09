# Validación de los checkpoints

9 de septiembre de 2026 UTC. Node24.19.0, Chromium141 / Playwright1.56.1. Se reutilizó la instalación local de dependencias fijada en pnpm-lock.yaml; no se afirma validación en otra matriz CI.

| Checkpoint / comando | Resultado real | Qué demuestra |
|---|---|---|
| 02-rojo / test:session | 2 passed, 2 failed | Fallan SW-02 ratón y omisión de Tab por la regresión intencional |
| 03-verde / test:session | 4 passed | Ratón, teclado, disabled y callbacks dentro del alcance de la suite |
| 04-refactor / test:session | 4 passed | La extracción de variantes conserva ese contrato |
| 04-refactor / tsc -b | exit 0 | Comprobación de tipos incluida la fixture docente |
| 04-refactor / storybook build | exit 0 | Stories compilables; aviso de chunks grandes |

Las salidas de ejecución depuradas de rutas locales se guardan en evidencia/. El árbol 05-evidencia añade documentación a 04-refactor y elimina un resultado generado que upstream tenía versionado; no cambia el componente.

Límites: no se verificó el nodo Figma del Switch (el facilitador no dispone del enlace). Se enseñará el recorrido design-to-code con el kanban del PR #7, y se usará el contrato escrito para el Switch. No se publicó en Chromatic ni se aceptaron baselines. SW-04 sigue pendiente de validación de diseño. No se declara resuelta la deuda de la suite original del PR #9 ni conformidad completa de accesibilidad.
