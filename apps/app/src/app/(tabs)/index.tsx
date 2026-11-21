import { router } from 'expo-router';

import { Screen } from '@/components/Screen';
import { demoNextFlight } from '@/data/demo-flight';
import { AssistanceCard } from '@/features/assistance/AssistanceCard';
import { NextFlightCard } from '@/features/flight/NextFlightCard';
import { HomeHero } from '@/features/home/HomeHero';
import { ShortcutGrid } from '@/features/home/ShortcutGrid';
import { useNow } from '@/hooks/useNow';

export default function HomeScreen() {
  const now = useNow();

  return (
    <Screen>
      <HomeHero
        onSearch={(flightNumber) =>
          router.push({ pathname: '/my-flight', params: { flight: flightNumber } })
        }
      />

      <NextFlightCard flight={demoNextFlight(now)} now={now} />

      <ShortcutGrid onOpen={(href) => router.push(href)} />

      <AssistanceCard />
    </Screen>
  );
}
