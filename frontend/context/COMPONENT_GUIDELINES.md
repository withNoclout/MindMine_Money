# Component Guidelines - MindMine Money

**Version:** 1.0  
**Last Updated:** 2026-01-12  
**Purpose:** Component usage and implementation guidelines

---

## Table of Contents
1. [Component Architecture](#component-architecture)
2. [Button Components](#button-components)
3. [Card Components](#card-components)
4. [Navigation Components](#navigation-components)
5. [Form Components](#form-components)
6. [Layout Components](#layout-components)
7. [Typography Components](#typography-components)
8. [Feedback Components](#feedback-components)
9. [Accessibility Guidelines](#accessibility-guidelines)
10. [Performance Guidelines](#performance-guidelines)

---

## Component Architecture

### Component Principles

#### 1. Single Responsibility
- Each component should do one thing well
- Keep components focused and maintainable
- Split complex components into smaller parts

#### 2. Composability
- Components should be composable and reusable
- Use composition over inheritance
- Flexible props for different use cases

#### 3. Consistency
- Follow established patterns
- Use design system tokens
- Maintain visual and functional consistency

#### 4. Accessibility
- All components must be accessible
- Support keyboard navigation
- Include ARIA attributes where needed

#### 5. Performance
- Optimize for rendering performance
- Use memoization where appropriate
- Lazy load when possible

### Component Structure

```tsx
// Component template
import { motion } from 'framer-motion';
import { ComponentProps } from '@/types';

interface Props extends ComponentProps {
  // Prop definitions
}

export default function Component({ 
  prop1, 
  prop2,
  className = '',
  children 
}: Props) {
  // Component logic
  
  return (
    <motion.div className={`base-class ${className}`}>
      {children}
    </motion.div>
  );
}
```

---

## Button Components

### Primary Button

#### Usage
```tsx
import Button from '@/components/Button';

<Button variant="primary" onClick={handleClick}>
  Get Started
</Button>
```

#### Props
- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `loading`: boolean
- `className`: string
- `children`: ReactNode

#### Implementation
```tsx
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold transition-all duration-300';
  
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'border-2 border-black text-black hover:bg-gray-100',
    ghost: 'text-black hover:underline'
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      {...props}
    >
      {loading && <Loader2 className="animate-spin mr-2" />}
      {children}
    </motion.button>
  );
}
```

### Button Variants

#### Primary
- Background: Black (#000000)
- Text: White (#FFFFFF)
- Hover: Gray 800 (#262626)

#### Secondary
- Background: Transparent
- Border: 2px Black (#000000)
- Text: Black (#000000)
- Hover: Gray 100 (#F5F5F5) background

#### Ghost
- Background: Transparent
- Text: Black (#000000)
- Hover: Underline

### Best Practices

1. **Use Semantic HTML**
```tsx
// ✅ Good
<Button type="submit">Submit</Button>

// ❌ Bad
<div onClick={handleSubmit}>Submit</div>
```

2. **Provide Loading States**
```tsx
// ✅ Good
<Button loading={isLoading} onClick={handleSubmit}>
  Submit
</Button>

// ❌ Bad
<Button onClick={handleSubmit}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

3. **Use Proper Button Types**
```tsx
// ✅ Good
<Button type="submit">Submit Form</Button>
<Button type="button">Cancel</Button>
<Button type="reset">Reset</Button>
```

---

## Card Components

### Base Card

#### Usage
```tsx
import Card from '@/components/Card';

<Card className="hover:shadow-lg">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
  </Card.Header>
  <Card.Body>
    Card content goes here
  </Card.Body>
</Card>
```

#### Implementation
```tsx
import { motion } from 'framer-motion';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className = '', children }: CardProps) => {
  return (
    <motion.div
      className={`bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-all ${className}`}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  );
};

Card.Header = function CardHeader({ className = '', children }: CardProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

Card.Title = function CardTitle({ className = '', children }: CardProps) {
  return <h3 className={`text-xl font-bold text-black mb-2 ${className}`}>{children}</h3>;
};

Card.Body = function CardBody({ className = '', children }: CardProps) {
  return <div className={className}>{children}</div>;
};

export default Card;
```

### Card Types

#### Feature Card
- Icon: 48x48px, black background
- Title: Bold, large
- Description: Gray text
- Hover: Lift and shadow enhancement

#### Benefit Card
- Icon: Colored or black
- Title: Bold
- List: Bullet points
- Hover: Scale and shadow

#### Stat Card
- Value: Large, bold
- Label: Gray text
- Icon: Optional
- Animation: Counter on scroll

### Best Practices

1. **Use Semantic Structure**
```tsx
// ✅ Good
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Body>Content</Card.Body>
</Card>

// ❌ Bad
<div className="card">
  <h3 className="title">Title</h3>
  <p>Content</p>
</div>
```

2. **Maintain Consistent Spacing**
```tsx
// ✅ Good - Using design tokens
<Card className="p-6 rounded-lg">

// ❌ Bad - Arbitrary values
<Card className="p-[24px] rounded-[8px]">
```

3. **Add Hover States**
```tsx
// ✅ Good - Consistent hover
<motion.div whileHover={{ y: -4 }}>

// ❌ Bad - No feedback
<div>
```

---

## Navigation Components

### Header

#### Usage
```tsx
import Header from '@/components/Header';

<Header />
```

#### Features
- Sticky positioning
- Transparent to solid background on scroll
- Mobile menu with slide animation
- Smooth scroll to sections

#### Best Practices

1. **Use Semantic Nav**
```tsx
// ✅ Good
<nav>
  <ul>
    <li><a href="#section">Section</a></li>
  </ul>
</nav>

// ❌ Bad
<div>
  <div>Section</div>
</div>
```

2. **Support Keyboard Navigation**
```tsx
// ✅ Good
<a href="#" onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
  Link
</a>
```

3. **Add ARIA Labels**
```tsx
// ✅ Good
<button aria-label="Open menu" onClick={toggleMenu}>
  <MenuIcon />
</button>
```

### Mobile Menu

#### Usage
```tsx
import { useMobileMenu } from '@/hooks/useMobileMenu';

const MobileMenu = () => {
  const { isOpen, toggle } = useMobileMenu();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed inset-0 bg-white z-50"
        >
          {/* Menu content */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

---

## Form Components

### Input

#### Usage
```tsx
import Input from '@/components/Input';

<Input
  type="email"
  placeholder="Enter your email"
  error={error}
  label="Email"
  required
/>
```

#### Implementation
```tsx
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className = '',
  ...props
}: InputProps) {
  const baseStyles = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <motion.input
        className={`${baseStyles} ${errorStyles} ${className}`}
        whileFocus={{ scale: 1.01 }}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-gray-400 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
}
```

### Best Practices

1. **Provide Labels**
```tsx
// ✅ Good
<Input label="Email" />

// ❌ Bad
<Input placeholder="Email" />
```

2. **Show Error States**
```tsx
// ✅ Good
<Input error="Invalid email" />

// ❌ Bad
<Input />
```

3. **Support Focus States**
```tsx
// ✅ Good
<input className="focus:ring-2 focus:ring-black" />

// ❌ Bad
<input />
```

---

## Layout Components

### Container

#### Usage
```tsx
import Container from '@/components/Container';

<Container className="py-12">
  {/* Content */}
</Container>
```

#### Implementation
```tsx
interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export default function Container({ className = '', children }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
```

### Grid

#### Usage
```tsx
import Grid from '@/components/Grid';

<Grid cols={3} gap={8}>
  <Grid.Item>Item 1</Grid.Item>
  <Grid.Item>Item 2</Grid.Item>
  <Grid.Item>Item 3</Grid.Item>
</Grid>
```

#### Implementation
```tsx
interface GridProps {
  cols?: number;
  gap?: number;
  className?: string;
  children: React.ReactNode;
}

const Grid = ({ 
  cols = 3, 
  gap = 8, 
  className = '', 
  children 
}: GridProps) => {
  return (
    <div 
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-${gap} ${className}`}
    >
      {children}
    </div>
  );
};

Grid.Item = function GridItem({ className = '', children }: GridProps) {
  return <div className={className}>{children}</div>;
};

export default Grid;
```

---

## Typography Components

### Heading

#### Usage
```tsx
import Heading from '@/components/Heading';

<Heading level={1} className="mb-6">
  Main Heading
</Heading>
```

#### Implementation
```tsx
interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
}

export default function Heading({ 
  level, 
  className = '', 
  children 
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const styles = {
    1: 'text-5xl font-bold tracking-tight',
    2: 'text-4xl font-bold tracking-tight',
    3: 'text-3xl font-bold tracking-tight',
    4: 'text-2xl font-bold',
    5: 'text-xl font-bold',
    6: 'text-lg font-bold'
  };
  
  return (
    <Tag className={`${styles[level]} ${className}`}>
      {children}
    </Tag>
  );
}
```

### Text

#### Usage
```tsx
import Text from '@/components/Text';

<Text variant="body" className="mb-4">
  Body text goes here
</Text>
```

#### Implementation
```tsx
interface TextProps {
  variant?: 'body' | 'lead' | 'small' | 'caption';
  className?: string;
  children: React.ReactNode;
}

export default function Text({ 
  variant = 'body', 
  className = '', 
  children 
}: TextProps) {
  const styles = {
    body: 'text-base text-gray-600 leading-relaxed',
    lead: 'text-lg text-gray-600 leading-relaxed',
    small: 'text-sm text-gray-600',
    caption: 'text-xs text-gray-400'
  };
  
  return (
    <p className={`${styles[variant]} ${className}`}>
      {children}
    </p>
  );
}
```

---

## Feedback Components

### Toast

#### Usage
```tsx
import { useToast } from '@/hooks/useToast';

const { showToast } = useToast();

const handleClick = () => {
  showToast({
    message: 'Action completed successfully',
    type: 'success'
  });
};
```

### Modal

#### Usage
```tsx
import Modal from '@/components/Modal';

<Modal isOpen={isOpen} onClose={closeModal}>
  <Modal.Header>
    <Modal.Title>Modal Title</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Modal content
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={closeModal}>Close</Button>
  </Modal.Footer>
</Modal>
```

---

## Accessibility Guidelines

### General Rules

1. **Semantic HTML**
```tsx
// ✅ Good
<nav> <button> <input type="submit">

// ❌ Bad
<div> <span> <div>
```

2. **Keyboard Navigation**
```tsx
// ✅ Good
<button onClick={handleClick} tabIndex={0}>
<button onKeyDown={(e) => e.key === 'Enter' && handleClick()}>

// ❌ Bad
<div onClick={handleClick}>
```

3. **ARIA Labels**
```tsx
// ✅ Good
<button aria-label="Close modal" onClick={closeModal}>
  <XIcon />
</button>

// ❌ Bad
<button onClick={closeModal}>
  <XIcon />
</button>
```

4. **Focus Management**
```tsx
// ✅ Good
<input className="focus:ring-2 focus:ring-black" />
<button className="focus:ring-2 focus:ring-black" />

// ❌ Bad
<input />
<button />
```

5. **Alt Text for Images**
```tsx
// ✅ Good
<img src="image.jpg" alt="Description of image" />
<img src="icon.svg" alt="" aria-hidden="true" />

// ❌ Bad
<img src="image.jpg" />
<img src="icon.svg" />
```

### Component-Specific Guidelines

#### Buttons
- Must be `<button>` elements
- Include `aria-label` if text-only icon
- Support keyboard activation
- Show visible focus state

#### Links
- Use `<a>` with `href`
- Indicate external links
- Describe link purpose
- Skip for action-only items

#### Forms
- All inputs have labels
- Error messages associated with inputs
- Submit buttons clearly labeled
- Form validation feedback

#### Modals
- Focus trapped inside modal
- Escape key closes modal
- Focus returns to trigger on close
- Background click closes modal

---

## Performance Guidelines

### Component Optimization

1. **Use React.memo**
```tsx
// ✅ Good
export default React.memo(Component);

// ❌ Bad
export default Component;
```

2. **Use useCallback**
```tsx
// ✅ Good
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);

// ❌ Bad
const handleClick = () => {
  // Handler logic
};
```

3. **Lazy Load Components**
```tsx
// ✅ Good
const HeavyComponent = dynamic(() => import('./HeavyComponent'));

// ❌ Bad
import HeavyComponent from './HeavyComponent';
```

4. **Code Splitting**
```tsx
// ✅ Good
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('./Modal'), {
  loading: () => <LoadingSpinner />
});

// ❌ Bad
import Modal from './Modal';
```

### Animation Performance

1. **Use GPU Properties**
```tsx
// ✅ Good
<motion.div animate={{ x: 100, scale: 1.1, opacity: 1 }} />

// ❌ Bad
<motion.div animate={{ left: 100, width: 200, height: 200 }} />
```

2. **Avoid Layout Thrashing**
```tsx
// ✅ Good
const [offset, setOffset] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    requestAnimationFrame(() => {
      setOffset(window.scrollY);
    });
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// ❌ Bad
useEffect(() => {
  const handleScroll = () => {
    document.body.style.transform = `translateY(${window.scrollY}px)`;
  };
  window.addEventListener('scroll', handleScroll);
}, []);
```

3. **Use will-change Sparingly**
```tsx
// ✅ Good
<motion.div style={{ willChange: 'transform' }} />

// ❌ Bad
<div style={{ willChange: 'transform, opacity, width, height' }}>
```

---

## Best Practices Summary

### Do's

1. ✅ Use semantic HTML
2. ✅ Follow design system
3. ✅ Make components reusable
4. ✅ Add proper types
5. ✅ Include accessibility attributes
6. ✅ Optimize for performance
7. ✅ Write clear prop names
8. ✅ Document components
9. ✅ Test on multiple devices
10. ✅ Use consistent spacing

### Don'ts

1. ❌ Use arbitrary values
2. ❌ Ignore accessibility
3. ❌ Create tightly coupled components
4. ❌ Skip keyboard navigation
5. ❌ Use inline styles
6. ❌ Forget error handling
7. ❌ Over-optimize early
8. ❌ Mix concerns
9. ❌ Skip documentation
10. ❌ Ignore performance

---

**Component Guidelines Version:** 1.0  
**Last Updated:** 2026-01-12  
**Maintained By:** Frontend Team
