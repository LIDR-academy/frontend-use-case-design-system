# Switch accesible con evidencia trazable

## Why
Necesitamos un interruptor reutilizable que permita cambiar una preferencia y que permanezca inerte cuando está deshabilitado.

## What Changes
Añadir un átomo Switch con contrato controlado `checked`, `onCheckedChange`, `disabled`, etiqueta y tamaños sm/md/lg. Añadir stories, pruebas de interacción y matriz requisito-evidencia.

## Impact
`src/components/atoms/Switch/` y export de átomos. No cambiar estilos globales ni implementar llamadas API. El PR #9 es una referencia existente; estos artefactos OpenSpec son material docente añadido, no parte del repositorio original.
