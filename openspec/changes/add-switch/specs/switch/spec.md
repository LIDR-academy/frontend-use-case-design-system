## ADDED Requirements

### Requirement: SW-01 — Cambio controlado
El Switch SHALL recibir su valor mediante checked y comunicar el siguiente valor mediante onCheckedChange, una vez por activación.

#### Scenario: Activación por ratón
- **WHEN** se hace click en un Switch habilitado y apagado
- **THEN** solicita true exactamente una vez y refleja el valor actualizado que recibe del consumidor

### Requirement: SW-02 — Deshabilitado
El Switch SHALL impedir cambios y callbacks cuando disabled es true.

#### Scenario: Intento con ratón
- **WHEN** se intenta hacer click en el Switch deshabilitado
- **THEN** conserva checked y no invoca onCheckedChange

#### Scenario: Recorrido con teclado
- **WHEN** se pulsa Tab desde el control anterior
- **THEN** el foco pasa al control siguiente, omitiendo el Switch deshabilitado, cuyo valor permanece igual

### Requirement: SW-03 — Teclado
El Switch SHALL permitir activación mediante Espacio y Enter cuando está habilitado.

#### Scenario: Activaciones sucesivas
- **WHEN** se pulsa Espacio y después Enter con el foco en el Switch inicialmente apagado
- **THEN** solicita true y después false, una vez por tecla

### Requirement: SW-04 — Evidencia visual
Las stories SHALL mostrar on/off, disabled y sm/md/lg para contrastarlas con el diseño.

#### Scenario: Revisión de cambios visuales
- **WHEN** se genera un build de stories
- **THEN** una persona compara los estados con la referencia y registra aceptación o discrepancias; no se acepta automáticamente una diferencia por tener CI verde
