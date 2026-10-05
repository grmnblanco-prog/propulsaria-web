# Formatos y copy de referencia — PropulsarIA

Leer solo cuando haga falta detalle (tamaños, textos canónicos, render).

## Tamaños

| Destino | Tamaño | Notas |
|---|---|---|
| Carrusel / video feed LinkedIn | 1080 × 1080 | Preferido |
| Post alto LinkedIn | 1080 × 1350 | Más texto |
| Imagen de post horizontal | 1200 × 628 | Un solo recuadro |
| Brochure | A4 (210 × 297 mm) | 3 páginas |
| Video web (hero) | 1920 × 1080 | No usar en el feed |

LinkedIn documento: PDF, una idea por página, márgenes 0, gráficos de fondo activos.

## Cifra canónica

Del 88% que ya usa IA, solo el 12% reporta reducción de costos y aumento de ingresos a la vez. El 76% implementa y no captura valor. Barreras habituales: talento, flujos, datos, gobernanza.

## Los cinco del mapa

1. **Digitalización** — la operación real, no el discurso (papel, Excel suelto, conocimiento en una cabeza).
2. **Sistemas** — lo que el equipo abre cada mañana, no el inventario de TI.
3. **Integración** — si se copia a mano, un agente de IA hereda el cuello de botella.
4. **Datos** — dónde viven y qué tan limpios están; sin contexto, la IA improvisa.
5. **Procesos** — repetitivos y medibles, no los más “innovadores”.

## Los cuatro del proceso

- **Diagnóstico** — sistemas, datos, procesos candidatos y quién puede sostenerlo.
- **Hoja de ruta** — a medida sobre lo diagnosticado, sin casarnos con un solo proveedor.
- **Quick wins** — correo, calendario, reuniones e informes; en semanas, no meses.
- **Escalado** — del piloto a la operación, con métricas y un equipo que ya no depende del consultor.

## Remotion (si existe en el proyecto)

Carpeta `remotion/`. Preview: `npm start`. LinkedIn:

```bash
npx remotion render DiagnosticoLinkedIn out/diagnostico-linkedin.mp4 --codec=h264
```

Otras ids: `HeroVideo`, `EnfoqueVideo`, `DiagnosticoVideo` (1920×1080, web).

## Plantilla estática

`linkedin-plantillas.html` — carrusel de 6 slides editable + piezas sueltas. Imprimir a PDF.

## Lo que no es esta marca

Sitio de “prompts”, marketplace de GPTs, o agencia de ads. Neutralidad frente a proveedores. La herramienta se elige después del mapa.
