export const isServer =
  typeof document === "undefined" || typeof window === "undefined";
