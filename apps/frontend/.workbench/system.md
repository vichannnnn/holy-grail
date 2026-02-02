# Holy Grail Workbench Design System

UI component patterns for non-landing pages (dashboards, library, upload, admin panels).

---

## Color Palette

### Text Colors
| Purpose | Classes |
|---------|---------|
| Headings | `text-navy-deep dark:text-cream` |
| Body text | `text-navy/80 dark:text-cream/80` |
| Muted/secondary | `text-navy/70 dark:text-cream/60` |
| Links | `text-amber hover:text-amber-light hover:underline` |
| Icons | `text-navy/70 dark:text-cream/70` or `fill-navy dark:fill-cream` |

### Background Colors
| Purpose | Classes |
|---------|---------|
| Page background | `bg-cream dark:bg-navy-deep` |
| Card/container | `bg-cream-dark dark:bg-navy/30` |
| Hover state | `bg-cream-dark dark:bg-navy/40` |

### Border Colors
| Purpose | Classes |
|---------|---------|
| Subtle borders | `border-navy/10 dark:border-cream/10` |
| Emphasized borders | `border-navy/20 dark:border-cream/20` |

### Forbidden Colors
**NEVER use** - not part of the design system:
- `gray-*`, `slate-*`, `zinc-*`
- `blue-*` for links (use `amber`)

---

## Table Components

### Structure
```tsx
<table className="w-full">
  <thead>
    <tr className="text-xs border-b-2 border-navy/10 dark:border-cream/10">
      <th className="px-4 py-3 text-left font-semibold text-navy-deep dark:text-cream">
        Column Header
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="text-xs">
      <td className="px-4 py-3 text-navy/80 dark:text-cream/80">
        Cell content
      </td>
    </tr>
  </tbody>
</table>
```

### Table Links
```css
text-amber hover:text-amber-light hover:underline
```

### Download/Action Buttons
```tsx
<a className="inline-flex items-center justify-center p-2 rounded-md hover:bg-cream-dark dark:hover:bg-navy/40">
  <Icon className="size-5 fill-navy dark:fill-cream" />
</a>
```

---

## Form Components

### Form Container
```css
bg-cream-dark dark:bg-navy/30
shadow-sm dark:shadow-none
rounded-lg
p-4
```

### Input Fields
Use the shared `<Input>` component from `@shared/ui/components`.

### Dropdown/Combobox
Use the shared components. Custom styling should follow:
```css
hover:bg-cream-dark dark:hover:bg-navy/40
```

---

## Accordion Components

### Icon Button
```css
size-8 p-1
rounded
transition-none
hover:bg-cream-dark dark:hover:bg-navy/40
focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber
```

---

## Dropdown Menus

### Container
Uses floating island pattern from launchpad system.

### Menu Items
```css
block w-full px-2 py-1 rounded-sm text-left
hover:bg-cream-dark dark:hover:bg-navy/40
```

### Disabled State
```css
opacity-50 cursor-not-allowed
```

### Destructive Actions
```css
hover:bg-red-100 dark:hover:bg-red-900/30
text-red-600 dark:text-red-400
```

---

## Icon Styling

### Text Icons (Phosphor, Heroicons)
```css
text-navy/70 dark:text-cream/70
```

### Fill Icons (SVGs)
```css
fill-navy dark:fill-cream
```

---

## Interactive States

### Hover
```css
hover:bg-cream-dark dark:hover:bg-navy/40
```

### Focus
```css
focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber
```

### Active/Selected
```css
bg-amber/10 dark:bg-amber/20 border-amber/30
```

### Disabled
```css
opacity-50 cursor-not-allowed
```

---

## Card Patterns

### Basic Card
```css
bg-cream/80 dark:bg-navy-deep/80
backdrop-blur-md
border border-navy/5 dark:border-cream/5
shadow-lg shadow-navy/10 dark:shadow-black/20
rounded-2xl
p-6
```

### Leaderboard Cards

**1st Place (Amber/Gold)**
```css
container: bg-gradient-to-br from-amber/20 via-amber/10 to-amber/5 border-amber/30
badge: bg-amber text-navy-deep
icon: text-amber
glow: shadow-amber/20
```

**2nd Place (Navy/Cream)**
```css
container: bg-gradient-to-br from-navy/15 via-navy/10 to-navy/5 border-navy/30
           dark:from-cream/20 dark:via-cream/15 dark:to-cream/10 dark:border-cream/30
badge: bg-navy/60 text-cream dark:bg-cream/80 dark:text-navy-deep
icon: text-navy/60 dark:text-cream/80
glow: shadow-navy/15 dark:shadow-cream/20
```

**3rd Place (Orange/Bronze)**
```css
container: bg-gradient-to-br from-orange-400/20 via-orange-300/10 to-orange-200/5 border-orange-400/30
badge: bg-orange-500 text-white
icon: text-orange-500
glow: shadow-orange-400/20
```

---

## Notification/Alert Boxes

### Warning/Info
```css
bg-amber/10 dark:bg-amber/20 border border-amber/20
```

### Error
```css
bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800
text-red-600 dark:text-red-400
```

### Success
```css
bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800
text-green-600 dark:text-green-400
```
