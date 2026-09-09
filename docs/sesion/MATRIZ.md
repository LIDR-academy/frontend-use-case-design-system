# Matriz de trazabilidad

| Requisito | Prueba docente | Story de referencia | Aceptación |
|---|---|---|---|
| SW-01 | click changes value once | Checked / Unchecked / Interactive | Callback único y valor controlado |
| SW-02 | disabled blocks mouse and callback; skipped by Tab | Disabled / DisabledChecked | No mutación ni callback; omite Tab |
| SW-03 | Space and Enter change value once each | Interactive | Activación única por tecla |
| SW-04 | build-storybook + revisión humana | MultipleSizes y estados anteriores | Comparación con nodo Figma pendiente |

El código base corresponde a un PR abierto, no a main. Una story compilada no demuestra aceptación visual. No marcar SW-04 terminado sin comparar con diseño verificado.
