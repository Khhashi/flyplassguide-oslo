import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps {
  children: ReactNode;
  /** Bredere innhold på store skjermer, brukes på forsiden. */
  wide?: boolean;
}

/**
 * Felles ramme for alle skjermer: hvit bakgrunn, trygg avstand til kanter
 * og begrenset bredde på store skjermer slik at innholdet ikke strekkes ut.
 */
export function Screen({ children, wide = false }: ScreenProps) {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-surface">
      <ScrollView
        contentContainerClassName="grow px-5 pb-10 pt-4 md:px-10 md:pt-10"
        keyboardShouldPersistTaps="handled"
      >
        <View className={`w-full self-center gap-6 ${wide ? 'max-w-5xl' : 'max-w-3xl'}`}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
