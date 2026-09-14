const RIAL_TO_TOMAN = 10;

/**
 * Formats an integer Rial amount as Toman, which is what drivers actually read.
 */
export function formatToman(rial: number): string {
  const toman = rial / RIAL_TO_TOMAN;

  return `${toman.toLocaleString('en-US')} Toman`;
}

export function formatWeight(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} t`;
  }

  return `${kg} kg`;
}

export function formatPickupDate(iso: string): string {
  const date = new Date(iso);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
