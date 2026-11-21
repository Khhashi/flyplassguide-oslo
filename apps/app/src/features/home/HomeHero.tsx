import Ionicons from '@expo/vector-icons/Ionicons';
import { ImageBackground, Text, View } from 'react-native';

import { FlightSearch } from '@/features/flight/FlightSearch';
import { colors } from '@/theme/tokens';

// Foto: Gustavo Fring / Pexels (fri bruk, også kommersielt).
const heroImage = require('../../../assets/hero/terminal.jpg');

/** Toppen av Hjem: bilde fra flyplassen, hilsen og søk etter fly. */
export function HomeHero({ onSearch }: { onSearch: (flightNumber: string) => void }) {
  return (
    <ImageBackground source={heroImage} resizeMode="cover" className="overflow-hidden rounded-card">
      <View className="gap-5 bg-black/45 p-5 pt-6">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Ionicons name="airplane" size={22} color={colors.surface.DEFAULT} />
          </View>
          <Text className="text-2xl font-bold text-white">FlyGuide</Text>
        </View>
        <View className="gap-1">
          <Text accessibilityRole="header" className="text-4xl font-bold text-white">
            God tur!
          </Text>
          <Text className="text-lg text-white">Oslo lufthavn · Gardermoen (OSL)</Text>
        </View>
        <View className="rounded-card bg-surface p-4">
          <FlightSearch onSearch={onSearch} />
        </View>
      </View>
    </ImageBackground>
  );
}
