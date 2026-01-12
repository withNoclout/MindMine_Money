# PRP: MindMine Money Landing Page (MVP)

## 1. Overview

**Feature:** Modern landing page for MindMine Money educational marketplace
**Epic:** frontend-initialization
**Scope:** MVP (Phase 1)
**Timeline:** 1 week
**Owner:** Frontend Development

**Vision:** Create a professional, modern landing page that showcases MindMine Money's AI-powered educational marketplace with a striking black and white design featuring a rectangle grid background.

## 2. Design Specifications

### Color Theme
- **Primary:** Black (#000000)
- **Secondary:** White (#FFFFFF)
- **Accent:** Light Gray (#666666) for subtle text
- **Hover:** Dark Gray (#333333)

### Background Design
- **Grid Pattern:** 40px x 40px rectangular cells
- **Line Thickness:** 1px
- **Line Color:** Light gray (#E5E5E5)
- **Animation:** Subtle fade-in on scroll

### Typography
- **Font:** Inter or System Sans-Serif
- **Headings:** Bold, uppercase, tight tracking (-0.02em)
- **Body:** Regular weight, 1.6 line height
- **Buttons:** Uppercase, bold, 8px padding

## 3. Landing Page Sections

### 3.1 Header/Navigation
- Logo: "MINDMINE" (bold) + "MONEY" (light)
- Links: Features, How It Works, About
- CTAs: "Get Started" (filled black), "Educator Login" (outlined)

### 3.2 Hero Section
- **Headline:** "Transform Education with AI-Powered Content Valuation"
- **Subheadline:** "Fair compensation for educators. Affordable learning for students."
- **Primary CTA:** "Start Learning" → /student
- **Secondary CTA:** "Start Teaching" → /educator
- **Visual:** Animated grid overlay with floating elements

### 3.3 How It Works (3 Steps)
- **Step 1:** Upload Content (icon: upload cloud)
- **Step 2:** AI Valuation (icon: brain/AI)
- **Step 3:** Earn Credits (icon: wallet)
- Flow arrows connecting steps

### 3.4 For Educators
- **Value Prop:** "Teach What You Know. Earn What You Deserve."
- **Benefits Grid:**
  - Fair AI Valuation (transparent scoring)
  - 70% Revenue Share (industry-leading)
  - Thai Bank Withdrawals (Omise/PromptPay)
  - Video & PDF Support

### 3.5 For Students
- **Value Prop:** "Quality Education, Affordable Prices."
- **Benefits:**
  - AI-Vetted Content (quality guaranteed)
  - Credit System (flexible payments)
  - PromptPay Support (Thai-friendly)
  - All Grade Levels (1-12 + University)

### 3.6 AI Technology Showcase
- **Headline:** "Powered by Advanced AI"
- **Tech Stack:**
  - OpenAI Whisper (video transcription)
  - Tesseract OCR (document extraction)
  - Semantic Matching (curriculum alignment)
- Process visualization: Upload → Extract → Match → Score → Award

### 3.7 Footer
- Logo and tagline
- Links: About, Contact, Privacy Policy, Terms of Service
- Social icons (minimalist line icons)
- Copyright © 2026 MindMine Money

## 4. Technical Requirements

### Frontend Stack
- **Framework:** Next.js 14 (App Router)
- **React Version:** 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Performance Requirements
- **Lighthouse Score:** >90 on all metrics
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Mobile:** Fully responsive (320px+)

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 5. Component Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with grid background
│   ├── page.tsx            # Landing page composition
│   └── globals.css         # Global styles + grid pattern
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── HowItWorks.tsx      # 3-step process
│   ├── EducatorSection.tsx # Benefits for educators
│   ├── StudentSection.tsx  # Benefits for students
│   ├── AITechSection.tsx   # AI technology showcase
│   ├── Footer.tsx          # Page footer
│   └── GridBackground.tsx  # Reusable grid background
└── types/
    └── index.ts            # TypeScript interfaces
```

## 6. User Stories

### Story 1: Hero Section
As a visitor, I want to see a compelling hero section so I understand what MindMine Money does.
- **Acceptance Criteria:**
  - ✅ Clear headline and value proposition
  - ✅ Two distinct CTAs (Student/Educator)
  - ✅ Animated grid background
  - ✅ Mobile responsive

### Story 2: How It Works
As a visitor, I want to understand the 3-step process so I know how the platform works.
- **Acceptance Criteria:**
  - ✅ Clear visual steps with icons
  - ✅ Flow arrows connecting steps
  - ✅ Concise descriptions
  - ✅ Responsive on all devices

### Story 3: Educator Benefits
As an educator, I want to see benefits so I understand why I should join.
- **Acceptance Criteria:**
  - ✅ Key benefits highlighted (AI valuation, 70% split)
  - ✅ Professional presentation
  - ✅ Call-to-action visible

### Story 4: Student Benefits
As a student, I want to see benefits so I understand the value.
- **Acceptance Criteria:**
  - ✅ Affordable pricing highlighted
  - ✅ Quality assurance mentioned
  - ✅ Thai payment options noted

### Story 5: AI Technology
As a visitor, I want to understand the technology so I trust the platform.
- **Acceptance Criteria:**
  - ✅ Tech stack clearly presented
  - ✅ Process visualization
  - ✅ Professional, tech-forward design

## 7. Responsive Design

### Breakpoints
- **Mobile:** <640px (320px-639px)
- **Tablet:** 640px-1023px
- **Desktop:** ≥1024px

### Mobile Considerations
- Hamburger menu for navigation
- Stacked sections (vertical flow)
- Touch-friendly buttons (44px min height)
- Reduced animations for performance

## 8. Testing Strategy

### Manual Testing
- ✅ Cross-browser testing (Chrome, Firefox, Safari)
- ✅ Responsive testing (mobile, tablet, desktop)
- ✅ Accessibility testing (keyboard navigation, screen readers)
- ✅ Performance testing (Lighthouse)

### Automated Testing
- ✅ Visual regression (Storybook - future)
- ✅ Component unit tests (Jest - future)
- ✅ E2E tests (Playwright - future)

## 9. Implementation Roadmap

### Day 1: Project Setup
- Initialize Next.js project with TypeScript
- Install dependencies (Tailwind, Framer Motion, Lucide)
- Configure Tailwind CSS
- Set up project structure

### Day 2: Core Components
- Create GridBackground component
- Build Header with navigation
- Implement Hero section

### Day 3: Content Sections
- Build How It Works (3 steps)
- Create Educator section
- Create Student section

### Day 4: Technology & Footer
- Build AI Technology showcase
- Create Footer component
- Add smooth scrolling

### Day 5: Polish & Testing
- Add animations (Framer Motion)
- Responsive design refinements
- Performance optimization
- Cross-browser testing
- Final review

### Day 6: Deployment
- Build production bundle
- Test production build
- Deploy to preview environment
- Final QA

## 10. Effort Estimates

| Task | Effort | Priority |
|------|--------|----------|
| Project Setup | 4 hours | High |
| Grid Background | 2 hours | High |
| Header Component | 3 hours | High |
| Hero Section | 4 hours | High |
| How It Works | 3 hours | Medium |
| Educator Section | 3 hours | Medium |
| Student Section | 3 hours | Medium |
| AI Tech Section | 4 hours | Medium |
| Footer | 2 hours | Low |
| Animations | 4 hours | Medium |
| Responsive Design | 6 hours | High |
| Testing & Polish | 6 hours | High |
| **Total** | **44 hours (~5.5 days)** | |

## 11. Dependencies & Risks

### Dependencies
- Next.js 14 (stable release)
- Tailwind CSS v3
- Framer Motion v10+
- Lucide React icons

### Risks & Mitigation
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Design changes | Medium | Medium | Use modular components for easy updates |
| Performance issues | Low | High | Optimize images, lazy load, use code splitting |
| Browser compatibility | Low | Medium | Test on all target browsers, use polyfills if needed |
| Animation overhead | Low | Medium | Use Framer Motion with reduced-motion support |

## 12. Success Metrics

- **Performance:** Lighthouse score >90
- **User Engagement:** CTR on primary buttons >5%
- **Load Time:** First Contentful Paint <1.5s
- **Mobile:** 100% responsive on all breakpoints
- **Accessibility:** WCAG 2.1 AA compliant

## 13. Open Questions

1. Should we add a demo video in the Hero section? (Decision: No for MVP)
2. Do we need a testimonial section? (Decision: Add in Phase 2)
3. Should we include pricing on the landing page? (Decision: No, separate page)
4. Do we need language switcher (Thai/English)? (Decision: Add in Phase 2)

## 14. Technical Specifications

### Grid Background CSS
```css
background-image: 
  linear-gradient(to right, #E5E5E5 1px, transparent 1px),
  linear-gradient(to bottom, #E5E5E5 1px, transparent 1px);
background-size: 40px 40px;
```

### Tailwind Configuration
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  }
}
```

## 15. Next Steps

1. ✅ Create this PRP document
2. ⬜ Initialize Next.js project
3. ⬜ Set up Tailwind CSS configuration
4. ⬜ Create component structure
5. ⬜ Implement GridBackground component
6. ⬜ Build each section following the roadmap
7. ⬜ Test and refine
8. ⬜ Deploy and review

---

**Generated:** 2026-01-12
**Version:** 1.0
**Status:** Ready for Implementation
