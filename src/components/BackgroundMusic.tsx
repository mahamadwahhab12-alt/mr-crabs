import { useEffect, useRef, useState } from 'react';

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio('/audio/spongebob-theme.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const handleUserInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Auto-play blocked
          });
      }
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      audioRef.current?.pause();
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Visible music control button - helps with autoplay policies
  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-teal-600 to-cyan-500 text-white flex items-center justify-center shadow-[0_8px_30px_rgba(0,109,119,0.4)] hover:scale-110 hover:shadow-[0_12px_40px_rgba(0,109,119,0.5)] transition-all duration-300 animate-pulse-slow"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      aria-pressed={isPlaying}
    >
      {isPlaying ? (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z"/>
        </svg>
      )}
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-cyan-100/90 whitespace-nowrap font-medium pointer-events-none">
        {isPlaying ? 'Playing ♪' : 'Play Music'}
      </span>
    </button>
  );
}