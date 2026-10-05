/* ==========================================================================
   PropulsarIA — background-3d.js
   Fondos de partículas sutiles para secciones que no son el hero.
   Usa canvas 2D (más liviano que Three.js) para no sobrecargar páginas
   con varias secciones. Se activa solo cuando la sección es visible.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducirMovimiento) return;

  document.querySelectorAll('.particulas-sutiles').forEach((contenedor) => {
    const canvas = document.createElement('canvas');
    contenedor.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const oscuro = contenedor.closest('.seccion--oscura') !== null;
    const colorPunto = oscuro ? '59, 130, 246' : '37, 99, 235';

    let ancho, alto, puntos, activo = false;

    function medir() {
      ancho = contenedor.clientWidth;
      alto = contenedor.clientHeight;
      canvas.width = ancho * devicePixelRatio;
      canvas.height = alto * devicePixelRatio;
      canvas.style.width = ancho + 'px';
      canvas.style.height = alto + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    function crearPuntos() {
      const cantidad = Math.round((ancho * alto) / 22000);
      puntos = Array.from({ length: cantidad }, () => ({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        alfa: Math.random() * 0.5 + 0.15,
      }));
    }

    function dibujar() {
      if (!activo) return;
      ctx.clearRect(0, 0, ancho, alto);
      puntos.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = ancho;
        if (p.x > ancho) p.x = 0;
        if (p.y < 0) p.y = alto;
        if (p.y > alto) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorPunto}, ${p.alfa})`;
        ctx.fill();
      });
      requestAnimationFrame(dibujar);
    }

    medir();
    crearPuntos();
    window.addEventListener('resize', () => {
      medir();
      crearPuntos();
    });

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          activo = entrada.isIntersecting;
          if (activo) dibujar();
        });
      },
      { threshold: 0.05 }
    );
    observador.observe(contenedor);
  });
});
