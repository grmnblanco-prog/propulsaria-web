import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const UI = "'Segoe UI', Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

const FASES = [
  {
    num: '01',
    titulo: 'Diagnóstico',
    desc: 'Sistemas, datos, procesos candidatos y quién en el equipo puede sostenerlo.',
    color: '#2563EB',
  },
  {
    num: '02',
    titulo: 'Hoja de ruta',
    desc: 'Se construye a medida sobre lo diagnosticado, sin casarnos con un solo proveedor.',
    color: '#3B82F6',
  },
  {
    num: '03',
    titulo: 'Quick wins',
    desc: 'Correo, calendario, reuniones e informes. En semanas, no en meses.',
    color: '#60A5FA',
  },
  {
    num: '04',
    titulo: 'Escalado',
    desc: 'Del piloto a la operación, con métricas y un equipo que ya no depende del consultor.',
    color: '#93C5FD',
  },
];

const FRAMES_FASE = 110;
export const DURACION_ENFOQUE = 450;

export const EnfoqueVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const vertical = height / width >= 1.2;
  const faseIndex = Math.min(3, Math.floor(frame / FRAMES_FASE));
  const local = frame % FRAMES_FASE;
  const faseActual = FASES[faseIndex];
  const entrada = spring({ frame: local, fps, config: { damping: 14 } });
  const progreso = interpolate(frame, [0, DURACION_ENFOQUE - 10], [0, 100], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#080E1A',
        color: '#fff',
        fontFamily: SERIF,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(37,99,235,0.32), transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(96,165,250,0.12), transparent 45%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: vertical ? 48 : 56,
          left: vertical ? 48 : 100,
          right: vertical ? 48 : 100,
          height: 4,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 99,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progreso}%`,
            background: 'linear-gradient(90deg, #2563EB, #93C5FD)',
            borderRadius: 99,
          }}
        />
      </div>

      {vertical ? (
        <VerticalLayout
          faseIndex={faseIndex}
          faseActual={faseActual}
          entrada={entrada}
        />
      ) : (
        <HorizontalLayout
          faseIndex={faseIndex}
          faseActual={faseActual}
          entrada={entrada}
        />
      )}
    </AbsoluteFill>
  );
};

const HorizontalLayout: React.FC<{
  faseIndex: number;
  faseActual: (typeof FASES)[number];
  entrada: number;
}> = ({ faseIndex, faseActual, entrada }) => (
  <>
    <div
      style={{
        position: 'absolute',
        top: 92,
        left: 100,
        right: 100,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {FASES.map((f, i) => {
        const activa = i === faseIndex;
        return (
          <div
            key={f.num}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              opacity: activa ? 1 : 0.4,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                backgroundColor: activa ? f.color : 'transparent',
                border: `2px solid ${f.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: UI,
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {f.num}
            </div>
            <span style={{ fontFamily: UI, fontSize: 20, fontWeight: 600 }}>{f.titulo}</span>
          </div>
        );
      })}
    </div>

    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 80px',
        opacity: interpolate(entrada, [0, 1], [0.35, 1]),
        transform: `translateY(${(1 - entrada) * 18}px)`,
      }}
    >
      <p
        style={{
          fontFamily: UI,
          fontSize: 22,
          fontWeight: 700,
          color: faseActual.color,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          margin: '0 0 16px',
        }}
      >
        {faseActual.num}
      </p>
      <h1 style={{ fontSize: 64, margin: '0 0 22px', fontWeight: 700, letterSpacing: '-0.03em' }}>
        {faseActual.titulo}
      </h1>
      <p
        style={{
          fontSize: 28,
          color: 'rgba(219,234,254,0.88)',
          lineHeight: 1.4,
          margin: 0,
          maxWidth: 860,
          textAlign: 'center',
        }}
      >
        {faseActual.desc}
      </p>
    </div>

    <p
      style={{
        position: 'absolute',
        bottom: 44,
        left: 100,
        right: 100,
        margin: 0,
        fontFamily: UI,
        fontSize: 16,
        fontWeight: 650,
        color: 'rgba(147,197,253,0.85)',
        letterSpacing: '0.06em',
      }}
    >
      www.propulsaria.com
    </p>
  </>
);

const VerticalLayout: React.FC<{
  faseIndex: number;
  faseActual: (typeof FASES)[number];
  entrada: number;
}> = ({ faseIndex, faseActual, entrada }) => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '80px 48px 40px',
    }}
  >
    <p
      style={{
        margin: 0,
        fontFamily: UI,
        color: '#93C5FD',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: 16,
      }}
    >
      El proceso
    </p>
    <h1
      style={{
        margin: '12px 0 0',
        fontSize: 40,
        lineHeight: 1.12,
        fontWeight: 700,
        letterSpacing: '-0.02em',
      }}
    >
      No empezamos por la herramienta.
    </h1>
    <p
      style={{
        margin: '14px 0 0',
        fontSize: 22,
        lineHeight: 1.35,
        color: 'rgba(219,234,254,0.86)',
      }}
    >
      Primero el punto de partida. Después el camino, una ganancia visible y el escalado.
    </p>

    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        marginTop: 36,
      }}
    >
      {FASES.map((f, i) => {
        const activa = i === faseIndex;
        return (
          <article
            key={f.num}
            style={{
              flex: activa ? 1.7 : 0.7,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: activa ? '28px 28px 28px 32px' : '0 28px 0 32px',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 18,
              border: `1px solid ${activa ? f.color : 'rgba(147,197,253,0.28)'}`,
              background: activa ? 'rgba(37,99,235,0.18)' : 'rgba(255,255,255,0.04)',
              opacity: activa ? interpolate(entrada, [0, 1], [0.7, 1]) : 0.45,
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 6,
                background: activa ? f.color : 'rgba(147,197,253,0.35)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <span
                style={{
                  fontFamily: UI,
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: activa ? f.color : '#93C5FD',
                  width: 48,
                  flexShrink: 0,
                }}
              >
                {f.num}
              </span>
              <h2
                style={{
                  margin: 0,
                  fontSize: activa ? 36 : 28,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                {f.titulo}
              </h2>
            </div>
            {activa ? (
              <p
                style={{
                  margin: '14px 0 0 66px',
                  fontSize: 24,
                  lineHeight: 1.38,
                  color: 'rgba(219,234,254,0.9)',
                }}
              >
                {faseActual.desc}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>

    <p
      style={{
        flexShrink: 0,
        margin: '22px 0 0',
        fontFamily: UI,
        fontSize: 16,
        fontWeight: 650,
        color: 'rgba(147,197,253,0.85)',
        letterSpacing: '0.06em',
      }}
    >
      www.propulsaria.com
    </p>
  </div>
);
