import { Pressable, Text } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

/** Stor, tydelig primærknapp. Minst 48 px høy for enkel berøring. */
export function Button({ label, onPress, disabled = false }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`min-h-12 items-center justify-center rounded-control px-6 ${
        disabled ? 'bg-border' : 'bg-primary active:bg-primary-pressed'
      }`}
    >
      <Text className="text-base font-semibold text-white">{label}</Text>
    </Pressable>
  );
}
