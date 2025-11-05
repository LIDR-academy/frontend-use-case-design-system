# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Lidr Design System** - a modern React 18 TypeScript component library following Atomic Design methodology. The project is published as `@lidr/design-system` and serves as the foundation for all Lidr digital products.

**Key Technologies:**

- React 18.3.1 + TypeScript 5.8.3 (strict mode)
- Vite 4 for bundling
- TailwindCSS 3.4.3 for styling
- Storybook 7 for documentation
- Playwright 1.56.1 for Component Testing + E2E
- Rollup for library builds
- Chromatic for visual regression testing

## Architecture: Atomic Design

This project **strictly follows Atomic Design** methodology as documented in `docs/design-system/ATOMIC-DESIGN.md` and `.claude/rules/01-atomic-design.md`.

### Component Hierarchy

```
src/components/
├── atoms/        # Indivisible UI elements (Button, Input, Icon)
├── molecules/    # 2+ atoms combined (Card, Tag, FormField)
├── organisms/    # Complex sections with business logic (Header, Footer)
└── templates/    # Page layouts without real content
```

### Classification Rules

When creating/modifying components:

1. **Atoms**: Cannot be divided further, no business logic, highly reusable
   - Examples: Button, Input, Icon, Label, Badge
   - Must be stateless when possible
   - Simple, predictable props

2. **Molecules**: Combine 2+ atoms with cohesive functionality
   - Examples: SearchBox (Input+Button), Card, Tag
   - Can have simple local state
   - No API calls

3. **Organisms**: Complex, autonomous components
   - Examples: Header, Footer, ProductCard, LoginForm
   - Can have business logic and state management
   - Can call APIs and use contexts

4. **Templates**: Layout structures with placeholders
   - Define page structure without real content
   - Highly reusable across pages

5. **Pages** (in `src/pages/`): Complete pages with real content
   - Route-level components
   - Global state and API integration

### File Structure (REQUIRED)

Every component MUST follow this structure:

```
ComponentName/
├── ComponentName.tsx          # Implementation
├── ComponentName.stories.tsx  # Storybook documentation
├── ComponentName.spec.tsx     # Playwright tests
└── index.ts                   # Barrel export
```

## Development Commands

### Core Development

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server
npm run build        # Build: tsc + vite build
npm run preview      # Preview production build
```

### Testing with Playwright

```bash
npm test                          # Quick E2E (Chromium only) - default
npm run test:e2e                  # Same as npm test
npm run test:e2e:all              # All browsers (215 tests)
npm run test:e2e:ui               # Interactive Playwright UI
npm run test:e2e:headed           # Tests with visible browser
npm run test:e2e:debug            # Step-by-step debugging
npm run test:e2e:update-snapshots # Update visual regression snapshots
npm run test:ct                   # Component Tests only
npm run test:report               # View HTML report
npm run test:install              # Install Playwright browsers (first time)
```

**Current Test Status**: ✅ 215/215 passing

- 12 accessibility tests (WCAG 2.1 AA with @axe-core/playwright)
- 20 component tests (atoms + molecules)
- 11 visual regression tests

### Code Quality

```bash
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Format with Prettier
npm run format:check # Verify formatting
```

### Storybook

```bash
npm run storybook        # Dev server on :6006
npm run build-storybook  # Build static Storybook
npm run chromatic        # Deploy to Chromatic for visual testing
```

### Library Publishing

```bash
npm run build:lib        # Rollup build for npm
npm run release          # Patch version bump + publish
npm run release:minor    # Minor version bump + publish
npm run release:major    # Major version bump + publish
```

## Key Architecture Decisions

### 1. Dual Testing Strategy

**Component Testing (CT)**: Tests individual components in real browsers

- Location: `*.spec.tsx` next to each component
- Config: `playwright-ct.config.ts`
- Use for: Atoms and Molecules testing

**E2E Testing**: Tests Storybook stories end-to-end

- Location: `e2e/storybook/*.spec.ts`
- Config: `playwright.config.ts`
- Includes: Visual regression, accessibility, responsive testing
- Auto-starts Storybook on `localhost:6006`

### 2. Library Exports

The package exports multiple entry points:

```javascript
// Main component library
import { Button, Input } from '@lidr/design-system';

// Styles
import '@lidr/design-system/styles';

// Tailwind config (for consumer apps)
import config from '@lidr/design-system/tailwind';
```

### 3. TypeScript Configuration

- **Strict mode enabled** (`tsconfig.app.json`)
- No `any` types allowed
- All components must have explicit prop interfaces
- Build uses project references for performance

### 4. Styling with TailwindCSS

- Utility-first approach - use Tailwind classes directly
- Custom design tokens in `tailwind.config.cjs`
- No CSS modules unless Tailwind insufficient
- Mobile-first responsive design

## Testing Requirements

Every component MUST have:

1. **Component tests** (`*.spec.tsx`):

   ```typescript
   test.describe('ComponentName', () => {
     test('should render with default props', async ({ mount }) => {
       const component = await mount(<ComponentName />);
       await expect(component).toBeVisible();
     });
   });
   ```

2. **Accessibility tests** (using @axe-core/playwright):

   ```typescript
   test('should not have accessibility violations', async ({ mount, page }) => {
     await mount(<ComponentName />);
     const results = await new AxeBuilder({ page }).analyze();
     expect(results.violations).toEqual([]);
   });
   ```

3. **Storybook stories** following CSF 3.0 format with:
   - Default story
   - All variants (primary, secondary, etc.)
   - All sizes (sm, md, lg)
   - Disabled/loading states
   - Interactive examples with controls

## Storybook Organization

Stories MUST use Atomic Design hierarchy in titles:

```typescript
// ✅ CORRECT
title: 'Atoms/Button';
title: 'Molecules/Card';
title: 'Organisms/Header';

// ❌ WRONG
title: 'Components/Button';
title: 'Button';
```

## Accessibility is Mandatory

All components MUST:

- Use semantic HTML elements
- Have proper ARIA labels/roles
- Support keyboard navigation (Tab, Enter, Space, Escape)
- Meet WCAG 2.1 AA contrast ratios (4.5:1 text, 3:1 UI)
- Pass @axe-core/playwright tests
- Have visible focus indicators
- Work with screen readers

## TypeScript Standards

```typescript
// ✅ CORRECT - Explicit interface with typed props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  ...props
}) => {
  /* ... */
};

