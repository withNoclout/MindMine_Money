# MindMine Money Design System

**Version:** 1.0  
**Last Updated:** 2026-01-12  
**Status:** Active

## Table of Contents
1. [Design Principles](#design-principles)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Layout & Grid](#layout--grid)
6. [Components](#components)
7. [Accessibility](#accessibility)
8. [Usage Guidelines](#usage-guidelines)

---

## Design Principles

### 1. Elegant Minimalism
- Clean, purposeful design with no unnecessary elements
- Every element serves a functional purpose
- Whitespace is a design element, not empty space

### 2. Intentional Motion
- Animations enhance, not distract
- Smooth, natural transitions
- Respect user preferences (prefers-reduced-motion)

### 3. Visual Hierarchy
- Clear information architecture
- Scale and spacing guide the eye
- Content prioritized by importance

### 4. Attention to Detail
- Polished interactions and refined states
- Consistent spacing and alignment
- Thoughtful micro-interactions

### 5. Performance First
- Beautiful without compromising speed
- Optimized for all devices
- Progressive enhancement

---

## Color Palette

### Primary Colors

| Color | Value | Usage | Example |
|-------|-------|-------|---------|
| Black | `#000000` | Primary text, buttons, backgrounds | Headlines, CTAs |
| White | `#FFFFFF` | Backgrounds, text on dark | Page background, cards |

### Gray Scale (Semantic)

| Color | Value | Usage |
|-------|-------|-------|
| Gray 50 | `#FAFAFA` | Backgrounds, light sections |
| Gray 100 | `#F5F5F5` | Secondary backgrounds |
| Gray 200 | `#E5E5E5` | Borders, dividers, grid lines |
| Gray 300 | `#D4D4D4` | Disabled states |
| Gray 400 | `#A3A3A3` | Secondary text, captions |
| Gray 500 | `#737373` | Tertiary text, placeholders |
| Gray 600 | `#525252` | Body text |
| Gray 700 | `#404040` | Subheadings, emphasis |
| Gray 800 | `#262626` | Dark backgrounds |
| Gray 900 | `#171717` | Darkest backgrounds |

### Accents (Subtle)

| Color | Value | Usage |
|-------|-------|-------|
| Accent Light | `rgba(0, 0, 0, 0.03)` | Subtle backgrounds, overlays |
| Accent Medium | `rgba(0, 0, 0, 0.08)` | Hover states |
| Accent Dark | `rgba(0, 0, 0, 0.95)` | Deep blacks |

### Color Usage Guidelines

#### Text Colors
- **Primary Text**: Black (#000000) or Gray 600 (#525252)
- **Secondary Text**: Gray 400 (#A3A3A3)
- **Disabled Text**: Gray 300 (#D4D4D4)
- **Links**: Black (#000000) with underline on hover

#### Background Colors
- **Primary Background**: White (#FFFFFF)
- **Secondary Background**: Gray 50 (#FAFAFA) or Gray 100 (#F5F5F5)
- **Section Backgrounds**: Alternate between White and Gray 50

#### Border Colors
- **Default**: Gray 200 (#E5E5E5)
- **Hover**: Black (#000000) or Gray 400 (#A3A3A3)
- **Focus**: Black (#000000)

#### Button Colors
- **Primary Button**: Black (#000000) background, White (#FFFFFF) text
- **Secondary Button**: Transparent, Black (#000000) border
- **Hover**: Gray 800 (#262626) background
- **Disabled**: Gray 300 (#D4D4D4)

---

## Typography

### Font Families

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
```

### Type Scale

| Size | Value | Usage | Line Height |
|------|-------|-------|-------------|
| xs | 12px | Captions, labels | 1.5 |
| sm | 14px | Secondary text, buttons | 1.5 |
| base | 16px | Body text | 1.6 |
| lg | 18px | Lead paragraphs | 1.6 |
| xl | 20px | Subheadings | 1.4 |
| 2xl | 24px | Small section headings | 1.3 |
| 3xl | 30px | Section headings | 1.2 |
| 4xl | 36px | Large headings | 1.2 |
| 5xl | 48px | Hero headings | 1.1 |
| 6xl | 60px | Display headings | 1.1 |
| 7xl | 72px | Extra large | 1.1 |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Display, decorative (rare) |
| Regular | 400 | Body text, paragraphs |
| Medium | 500 | Emphasis, subtitles |
| Semibold | 600 | Subheadings, navigation |
| Bold | 700 | Headings, titles |
| Black | 900 | Display, hero (rare) |

### Letter Spacing

| Value | Usage |
|-------|-------|
| -0.05em | Large display text (tighter) |
| -0.025em | Headings (tight) |
| 0 | Body text, headings (normal) |
| 0.025em | Subheadings, emphasis |
| 0.05em | Small text, labels |
| 0.1em | All caps, labels |

### Typography Guidelines

#### Headings
- Use Bold (700) for headings
- Tight letter spacing (-0.025em) for large headings
- Adequate margin above (32-48px) and below (16-24px)
- Limit to one h1 per page

#### Body Text
- Use Regular (400) weight
- Line height 1.6 for readability
- Maximum width 65-75 characters per line
- Use paragraphs to break up text

#### Navigation
- Use Semibold (600) for navigation items
- Medium (500) for active states
- Regular (400) for breadcrumbs

#### Buttons
- Uppercase text
- Semibold (600) weight
- Letter spacing 0.05em
- Minimum height 44px for touch

---

## Spacing System

### Scale (Base Unit: 4px)

| Token | Value | Usage |
|-------|-------|-------|
| space-0 | 0px | Remove spacing |
| space-1 | 4px | Tiny gaps, icon padding |
| space-2 | 8px | Small padding, gaps |
| space-3 | 12px | Button padding, small margins |
| space-4 | 16px | Default padding, margins |
| space-5 | 20px | Medium padding |
| space-6 | 24px | Section margins, card padding |
| space-8 | 32px | Large padding, section gaps |
| space-10 | 40px | Extra large padding |
| space-12 | 48px | Section spacing |
| space-16 | 64px | Large section gaps |
| space-20 | 80px | Hero spacing |
| space-24 | 96px | Extra large spacing |
| space-32 | 128px | Page margins (desktop) |
| space-40 | 160px | Extra large margins |
| space-48 | 192px | Maximum spacing |

### Spacing Guidelines

#### Component Padding
- **Cards**: space-6 (24px)
- **Buttons**: space-3 (12px) vertical, space-6 (24px) horizontal
- **Inputs**: space-3 (12px) vertical, space-4 (16px) horizontal
- **Modals**: space-8 (32px)

#### Margins
- **Section vertical**: space-16 (64px) to space-24 (96px)
- **Paragraph**: space-4 (16px) bottom
- **List items**: space-2 (8px) bottom
- **Between sections**: space-20 (80px) to space-32 (128px)

#### Gaps
- **Grid columns**: space-6 (24px) to space-8 (32px)
- **Flex items**: space-4 (16px) to space-6 (24px)
- **Form fields**: space-4 (16px)

---

## Layout & Grid

### Container Sizes

| Breakpoint | Max Width | Usage |
|------------|-----------|-------|
| Mobile | 100% | Full width |
| Tablet | 640px | Centered content |
| Desktop | 1024px | Standard container |
| Wide | 1280px | Large container |
| Ultra | 1536px | Maximum container |

### Breakpoints

| Name | Value | Usage |
|------|-------|-------|
| mobile | 320px | Small phones |
| mobileLarge | 480px | Large phones |
| tablet | 640px | Tablets |
| tabletLarge | 1024px | Large tablets, small desktops |
| desktop | 1280px | Desktops |
| wide | 1536px | Large desktops |

### Grid System

#### Column Grid
- 12-column grid system
- Gutters: 24px (space-6)
- Margins: auto (centered)

#### Usage Examples
```tsx
// Mobile: 1 column
<div className="grid grid-cols-1 gap-6">

// Tablet: 2 columns
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// Custom: 4 columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

---

## Components

### Buttons

#### Primary Button
```tsx
<button className="px-6 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300">
  Button Text
</button>
```

**Specs:**
- Background: Black (#000000)
- Text: White (#FFFFFF)
- Padding: 12px vertical, 24px horizontal
- Weight: Semibold (600)
- Border Radius: 4px (radius-base)
- Hover: Darken background, slight lift

#### Secondary Button
```tsx
<button className="px-6 py-3 border-2 border-black text-black font-semibold hover:bg-gray-100 transition-all duration-300">
  Button Text
</button>
```

**Specs:**
- Background: Transparent
- Border: 2px Black (#000000)
- Text: Black (#000000)
- Padding: 12px vertical, 24px horizontal
- Weight: Semibold (600)
- Border Radius: 4px (radius-base)
- Hover: Gray 100 background

#### Ghost Button
```tsx
<button className="px-6 py-3 text-black font-semibold hover:underline transition-all duration-200">
  Button Text
</button>
```

**Specs:**
- Background: Transparent
- Text: Black (#000000)
- Padding: 12px vertical, 24px horizontal
- Weight: Semibold (600)
- Hover: Underline

### Cards

#### Base Card
```tsx
<div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
  {/* Card content */}
</div>
```

**Specs:**
- Background: White (#FFFFFF)
- Border: 1px Gray 200 (#E5E5E5)
- Padding: 24px (space-6)
- Border Radius: 8px (radius-lg)
- Shadow: Subtle (shadow-sm)
- Hover: Enhanced shadow (shadow-md)

#### Glassmorphism Card
```tsx
<div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 p-6 rounded-lg">
  {/* Card content */}
</div>
```

**Specs:**
- Background: White with 80% opacity
- Backdrop blur: Small (4px)
- Border: 1px Gray 200 with 50% opacity
- Padding: 24px (space-6)
- Border Radius: 8px (radius-lg)

### Inputs

#### Text Input
```tsx
<input 
  type="text" 
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
  placeholder="Enter text"
/>
```

**Specs:**
- Width: 100%
- Padding: 12px vertical, 16px horizontal
- Border: 1px Gray 300 (#D4D4D4)
- Border Radius: 8px (radius-lg)
- Focus: 2px Black ring, outline removed

### Navigation

#### Desktop Navigation
```tsx
<nav className="flex items-center justify-between px-8 py-6">
  {/* Logo */}
  {/* Navigation links */}
  {/* CTA buttons */}
</nav>
```

**Specs:**
- Padding: 24px vertical, 32px horizontal
- Background: White (transparent to solid on scroll)
- Links: Semibold (600), regular spacing
- Hover: Gray 600, underline

---

## Accessibility

### Color Contrast
- Minimum contrast ratio: 4.5:1 (AA)
- Target contrast ratio: 7:1 (AAA)
- All interactive elements meet AA standard

### Focus States
- Visible 2px black outline ring
- Offset: 2px
- Smooth transition

### Keyboard Navigation
- All interactive elements accessible via Tab
- Logical tab order
- Skip to main content link

### Screen Readers
- Semantic HTML structure
- ARIA labels for icons
- Alt text for images
- Live regions for dynamic content

### Motion Preferences
- Respect prefers-reduced-motion
- Provide alternatives for animations
- Test with motion disabled

---

## Usage Guidelines

### When to Use Black vs. Gray
- **Black**: Primary text, headings, CTAs, interactive elements
- **Gray**: Secondary text, descriptions, placeholders, borders

### When to Use Spacing
- **space-2-4**: Small components, tight layouts
- **space-6-8**: Standard spacing, cards, padding
- **space-12+**: Section spacing, major divisions

### When to Use Font Weights
- **Regular**: Body text, paragraphs
- **Semibold**: Navigation, buttons, emphasis
- **Bold**: Headings, titles

### When to Use Animations
- **Always**: Page load, scroll triggers, hover states
- **Never**: For decorative purposes only
- **Respect**: User preferences for reduced motion

---

## Examples

### Hero Section
```tsx
<section className="min-h-screen flex items-center justify-center bg-white">
  <div className="max-w-4xl px-8 text-center">
    <h1 className="text-5xl font-bold text-black mb-6">
      Transform Education with AI
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Fair compensation for educators. Affordable learning for students.
    </p>
    <div className="flex gap-4 justify-center">
      <button className="px-8 py-4 bg-black text-white font-semibold">
        Get Started
      </button>
      <button className="px-8 py-4 border-2 border-black text-black font-semibold">
        Learn More
      </button>
    </div>
  </div>
</section>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-12">
  <div className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-all">
    <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4">
      <Icon />
    </div>
    <h3 className="text-xl font-bold text-black mb-2">Card Title</h3>
    <p className="text-gray-600">Card description goes here.</p>
  </div>
</div>
```

---

**Design System Version:** 1.0  
**Last Updated:** 2026-01-12  
**Maintained By:** Frontend Team
