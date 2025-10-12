import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../services/axiosInstance";

export type Currency = "USD" | "NGN" | "EUR" | "GBP";

export interface CurrencyConversionResponse {
  base: string;
  target: string;
  amount: number;
  convertedAmount: number;
  rate: number;
}

// Cache duration for currency rates (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

export const useCurrencyConverter = () => {
  // Function to convert currency using API
  const convertCurrency = async (
    amount: number,
    from: Currency,
    to: Currency
  ): Promise<number> => {
    if (from === to) return amount;

    try {
      const response = await axiosInstance.get(
        `miscs/convert-currency/?base=${from}&target=${to}&amount=${amount}`
      );

      return response.data.convertedAmount || amount;
    } catch (error) {
      console.error("Currency conversion failed:", error);
      // Fallback to simple conversion if API fails
      return getFallbackConversion(amount, from, to);
    }
  };

  // Synchronous version for immediate use (uses fallback rates)
  const convertCurrencySync = (
    amount: number,
    from: Currency,
    to: Currency
  ): number => {
    if (from === to) return amount;
    return getFallbackConversion(amount, from, to);
  };

  // Fallback conversion for when API is unavailable
  const getFallbackConversion = (
    amount: number,
    from: Currency,
    to: Currency
  ): number => {
    // Simple fallback rates (can be updated periodically)
    const fallbackRates: Record<string, number> = {
      USD_NGN: 1500,
      NGN_USD: 1 / 1500,
      USD_EUR: 0.85,
      EUR_USD: 1 / 0.85,
      USD_GBP: 0.73,
      GBP_USD: 1 / 0.73,
      EUR_NGN: 1500 * 0.85,
      NGN_EUR: 1 / (1500 * 0.85),
      GBP_NGN: 1500 * 0.73,
      NGN_GBP: 1 / (1500 * 0.73),
      EUR_GBP: 0.73 / 0.85,
      GBP_EUR: 0.85 / 0.73,
    };

    const rateKey = `${from}_${to}`;
    const rate = fallbackRates[rateKey] || 1;

    return amount * rate;
  };

  // Hook for getting conversion rate (cached)
  const useConversionRate = (
    from: Currency,
    to: Currency,
    amount: number = 1
  ) => {
    return useQuery({
      queryKey: ["currency-conversion", from, to, amount],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `miscs/convert-currency/?base=${from}&target=${to}&amount=${amount}`
        );
        return response.data as CurrencyConversionResponse;
      },
      staleTime: CACHE_DURATION,
      gcTime: CACHE_DURATION,
      retry: 2,
      retryDelay: 1000,
    });
  };

  return {
    convertCurrency,
    convertCurrencySync,
    useConversionRate,
    getFallbackConversion,
  };
};

// Utility function for formatting currency
export const formatCurrency = (amount: number, currency: Currency): string => {
  const roundedAmount = Math.round(amount * 100) / 100;

  const currencyConfig: Record<
    Currency,
    { symbol: string; locale: string; code: string }
  > = {
    USD: { symbol: "$", locale: "en-US", code: "USD" },
    NGN: { symbol: "₦", locale: "en-NG", code: "NGN" },
    EUR: { symbol: "€", locale: "en-EU", code: "EUR" },
    GBP: { symbol: "£", locale: "en-GB", code: "GBP" },
  };

  const config = currencyConfig[currency];

  if (currency === "NGN") {
    // NGN formatting with no decimal places
    return `${config.symbol}${roundedAmount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }

  // Other currencies with standard formatting
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(roundedAmount);
};

// Get currency symbol
export const getCurrencySymbol = (currency: Currency): string => {
  const symbols: Record<Currency, string> = {
    USD: "$",
    NGN: "₦",
    EUR: "€",
    GBP: "£",
  };
  return symbols[currency];
};
