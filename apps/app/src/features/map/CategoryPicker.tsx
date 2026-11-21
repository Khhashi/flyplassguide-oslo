import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { PlaceCategory } from '@/data/demo-places';
import { colors, touchTarget } from '@/theme/tokens';

import { CATEGORY_LABELS } from './filterPlaces';

const ICONS: Record<PlaceCategory, ComponentProps<typeof Ionicons>['name']> = {
  gate: 'airplane-outline',
  food: 'restaurant-outline',
  shop: 'bag-handle-outline',
  toilet: 'man-outline',
};

interface CategoryPickerProps {
  selected: PlaceCategory | null;
  onSelect: (category: PlaceCategory | null) => void;
}

/** Fire store knapper med ikon. Trykk på valgt knapp igjen for å vise alt. */
export function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
  return (
    <View className="flex-row gap-2">
      {(Object.keys(CATEGORY_LABELS) as PlaceCategory[]).map((key) => {
        const active = selected === key;
        return (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityLabel={CATEGORY_LABELS[key]}
            accessibilityState={{ selected: active }}
            onPress={() => onSelect(active ? null : key)}
            style={{ minHeight: touchTarget * 1.4 }}
            className={`flex-1 items-center justify-center gap-1 rounded-control px-1 ${active ? 'bg-primary' : 'border border-border-subtle bg-surface'}`}
          >
            <Ionicons
              name={ICONS[key]}
              size={24}
              color={active ? colors.surface.DEFAULT : colors.ink.DEFAULT}
            />
            <Text
              className={`text-center text-sm font-medium ${active ? 'text-white' : 'text-ink'}`}
            >
              {CATEGORY_LABELS[key]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
