export default function currencyFormatter(currency) {
  return Intl.NumberFormat('en-US',{ 
  style: 'currency',
  currency: currency,
  minimumFractionDigits: 2});
}