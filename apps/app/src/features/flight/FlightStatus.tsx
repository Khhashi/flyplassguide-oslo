import { Linking, Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { StepByStep } from '@/features/steps/StepByStep';
import { buildSteps } from '@/features/steps/buildSteps';

import { FlightCard } from './FlightCard';
import { useFlight } from './useFlight';

/** Viser ekte data for et søkt fly: steg, flykort og kilde. Sier tydelig fra når noe mangler. */
export function FlightStatus({ flightNumber }: { flightNumber: string }) {
  const result = useFlight(flightNumber);

  if (!result) return <Text className="text-lg text-ink-muted">Henter flyet ditt …</Text>;
  if (result.kind === 'not_found') {
    return (
      <Card
        title={`Fant ikke ${flightNumber}`}
        description="Sjekk flynummeret. Vi viser fly fra Gardermoen de neste 7 timene."
      />
    );
  }
  if (result.kind === 'error') {
    return (
      <Card
        title="Får ikke hentet flydata nå"
        description="Prøv igjen om litt, eller se på skjermene på flyplassen."
      />
    );
  }

  return (
    <View className="gap-4">
      {result.stale ? (
        <Text className="text-base text-warning">
          Vi får ikke kontakt med Avinor. Dette kan være utdatert.
        </Text>
      ) : null}
      <StepByStep steps={buildSteps(result.flight)} />
      <FlightCard flight={result.flight} />
      <Text
        accessibilityRole="link"
        onPress={() => void Linking.openURL('https://www.avinor.no')}
        className="text-base text-primary underline"
      >
        Flydata fra Avinor
      </Text>
    </View>
  );
}
