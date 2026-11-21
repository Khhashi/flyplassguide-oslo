import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';

import type { PlaceCategory } from '@/data/demo-places';

/** Plassering i kartets tegning (340 × 400), regnet om til prosent så ikonene følger kartet. */
const POIS: { category: Exclude<PlaceCategory, 'gate'>; x: number; y: number }[] = [
  { category: 'food', x: 70, y: 110 },
  { category: 'food', x: 120, y: 250 },
  { category: 'shop', x: 115, y: 170 },
  { category: 'toilet', x: 70, y: 210 },
  { category: 'toilet', x: 206, y: 110 },
];

const STYLE = {
  food: { icon: 'restaurant', color: '#F79009' },
  shop: { icon: 'bag-handle', color: '#7A5AF8' },
  toilet: { icon: 'man', color: '#2E90FA' },
} as const;

/** Ikoner oppå kartet. Valgt kategori vises tydelig, resten blir svakere. */
export function MapPois({ highlight }: { highlight: PlaceCategory | null }) {
  return POIS.map(({ category, x, y }, i) => {
    const dimmed = highlight !== null && highlight !== category;
    return (
      <View
        key={i}
        testID={`poi-${category}`}
        style={{
          left: `${(x / 340) * 100}%`,
          top: `${(y / 400) * 100}%`,
          opacity: dimmed ? 0.3 : 1,
        }}
        className="absolute -ml-4 -mt-4 h-8 w-8 items-center justify-center rounded-full border-2 border-white"
      >
        <View
          className="h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: STYLE[category].color }}
        >
          <Ionicons name={STYLE[category].icon} size={16} color="#FFFFFF" />
        </View>
      </View>
    );
  });
}
