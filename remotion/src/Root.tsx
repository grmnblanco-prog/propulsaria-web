import React from 'react';
import { Composition } from 'remotion';
import { HeroVideo } from './HeroVideo';
import { EnfoqueVideo, DURACION_ENFOQUE } from './EnfoqueVideo';
import { DiagnosticoVideo } from './DiagnosticoVideo';
import { EstadosIA, EstadosIAHook, DURACION_ESTADOS, DURACION_HOOK } from './EstadosIA';
import {
  BrochureComoAcompanamos,
  BrochurePrimerPaso,
  DURACION_COMO_ACOMPANAMOS,
  DURACION_PRIMER_PASO,
} from './BrochureCierre';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroVideo"
        component={HeroVideo}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="EnfoqueVideo"
        component={EnfoqueVideo}
        durationInFrames={DURACION_ENFOQUE}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="EnfoqueVertical"
        component={EnfoqueVideo}
        durationInFrames={DURACION_ENFOQUE}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DiagnosticoVideo"
        component={DiagnosticoVideo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DiagnosticoLinkedIn"
        component={DiagnosticoVideo}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="EstadosIALinkedIn"
        component={EstadosIA}
        durationInFrames={DURACION_ESTADOS}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="EstadosIAHook"
        component={EstadosIAHook}
        durationInFrames={DURACION_HOOK}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="BrochureComoAcompanamos"
        component={BrochureComoAcompanamos}
        durationInFrames={DURACION_COMO_ACOMPANAMOS}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BrochurePrimerPaso"
        component={BrochurePrimerPaso}
        durationInFrames={DURACION_PRIMER_PASO}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
