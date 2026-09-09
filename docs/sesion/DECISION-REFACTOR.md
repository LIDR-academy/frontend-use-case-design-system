# RF-01 · Extraer variantes de tamaño

El cambio mueve el mapa sm/md/lg a Switch.styles.ts. No cambia clases, props, callbacks, teclado ni disabled. Se conserva SW-01 a SW-04; no añadir requisitos ficticios por reorganizar archivos.

Verificar: comparar el diff de 03-verde a 04-refactor, ejecutar los mismos tests y TypeScript, y compilar las mismas stories. Registrar resultados antes de aceptar el refactor. Si aparece un cambio visible o de comportamiento, revisarlo como cambio de contrato y actualizar escenarios.
