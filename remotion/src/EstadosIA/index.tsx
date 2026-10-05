import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

type Nivel = {
  id: string;
  rol: string;
  titulo: string;
  texto: string;
};

const NIVELES: Nivel[] = [
  {
    id: '00',
    rol: 'Chat suelto',
    titulo: 'La IA responde.\nTú copias y pegas.',
    texto: 'ChatGPT o Claude en la ventana. Uso. Todavía no hay implementación.',
  },
  {
    id: '01',
    rol: 'Asistido',
    titulo: 'La IA hace la tarea.\nTú revisas casi todo.',
    texto: 'Un proceso, una persona, un agente. Deja de ser pregunta-respuesta y empieza a ejecutar.',
  },
  {
    id: '02',
    rol: 'En paralelo',
    titulo: 'Varias tareas a la vez.\nEl cuello de botella eres tú.',
    texto: 'Orquestas varios frentes. Sin reglas de verificación, no escalas: solo multiplicas trabajo a revisar.',
  },
  {
    id: '03',
    rol: 'Autonomía supervisada',
    titulo: 'La IA arranca sola.\nTú diriges el equipo.',
    texto: 'Procesos escritos, rutinas, excepciones. El humano ya no está en cada clic.',
  },
  {
    id: '04',
    rol: 'Operación nativa',
    titulo: 'Diriges por intención.\nMiras por excepción.',
    texto: 'Guardrails, métricas y costo. Del piloto a la operación. Eso sí es implementar.',
  },
];

const ESCENAS = [
  {
    tipo: 'portada' as const,
    kicker: 'Estados de adopción',
    titulo: 'Usar IA y capturar valor\nno son el mismo estado.',
    texto: 'Hay niveles. Casi nadie está donde cree.',
    nivel: -1,
  },
  ...NIVELES.map((n) => ({
    tipo: 'nivel' as const,
    kicker: `Estado ${n.id}`,
    titulo: n.titulo,
    texto: n.texto,
    nivel: NIVELES.indexOf(n),
    rol: n.rol,
  })),
  {
    tipo: 'insight' as const,
    kicker: 'El salto',
    titulo: 'No es más prompts.\nEs verificación y proceso.',
    texto: 'Sin mapa de sistemas, datos y quién lo sostiene, te quedas en el estado 00 con una herramienta más cara.',
    nivel: 4,
  },
  {
    tipo: 'cta' as const,
    kicker: 'El primer paso',
    titulo: 'Un diagnóstico gratuito.',
    texto: 'Para saber en qué estado está tu operación —no tu discurso.',
    nivel: 4,
  },
];

const FRAMES_PORTADA = 90;
const FRAMES_NIVEL = 84;
const FRAMES_CIERRE = 90;
const DURACION =
  FRAMES_PORTADA + NIVELES.length * FRAMES_NIVEL + FRAMES_CIERRE * 2;

function framesDeEscena(i: number) {
  if (i === 0) return FRAMES_PORTADA;
  if (i <= NIVELES.length) return FRAMES_NIVEL;
  return FRAMES_CIERRE;
}

function escenaEn(frame: number) {
  let acc = 0;
  for (let i = 0; i < ESCENAS.length; i++) {
    const d = framesDeEscena(i);
    if (frame < acc + d) return { i, local: frame - acc, d };
    acc += d;
  }
  const last = ESCENAS.length - 1;
  return { i: last, local: framesDeEscena(last) - 1, d: framesDeEscena(last) };
}

