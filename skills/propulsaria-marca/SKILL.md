---
name: propulsaria-marca
description: Aplica la identidad, voz y formatos de PropulsarIA en piezas de comunicación (web, brochure, carruseles LinkedIn, video, posts). Usar al crear o editar copy, diseño, slides o video de la agencia de implementación de IA, o si el usuario menciona PropulsarIA, brochure, LinkedIn o diagnóstico.
---

# PropulsarIA — identidad de marca

Skill portable. No depende de un IDE. Cualquier agente debe leer este archivo y, si hace falta detalle de formatos, [reference.md](reference.md).

## Cómo cargarlo en otro agente

- **Claude / ChatGPT / Gemini / otro:** adjunta la carpeta `propulsaria-marca/` o pega `SKILL.md` en instrucciones del proyecto / system prompt / knowledge.
- **Cursor u otros con Agent Skills:** copia la carpeta a las skills del proyecto o del usuario.
- No requiere herramientas, APIs ni plugins. Si el proyecto tiene HTML, Remotion u otros archivos, úsalos; si no, genera piezas que respeten esta identidad.

## Quién es

PropulsarIA es una **agencia de implementación de Inteligencia Artificial**. No vende “herramientas” ni demos. El orden es: diagnóstico → hoja de ruta → quick wins → escalado.

Eslogan: **Antes de la herramienta está el diagnóstico.**

Audiencia: sector público, empresas y cooperación. Operación real, no laboratorio.

## Paleta (obligatoria)

| Uso | Hex |
|---|---|
| Navy (fondos oscuros, héroes) | `#080E1A` |
| Navy 2 | `#0F172A` |
| Acento | `#2563EB` |
| Acento 2 | `#3B82F6` |
| Neón / kicker sobre oscuro | `#60A5FA` |
| Títulos sobre claro | `#1E3A8A` |
| Cuerpo | `#334155` |
| Papel | `#F7F8FA` |
| Blanco | `#FFFFFF` |

Prohibido: morados “AI”, verdes neón, naranjas de urgencia, paletas genéricas de startup.

## Tipo y logo

- Titulares y cuerpo editorial: **Fraunces**, fallback Georgia / Times New Roman.
- UI (nav, botones, kickers, números): **Source Sans 3**, fallback Segoe UI / Helvetica / Arial.
- Logo siempre sobre **rectángulo blanco** con esquinas redondeadas. Nunca suelto sobre foto o 3D.
- Dominio en pie de pieza: `www.propulsaria.com`
- Contacto: `contacto@propulsaria.com` · WhatsApp `+57 315 236 9917`

## Voz

Consultoría clara. Español de Colombia, tuteo cuando habla al lector. Frases cortas. Un dato o una idea por pieza.

**Decir:** implementar, capturar valor, diagnóstico, mapa, proceso, operación, retorno.

**No decir:** revolucionar, disruptivo, magia, el poder de la IA, transforma tu negocio, el futuro es hoy, ChatGPT como fin.

La conversación pública habla de herramientas. PropulsarIA habla de lo que hay que entender **antes**.

Cierre habitual: diagnóstico gratuito, sin compromiso, sin maratones de reuniones.

## Piezas tipo

1. **Portada oscura** — kicker en mayúsculas + tracking, título Fraunces, una línea de apoyo.
2. **Cifra** — un número grande (`88%`, `12%`) y una frase que lo explica.
3. **Mapa (5)** — Digitalización, Sistemas, Integración, Datos, Procesos. En ese orden. Números 01–05.
4. **Proceso (4)** — Diagnóstico, Hoja de ruta, Quick wins, Escalado. Textos debajo, sin etiquetas poéticas (Mirar, Trazar, etc.).
5. **Insight** — una cita o tesis, sin decoración extra.
6. **CTA** — “Un diagnóstico gratuito.” + `www.propulsaria.com`

## Video y motion

Si el repo tiene Remotion (`remotion/`), reutilizar composiciones y tokens de color. LinkedIn: **1080×1080** (feed) o **1080×1350**; 30 fps; 15–45 s; texto en pantalla (se ve sin sonido); exportar MP4 H.264.

Composición de diagnóstico para LinkedIn: id `DiagnosticoLinkedIn`, 1080×1080.

Animación al servicio de la idea: entrada suave (spring), no bounce infantil, no stock de robots.

Carrusel estático: plantilla HTML `linkedin-plantillas.html` o PDF 1080×1080, un concepto por página. En LinkedIn se sube como **Documento**.

## Impresión / PDF

Sin `box-shadow`. Bordes sólidos (`#93C5FD`). Fondos opacos. `print-color-adjust: exact`. El brochure es A4, 3 páginas; no saturar con recuadros.

## Checklist antes de entregar

- [ ] Paleta y logo según esta skill
- [ ] Una idea por slide / escena
- [ ] Pie con `www.propulsaria.com`
- [ ] CTA de diagnóstico si es cierre
- [ ] Sin palabrería de hype
- [ ] Formato LinkedIn cuadrado si el destino es el feed
