import { requiresDemoLabel, type DataSource } from '@airportguide/shared';
import { Text, View } from 'react-native';

interface DemoBadgeProps {
  source: DataSource;
}

const LABELS: Record<Exclude<DataSource, 'verified'>, string> = {
  demo: 'Demodata – ikke ekte informasjon',
  illustration: 'Illustrasjon – ikke ekte informasjon',
};

/** Vises alltid når data ikke er verifisert. Returnerer ingenting for ekte data. */
export function DemoBadge({ source }: DemoBadgeProps) {
  if (!requiresDemoLabel(source) || source === 'verified') {
    return null;
  }

  return (
    <View className="self-start rounded-full bg-warning-soft px-3 py-1">
      <Text className="text-sm font-medium text-warning">{LABELS[source]}</Text>
    </View>
  );
}
