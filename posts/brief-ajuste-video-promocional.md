# Brief para otra IA — ajustar *Video promocional*

Copia este archivo entero (o adjúntalo). Si puedes, adjunta también `skills/propulsaria-marca/SKILL.md` y el MP4.

---

## Rol

Eres editor de motion y copy de **PropulsarIA**, agencia de implementación de IA. No vendes herramientas ni demos. El orden es: diagnóstico → hoja de ruta → quick wins → escalado. Eslogan: *Antes de la herramienta está el diagnóstico.*

## Tarea

Ajusta **solo la segunda parte** de este video:

`propulsaria-web/Video promocional.mp4`

- **No toques** el tramo `00:00`–`00:34`.
- **Reemplaza** desde `00:34` hasta el final.
- Hoy ese tramo muestra las **3 páginas A4 del brochure** como imagen. No se leen: hay demasiada información. Eso hay que quitarlo.
- El tramo nuevo debe conectar dos ideas: **en qué nivel de IA está el usuario** y **cómo acompaña PropulsarIA**. No debe parecer un PDF en cámara.

Entrega un MP4 H.264 con la primera parte original + la segunda parte nueva, mismo tamaño y fps que el archivo de origen (si el original es 16:9, mantén 16:9; no lo conviertas a reel 9:16 salvo que te lo pidan).

## Antes de diseñar

1. Abre el video y anota duración total, resolución, fps y si hay locución.
2. Escucha el audio desde `00:34`.
   - Si la voz describe las páginas del brochure o lee bloques largos, **no fuerces** los nuevos planos a un audio que ya no calza. Reescribe o recorta esa locución para que coincida con el storyboard de abajo, o deja el tramo nuevo **sin voz** y solo con texto en pantalla + música del original.
   - No inventes una locución de hype.
3. No uses screenshots de `brochure.html` como plano principal.

## Storyboard obligatorio (desde 00:34)

Una idea por plano. Texto grande. Se entiende **sin sonido**. Animación suave (entrada tipo spring), sin bounce infantil, sin robots stock.

| # | Duración | En pantalla | Copy (usar este, o más corto; no alargar) |
|---|---|---|---|
| 1 | ~3 s | Portada oscura. Kicker en mayúsculas + tracking. | Kicker: `¿EN QUÉ NIVEL ESTÁS?` · Título: `Usar IA y capturar valor no son el mismo estado.` |
| 2 | ~4–5 s | Cifra grande. Solo dos números. | `88%` usa IA · `12%` reporta menos costos y más ingresos a la vez. Apoyo: `La distancia no es la herramienta. Es el estado real.` |
| 3 | ~5 s | Mapa de 5. Solo número + nombre. Sin párrafos. Pueden entrar de uno en uno. | `01 Digitalización` · `02 Sistemas` · `03 Integración` · `04 Datos` · `05 Procesos` |
| 4 | ~5 s | Proceso de 4, en ese orden. Chips o fila. Sin “Mirar / Trazar” ni nombres poéticos. | `Diagnóstico → Hoja de ruta → Quick wins → Escalado` · Apoyo corto opcional: `Empezamos por el punto de partida.` |
| 5 | ~4–5 s | CTA. Logo sobre recuadro blanco. URL visible. | `Un diagnóstico gratuito.` · `www.propulsaria.com` · Opcional: `Sin compromiso y sin maratones de reuniones.` |

Total del tramo nuevo: **aprox. 21–25 s**. Si el original después del 34 dura más, recorta. Si dura menos, comprime cada plano ~1 s; no vuelvas a meter el brochure para rellenar.

## Qué no mostrar

- Las 3 páginas del brochure a pantalla (ni enteras, ni en Ken Burns de página completa).
- Los **8 servicios** juntos (consultoría, agentes, IA local, web, academia, etc.). El proceso de 4 pasos *es* la oferta en este video. Los ocho viven en el brochure y en la web.
- Párrafos del mapa (papel, Excel, CRM, RAG…).
- QR grande, teléfono y email a la vez. Solo URL, salvo que el original ya cierre con contacto y debas respetar 1 línea.
- Morados “AI”, verde neón, naranja de urgencia, “revolucionar”, “disruptivo”, “el poder de la IA”, “transforma tu negocio”, “el futuro es hoy”.

## Marca (obligatoria)

| Uso | Hex |
|---|---|
| Navy (fondos) | `#080E1A` |
| Navy 2 | `#0F172A` |
| Acento | `#2563EB` |
| Acento 2 | `#3B82F6` |
| Neón / kicker sobre oscuro | `#60A5FA` |
| Títulos sobre claro | `#1E3A8A` |
| Cuerpo | `#334155` |
| Papel | `#F7F8FA` |
| Blanco | `#FFFFFF` |

- Titulares: **Fraunces** (fallback Georgia / Times New Roman).
- UI, kickers, números: **Source Sans 3** (fallback Segoe UI / Helvetica / Arial).
- Logo siempre sobre **rectángulo blanco** de esquinas redondeadas. Nunca suelto sobre foto o 3D.
- Voz: consultoría, español de Colombia, tuteo. Frases cortas. Un dato por plano.
- Decir: implementar, capturar valor, diagnóstico, mapa, proceso, operación, retorno.

## Cómo construirlo (elige según tus herramientas)

**Opción A — Remotion (preferida si tienes el repo)**  
Hay composiciones en `propulsaria-web/remotion/` que ya dicen esto: `EstadosIALinkedIn`, `DiagnosticoLinkedIn`, `EnfoqueVideo`. Reutiliza tokens, tipo y motion. Crea una composición **del mismo aspect ratio que el MP4 original** (no fuerces 1080×1080 si el promo es 16:9). Empalma `00:00`–`00:34` del original + el render nuevo. Exports: H.264.

**Opción B — Editor (CapCut, Premiere, DaVinci)**  
Genera 5 stills o motion graphics con el storyboard. Sustituye clips desde `00:34`. Mantén música/ambiente del original si no choca con el nuevo ritmo.

**Opción C — Recorte del brochure (solo si te piden “se vea el brochure”)**  
Prohibido página completa. Un recorte a casi pantalla de **una** zona: las barras 88/12 **o** los 4 pasos. El resto, fuera de cuadro. Preferible no usar esta opción.

## Entrega

1. MP4 final (primera parte intacta + segunda nueva).
2. Nota de 5 líneas: duración total, qué hiciste con el audio desde 00:34, y confirmación de que no hay páginas A4 ni 8 servicios.
3. No subas a redes. No cambies la web ni el brochure.

## Checklist

- [ ] `00:00`–`00:34` igual que el original
- [ ] Cero páginas A4 a pantalla
- [ ] Una idea por plano
- [ ] 88/12, mapa de 5 nombres, proceso de 4, CTA
- [ ] Paleta y logo según tabla
- [ ] Se entiende muteado
- [ ] Pie o cierre con `www.propulsaria.com`
