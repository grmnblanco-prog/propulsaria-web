/* PropulsarIA — blog.js: índice de tarjetas, abrir artículo, barra de lectura */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const indice = document.getElementById('blog-indice');
  const articulos = [...document.querySelectorAll('.entrada-blog')];

  function mostrarIndice() {
    articulos.forEach(a => { a.hidden = true; });
    if (indice) indice.hidden = false;
    if (history.replaceState) history.replaceState(null, '', 'blog.html');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function abrirArticulo(id) {
    const articulo = document.getElementById(id);
    if (!articulo || !articulo.classList.contains('entrada-blog')) return;
    if (indice) indice.hidden = true;
    articulos.forEach(a => { a.hidden = a !== articulo; });
    articulo.hidden = false;
    articulo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.querySelectorAll('.blog-tarjeta[href^="#"]').forEach(card => {
    card.addEventListener('click', e => {
      const id = card.getAttribute('href').slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      if (history.pushState) history.pushState(null, '', '#' + id);
      abrirArticulo(id);
    });
  });

  document.querySelectorAll('[data-blog-volver]').forEach(btn => {
    btn.addEventListener('click', mostrarIndice);
  });

  const hash = (location.hash || '').slice(1);
  if (hash && document.getElementById(hash)) abrirArticulo(hash);

  window.addEventListener('hashchange', () => {
    const id = (location.hash || '').slice(1);
    if (id && document.getElementById(id)) abrirArticulo(id);
    else mostrarIndice();
  });

  const barra = document.createElement('div');
  barra.className = 'progreso-lectura';
  barra.setAttribute('aria-hidden', 'true');
  document.body.appendChild(barra);

  const actualizarBarra = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    barra.style.width = pct + '%';
  };
  actualizarBarra();
  window.addEventListener('scroll', actualizarBarra, { passive: true });
});
