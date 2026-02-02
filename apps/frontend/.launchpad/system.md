# Holy Grail Design System

## Brand Identity

### Platform
Holy Grail is a free educational resource platform for Singapore students (O-Level, A-Level, IB). The tone is student-made, cozy, approachable, and warm academia.

### Mascot: Grail-chan
A friendly anime-style character that appears throughout the site.

**Asset Usage:**
- `/grail-chan-happy-v1.webp` - Header logo (circular, 48px)
- `/trimmy-grail-chan-studying.webp` - Hero section, 401 page
- `/trimmy-grail-chan-sparkling.webp` - Error states, empty states, 404 page, upload page
- `/trimmy-grail-chan-happy.webp` - Library page (desktop only)

**Presentation:**
- Always add glow effect behind: `bg-gradient-to-br from-amber/20 to-coral/20 blur-2xl`
- Use `animate-float` for gentle floating animation

---

## Color Palette

### Primary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `amber` | #f59e0b | Primary action color, CTAs, highlights |
| `amber-light` | #fbbf24 | Hover states for amber |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `coral` | #fb7185 | Secondary accent, contributor CTA, error states |
| `coral-soft` | #fda4af | Hover states for coral |

### Background Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | #faf7f2 | Light mode background |
| `cream-dark` | #f5f0e8 | Light mode hover/card backgrounds |
| `navy` | #1e293b | Dark mode secondary |
| `navy-deep` | #0f172a | Dark mode background |

### Forbidden Colors
**NEVER use these colors** - they are not part of the design system:
- `gray-*` (any shade)
- `slate-*` (any shade)
- `zinc-*` (any shade)
- `blue-*` for links (use `amber` instead)

Always map to the design system equivalents:
| Instead of | Use |
|------------|-----|
| `gray-100/200` | `cream-dark` |
| `gray-700/800` | `navy` |
| `gray-900` | `navy-deep` |
| `slate-*` | `navy-*` or `cream-*` |
| `zinc-*` | `navy-*` or `cream-*` |
| `blue-*` links | `amber` |

---

## Component Patterns

### Floating Island Pattern
Used for header, cards, search containers, and elevated surfaces.

```css
bg-cream/80 dark:bg-navy-deep/80
backdrop-blur-md
border border-navy/5 dark:border-cream/5
shadow-lg shadow-navy/10 dark:shadow-black/20
rounded-2xl
```

### Page Layout
- Max width: `max-w-6xl` or `max-w-7xl`
- Horizontal padding: `px-4 sm:px-6 lg:px-8`
- Section spacing: `py-8 md:py-12`

### Text Colors
| Purpose | Classes |
|---------|---------|
| Headings | `text-navy-deep dark:text-cream` |
| Body text | `text-navy/80 dark:text-cream/80` |
| Muted/secondary | `text-navy/70 dark:text-cream/60` |
| Links | `text-amber hover:underline` |

---

## Buttons

### Solid (Primary)
```css
bg-amber text-navy-deep hover:bg-amber-light
```

### Glow (Hero CTAs)
Solid button with glow effect for emphasis.
```css
bg-amber text-navy-deep hover:bg-amber-light
shadow-lg shadow-amber/25 hover:shadow-amber/40
```

### Outline
```css
border border-amber/50 text-amber hover:bg-amber/10
```

### Ghost
```css
text-navy/70 hover:text-navy hover:bg-navy/5
dark:text-cream/70 dark:hover:text-cream dark:hover:bg-cream/5
```

---

## Empty & Error States

### Pattern
- Center Grail-chan image with glow effect behind
- Use human-friendly messaging (not HTTP codes)
- Provide dual CTAs: Primary action + "Back to Home"

### Messaging Guidelines
| Instead of | Use |
|------------|-----|
| "404" | "Page not found" |
| "401" | "Login required" |
| "500" | "Something went wrong" |

---

## Modals & Dropdowns

- Apply floating island pattern
- Use `rounded-2xl` corners
- Close button in top-right with X icon
- Amber-styled note/warning boxes:
  ```css
  bg-amber/10 dark:bg-amber/20 border border-amber/20
  ```

---

## Mobile Drawer

- Rendered via React Portal (outside header DOM)
- Slides in from right
- Solid background (not transparent)
- Include full nav links + auth section

---

## Typography

### Font Family
Plus Jakarta Sans (sans-serif)

### Headings
```css
font-bold tracking-tight
```

### Body Text
Regular weight with `leading-relaxed` for long-form content.

---

## Animations

Defined in `globals.css`:

| Animation | Usage |
|-----------|-------|
| `animate-fade-in` | Subtle entrance |
| `animate-fade-in-up` | Entrance with upward motion |
| `animate-float` | Gentle floating (for Grail-chan) |
| `animate-glow` | Pulsing glow effect |
| `animate-shimmer` | Loading shimmer |

---

## Table Styling Pattern

For data tables in non-landing pages (library, admin panels):

### Header Row
```css
border-b-2 border-navy/10 dark:border-cream/10
```

### Header Text
```css
text-navy-deep dark:text-cream font-semibold
```

### Body Text
```css
text-navy/80 dark:text-cream/80
```

### Row Hover
```css
hover:bg-cream-dark dark:hover:bg-navy/40
```

### Icon Colors
```css
fill-navy dark:fill-cream
```

### Table Links
```css
text-amber hover:text-amber-light hover:underline
```

---

## Form Container Pattern

For form containers and upload workspaces:

```css
bg-cream-dark dark:bg-navy/30
shadow-sm dark:shadow-none
rounded-lg
```

---

## Leaderboard Rank Styling

### 1st Place (Amber/Gold)
```css
container: bg-gradient-to-br from-amber/20 via-amber/10 to-amber/5 border-amber/30
badge: bg-amber text-navy-deep
icon: text-amber
glow: shadow-amber/20
```

### 2nd Place (Navy/Cream - Silver equivalent)
```css
container: bg-gradient-to-br from-navy/15 via-navy/10 to-navy/5 border-navy/30
          dark:from-cream/20 dark:via-cream/15 dark:to-cream/10 dark:border-cream/30
badge: bg-navy/60 text-cream dark:bg-cream/80 dark:text-navy-deep
icon: text-navy/60 dark:text-cream/80
glow: shadow-navy/15 dark:shadow-cream/20
```

### 3rd Place (Orange/Bronze)
```css
container: bg-gradient-to-br from-orange-400/20 via-orange-300/10 to-orange-200/5 border-orange-400/30
badge: bg-orange-500 text-white
icon: text-orange-500
glow: shadow-orange-400/20
```

---

## Interactive State Patterns

### Hover States
- Buttons/clickable: `hover:bg-cream-dark dark:hover:bg-navy/40`
- Icons: `hover:text-amber` or `hover:text-amber-light`
- Links: `hover:text-amber-light hover:underline`

### Focus States
```css
focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber
```
