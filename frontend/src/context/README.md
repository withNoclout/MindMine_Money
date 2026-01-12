# Context Documentation - MindMine Money Frontend

**Last Updated:** 2026-01-12  
**Purpose:** Central documentation for design system, animations, and component guidelines

---

## Overview

This folder contains comprehensive documentation for the MindMine Money frontend design system and implementation guidelines. These documents serve as the single source of truth for design decisions, component patterns, and animation specifications.

---

## Document Structure

### 1. UI_REFINEMENT_PRP.md
**Purpose:** Project Requirements Document for UI Refinement  
**Content:**
- Design philosophy and principles
- Complete design system specifications
- Component refinement roadmap
- Implementation phases and effort estimates
- Success metrics and risk assessment

**Use When:**
- Planning UI enhancements
- Understanding design goals
- Estimating development effort
- Making design decisions

### 2. DESIGN_SYSTEM.md
**Purpose:** Comprehensive Design System Guide  
**Content:**
- Color palette with usage guidelines
- Typography scale and font weights
- Spacing system and breakpoints
- Component specifications
- Accessibility requirements

**Use When:**
- Designing new components
- Choosing colors or typography
- Determining spacing values
- Ensuring design consistency

### 3. STYLE_TOKENS.md
**Purpose:** Technical Style Token Reference  
**Content:**
- All CSS custom properties
- Tailwind configuration mappings
- Animation keyframes
- Component-specific tokens
- Usage examples

**Use When:**
- Implementing components
- Writing custom CSS
- Configuring Tailwind
- Looking up specific values

### 4. ANIMATION_SPECS.md
**Purpose:** Animation Guidelines and Patterns  
**Content:**
- Animation principles and best practices
- Framer Motion configurations
- Component-specific animations
- Performance guidelines
- Accessibility considerations

**Use When:**
- Creating animations
- Refining existing animations
- Optimizing performance
- Ensuring accessibility

### 5. COMPONENT_GUIDELINES.md
**Purpose:** Component Implementation Guide  
**Content:**
- Component architecture principles
- Component templates and examples
- Best practices for each component type
- Accessibility requirements
- Performance optimization

**Use When:**
- Building new components
- Refactoring existing components
- Ensuring consistency
- Writing maintainable code

---

## Quick Reference

### Color Palette

```css
--color-black:  #000000;
--color-white:  #FFFFFF;
--color-gray-50: #FAFAFA;
--color-gray-200: #E5E5E5; /* Borders */
--color-gray-600: #525252; /* Body text */
```

### Typography

```css
--text-base: 1rem;    /* 16px - Body */
--text-xl:   1.25rem; /* 20px - Subheadings */
--text-3xl:  1.875rem;/* 30px - Section headings */
--text-5xl:  3rem;    /* 48px - Hero headings */
```

### Spacing

```css
--space-4:  1rem;  /* 16px - Default */
--space-6:  1.5rem; /* 24px - Cards */
--space-8:  2rem;  /* 32px - Section gaps */
--space-16: 4rem;  /* 64px - Large sections */
```

### Animations

```javascript
// Fade In
initial: { opacity: 0 }
animate: { opacity: 1 }
transition: { duration: 0.6, ease: "easeOut" }

// Slide Up
initial: { opacity: 0, y: 30 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.6, ease: "easeOut" }

// Hover
whileHover: { scale: 1.02 }
transition: { duration: 0.3, ease: "easeOut" }
```

---

## Design Principles

1. **Elegant Minimalism**
   - Clean, purposeful design
   - Whitespace as a design element
   - No unnecessary elements

2. **Intentional Motion**
   - Animations enhance UX
   - Smooth, natural transitions
   - Respect user preferences

3. **Visual Hierarchy**
   - Clear information architecture
   - Scale and spacing guide the eye
   - Content prioritized by importance

4. **Attention to Detail**
   - Polished interactions
   - Consistent spacing and alignment
   - Thoughtful micro-interactions

5. **Performance First**
   - Beautiful without compromising speed
   - Optimized for all devices
   - Progressive enhancement

---

## Component Patterns

### Buttons

```tsx
<Button variant="primary" size="md">
  Primary Action
</Button>
```

### Cards

```tsx
<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
  </Card.Header>
  <Card.Body>
    Card content
  </Card.Body>
</Card>
```

### Inputs

```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
/>
```

---

## Animation Patterns

### Page Load
- Fade in with slide up
- Duration: 0.6s
- Easing: easeOut
- Stagger: 0.1s delay

### Scroll Reveal
- While in viewport
- Once: true
- Duration: 0.6s
- Margin: -100px

### Hover States
- Scale: 1.02
- Lift: -4px
- Duration: 0.3s
- Easing: easeOut

---

## Accessibility Standards

### Color Contrast
- Minimum: 4.5:1 (AA)
- Target: 7:1 (AAA)

### Keyboard Navigation
- Tab order: Logical
- Focus states: Visible
- Skip links: Provided

