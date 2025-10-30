'use client';

import React, { useState, useEffect } from 'react';
import { CalculatorForm } from '@/components/calculator/CalculatorForm';
import { ResultsDisplay } from '@/components/calculator/ResultsDisplay';
import { HistoryDisplay } from '@/components/history/HistoryDisplay';
import { blackScholes, calculateImpliedVolatility } from '@/lib/black-scholes';
import { saveCalculation, getCalculations } from '@/services/storage';
import { Calculation, OptionInput } from '@/types/options';

type CalculationMode = 'price' | 'impliedVolatility';

export default function Home() {
  const [currentCalculation, setCurrentCalculation] =
    useState<Calculation | null>(null);
  const [impliedVol, setImpliedVol] = useState<number | null>(null);
  const [history, setHistory] = useState<Calculation[]>(() => {
    // Initialize with existing calculations from localStorage
    if (typeof window !== 'undefined') {
      return getCalculations();
    }
    return [];
  });

  const handleCalculate = (
    input: OptionInput,
    mode: CalculationMode,
    targetPrice?: number,
  ) => {
    if (mode === 'price') {
      // Calculate using Black-Scholes model
      const calculation = blackScholes(input);

      // Update current calculation state
      setCurrentCalculation(calculation);
      setImpliedVol(null);

      // Save to local storage and update history
      saveCalculation(calculation);
      setHistory(getCalculations());
    } else if (mode === 'impliedVolatility' && targetPrice) {
      // Calculate implied volatility
      const calculatedVol = calculateImpliedVolatility(
        targetPrice,
        input.optionType,
        input.strikePrice,
        input.underlyingPrice,
        input.timeToExpiration,
        input.riskFreeRate,
      );

      // Create a calculation with the calculated volatility
      const calculation = blackScholes({
        ...input,
        volatility: calculatedVol,
      });

      setCurrentCalculation(calculation);
      setImpliedVol(calculatedVol);

      // Save to local storage and update history
      saveCalculation(calculation);
      setHistory(getCalculations());
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900'>
      <main className='container mx-auto px-4 py-8'>
        <div className='max-w-7xl mx-auto space-y-8'>
          {/* Header */}
          <div className='text-center space-y-2'>
            <h1 className='text-4xl font-bold tracking-tight'>
              Black-Scholes Calculator
            </h1>
            <p className='text-lg text-muted-foreground'>
              Calculate European option prices, Greeks, and implied volatility
              using the Black-Scholes-Merton model
            </p>
          </div>

          {/* Implied Volatility Result */}
          {impliedVol !== null && (
            <div className='max-w-md mx-auto p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg'>
              <p className='text-center'>
                <span className='text-sm text-muted-foreground'>
                  Implied Volatility:
                </span>{' '}
                <span className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                  {(impliedVol * 100).toFixed(2)}%
                </span>
              </p>
            </div>
          )}

          {/* Main Content Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Calculator Form */}
            <div>
              <CalculatorForm onCalculate={handleCalculate} />
            </div>

            {/* Results Display */}
            <div>
              <ResultsDisplay calculation={currentCalculation} />
            </div>
          </div>

          {/* Calculation History */}
          {history.length > 0 && (
            <div className='max-w-4xl mx-auto'>
              <HistoryDisplay
                calculations={history}
                onSelectCalculation={calc => {
                  setCurrentCalculation(calc);
                  setImpliedVol(null);
                }}
              />
            </div>
          )}

          {/* Footer */}
          <div className='text-center text-sm text-muted-foreground pt-8 border-t'>
            <p>
              The Black-Scholes model is used for pricing European-style
              options. This calculator assumes no dividends and constant
              volatility.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
