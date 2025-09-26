# WanderWise Travel App - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Medium's clean, content-focused design philosophy combined with travel platforms like Airbnb for warmth and accessibility. This creates a professional yet approachable hackathon-ready aesthetic.

## Core Design Principles
- **Minimal & Clean**: Embrace whitespace and avoid visual clutter
- **Content-First**: Let travel content and forms be the hero
- **Professional Simplicity**: Polished but not over-engineered
- **Consistent Experience**: Unified design language across all pages

## Color Palette
**Primary Colors**:
- Primary: 215 25% 27% (Deep blue-gray for trust and professionalism)
- Primary Light: 215 20% 65% (Softer variant for accents)

**Supporting Colors**:
- Background: 0 0% 98% (Warm white)
- Card Background: 0 0% 100% (Pure white)
- Text Primary: 215 25% 15% (Dark blue-gray)
- Text Secondary: 215 15% 45% (Medium gray)
- Border: 215 15% 88% (Light gray)

**Accent Colors**:
- Success: 142 50% 45% (Travel-appropriate green)
- Warning: 38 85% 55% (Warm orange, used sparingly)

## Typography
- **Primary Font**: Inter (clean, readable sans-serif via Google Fonts)
- **Headings**: Font weights 600-700, generous line height 1.2
- **Body Text**: Font weight 400, line height 1.6 for readability
- **Form Labels**: Font weight 500, slightly smaller than body text

## Layout System
**Spacing Scale**: Use Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm
- Small spacing: p-2, m-4 (8px, 16px)
- Medium spacing: p-6, m-8 (24px, 32px)  
- Large spacing: p-12, m-16 (48px, 64px)

**Grid System**: Center-focused layouts with max-width containers
- Forms: max-w-md (448px) centered
- Content: max-w-4xl (896px) for main content areas
- Full-width: Only for navigation and footer

## Component Library

### Navigation
- **Header**: Clean horizontal nav with logo left, auth links right
- **Logo**: Simple text-based "WanderWise" in primary color
- **Navigation Links**: Subtle hover states, clear active states

### Forms (Key Focus)
- **Card Container**: bg-white, rounded-lg (8px), shadow-sm, p-8
- **Form Fields**: 
  - Border: border-gray-300, focus:border-primary
  - Padding: px-3 py-2, rounded-md
  - Typography: text-sm
- **Buttons**: 
  - Primary: bg-primary, text-white, rounded-md, py-2 px-4
  - Secondary: border variant with primary text
- **Form Layout**: Vertical stack with consistent spacing (space-y-4)

### Interactive Elements
- **Links**: Underlined on hover, primary color
- **Error States**: Red text (destructive color) with gentle styling
- **Success States**: Green accent for confirmations

### Layout Cards
- **Main Content Cards**: Soft shadows (shadow-sm), rounded corners (rounded-lg)
- **Nested Cards**: Subtle borders instead of shadows for hierarchy
- **Padding**: Consistent p-6 for card interiors

## Page-Specific Guidelines

### Sign Up/Sign In Pages
- **Layout**: Single column, centered, max-w-md
- **Card Elevation**: Gentle shadow-sm, not dramatic
- **Form Spacing**: space-y-4 between fields, space-y-6 for sections
- **Visual Hierarchy**: Clear distinction between form title, fields, and actions

### Home/Dashboard
- **Content Sections**: Clean grid layouts with appropriate gaps
- **Information Density**: Balanced - not too sparse, not cluttered
- **Call-to-Action**: Clear primary actions without aggressive styling

## Interaction Patterns
- **Hover States**: Subtle color transitions (150ms ease)
- **Focus States**: Clear focus rings for accessibility
- **Loading States**: Simple spinners, no complex animations
- **Transitions**: Minimal and purposeful only

## Accessibility Standards
- **Color Contrast**: Minimum WCAG AA compliance
- **Focus Management**: Visible focus indicators on all interactive elements
- **Form Labels**: Properly associated with inputs
- **Error Messaging**: Clear, descriptive, and announced to screen readers

## Responsive Behavior
- **Mobile-First**: Forms stack naturally, maintain readability
- **Breakpoint Strategy**: sm, md, lg breakpoints for major layout shifts
- **Touch Targets**: Minimum 44px for mobile interactions
- **Typography Scale**: Slightly smaller text on mobile, maintain hierarchy

This design system creates a professional, clean interface that feels both modern and trustworthy - perfect for a travel planning application built during a hackathon timeframe.