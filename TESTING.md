# Testing Strategy and Documentation

## Overview

This project implements a comprehensive testing strategy with **74 passing tests** covering state machines, React components, contexts, and integration scenarios. The testing approach validates both functionality and performance optimizations.

## Testing Stack

- **Vitest**: Modern testing framework with native TypeScript support
- **React Testing Library**: Component testing with accessibility-focused queries
- **@testing-library/jest-dom**: Extended DOM matchers for better assertions
- **@testing-library/user-event**: Realistic user interaction simulation
- **jsdom**: Browser environment simulation for Node.js testing

## Test Configuration

### vitest.config.ts

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    globals: true,
  },
  esbuild: {
    jsxInject: "import React from 'react'",
  },
});
```

### Key Configuration Features

- **Automatic React Import**: `jsxInject` eliminates need for manual React imports
- **Global Test APIs**: `globals: true` provides describe, it, expect globally
- **jsdom Environment**: Simulates browser APIs for component testing
- **Setup Files**: Configures testing library and custom matchers

## Test Structure Overview

### State Machine Tests (54 tests)

#### 1. Form Machine Tests (`formMachine.test.ts` - 33 tests)

**Categories**:

- **State Transitions** (8 tests): Validates proper state flow between form steps
- **Validation Logic** (8 tests): Tests form validation guards and error handling
- **Data Management** (7 tests): Verifies form data updates and persistence
- **Context Updates** (5 tests): Ensures proper context state management
- **Edge Cases** (3 tests): Handles error conditions and invalid states
- **localStorage Integration** (2 tests): Tests data persistence functionality

**Key Test Patterns**:

```typescript
describe("formMachine", () => {
  describe("State Transitions", () => {
    it("should start in step1 state", () => {
      const actor = createActor(formMachine).start();
      expect(actor.getSnapshot().value).toBe("step1");
    });
  });

  describe("Validation Logic", () => {
    it("should not advance from step1 with invalid data", () => {
      // Test validation guards prevent invalid transitions
    });
  });
});
```

#### 2. Theme Machine Tests (`themeMachine.test.ts` - 21 tests)

**Categories**:

- **Theme Switching** (8 tests): Validates theme state transitions
- **System Theme Detection** (5 tests): Tests OS preference integration
- **localStorage Persistence** (4 tests): Verifies theme persistence
- **Document Class Management** (3 tests): Tests DOM class updates
- **Context Management** (1 test): Validates theme context updates

**Mock Strategies**:

```typescript
// Mock system preference detection
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: query.includes("dark"),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});
```

### Component Tests (18 tests)

#### 1. Form Component Tests (`FormExample.test.tsx` - 10 tests)

**Test Categories**:

- **Rendering** (2 tests): Component mounts and displays correctly
- **Form Workflows** (4 tests): Multi-step form progression
- **Validation** (2 tests): User input validation and error display
- **Data Persistence** (1 test): localStorage integration
- **User Interactions** (1 test): Button clicks and form submission

**Component Testing Patterns**:

```typescript
describe("FormExample Component", () => {
  it("should advance to step 2 with valid data", async () => {
    render(<ClientFormExample />);

    // Fill required fields
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");

    // Submit and verify transition
    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText(/step 2/i)).toBeInTheDocument();
  });
});
```

#### 2. Theme Toggle Tests (`ThemeToggle.test.tsx` - 8 tests)

**Test Categories**:

- **Component Rendering** (2 tests): Proper component mount and theme display
- **Theme Switching** (3 tests): Button interactions change themes
- **System Theme Integration** (2 tests): System preference detection
- **Accessibility** (1 test): Proper ARIA attributes and labels

**Testing Approach**:

```typescript
describe("ThemeToggle", () => {
  it("should switch to dark theme when dark button is clicked", async () => {
    render(<ClientThemeToggle />);

    const darkButton = screen.getByRole("button", { name: /dark/i });
    await user.click(darkButton);

    expect(darkButton).toHaveAttribute("aria-pressed", "true");
  });
});
```

### Context Tests (2 tests)

#### Theme Context Tests (`ThemeContext.test.tsx` - 2 tests)

**Test Categories**:

- **Provider Functionality** (1 test): Context provides theme state
- **Theme Updates** (1 test): Context handles theme changes

## Testing Best Practices Applied

### 1. Accessibility-First Testing

- **Role-based Queries**: `getByRole('button')` over `getByTestId()`
- **Label Queries**: `getByLabelText()` for form inputs
- **Semantic HTML**: Tests validate proper semantic structure

```typescript
// Good: Accessibility-focused
const submitButton = screen.getByRole("button", { name: /submit/i });