const Red: React.FC<{ nivel: number; width: number; height: number; frame: number }> = ({
  nivel, width, height, frame,
}) => {
  const counts = [1, 2, 6, 11, 18];
  const n = counts[Math.max(0, Math.min(4, nivel < 0 ? 0 : nivel))];
  const cx = width * 0.78;
  const cy = height * 0.42;
  const nodos = Array.from({ length: n }, (_, i) => {
    const ang = -Math.PI / 2 + (i * (Math.PI * 1.65)) / Math.max(n, 1);
    const r = 28 + (i % 5) * 22 + (i > 8 ? 36 : 0);
    return {
      x: cx + Math.cos(ang) * (n === 1 ? 0 : r),
      y: cy + Math.sin(ang) * (n === 1 ? 0 : r * 0.85),
    };
  });
  return (
    <svg width={width} height={height} style={{ position: 'absolute', inset: 0, opacity: 0.45, pointerEvents: 'none' }}>
      {nodos.map((a, i) =>
        nodos.slice(i + 1).map((b, j) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 110) return null;
          return (
            <line
              key={`${i}-${j}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="#60A5FA"
              strokeWidth={1}
              opacity={0.18 + Math.sin((frame + i * 8) / 20) * 0.08}
            />
          );
        })
      )}
      {nodos.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === 0 ? 7 : 3.5}
          fill={i === 0 ? '#60A5FA' : '#2563EB'}
          opacity={0.55 + Math.sin((frame + i * 10) / 16) * 0.2}
        />
      ))}
    </svg>
  );
};

export const EstadosIA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const { i, local, d } = escenaEn(frame);
  const escena = ESCENAS[i];
  const entrada = spring({ frame: local, fps, config: { damping: 14 } });
  const opacidad = interpolate(local, [0, 8, d - 10, d - 1], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const progreso = interpolate(frame, [0, DURACION - 6], [0, 100], { extrapolateRight: 'clamp' });
  const pad = Math.round(width * 0.07);
  const nivelActivo = escena.nivel;

  return (
    <AbsoluteFill style={{ backgroundColor: '#080E1A', fontFamily: "Georgia, 'Times New Roman', serif", color: '#fff' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 18% 0%, rgba(37,99,235,0.32), transparent 48%), radial-gradient(ellipse at 92% 78%, rgba(96,165,250,0.14), transparent 46%)',
      }} />
      <Red nivel={Math.max(0, nivelActivo)} width={width} height={width} frame={frame} />

      <div style={{ position: 'absolute', top: pad, left: pad, right: pad, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 99 }}>
        <div style={{ height: '100%', width: `${progreso}%`, background: 'linear-gradient(90deg,#2563EB,#93C5FD)', borderRadius: 99 }} />
      </div>

      <div style={{
        position: 'absolute', top: pad + 22, left: pad, right: pad,
        display: 'flex', gap: 10, fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
      }}>
        {NIVELES.map((n, idx) => {
          const on = idx === nivelActivo;
          const done = idx < nivelActivo;
          return (
            <div key={n.id} style={{ flex: 1, textAlign: 'center', opacity: on ? 1 : done ? 0.7 : 0.32 }}>
              <div style={{
                height: 6, borderRadius: 99, marginBottom: 8,
                background: on || done ? '#2563EB' : 'rgba(255,255,255,0.12)',
              }} />
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', color: on ? '#DBEAFE' : '#64748B' }}>{n.id}</span>
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'relative', zIndex: 1, height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: `0 ${pad}px`,
        transform: `translateY(${(1 - entrada) * 22}px)`,
        opacity: opacidad,
      }}>
        <p style={{
          fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
          color: '#93C5FD', letterSpacing: '0.16em', textTransform: 'uppercase',
          fontWeight: 700, fontSize: 17, marginBottom: 16,
        }}>
          {escena.kicker}{'rol' in escena && escena.rol ? ` · ${escena.rol}` : ''}
        </p>
        <h1 style={{
          fontSize: escena.tipo === 'portada' ? 52 : 46,
          lineHeight: 1.1, margin: 0, whiteSpace: 'pre-line',
          fontWeight: 700, letterSpacing: '-0.03em', maxWidth: '16ch',
        }}>{escena.titulo}</h1>
        <p style={{
          fontSize: 24, color: 'rgba(219,234,254,0.88)',
          maxWidth: '22em', marginTop: 22, lineHeight: 1.38,
        }}>{escena.texto}</p>
        {escena.tipo === 'cta' ? (
          <p style={{
            marginTop: 28, alignSelf: 'flex-start',
            fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
            background: '#2563EB', color: '#fff', fontWeight: 700, fontSize: 20,
            borderRadius: 999, padding: '14px 26px',
          }}>www.propulsaria.com</p>
        ) : null}
      </div>

      <p style={{
        position: 'absolute', bottom: 36, left: pad, right: pad,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
        color: 'rgba(147,197,253,0.9)', letterSpacing: '0.06em', fontSize: 15, fontWeight: 650,
      }}>
        <span>www.propulsaria.com</span>
        <span>{String(i + 1).padStart(2, '0')} / {String(ESCENAS.length).padStart(2, '0')}</span>
      </p>
    </AbsoluteFill>
  );
};

export const EstadosIAHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const pad = Math.round(width * 0.07);
  const fase = frame < 100 ? 0 : frame < 210 ? 1 : 2;
  const local = fase === 0 ? frame : fase === 1 ? frame - 100 : frame - 210;
  const entrada = spring({ frame: local, fps, config: { damping: 14 } });
  const titulos = [
    'La mayoría usa IA\nen el chat.',
    'Eso no es\nimplementar.',
    'Hay que saber\nen qué estado estás.',
  ];
  const textos = [
    'Copia, pega, prueba. Estado 00.',
    'Capturar valor pide proceso, datos y quién lo sostiene.',
    'Diagnóstico gratuito. www.propulsaria.com',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#080E1A', fontFamily: "Georgia, 'Times New Roman', serif", color: '#fff' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 20% 10%, rgba(37,99,235,0.35), transparent 50%)',
      }} />
      <Red nivel={fase === 0 ? 0 : fase === 1 ? 2 : 4} width={width} height={width} frame={frame} />
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: `0 ${pad}px`, opacity: interpolate(local, [0, 10, 85, 98], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        transform: `translateY(${(1 - entrada) * 18}px)`,
      }}>
        <p style={{
          fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
          color: '#93C5FD', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, fontSize: 16, marginBottom: 16,
        }}>Estados de adopción</p>
        <h1 style={{ fontSize: 50, lineHeight: 1.1, margin: 0, whiteSpace: 'pre-line', fontWeight: 700, letterSpacing: '-0.03em' }}>{titulos[fase]}</h1>
        <p style={{ fontSize: 24, color: 'rgba(219,234,254,0.88)', marginTop: 22, maxWidth: '20em' }}>{textos[fase]}</p>
      </div>
      <p style={{
        position: 'absolute', bottom: 36, left: pad,
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif", color: '#93C5FD', fontSize: 15, fontWeight: 650,
      }}>www.propulsaria.com</p>
    </AbsoluteFill>
  );
};

export const DURACION_ESTADOS = DURACION;
export const DURACION_HOOK = 300;
