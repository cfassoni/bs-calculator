'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calculation } from '@/types/options';

interface ResultsDisplayProps {
  calculation: Calculation | null;
}

export function ResultsDisplay({ calculation }: ResultsDisplayProps) {
  if (!calculation) {
    return (
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-center py-8'>
            Enter your parameters and click Calculate to see results
          </p>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 4) => {
    return value.toFixed(decimals);
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Option Price */}
        <div className='p-4 bg-primary/10 rounded-lg'>
          <h3 className='text-sm font-medium text-muted-foreground mb-1'>
            {calculation.optionType === 'call' ? 'Call' : 'Put'} Option Price
          </h3>
          <p className='text-3xl font-bold'>
            {formatCurrency(calculation.optionPrice)}
          </p>
        </div>

        {/* Greeks */}
        <div>
          <h3 className='text-lg font-semibold mb-3'>Greeks</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='p-3 border rounded-lg'>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-muted-foreground'>
                  Delta (Δ)
                </span>
                <span className='text-lg font-semibold'>
                  {formatNumber(calculation.greeks.delta)}
                </span>
              </div>
              <p className='text-xs text-muted-foreground mt-1'>
                Price sensitivity to underlying price change
              </p>
            </div>

            <div className='p-3 border rounded-lg'>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-muted-foreground'>
                  Gamma (Γ)
                </span>
                <span className='text-lg font-semibold'>
                  {formatNumber(calculation.greeks.gamma)}
                </span>
              </div>
              <p className='text-xs text-muted-foreground mt-1'>
                Rate of change of delta
              </p>
            </div>

            <div className='p-3 border rounded-lg'>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-muted-foreground'>
                  Theta (Θ)
                </span>
                <span className='text-lg font-semibold'>
                  {formatNumber(calculation.greeks.theta)}
                </span>
              </div>
              <p className='text-xs text-muted-foreground mt-1'>
                Time decay per day
              </p>
            </div>

            <div className='p-3 border rounded-lg'>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-muted-foreground'>
                  Vega (ν)
                </span>
                <span className='text-lg font-semibold'>
                  {formatNumber(calculation.greeks.vega)}
                </span>
              </div>
              <p className='text-xs text-muted-foreground mt-1'>
                Sensitivity to volatility changes
              </p>
            </div>

            <div className='p-3 border rounded-lg'>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-muted-foreground'>
                  Rho (ρ)
                </span>
                <span className='text-lg font-semibold'>
                  {formatNumber(calculation.greeks.rho)}
                </span>
              </div>
              <p className='text-xs text-muted-foreground mt-1'>
                Sensitivity to interest rate changes
              </p>
            </div>
          </div>
        </div>

        {/* Input Summary */}
        <div className='pt-4 border-t'>
          <h3 className='text-sm font-medium text-muted-foreground mb-2'>
            Input Parameters
          </h3>
          <div className='grid grid-cols-2 gap-2 text-sm'>
            <div>
              <span className='text-muted-foreground'>Strike:</span>{' '}
              <span className='font-medium'>
                {formatCurrency(calculation.strikePrice)}
              </span>
            </div>
            <div>
              <span className='text-muted-foreground'>Underlying:</span>{' '}
              <span className='font-medium'>
                {formatCurrency(calculation.underlyingPrice)}
              </span>
            </div>
            <div>
              <span className='text-muted-foreground'>Time:</span>{' '}
              <span className='font-medium'>
                {calculation.timeToExpiration} years
              </span>
            </div>
            <div>
              <span className='text-muted-foreground'>Rate:</span>{' '}
              <span className='font-medium'>
                {(calculation.riskFreeRate * 100).toFixed(2)}%
              </span>
            </div>
            <div>
              <span className='text-muted-foreground'>Volatility:</span>{' '}
              <span className='font-medium'>
                {(calculation.volatility * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
