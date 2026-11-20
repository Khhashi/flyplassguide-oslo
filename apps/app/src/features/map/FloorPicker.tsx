import { Pressable, Text, View } from 'react-native';

interface FloorPickerProps {
  floors: readonly number[];
  selected: number;
  onSelect: (floor: number) => void;
}

export function FloorPicker({ floors, selected, onSelect }: FloorPickerProps) {
  return (
    <View
      accessibilityRole="tablist"
      className="flex-row gap-2 self-start rounded-control bg-surface-muted p-1"
    >
      {floors.map((floor) => {
        const isSelected = floor === selected;
        return (
          <Pressable
            key={floor}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(floor)}
            className={`min-h-11 justify-center rounded-control px-5 ${isSelected ? 'bg-surface' : ''}`}
          >
            <Text
              className={`text-base font-semibold ${isSelected ? 'text-primary' : 'text-ink-muted'}`}
            >
              Etasje {floor}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
