# Roles de la práctica

Material docente añadido al repo; no presupone que exista un agente ejecutable para cada rol.

- Desarrollo: lee el escenario aceptado, corrige disabled con alcance mínimo y explica el diff.
- Testing: demuestra el fallo pertinente antes de la corrección; ejecuta SW-01/02/03; enumera casos no cubiertos.
- Diseño/Figma: usa la skill docente, registra evidencia del nodo y diferencias visuales. No sustituye tokens observados por supuestos.
- Git/PR: prepara un resumen requisito → cambio → test/story → limitaciones; no hace merge ni publica mensajes por sí solo.
- Revisión humana: decide alcance, fidelidad visual y aceptación final.

Hooks propuestos: comprobación de tipos y tests antes de preparar el PR. No se instalan hooks automáticos que bloqueen commits: el checkpoint rojo contiene un fallo intencional. Para el ejercicio invocar explícitamente `pnpm exec tsc -b` y `pnpm test:session`.
