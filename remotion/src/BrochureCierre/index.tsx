import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

const UI = "'Segoe UI', Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

const SERVICIOS = [
  { num: '01', titulo: 'Consultoría de implementación' },
  { num: '02', titulo: 'Agentes de procesos' },
  { num: '03', titulo: 'Agentes de productividad' },
  { num: '04', titulo: 'IA local' },
  { num: '05', titulo: 'Desarrollo a la medida' },
  { num: '06', titulo: 'Páginas web' },
  { num: '07', titulo: 'Automatizaciones' },
  { num: '08', titulo: 'Academia PropulsarIA' },
];

export const DURACION_COMO_ACOMPANAMOS = 180;
export const DURACION_PRIMER_PASO = 150;

export const BrochureComoAcompanamos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 16 } });
  const opacidad = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#F7F8FA', fontFamily: SERIF, color: '#334155' }}>
      <div
        style={{
          flexShrink: 0,
          padding: '36px 48px 28px',
          background:
            'radial-gradient(ellipse at 78% 30%, rgba(37,99,235,0.45), transparent 42%), linear-gradient(180deg, #080E1A 0%, #0F172A 100%)',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            padding: '10px 16px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <Img
            src={staticFile('logo-cropped.png')}
            alt="PropulsarIA"
            style={{ height: 52, width: 'auto', display: 'block' }}
          />
        </div>
        <p
          style={{
            margin: '22px 0 0',
            fontFamily: UI,
            color: '#93C5FD',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Cómo acompañamos
        </p>
        <h1
          style={{
            margin: '10px 0 0',
            color: '#fff',
            fontSize: 42,
            lineHeight: 1.12,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          Ocho maneras de seguir, según dónde estés hoy.
        </h1>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          padding: '28px 40px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          opacity: opacidad,
          transform: `translateY(${(1 - entrada) * 16}px)`,
        }}
      >
        {SERVICIOS.map((s, i) => {
          const card = spring({
            frame: frame - 4 - i * 3,
            fps,
            config: { damping: 15 },
          });
          return (
            <article
              key={s.num}
              style={{
                flex: 1,
                minHeight: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid #93C5FD',
                background: 'linear-gradient(180deg, rgba(37,99,235,0.08), #fff 50%)',
                borderRadius: 16,
                padding: '0 28px 0 24px',
                opacity: interpolate(card, [0, 1], [0, 1]),
                transform: `translateY(${(1 - card) * 12}px)`,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 6,
                  background: 'linear-gradient(180deg, #60A5FA, #2563EB)',
                }}
              />
              <span
                style={{
                  fontFamily: UI,
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#2563EB',
                  width: 48,
                  flexShrink: 0,
                }}
              >
                {s.num}
              </span>
              <h3
                style={{
                  margin: 0,
                  color: '#1E3A8A',
                  fontSize: 32,
                  lineHeight: 1.15,
                  fontWeight: 700,
                }}
              >
                {s.titulo}
              </h3>
            </article>
          );
        })}
      </div>

      <div
        style={{
          flexShrink: 0,
          padding: '18px 48px',
          background: '#0F172A',
          color: '#93C5FD',
          fontFamily: UI,
          fontSize: 16,
          fontWeight: 650,
          letterSpacing: '0.04em',
        }}
      >
        www.propulsaria.com
      </div>
    </AbsoluteFill>
  );
};

export const BrochurePrimerPaso: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 16 } });
  const opacidad = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#080E1A', fontFamily: SERIF, color: '#fff' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 80% 0%, rgba(37,99,235,0.45), transparent 46%), linear-gradient(180deg, #080E1A 0%, #0F172A 100%)',
        }}
      />
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <circle
            key={i}
            cx={(i * 151) % width}
            cy={(i * 97) % height}
            r={2 + (i % 3)}
            fill="#60A5FA"
            opacity={0.4 + Math.sin((frame + i * 12) / 18) * 0.25}
          />
        ))}
      </svg>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px 52px 88px',
          opacity: opacidad,
          transform: `translateY(${(1 - entrada) * 20}px)`,
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
            fontSize: 18,
          }}
        >
          El primer paso
        </p>
        <h1
          style={{
            margin: '16px 0 0',
            fontSize: 64,
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: '-0.03em',
          }}
        >
          Un diagnóstico gratuito.
        </h1>
        <p
          style={{
            margin: '22px 0 0',
            fontSize: 26,
            lineHeight: 1.4,
            color: 'rgba(219,234,254,0.92)',
          }}
        >
          No es un contrato. Es una conversación sobre procesos, datos, talento y gobernanza. Sin
          compromiso y sin maratones de reuniones.
        </p>
        <div
          style={{
            display: 'inline-block',
            alignSelf: 'flex-start',
            marginTop: 36,
            background: '#2563EB',
            color: '#fff',
            borderRadius: 999,
            padding: '16px 36px',
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 24,
          }}
        >
          Agendar conversación
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            marginTop: 48,
            background: 'rgba(255,255,255,0.96)',
            borderRadius: 20,
            padding: '28px 32px',
            color: '#0F172A',
          }}
        >
          <Img
            src={staticFile('qr-web.png')}
            alt="QR hacia www.propulsaria.com"
            style={{ width: 180, height: 180, background: '#fff', borderRadius: 10, flexShrink: 0 }}
          />
          <p style={{ margin: 0, fontSize: 22, lineHeight: 1.4, color: '#0F172A' }}>
            <strong style={{ display: 'block', fontSize: 26, color: '#1E3A8A', marginBottom: 8 }}>
              Escanea y entra
            </strong>
            www.propulsaria.com
            <br />
            contacto@propulsaria.com
            <br />
            +57 315 236 9917
          </p>
        </div>
      </div>
      <p
        style={{
          position: 'absolute',
          bottom: 36,
          left: 52,
          right: 52,
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: UI,
          color: 'rgba(147,197,253,0.9)',
          letterSpacing: '0.06em',
          fontSize: 16,
          fontWeight: 650,
          margin: 0,
        }}
      >
        <span>www.propulsaria.com · +57 315 236 9917</span>
        <span>El primer paso</span>
      </p>
    </AbsoluteFill>
  );
};
