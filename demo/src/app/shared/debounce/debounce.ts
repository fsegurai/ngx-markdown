/**
 * Debounce function to avoid multiple calls to the same function
 * @param func - Function to be debounced
 * @param delay - Delay in milliseconds
 */
// biome-ignore lint/complexity/noBannedTypes: debounce wraps arbitrary callbacks
export function debounce(func: Function, delay: number) {
  // biome-ignore lint/suspicious/noExplicitAny: debounce forwards arbitrary arguments
  let debounceTimer: any;
  // biome-ignore lint/suspicious/noExplicitAny: debounce forwards arbitrary arguments
  return (...args: any[]) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    clearTimeout(debounceTimer);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-argument
    debounceTimer = setTimeout(() => func(...args), delay);
  };
}