// ❌ WRONG - No explicit types
export const Button = (props: any) => {
  /* ... */
};
```

Extend native HTML props when appropriate:

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
```

## Component Creation Checklist

When creating a new component:

1. [ ] Determine correct Atomic Design level (atom/molecule/organism)
2. [ ] Create folder in appropriate directory
3. [ ] Implement component with TypeScript interface
4. [ ] Add Playwright component tests (rendering, variants, interactions, a11y)
5. [ ] Create Storybook stories (default, all variants, interactive)
6. [ ] Use TailwindCSS for styling
7. [ ] Ensure keyboard navigation works
8. [ ] Pass accessibility tests
9. [ ] Add barrel export in `index.ts`
10. [ ] Run `npm run lint && npm run format`
11. [ ] Run `npm test` to verify all tests pass

## Current Component Inventory

**Atoms**: Button, Input, Icon
**Molecules**: Card, Tag
**Organisms**: (none yet)
**Templates**: (none yet)

## Important Files

- `docs/design-system/ATOMIC-DESIGN.md` - Complete Atomic Design guide
- `.claude/rules/` - Detailed rules for all aspects of development
  - `01-atomic-design.md` - Component classification
  - `02-typescript.md` - Type standards
  - `03-testing.md` - Testing strategy
  - `04-storybook.md` - Documentation standards
  - `05-accessibility.md` - A11y requirements
  - `06-styling.md` - TailwindCSS usage
  - `07-code-quality.md` - Code standards
- `.cursorrules` - Additional development guidelines
- `playwright.config.ts` - E2E test configuration
- `playwright-ct.config.ts` - Component test configuration
- `tailwind.config.cjs` - Design tokens and Tailwind setup

## CI/CD

The project uses GitHub Actions for:

- Running Playwright tests on all browsers
- Visual regression testing with Chromatic
- TypeScript compilation checks
- ESLint and Prettier validation
- Automated Storybook deployment

## Design System Principles

1. **Consistency**: Use existing components before creating new ones
2. **Reusability**: Components should work in multiple contexts
3. **Accessibility**: WCAG 2.1 AA compliance is mandatory
4. **Testability**: Every component needs comprehensive tests
5. **Documentation**: Storybook stories document all use cases
6. **Type Safety**: Strict TypeScript with no `any`
7. **Performance**: Lazy load when appropriate, optimize bundle size

## Common Patterns

### Conditional Classes with Variants

```typescript
const buttonVariants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
};

const className = clsx('base-classes', buttonVariants[variant], {
  'opacity-50': disabled,
});
```

### Keyboard Navigation

```typescript
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
};
```

### Extending Native Elements

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
// Now supports all native input props + custom ones
```

## Migration Notes

The project is actively migrating from a flat `components/ui/` structure to Atomic Design:

- ✅ Phase 1 complete: Button, Input migrated to atoms/
- 🚧 Phase 2 in progress: Creating molecules (Card, Tag done)
- ⏳ Phase 3 planned: Organisms (Header, Footer, Forms)
