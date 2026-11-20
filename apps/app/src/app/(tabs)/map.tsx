import { Text } from 'react-native';

import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';

export default function MapScreen() {
  return (
    <Screen>
      <Text accessibilityRole="header" className="text-3xl font-bold text-ink">
        Terminalkart
      </Text>
      <Card
        title="Kommer snart"
        description="Kartet bygges i en senere fase. Vi viser ikke gater eller ruter før kartdataene er verifisert."
      />
    </Screen>
  );
}
