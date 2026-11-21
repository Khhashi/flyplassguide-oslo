import type { Place, PlaceCategory } from '@/data/demo-places';

export const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  gate: 'Gate',
  food: 'Mat og drikke',
  shop: 'Butikker',
  toilet: 'Toaletter',
};

interface PlaceFilter {
  floor: number;
  query: string;
  category: PlaceCategory | null;
}

/** Filtrerer steder på etasje, kategori og søketekst (uten forskjell på store og små bokstaver). */
export function filterPlaces(places: Place[], { floor, query, category }: PlaceFilter): Place[] {
  const search = query.trim().toLocaleLowerCase('nb-NO');
  return places.filter(
    (place) =>
      place.floor === floor &&
      (category === null || place.category === category) &&
      (search === '' || place.name.toLocaleLowerCase('nb-NO').includes(search)),
  );
}
