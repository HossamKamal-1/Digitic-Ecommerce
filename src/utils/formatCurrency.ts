const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  compactDisplay: 'long',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function formatCurrency(currency: number | bigint) {
  return CURRENCY_FORMATTER.format(currency);
}
