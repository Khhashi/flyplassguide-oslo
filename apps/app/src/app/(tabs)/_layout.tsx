import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Platform, type ColorValue } from 'react-native';

import { useIsWide } from '@/hooks/useLayout';
import { colors } from '@/theme/tokens';

type IconName = ComponentProps<typeof Ionicons>['name'];

function tabIcon(name: IconName) {
  return function TabIcon({ color, size }: { color: ColorValue; size: number }) {
    return (
      <Ionicons name={name} color={typeof color === 'string' ? color : undefined} size={size} />
    );
  };
}

export default function TabLayout() {
  const isWide = useIsWide();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Brede skjermer (PC, nettbrett på tvers) får meny på siden, mobil får faner nederst.
        tabBarPosition: isWide ? 'left' : 'bottom',
        tabBarVariant: isWide ? 'material' : 'uikit',
        tabBarLabelPosition: isWide ? 'beside-icon' : 'below-icon',
        tabBarActiveTintColor: colors.primary.DEFAULT,
        tabBarInactiveTintColor: colors.ink.subtle,
        tabBarActiveBackgroundColor: isWide ? colors.primary.soft : undefined,
        tabBarLabelStyle: isWide
          ? { fontSize: 15, fontWeight: '600' }
          : { fontSize: 12, lineHeight: 16, fontWeight: '600' },
        tabBarStyle: isWide
          ? {
              backgroundColor: colors.surface.DEFAULT,
              borderRightColor: colors.border.subtle,
              minWidth: 220,
              paddingTop: 24,
            }
          : {
              backgroundColor: colors.surface.DEFAULT,
              borderTopColor: colors.border.subtle,
              // På web finnes ingen safe area nederst, så vi gir fanene litt ekstra plass.
              ...(Platform.OS === 'web' ? { height: 68, paddingTop: 6, paddingBottom: 8 } : {}),
            },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Hjem', tabBarIcon: tabIcon('home-outline') }} />
      <Tabs.Screen name="map" options={{ title: 'Kart', tabBarIcon: tabIcon('map-outline') }} />
      <Tabs.Screen
        name="my-flight"
        options={{ title: 'Fly', tabBarIcon: tabIcon('airplane-outline') }}
      />
      <Tabs.Screen
        name="assistant"
        options={{ title: 'AI-guide', tabBarIcon: tabIcon('sparkles-outline') }}
      />
    </Tabs>
  );
}
