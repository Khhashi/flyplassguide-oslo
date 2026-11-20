import type { Flight } from '@flyplassguide/shared';
import { Text, View } from 'react-native';

import { DemoBadge } from '@/components/DemoBadge';

import {
  NOT_AVAILABLE,
  describeStatus,
  formatTime,
  hasNewDepartureTime,
  type StatusTone,
} from './format';

const TONE_CLASSES: Record<StatusTone, { box: string; text: string }> = {
  neutral: { box: 'bg-surface-muted', text: 'text-ink-muted' },
  info: { box: 'bg-primary-soft', text: 'text-primary' },
  warning: { box: 'bg-warning-soft', text: 'text-warning' },
  danger: { box: 'bg-danger-soft', text: 'text-danger' },
  success: { box: 'bg-success-soft', text: 'text-success' },
};

function Detail({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | null;
  highlight?: boolean;
}) {
  return (
    <View className="min-w-[45%] flex-1 gap-1 rounded-control bg-surface-muted p-4">
      <Text className="text-sm text-ink-muted">{label}</Text>
      <Text
        className={`text-xl font-semibold ${value ? (highlight ? 'text-warning' : 'text-ink') : 'text-ink-subtle'}`}
      >
        {value ?? NOT_AVAILABLE}
      </Text>
    </View>
  );
}

export function FlightCard({ flight }: { flight: Flight }) {
  const status = describeStatus(flight.status);
  const tone = TONE_CLASSES[status.tone];
  const newTime = hasNewDepartureTime(flight);

  return (
    <View className="gap-5 rounded-card border border-border-subtle bg-surface p-5 md:p-8">
      <DemoBadge source={flight.source} />

      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1 gap-1">
          <Text className="text-3xl font-bold text-ink">{flight.flightNumber}</Text>
          <Text className="text-base text-ink-muted">
            {[flight.airline, flight.destination ? `til ${flight.destination}` : null]
              .filter(Boolean)
              .join(' · ') || NOT_AVAILABLE}
          </Text>
        </View>
        <View className={`rounded-full px-3 py-1 ${tone.box}`}>
          <Text className={`text-sm font-semibold ${tone.text}`}>{status.label}</Text>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-3">
        <Detail label="Gate" value={flight.gate} />
        <Detail label="Boarding" value={formatTime(flight.boardingTime)} />
        <Detail label="Planlagt avgang" value={formatTime(flight.scheduledDeparture)} />
        <Detail
          label="Ny avgangstid"
          value={newTime ? formatTime(flight.updatedDeparture) : 'Ingen endring'}
          highlight={newTime}
        />
      </View>

      <Text className="text-sm text-ink-subtle">
        Sist oppdatert {formatTime(flight.lastUpdated) ?? 'ukjent'}
      </Text>
    </View>
  );
}
