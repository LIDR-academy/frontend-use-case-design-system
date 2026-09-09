# Frontend con IA y SDD · 120 minutos

Base docente: PR #9, SHA 3d6703c9dc4c7770361e89b7e29a94d00e2219c2. El Switch ya existe en esta base; el ejercicio es una corrección de comportamiento, no su creación desde cero.

| Rama | Minutos | Slides | Estado y tarea |
|---|---|---|---|
| sesion-frontend/00-entorno | antes de clase; 00–30 | 1–12 | Dependencias declaradas, lockfile. Inspeccionar arquitectura y stories. |
| sesion-frontend/01-spec | 30–40 | 13–14 | Contrato OpenSpec SW-01 a SW-04 y matriz de evidencia. |
| sesion-frontend/02-rojo | 40–50; inicio práctica 70–85 | 15 y 18 | Regresión intencional de disabled. Dos tests SW-02 deben fallar. |
| sesion-frontend/03-verde | 50–60; solución práctica | 15–16 y 18 | Corregir disabled. Cuatro tests deben pasar. |
| sesion-frontend/04-refactor | 100–110 | 21–23 | Extraer variantes de tamaño preservando contrato y pruebas. |
| sesion-frontend/05-evidencia | 85–110 | 19–23 | Resultados, checklist de PR y límites de aceptación visual. |

La pausa ocupa 60–70; preguntas y ROTI 110–120. La revisión de entregas y bitácora ocupa 05–20 (slides 6–8). No publicar ni fusionar las ramas intencionalmente rotas en main.

## Instalación

Node 24.19.0 y pnpm 11.19.0 fueron usados para preparar el kit. La matriz original de CI (Node18/pnpm9) no queda validada por esta preparación.

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm exec playwright install chromium
pnpm build-storybook
```

Desde 02-rojo existe `pnpm test:session`. Esperar 2 passed/2 failed en rojo y 4 passed en verde/refactor. `pnpm test` del repositorio ejecuta otra suite: no ocultar ni confundir sus fallos con la práctica acotada.

## Cambiar de checkpoint

```sh
git status --short
git switch sesion-frontend/02-rojo
pnpm test:session
```

Con cambios de alumnos pendientes, crear primero una rama propia y guardar un commit. No usar reset --hard ni sobrescribir su trabajo. Las ramas de solución son recursos de recuperación, no una obligación de saltarse el ejercicio.

## Figma, agentes y PR

El nodo del Switch no está verificado. Usar la skill docente `.claude/skills/figma-to-component/SKILL.md` para capturar diseño si está disponible; mientras tanto registrar fidelidad visual pendiente. La comparación con Chromatic requiere proyecto/cuenta del facilitador; generar stories locales no equivale a publicar ni aceptar baselines.
