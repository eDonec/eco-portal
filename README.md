# Next.js XState State Machine Application

A comprehensive Next.js application demonstrating advanced state machine patterns using XState 5, React, and TypeScript with full test coverage and performance optimizations.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. Clone the repository or navigate to your project directory
2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Development Commands

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn test` - Run test suite (74 tests)
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report
- `yarn test:ui` - Open Vitest UI for interactive testing
- `yarn lint` - Run ESLint

## 🏗️ State Machines Implemented

### 1. Theme Management Machine

- **File**: `src/machines/themeMachine.ts`
- **Context**: `src/contexts/ThemeContext.tsx`
- **Component**: `src/components/layout/ThemeToggle/`
- **Concepts**: System preference detection, localStorage persistence, document class management
- **Features**:
  - Three theme modes: `light`, `dark`, `system`
  - Automatic system preference detection
  - Persistent theme storage
  - Dynamic document class updates
  - SSR-safe implementation

### 2. Multi-Step Form Machine

- **File**: `src/machines/formMachine.ts`
- **Container**: `src/containers/forms/FormExample/`
- **Concepts**: Complex state transitions, validation, multi-step workflows, data persistence
- **Features**:
  - Three comprehensive form steps with validation
  - Form data persistence in localStorage
  - Validation guards preventing invalid transitions
  - Step-by-step progress tracking
  - Error handling and recovery
  - Dynamic client-side rendering with SSR safety

## 🏗️ Project Structure

```typescript
src/
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # Root layout with theme provider
│   ├── globals.css           # Global styles with theme variables
│   └── favicon.ico           # Application icon
├── components/
│   └── layout/
│       └── ThemeToggle/      # Theme switching component
│           ├── index.tsx     # Main component export
│           ├── ClientThemeToggle.tsx  # Client-side theme toggle
│           └── ThemeToggle.test.tsx   # Component tests (8 tests)
├── containers/
│   └── forms/
│       └── FormExample/      # Form container with architecture
│           ├── index.tsx     # SSR-safe wrapper component
│           ├── ClientFormExample.tsx  # Client-side form logic
│           └── FormExample.test.tsx   # Form tests (10 tests)
├── contexts/
│   ├── ThemeContext.tsx      # Theme context provider
│   └── ThemeContext.test.tsx # Context tests (2 tests)
├── machines/
│   ├── formMachine.ts        # Multi-step form state machine
│   ├── formMachine.test.ts   # Form machine tests (33 tests)
│   ├── themeMachine.ts       # Theme management state machine
│   └── themeMachine.test.ts  # Theme machine tests (21 tests)
└── vitest.config.ts          # Test configuration
    vitest.setup.ts           # Test setup and globals
