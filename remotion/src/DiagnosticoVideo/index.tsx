import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const ESCENAS = [
  {
    kicker: 'PropulsarIA',
    titulo: 'Antes de la herramienta\nestá el diagnóstico.',
    texto: 'Implementar IA no empieza eligiendo un modelo.',
  },
  {
    kicker: 'La pregunta equivocada',
    titulo: '¿ChatGPT, Claude o Gemini?',
    texto: 'Esa pregunta llega demasiado pronto. Primero hay que entender el punto de partida.',
  },
  {
    kicker: '01  Digitalización',
    titulo: '¿Qué tan digital es\nla operación real?',
    texto: 'No el discurso. El papel, el Excel y lo que vive en la cabeza de una persona.',
  },
  {
    kicker: '02  Sistemas',
    titulo: '¿Qué usa el equipo\ncada mañana?',
    texto: 'CRM, ERP, correo y chats. El inventario de TI y el uso diario no siempre coinciden.',
  },
  {
    kicker: '03  Integración',
    titulo: '¿Esos sistemas\nconversan entre sí?',
    texto: 'Si la información se copia a mano, la IA hereda el mismo cuello de botella.',
  },
  {
    kicker: '04  Datos',
    titulo: '¿Dónde viven\ny qué tan limpios están?',
    texto: 'Sin una base confiable no hay contexto. Sin contexto, la IA improvisa.',
  },
  {
    kicker: '05  Procesos',
    titulo: '¿Qué se puede\nautomatizar de verdad?',
    texto: 'No lo más “innovador”. Lo repetitivo, medible y que hoy consume tiempo de decisión.',
  },
  {
    kicker: 'Cierre',
    titulo: 'Uso no es\nimplementación.',
    texto: 'El siguiente paso no es otra demo. Es diagnosticar.',
  },
];

export const DiagnosticoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const cuadrado = height / width >= 0.92;
  const duracionEscena = 75;
  const indice = Math.min(ESCENAS.length - 1, Math.floor(frame / duracionEscena));
  const local = frame % duracionEscena;
  const escena = ESCENAS[indice];
  const entrada = spring({ frame: local, fps, config: { damping: 14 } });
  const opacidad = interpolate(local, [0, 10, 62, 74], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const progreso = interpolate(frame, [0, ESCENAS.length * duracionEscena - 8], [0, 100], { extrapolateRight: 'clamp' });

  const pad = cuadrado ? Math.round(width * 0.074) : 80;
  const padTexto = cuadrado ? Math.round(width * 0.078) : 100;
  const kickerSize = cuadrado ? 18 : 22;
  const titleSize = cuadrado ? Math.round(width * 0.052) : 72;
  const bodySize = cuadrado ? 24 : 30;
  const pieSize = cuadrado ? 15 : 16;

  return (
    <AbsoluteFill style={{ backgroundColor: '#080E1A', fontFamily: "Georgia, 'Times New Roman', serif", color: '#fff' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 20% 0%, rgba(37,99,235,0.28), transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(96,165,250,0.12), transparent 45%)',
      }} />
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <circle
            key={i}
            cx={(i * 137) % width}
            cy={(i * 89) % height}
            r={2 + (i % 3)}
            fill="#60A5FA"
            opacity={0.4 + Math.sin((frame + i * 12) / 18) * 0.25}
          />
        ))}
      </svg>
      <div style={{ position: 'absolute', top: pad, left: pad, right: pad, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 99 }}>
        <div style={{ height: '100%', width: `${progreso}%`, background: 'linear-gradient(90deg,#2563EB,#93C5FD)', borderRadius: 99 }} />
      </div>
      <div style={{
        position: 'relative', zIndex: 1, height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: `0 ${padTexto}px`, transform: `translateY(${(1 - entrada) * 24}px)`, opacity: opacidad,
      }}>
        <p style={{
          fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
          color: '#93C5FD', letterSpacing: '0.18em', textTransform: 'uppercase',
          fontWeight: 700, fontSize: kickerSize, marginBottom: cuadrado ? 18 : 22,
        }}>{escena.kicker}</p>
        <h1 style={{ fontSize: titleSize, lineHeight: 1.08, margin: 0, whiteSpace: 'pre-line', fontWeight: 700, letterSpacing: '-0.03em' }}>{escena.titulo}</h1>
        <p style={{ fontSize: bodySize, color: 'rgba(219,234,254,0.86)', maxWidth: cuadrado ? '18em' : 980, marginTop: cuadrado ? 22 : 28, lineHeight: 1.4 }}>{escena.texto}</p>
      </div>
      <p style={{
        position: 'absolute', bottom: cuadrado ? 36 : 40, left: pad, right: pad,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
        color: 'rgba(147,197,253,0.85)', letterSpacing: '0.08em', fontSize: pieSize, fontWeight: 650,
      }}>
        <span>www.propulsaria.com</span>
        <span>{String(indice + 1).padStart(2, '0')} / {String(ESCENAS.length).padStart(2, '0')}</span>
      </p>
    </AbsoluteFill>
  );
};
