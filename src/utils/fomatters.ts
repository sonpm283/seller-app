export function formatCurrency(currency: number) {
  if (!currency) return '0'
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function capitalizeFirstLetter(str: string) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
