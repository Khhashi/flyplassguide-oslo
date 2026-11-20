import { useWindowDimensions } from 'react-native';

/** Fra denne bredden viser vi sidemeny i stedet for faner nederst. */
export const WIDE_BREAKPOINT = 900;

export function isWideLayout(width: number): boolean {
  return width >= WIDE_BREAKPOINT;
}

export function useIsWide(): boolean {
  const { width } = useWindowDimensions();
  return isWideLayout(width);
}
