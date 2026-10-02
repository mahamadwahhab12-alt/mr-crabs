import { useState, useEffect } from 'react';

const navCategories = ['Burgers', 'Rizo', 'Sandwich', 'Kentucky', 'Sides', 'Special'];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Burgers');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    navCategories.forEach((cat) => {
      const el = document.getElementById(cat.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToCategory = (category: string) => {
    const el = document.getElementById(category.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-gradient-to-r from-[#063B4C] via-[#006D77] to-[#E91E63] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative">
            <span className="relative z-10 text-[22px] sm:text-[28px] font-bold tracking-tight text-white select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{ fontFamily: 'Fredoka, cursive', textShadow: '2px 2px 0 #E91E63, 4px 4px 0 #006D77' }}>
              Mr. Krabs
            </span>
            <span className="absolute -top-1 -right-2 text-[18px] animate-bounce" aria-hidden="true">&#x1F980;</span>
          </div>
          <span className="text-[20px] sm:text-[24px] text-[#FFD700] select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" aria-hidden="true">★</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 text-[16px] sm:text-[18px] font-medium">
          {navCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => scrollToCategory(category)}
              className={`relative px-3 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#E91E63] to-[#FF6B6B] text-white shadow-[0_4px_15px_rgba(233,30,99,0.4)]'
                  : 'text-white/90 hover:text-[#FFD700]'
              }`}
              aria-current={activeCategory === category ? 'page' : undefined}
            >
              {category}
              {activeCategory === category && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[4px] w-10 h-10 p-0 bg-transparent border-none cursor-pointer"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-menu"
        >
          <span
            className={`w-6 h-[3px] bg-white rounded-full transition-all duration-300 origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[3px] bg-white rounded-full transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[3px] bg-white rounded-full transition-all duration-300 origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-gradient-to-br from-[#063B4C] via-[#006D77] to-[#1A1A2E] flex flex-col items-center justify-center px-8 gap-6 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
        onClick={closeMobileMenu}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col gap-4 w-full max-w-md">
          {navCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => scrollToCategory(category)}
              className={`w-full text-center py-4 px-6 rounded-2xl text-[22px] font-bold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#E91E63] to-[#FF6B6B] text-white shadow-[0_8px_25px_rgba(233,30,99,0.5)] transform scale-105'
                  : 'bg-white/10 backdrop-blur-sm text-white/90 hover:bg-white/20 hover:text-[#FFD700] border border-white/10'
              }`}
              aria-current={activeCategory === category ? 'page' : undefined}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          onClick={closeMobileMenu}
          className="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-[#E91E63] to-[#FF6B6B] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </>
  );
}