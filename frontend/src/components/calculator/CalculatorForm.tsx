'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { OptionInput } from '@/types/options';

type CalculationMode = 'price' | 'impliedVolatility';

interface CalculatorFormProps {
  onCalculate: (
    input: OptionInput,
    mode: CalculationMode,
    targetPrice?: number,
  ) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [mode, setMode] = useState<CalculationMode>('price');
  const [formData, setFormData] = useState<OptionInput>({
    optionType: 'call',
    strikePrice: 100,
    underlyingPrice: 100,
    timeToExpiration: 1,
    riskFreeRate: 0.05,
    volatility: 0.2,
  });
  const [targetPrice, setTargetPrice] = useState<number>(10);

  const [errors, setErrors] = useState<
    Partial<Record<keyof OptionInput | 'targetPrice', string>>
  >({});

  const handleInputChange = (field: keyof OptionInput, value: string) => {
    const numValue = field === 'optionType' ? value : parseFloat(value);
    setFormData(prev => ({
      ...prev,
      [field]: numValue,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<
      Record<keyof OptionInput | 'targetPrice', string>
    > = {};

    if (formData.strikePrice <= 0) {
      newErrors.strikePrice = 'Strike price must be positive';
    }
    if (formData.underlyingPrice <= 0) {
      newErrors.underlyingPrice = 'Underlying price must be positive';
    }
    if (formData.timeToExpiration <= 0) {
      newErrors.timeToExpiration = 'Time to expiration must be positive';
    }
    if (formData.riskFreeRate < 0) {
      newErrors.riskFreeRate = 'Risk-free rate cannot be negative';
    }

    if (mode === 'price') {
      if (formData.volatility <= 0) {
        newErrors.volatility = 'Volatility must be positive';
      }
    } else {
      if (targetPrice <= 0) {
        newErrors.targetPrice = 'Target price must be positive';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate(
        formData,
        mode,
        mode === 'impliedVolatility' ? targetPrice : undefined,
      );
    }
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Black-Scholes Calculator</CardTitle>
        <CardDescription>
          Calculate option prices, Greeks, and implied volatility using the
          Black-Scholes model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='calculationMode'>Calculation Mode</Label>
              <select
                id='calculationMode'
                value={mode}
                onChange={e => setMode(e.target.value as CalculationMode)}
                className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              >
                <option value='price'>Calculate Option Price</option>
                <option value='impliedVolatility'>
                  Calculate Implied Volatility
                </option>
              </select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='optionType'>Option Type</Label>
              <select
                id='optionType'
                value={formData.optionType}
                onChange={e => handleInputChange('optionType', e.target.value)}
                className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              >
                <option value='call'>Call</option>
                <option value='put'>Put</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='strikePrice'>Strike Price ($)</Label>
              <Input
                id='strikePrice'
                type='number'
                step='0.01'
                value={formData.strikePrice}
                onChange={e => handleInputChange('strikePrice', e.target.value)}
                className={errors.strikePrice ? 'border-red-500' : ''}
              />
              {errors.strikePrice && (
                <p className='text-sm text-red-500'>{errors.strikePrice}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='underlyingPrice'>Underlying Price ($)</Label>
              <Input
                id='underlyingPrice'
                type='number'
                step='0.01'
                value={formData.underlyingPrice}
                onChange={e =>
                  handleInputChange('underlyingPrice', e.target.value)
                }
                className={errors.underlyingPrice ? 'border-red-500' : ''}
              />
              {errors.underlyingPrice && (
                <p className='text-sm text-red-500'>{errors.underlyingPrice}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='timeToExpiration'>
                Time to Expiration (years)
              </Label>
              <Input
                id='timeToExpiration'
                type='number'
                step='0.01'
                value={formData.timeToExpiration}
                onChange={e =>
                  handleInputChange('timeToExpiration', e.target.value)
                }
                className={errors.timeToExpiration ? 'border-red-500' : ''}
              />
              {errors.timeToExpiration && (
                <p className='text-sm text-red-500'>
                  {errors.timeToExpiration}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='riskFreeRate'>Risk-Free Rate (%)</Label>
              <Input
                id='riskFreeRate'
                type='number'
                step='0.001'
                value={formData.riskFreeRate * 100}
                onChange={e =>
                  handleInputChange(
                    'riskFreeRate',
                    (parseFloat(e.target.value) / 100).toString(),
                  )
                }
                className={errors.riskFreeRate ? 'border-red-500' : ''}
              />
              {errors.riskFreeRate && (
                <p className='text-sm text-red-500'>{errors.riskFreeRate}</p>
              )}
            </div>

            {mode === 'price' ? (
              <div className='space-y-2'>
                <Label htmlFor='volatility'>Volatility (%)</Label>
                <Input
                  id='volatility'
                  type='number'
                  step='0.01'
                  value={formData.volatility * 100}
                  onChange={e =>
                    handleInputChange(
                      'volatility',
                      (parseFloat(e.target.value) / 100).toString(),
                    )
                  }
                  className={errors.volatility ? 'border-red-500' : ''}
                />
                {errors.volatility && (
                  <p className='text-sm text-red-500'>{errors.volatility}</p>
                )}
              </div>
            ) : (
              <div className='space-y-2'>
                <Label htmlFor='targetPrice'>Market Option Price ($)</Label>
                <Input
                  id='targetPrice'
                  type='number'
                  step='0.01'
                  value={targetPrice}
                  onChange={e => {
                    setTargetPrice(parseFloat(e.target.value));
                    if (errors.targetPrice) {
                      setErrors(prev => ({ ...prev, targetPrice: undefined }));
                    }
                  }}
                  className={errors.targetPrice ? 'border-red-500' : ''}
                />
                {errors.targetPrice && (
                  <p className='text-sm text-red-500'>{errors.targetPrice}</p>
                )}
              </div>
            )}
          </div>

          <Button type='submit' className='w-full'>
            {mode === 'price'
              ? 'Calculate Option Price'
              : 'Calculate Implied Volatility'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
