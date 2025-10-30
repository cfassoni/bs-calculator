import { Calculation } from '../types/options';

const MAX_HISTORY_LENGTH = 10;
const HISTORY_KEY = 'black-scholes-history';

export function saveCalculation(calculation: Calculation): void {
  const history = getCalculations();
  const newHistory = [calculation, ...history].slice(0, MAX_HISTORY_LENGTH);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
}

export function getCalculations(): Calculation[] {
  const historyJson = localStorage.getItem(HISTORY_KEY);
  if (historyJson) {
    return JSON.parse(historyJson);
  }
  return [];
}