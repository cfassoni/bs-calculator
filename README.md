# Black-Scholes Calculator

A modern, full-featured Black-Scholes options pricing calculator built with
Next.js, React, TypeScript, and TailwindCSS.

## Features

### Core Functionality

- **Option Price Calculation**: Calculate European call and put option prices
  using the Black-Scholes-Merton model
- **Greeks Calculation**: Compute all major Greeks (Delta, Gamma, Theta, Vega,
  Rho)
- **Implied Volatility**: Calculate implied volatility from market option prices
  using Newton-Raphson method
- **Calculation History**: View and reload up to 10 most recent calculations

### User Interface

- Clean, modern interface with Shadcn UI components
- Responsive design that works on desktop, tablet, and mobile
- Dark mode support
- Real-time form validation with helpful error messages
- Interactive history with one-click reload of previous calculations

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Components**: Shadcn UI
- **Testing**: Jest + React Testing Library
- **Storage**: Browser LocalStorage API

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd bs-calculator
```

2. Install dependencies:

```bash
cd frontend
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

### Running Tests

```bash
npm test
```

## Usage

### Calculating Option Price

1. Select "Calculate Option Price" mode
2. Choose option type (Call or Put)
3. Enter the following parameters:
   - Strike Price: The strike/exercise price of the option
   - Underlying Price: Current price of the underlying asset
   - Time to Expiration: Time until expiration in years
   - Risk-Free Rate: Risk-free interest rate (as percentage)
   - Volatility: Historical or implied volatility (as percentage)
4. Click "Calculate Option Price"

### Calculating Implied Volatility

1. Select "Calculate Implied Volatility" mode
2. Choose option type (Call or Put)
3. Enter the following parameters:
   - Strike Price
   - Underlying Price
   - Time to Expiration
   - Risk-Free Rate
   - Market Option Price: The observed market price of the option
4. Click "Calculate Implied Volatility"

The calculator will use the Newton-Raphson method to find the volatility that
produces the given market price.

### Viewing History

- Recent calculations automatically appear below the main calculator
- Click any historical calculation to reload it into the results display
- History is limited to the 10 most recent calculations
- History is stored in browser localStorage and persists across sessions

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Main calculator page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── calculator/        # Calculator components
│   │   │   ├── CalculatorForm.tsx
│   │   │   └── ResultsDisplay.tsx
│   │   ├── history/           # History components
│   │   │   └── HistoryDisplay.tsx
│   │   └── ui/                # Shadcn UI components
│   ├── lib/
│   │   ├── black-scholes.ts   # Core BS calculation logic
│   │   └── utils.ts           # Utility functions
│   ├── services/
│   │   └── storage.ts         # LocalStorage service
│   └── types/
│       └── options.ts         # TypeScript type definitions
└── tests/
    ├── unit/                   # Unit tests
    │   └── black-scholes.test.ts
    └── integration/            # Integration tests
        ├── calculator.test.tsx
        └── history.test.tsx
```

## Black-Scholes Model

The Black-Scholes model is used to calculate the theoretical price of
European-style options. The model makes several assumptions:

- The underlying asset follows a geometric Brownian motion
- No dividends are paid during the option's life
- Markets are efficient (no arbitrage opportunities)
- Risk-free rate and volatility are constant
- European-style options (can only be exercised at expiration)

### Formula

For a call option:

```
C = S₀N(d₁) - Ke^(-rT)N(d₂)
```

For a put option:

```
P = Ke^(-rT)N(-d₂) - S₀N(-d₁)
```

Where:

- C/P = Call/Put option price
- S₀ = Current stock price
- K = Strike price
- r = Risk-free rate
- T = Time to expiration
- σ = Volatility
- N(x) = Cumulative standard normal distribution

## Testing

The project includes comprehensive test coverage:

- **Unit Tests**: Test core Black-Scholes calculations
- **Integration Tests**: Test UI components and user interactions
- **Type Safety**: Full TypeScript coverage ensures type safety

Run tests with:

```bash
npm test
```

## Contributing

Contributions are welcome! Please ensure:

- All tests pass
- Code follows TypeScript best practices
- UI components maintain responsive design
- New features include appropriate tests

## License

MIT

## Acknowledgments

- Black-Scholes-Merton model by Fischer Black, Myron Scholes, and Robert Merton
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Built with [Next.js](https://nextjs.org/)
