import { normalizeFlightNumber } from '@flyplassguide/shared';
import { useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';

interface FlightSearchProps {
  onSearch: (flightNumber: string) => void;
}

export function FlightSearch({ onSearch }: FlightSearchProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  function submit() {
    if (value.trim().length === 0) {
      setError('Skriv inn flynummeret ditt først.');
      return;
    }
    const flightNumber = normalizeFlightNumber(value);
    if (!flightNumber) {
      setError('Skriv inn et gyldig flynummer, for eksempel DY 123 eller SK 4035.');
      return;
    }
    setError(null);
    onSearch(flightNumber);
  }

  return (
    <View className="gap-3 md:flex-row md:items-end">
      <View className="md:flex-1">
        <TextField
          label="Flynummer"
          placeholder="F.eks. DY 123"
          value={value}
          onChangeText={(text) => {
            setValue(text);
            if (error) setError(null);
          }}
          onSubmitEditing={submit}
          autoCapitalize="characters"
          returnKeyType="search"
          error={error}
        />
      </View>
      <Button label="Finn" onPress={submit} />
    </View>
  );
}
