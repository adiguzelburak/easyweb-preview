# easyApp.io landing page — design

- **Date:** 2026-09-30
- **Status:** Approved in conversation; implemented 2026-09-30 (this document reflects the build)
- **Replaces:** https://www.easyapp.io (Vite + React SPA)

## 1. Goal

A single-page, heavily animated company site. Its first job is **investor and corporate trust**; its second is showing the six flagship apps. It must not read as a generated template: the easy® brand (orange, Cooper Black) leads, and one cinematic scroll sequence carries the apps.

Within 30 seconds a visitor should know what easyApp.io does, that it is real (traction), why it wins (playbook + easy® brand), who is behind it (team — hidden for now) and how to get in touch.

### Current-site problems this fixes

- Mobile: a 600px decorative blob widens the layout to ~590px; at 375px the menu button sits off-screen.
- The hero is near-invisible for ~2s after load (slow entrance animation).
- Raw HTML is `<div id="root"></div>`: no OG/Twitter tags, canonical or structured data, so link previews are empty.
- The logo is a 340×141 JPG with a baked-in background.
- Generic copy, an implausible "98% Client Satisfaction" metric, and three sections repeating one message.

### Non-goals

CMS, i18n (English only), extra routes, contact form (mailto only), dark-mode toggle, cookie-consent banner, hosting/DNS, live store data fetched at runtime.

## 2. Page structure

Single route `/`, fully prerendered. `id` is the nav anchor.

| # | Section | id | Background | Content |
|---|---|---|---|---|
| 0 | Intro | — | orange | Cooper Black "easy" → the orange layer shrinks into the phone screen. Once per browser session (`sessionStorage`). |
| 1 | Hero | `top` | paper | Headline, one-line business model, 3 key metrics, CTAs "Contact us" (mailto) + "See the portfolio". Phone on the right showing a home screen with the 5 app icons. |
| 2 | Portfolio | `portfolio` | per-app world | Short heading panel, then 6 app panels (easyStars, easyMusic, Comikaze, GlobeAlert, GLPal, CarUp); the same phone stays in place and opens each app. On desktop, scrolling moves one whole project at a time. |
| 3 | Playbook | `playbook` | paper | Growth curve with Launch → Grow → Monetize → Scale stops. |
| 4 | Traction | `traction` | ink | 4 odometer metrics, each with a one-line context. |
| 5 | easy® family | `family` | paper | Credibility statement + link to easy.com; optional brand strip. |
| 6 | Team | `team` | paper | Leadership cards. **Built but hidden** (`site.showTeam = false`). |
| 7 | Closing | `contact` | orange | "Let's make it easy." + email (copy / mailto) + LinkedIn. |
| 8 | Footer | — | ink | Logo, links, legal line. |

Nav: logo · Portfolio · Playbook · Traction · Contact · "Contact us" button (mailto). Mobile: full-screen orange menu.

### Initial copy

All copy lives in `content/`. Values marked † come from the current site and must be confirmed by the user before launch.

