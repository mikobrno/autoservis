// gtag zapisuje globální funkci, kterou TypeScript sám nezná.
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
