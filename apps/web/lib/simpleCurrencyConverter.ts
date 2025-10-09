// Simple currency converter for USD/NGN
export type Currency = 'USD' | 'NGN';

// Current exchange rate (1 USD = 1500 NGN)
const USD_TO_NGN_RATE = 1500;

export const convertCurrency = (amount: number, from: Currency, to: Currency): number => {
  if (from === to) return amount;
  
  if (from === 'USD' && to === 'NGN') {
    return amount * USD_TO_NGN_RATE;
  }
  
  if (from === 'NGN' && to === 'USD') {
    return amount / USD_TO_NGN_RATE;
  }
  
  return amount;
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  const roundedAmount = Math.round(amount * 100) / 100;
  
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(roundedAmount);
  }
  
  // NGN formatting
  return `₦${roundedAmount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

export const getCurrencySymbol = (currency: Currency): string => {
  return currency === 'USD' ? '$' : '₦';
};