- **Hero:** "The app publisher of the **easy**® family." / "We build, launch and scale consumer apps that people use every day." Metrics: 10M+ Downloads†, 6 Flagship apps, 50+ Markets†.
- **Portfolio:** heading "Six flagship apps. Six worlds." Per app: category, name, tagline† (GLPal's and CarUp's are written from their store descriptions), store links† (GLPal's App Store link is the Turkish storefront URL the user gave; CarUp is App Store only — it is a CarPlay app and has no Google Play listing).
- **Playbook:** heading "A playbook that compounds."
  - Launch — "From idea to the stores fast, with lean MVPs tested on real users."
  - Grow — "Paid acquisition, ASO and creators, steered by cohort data."
  - Monetize — "Subscriptions and paywalls, A/B tested at every step."
  - Scale — "Localized and launched across 50+ markets."†
- **Traction:** heading "By the numbers." The satisfaction metric is dropped.
  - 10M+† Total downloads — "Across iOS and Android."
  - 25+† Apps published — "Shipped to the App Store and Google Play."
  - 50+† Markets served — "With localized store listings."†
  - 6 Flagship apps — "easyStars, easyMusic, Comikaze, GlobeAlert, GLPal and CarUp."
- **Family:** "Part of the **easy**® family of brands." + one sentence + link to easy.com.
- **Closing:** "Let’s make it **easy**." / "For investment and partnership inquiries, write to us directly." Email `info@appricott.ai`† (the user may switch to an IR address).
- **Footer:** "© 2026 easyApp.io — All rights reserved."† Legal entity name and address are added when provided.

## 3. Visual system

### Fonts

- **Cooper Black** — `app/fonts/cooper-black.woff2` via `next/font/local`. Only for easy-branded words ("easy", "easyApp", "easyStars", "easyMusic"), and only through `<EasyWord>`. The `font-cooper` utility appears nowhere else. `<EasyText>` renders any copy string and wraps every word starting with "easy" (with a following ®) in `<EasyWord>`, so the rule holds without per-string markup.
- **easy® pill:** every `<EasyWord>` is a badge — white Cooper Black on a fully rounded orange fill with 0.28em side padding, and a following ® sits inside it. The fill is a `::before` layer whose insets hug Cooper's glyphs (x-height, or cap height when the word has capitals, down to the descender, 0.13em to spare) instead of Cooper's tall line box, where lowercase "easy" sat low with 0.43em of empty orange above it. It is driven by `--easy-fill`, `--easy-pad` and `--easy-ink`: `on-orange` (Intro, mobile menu, home-screen icon grid, easyMusic's world, Closing) drops fill and padding because the orange surface already is the badge; `easy-plain` (the footer watermark) also lets the word take the surrounding color. The Family mark is the same pill at logo size, vertically centred with the copy.
- **Bricolage Grotesque** — `next/font/google`, variable (`opsz` 12–96, `wdth` 75–100, `wght` 200–800), subsets `latin` + `latin-ext`. Everything else. Display sizes use weight ~650 with optical sizing on.

### Color tokens (Tailwind v4 `@theme`)

| Token | Value | Use |
|---|---|---|
| `paper` | #F6F1E9 | light sections |
| `ink` | #16130F | text, dark sections |
| `muted` | #6B645B | secondary text on paper (5.2:1) |
| `orange` | #FF6600 | brand fills, large/decorative use, EasyWord |
| `orange-deep` | #B34700 | small orange text on paper (4.9:1) |
| `comic` | #FFD83D | "POW!" lettering |
| `alert` | #FF3B30 | GlobeAlert pins and blips, CarUp's red "Fri" |
| `green` | #3AD35E | CarUp widget accents |

The default Tailwind palette is cleared, so only these tokens exist. World colors (easyStars #1B1340, easyMusic #FF6600, Comikaze #FFD83D, GlobeAlert #0B1622 with #FF3B30 alerts) live with each app in `content/apps.ts`.

White on #FF6600 is only 2.9:1, so functional text on orange (buttons, body) is **ink** (6.3:1). EasyWord marks are logotypes and exempt.

### Layout and shapes

- Content max width 1280px; side gutters 16px (mobile), 32px (tablet), 48px (desktop). No element may exceed the viewport width.
- Fluid type scale as `@theme` tokens (size, line-height, tracking and weight together): `text-hero`, `text-title`, `text-app`, `text-stat`, `text-mega`. Body 17–18px, small 14px.
- Pill buttons. The phone is built in CSS (ink bezel, dynamic island, matched screen radius), not an image.
- App icons are masked with a ~22.5% radius (the easyStars PNG has white corners baked in).

## 4. Motion

### Stack

- `gsap` ^3.15 with ScrollTrigger and SplitText (standard no-charge license)
- `@gsap/react` ^2.1 (`useGSAP`)
- `lenis` ^1.3 (MIT)
- `cobe` ^2.0 (MIT), lazy-loaded

GSAP is the only animation engine; CSS handles hover states and the marquee.

### Global rules

- `lib/gsap.ts` registers plugins once; components import `gsap` from there.
- `SmoothScroll` (client, in the layout) runs Lenis (wheel only; touch keeps native scrolling) driven by `gsap.ticker`, calling `ScrollTrigger.update` on scroll. It also intercepts every in-page `#hash` link and scrolls there through Lenis (`lib/scroll.ts`), moving focus to the target.
- Animated components wrap their tweens in `gsap.matchMedia()` with the queries from `lib/motion.ts`, so reduced-motion and mobile variants revert automatically. Imperative transitions check `prefersReducedMotion()` and jump to the end state.
- `lib/motion.ts` holds easing tokens (`enter = 'expo.out'`, `swap = 'power3.inOut'`, `pop = 'back.out(1.7)'`) and the media queries; durations stay within 0.6–1.2s.
- Only `transform`, `opacity`, `clip-path` and canvas drawing are animated.

### Choreography

1. **Intro.** An inline head script sets `html[data-intro="play"]` before first paint when the session flag is absent and reduced motion is off. CSS shows the overlay only under that attribute, so without JS there is no overlay. The wordmark is static HTML, visible from the first paint. Once hydrated (≤2s): its letters ripple → it lifts away → the orange layer's `clip-path` shrinks onto the visible phone screen (`[data-intro-target]`; a wipe-up if none is fully in view) → the hero headline lines slide up from masks while the home-screen widget and icons pop in. Click, wheel, touch or any key jumps to the end, and a page that is already scrolled skips it. When done it sets the session flag and removes the attribute. On repeat visits the hero is simply present: no entrance animation, no flash.
2. **Showcase (Hero + Portfolio), desktop.** Two columns. The right column holds one sticky, vertically centred phone for the whole Hero + Portfolio span. The left column scrolls: hero copy, the portfolio heading panel, then four `AppPanel`s (~100vh each). Each AppPanel's ScrollTrigger sets `activeApp` in `ShowcaseContext` when it crosses the viewport centre.
   - **Phone:** the `home` state shows a company widget and the six icons on an orange wallpaper. Entering easyStars, the app screen grows out of its icon (clip-path + scale, iOS-style launch). Between apps the screens slide vertically in the scroll direction (`swap`, 0.85s); going back home collapses into the icon.
   - **Store screenshots:** the App Store creatives already contain their own device frames, so while an app is active the phone's bezel, buttons and island fade out and the screen becomes a floating card (`Phone framed={false}`). `ScreenshotStory` plays the app's screenshots like a story: 3.2s per slide, the next slides in from the right, a segmented progress bar sits at the bottom. Only the visible slide is mounted while paused; its neighbours mount once it plays.
   - **One step per gesture (desktop):** sections register the scroll positions they want to rest on (`registerSnapPoints`); `SmoothScroll` runs `useScrollSteps`, which gates Lenis's `virtualScroll` hook. Between the first and the last registered point, a wheel gesture or ↑/↓/PageUp/PageDown scrolls to exactly the next point (1.1s). The controller recognises gestures instead of waiting for silence: a pause (>140ms), a reversal or a jump well above the fading inertia starts a new gesture. Each gesture moves at most one step and the rest of it (trackpad inertia included) is consumed, while a new swipe during an old tail is accepted at once. A free scroll that runs into the stepped range snaps to the next point instead of stopping in between. The lock is time-based, so an interrupted step never leaves the wheel stuck. Only the portfolio registers points (its panels, ≥768px), so the steps run project by project. Before the first point and after the last one the page scrolls freely, which keeps the Playbook chart continuously scrubbed; scrolling back up from the Playbook lands on the last project. The decision logic lives in the pure `lib/snap.ts`. Touch scrolling stays native.
   - **WorldBackdrop:** an absolute layer spanning the whole showcase with a sticky full-viewport child (a negative-margin sticky element would overrun the showcase end). A new world wipes in from the scroll direction (clip-path, 1s):
     - StarsWorld: canvas starfield (twinkle), a slowly turning zodiac ring on its own layer centred on the phone, SVG constellations that draw in when the world activates.
     - MusicWorld: canvas equalizer bars (fading out towards the copy) and ripples from the phone; bar gain follows scroll speed.
     - ComicWorld: halftone background, speed rays, panel frames that slam in and an elastic "POW!" burst.
     - GlobeWorld: cobe globe with pulsing red markers and arcs; created only while active. On the left (desktop): floating alert pins and a radar with a sweeping beam and blips in the corner (`AlertSignals`).
     - GlpalWorld: soft lavender field with three tracking rings (purple, pink, teal) around the phone. Each ring arc is its own layer and sweeps into place by rotating (transform + opacity only), plus a slowly turning dashed orbit. Its glass cards (below) fill the empty left side.
     - CarupWorld: near-black dashboard with a green-lit speedometer around the phone. The needle layer sweeps up to its reading with a slight overshoot, then idles like a revving engine; the lit arc fades in. Transform and opacity only. On the left (desktop, `WidgetTiles`): widgets in CarUp's own style, aligned with the text column — above the text a date widget (red "Fri", big "24") and a "Hello, Driver" widget with a red coupe (`CarArt` SVG); below it a connection-sound widget ("V8 Cold Start" pill with an animated waveform) and a night weather widget. Everything is sized in `em` from one svh-based font size so the set scales with the viewport height; the top row is dropped on short screens (`short:` variant, ≤780px tall). The widgets stagger in when the world becomes active.
   - **Glass cards (GLPal only):** "Liquid Glass" cards (`content/apps.ts` → optional `cards`): tinted translucent glass with a breathing inner glow, a title/subtitle, an optional list on the right, and one of three bodies — `stats` (three stats), `progress` (a glowing glass slider) or `meter` (a big reading with drifting light particles). On desktop they stand in the panel's left column next to the text, away from the phone (container query: shown when the column is ≥44rem wide at ≥1024px; the third card is dropped on short screens). They animate in when GLPal becomes active and stay visible while it scrolls away. On mobile the first two cards overlap the bottom of the phone.
   - **ProgressRail:** the six app icons in a row under the phone, visible during the portfolio; clickable (scrolls to the panel), active one highlighted; `inert` while hidden.
   - WorldBackdrop updates its own `data-nav-theme` at the moment the wipe covers the nav.
3. **Playbook.** The chart stage is pinned for ~150vh while an SVG growth curve draws (scrubbed `stroke-dashoffset`, scrub 0.4) and each stop lights up as the line reaches it. The chart follows the scroll continuously (no snap steps); after Scale the finished chart stays pinned for a short hold (`FINAL_HOLD`) before the page moves on. The line has `pathLength=1`, so its tween disables GSAP's whole-pixel rounding (`autoRound: false`); with rounding the offset jumped from 1px to 0px and the line appeared in one go. Labels hang above-left of their dots, the area a rising curve always leaves empty.
4. **Traction.** `Odometer`: each digit is a vertical 0–9 strip that rolls to its value once on enter. The server renders the final value.
5. **Family.** Reveal on enter. The optional brand strip is a CSS marquee (paused on hover), rendered only when `site.familyBrands` is non-empty — empty until easy® brand use is cleared.
6. **Closing.** An orange circle grows from the CTA (`clip-path: circle()`, scrubbed) until it fills the viewport; the headline reveals; the CTA is a `MagneticButton` (`gsap.quickTo` toward the pointer, springs back). Clicking the email copies it and shows a short "Copied" toast; a mailto link stays available.
7. **Nav.** Logo, a translucent blurred pill of links and the IR button; hides on scroll down, returns on scroll up or on keyboard focus. Every element that paints a full-bleed background declares `data-nav-theme="light|dark"`; the Nav takes the theme of the last such element (in DOM order) under its vertical centre, so it matches what is visibly behind it.

### Mobile (< 768px)

No sticky phone and no WorldBackdrop. The hero shows the phone (home screen) below the copy; each AppPanel renders its own frameless screenshot card and world background inline, and that background declares its own `data-nav-theme`. Worlds and stories run only while their panel is on screen, with lighter settings (fewer stars, fewer bars). Touch scrolling stays native (no project snapping). Below 1024px the Playbook is not pinned and the stops form a list under the chart. The curve's scrub is tied to the chart itself (`top 85%` → `bottom 45%`), not the whole stage, so it finishes while the entire chart is on screen; on phones the line and dots are drawn thicker.

### Reduced motion

No intro, no Lenis (so no project snapping), no pinning, no scrubbed effects. Phone screens swap instantly, screenshot stories stay on their first slide, canvases draw one static frame, odometers show final values, the marquee is static.

### Performance

Canvases and the globe pause off-screen (IntersectionObserver) and when the tab is hidden. `devicePixelRatio` is capped at 2. cobe comes in through a dynamic import. Images use `next/image` with explicit `sizes`; fonts use `next/font` (no layout shift).

## 5. Architecture

Next 16.3 App Router (Turbopack), React 19.2, TypeScript strict, Tailwind v4, ESLint flat config (`npm run lint`).

```
app/
  layout.tsx            fonts, <html> attributes, intro head script, metadata, JSON-LD, GA4, SmoothScroll
  page.tsx              composes the sections in order; no logic
  globals.css           Tailwind import, @theme tokens, base styles, intro rules
  opengraph-image.tsx   1200×630: orange field, Cooper Black "easyApp.io", tagline
  icon.tsx              favicon: orange square, white Cooper Black "e"
  fonts/                cooper-black.woff2 (web), CooperBlack.ttf (image generation)
components/
  layout/     Nav, MobileMenu, Footer, SmoothScroll, Analytics
  sections/   Intro, Traction, Family, Team, Closing
    showcase/ Showcase, ShowcaseContext, Hero, Portfolio, AppPanel, PhoneScreens, ScreenshotStory,
      cards/  GlassCard, StatsCard, ProgressCard, MeterCard, CardView (switch), AppCards
              HomeScreen, AppScreen, StatusBar, WorldBackdrop, ProgressRail
      worlds/ World (switch), StarsWorld, MusicWorld, ComicWorld, ComicPanelArt, GlobeWorld, GlpalWorld,
              CarupWorld, AlertSignals, WidgetTiles, CarArt, types
    playbook/ Playbook, GrowthCurve, curve.ts (path maths)
  ui/         EasyWord, EasyText, Button, Phone, StoreLinks, SectionHeading, SplitReveal,
              Reveal, Odometer, Marquee, MagneticButton, icons
content/      types.ts, site.ts, apps.ts, team.ts
lib/          gsap, motion, intro, scroll (hash links + Lenis gate), snap, layout, og, canvas, geometry, cn
  hooks/      useMediaQuery, useInViewport, useTicker, useCanvasScene, useCopyToClipboard,
              useScrollSteps, useElementSnapPoints
public/apps/<appId>/icon.png, screen-*.png
```

### Code rules

- Components contain no copy or numbers; everything comes from `content/`, typed in `content/types.ts`.
- One component per file. A section never imports another section. Cross-section coordination uses two DOM contracts only: `[data-intro-target]` (Intro → phone screen) and `[data-nav-theme]` (background layers → Nav).
- Server components by default. `'use client'` only where animation or interaction needs it (Intro, showcase parts, worlds, Playbook, Odometer, Closing, Nav, MobileMenu, SmoothScroll, MagneticButton). Client components still render on the server, so all content is in the HTML.
- Each animated component owns its timeline inside a `useGSAP` scope; no global timelines.
- GSAP never animates an element that also carries Tailwind `translate`/`scale` utilities (GSAP resets the CSS `translate` property); position with the utility on a wrapper and animate the child.
- Large decorative SVGs never animate stroke properties or rotate inner elements (the browser repaints the whole SVG every frame and it stutters); split them into layers and move whole layers with `transform`/`opacity`.
- When scaling SVG elements from 0, `transformOrigin` goes in the from-state; set only in the to-state, GSAP compensates the origin change with a permanent offset (the Playbook dots sat a radius off the line).
- World decorations that centre on the sticky phone use the `left-phone` utility (CSS) or `phoneCenterX` (canvas); both mirror the showcase grid.
- `cn` only joins class names (no tailwind-merge), so never pass a display utility that conflicts with one a component already sets; wrap it instead.
- Masked line reveals go through `splitMaskedLines` (`lib/gsap.ts`). It leaves `[data-easy]` pills unsplit, because SplitText's deep slicing cloned them into stray orange fragments. It also widens each mask's clip by 0.3em so pills and descenders are not cut, and lines start at `LINE_HIDDEN` (140%) so they stay hidden below the wider clip.
- Custom variant `short:` = viewport height ≤780px, for decorations that would crowd the text on short laptop screens.
- Trigonometry that ends up in server-rendered SVG goes through `lib/geometry.ts` rounding, because server and browser engines disagree on the last digits and hydration would mismatch.
- Comments follow the user's global rule: at most one line, only where the code cannot explain itself.

### Content model (`content/types.ts`)

- `AppId = 'easystars' | 'easymusic' | 'comikaze' | 'globealert'`
- `App { id, name, category, tagline, icon, screenshots: string[], world: { background, foreground, accent, theme }, stores: { appStore, googlePlay }, metrics?: { value, label }[] }`
- `content/site.ts` exports one object per section: `company` (name, url, email, links, `gaId`, `showTeam`), `ui` (accessibility labels), `nav`, `hero`, `phone`, `portfolio`, `playbook`, `traction`, `family` (with `brands: string[]`), `team`, `closing`, `footer`.
- `TeamMember { name, role, photo?, linkedIn? }`; placeholder entries until real data arrives (section hidden).

### SEO and metadata

`metadata` with title, description, `metadataBase`, canonical, Open Graph and Twitter card; generated OG image and icon; JSON-LD `Organization` (name, url, logo, `sameAs` LinkedIn) in the layout with `<` escaped. The starter `favicon.ico` and SVGs are removed.

### Analytics

GA4 `G-KPX919X0L5` (same as the current site) via `next/script`, `afterInteractive`.

## 6. Assets

- `app/fonts/cooper-black.woff2` — copied from the user's easyCinema project. Done.
- `app/fonts/CooperBlack.ttf` — copied from the user's easyArt project; `next/og` cannot read WOFF2. Done.
- `public/apps/<appId>/icon.png` — 512×512, downloaded from the current site. Done.
- Store screenshots — App Store creatives from the user in `public/apps/screenshoots/` (`<name>-<n>.jpg|png|webp`; 1320×2868, except CarUp's 460×997 WebP files), listed per app in `content/apps.ts`; served resized by `next/image`. An app without screenshots falls back to a branded placeholder (world color, icon, name).
- `public/apps/glpal/icon.png` — 512×512, downloaded from GLPal's Google Play listing with the user's approval.
- `public/apps/carup/icon.png` — the 1024×1024 App Store icon from the user's `carwidget` project, resized to 512×512 (same design as the store icon the user linked).

## 7. Accessibility

Landmarks (`header`, `nav`, `main`, `footer`); one `h1`; sections labelled by their headings; skip link; visible `:focus-visible`; decorative canvases and SVGs `aria-hidden`; the intro overlay is `aria-hidden` and keyboard-skippable; the mobile menu traps focus and closes on Esc; all functional text ≥ 4.5:1.

## 8. Edge cases

- No JS: all content visible, no intro, odometers at final values.
- WebGL unavailable: GlobeWorld falls back to a CSS radial-gradient sphere.
- Missing screenshots: branded placeholder screen.
- Resize / orientation change: `gsap.matchMedia` reverts and rebuilds; ScrollTrigger refreshes.
- Anchors: nav links go through Lenis when it is active, native scrolling otherwise.

## 9. Verification

- `npm run build` passes and reports `/` as static; `npm run lint` passes.
- Browser pane at 1440×900 and 375×812: no horizontal overflow (`scrollWidth === clientWidth`), menu reachable and working, every section renders, animations smooth.
- Reduced motion: checked with a temporary local override of the `reduce` condition during development (removed before handoff), or with the OS setting.
- Raw HTML from `next start` contains the copy, OG/Twitter tags, canonical and JSON-LD.
- `grep` shows `font-cooper` only in `EasyWord.tsx`.

## 10. Build order

1. **Foundation:** dependencies, fonts, tokens, content model and data, layout (metadata, JSON-LD, GA4, icon, OG image), `lib/gsap`, SmoothScroll, UI primitives (EasyWord, Button, Phone, StoreLinks, SectionHeading).
2. **Static page:** Nav + MobileMenu, Showcase (Hero, PortfolioHeading, AppPanels, PhoneScreens, static worlds), Playbook, Traction, Family, Team (hidden), Closing, Footer. Check desktop/mobile layout and raw HTML.
3. **Motion:** Intro; showcase phone and worlds; Playbook curve; Odometer; Closing circle + MagneticButton; Nav behaviour.
4. **Variants:** mobile and reduced-motion paths; performance pass.
5. **Verification** (section 9).

## 11. Open items owned by the user (not blocking the build)

- Confirm or replace the † values (metrics, email, taglines) in `content/`.
- Provide screenshots, team data, and the legal entity name/address.
- Confirm easy® brand usage (brand strip, naming other easy brands) with easyGroup.
- Choose a cookie-consent approach for GA4 (EU/UK visitors).
