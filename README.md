# Gbolagade Multipurpose Ventures — website

A responsive five-page website built with [Eleventy](https://www.11ty.dev/) (templates) and esbuild (CSS bundling). The output is plain static HTML/CSS/JS in `dist/`, so it can be hosted anywhere.

## Commands
```bash
npm install      # once
npm run dev      # local server with live reload (http://localhost:8080)
npm run build    # production build into dist/ (minified CSS)
```
Upload the contents of `dist/` to your host. `dist/` and `node_modules/` are generated, so don't edit them.

## Project structure
```
src/
  _data/site.json            Company name, address, CAC no., logo, nav links (edit once, updates every page)
  _includes/
    layouts/base.njk         <head>, header, <main>, footer, scripts: shared by every page
    partials/header.njk      Header + navigation (active link is set automatically)
    partials/footer.njk      Footer
  pages/                     One file per page: only the content unique to that page
    index.njk  about.njk  tractor-services.njk  haulage-services.njk  contact.njk
    pages.json               Applies the layout and the `name.html` URLs to every page
  css/
    main.css                 Entry file: @imports the files below in a fixed order
    base.css                 Design tokens (:root colours), reset, typography, layout helpers
    buttons.css              .btn variants, .text-link
    header.css  footer.css   Header/nav and footer (+ floating WhatsApp button)
    home.css                 Home page: hero, ticker, division cards, "why us"
    components.css           Shared: CTA band, inner-page hero, breadcrumbs
    about.css  services.css  contact.css   Page-specific styles
    effects.css              Scroll reveal, progress bar, reduced-motion (must stay last)
  js/main.js                 Shared interactions
  assets/images/             Logo and (later) client-approved photos
eleventy.config.js           Build config (also bundles the CSS)
```

## Common edits
- **Change a nav link, address or CAC number:** `src/_data/site.json`.
- **Change the header/footer markup:** `src/_includes/partials/`.
- **Add a page:** create `src/pages/new-page.njk` with `title` and `description` front matter, add it to `nav` in `site.json`.
- **Brand colours:** `:root` variables at the top of `src/css/base.css`.
- **Page meta:** each page's `title` and `description` live in the front matter at the top of its file.

## Before launch
- Temporary photography is loaded from Unsplash URLs in the page content and in `src/css/home.css`, `components.css`, etc. Replace with client-approved images saved in `src/assets/images/` (suggested names: `hero-farmland.jpg`, `tractor-ploughing.jpg`, `tipper-truck.jpg`, `construction-haulage.jpg`, `aggregate-materials.jpg`).
- The WhatsApp link placeholder is in `src/js/main.js` (`whatsappNumber`): digits only, with country code, verified number only.
- The quote form is frontend-only: it validates in the browser but does not send or store anything. Connect a secure form endpoint before launch.
