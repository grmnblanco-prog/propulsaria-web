import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface Node {
  x: number;
  y: number;
  radius: number;
  speed: number;
  phase: number;
}

export const HeroVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // Generar nodos fijos
  const nodes = useMemo<Node[]>(() => {
    const list: Node[] = [];
    const count = 45;
    for (let i = 0; i < count; i++) {
      list.push({
        x: (Math.sin(i * 137.5) * 0.5 + 0.5) * width,
        y: (Math.cos(i * 92.3) * 0.5 + 0.5) * height,
        radius: 3 + (i % 5) * 2,
        speed: 0.5 + (i % 3) * 0.3,
        phase: (i * Math.PI) / 8,
      });
    }
    return list;
  }, [width, height]);

  const progress = frame / durationInFrames;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0F172A',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Fondo radial azulado */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* SVG con conexiones y nodos */}
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Conexiones entre nodos cercanos */}
        {nodes.map((n1, i) =>
          nodes.slice(i + 1).map((n2, j) => {
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 280) {
              const alpha = (1 - dist / 280) * 0.4;
              return (
                <line
                  key={`${i}-${j}`}
                  x1={n1.x + Math.sin(frame * 0.03 + n1.phase) * 15}
                  y1={n1.y + Math.cos(frame * 0.03 + n1.phase) * 15}
                  x2={n2.x + Math.sin(frame * 0.03 + n2.phase) * 15}
                  y2={n2.y + Math.cos(frame * 0.03 + n2.phase) * 15}
                  stroke="url(#lineGrad)"
                  strokeWidth={1.5}
                  strokeOpacity={alpha}
                />
              );
            }
            return null;
          })
        )}

        {/* Nodos interactivos */}
        {nodes.map((n, i) => {
          const offsetX = Math.sin(frame * 0.03 + n.phase) * 15;
          const offsetY = Math.cos(frame * 0.03 + n.phase) * 15;
          const pulse = Math.sin(frame * 0.08 + n.phase) * 2;
          return (
            <g key={i}>
              <circle
                cx={n.x + offsetX}
                cy={n.y + offsetY}
                r={n.radius + pulse + 6}
                fill="#3B82F6"
                opacity={0.2}
              />
              <circle
                cx={n.x + offsetX}
                cy={n.y + offsetY}
                r={n.radius + pulse}
                fill="#60A5FA"
                filter="url(#glow)"
              />
            </g>
          );
        })}
      </svg>

      {/* Partículas de datos fluyendo */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 80,
          color: 'rgba(255,255,255,0.4)',
          fontSize: 20,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        PropulsarIA · Neural Intelligence Loop
      </div>
    </div>
  );
};
