import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

import { colors } from '@/theme/tokens';

/** Kort under kartet. Viser ingen gangtid før vi har et verifisert kart å regne den ut fra. */
export function RouteCard({ gate }: { gate: string }) {
  return (
    <View className="gap-2 rounded-card border border-border-subtle bg-surface p-5">
      <Text accessibilityRole="header" className="text-2xl font-bold text-ink">
        Til gate {gate}
      </Text>
      <View className="flex-row items-center gap-2">
        <Ionicons name="walk-outline" size={22} color={colors.ink.muted} />
        <Text className="flex-1 text-base text-ink-muted">
          Gangtid og veivisning kommer når vi har et verifisert kart.
        </Text>
      </View>
    </View>
  );
}
