import { z } from 'zod';

/**
 * Hvor en bit data kommer fra.
 *
 * - `verified`: hentet fra en verifisert kilde (f.eks. Avinor) og kan vises som ekte.
 * - `demo`: eksempeldata for utvikling. Skal alltid merkes tydelig i UI.
 * - `illustration`: kun for design/illustrasjon. Skal aldri brukes som fakta.
 */
export const DataSourceSchema = z.enum(['verified', 'demo', 'illustration']);
export type DataSource = z.infer<typeof DataSourceSchema>;

/** Sann hvis data må merkes som ikke-ekte i brukergrensesnittet. */
export function requiresDemoLabel(source: DataSource): boolean {
  return source !== 'verified';
}
