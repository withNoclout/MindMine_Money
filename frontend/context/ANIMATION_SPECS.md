# Animation Specifications - MindMine Money

**Version:** 1.0  
**Last Updated:** 2026-01-12  
**Purpose:** Comprehensive animation guidelines and specifications

---

## Table of Contents
1. [Animation Principles](#animation-principles)
2. [Animation Types](#animation-types)
3. [Framer Motion Configurations](#framer-motion-configurations)
4. [Component Animations](#component-animations)
5. [Performance Guidelines](#performance-guidelines)
6. [Accessibility Considerations](#accessibility-considerations)

---

## Animation Principles

### 1. Purpose Over Decoration
- Animations should serve a functional purpose
- Guide user attention to important elements
- Provide feedback on user actions
- Create smooth transitions between states

### 2. Respect User Preferences
- Always check for `prefers-reduced-motion`
- Provide alternatives for users who disable animations
- Don't rely on animations for critical information

### 3. Performance First
- Use CSS transforms and opacity (GPU-accelerated)
- Avoid animating layout properties (width, height, top, left)
- Keep animation duration under 500ms for interactions
- Use `will-change` sparingly

### 4. Consistency
- Use consistent easing functions
- Maintain uniform durations for similar interactions
- Follow established timing patterns
- Keep animation styles cohesive

### 5. Subtlety
- Animations should enhance, not distract
- Use smooth, natural motion
- Avoid overly dramatic effects
- Test for motion sickness triggers

---

## Animation Types

### Page Load Animations

#### Fade In
```javascript
{
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
}
```

**Usage:**
- Page content reveal
- Section entrance
- Component loading

**Duration:** 0.6s  
**Easing:** easeOut  
**Trigger:** On mount

#### Slide Up
```javascript
{
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}
```

**Usage:**
- Content sections
- Card entrances
- List items

**Duration:** 0.6s  
**Easing:** easeOut  
**Distance:** 30px

#### Slide Down
```javascript
{
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}
```

**Usage:**
- Dropdown menus
- Modals
- Headers

**Duration:** 0.6s  
**Easing:** easeOut  
**Distance:** 30px

### Scroll Animations

#### While In View
```javascript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
/>
```

**Usage:**
- Section reveals
- Card grids
- Feature lists

**Viewport Margin:** -100px (triggers before element fully visible)  
**Trigger:** Once only  
**Duration:** 0.6s

#### Staggered Reveal
```javascript
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }}
>
  {children.map((child, i) => (
    <motion.div key={i} variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    }} />
  ))}
</motion.div>
```

**Usage:**
- Grid layouts
- List items
- Feature cards

**Stagger Delay:** 0.1s per item  
**Initial Delay:** 0.2s

### Hover Animations

#### Scale Up
```javascript
{
  whileHover: { scale: 1.02 },
  transition: { duration: 0.3, ease: "easeOut" }
}
```

**Usage:**
- Buttons
- Cards
- Interactive elements

**Scale:** 1.02 (2%)  
**Duration:** 0.3s

#### Lift Up
```javascript
{
  whileHover: { y: -4 },
  transition: { duration: 0.3, ease: "easeOut" }
}
```

**Usage:**
- Cards
- Navigation items
- Buttons

**Distance:** -4px  
**Duration:** 0.3s

#### Shadow Enhancement
```javascript
{
  whileHover: { boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
  transition: { duration: 0.3, ease: "easeOut" }
}
```

**Usage:**
- Cards
- Buttons
- Containers

**Shadow:** lg elevation  
**Duration:** 0.3s

### Click Animations

#### Press Down
```javascript
{
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15, ease: "easeInOut" }
}
```

**Usage:**
- Buttons
- Interactive cards
- Tappable elements

**Scale:** 0.98 (2%)  
**Duration:** 0.15s

#### Ripple Effect
```javascript
const buttonVariants = {
  tap: { scale: 0.98 },
  hover: { scale: 1.02 }
};
```

**Usage:**
- Primary buttons
- Action buttons

---

## Framer Motion Configurations

### Common Variants

#### Fade Variants
```javascript
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
```

#### Slide Variants
```javascript
const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
```

#### Scale Variants
```javascript
const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};
```

### Stagger Patterns

#### Grid Stagger
```javascript
const staggerGrid = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
};
```

**Usage:**
```tsx
<motion.div
  variants={staggerGrid.container}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map(item => (
    <motion.div key={item.id} variants={staggerGrid.item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## Component Animations

### Hero Section

#### Headline Reveal
```javascript
const heroTitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.3
    }
  }
};
```

#### Floating Elements
```javascript
const floatingVariants = {
  floating: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
```

**Usage:**
```tsx
<motion.div
  variants={floatingVariants}
  animate="floating"
  className="absolute top-20 right-20"
>
  <CircleIcon />
</motion.div>
```

### How It Works

#### Step Reveal
```javascript
const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
```

#### Connection Line Animation
```javascript
const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1, ease: "easeOut" },
      opacity: { duration: 0.6 }
    }
  }
};
```

**Usage:**
```tsx
<svg className="absolute">
  <motion.path
    d="M0 0 H100"
    variants={lineVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    stroke="#E5E5E5"
    strokeWidth="2"
  />
</svg>
```

### Cards

#### Card Entrance
```javascript
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};
```

#### Card Hover
```javascript
{
  whileHover: { 
    y: -4,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
  whileTap: { scale: 0.98 }
}
```

### Statistics Counter

#### Counter Animation
```javascript
const CounterAnimation = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        count: value,
        transition: { duration: 2, ease: "easeOut" }
      });
    }
  }, [isInView, value, controls]);

  return (
    <motion.div ref={ref}>
      <motion.span animate={controls}>
        {useTransform(controls.count, (latest) => Math.round(latest))}
      </motion.span>
      {suffix}
    </motion.div>
  );
};
```

**Usage:**
```tsx
<CounterAnimation value={70} suffix="%" />
```

### Navigation

#### Header Scroll Transition
```javascript
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        boxShadow: scrolled ? "0 1px 3px 0 rgba(0, 0, 0, 0.1)" : "none"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Header content */}
    </motion.header>
  );
};
```

### Modal

#### Modal Open/Close
```javascript
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};
```

**Usage:**
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Modal content */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## Performance Guidelines

### 1. Use CSS Transforms
```javascript
// ✅ Good - GPU accelerated
<motion.div animate={{ x: 100, scale: 1.1 }} />

