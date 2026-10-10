import { useMenu } from '../context/MenuContext';
import { formatPrice } from '../data/menuData';

interface MenuItemCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  index: number;
}

function MenuItemCard({ item, index }: MenuItemCardProps) {
  const animationDelay = index * 80 + 'ms';
  const titleStyle = { fontFamily: 'Fredoka, cursive' };

  return (
    <article
      className="group relative bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/15 hover:border-teal-400/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 animate-fade-in-up"
      style={{ animationDelay }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-teal-700/50 to-teal-600/50">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-700 to-teal-600">
          <div className="text-center p-4">
            <div className="text-4xl sm:text-5xl mb-2" aria-hidden="true">Burger</div>
            <p className="text-white/70 font-medium">{item.name}</p>
          </div>
        </div>

        <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-600 to-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-[0_4px_15px_rgba(233,30,99,0.4)] z-10">
          {formatPrice(item.price)}
        </div>

        <button
          className="absolute top-3 left-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-red-500 hover:bg-white/30 transition-all duration-300"
          aria-label={"Add " + item.name + " to favorites"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300" style={titleStyle}>
          {item.name}
        </h3>

        <button
          className="w-full mt-4 py-3 bg-gradient-to-r from-teal-700 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-505 hover:shadow-[0_8px_25px_rgba(0,139,149,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
          aria-label={"Add " + item.name + " to cart for " + formatPrice(item.price)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Add to Order
        </button>
      </div>
    </article>
  );
}

interface MenuCategoryProps {
  category: {
    id: string;
    name: string;
    icon: string;
    items: Array<{
      id: string;
      name: string;
      price: number;
      image: string;
    }>;
  };
}

export function MenuCategory({ category }: MenuCategoryProps) {
  const gradientTextStyle = {
    fontFamily: 'Fredoka, cursive',
    background: 'linear-gradient(135deg, #FFD700 0%, #F6D365 50%, #FF6B6B 100%)',
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    animation: 'gradientShift 3s ease-in-out infinite'
  };

  const fredokaStyle = { fontFamily: 'Fredoka, cursive' };

  return (
    <section
      id={category.id.toLowerCase()}
      className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 relative"
      aria-labelledby={category.id + "-title"}
    >
      {/* Mr. Crabs Image - Top Right of Category */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10 transition-all duration-1000 ease-out opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <img
          src="/images/mr-crabs-character.jpg"
          alt="Mr. Crabs"
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-3 border-[#FFD700] drop-shadow-[0_8px_20px_rgba(233,30,99,0.5)] hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto mb-12 text-center relative">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-700/60 to-teal-600/60 backdrop-blur-md border border-cyan-400/30 rounded-full mb-6 shadow-[0_8px_30px_rgba(0,109,119,0.2)]">
          <span className="text-3xl sm:text-4xl animate-bounce-slow" aria-hidden="true">{category.icon}</span>
          <h2 id={category.id + "-title"} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white" style={gradientTextStyle}>
            {category.name}
          </h2>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
          <div className="w-3 h-3 bg-gradient-to-r from-pink-600 to-red-500 rounded-full animate-pulse" />
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list" aria-label={category.name + " menu items"}>
          {category.items.map((item, index) => (
            <MenuItemCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-center">
          <div className="px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <p className="text-2xl sm:text-3xl font-bold text-yellow-400" style={fredokaStyle}>{category.items.length}</p>
            <p className="text-cyan-100/70 text-sm mt-1">Delicious Items</p>
          </div>
          <div className="px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <p className="text-2xl sm:text-3xl font-bold text-yellow-400" style={fredokaStyle}>
              {formatPrice(Math.min(...category.items.map(i => i.price)))}
            </p>
            <p className="text-cyan-100/70 text-sm mt-1">Starting Price</p>
          </div>
          <div className="px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <p className="text-2xl sm:text-3xl font-bold text-yellow-400" style={fredokaStyle}>
              {formatPrice(Math.max(...category.items.map(i => i.price)))}
            </p>
            <p className="text-cyan-100/70 text-sm mt-1">Premium Choice</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-24 h-16 bg-gradient-to-t from-teal-700/30 to-transparent rounded-tr-full" />
        <div className="absolute bottom-0 right-1/4 w-24 h-16 bg-gradient-to-t from-teal-700/30 to-transparent rounded-tl-full" />
      </div>
    </section>
  );
}

export function Menu() {
  const { menuData, loading, error } = useMenu();
  const fredokaStyle = { fontFamily: 'Fredoka, cursive' };
  const nunitoStyle = { fontFamily: 'Nunito, sans-serif' };

  if (loading) {
    return (
      <main className="relative min-h-screen pt-20 flex items-center justify-center" role="main" aria-label="Restaurant Menu">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-[#063B4C] via-[#006D77] to-[#073B4C]" />
          <div className="absolute inset-0 bg-pattern opacity-50" />
        </div>
        <div className="relative z-10 text-center">
          <div className="text-4xl sm:text-5xl animate-bounce-slow mb-4" aria-hidden="true">🦀</div>
          <p className="text-xl text-cyan-100/90" style={nunitoStyle}>Loading menu...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="relative min-h-screen pt-20 flex items-center justify-center" role="main" aria-label="Restaurant Menu">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-[#063B4C] via-[#006D77] to-[#073B4C]" />
          <div className="absolute inset-0 bg-pattern opacity-50" />
        </div>
        <div className="relative z-10 text-center p-8">
          <div className="text-4xl sm:text-5xl mb-4" aria-hidden="true">😔</div>
          <h2 className="text-2xl font-bold text-white mb-2" style={fredokaStyle}>Failed to Load Menu</h2>
          <p className="text-cyan-100/70 mb-6" style={nunitoStyle}>{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-500 text-white font-bold rounded-xl hover:from-teal-500 hover:to-cyan-400 transition-all"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const categories = menuData?.menuCategories || [];

  return (
    <main className="relative min-h-screen pt-20" role="main" aria-label="Restaurant Menu">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#063B4C] via-[#006D77] to-[#073B4C]" />
        <div className="absolute inset-0 bg-pattern opacity-50" />
      </div>

      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-5 w-16 h-16 bg-gradient-to-br from-red-500/20 to-pink-600/20 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute top-40 right-10 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-10 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-cyan-300/20 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-5 w-24 h-24 bg-gradient-to-br from-red-500/15 to-pink-600/15 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '6s' }} />
      </div>

      {categories.map((category) => (
        <MenuCategory key={category.id} category={category} />
      ))}

      {/* Squidward Section - Before Footer CTA */}
      <section className="py-16 px-4 sm:px-6 md:px-10 relative" aria-labelledby="squidward-quote">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Plankton Image - Left Side (swapped) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 w-40 h-40 sm:w-52 sm:h-52 transition-all duration-1000 ease-out animate-fade-in-left" style={{ animationDelay: '200ms' }}>
            <img
              src="/images/plankton-character.jpg"
              alt="Plankton"
              className="w-full h-full object-cover rounded-2xl border-4 border-[#FF6B6B]/30 drop-shadow-[0_12px_30px_rgba(233,30,99,0.4)] opacity-90 hover:opacity-100 hover:scale-[1.05] transition-all duration-500"
              aria-hidden="true"
            />
          </div>

          {/* Squidward Quote */}
          <div className="relative pl-52 sm:pl-64 text-center md:text-right">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#9DECE7]/20 to-[#63E6E2]/20 backdrop-blur-md border border-[#9DECE7]/30 rounded-full mb-6 shadow-[0_8px_30px_rgba(0,139,149,0.2)]">
              <span className="text-2xl" aria-hidden="true">🎵</span>
              <span className="text-white font-bold text-lg">Squidward Says</span>
            </div>
            <blockquote id="squidward-quote" className="relative text-2xl sm:text-3xl md:text-4xl font-medium text-[#C8F7F2]/90 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
              <span className="text-[#9DECE7] font-bold">"You are welcome to order</span>
              <br />
              <span className="text-[#FFD700] font-bold">But only where I'm not here"</span>
            </blockquote>
            <div className="flex items-center justify-center md:justify-end gap-2 mt-4" aria-hidden="true">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#9DECE7] to-transparent rounded-full" />
              <span className="text-[#9DECE7]/60 text-sm font-medium">— Squidward Tentacles, Cashier</span>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#9DECE7] to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Plankton Section - Footer CTA */}
      <section className="py-20 px-4 sm:px-6 md:px-10 relative" aria-labelledby="plankton-quote">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Squidward Image - Top Right of Footer (swapped) */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10 transition-all duration-1000 ease-out animate-fade-in-right" style={{ animationDelay: '300ms' }}>
            <img
              src="/images/squidward-character.jpg"
              alt="Squidward Tentacles"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#9DECE7] drop-shadow-[0_8px_20px_rgba(0,139,149,0.5)] animate-pulse hover:scale-110 transition-all duration-300 cursor-pointer"
              aria-hidden="true"
            />
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF6B6B]/80 to-[#E91E63]/80 backdrop-blur-md border border-[#FF6B6B]/30 rounded-full mb-6 shadow-[0_8px_30px_rgba(233,30,99,0.3)]">
            <span className="text-2xl animate-bounce" aria-hidden="true">🧪</span>
            <span className="text-white font-bold text-lg">Plankton Schemes</span>
          </div>
          <blockquote id="plankton-quote" className="relative text-2xl sm:text-3xl md:text-4xl font-medium text-[#C8F7F2]/90 leading-relaxed mb-8" style={{ fontFamily: 'Nunito, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            <span className="text-[#FF6B6B] font-bold">"The secret formula</span>
            <br />
            <span className="text-[#FFD700] font-bold">will be mine... eventually"</span>
          </blockquote>
          <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#FF6B6B] to-transparent rounded-full" />
            <span className="text-[#FF6B6B]/60 text-sm font-medium">— Sheldon J. Plankton, Evil Genius</span>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#FF6B6B] to-transparent rounded-full" />
          </div>
          <h2 id="footer-cta" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6" style={fredokaStyle}>
            Visit Us at The Krusty Krab
          </h2>
          <p className="text-xl text-cyan-100/90 mb-8 max-w-2xl mx-auto relative" style={nunitoStyle}>
            Come on down to Bikini Bottom's most famous restaurant!{' '}
            <br />Bring your appetite and leave with a smile
            <span className="relative inline-flex items-center gap-1">
              {' '}(and maybe a Krabby Patty secret formula... shh!)
              <img
                src="/images/spongebob-character.jpg"
                alt="SpongeBob SquarePants"
                className="w-8 h-8 sm:w-10 sm:h-10 ml-1 rounded-full border-2 border-[#FFD700] drop-shadow-[0_4px_12px_rgba(246,211,101,0.5)] animate-bounce-slow"
                aria-hidden="true"
              />
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-[#063B4C] font-bold text-lg rounded-2xl hover:from-amber-500 hover:to-yellow-400 hover:shadow-[0_10px_30px_rgba(246,211,101,0.4)] transition-all duration-300 transform hover:-translate-y-[0.25rem] active:scale-[0.98] flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Order Now
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-[0.25rem] active:scale-[0.98] flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Find Us
            </button>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-cyan-100/80 text-center" style={nunitoStyle}>Scan to open menu</p>
            <img
              src="/qr-code.png"
              alt="QR code for menu"
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl bg-white/5 p-2 border border-white/10 drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" aria-hidden="true">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#063B4C] to-transparent" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" style={fredokaStyle}>
            <span className="text-yellow-400/50 text-2xl animate-bounce-slow" aria-hidden="true">Crab</span>
            <span className="text-yellow-400/50 text-2xl animate-bounce-slow" style={{ animationDelay: '0.3s' }} aria-hidden="true">Money</span>
            <span className="text-yellow-400/50 text-2xl animate-bounce-slow" style={{ animationDelay: '0.6s' }} aria-hidden="true">Burger</span>
            <span className="text-yellow-400/50 text-2xl animate-bounce-slow" style={{ animationDelay: '0.9s' }} aria-hidden="true">Crab</span>
          </div>
        </div>
      </section>
    </main>
  );
}