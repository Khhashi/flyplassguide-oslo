import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';

export default function MyFlightScreen() {
  const { flight } = useLocalSearchParams<{ flight?: string }>();

  return (
    <Screen>
      <Text accessibilityRole="header" className="text-3xl font-bold text-ink">
        Mitt fly
      </Text>
      {flight ? (
        <Card
          title={flight}
          description="Flyinformasjon fra Avinor er ikke koblet til ennå. Vi viser ingen avgangstid eller gate før dataene er ekte."
        />
      ) : (
        <Card title="Ingen fly valgt" description="Søk etter flynummeret ditt på Hjem-siden." />
      )}
    </Screen>
  );
}
