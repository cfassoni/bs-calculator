import { Calculation, OptionInput, Greeks } from '../types/options';

// Cumulative distribution function for the standard normal distribution
function cdf(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  let prob =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.7814779 + t * (-1.821256 + t * 1.330274))));
  if (x > 0) {
    prob = 1 - prob;
  }
  return prob;
}

// Probability density function for the standard normal distribution
function pdf(x: number): number {
  return Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);
}

export function blackScholes(optionInput: OptionInput): Calculation {
  const {
    strikePrice,
    underlyingPrice,
    riskFreeRate,
    volatility,
    timeToExpiration,
    optionType,
  } = optionInput;

  const d1 =
    (Math.log(underlyingPrice / strikePrice) +
      (riskFreeRate + 0.5 * volatility * volatility) * timeToExpiration) /
    (volatility * Math.sqrt(timeToExpiration));
  const d2 = d1 - volatility * Math.sqrt(timeToExpiration);

  let optionPrice: number;
  let greeks: Greeks;

  if (optionType === 'call') {
    optionPrice =
      underlyingPrice * cdf(d1) -
      strikePrice * Math.exp(-riskFreeRate * timeToExpiration) * cdf(d2);
    greeks = {
      delta: cdf(d1),
      gamma:
        pdf(d1) / (underlyingPrice * volatility * Math.sqrt(timeToExpiration)),
      theta:
        -(underlyingPrice * pdf(d1) * volatility) /
          (2 * Math.sqrt(timeToExpiration)) -
        riskFreeRate *
          strikePrice *
          Math.exp(-riskFreeRate * timeToExpiration) *
          cdf(d2),
      vega: underlyingPrice * pdf(d1) * Math.sqrt(timeToExpiration),
      rho:
        strikePrice *
        timeToExpiration *
        Math.exp(-riskFreeRate * timeToExpiration) *
        cdf(d2),
    };
  } else {
    // put
    optionPrice =
      strikePrice * Math.exp(-riskFreeRate * timeToExpiration) * cdf(-d2) -
      underlyingPrice * cdf(-d1);
    greeks = {
      delta: cdf(d1) - 1,
      gamma:
        pdf(d1) / (underlyingPrice * volatility * Math.sqrt(timeToExpiration)),
      theta:
        -(underlyingPrice * pdf(d1) * volatility) /
          (2 * Math.sqrt(timeToExpiration)) +
        riskFreeRate *
          strikePrice *
          Math.exp(-riskFreeRate * timeToExpiration) *
          cdf(-d2),
      vega: underlyingPrice * pdf(d1) * Math.sqrt(timeToExpiration),
      rho:
        -strikePrice *
        timeToExpiration *
        Math.exp(-riskFreeRate * timeToExpiration) *
        cdf(-d2),
    };
  }

  return {
    id: new Date().toISOString(),
    ...optionInput,
    optionPrice,
    greeks,
  };
}

// Calculate implied volatility using Newton-Raphson method
export function calculateImpliedVolatility(
  targetPrice: number,
  optionType: 'call' | 'put',
  strikePrice: number,
  underlyingPrice: number,
  timeToExpiration: number,
  riskFreeRate: number,
  initialGuess: number = 0.3,
  tolerance: number = 0.0001,
  maxIterations: number = 100,
): number {
  let volatility = initialGuess;

  for (let i = 0; i < maxIterations; i++) {
    // Calculate option price with current volatility guess
    const optionInput: OptionInput = {
      optionType,
      strikePrice,
      underlyingPrice,
      timeToExpiration,
      riskFreeRate,
      volatility,
    };

    const result = blackScholes(optionInput);
    const calculatedPrice = result.optionPrice;
    const vega = result.greeks.vega;

    // Calculate price difference
    const priceDiff = calculatedPrice - targetPrice;

    // Check for convergence
    if (Math.abs(priceDiff) < tolerance) {
      return volatility;
    }

    // Newton-Raphson update: volatility_new = volatility_old - f(x)/f'(x)
    // where f(x) = BS_price - target_price and f'(x) = vega
    if (vega === 0) {
      // Avoid division by zero
      break;
    }

    volatility = volatility - priceDiff / vega;

    // Keep volatility in reasonable bounds
    volatility = Math.max(0.001, Math.min(volatility, 5.0));
  }

  // Return the last calculated volatility even if not fully converged
  return volatility;
}
