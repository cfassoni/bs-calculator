# Feature Specification: Black-Scholes Calculator

**Feature Branch**: `001-black-scholes-calculator`
**Created**: 2025-10-30
**Status**: Draft
**Input**: User description: "The investor will be presented by a clean interface of the bs-calculator where he/she will input required data to start calculation as type of option dericative (call or put), experition date or DTE, free risk anual interest rate and either option price (to estimate IV - Implied Volatility) or the IV (to estimate option price). As result also the option greeks shall be presented. The latest 10 input data and result shall be stored for future reviews, comparison and recalculations."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Calculate Option Price and Greeks (Priority: P1)

As an investor, I want to input the required data (option type, expiration date, strike price, underlying price, risk-free rate, and implied volatility) into a clean interface to calculate the option price and its greeks (Delta, Gamma, Theta, Vega, Rho).

**Why this priority**: This is the core functionality of the application.

**Independent Test**: Can be fully tested by inputting a set of valid option data and verifying that the calculated price and greeks match the expected values from the Black-Scholes model.

**Acceptance Scenarios**:

1. **Given** the user is on the calculator page, **When** they input all required data for a call option, **Then** the system calculates and displays the call option price and its greeks.
2. **Given** the user is on the calculator page, **When** they input all required data for a put option, **Then** the system calculates and displays the put option price and its greeks.

---

### User Story 2 - Calculate Implied Volatility (Priority: P2)

As an investor, I want to input the required data (option type, expiration date, strike price, underlying price, risk-free rate, and option price) to calculate the implied volatility.

**Why this priority**: Implied volatility is a key metric for options traders.

**Independent Test**: Can be fully tested by inputting a set of valid option data and verifying that the calculated implied volatility is correct.

**Acceptance Scenarios**:

1. **Given** the user is on the calculator page, **When** they input all required data for a call option, **Then** the system calculates and displays the implied volatility.
2. **Given** the user is on the calculator page, **When** they input all required data for a put option, **Then** the system calculates and displays the implied volatility.

---

### User Story 3 - View Recent Calculations (Priority: P3)

As an investor, I want to view the 10 most recent calculations to review, compare, and recalculate them.

**Why this priority**: This feature provides convenience and allows for quick analysis of past calculations.

**Independent Test**: Can be tested by performing more than 10 calculations and verifying that only the last 10 are displayed.

**Acceptance Scenarios**:

1. **Given** the user has performed at least one calculation, **When** they navigate to the history section, **Then** the system displays a list of the most recent calculations.
2. **Given** the user is viewing the recent calculations, **When** they select a calculation, **Then** the system populates the calculator with the data from the selected calculation.

### Edge Cases

- What happens when the user inputs invalid data (e.g., negative values for price, date in the past)?
- How does the system handle calculations that result in errors (e.g., division by zero)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a user interface for inputting option data.
- **FR-002**: The system MUST calculate the option price based on the Black-Scholes model.
- **FR-003**: The system MUST calculate the implied volatility.
- **FR-004**: The system MUST calculate the option greeks: Delta, Gamma, Theta, Vega, and Rho.
- **FR-005**: The system MUST store the last 10 calculations.
- **FR-006**: The system MUST allow users to view the last 10 calculations.
- **FR-007**: The system MUST handle invalid user inputs gracefully by displaying informative error messages.

### Key Entities *(include if feature involves data)*

- **Calculation**: Represents a single Black-Scholes calculation.
  - **Inputs**: Option Type, Expiration Date, Strike Price, Underlying Price, Risk-Free Rate, Implied Volatility/Option Price.
  - **Outputs**: Option Price/Implied Volatility, Delta, Gamma, Theta, Vega, Rho.

## Assumptions

- The Black-Scholes model is the desired model for option pricing.
- The calculations do not need to account for dividends.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can calculate option prices and greeks in under 2 seconds.
- **SC-002**: The calculator's results for price and greeks must be accurate to within 0.01% of the theoretical Black-Scholes model values.
- **SC-003**: The user interface must be intuitive and easy to use, achieving a user satisfaction score of over 90% in user testing.
- **SC-004**: The system must be able to handle at least 100 concurrent users without performance degradation.