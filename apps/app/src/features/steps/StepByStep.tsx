import { useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { ReadAloudButton } from '@/features/speech/ReadAloudButton';

/** Viser ett steg om gangen med stor tekst, slik at det er lett å følge med. */
export function StepByStep({ steps }: { steps: string[] }) {
  const [index, setIndex] = useState(0);
  const isLast = index === steps.length - 1;

  return (
    <View className="gap-6 rounded-card bg-primary-soft p-6">
      <Text className="text-lg font-semibold text-primary">
        Steg {index + 1} av {steps.length}
      </Text>
      <Text accessibilityLiveRegion="polite" className="text-3xl font-bold leading-tight text-ink">
        {steps[index]}
      </Text>
      <View className="gap-3">
        <ReadAloudButton text={steps[index] ?? ''} />
        {!isLast ? <Button label="Neste steg" onPress={() => setIndex(index + 1)} /> : null}
        {index > 0 ? (
          <Button label="Tilbake" variant="secondary" onPress={() => setIndex(index - 1)} />
        ) : null}
      </View>
    </View>
  );
}
