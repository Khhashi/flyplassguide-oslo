import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { View } from 'react-native';

import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { AssistanceCard } from '@/features/assistance/AssistanceCard';
import { HomeHero } from '@/features/home/HomeHero';
import { colors } from '@/theme/tokens';

export default function HomeScreen() {
  return (
    <Screen>
      <HomeHero
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

      <AssistanceCard />
    </Screen>
  );
}
