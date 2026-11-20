import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { FlightSearch } from '@/features/flight/FlightSearch';
import { colors } from '@/theme/tokens';

export default function HomeScreen() {
  return (
    <Screen>
      <View className="flex-row items-center gap-2">
        <Ionicons name="airplane" size={22} color={colors.primary.DEFAULT} />
        <Text className="text-lg font-bold text-ink">Flyplassguide Oslo</Text>
      </View>

      <View className="gap-2 rounded-card bg-primary-soft p-6 md:p-10">
        <Text accessibilityRole="header" className="text-3xl font-bold text-ink md:text-4xl">
          Velkommen til Gardermoen
        </Text>
        <Text className="text-lg text-ink-muted">Finn frem. Reis enklere.</Text>
      </View>

      <FlightSearch
        onSearch={(flightNumber) =>
          router.push({ pathname: '/my-flight', params: { flight: flightNumber } })
        }
      />

      <View className="gap-4 md:flex-row">
        <View className="md:flex-1">
          <Card
            title="Terminalkart"
            description="Gater, butikker, spisesteder og toaletter."
            icon={<Ionicons name="map-outline" size={24} color={colors.primary.DEFAULT} />}
            onPress={() => router.push('/map')}
          />
        </View>
        <View className="md:flex-1">
          <Card
            title="AI-assistent"
            description="Still spørsmål om reisen din."
            icon={
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color={colors.primary.DEFAULT}
              />
            }
            onPress={() => router.push('/assistant')}
          />
        </View>
      </View>
    </Screen>
  );
}