```

## 🧠 Key XState Concepts Demonstrated

### Basic Concepts

- **States**: The different modes your application can be in
- **Events**: Things that happen that can cause state transitions
- **Transitions**: Moving from one state to another based on events
- **Context**: Data associated with the machine instance
- **Actions**: Side effects that occur during transitions (using `assign`)
- **Guards**: Conditions that must be met for transitions to occur

### Advanced Concepts

- **Actors**: For handling async operations and external systems
- **Persistence**: localStorage integration for state and data persistence
- **SSR Safety**: Client-side hydration patterns for Next.js compatibility
- **System Integration**: OS theme preference detection and updates
- **Validation**: Complex form validation with state-driven error handling

### XState 5 Modern Features

- Modern TypeScript integration with strict typing
- Enhanced context management with improved `assign` patterns
- Better type inference and autocomplete support
- Improved developer experience with clearer error messages
- Updated actor model for better async handling

## 🧪 Testing Strategy

The project includes comprehensive testing with **74 passing tests** using:

- **Vitest**: Modern testing framework with native TypeScript support
- **React Testing Library**: Component testing with accessibility-focused queries
- **XState Testing**: State machine testing with proper state transitions
- **Mock Integration**: localStorage, system preferences, and DOM APIs

### Test Coverage

- **State Machines**: 54 tests covering all machine logic
  - `formMachine.test.ts`: 33 tests (validation, persistence, state transitions)
  - `themeMachine.test.ts`: 21 tests (theme switching, system detection)
- **Components**: 18 tests covering UI interactions
  - `FormExample.test.tsx`: 10 tests (form workflows, validation)
  - `ThemeToggle.test.tsx`: 8 tests (theme switching UI)
- **Contexts**: 2 tests covering React context behavior
  - `ThemeContext.test.tsx`: 2 tests (provider functionality)

### XState 5 Features

- Modern TypeScript integration with strict typing
- `fromPromise` for handling async operations
- Improved context management with `assign`
- Better type inference and autocomplete

## 🎯 State Machine Benefits

1. **Predictable State Management**: Know exactly what states your app can be in
2. **Impossible States Prevention**: Eliminate invalid state combinations
3. **Visual Documentation**: State machines can be visualized and understood by non-developers
4. **Testing**: Easy to test all possible states and transitions
5. **Debugging**: Clear understanding of how and why state changes occur
6. **Type Safety**: Full TypeScript integration prevents runtime state errors
7. **Performance**: Optimized re-rendering through predictable state updates

## 🚀 Getting Started with State Machines

### 1. Understanding the Theme Machine

The theme machine demonstrates fundamental concepts:

```typescript
// Simple state transitions with system integration
const themeMachine = createMachine({
  initial: "system",
  context: {
    theme: "system",
    resolvedTheme: "light",
    systemPreference: "light",
  },
  states: {
    light: {
      /* theme logic */
    },
    dark: {
      /* theme logic */
    },
    system: {
      /* system detection */
    },
  },
});
```

### 2. Exploring the Form Machine

The form machine shows complex workflows:

```typescript
// Multi-step validation with persistence
const formMachine = createMachine({
  initial: "step1",
  context: { formData: initialFormData },
  states: {
    step1: {
      /* validation and transitions */
    },
    step2: {
      /* data collection */
    },
    step3: {
      /* final submission */
    },
    submitted: {
      /* success handling */
    },
  },
});
```

## 📚 Learning Path

1. **Start with Theme Machine**: Understand basic state transitions and context
2. **Explore Form Machine**: Learn complex validation and multi-step workflows
3. **Run Tests**: See how state machines are tested with comprehensive coverage
4. **Modify Examples**: Add new states, events, or validation rules
5. **Create New Machines**: Apply patterns to your own use cases

## 🧪 Running Tests

The project includes a comprehensive test suite:

```bash
yarn test              # Run all 74 tests
yarn test:watch        # Watch mode for development
yarn test:ui           # Interactive test UI
yarn test:coverage     # Coverage reporting
```

## 📖 Additional Resources

- [XState Documentation](https://stately.ai/docs)
- [XState Visualizer](https://stately.ai/editor)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vitest Testing Framework](https://vitest.dev)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

## 🤝 Contributing

Feel free to explore the code, modify the state machines, and add your own examples!

### Development Workflow

1. **Clone and Setup**: Follow the installation instructions above
2. **Run Tests**: Ensure all 74 tests pass before making changes
3. **Develop**: Use `yarn dev` for hot reloading during development
4. **Test Changes**: Use `yarn test:watch` for continuous testing
5. **Lint Code**: Run `yarn lint` to ensure code quality

## 📝 Next Steps

1. **Experiment**: Try modifying the state machines to add new states or events
2. **Visualize**: Use the XState Visualizer to see your machines graphically
3. **Extend**: Add new state machines for different use cases (authentication, shopping cart, etc.)
4. **Test**: Write tests for your state machines using XState's testing utilities
5. **Optimize**: Apply the performance patterns documented in this project
6. **Deploy**: Build and deploy your enhanced state machine application

## 🎨 Architecture Notes

### Component Structure

- **Containers**: Handle state machine integration and data management
- **Components**: Focus on presentation and user interaction
- **Client Components**: Handle browser-specific APIs (localStorage, matchMedia)
- **SSR Safety**: Dynamic imports prevent hydration mismatches

### State Machine Patterns

- **Context Management**: Centralized data with immutable updates
- **Event Modeling**: Clear event types with payload structures
- **Guard Functions**: Pure functions for transition validation
- **Action Composition**: Reusable actions for state updates

Happy coding with state machines! 🎉