// ❌ Bad - Triggers layout
<motion.div animate={{ left: 100, width: 200 }} />
```

### 2. Use will-change Sparingly
```javascript
// ✅ Good - Only for elements that will animate
<motion.div 
  style={{ willChange: 'transform' }}
  animate={{ x: 100 }}
/>

// ❌ Bad - Don't apply to everything
<div style={{ willChange: 'transform, opacity, width, height' }}>
```

### 3. Debounce Scroll Handlers
```javascript
useEffect(() => {
  let timeoutId;
  const handleScroll = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // Scroll logic
    }, 100);
  };
  window.addEventListener('scroll', handleScroll);
  return () => {
    clearTimeout(timeoutId);
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

### 4. Use GPU Acceleration
```javascript
// Force GPU layer
<motion.div 
  style={{ transform: 'translateZ(0)' }}
  animate={{ x: 100 }}
/>
```

### 5. Lazy Load Animations
```javascript
// Only animate when in viewport
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-100px" }}
>
  {/* Content */}
</motion.div>
```

---

## Accessibility Considerations

### 1. Respect prefers-reduced-motion

```javascript
import { useReducedMotion } from 'framer-motion';

const AnimatedComponent = () => {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion ? {} : {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {/* Content */}
    </motion.div>
  );
};
```

### 2. Provide Fallbacks
```javascript
const AnimatedWrapper = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};
```

### 3. Avoid Dizziness Triggers
- Avoid fast, repetitive animations
- Don't use large-scale transforms
- Keep animation durations reasonable
- Test with motion sensitivity settings

### 4. Focus Management
```javascript
<motion.button
  whileFocus={{ scale: 1.02, outline: "2px solid black" }}
  onFocus={() => console.log('Focused')}
>
  Button
</motion.button>
```

---

## Animation Timing Reference

### Durations

| Duration | Value | Usage |
|----------|-------|-------|
| Fast | 150ms | Click/active states |
| Base | 300ms | Hover states, transitions |
| Slow | 500ms | Section reveals |
| Slower | 700ms | Page transitions |

### Easing Functions

| Name | Curve | Usage |
|------|-------|-------|
| linear | cubic-bezier(0, 0, 1, 1) | Loading spinners |
| easeIn | cubic-bezier(0.4, 0, 1, 1) | Exits |
| easeOut | cubic-bezier(0, 0, 0.2, 1) | Entrances, hover |
| easeInOut | cubic-bezier(0.4, 0, 0.2, 1) | Smooth transitions |
| smooth | cubic-bezier(0.25, 0.46, 0.45, 0.94) | Subtle movements |

### Delays

| Type | Value | Usage |
|------|-------|-------|
| None | 0ms | Immediate |
| Short | 100ms | Sequential items |
| Medium | 200ms | Section delays |
| Long | 300ms+ | Page transitions |

---

## Best Practices

### 1. Test on Low-End Devices
```javascript
// Detect low-end devices
const isLowEnd = () => {
  return navigator.hardwareConcurrency < 4 || 
         /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

// Reduce animations on low-end devices
const animationDuration = isLowEnd() ? 0.3 : 0.6;
```

### 2. Use RequestAnimationFrame
```javascript
useEffect(() => {
  let animationFrameId;

  const animate = () => {
    // Animation logic
    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}, []);
```

### 3. Clean Up Animations
```javascript
useEffect(() => {
  const controls = animate(...);
  
  return () => {
    controls.stop();
  };
}, []);
```

### 4. Monitor Performance
```javascript
useEffect(() => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 50) {
        console.warn('Long animation:', entry);
      }
    });
  });

  observer.observe({ entryTypes: ['measure'] });

  return () => observer.disconnect();
}, []);
```

---

**Animation Specifications Version:** 1.0  
**Last Updated:** 2026-01-12  
**Maintained By:** Frontend Team
