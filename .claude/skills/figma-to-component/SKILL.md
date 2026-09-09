---
name: figma-to-component
description: Inspeccionar el nodo Figma de un componente y producir un contrato trazable para la práctica frontend, sin publicar ni ampliar alcance.
---

1. Solicitar/leer el enlace exacto al nodo. Si falta acceso, registrar bloqueo y trabajar provisionalmente con el contrato escrito; no inventar tokens ni afirmar fidelidad.
2. Inspeccionar variantes, tamaños, estados, espaciado, tipografía, colores e interacción. Separar valores observados de inferencias.
3. Clasificar responsabilidad con Atomic Design. Reutilizar tokens y átomos existentes antes de añadir otros.
4. Volcar requisitos y escenarios en el change OpenSpec. Vincular nodo, fecha, story y requisito estable.
5. Entregar al rol de desarrollo un cambio acotado. Pedir al rol de testing escenarios de interacción, teclado, disabled y estados visuales.
6. Adjuntar capturas de las mismas variantes a la revisión del PR; listar diferencias y decisiones pendientes. La publicación/aceptación de Chromatic y merge pertenecen a la revisión humana.

Salida: tabla Requisito | Evidencia Figma | Token/variante | Story | Test | Diferencia pendiente. No ejecutar automáticamente comandos de publicación del repositorio.
