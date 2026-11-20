import { WIDE_BREAKPOINT, isWideLayout } from '../useLayout';

describe('isWideLayout', () => {
  it('bruker faner nederst på mobil', () => {
    expect(isWideLayout(390)).toBe(false);
  });

  it('bruker sidemeny fra og med brytepunktet', () => {
    expect(isWideLayout(WIDE_BREAKPOINT - 1)).toBe(false);
    expect(isWideLayout(WIDE_BREAKPOINT)).toBe(true);
    expect(isWideLayout(1280)).toBe(true);
  });
});
