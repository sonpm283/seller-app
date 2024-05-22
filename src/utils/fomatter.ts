export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}
