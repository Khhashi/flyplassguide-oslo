import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { DemoBadge } from '@/components/DemoBadge';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { DEMO_PLACES, FLOORS, type PlaceCategory } from '@/data/demo-places';
import { FloorPicker } from '@/features/map/FloorPicker';
import { MapIllustration } from '@/features/map/MapIllustration';
import { RouteCard } from '@/features/map/RouteCard';
import { DEMO_FLIGHT } from '@/data/demo-flight';
import { CategoryPicker } from '@/features/map/CategoryPicker';
import { CATEGORY_LABELS, filterPlaces } from '@/features/map/filterPlaces';

export default function MapScreen() {
  const [floor, setFloor] = useState<number>(2);
  const [query, setQuery] = useState('');
  const { kategori } = useLocalSearchParams<{ kategori?: string }>();
  // Snarveiene på Hjem kan åpne kartet med en kategori valgt, f.eks. /map?kategori=toilet.
  const [category, setCategory] = useState<PlaceCategory | null>(
    kategori && kategori in CATEGORY_LABELS ? (kategori as PlaceCategory) : null,
  );
  const places = filterPlaces(DEMO_PLACES, { floor, query, category });

  return (
    <Screen>
      <Text accessibilityRole="header" className="text-3xl font-bold text-ink">
        Kart – OSL
      </Text>
      <CategoryPicker selected={category} onSelect={setCategory} />
      <MapIllustration gate={DEMO_FLIGHT.gate ?? 'A12'} />
      <RouteCard gate={DEMO_FLIGHT.gate ?? 'A12'} />
      <DemoBadge source="demo" />
      <TextField
        label="Søk etter sted"
        placeholder="F.eks. toalett"
        value={query}
        onChangeText={setQuery}
      />
      <FloorPicker floors={FLOORS} selected={floor} onSelect={setFloor} />
      <View className="gap-2">
        {places.length === 0 ? (
          <Text className="text-base text-ink-muted">Fant ingen steder som passer søket.</Text>
        ) : null}
        {places.map((place) => (
          <View key={place.id} className="rounded-control border border-border-subtle p-4">
            <Text className="text-base font-medium text-ink">{place.name}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}
