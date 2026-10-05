# PropulsarIA — Sitio Web Oficial

Sitio web de alto impacto visual y optimizado para SEO tradicional y AI SEO (motores de respuesta por IA: ChatGPT Search, Perplexity, Gemini, Claude).
Listo para desplegar en **Hostinger** (hosting compartido / `public_html/`). No requiere backend ni base de datos.

---

## Características Implementadas

1. **Animaciones 3D diferenciadas por página (Three.js desde CDN):**
   - **Inicio (`index.html`)**: Campo de partículas interactivas que reaccionan al puntero del mouse + Parallax multicapa.
   - **Servicios (`servicios.html`)**: Nudo toroidal dinámico (*Torus Knot*) con iluminación puntual y rotación lenta.
   - **Proyectos (`proyectos.html`)**: Icosaedro tridimensional con facetas wireframe y shader animado.
   - **Blog (`blog.html`)**: Superficie ondulante suave (*Wave Geometry*) que simula flujo de fluidos / información.
   - **Contacto (`contacto.html`)**: Esfera con meridianos y anillo orbital pulsante.

2. **Visualizador de Red Neuronal 2D (`js/neural-network.js`):**
   - Canvas interactivo para la sección *"El Enfoque"*, con visualización continua de datos fluyendo entre las 4 fases: *Diagnóstico → Hoja de ruta → Quick wins → Escalado*.

3. **Efectos de Motion y Microinteracciones:**
   - Cursor personalizado con suavizado (punto + anillo con delay).
   - Divisores orgánicos animados (*Wave SVG dividers* y *divisores neón*).
   - Contadores numéricos dinámicos activados por scroll (*stats-grid* y *stat-destacada*).
   - Acordeón interactivo en servicios y tabs de navegación fija con desenfoque (*backdrop-filter: blur*).
   - Botón de WhatsApp flotante con pulso continuo y tooltip expandible.
   - Efecto Ripple en clics de botones.
   - Soporte total para `prefers-reduced-motion` (desactiva Three.js y animaciones pesadas para accesibilidad).

4. **SEO & Datos Estructurados (Schema.org JSON-LD):**
   - `Organization` y `WebSite` con acción de búsqueda.
   - `BreadcrumbList` jerárquico.
   - `Service` para cada uno de los 8 servicios ofrecidos.
   - `Article` para cada entrada del blog con autoría, fechas y metadata.
   - Open Graph y Twitter Cards completas.

5. **Composiciones de Video Programático (Remotion):**
   - Ubicadas en la carpeta `/remotion/` con código fuente en TypeScript/React:
     - `HeroVideo`: loop neuronal cinemático (8-10s).
     - `EnfoqueVideo`: explicación de las 4 fases del proceso (15s).

---

## Cómo desplegar en Hostinger

1. Entra al **Administrador de archivos de hPanel** (o usa un cliente FTP como FileZilla).
2. Sube **todo el contenido de esta carpeta** dentro del directorio `public_html/`.
3. Verifica que `index.html`, `.htaccess`, `robots.txt` y `sitemap.xml` queden ubicados en la raíz de `public_html/`.
4. Asegúrate de tener activo el certificado SSL en hPanel (el archivo `.htaccess` ya fuerza automáticamente la redirección a HTTPS).

---

## Estructura de Archivos

```
/propulsaria-web
├── index.html                    # Portada con red neuronal y Three.js
├── servicios.html                # Catálogo de 8 servicios con acordeón y stats
├── proyectos.html                # Proyectos propios (MGA, CooperarIA, etc.)
├── blog.html                     # Análisis de valor y barreras de adopción
├── contacto.html                 # Formulario con glassmorphism y datos directos
├── css/
│   ├── style.css                 # Tokens de diseño, layout, glassmorphism y componentes
│   └── animations.css            # Keyframes, glows, divisores y texto degradado
├── js/
│   ├── main.js                   # Cursor, menú móvil, counters, ripple, scroll-spy
│   ├── hero-3d.js                # 5 escenas Three.js (una para cada página)
│   ├── neural-network.js         # Red neuronal 2D interactiva para "El Enfoque"
│   ├── section-reveal.js         # Revelado escalonado con Intersection Observer
│   └── background-3d.js          # Partículas sutiles de fondo
├── remotion/                     # Código fuente de video programático
│   ├── package.json
│   ├── remotion.config.ts
│   └── src/
│       ├── Root.tsx
│       ├── HeroVideo/index.tsx
│       └── EnfoqueVideo/index.tsx
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── carruseles/               # Presentaciones ejecutivas en PDF descargables
├── .htaccess                     # Seguridad, compresión Gzip y forzado de HTTPS
├── robots.txt                    # Directivas para rastreadores y robots de IA
└── sitemap.xml                   # Mapa del sitio
```
