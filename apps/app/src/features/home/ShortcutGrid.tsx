import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';

import { colors, touchTarget } from '@/theme/tokens';

type Href = '/map' | '/my-flight' | '/assistant' | `/map?kategori=${'food' | 'shop' | 'toilet'}`;
type IconName = ComponentProps<typeof Ionicons>['name'];

const SHORTCUTS: { title: string; subtitle: string; icon: IconName; href: Href }[] = [
  { title: 'Kart', subtitle: 'Utforsk flyplassen', icon: 'map-outline', href: '/map' },
  {
    title: 'Finn gaten min',
    subtitle: 'Steg for steg',
    icon: 'navigate-outline',
    href: '/my-flight',
  },
  {
    title: 'Mat og drikke',
    subtitle: 'Kafeer og restauranter',
    icon: 'restaurant-outline',
    href: '/map?kategori=food',
  },
  {
    title: 'Butikker',
    subtitle: 'Handle på flyplassen',
    icon: 'bag-handle-outline',
    href: '/map?kategori=shop',
  },
  {
    title: 'Toaletter',
    subtitle: 'Finn nærmeste',
    icon: 'man-outline',
    href: '/map?kategori=toilet',
  },
  { title: 'AI-guide', subtitle: 'Spør om reisen', icon: 'sparkles-outline', href: '/assistant' },
];

/** Store snarveier i to kolonner, så det er lett å finne frem. */
export function ShortcutGrid({ onOpen }: { onOpen: (href: Href) => void }) {
  return (
    <View className="flex-row flex-wrap justify-between gap-y-3">
      {SHORTCUTS.map((item) => (
        <Pressable
          key={item.title}
          accessibilityRole="button"
          accessibilityLabel={item.title}
          onPress={() => onOpen(item.href)}
          style={{ minHeight: touchTarget * 2 }}
          className="w-[48.5%] gap-2 rounded-card border border-border-subtle bg-surface p-4 active:bg-surface-muted"
        >
          <Ionicons name={item.icon} size={28} color={colors.primary.DEFAULT} />
          <Text className="text-lg font-semibold text-ink">{item.title}</Text>
          <Text className="text-sm text-ink-muted">{item.subtitle}</Text>
        </Pressable>
      ))}
    </View>
  );
}
