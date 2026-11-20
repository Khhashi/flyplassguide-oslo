import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Platform, type ColorValue } from 'react-native';

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
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.DEFAULT,
        tabBarInactiveTintColor: colors.ink.subtle,
        tabBarLabelStyle: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: colors.surface.DEFAULT,
          borderTopColor: colors.border.subtle,
          // På web finnes ingen safe area nederst, så vi gir fanene litt ekstra plass.
          ...(Platform.OS === 'web' ? { height: 68, paddingTop: 6, paddingBottom: 8 } : {}),
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Hjem', tabBarIcon: tabIcon('home-outline') }} />
      <Tabs.Screen
        name="my-flight"
        options={{ title: 'Mitt fly', tabBarIcon: tabIcon('airplane-outline') }}
      />
      <Tabs.Screen name="map" options={{ title: 'Kart', tabBarIcon: tabIcon('map-outline') }} />
      <Tabs.Screen
        name="assistant"
        options={{ title: 'AI', tabBarIcon: tabIcon('chatbubble-ellipses-outline') }}
      />
    </Tabs>
  );
}
