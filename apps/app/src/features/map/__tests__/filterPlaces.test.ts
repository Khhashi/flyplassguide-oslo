import { DEMO_PLACES } from '@/data/demo-places';

import { filterPlaces } from '../filterPlaces';

const names = (places: { name: string }[]) => places.map((place) => place.name);

describe('filterPlaces', () => {
  it('filtrerer på kategori innenfor valgt etasje', () => {
    const result = filterPlaces(DEMO_PLACES, { floor: 2, query: '', category: 'toilet' });
    expect(names(result)).toEqual(['Toalett ved gate 1']);
  });

  it('søker uten å bry seg om store og små bokstaver', () => {
    const result = filterPlaces(DEMO_PLACES, { floor: 2, query: '  GATE ', category: null });
    expect(names(result)).toEqual(['Gate 1', 'Gate 2', 'Toalett ved gate 1']);
  });

  it('kombinerer søk og kategori', () => {
    const result = filterPlaces(DEMO_PLACES, { floor: 2, query: 'gate', category: 'gate' });
    expect(names(result)).toEqual(['Gate 1', 'Gate 2']);
  });

  it('gir tom liste når ingenting passer', () => {
    expect(filterPlaces(DEMO_PLACES, { floor: 1, query: 'gate 1', category: null })).toEqual([]);
  });
});
