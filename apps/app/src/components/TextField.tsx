import { useState } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors } from '@/theme/tokens';

interface TextFieldProps extends Pick<
  TextInputProps,
  'value' | 'onChangeText' | 'onSubmitEditing' | 'placeholder' | 'autoCapitalize' | 'returnKeyType'
> {
  label: string;
  error?: string | null;
}

/** Inputfelt med hvit bakgrunn, mørk tekst og diskret grå kant. Aldri svart. */
export function TextField({ label, error, ...inputProps }: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-ink-muted">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.ink.subtle}
        autoCorrect={false}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        // Blå ramme når feltet er aktivt. outline-none fjerner nettleserens svarte ramme.
        style={focused && { borderColor: colors.primary.DEFAULT, borderWidth: 2 }}
        className={`min-h-12 rounded-control border bg-surface px-4 text-base text-ink outline-none ${
          error ? 'border-warning' : 'border-border'
        }`}
        {...inputProps}
      />
      {error ? (
        <Text accessibilityRole="alert" className="text-sm text-warning">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
