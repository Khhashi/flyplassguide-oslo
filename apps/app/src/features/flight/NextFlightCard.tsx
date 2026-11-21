import type { Flight } from '@flyplassguide/shared';
import { Text, View } from 'react-native';

import { DemoBadge } from '@/components/DemoBadge';

import { NOT_AVAILABLE, describeStatus, formatTime } from './format';

/** Minutter til avgang, aldri under null. Bruker ny tid hvis Avinor har gitt en. */
export function minutesToDeparture(flight: Flight, now: Date): number {
  const departure = new Date(flight.updatedDeparture ?? flight.scheduledDeparture);
  return Math.max(0, Math.round((departure.getTime() - now.getTime()) / 60_000));
}

export function NextFlightCard({ flight, now }: { flight: Flight; now: Date }) {
  const minutes = minutesToDeparture(flight, now);
  // Linjen fylles opp de siste to timene før avgang.
  const progress = Math.min(1, Math.max(0, 1 - minutes / 120));

  return (
    <View className="gap-4 rounded-card border border-border-subtle bg-surface p-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-ink">Ditt neste fly</Text>
        <Text className="text-base font-semibold text-success">
          {describeStatus(flight.status).label}
        </Text>
      </View>
      <DemoBadge source={flight.source} />
      <Text className="text-4xl font-bold text-ink">
        OSL → {flight.destination ?? NOT_AVAILABLE}
      </Text>
      <Text className="text-lg text-ink-muted">
        {flight.flightNumber} · Avgang{' '}
        {formatTime(flight.updatedDeparture ?? flight.scheduledDeparture)} · Gate{' '}
        {flight.gate ?? NOT_AVAILABLE.toLowerCase()}
      </Text>
      <View className="gap-2 rounded-control bg-primary-soft p-4">
        <Text className="text-base text-ink-muted">Avgang om</Text>
        <Text className="text-3xl font-bold text-ink">{minutes} min</Text>
        <View className="h-2 overflow-hidden rounded-full bg-surface">
          <View className="h-2 rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
        </View>
      </View>
    </View>
  );
}
