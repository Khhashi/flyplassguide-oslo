import { Pressable, Text } from 'react-native';

import { touchTarget } from '@/theme/tokens';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

/** Stor, tydelig knapp. Minst 56 px høy, så den er lett å treffe. */
export function Button({ label, onPress, variant = 'primary' }: ButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{ minHeight: touchTarget }}
      className={`items-center justify-center rounded-control px-6 ${
        isPrimary
          ? 'bg-primary active:bg-primary-pressed'
          : 'border border-border bg-surface active:bg-surface-muted'
      }`}
    >
      <Text className={`text-lg font-semibold ${isPrimary ? 'text-white' : 'text-ink'}`}>
        {label}
      </Text>
    </Pressable>
  );
}
