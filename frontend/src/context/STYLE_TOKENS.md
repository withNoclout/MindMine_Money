# Style Tokens - MindMine Money

**Version:** 1.0  
**Last Updated:** 2026-01-12  
**Purpose:** Centralized design tokens for consistent styling

---

## Overview

This document contains all style tokens used in the MindMine Money design system. These tokens are implemented as CSS custom properties and can be used directly in your code or referenced via Tailwind utility classes.

---

## Color Tokens

### Primary Colors

```css
:root {
  --color-black: #000000;
  --color-white: #FFFFFF;
}
```

### Gray Scale

```css
:root {
  --color-gray-50:  #FAFAFA;
  --color-gray-100: #F5F5F5;
  --color-gray-200: #E5E5E5;
  --color-gray-300: #D4D4D4;
  --color-gray-400: #A3A3A3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;
}
```

### Accent Colors

```css
:root {
  --color-accent-light: rgba(0, 0, 0, 0.03);
  --color-accent-medium: rgba(0, 0, 0, 0.08);
  --color-accent-dark: rgba(0, 0, 0, 0.95);
}
```

### Semantic Colors

```css
:root {
  --color-primary: #000000;
  --color-secondary: #525252;
  --color-muted: #A3A3A3;
  --color-border: #E5E5E5;
  --color-background: #FFFFFF;
  --color-background-secondary: #FAFAFA;
  --color-text: #525252;
  --color-text-secondary: #A3A3A3;
}
```

---

## Typography Tokens

### Font Families

```css
:root {
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
}
```

### Font Sizes

```css
:root {
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */
  --text-5xl:  3rem;      /* 48px */
  --text-6xl:  3.75rem;   /* 60px */
  --text-7xl:  4.5rem;    /* 72px */
}
```

### Font Weights

```css
:root {
  --font-light:    300;
  --font-regular:  400;
  --font-medium:   500;
  --font-semibold: 600;
  --font-bold:     700;
  --font-black:    900;
}
```

### Line Heights

```css
:root {
  --leading-none:    1;
  --leading-tight:   1.25;
  --leading-snug:   1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose:   2;
}
```

### Letter Spacing

```css
:root {
  --tracking-tighter: -0.05em;
  --tracking-tight:   -0.025em;
  --tracking-normal:  0;
  --tracking-wide:    0.025em;
  --tracking-wider:   0.05em;
  --tracking-widest:  0.1em;
}
```

---

## Spacing Tokens

### Scale (Base Unit: 4px)

```css
:root {
  --space-0:   0;
  --space-1:   0.25rem;  /* 4px */
  --space-2:   0.5rem;   /* 8px */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1rem;     /* 16px */
  --space-5:   1.25rem;  /* 20px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-10:  2.5rem;   /* 40px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-20:  5rem;     /* 80px */
  --space-24:  6rem;     /* 96px */
  --space-32:  8rem;     /* 128px */
  --space-40:  10rem;    /* 160px */
  --space-48:  12rem;    /* 192px */
}
```

---

## Layout Tokens

### Container Widths

```css
:root {
  --container-sm:  640px;
  --container-md:  768px;
  --container-lg:  1024px;
  --container-xl:  1280px;
  --container-2xl: 1536px;
}
```

### Breakpoints

```css
:root {
  --breakpoint-mobile:     320px;
  --breakpoint-mobile-lg:  480px;
  --breakpoint-tablet:     640px;
  --breakpoint-tablet-lg:  1024px;
  --breakpoint-desktop:    1280px;
  --breakpoint-wide:      1536px;
}
```

---

## Border Radius Tokens

```css
:root {
  --radius-none:  0;
  --radius-sm:   0.125rem;  /* 2px */
  --radius-base: 0.25rem;   /* 4px */
  --radius-md:   0.5rem;    /* 8px */
  --radius-lg:   0.75rem;   /* 12px */
  --radius-xl:   1rem;      /* 16px */
  --radius-2xl:  1.5rem;    /* 24px */
  --radius-full: 9999px;
}
```

---

## Shadow Tokens

### Elevation System

```css
:root {
  --shadow-sm:   0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow:      0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md:   0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg:   0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl:   0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-2xl:  0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}
```

### Shadow Colors

```css
:root {
  --shadow-color-black: rgba(0, 0, 0, 0.15);
  --shadow-color-medium: rgba(0, 0, 0, 0.1);
  --shadow-color-light: rgba(0, 0, 0, 0.05);
}
```

---

## Transition Tokens

### Durations

```css
:root {
  --duration-fast:   150ms;
  --duration-base:   300ms;
  --duration-slow:   500ms;
  --duration-slower: 700ms;
}
```

### Timing Functions

