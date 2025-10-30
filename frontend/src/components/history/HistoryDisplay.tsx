'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Calculation } from '@/types/options';

interface HistoryDisplayProps {
  calculations: Calculation[];
  onSelectCalculation?: (calculation: Calculation) => void;
}

export function HistoryDisplay({
  calculations,
  onSelectCalculation,
}: HistoryDisplayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (calculations.length === 0) {
    return (
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Calculation History</CardTitle>
          <CardDescription>
            Your recent calculations will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-center py-8'>
            No calculations yet. Use the calculator above to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Calculation History</CardTitle>
        <CardDescription>
          Last {calculations.length} calculation(s)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-3 max-h-[600px] overflow-y-auto'>
          {calculations.map((calc, index) => (
            <div
              key={calc.id}
              className={`p-4 border rounded-lg transition-colors ${
                onSelectCalculation
                  ? 'cursor-pointer hover:bg-accent hover:border-accent-foreground/20'
                  : ''
              }`}
              onClick={() => onSelectCalculation?.(calc)}
            >
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold text-sm'>
                    {calc.optionType === 'call' ? '📈' : '📉'}{' '}
                    {calc.optionType.toUpperCase()}
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    {formatDate(calc.id)}
                  </span>
                </div>
                <span className='font-bold text-lg'>
                  {formatCurrency(calc.optionPrice)}
                </span>
              </div>

              <div className='grid grid-cols-3 gap-2 text-xs'>
                <div>
                  <span className='text-muted-foreground'>Strike:</span>{' '}
                  <span className='font-medium'>
                    {formatCurrency(calc.strikePrice)}
                  </span>
                </div>
                <div>
                  <span className='text-muted-foreground'>Spot:</span>{' '}
                  <span className='font-medium'>
                    {formatCurrency(calc.underlyingPrice)}
                  </span>
                </div>
                <div>
                  <span className='text-muted-foreground'>Vol:</span>{' '}
                  <span className='font-medium'>
                    {(calc.volatility * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className='mt-2 pt-2 border-t grid grid-cols-5 gap-1 text-xs'>
                <div className='text-center'>
                  <div className='text-muted-foreground'>Δ</div>
                  <div className='font-medium'>
                    {calc.greeks.delta.toFixed(3)}
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-muted-foreground'>Γ</div>
                  <div className='font-medium'>
                    {calc.greeks.gamma.toFixed(4)}
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-muted-foreground'>Θ</div>
                  <div className='font-medium'>
                    {calc.greeks.theta.toFixed(2)}
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-muted-foreground'>ν</div>
                  <div className='font-medium'>
                    {calc.greeks.vega.toFixed(2)}
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-muted-foreground'>ρ</div>
                  <div className='font-medium'>
                    {calc.greeks.rho.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
