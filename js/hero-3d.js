/* ==========================================================================
   PropulsarIA — hero-3d.js v2
   Escenas Three.js premium: red neuronal, shaders de luz, superficies
   complejas, efectos de partículas avanzados. Diferente en cada página.
   Respeta prefers-reduced-motion. Pausa si sale del viewport.
   ========================================================================== */

(function () {
  'use strict';

  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('[data-escena]');
    if (!canvas) return;
    if (reducirMovimiento || typeof THREE === 'undefined') return;

    const tipo = canvas.getAttribute('data-escena');
    const escenas = {
      inicio:    escenaServicios,
      servicios: escenaInicio,
      metodologia: escenaInicio,
      proyectos: escenaProyectos,
      blog:      escenaBlog,
      contacto:  escenaContacto,
    };

    const crear = escenas[tipo];
    if (crear) {
      try {
        crear(canvas);
        const hero = canvas.closest('.hero');
        if (hero) hero.classList.add('con-3d');
      } catch (err) {
        canvas.hidden = true;
      }
    }
  });

  /* ─────────────── Utilidades compartidas ─────────────── */

  function baseEscena(canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

    const escena = new THREE.Scene();
    const ancho  = canvas.parentElement.clientWidth  || window.innerWidth;
    const alto   = canvas.parentElement.clientHeight || window.innerHeight;

    const camara = new THREE.PerspectiveCamera(55, ancho / alto, 0.1, 1000);
    camara.position.z = 35;

    renderer.setSize(ancho, alto);

    function ajustar() {
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      renderer.setSize(w, h);
      camara.aspect = w / h;
      camara.updateProjectionMatrix();
    }
    window.addEventListener('resize', ajustar);
    ajustar();

    return { renderer, escena, camara };
  }

  function pausarFueraDeVista(canvas, callback) {
    let visible = true;
    new IntersectionObserver(
      (entries) => entries.forEach(e => { visible = e.isIntersecting; }),
      { threshold: 0.01 }
    ).observe(canvas);
    return () => visible;
  }

  /* Crea un sistema de partículas rápido */
  function crearParticulasSistema(count, spread, color, size, opacity) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * spread.x;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread.y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread.z;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color, size, transparent: true, opacity,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return new THREE.Points(geo, mat);
  }

  /* ─────────────────────────────────────────────────────
     INICIO: Red neuronal 3D interactiva con nodos conectados
     ───────────────────────────────────────────────────── */

  function escenaInicio(canvas) {
    const { renderer, escena, camara } = baseEscena(canvas);
    camara.position.z = 45;

    const esMobil = window.innerWidth < 700;
    const N_NODOS = esMobil ? 60 : 120;

    /* --- Nodos --- */
    const nodosPos   = [];
    const nodosMesh  = [];
    const geoNodo    = new THREE.SphereGeometry(0.28, 8, 8);
    const matNodo    = new THREE.MeshBasicMaterial({
      color: 0x60A5FA, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < N_NODOS; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 70;
      const z = (Math.random() - 0.5) * 60;
      nodosPos.push(new THREE.Vector3(x, y, z));
      const m = new THREE.Mesh(geoNodo, matNodo.clone());
      m.position.set(x, y, z);
      /* velocidad de deriva */
      m.userData.vx = (Math.random() - 0.5) * 0.018;
      m.userData.vy = (Math.random() - 0.5) * 0.018;
      m.userData.vz = (Math.random() - 0.5) * 0.012;
      escena.add(m);
      nodosMesh.push(m);
    }

    /* --- Conexiones (líneas entre nodos cercanos) --- */
    const DIST_MAX = 22;
    const lineasGeo = new THREE.BufferGeometry();
    const posLineas = [];

    function reconstruirLineas() {
      posLineas.length = 0;
      for (let i = 0; i < N_NODOS; i++) {
        for (let j = i + 1; j < N_NODOS; j++) {
          const d = nodosMesh[i].position.distanceTo(nodosMesh[j].position);
          if (d < DIST_MAX) {
            posLineas.push(
              nodosMesh[i].position.x, nodosMesh[i].position.y, nodosMesh[i].position.z,
              nodosMesh[j].position.x, nodosMesh[j].position.y, nodosMesh[j].position.z,
            );
          }
        }
      }
      lineasGeo.setAttribute('position', new THREE.Float32BufferAttribute(posLineas, 3));
    }

    reconstruirLineas();
    const lineasMat = new THREE.LineBasicMaterial({
      color: 0x2563EB, transparent: true, opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const lineas = new THREE.LineSegments(lineasGeo, lineasMat);
    escena.add(lineas);

    /* --- Partículas de fondo: campo estelar --- */
    const estrellas = crearParticulasSistema(
      esMobil ? 1200 : 2800,
      { x: 140, y: 100, z: 100 },
      0x3B82F6, 0.3, 0.5
    );
    escena.add(estrellas);

    /* --- Segunda capa de polvo --- */
    const polvo = crearParticulasSistema(
      esMobil ? 400 : 900,
      { x: 120, y: 80, z: 60 },
      0x60A5FA, 0.7, 0.2
    );
    polvo.position.z = -25;
    escena.add(polvo);

    /* --- Interacción con mouse --- */
    let mx = 0, my = 0;
    window.addEventListener('mousemove', e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const esVisible = pausarFueraDeVista(canvas);
    let tick = 0;

    function animar() {
      requestAnimationFrame(animar);
      if (!esVisible()) return;
      tick += 0.005;

      /* Mover nodos */
      nodosMesh.forEach(m => {
        m.position.x += m.userData.vx;
        m.position.y += m.userData.vy;
        m.position.z += m.userData.vz;
        /* rebote en caja */
        if (Math.abs(m.position.x) > 52) m.userData.vx *= -1;
        if (Math.abs(m.position.y) > 37) m.userData.vy *= -1;
        if (Math.abs(m.position.z) > 32) m.userData.vz *= -1;
        /* pulso de opacidad por nodo */
        m.material.opacity = 0.6 + Math.sin(tick * 2 + m.position.x * 0.1) * 0.4;
      });

      /* Reconstruir líneas cada 3 frames para rendimiento */
      if (Math.round(tick * 200) % 3 === 0) reconstruirLineas();

      /* Parallax de cámara con el mouse */
      camara.position.x += (mx * 10 - camara.position.x) * 0.025;
      camara.position.y += (-my * 7 - camara.position.y) * 0.025;
      camara.lookAt(0, 0, 0);

      /* Rotación lenta de estrellas */
      estrellas.rotation.y += 0.0004;
      estrellas.rotation.x += 0.0001;
      polvo.rotation.y -= 0.0003;

      renderer.render(escena, camara);
    }
    animar();
  }

  /* ─────────────────────────────────────────────────────
     SERVICIOS: Torus Knot con doble geometría y luz orbital
     ───────────────────────────────────────────────────── */

  function escenaServicios(canvas) {
    const { renderer, escena, camara } = baseEscena(canvas);
    camara.position.z = 36;

    /* Luz ambiental tenue */
    escena.add(new THREE.AmbientLight(0x0F172A, 0.5));

    /* Luz puntual azul orbital */
    const luzPunto = new THREE.PointLight(0x3B82F6, 3, 80);
    luzPunto.position.set(20, 10, 20);
    escena.add(luzPunto);

    const luzPunto2 = new THREE.PointLight(0x60A5FA, 2, 60);
    luzPunto2.position.set(-20, -10, 15);
    escena.add(luzPunto2);

    /* Torus knot principal — wireframe luminoso */
    const geoNudo = new THREE.TorusKnotGeometry(10, 2.6, 80, 12, 2, 3);
    const matNudo = new THREE.MeshPhongMaterial({
      color: 0x2563EB,
      emissive: 0x1E40AF,
      emissiveIntensity: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const nudo = new THREE.Mesh(geoNudo, matNudo);
    escena.add(nudo);

    /* Torus knot interno más pequeño, rotación inversa */
    const geoNudo2 = new THREE.TorusKnotGeometry(5, 1.2, 64, 10, 3, 5);
    const matNudo2 = new THREE.MeshBasicMaterial({
      color: 0x60A5FA,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const nudo2 = new THREE.Mesh(geoNudo2, matNudo2);
    escena.add(nudo2);

    /* Partículas alrededor en esfera */
    const particulas = crearParticulasSistema(
      280, { x: 70, y: 70, z: 70 }, 0x3B82F6, 0.38, 0.55
    );
    escena.add(particulas);

    /* Nube de polvo luminoso */
    const polvo = crearParticulasSistema(
      160, { x: 50, y: 50, z: 50 }, 0x60A5FA, 1.0, 0.18
    );
    escena.add(polvo);

    const colorA = new THREE.Color(0x2563EB);
    const colorB = new THREE.Color(0x60A5FA);
    const colorC = new THREE.Color(0x1E40AF);
    let reloj = 0;
    const esVisible = pausarFueraDeVista(canvas);

    function animar() {
      requestAnimationFrame(animar);
      if (!esVisible()) return;
      reloj += 0.003;

      nudo.rotation.x  += 0.003;
      nudo.rotation.y  += 0.005;
      nudo2.rotation.x -= 0.004;
      nudo2.rotation.y -= 0.007;
      nudo2.rotation.z += 0.002;

      particulas.rotation.y -= 0.001;
      polvo.rotation.x += 0.0007;

      /* Ciclo de color del knot */
      const t = (Math.sin(reloj) + 1) / 2;
      matNudo.color.copy(colorA).lerp(colorB, t);
      matNudo.emissive.copy(colorC).lerp(colorA, t);

      /* Luz orbital */
      luzPunto.position.x  = Math.sin(reloj * 0.7) * 25;
      luzPunto.position.y  = Math.cos(reloj * 0.5) * 18;
      luzPunto2.position.x = Math.cos(reloj * 0.6) * 22;
      luzPunto2.position.y = Math.sin(reloj * 0.8) * 16;

      renderer.render(escena, camara);
    }
    animar();
  }

  /* ─────────────────────────────────────────────────────
     PROYECTOS: Icosaedro que "explota" + grid de datos
     ───────────────────────────────────────────────────── */

  function escenaProyectos(canvas) {
    const { renderer, escena, camara } = baseEscena(canvas);
    camara.position.z = 32;

    escena.add(new THREE.AmbientLight(0x0F172A, 0.3));
    const luz = new THREE.PointLight(0x3B82F6, 4, 80);
    luz.position.set(15, 15, 20);
    escena.add(luz);

    /* Icosaedro principal con aristas */
    const geoIco = new THREE.IcosahedronGeometry(10, 1);
    const matIco = new THREE.MeshPhongMaterial({
      color: 0x1E3A8A,
      emissive: 0x2563EB,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const ico = new THREE.Mesh(geoIco, matIco);
    escena.add(ico);

    /* Aristas luminosas */
    const matAristas = new THREE.LineBasicMaterial({
      color: 0x3B82F6, transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const aristas = new THREE.LineSegments(new THREE.EdgesGeometry(geoIco), matAristas);
    escena.add(aristas);

    /* Icosaedro exterior más grande, rotación inversa */
    const geoIco2 = new THREE.IcosahedronGeometry(16, 1);
    const aristas2 = new THREE.LineSegments(
      new THREE.EdgesGeometry(geoIco2),
      new THREE.LineBasicMaterial({
        color: 0x60A5FA, transparent: true, opacity: 0.2,
        blending: THREE.AdditiveBlending,
      })
    );
    escena.add(aristas2);

    /* Grid de partículas de datos */
    const FILAS = 12, COLS = 18;
    const geoGrid = new THREE.BufferGeometry();
    const posGrid = new Float32Array(FILAS * COLS * 3);
    for (let r = 0; r < FILAS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = (r * COLS + c) * 3;
        posGrid[idx]     = (c - COLS / 2) * 7 - 30;
        posGrid[idx + 1] = (r - FILAS / 2) * 7 - 20;
        posGrid[idx + 2] = -40;
      }
    }
    geoGrid.setAttribute('position', new THREE.BufferAttribute(posGrid, 3));
    const puntosGrid = new THREE.Points(geoGrid, new THREE.PointsMaterial({
      color: 0x2563EB, size: 0.5, transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending,
    }));
    escena.add(puntosGrid);

    /* Partículas de fondo */
    const estrellas = crearParticulasSistema(600, { x: 100, y: 70, z: 50 }, 0x64748B, 0.3, 0.35);
    escena.add(estrellas);

    let tick = 0;
    const esVisible = pausarFueraDeVista(canvas);

    function animar() {
      requestAnimationFrame(animar);
      if (!esVisible()) return;
      tick += 0.004;

      ico.rotation.y   += 0.004;
      ico.rotation.x   += 0.003;
      aristas.rotation.copy(ico.rotation);
      aristas2.rotation.y -= 0.002;
      aristas2.rotation.x -= 0.0015;

      /* Pulso de opacidad en aristas */
      matAristas.opacity = 0.6 + Math.sin(tick * 2) * 0.3;

      /* Luz orbital */
      luz.position.x = Math.sin(tick * 0.8) * 20;
      luz.position.y = Math.cos(tick * 0.6) * 14;

      puntosGrid.rotation.z += 0.0005;
      estrellas.rotation.y  += 0.0003;

      renderer.render(escena, camara);
    }
    animar();
  }

  /* ─────────────────────────────────────────────────────
     BLOG: Superficie de agua con efecto luminoso
     ───────────────────────────────────────────────────── */

  function escenaBlog(canvas) {
    const { renderer, escena, camara } = baseEscena(canvas);
    camara.position.set(0, 22, 38);
    camara.lookAt(0, 0, 0);

    escena.add(new THREE.AmbientLight(0x0F172A, 0.2));
    const luzDireccional = new THREE.DirectionalLight(0x3B82F6, 2.5);
    luzDireccional.position.set(10, 20, 10);
    escena.add(luzDireccional);

    const luzPunto = new THREE.PointLight(0x60A5FA, 2, 80);
    luzPunto.position.set(-15, 10, 5);
    escena.add(luzPunto);

    /* Malla de onda principal */
    const segs  = window.innerWidth < 700 ? 50 : 90;
    const geoOnda = new THREE.PlaneGeometry(110, 75, segs, segs);
    const matOnda  = new THREE.MeshPhongMaterial({
      color: 0x1E3A8A,
      emissive: 0x2563EB,
      emissiveIntensity: 0.25,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const onda = new THREE.Mesh(geoOnda, matOnda);
    onda.rotation.x = -Math.PI / 2.4;
    escena.add(onda);

    /* Segunda malla desplazada para profundidad */
    const geoOnda2 = new THREE.PlaneGeometry(110, 75, Math.floor(segs * 0.6), Math.floor(segs * 0.6));
    const matOnda2 = new THREE.MeshBasicMaterial({
      color: 0x60A5FA,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const onda2 = new THREE.Mesh(geoOnda2, matOnda2);
    onda2.rotation.x = -Math.PI / 2.4;
    onda2.position.z = -3;
    escena.add(onda2);

    /* Partículas flotando sobre la superficie */
    const particulas = crearParticulasSistema(
      600, { x: 100, y: 20, z: 70 }, 0x60A5FA, 0.5, 0.4
    );
    particulas.position.y = 10;
    escena.add(particulas);

    const posOrig1 = geoOnda.attributes.position.array.slice();
    const posOrig2 = geoOnda2.attributes.position.array.slice();

    let tick = 0;
    const esVisible = pausarFueraDeVista(canvas);
    let colorT = 0;
    const colorA = new THREE.Color(0x1E3A8A);
    const colorB = new THREE.Color(0x2563EB);

    function animar() {
      requestAnimationFrame(animar);
      if (!esVisible()) return;
      tick += 0.01;
      colorT += 0.003;

      /* Animar vértices de onda */
      const pos1 = geoOnda.attributes.position;
      for (let i = 0; i < pos1.count; i++) {
        const x = posOrig1[i * 3];
        const y = posOrig1[i * 3 + 1];
        const z = Math.sin(x * 0.1 + tick) * 2.8 +
                  Math.cos(y * 0.13 + tick * 0.85) * 2.2 +
                  Math.sin((x + y) * 0.08 + tick * 1.2) * 1.5;
        pos1.setZ(i, z);
      }
      pos1.needsUpdate = true;

      const pos2 = geoOnda2.attributes.position;
      for (let i = 0; i < pos2.count; i++) {
        const x = posOrig2[i * 3];
        const y = posOrig2[i * 3 + 1];
        const z = Math.sin(x * 0.09 + tick * 0.9 + 1.5) * 2.2 +
                  Math.cos(y * 0.12 + tick * 0.7) * 1.8;
        pos2.setZ(i, z);
      }
      pos2.needsUpdate = true;

      onda.rotation.z  = Math.sin(tick * 0.12) * 0.04;
      onda2.rotation.z = Math.cos(tick * 0.1)  * 0.03;

      /* Color cambiante */
      const mix = (Math.sin(colorT) + 1) / 2;
      matOnda.color.copy(colorA).lerp(colorB, mix);
      matOnda.emissive.copy(colorA).lerp(colorB, mix * 0.5);

      /* Luz orbital lenta */
      luzPunto.position.x = Math.sin(tick * 0.4) * 25;
      luzPunto.position.z = Math.cos(tick * 0.3) * 20;

      particulas.rotation.y += 0.0008;

      renderer.render(escena, camara);
    }
    animar();
  }

  /* ─────────────────────────────────────────────────────
     CONTACTO: Holograma esférico con órbitas y escaneo
     ───────────────────────────────────────────────────── */

  function escenaContacto(canvas) {
    const { renderer, escena, camara } = baseEscena(canvas);
    camara.position.z = 32;

    escena.add(new THREE.AmbientLight(0x0F172A, 0.3));
    const luz = new THREE.PointLight(0x3B82F6, 3.5, 80);
    luz.position.set(0, 20, 20);
    escena.add(luz);

    const grupo = new THREE.Group();

    /* Esfera principal — wireframe holograma */
    const geoEsf = new THREE.SphereGeometry(12, 32, 24);
    const matEsf = new THREE.MeshBasicMaterial({
      color: 0x2563EB, wireframe: true, transparent: true, opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const esfera = new THREE.Mesh(geoEsf, matEsf);
    grupo.add(esfera);

    /* Esfera interior más pequeña */
    const geoEsf2 = new THREE.SphereGeometry(6, 20, 16);
    const matEsf2 = new THREE.MeshBasicMaterial({
      color: 0x60A5FA, wireframe: true, transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    grupo.add(new THREE.Mesh(geoEsf2, matEsf2));

    /* Anillo 1 */
    const anillo1 = new THREE.Mesh(
      new THREE.TorusGeometry(14.2, 0.22, 8, 80),
      new THREE.MeshBasicMaterial({
        color: 0x60A5FA, transparent: true, opacity: 0.55,
        blending: THREE.AdditiveBlending,
      })
    );
    grupo.add(anillo1);

    const anillo2 = new THREE.Mesh(
      new THREE.TorusGeometry(17.2, 0.16, 8, 80),
      new THREE.MeshBasicMaterial({
        color: 0x3B82F6, transparent: true, opacity: 0.3,
        blending: THREE.AdditiveBlending,
      })
    );
    anillo2.rotation.x = Math.PI / 4;
    grupo.add(anillo2);

    const anillo3 = new THREE.Mesh(
      new THREE.TorusGeometry(19.2, 0.14, 8, 80),
      new THREE.MeshBasicMaterial({
        color: 0x93C5FD, transparent: true, opacity: 0.2,
        blending: THREE.AdditiveBlending,
      })
    );
    anillo3.rotation.y = Math.PI / 3;
    grupo.add(anillo3);

    /* Partículas en órbita */
    const N_ORB = 120;
    const geoPart = new THREE.BufferGeometry();
    const posPart = new Float32Array(N_ORB * 3);
    const angulos = Array.from({ length: N_ORB }, (_, i) => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.random() * Math.PI,
      r: 13 + Math.random() * 8,
      vel: (Math.random() - 0.5) * 0.008,
    }));
    geoPart.setAttribute('position', new THREE.BufferAttribute(posPart, 3));
    const puntos = new THREE.Points(geoPart, new THREE.PointsMaterial({
      color: 0x60A5FA, size: 0.55, transparent: true, opacity: 0.7,
      blending: THREE.AdditiveBlending,
    }));
    escena.add(puntos);

    escena.add(grupo);

    /* Fondo de partículas */
    const fondo = crearParticulasSistema(800, { x: 100, y: 80, z: 60 }, 0x1E40AF, 0.3, 0.3);
    escena.add(fondo);

    let tick = 0;
    const esVisible = pausarFueraDeVista(canvas);

    function animar() {
      requestAnimationFrame(animar);
      if (!esVisible()) return;
      tick += 0.018;

      grupo.rotation.y  += 0.003;
      grupo.rotation.x   = Math.sin(tick * 0.25) * 0.18;

      /* Pulso de anillos */
      const p1 = 1 + Math.sin(tick * 1.3) * 0.05;
      const p2 = 1 + Math.sin(tick * 1.1 + 1) * 0.04;
      anillo1.scale.set(p1, p1, 1);
      anillo2.scale.set(p2, p2, 1);

      /* Partículas en órbita */
      angulos.forEach((a, i) => {
        a.theta += a.vel;
        const x = a.r * Math.sin(a.phi) * Math.cos(a.theta);
        const y = a.r * Math.cos(a.phi);
        const z = a.r * Math.sin(a.phi) * Math.sin(a.theta);
        posPart[i * 3]     = x;
        posPart[i * 3 + 1] = y;
        posPart[i * 3 + 2] = z;
      });
      geoPart.attributes.position.needsUpdate = true;

      /* Opacidad pulsante */
      matEsf.opacity  = 0.18 + Math.sin(tick * 0.8) * 0.12;
      matEsf2.opacity = 0.35 + Math.sin(tick * 1.2) * 0.2;

      /* Luz orbital */
      luz.position.x = Math.sin(tick * 0.5) * 20;
      luz.position.z = Math.cos(tick * 0.4) * 18;

      fondo.rotation.y += 0.0003;

      renderer.render(escena, camara);
    }
    animar();
  }

})();
