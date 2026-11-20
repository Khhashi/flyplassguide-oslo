import { Pressable, Text } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

/** Stor, tydelig knapp. Minst 48 px høy for enkel berøring. */
export function Button({ label, onPress, variant = 'primary' }: ButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`min-h-12 items-center justify-center rounded-control px-6 ${
        isPrimary
          ? 'bg-primary active:bg-primary-pressed'
          : 'border border-border bg-surface active:bg-surface-muted'
      }`}
    >
      <Text className={`text-base font-semibold ${isPrimary ? 'text-white' : 'text-ink'}`}>
        {label}
      </Text>
    </Pressable>
  );
}
