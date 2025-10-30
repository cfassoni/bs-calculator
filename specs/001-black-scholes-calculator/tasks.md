# Tasks: Black-Scholes Calculator

**Input**: Design documents from `specs/001-black-scholes-calculator/`
**Prerequisites**: plan.md, spec.md, data-model.md

## Phase 1: Setup

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Next.js project with TypeScript
- [x] T002 [P] Install dependencies: `react`, `react-dom`, `next`
- [x] T003 [P] Install development dependencies: `jest`,
      `@testing-library/react`, `@testing-library/jest-dom`
- [x] T004 [P] Install TailwindCSS and its dependencies
- [x] T005 [P] Initialize TailwindCSS configuration
- [x] T006 [P] Configure Shadcn UI components
- [x] T007 Configure Jest and React Testing Library

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can
be implemented

- [x] T008 Create project structure as defined in `plan.md`
- [x] T009 [P] Implement the core Black-Scholes calculation logic in
      `frontend/src/lib/black-scholes.ts`
- [x] T010 [P] Implement the local storage service in
      `frontend/src/services/storage.ts`

---

## Phase 3: User Story 1 - Calculate Option Price and Greeks (Priority: P1) 🎯 MVP

**Goal**: Allow users to calculate option price and greeks.

**Independent Test**: Input a set of valid option data and verify that the
calculated price and greeks match the expected values from the Black-Scholes
model.

### Tests for User Story 1 ⚠️

- [x] T011 [P] [US1] Write unit tests for the Black-Scholes calculation logic in
      `frontend/tests/unit/black-scholes.test.ts`
- [x] T012 [P] [US1] Write integration tests for the calculator UI in
      `frontend/tests/integration/calculator.test.tsx`

### Implementation for User Story 1

- [x] T013 [P] [US1] Create the main calculator form component in
      `frontend/src/components/calculator/CalculatorForm.tsx`
- [x] T014 [P] [US1] Create the results display component in
      `frontend/src/components/calculator/ResultsDisplay.tsx`
- [x] T015 [US1] Assemble the calculator page in `frontend/src/app/page.tsx`
- [x] T016 [US1] Implement the state management for the calculator form
- [x] T017 [US1] Integrate the Black-Scholes library with the calculator UI

---

## Phase 4: User Story 2 - Calculate Implied Volatility (Priority: P2)

**Goal**: Allow users to calculate implied volatility.

**Independent Test**: Input a set of valid option data and verify that the
calculated implied volatility is correct.

### Tests for User Story 2 ⚠️

- [x] T018 [P] [US2] Write unit tests for the implied volatility calculation in
      `frontend/tests/unit/black-scholes.test.ts`

### Implementation for User Story 2

- [x] T019 [US2] Add the implied volatility calculation to the Black-Scholes
      library in `frontend/src/lib/black-scholes.ts`
- [x] T020 [US2] Update the calculator form to allow users to choose between
      calculating the option price or implied volatility

---

## Phase 5: User Story 3 - View Recent Calculations (Priority: P3)

**Goal**: Allow users to view the 10 most recent calculations.

**Independent Test**: Perform more than 10 calculations and verify that only the
last 10 are displayed.

### Tests for User Story 3 ⚠️

- [x] T021 [P] [US3] Write integration tests for the history feature in
      `frontend/tests/integration/history.test.tsx`

### Implementation for User Story 3

- [x] T022 [P] [US3] Create the history display component in
      `frontend/src/components/history/HistoryDisplay.tsx`
- [x] T023 [US3] Integrate the history component with the main page
- [x] T024 [US3] Implement the logic to save and retrieve calculations from
      local storage

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T025 [P] Implement light and dark mode support
- [x] T026 [P] Add comprehensive error handling and user feedback
- [x] T027 Refine the UI/UX based on feedback
- [x] T028 Review and update all documentation

---

## Dependencies & Execution Order

- **Phase 1 (Setup)** must be completed before any other phase.
- **Phase 2 (Foundational)** depends on Phase 1 and blocks all user stories.
- **User Stories (Phase 3-5)** can be implemented in any order after Phase 2 is
  complete, but the recommended order is by priority (US1 -> US2 -> US3).
