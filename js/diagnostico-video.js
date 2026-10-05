/* PropulsarIA — reproductor tipo Remotion para el articulo de diagnostico */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const root = document.querySelector('[data-video-diagnostico]');
  if (!root) return;

  const ESCENAS = [
    { kicker: 'PropulsarIA', titulo: 'Antes de la herramienta está el diagnóstico.', texto: 'Implementar IA no empieza eligiendo un modelo.' },
    { kicker: 'La pregunta equivocada', titulo: '¿ChatGPT, Claude o Gemini?', texto: 'Esa pregunta llega demasiado pronto. Primero hay que entender el punto de partida.' },
    { kicker: '01 · Digitalización', titulo: '¿Qué tan digital es la operación real?', texto: 'No el discurso. El papel, el Excel y lo que vive en la cabeza de una persona.' },
    { kicker: '02 · Sistemas', titulo: '¿Qué usa el equipo cada mañana?', texto: 'CRM, ERP, correo y chats. El inventario de TI y el uso diario no siempre coinciden.' },
    { kicker: '03 · Integración', titulo: '¿Esos sistemas conversan entre sí?', texto: 'Si la información se copia a mano, la IA hereda el mismo cuello de botella.' },
    { kicker: '04 · Datos', titulo: '¿Dónde viven y qué tan limpios están?', texto: 'Sin una base confiable no hay contexto. Sin contexto, la IA improvisa.' },
    { kicker: '05 · Procesos', titulo: '¿Qué se puede automatizar de verdad?', texto: 'No lo más innovador. Lo repetitivo, medible y que hoy consume tiempo de decisión.' },
    { kicker: 'Cierre', titulo: 'Uso no es implementación.', texto: 'El siguiente paso no es otra demo. Es diagnosticar.' },
  ];

  const DURACION = 3200;
  const pantalla = root.querySelector('.video-diagnostico__escena');
  const kicker = root.querySelector('[data-kicker]');
  const titulo = root.querySelector('[data-titulo]');
  const texto = root.querySelector('[data-texto]');
  const barra = root.querySelector('[data-progreso]');
  const playBtn = root.querySelector('[data-play]');
  const tiempo = root.querySelector('[data-tiempo]');
  const puntos = root.querySelector('[data-puntos]');

  let i = 0;
  let playing = true;
  let started = 0;
  let acc = 0;
  let raf = 0;

  ESCENAS.forEach((_, idx) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Escena ' + (idx + 1));
    b.addEventListener('click', () => irA(idx));
    puntos.appendChild(b);
  });

  function pintar(idx) {
    const e = ESCENAS[idx];
    pantalla.classList.remove('visible');
    window.setTimeout(() => {
      kicker.textContent = e.kicker;
      titulo.textContent = e.titulo;
      texto.textContent = e.texto;
      pantalla.classList.add('visible');
    }, 160);
    [...puntos.children].forEach((p, k) => p.classList.toggle('activo', k === idx));
  }

  function irA(idx) {
    i = idx % ESCENAS.length;
    acc = 0;
    started = performance.now();
    pintar(i);
  }

  function fmt(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return '0:' + String(s).padStart(2, '0');
  }

  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (!playing) return;
    const elapsed = acc + (now - started);
    const total = DURACION * ESCENAS.length;
    const local = elapsed % total;
    const idx = Math.floor(local / DURACION);
    if (idx !== i) {
      i = idx;
      pintar(i);
    }
    barra.style.width = ((local / total) * 100) + '%';
    tiempo.textContent = fmt(local) + ' / ' + fmt(total);
  }

  playBtn.addEventListener('click', () => {
    playing = !playing;
    playBtn.setAttribute('aria-pressed', String(playing));
    playBtn.textContent = playing ? 'Pausa' : 'Reproducir';
    if (playing) {
      started = performance.now();
    } else {
      acc += performance.now() - started;
    }
  });

  pintar(0);
  started = performance.now();
  raf = requestAnimationFrame(loop);
  window.addEventListener('beforeunload', () => cancelAnimationFrame(raf));
});
