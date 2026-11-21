import * as Speech from 'expo-speech';

import { Button } from '@/components/Button';

/** Leser teksten høyt på norsk. Stopper det som leses fra før, så det ikke blir to stemmer. */
export function ReadAloudButton({ text }: { text: string }) {
  return (
    <Button
      label="Les opp"
      variant="secondary"
      onPress={() => {
        void Speech.stop();
        Speech.speak(text, { language: 'nb-NO' });
      }}
    />
  );
}