```css
:root {
  --ease-linear:    cubic-bezier(0, 0, 1, 1);
  --ease-in:        cubic-bezier(0.4, 0, 1, 1);
  --ease-out:       cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-smooth:    cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-bounce:    cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Default Transitions

```css
:root {
  --transition-fast:   all var(--duration-fast) var(--ease-out);
  --transition-base:   all var(--duration-base) var(--ease-out);
  --transition-slow:   all var(--duration-slow) var(--ease-out);
  --transition-color:  color var(--duration-base) var(--ease-out);
  --transition-transform: transform var(--duration-base) var(--ease-out);
  --transition-shadow:  box-shadow var(--duration-base) var(--ease-out);
}
```

---

## Z-Index Scale

```css
:root {
  --z-0:   0;
  --z-10:  10;
  --z-20:  20;
  --z-30:  30;
  --z-40:  40;
  --z-50:  50;
  --z-auto: auto;
}
```

### Z-Index Usage

| Level | Value | Usage |
|-------|-------|-------|
| z-0 | 0 | Default layer |
| z-10 | 10 | Dropdowns, tooltips |
| z-20 | 20 | Sticky header |
| z-30 | 30 | Fixed modals |
| z-40 | 40 | Popovers |
| z-50 | 50 | Highest priority |

---

## Animation Tokens

### Keyframe Animations

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

### Animation Durations

```css
:root {
  --anim-duration-fast:   0.15s;
  --anim-duration-base:   0.3s;
  --anim-duration-slow:   0.5s;
  --anim-duration-slower: 0.7s;
}
```

---

## Grid Pattern Tokens

```css
:root {
  --grid-size-desktop: 40px;
  --grid-size-tablet:  30px;
  --grid-size-mobile:  20px;
  --grid-line-color:   #E5E5E5;
  --grid-line-opacity: 1;
}
```

---

## Component Tokens

### Button Tokens

```css
:root {
  --button-padding-y:       var(--space-3);
  --button-padding-x:       var(--space-6);
  --button-font-size:       var(--text-base);
  --button-font-weight:    var(--font-semibold);
  --button-border-radius:  var(--radius-base);
  --button-transition:     var(--transition-base);
}
```

### Card Tokens

```css
:root {
  --card-padding:        var(--space-6);
  --card-border-radius:  var(--radius-lg);
  --card-shadow:         var(--shadow-sm);
  --card-shadow-hover:   var(--shadow-md);
  --card-transition:     var(--transition-base);
}
```

### Input Tokens

```css
:root {
  --input-padding-y:       var(--space-3);
  --input-padding-x:       var(--space-4);
  --input-font-size:       var(--text-base);
  --input-border-radius:  var(--radius-lg);
  --input-border-color:    var(--color-gray-300);
  --input-border-focus:    var(--color-black);
}
```

### Navigation Tokens

```css
:root {
  --nav-padding-y:       var(--space-6);
  --nav-padding-x:       var(--space-8);
  --nav-link-font-size:  var(--text-base);
  --nav-link-font-weight: var(--font-medium);
}
```

---

## Usage in CSS

### Direct Usage

```css
.my-element {
  color: var(--color-black);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  transition: var(--transition-base);
}
```

### Fallback Values

```css
.my-element {
  color: var(--color-black, #000000);
  padding: var(--space-4, 1rem);
}
```

### Computed Values

```css
.my-element {
  padding: calc(var(--space-4) * 2);
  margin: var(--space-4) var(--space-8);
}
```

---

## Usage in Tailwind

### Tailwind Config Integration

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        black: 'var(--color-black)',
        white: 'var(--color-white)',
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
      },
      spacing: {
        '0': 'var(--space-0)',
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
        '32': 'var(--space-32)',
        '40': 'var(--space-40)',
        '48': 'var(--space-48)',
      },
      borderRadius: {
        'none': 'var(--radius-none)',
        'sm': 'var(--radius-sm)',
        'base': 'var(--radius-base)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'inner': 'var(--shadow-inner)',
      },
    },
  },
};
```

---

## Responsive Design Tokens

### Breakpoint Tokens

```css
:root {
  --screen-mobile:    'min-width: 320px';
  --screen-mobile-lg: 'min-width: 480px';
  --screen-tablet:    'min-width: 640px';
  --screen-tablet-lg: 'min-width: 1024px';
  --screen-desktop:   'min-width: 1280px';
  --screen-wide:      'min-width: 1536px';
}
```

---

## Accessibility Tokens

```css
:root {
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-color: var(--color-black);
  --min-touch-target: 44px;
}
```

---

## Best Practices

### 1. Use Tokens Consistently
```css
/* ✅ Good */
.button {
  padding: var(--button-padding-y) var(--button-padding-x);
}

/* ❌ Bad */
.button {
  padding: 12px 24px;
}
```

### 2. Compose Tokens
```css
/* ✅ Good */
.card {
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  box-shadow: var(--card-shadow);
}

/* ❌ Bad */
.card {
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}
```

### 3. Provide Fallbacks
```css
/* ✅ Good */
.text {
  color: var(--color-black, #000000);
}

/* ❌ Bad */
.text {
  color: var(--color-black);
}
```

### 4. Avoid Hardcoding Values
```css
/* ✅ Good */
.container {
  max-width: var(--container-xl);
  padding: var(--space-8);
}

/* ❌ Bad */
.container {
  max-width: 1280px;
  padding: 32px;
}
```

---

## Migration Guide

### When to Update Tokens

1. **New Design Requirements**: Add new tokens for new design patterns
2. **Consistency Issues**: Consolidate similar values into tokens
3. **Performance**: Use CSS custom properties for dynamic theming
4. **Maintainability**: Reduce hardcoded values throughout codebase

### Token Naming Conventions

- Use `--category-name` format
- Be descriptive but concise
- Use semantic names (e.g., `--color-text` not `--color-dark-gray`)
- Group related tokens (e.g., `--space-0` through `--space-48`)

---

**Style Tokens Version:** 1.0  
**Last Updated:** 2026-01-12  
**Maintained By:** Frontend Team
