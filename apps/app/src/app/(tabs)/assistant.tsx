import { Text } from 'react-native';

import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';

export default function AssistantScreen() {
  return (
    <Screen>
      <Text accessibilityRole="header" className="text-3xl font-bold text-ink">
        AI-assistent
      </Text>
      <Card
        title="Kommer snart"
        description="Assistenten kobles til ekte fly- og kartdata i en senere fase."
      />
    </Screen>
  );
}
