import { useEffect, useState } from 'react';

export function Hero() {
  const [showContent, setShowContent] = useState(false);
  const [bubbles, setBubbles] = useState<Array<{id: number; left: number; delay: number; duration: number; size: number}>>([]);
  const [jellies, setJellies] = useState<Array<{id: number; top: number; delay: number; duration: number; direction: number; size: number}>>([]);

  useEffect(() => {
    setShowContent(true);

    // Generate bubbles
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 12,
      size: 15 + Math.random() * 30,
    }));
    setBubbles(newBubbles);

    // Generate jellyfish
    const newJellies = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      top: 15 + Math.random() * 70,
      delay: Math.random() * 12,
      duration: 20 + Math.random() * 25,
      direction: Math.random() > 0.5 ? 1 : -1,
      size: 40 + Math.random() * 20,
    }));
    setJellies(newJellies);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-8" aria-labelledby="hero-title">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-[#063B4C] via-[#006D77] to-[#008C95]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#006D77]/30 via-transparent to-[#FF6B6B]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#20C9C9]/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[#006D77]/40 via-[#E91E63]/10 to-transparent" />
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute bottom-[-50px] animate-float"
            style={{
              left: `${bubble.left}%`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              opacity: 0.3 + Math.random() * 0.3,
            }}
          >
            <svg width={bubble.size} height={bubble.size} viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#63E6E2" strokeWidth="1.5" fill="none" opacity="0.6"/>
              <circle cx="10" cy="10" r="4" fill="#9DECE7" opacity="0.3"/>
            </svg>
          </div>
        ))}
      </div>

      {/* Swimming Jellyfish */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        {jellies.map((j) => (
          <div
            key={j.id}
            className="absolute animate-swim"
            style={{
              top: `${j.top}%`,
              left: j.direction > 0 ? '-80px' : 'calc(100% + 80px)',
              animationDelay: `${j.delay}s`,
              animationDuration: `${j.duration}s`,
              transform: j.direction > 0 ? 'scaleX(1)' : 'scaleX(-1)',
              opacity: 0.35 + Math.random() * 0.25,
              width: `${j.size}px`,
              height: `${j.size * 1.4}px`,
            }}
          >
            <svg width={j.size} height={j.size * 1.4} viewBox="0 0 50 70" fill="none">
              <path d="M25 5 C15 5 8 15 8 28 C8 38 15 45 25 45 C35 45 42 38 42 28 C42 15 35 5 25 5 Z"
                    fill="url(#jellyGradient)" opacity="0.85" stroke="#FF69B4" strokeWidth="1.5"/>
              <path d="M25 12 C20 12 17 18 17 28" stroke="#FFB6C1" strokeWidth="1" opacity="0.6" fill="none"/>
              <g stroke="#FF69B4" strokeWidth="1.5" fill="none" opacity="0.7">
                <path d="M12 28 Q10 40 12 55 Q14 65 10 70" strokeLinecap="round"/>
                <path d="M18 28 Q16 42 20 58 Q22 68 18 70" strokeLinecap="round"/>
                <path d="M25 28 Q23 43 27 60 Q29 70 25 70" strokeLinecap="round"/>
                <path d="M32 28 Q30 42 34 58 Q36 68 32 70" strokeLinecap="round"/>
                <path d="M38 28 Q36 40 38 55 Q40 65 38 70" strokeLinecap="round"/>
              </g>
              <g stroke="#FF1493" strokeWidth="1" fill="none" opacity="0.5">
                <path d="M20 45 Q22 50 19 55" strokeLinecap="round"/>
                <path d="M25 45 Q23 50 26 55" strokeLinecap="round"/>
                <path d="M30 45 Q28 50 31 55" strokeLinecap="round"/>
              </g>
              <circle cx="20" cy="18" r="3" fill="#FFB6C1" opacity="0.5"/>
              <circle cx="30" cy="20" r="2" fill="#FFB6C1" opacity="0.4"/>
              <circle cx="22" cy="30" r="1.5" fill="#FFB6C1" opacity="0.3"/>
              <defs>
                <radialGradient id="jellyGradient" cx="50%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#FFB6C1"/>
                  <stop offset="50%" stopColor="#FF69B4"/>
                  <stop offset="100%" stopColor="#C71585"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>

      {/* Light Rays */}
      <div className="absolute inset-0 z-5 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#20C9C9]/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-gradient-to-bl from-[#FF6B6B]/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-[#F6D365]/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl w-full text-center">
        {/* Mr. Krabs Character - Video */}
        <div className={`transition-all duration-1000 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block mb-6">
            <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto relative" aria-hidden="true">
              <video
                src="/mr-crabs.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                aria-label="Mr. Krabs animated character"
              />
            </div>

            {/* Money Bag */}
            <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-gradient-to-br from-[#F6D365] to-[#F4B942] rounded-full flex items-center justify-center text-[#063B4C] font-bold text-xl animate-bounce-slow shadow-lg" aria-hidden="true">
              $
            </div>
          </div>
        </div>

        {/* Patrick Character Image - Top Left */}
        <div className="absolute top-8 left-8 transition-all duration-1000 ease-out delay-100" style={{ opacity: showContent ? 1 : 0, transform: showContent ? 'translateY(0)' : 'translateY(-20px)' }}>
          <img
            src="/images/patrick-open-mouth.webp"
            alt="Patrick Star"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#FFD700] drop-shadow-[0_8px_20px_rgba(255,107,107,0.5)] animate-bounce-slow"
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <div className={`transition-all duration-1000 ease-out delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 id="hero-title" className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight select-none mb-4" style={{
            fontFamily: 'Fredoka, cursive',
            background: 'linear-gradient(135deg, #FFD700 0%, #F6D365 25%, #FF6B6B 50%, #E91E63 75%, #FFD700 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            animation: 'gradientShift 3s ease-in-out infinite'
          }}>
            Mr. Krabs
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-[#C8F7F2] mb-2 tracking-wide" style={{
            fontFamily: 'Fredoka, cursive',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            The Krusty Krab's Finest Fast Food
          </p>
          <p className="text-lg sm:text-xl text-[#9DECE7]/90 max-w-2xl mx-auto" style={{
            fontFamily: 'Nunito, sans-serif',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}>
            Dive into Bikini Bottom's most legendary bites — where every patty is flipped with
            <span className="text-[#FF6B6B] font-bold">love</span> and a pinch of
            <span className="text-[#F6D365] font-bold">profit</span>!
          </p>
        </div>

        {/* Tagline Badges */}
        <div className={`flex flex-wrap justify-center gap-3 mt-8 transition-all duration-1000 ease-out delay-400 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} aria-hidden="true">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#006D77]/80 to-[#008C95]/80 backdrop-blur-md border border-[#20C9C9]/30 rounded-full text-[#C8F7F2] text-sm font-medium shadow-[0_4px_15px_rgba(0,109,119,0.3)]">
            <span className="animate-bounce" aria-hidden="true">&#x1F980;</span> Est. 1999
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E91E63]/80 to-[#FF6B6B]/80 backdrop-blur-md border border-[#FF6B6B]/30 rounded-full text-white text-sm font-medium shadow-[0_4px_15px_rgba(233,30,99,0.3)]">
            <span className="animate-pulse" aria-hidden="true">&#x1F4B0;</span> Best Prices in IQD
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F6D365]/80 to-[#F4B942]/80 backdrop-blur-md border border-[#F6D365]/30 rounded-full text-[#063B4C] text-sm font-medium shadow-[0_4px_15px_rgba(246,211,101,0.3)]">
            <span className="animate-spin-slow" aria-hidden="true">&#x2B50;</span> Krabby Patty Approved
          </span>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out delay-600 ${showContent ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
          <div className="flex flex-col items-center gap-3 text-[#C8F7F2]/70 text-sm font-medium">
            <span className="whitespace-nowrap">Scroll to Explore Menu</span>
            <div className="w-1 h-12 bg-gradient-to-b from-[#20C9C9] to-transparent rounded-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/3 bg-[#FFD700] rounded-full animate-scroll-indicator" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corals/Plants at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-15 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-10 w-16 h-24 bg-gradient-to-t from-[#006D77] to-[#00A6A6] rounded-t-full opacity-60" />
        <div className="absolute bottom-0 left-20 w-12 h-20 bg-gradient-to-t from-[#008C95] to-[#20C9C9] rounded-t-full opacity-50" />
        <div className="absolute bottom-0 right-10 w-16 h-24 bg-gradient-to-t from-[#006D77] to-[#00A6A6] rounded-t-full opacity-60" />
        <div className="absolute bottom-0 right-20 w-12 h-20 bg-gradient-to-t from-[#008C95] to-[#20C9C9] rounded-t-full opacity-50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-28 bg-gradient-to-t from-[#E91E63]/30 to-[#FF6B6B]/30 rounded-t-full" />
      </div>
    </section>
  );
}