// Avoid: Implementation-focused
const submitButton = screen.getByTestId("submit-button");
```

### 2. User-Centric Testing

- **User Event Simulation**: Realistic user interactions with `@testing-library/user-event`
- **Async Handling**: Proper async/await for user interactions
- **Real User Flows**: Tests follow actual user workflows

```typescript
const user = userEvent.setup();
await user.type(input, "test value");
await user.click(button);
```

### 3. State Machine Testing

- **State Verification**: Direct state machine state checking
- **Event Testing**: Sending events and verifying transitions
- **Context Validation**: Ensuring context updates correctly

```typescript
const actor = createActor(machine).start();
actor.send({ type: "NEXT" });
expect(actor.getSnapshot().value).toBe("step2");
```

### 4. Mock Management

- **localStorage Mocking**: Safe localStorage operations in tests
- **System API Mocking**: matchMedia, document APIs
- **Cleanup**: Proper mock restoration between tests

```typescript
beforeEach(() => {
  // Mock localStorage
  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
  });
});

afterEach(() => {
  vi.clearAllMocks();
});
```

## Test Execution

### Running Tests

```bash
yarn test              # Run all 74 tests once
yarn test:watch        # Watch mode for development
yarn test:ui           # Interactive Vitest UI
yarn test:coverage     # Generate coverage reports
```

### Test Output

```terminal
✓ src/contexts/ThemeContext.test.tsx (2)
✓ src/components/layout/ThemeToggle/ThemeToggle.test.tsx (8)
✓ src/machines/formMachine.test.ts (33)
✓ src/machines/themeMachine.test.ts (21)
✓ src/containers/forms/FormExample/FormExample.test.tsx (10)

Test Files  5 passed (5)
     Tests  74 passed (74)
```

## Coverage Strategy

### Current Coverage Areas

1. **State Machines**: 100% coverage of state transitions and context updates
2. **Components**: Full user interaction and rendering scenarios
3. **Contexts**: Complete provider and consumer behavior
4. **Utilities**: localStorage and system integration functions
5. **Error Handling**: Edge cases and error recovery scenarios

### Coverage Goals

- **State Machines**: All states, transitions, and guards tested
- **Components**: All user interactions and edge cases covered
- **Integration**: Real workflow scenarios validated
- **Performance**: Optimizations don't break functionality

## Test Development Guidelines

### 1. Test Organization

```typescript
describe("ComponentName", () => {
  describe("Feature Category", () => {
    it("should describe specific behavior", () => {
      // Test implementation
    });
  });
});
```

### 2. Setup and Cleanup

```typescript
beforeEach(() => {
  // Setup mocks and test environment
});

afterEach(() => {
  // Clean up mocks and state
  vi.clearAllMocks();
});
```

### 3. Assertion Patterns

```typescript
// State assertions
expect(actor.getSnapshot().value).toBe("expectedState");

// DOM assertions
expect(screen.getByText("Expected Text")).toBeInTheDocument();

// User interaction verification
expect(mockFunction).toHaveBeenCalledWith(expectedArgs);
```

## Integration with Development Workflow

### 1. Pre-commit Testing

- All tests must pass before commits
- Watch mode during development
- Coverage reporting for new features

### 2. Continuous Integration

- Automated test execution on pull requests
- Coverage reporting and trends
- Performance regression detection

### 3. Test-Driven Development

- Write tests for new state machine features
- Test component behavior before implementation
- Validate optimizations don't break functionality

## Future Testing Enhancements

### 1. Advanced Testing

- **Visual Regression Testing**: Screenshot comparisons
- **Performance Testing**: Render time and re-render frequency
- **E2E Testing**: Full user workflows with Playwright

### 2. Test Utilities

- **Custom Render**: Pre-configured testing setup
- **Test Factories**: Generate test data consistently
- **Mock Helpers**: Reusable mock configurations

### 3. Coverage Improvements

- **Branch Coverage**: Ensure all code paths tested
- **Mutation Testing**: Validate test quality
- **Property-Based Testing**: Generate edge cases automatically

## Conclusion

The comprehensive test suite provides confidence in:

- **Functionality**: All features work as expected
- **Reliability**: Edge cases and errors handled properly
- **Performance**: Optimizations maintain functionality
- **Maintainability**: Clear test structure supports future development
- **User Experience**: Real user scenarios validated

The testing strategy supports both current functionality and future enhancements while maintaining high code quality and developer confidence.
