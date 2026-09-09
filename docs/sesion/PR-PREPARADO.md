# Borrador de PR de la práctica

## Problema y resultado

En el checkpoint de ejercicio, disabled anunciaba un estado inaccesible pero permitía interacción. La solución restaura disabled nativo y los guards para impedir cambios y callbacks. El refactor posterior extrae las variantes sm/md/lg sin modificar el contrato.

## Trazabilidad

- Change: openspec/changes/add-switch; requisitos SW-01 a SW-04.
- Pruebas: Switch.session.spec.tsx; cuatro casos de ratón, teclado y disabled.
- Stories: Atoms/Switch, Disabled, DisabledChecked, Interactive y MultipleSizes.
- Resultados reales: VALIDACION-CHECKPOINTS.md.
- Revisión visual: pendiente de diseño del Switch; el build local no es aprobación de Chromatic.

## Qué mirar en CI

Leer .github/workflows/chromatic.yml. Revisar lint/build y publicación visual por separado. Un job con continue-on-error o exitZeroOnChanges puede estar verde sin que la comparación visual esté aceptada. Confirmar publicación y revisión humana de las stories, no solo el color global.

## Pendientes antes de aceptar

- Contrastar con un nodo de diseño verificable, documentar diferencias y obtener revisión humana.
- Ejecutar el pipeline en la matriz de CI si se pretende fusionar fuera de la práctica.
- Revisar la deuda conocida de las pruebas originales del componente.

No fusionar el checkpoint 02-rojo. No presentar este borrador como un PR ya abierto o aprobado.
