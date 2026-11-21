import Ionicons from '@expo/vector-icons/Ionicons';
import { Linking } from 'react-native';

import { Card } from '@/components/Card';
import { colors } from '@/theme/tokens';

export const AVINOR_ASSISTANCE_URL = 'https://avinor.no/flyplass/oslo/planlegg-reisen/assistanse/';

/** Viser hvordan man får hjelp på flyplassen, med lenke til Avinors egen side. */
export function AssistanceCard() {
  return (
    <Card
      title="Trenger du hjelp?"
      description="Du kan få assistanse på flyplassen. Bestill hos flyselskapet senest 48 timer før avreise."
      icon={<Ionicons name="accessibility-outline" size={24} color={colors.primary.DEFAULT} />}
      onPress={() => void Linking.openURL(AVINOR_ASSISTANCE_URL)}
    />
  );
}
