# Simple Currency Toggle

A sleek, minimal currency conversion feature that allows users to view rental prices in USD or NGN.

## Features

- **Simple Toggle**: Clean dropdown to switch between USD and NGN
- **Smart Price Selection**: Automatically uses the best available price (USD if available, otherwise NGN)
- **Real-time Conversion**: Instant conversion when user changes currency
- **Visual Indicators**: Small "~" badge shows when prices are converted
- **Minimal Design**: Tiny, unobtrusive toggle that appears only when needed

## Components

### SimpleCurrencyToggle
A small, sleek toggle component that appears in pricing sections.

```typescript
<SimpleCurrencyToggle
  currentCurrency={displayCurrency}
  onCurrencyChange={setDisplayCurrency}
/>
```

### Currency Converter
Simple utility for USD/NGN conversion with current exchange rate (1 USD = 1500 NGN).

```typescript
import { convertCurrency, formatCurrency } from '@/lib/simpleCurrencyConverter';

// Convert 100 USD to NGN
const ngnAmount = convertCurrency(100, 'USD', 'NGN'); // 150000

// Format for display
const formatted = formatCurrency(150000, 'NGN'); // "₦150,000"
```

## How It Works

1. **Price Selection Logic**:
   - If USD price is available and > 0 → use USD price
   - Otherwise → use NGN price

2. **Currency Conversion**:
   - If user's selected currency matches original → show original price
   - Otherwise → convert and show converted price with "~" indicator

3. **User Experience**:
   - Toggle appears in pricing sections
   - Click to switch between USD/NGN
   - All prices update instantly
   - Converted prices show "~" badge

## Integration

The toggle is integrated into:
- `ApartmentCard` - Shows in pricing section
- `PropertyDetailsModal` - Shows in detailed pricing section

## Example Usage

```typescript
const [displayCurrency, setDisplayCurrency] = useState<Currency>('USD');

// In your component
<div className="pricing-section">
  <div className="flex items-center justify-between">
    <h4>Pricing</h4>
    <SimpleCurrencyToggle
      currentCurrency={displayCurrency}
      onCurrencyChange={setDisplayCurrency}
    />
  </div>
  
  <div className="price">
    {formatPrice(apartment.rentFee, apartment.dollarPrice.rentFee)}
    {isPriceConverted(apartment.rentFee, apartment.dollarPrice.rentFee) && (
      <span className="conversion-indicator">~</span>
    )}
  </div>
</div>
```

## Exchange Rate

Current rate: **1 USD = 1500 NGN**

To update the rate, modify `USD_TO_NGN_RATE` in `simpleCurrencyConverter.ts`.

## Design Philosophy

- **Minimal**: Only appears when needed
- **Sleek**: Small, clean design that doesn't interfere with content
- **Clear**: Visual indicators show when prices are converted
- **Fast**: Instant conversion without page reload
- **User-friendly**: Simple click to switch currencies
