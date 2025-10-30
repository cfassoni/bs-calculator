# Data Model: Black-Scholes Calculator

**Purpose**: To define the data structures used in the application.

## Entities

### Calculation

Represents a single Black-Scholes calculation, including its inputs and results.

**Fields**:

- `id` (string): A unique identifier for the calculation (e.g., a timestamp).
- `optionType` (string): The type of option, either "call" or "put".
- `expirationDate` (string): The expiration date of the option in ISO format.
- `strikePrice` (number): The strike price of the option.
- `underlyingPrice` (number): The current price of the underlying asset.
- `riskFreeRate` (number): The risk-free interest rate.
- `volatility` (number): The implied volatility of the underlying asset.
- `optionPrice` (number): The calculated price of the option.
- `greeks` (object): An object containing the calculated option greeks.
  - `delta` (number)
  - `gamma` (number)
  - `theta` (number)
  - `vega` (number)
  - `rho` (number)

**Validation Rules**:

- All numerical inputs must be positive numbers.
- `optionType` must be either "call" or "put".
- `expirationDate` must be a valid date in the future.
