/* ==========================================================================
   PropulsarIA — section-reveal.js v2
   Anima .al-vista al entrar en viewport con Intersection Observer.
   Soporta variantes: .al-vista--izquierda, --derecha, --escalar.
   Escalonado automático para grupos .grupo-escalonado.
   Split-text en títulos .titulo-seccion si el título tiene data-split.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducirMovimiento) {
    document.querySelectorAll('.al-vista, .particulas-sutiles, .stat-item').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  /* ── Escalonado de tarjetas en grupos ── */
  document.querySelectorAll('.grupo-escalonado').forEach(grupo => {
    Array.from(grupo.children).forEach((hijo, i) => {
      hijo.style.setProperty('--retraso', `${i * 0.13}s`);
    });
  });

  /* ── Observador principal para .al-vista ── */
  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.al-vista, .al-vista--izquierda, .al-vista--derecha, .al-vista--escalar').forEach(el => obs.observe(el));

  /* ── Partículas sutiles ── */
  const obsParticulas = new IntersectionObserver(
    entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
    { threshold: 0.05 }
  );
  document.querySelectorAll('.particulas-sutiles').forEach(el => obsParticulas.observe(el));

  /* ── Stats: activar counter y entrada ── */
  const obsStats = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll('.stat-item').forEach(el => obsStats.observe(el));

  /* ── Split-text para títulos con data-split="true" ── */
  document.querySelectorAll('[data-split="true"]').forEach(titulo => {
    const palabras = titulo.textContent.trim().split(' ');
    titulo.innerHTML = palabras.map((pal, i) =>
      `<span class="palabra-wrap" style="overflow:hidden;display:inline-block;">
        <span class="palabra-inner" style="
          display:inline-block;
          transform:translateY(100%);
          opacity:0;
          transition:transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s,
                     opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s;
        ">${pal}</span>
      </span>${i < palabras.length - 1 ? ' ' : ''}`
    ).join('');

    new IntersectionObserver(
      (entries, observer) => {
        if (!entries[0].isIntersecting) return;
        titulo.querySelectorAll('.palabra-inner').forEach(span => {
          span.style.transform = 'translateY(0)';
          span.style.opacity   = '1';
        });
        observer.unobserve(titulo);
      },
      { threshold: 0.2 }
    ).observe(titulo);
  });
});