### Screen Readers
- ARIA labels: Included
- Semantic HTML: Used
- Alt text: Provided

### Motion Preferences
- Reduced motion: Respected
- Animations: Optional
- Performance: Optimized

---

## Performance Targets

### Core Web Vitals
- **LCP**: <2.5s (Largest Contentful Paint)
- **FID**: <100ms (First Input Delay)
- **CLS**: <0.1 (Cumulative Layout Shift)

### Other Metrics
- **FCP**: <1.5s (First Contentful Paint)
- **TTI**: <3s (Time to Interactive)
- **Lighthouse**: >95 score

---

## Implementation Roadmap

### Phase 1: Foundation ✅
- [x] Create context folder structure
- [x] Document design system
- [x] Define style tokens
- [x] Specify animation patterns
- [x] Write component guidelines

### Phase 2: Enhancement (Next)
- [ ] Update globals.css with tokens
- [ ] Refine grid background
- [ ] Enhance Hero section
- [ ] Polish How It Works
- [ ] Improve Educator/Student sections
- [ ] Enhance AI Tech section
- [ ] Refine Navigation & Footer
- [ ] Add micro-interactions

### Phase 3: Testing & Optimization (Future)
- [ ] Cross-browser testing
- [ ] Responsive testing
- [ ] Performance audit
- [ ] Accessibility audit
- [ ] User testing

---

## Design System Workflow

### 1. Design Phase
1. Review DESIGN_SYSTEM.md for guidelines
2. Choose appropriate colors and typography
3. Use spacing scale for layout
4. Reference component patterns

### 2. Implementation Phase
1. Consult STYLE_TOKENS.md for values
2. Use COMPONENT_GUIDELINES.md for patterns
3. Follow ANIMATION_SPECS.md for motion
4. Implement using Tailwind utilities

### 3. Review Phase
1. Check design consistency
2. Verify accessibility compliance
3. Test performance metrics
4. Validate cross-browser support

---

## Common Tasks

### Adding a New Component

1. **Design Phase**
   - Review DESIGN_SYSTEM.md
   - Define component variants
   - Choose colors and spacing
   - Plan animations

2. **Implementation Phase**
   - Follow COMPONENT_GUIDELINES.md template
   - Use style tokens from STYLE_TOKENS.md
   - Add animations from ANIMATION_SPECS.md
   - Ensure accessibility

3. **Documentation Phase**
   - Update component guidelines
   - Add examples
   - Document variants

### Updating Existing Component

1. **Review Current Implementation**
   - Check design system compliance
   - Identify improvements needed
   - Plan changes

2. **Implement Changes**
   - Use design tokens
   - Follow established patterns
   - Test thoroughly

3. **Verify Compliance**
   - Check accessibility
   - Test performance
   - Validate consistency

### Adding Animations

1. **Determine Animation Type**
   - Page load, scroll, hover, or click
   - Reference ANIMATION_SPECS.md

2. **Implement**
   - Use Framer Motion
   - Follow specified timing
   - Respect reduced motion

3. **Optimize**
   - Use GPU properties
   - Test performance
   - Provide fallbacks

---

## Resources

### Internal Documentation
- `../docs/ARCHITECTURE.md` - System architecture
- `../docs/AI_WORKFLOW.md` - AI integration details
- `../SPECIFICATION.md` - Project specifications
- `../PROJECT_STRUCTURE.md` - Code organization

### External Resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js Documentation](https://nextjs.org/docs)

---

## Glossary

### Terms
- **Design Token**: Reusable design value (color, spacing, typography)
- **Component**: Reusable UI building block
- **Variant**: Different style version of a component
- **Prop**: Property passed to a component
- **Hook**: Reusable stateful logic
- **Animation**: Transition between states
- **Micro-interaction**: Small animation responding to user action
- **Accessibility**: Design that works for all users
- **Responsive**: Adapts to different screen sizes

### Acronyms
- **WCAG**: Web Content Accessibility Guidelines
- **ARIA**: Accessible Rich Internet Applications
- **LCP**: Largest Contentful Paint
- **FID**: First Input Delay
- **CLS**: Cumulative Layout Shift
- **FCP**: First Contentful Paint
- **TTI**: Time to Interactive

---

## Maintenance

### Regular Updates
- Review and update quarterly
- Incorporate user feedback
- Align with project changes
- Improve documentation clarity

### Version Control
- Document version changes
- Track design iterations
- Maintain change history
- Tag major releases

### Team Communication
- Share updates in team meetings
- Notify of breaking changes
- Gather feedback regularly
- Continuously improve

---

## Getting Help

### Questions
1. Check relevant documentation
2. Review examples
3. Search existing issues
4. Ask team members

### Contributing
1. Follow documentation patterns
2. Use established tokens
3. Maintain consistency
4. Update documentation

### Reporting Issues
1. Describe the problem
2. Provide context
3. Suggest solutions
4. Create documentation PR

---

**Context Documentation Version:** 1.0  
**Last Updated:** 2026-01-12  
**Maintained By:** Frontend Team
