/* ==========================================================================
   PropulsarIA — neural-network.js
   Red neuronal 2D animada para la sección "El Enfoque".
   Muestra nodos agrupados en 4 fases (Diagnóstico, Hoja de ruta,
   Quick Wins, Escalado) con señales que viajan entre ellos.
   Usa Canvas 2D (ligero). Se activa con IntersectionObserver.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wrapper = document.getElementById('neural-canvas-wrapper');
  const canvas  = document.getElementById('neural-canvas');
  if (!canvas || !wrapper) return;

  const ctx = canvas.getContext('2d');
  let ancho, alto, activo = false, tick = 0;
  let faseActiva = 0; // 0-3, fase resaltada actualmente

  /* ── Paleta ── */
  const COLOR_NODO_INACTIVO = 'rgba(37,99,235,0.18)';
  const COLOR_NODO_ACTIVO   = 'rgba(96,165,250,0.75)';
  const COLOR_LINEA         = 'rgba(37,99,235,0.08)';
  const COLOR_LINEA_ACTIVA  = 'rgba(96,165,250,0.28)';
  const COLOR_SEÑAL         = 'rgba(255,255,255,0.7)';

  /* ── Fases del proceso ── */
  const FASES = [
    { nombre: 'Diagnóstico',   color: '#2563EB' },
    { nombre: 'Hoja de Ruta',  color: '#3B82F6' },
    { nombre: 'Quick Wins',    color: '#60A5FA' },
    { nombre: 'Escalado',      color: '#93C5FD' },
  ];

  let nodos = [];
  let señales = [];

  function medir() {
    ancho = wrapper.clientWidth;
    alto  = wrapper.clientHeight;
    canvas.width  = ancho * devicePixelRatio;
    canvas.height = alto  * devicePixelRatio;
    canvas.style.width  = ancho + 'px';
    canvas.style.height = alto  + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    generarNodos();
  }

  function generarNodos() {
    nodos = [];
    const N_FASES = FASES.length;
    const NODOS_POR_FASE = ancho < 500 ? 5 : 8;
    const margenH = ancho  * 0.08;
    const margenV = alto   * 0.12;
    const anchoFase = (ancho - margenH * 2) / N_FASES;

    for (let f = 0; f < N_FASES; f++) {
      const cx = margenH + anchoFase * f + anchoFase / 2;
      for (let n = 0; n < NODOS_POR_FASE; n++) {
        const x = cx + (Math.random() - 0.5) * anchoFase * 0.7;
        const y = margenV + Math.random() * (alto - margenV * 2);
        nodos.push({
          x, y,
          fase: f,
          r: 3.5 + Math.random() * 3,
          pulso: Math.random() * Math.PI * 2,
          velPulso: 0.025 + Math.random() * 0.02,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
        });
      }
    }
  }

  /* Emite una señal de un nodo a otro nodo de fase siguiente */
  function emitirSeñal() {
    const fase = faseActiva % (FASES.length - 1);
    const origen  = nodos.filter(n => n.fase === fase);
    const destino = nodos.filter(n => n.fase === fase + 1);
    if (!origen.length || !destino.length) return;

    const o = origen[Math.floor(Math.random() * origen.length)];
    const d = destino[Math.floor(Math.random() * destino.length)];

    señales.push({ ox: o.x, oy: o.y, dx: d.x, dy: d.y, t: 0, vel: 0.012 + Math.random() * 0.01 });
  }

  function dibujar() {
    if (!activo) return;
    tick += 0.015;

    ctx.clearRect(0, 0, ancho, alto);

    /* ── Fondo suave, sin etiquetas: los títulos van en las cards ── */
    ctx.strokeStyle = 'rgba(37,99,235,0.035)';
    ctx.lineWidth = 1;
    const paso = 48;
    for (let x = 0; x < ancho; x += paso) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, alto); ctx.stroke();
    }
    for (let y = 0; y < alto; y += paso) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(ancho, y); ctx.stroke();
    }

    const N_FASES = FASES.length;
    const anchoFase = ancho / N_FASES;

    /* ── Actualizar posición de nodos ── */
    nodos.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      const cx = anchoFase * n.fase + anchoFase / 2;
      /* Atraer sutilmente hacia el centro de su fase */
      const dx = cx - n.x;
      n.vx += dx * 0.0004;
      n.vy *= 0.998;
      n.vx *= 0.998;
      /* Rebotar en bordes de la franja */
      const xMin = anchoFase * n.fase + 10;
      const xMax = anchoFase * (n.fase + 1) - 10;
      if (n.x < xMin || n.x > xMax) n.vx *= -1;
      if (n.y < 10 || n.y > alto - 10) n.vy *= -1;
    });

    /* ── Conexiones entre nodos de fase adyacente ── */
    const DIST_MAX_INTER  = ancho * 0.3;
    const DIST_MAX_INTRA  = ancho * 0.15;

    for (let i = 0; i < nodos.length; i++) {
      for (let j = i + 1; j < nodos.length; j++) {
        const ni = nodos[i], nj = nodos[j];
        const dx = ni.x - nj.x, dy = ni.y - nj.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        const esMismaFase = ni.fase === nj.fase;
        const dist = esMismaFase ? DIST_MAX_INTRA : DIST_MAX_INTER;
        if (Math.abs(ni.fase - nj.fase) > 1) continue;
        if (d > dist) continue;

        const esActiva = (ni.fase === faseActiva || nj.fase === faseActiva);
        const alfa = (1 - d / dist) * (esActiva ? 0.28 : 0.07);
        ctx.beginPath();
        ctx.strokeStyle = esActiva
          ? `rgba(96,165,250,${alfa})`
          : `rgba(37,99,235,${alfa * 0.5})`;
        ctx.lineWidth = esActiva ? 1.5 : 0.8;
        ctx.moveTo(ni.x, ni.y);
        ctx.lineTo(nj.x, nj.y);
        ctx.stroke();
      }
    }

    /* ── Nodos ── */
    nodos.forEach(n => {
      n.pulso += n.velPulso;
      const esActivo_ = n.fase === faseActiva;
      const r = n.r + (esActivo_ ? Math.sin(n.pulso) * 1.5 : 0);

      /* Glow exterior */
      if (esActivo_) {
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        grd.addColorStop(0, `rgba(96,165,250,0.22)`);
        grd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      /* Nodo */
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = esActivo_ ? FASES[n.fase].color : 'rgba(37,99,235,0.22)';
      ctx.fill();

      if (esActivo_) {
        ctx.strokeStyle = 'rgba(96,165,250,0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });

    /* ── Señales viajando por las conexiones ── */
    señales = señales.filter(s => s.t < 1);
    señales.forEach(s => {
      s.t += s.vel;
      const x = s.ox + (s.dx - s.ox) * s.t;
      const y = s.oy + (s.dy - s.oy) * s.t;

      const grd = ctx.createRadialGradient(x, y, 0, x, y, 6);
      grd.addColorStop(0, 'rgba(255,255,255,0.95)');
      grd.addColorStop(0.4, 'rgba(96,165,250,0.6)');
      grd.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    });

    /* ── Cambio de fase activa cada 2.5s ── */
    if (reducirMovimiento) {
      /* Sin animación, mostrar todo visible */
    } else {
      const nuevaFase = Math.floor((tick / (2.5 * 0.015)) % FASES.length);
      if (nuevaFase !== faseActiva) {
        faseActiva = nuevaFase;
        /* Emitir señales cuando cambia de fase */
        for (let k = 0; k < 4; k++) setTimeout(emitirSeñal, k * 180);
      }
    }

    requestAnimationFrame(dibujar);
  }

  /* ── Observador de visibilidad ── */
  const observador = new IntersectionObserver(
    entries => {
      activo = entries[0].isIntersecting;
      if (activo && tick === 0) dibujar();
      if (activo) dibujar();
    },
    { threshold: 0.1 }
  );
  observador.observe(wrapper);

  medir();
  window.addEventListener('resize', medir);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(medir).observe(wrapper);
  }

  /* Si prefers-reduced-motion, mostrar todo visible de una */
  if (reducirMovimiento) {
    faseActiva = -1; /* todas activas */
    activo = true;
    dibujar();
  }
});
