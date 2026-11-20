import { Image, StyleSheet, Text, View } from 'react-native';

import { FlightSearch } from '@/features/flight/FlightSearch';

// Foto: Gustavo Fring / Pexels (fri bruk, også kommersielt). Byttes til egen video senere.
const heroImage = require('../../../assets/hero/terminal.jpg');

interface WebHeroProps {
  onSearch: (flightNumber: string) => void;
}

/** Stor velkomstboks med bilde i bakgrunnen. Brukes bare på nettsiden på brede skjermer. */
export function WebHero({ onSearch }: WebHeroProps) {
  return (
    <View className="min-h-[480px] justify-center overflow-hidden rounded-card">
      <Image
        source={heroImage}
        resizeMode="cover"
        accessible={false}
        style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
      />
      <View className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/75 via-45% to-transparent to-70%" />
      <View className="max-w-md gap-6 p-12">
        <View className="gap-2">
          <Text accessibilityRole="header" className="text-5xl font-bold text-ink">
            Velkommen til Gardermoen
          </Text>
          <Text className="text-xl text-ink-muted">Finn frem. Reis enklere.</Text>
        </View>
        <FlightSearch onSearch={onSearch} />
      </View>
    </View>
  );
}
