import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { DemoBadge } from '@/components/DemoBadge';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { DEMO_PLACES, FLOORS, type PlaceCategory } from '@/data/demo-places';
import { FloorPicker } from '@/features/map/FloorPicker';
import { CATEGORY_LABELS, filterPlaces } from '@/features/map/filterPlaces';

export default function MapScreen() {
  const [floor, setFloor] = useState<number>(2);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<PlaceCategory | null>(null);
  const places = filterPlaces(DEMO_PLACES, { floor, query, category });

  return (
    <Screen>
      <Text accessibilityRole="header" className="text-3xl font-bold text-ink">
        Terminalkart
      </Text>
      <DemoBadge source="demo" />
      <TextField
        label="Søk etter sted"
        placeholder="F.eks. toalett"
        value={query}
        onChangeText={setQuery}
      />
      <FloorPicker floors={FLOORS} selected={floor} onSelect={setFloor} />
      <View className="flex-row flex-wrap gap-2">
        {(Object.keys(CATEGORY_LABELS) as PlaceCategory[]).map((key) => {
          const active = category === key;
          return (
            <Pressable
              key={key}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => setCategory(active ? null : key)}
              className={`min-h-11 justify-center rounded-full border px-4 ${active ? 'border-primary bg-primary-soft' : 'border-border bg-surface'}`}
            >
              <Text className={`font-medium ${active ? 'text-primary' : 'text-ink'}`}>
                {CATEGORY_LABELS[key]}
              </Text>
            </Pressable>
          );
        })}
      </View>
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
