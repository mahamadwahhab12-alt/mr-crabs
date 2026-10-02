# Mr. Crabs - Krusty Krab Menu Website

A complete Krusty Krab-inspired restaurant menu website for "Mr. Crabs" with 34 menu items across 6 categories, featuring interactive animations, glassmorphism effects, and an editable CMS.

## Features

- **34 Menu Items** across 6 categories: Burgers (17), Rizo (6), Sandwich (5), Kentucky (2), Sides (5), Special (1)
- **IQD Pricing** with proper Iraqi Dinar formatting
- **Interactive Animations**: Floating bubbles, swimming jellyfish, gradient shifts, staggered card animations
- **Scroll Spy Navigation** with IntersectionObserver
- **Glassmorphism/Frosted Glass Effects** throughout
- **Character Images**: Patrick, Mr. Crabs, Plankton, Squidward, SpongeBob
- **Video Background** in Hero section
- **Responsive Design** (1-4 column grids)

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v4
- Decap CMS (Netlify CMS) for content management

## Getting Started

### Development

```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
```

## Deployment & CMS Setup

### Option 1: Netlify (Recommended - Free CMS)

1. Push this repo to GitHub/GitLab/Bitbucket
2. Connect to Netlify:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Enable **Identity** and **Git Gateway** in Netlify dashboard:
   - Go to Site settings → Identity → Enable Identity
   - Go to Services → Git Gateway → Enable Git Gateway
4. Access CMS at: `https://your-site.netlify.app/admin/`
5. Invite yourself as a user in Identity tab

### Option 2: Cloudflare Pages + Decap CMS

1. Push to GitHub
2. Connect to Cloudflare Pages:
   - Build command: `npm run build`
   - Build output directory: `dist`
3. For CMS, you'll need a separate auth provider (Netlify Identity works cross-platform)

### Option 3: Vercel + External CMS

Deploy to Vercel normally, use a headless CMS like Sanity, Contentful, or Strapi.

## Editing the Menu

Once CMS is set up:

1. Visit `https://your-site.netlify.app/admin/`
2. Log in with your Netlify Identity account
3. Click "Menu" in the sidebar
4. Edit categories, items, prices, images
5. Click "Publish" - changes deploy automatically!

### Menu Structure (JSON)

The menu is stored in `/public/data/menu.json` with this structure:

```json
{
  "menuCategories": [
    {
      "id": "burgers",
      "name": "Burgers",
      "icon": "🍔",
      "items": [
        {
          "id": "chicken-burger",
          "name": "Chicken Burger",
          "price": 4000,
          "image": "/images/burgers/Chicken Burger.jpg"
        }
      ]
    }
  ]
}
```

### Adding Images

1. Place new images in `/public/images/[category]/`
2. Reference them as `/images/[category]/filename.jpg`
3. Recommended: WebP format, 400x300px, under 100KB

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx       # Hero with video, jellyfish, Patrick
│   ├── Menu.tsx       # Dynamic menu with categories
│   └── Navbar.tsx     # Fixed nav with scroll spy
├── context/
│   └── MenuContext.tsx  # Menu data fetching/state
├── data/
│   └── menuData.ts    # Types, fallback data, price formatting
├── App.tsx
└── main.tsx

public/
├── data/
│   └── menu.json      # CMS-editable menu data
├── images/            # All menu & character images
├── admin/             # Decap CMS config
│   ├── index.html
│   └── config.yml
└── mr-crabs.mp4       # Hero background video
```

## Customization

### Colors (in `src/index.css`)

```css
:root {
  --color-deep-teal: #063B4C;
  --color-teal: #006D77;
  --color-turquoise: #008C95;
  --color-aqua: #20C9C9;
  --color-cyan: #63E6E2;
  --color-pale-cyan: #9DECE7;
  --color-mr-crabs-red: #E91E63;
  --color-mr-crabs-blue: #006D77;
  --color-gold: #FFD700;
  --color-coral: #F6D365;
  --color-coral-pink: #FF6B6B;
}
```

### Animations (in `src/index.css`)

Custom keyframes: `float`, `swim`, `pulse-slow`, `bounce-slow`, `gradientShift`, `fadeInUp`, `shimmer`

## License

MIT - Feel free to use for your own Krusty Krab!