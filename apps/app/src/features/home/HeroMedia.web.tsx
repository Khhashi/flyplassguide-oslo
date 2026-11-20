import { useState } from 'react';

const VIDEO_SRC = '/hero/terminal.mp4';
const POSTER_SRC = '/hero/terminal.jpg';

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Video i bakgrunnen på nettsiden: uten lyd, i loop, med stillbilde mens den laster.
 * Viser bare stillbildet hvis brukeren har bedt om redusert bevegelse.
 */
export function HeroMedia() {
  // Nettsiden bygges som én side uten serverrendering, så vi kan lese innstillingen med en gang.
  const [reduceMotion] = useState(prefersReducedMotion);

  const style = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  } as const;

  if (reduceMotion) {
    return <img src={POSTER_SRC} alt="" aria-hidden style={style} />;
  }

  return (
    <video
      src={VIDEO_SRC}
      poster={POSTER_SRC}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      style={style}
    />
  );
}
