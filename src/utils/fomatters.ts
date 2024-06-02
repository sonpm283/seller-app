export function formatCurrency(currency: number) {
  if (!currency) return '0'
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function capitalizeFirstLetter(str: string) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const interceptorLoadingElements = (calling: boolean) => {
  const elements= document.querySelectorAll('.interceptor-loading')
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i] as HTMLElement
    if (calling) {
      element.style.opacity = '0.5'
      element.style.pointerEvents = 'none'
    } else {
      element.style.opacity = 'initial'
      element.style.pointerEvents = 'initial'
    }
  }
}