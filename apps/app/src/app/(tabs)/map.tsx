import { useState } from 'react';
import { Text, View } from 'react-native';

import { DemoBadge } from '@/components/DemoBadge';
import { Screen } from '@/components/Screen';
import { DEMO_PLACES, FLOORS } from '@/data/demo-places';
import { FloorPicker } from '@/features/map/FloorPicker';

export default function MapScreen() {
  const [floor, setFloor] = useState<number>(2);
  const places = DEMO_PLACES.filter((place) => place.floor === floor);

  return (
    <Screen>
      <Text accessibilityRole="header" className="text-3xl font-bold text-ink">
        Terminalkart
      </Text>
      <DemoBadge source="demo" />
      <FloorPicker floors={FLOORS} selected={floor} onSelect={setFloor} />
      <View className="gap-2">
        {places.map((place) => (
          <View key={place.id} className="rounded-control border border-border-subtle p-4">
            <Text className="text-base font-medium text-ink">{place.name}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}
