/* ==========================================================================
   PropulsarIA — main.js v2
   Cursor personalizado, menú, scroll-spy, acordeón, formulario,
   counters animados, parallax de blobs, ripple en botones,
   animación de proceso (pasos).
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const heroInicio = document.querySelector('.hero');
  if (heroInicio) {
    requestAnimationFrame(() => setTimeout(() => heroInicio.classList.add('cargado'), 60));
  }

  /* ─────────── Cursor personalizado ─────────── */
  if (!reducirMovimiento) {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.documentElement.classList.add('cursor-custom');

    let cx = -100, cy = -100, rx = -100, ry = -100;

    let cursorActivo = false;
    function animarCursor() {
      cursorActivo = true;
      dot.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;
      rx += (cx - rx) * 0.14;
      ry += (cy - ry) * 0.14;
      ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
      if (Math.abs(cx - rx) < 0.4 && Math.abs(cy - ry) < 0.4) {
        cursorActivo = false;
        return;
      }
      requestAnimationFrame(animarCursor);
    }

    window.addEventListener('mousemove', e => {
      cx = e.clientX; cy = e.clientY;
      if (!cursorActivo) animarCursor();
    }, { passive: true });

    /* Efecto hover en elementos interactivos */
    document.querySelectorAll('a, button, .card, .servicio, .boton').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    /* Ocultar cursor al salir de ventana */
    document.addEventListener('mouseleave', () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    });
  }

  /* ─────────── Navegación con blur al hacer scroll ─────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('nav--flotante', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─────────── Menú hamburguesa (móvil) ─────────── */
  const hamburguesa = document.querySelector('.nav__hamburguesa');
  const listaNav    = document.querySelector('.nav__lista');
  if (hamburguesa && listaNav) {
    hamburguesa.addEventListener('click', () => {
      const open = hamburguesa.classList.toggle('abierto');
      listaNav.classList.toggle('abierto');
      document.body.classList.toggle('menu-abierto');
      hamburguesa.setAttribute('aria-expanded', String(open));
    });
    listaNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburguesa.classList.remove('abierto');
        listaNav.classList.remove('abierto');
        document.body.classList.remove('menu-abierto');
        hamburguesa.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─────────── Scroll-spy (solo Inicio) ─────────── */
  const enlacesSpy   = document.querySelectorAll('[data-spy]');
  const seccionesSpy = document.querySelectorAll('[data-seccion]');
  if (enlacesSpy.length && seccionesSpy.length) {
    new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute('data-seccion');
            enlacesSpy.forEach(el => el.classList.remove('activo'));
            const activo = document.querySelector(`[data-spy="${id}"]`);
            if (activo) activo.classList.add('activo');
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    seccionesSpy.forEach(s =>
      new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute('data-seccion');
            enlacesSpy.forEach(el => el.classList.remove('activo'));
            const activo = document.querySelector(`[data-spy="${id}"]`);
            if (activo) activo.classList.add('activo');
          }
        }),
        { rootMargin: '-45% 0px -45% 0px' }
      ).observe(s)
    );
  }

  /* ─────────── Acordeón de servicios ─────────── */
  document.querySelectorAll('.servicio__cabecera').forEach(cabecera => {
    cabecera.addEventListener('click', () => {
      const item    = cabecera.closest('.servicio');
      const cuerpo  = item.querySelector('.servicio__cuerpo');
      const abierto = item.classList.contains('abierto');
      if (abierto) {
        item.classList.remove('abierto');
        if (cuerpo) cuerpo.style.maxHeight = null;
      } else {
        item.classList.add('abierto');
        if (cuerpo) cuerpo.style.maxHeight = cuerpo.scrollHeight + 'px';
      }
    });
  });

  /* Los servicios se abren de forma independiente; no se estira la columna vecina. */

  /* ─────────── Formularios (contacto y formulación) ─────────── */
  document.querySelectorAll('#formulario-contacto, #formulario-formulacion').forEach(formulario => {
    formulario.addEventListener('submit', async e => {
      e.preventDefault();
      const btn  = formulario.querySelector('[type="submit"]');
      const conf = formulario.querySelector('.formulario-confirmacion');
      const err  = formulario.querySelector('.formulario-error');
      const datos = new FormData(formulario);

      if ((datos.get('website') || '').trim()) return;

      const nombre = (datos.get('nombre') || '').toString().trim();
      const correo = (datos.get('correo') || '').toString().trim();
      const asuntoBase = formulario.dataset.asunto || 'Consulta PropulsarIA';
      const lineas = [];
      datos.forEach((valor, clave) => {
        if (clave === 'website') return;
        lineas.push(`${clave}: ${valor}`);
      });

      if (err) err.hidden = true;
      if (btn) {
        btn.disabled = true;
        btn.dataset.label = btn.textContent;
        btn.textContent = 'Enviando…';
      }

      datos.append('_subject', `${asuntoBase} — ${nombre}`);
      datos.append('_template', 'table');
      datos.append('_captcha', 'false');
      if (correo) datos.append('_replyto', correo);

      try {
        const res = await fetch('https://formsubmit.co/ajax/contacto@propulsaria.com', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: datos
        });
        if (!res.ok) throw new Error('envio');
        formulario.reset();
        if (conf) {
          conf.hidden = false;
          conf.textContent = 'Recibimos tu mensaje. Te responderemos a la brevedad a tu correo.';
        }
      } catch (error) {
        const asunto = encodeURIComponent(`${asuntoBase} — ${nombre}`);
        const cuerpo = encodeURIComponent(lineas.join('\n'));
        window.location.href = `mailto:contacto@propulsaria.com?subject=${asunto}&body=${cuerpo}`;
        if (conf) {
          conf.hidden = false;
          conf.textContent = 'Se abrió tu correo para completar el envío. Si no ves nada, escríbenos a contacto@propulsaria.com o por WhatsApp.';
        }
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = btn.dataset.label || 'Enviar';
        }
      }
    });
  });

  /* ─────────── Reveal de título hero ─────────── */
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => setTimeout(() => hero.classList.add('cargado'), 60));
  }

  /* ─────────── Counters animados ─────────── */
  if (!reducirMovimiento) {
    const DURACION = 1800; // ms

    function animarCounter(el, desde, hasta, sufijo) {
      const inicio = performance.now();
      function paso(ahora) {
        const t    = Math.min((ahora - inicio) / DURACION, 1);
        /* Ease out cubic */
        const ease = 1 - Math.pow(1 - t, 3);
        const val  = Math.round(desde + (hasta - desde) * ease);
        el.textContent = val + sufijo;
        if (t < 1) requestAnimationFrame(paso);
      }
      requestAnimationFrame(paso);
    }

    document.querySelectorAll('[data-hasta]').forEach(el => {
      new IntersectionObserver(
        (entries, obs) => {
          if (!entries[0].isIntersecting) return;
          const hasta  = parseFloat(el.dataset.hasta)  || 0;
          const desde  = parseFloat(el.dataset.desde)  || 0;
          const sufijo = el.dataset.sufijo || '';
          animarCounter(el, desde, hasta, sufijo);
          obs.unobserve(el);
        },
        { threshold: 0.3 }
      ).observe(el);
    });
  }

  /* ─────────── Parallax sutil en blobs al hacer scroll ─────────── */
  if (!reducirMovimiento) {
    const blobs = document.querySelectorAll('.blob');
    if (blobs.length) {
      window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        blobs.forEach((blob, i) => {
          const vel = 0.06 + i * 0.02;
          blob.style.transform = `translateY(${sy * vel}px)`;
        });
      }, { passive: true });
    }
  }

  /* ─────────── Ripple en botones ─────────── */
  document.querySelectorAll('.boton').forEach(btn => {
    btn.addEventListener('click', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%; background:rgba(255,255,255,0.35);
        width:10px; height:10px;
        left:${x - 5}px; top:${y - 5}px;
        pointer-events:none;
        animation: rippleAnim 0.7s ease-out forwards;
      `;
      /* Inyectar keyframe dinámico si no existe */
      if (!document.getElementById('ripple-style')) {
        const s = document.createElement('style');
        s.id = 'ripple-style';
        s.textContent = `@keyframes rippleAnim {
          from { transform:scale(1); opacity:1; }
          to   { transform:scale(28); opacity:0; }
        }`;
        document.head.appendChild(s);
      }
      btn.style.position = 'relative';
      btn.style.overflow  = 'hidden';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* ─────────── Animación de pasos del proceso (proceso-steps) ─────────── */
  const pasos = document.querySelectorAll('.proceso-step');
  const flujoPasos = document.querySelectorAll('.flujo-fases__paso');
  const totalPasos = pasos.length || flujoPasos.length;

  if (totalPasos && !reducirMovimiento) {
    let pasoActual = 0;

    function activarPaso(i) {
      if (pasos.length) {
        pasos.forEach((p, j) => {
          p.classList.remove('activo', 'completado');
          if (j < i) p.classList.add('completado');
          if (j === i) p.classList.add('activo');
        });
      }
      flujoPasos.forEach((el, j) => {
        el.classList.toggle('activo', j === i);
      });
    }

    activarPaso(0);

    let intervalo = null;
    const raiz = (pasos[0] && pasos[0].closest('.seccion')) ||
      (flujoPasos[0] && flujoPasos[0].closest('.seccion')) ||
      flujoPasos[0];

    new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          if (!intervalo) {
            intervalo = setInterval(() => {
              pasoActual = (pasoActual + 1) % totalPasos;
              activarPaso(pasoActual);
            }, 2800);
          }
        } else {
          clearInterval(intervalo);
          intervalo = null;
        }
      },
      { threshold: 0.3 }
    ).observe(raiz);

    pasos.forEach((p, i) => {
      p.addEventListener('click', () => {
        pasoActual = i;
        activarPaso(i);
        clearInterval(intervalo);
        intervalo = setInterval(() => {
          pasoActual = (pasoActual + 1) % totalPasos;
          activarPaso(pasoActual);
        }, 2800);
      });
    });
  } else if (pasos.length) {
    pasos.forEach(p => p.classList.add('activo'));
    flujoPasos.forEach(el => el.classList.add('activo'));
  }
});
