import type { DataSource } from '@airportguide/shared';

export type PlaceCategory = 'gate' | 'toilet' | 'food' | 'shop';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  floor: number;
  source: DataSource;
}

export const FLOORS = [1, 2] as const;

/**
 * Oppdiktede steder for å teste kartskjermen. Ikke ekte plasseringer på Gardermoen.
 */
export const DEMO_PLACES: Place[] = [
  { id: 'g1', name: 'Gate 1', category: 'gate', floor: 2, source: 'demo' },
  { id: 'g2', name: 'Gate 2', category: 'gate', floor: 2, source: 'demo' },
  { id: 't1', name: 'Toalett ved gate 1', category: 'toilet', floor: 2, source: 'demo' },
  { id: 'f1', name: 'Kafé', category: 'food', floor: 2, source: 'demo' },
  { id: 's1', name: 'Kiosk', category: 'shop', floor: 2, source: 'demo' },
  { id: 't2', name: 'Toalett ved bagasjebånd', category: 'toilet', floor: 1, source: 'demo' },
  { id: 'f2', name: 'Bakeri', category: 'food', floor: 1, source: 'demo' },
];
