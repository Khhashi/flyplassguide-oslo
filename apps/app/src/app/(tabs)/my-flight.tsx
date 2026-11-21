import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { DemoBadge } from '@/components/DemoBadge';
import { Screen } from '@/components/Screen';
import { DEMO_FLIGHT } from '@/data/demo-flight';
import { FlightCard } from '@/features/flight/FlightCard';
import { FlightStatus } from '@/features/flight/FlightStatus';
import { StepByStep } from '@/features/steps/StepByStep';
import { buildSteps } from '@/features/steps/buildSteps';

export default function MyFlightScreen() {
  const { flight } = useLocalSearchParams<{ flight?: string }>();
  const [showExample, setShowExample] = useState(false);

  return (
    <Screen>
      <Text accessibilityRole="header" className="text-3xl font-bold text-ink">
        Mitt fly
      </Text>

      {flight ? (
        <FlightStatus flightNumber={flight} />
      ) : (
        <Card title="Ingen fly valgt" description="Søk etter flynummeret ditt på Hjem-siden." />
      )}

      {showExample ? (
        <View className="gap-3">
          <Text className="text-lg font-semibold text-ink">Slik vil det se ut</Text>
          <DemoBadge source={DEMO_FLIGHT.source} />
          <StepByStep steps={buildSteps(DEMO_FLIGHT)} />
          <FlightCard flight={DEMO_FLIGHT} />
          <Button
            label="Skjul eksempel"
            variant="secondary"
            onPress={() => setShowExample(false)}
          />
        </View>
      ) : (
        <Button label="Se et eksempel" variant="secondary" onPress={() => setShowExample(true)} />
      )}
    </Screen>
  );
}
