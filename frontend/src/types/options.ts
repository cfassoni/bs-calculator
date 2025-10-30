
export interface OptionInput {
  optionType: 'call' | 'put';
  strikePrice: number;
  underlyingPrice: number;
  timeToExpiration: number; // in years
  riskFreeRate: number;
  volatility: number;
}

export interface Greeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
}

export interface Calculation extends OptionInput {
  id: string;
  optionPrice: number;
  greeks: Greeks;
}
