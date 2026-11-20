import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

interface CardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  onPress?: () => void;
  children?: ReactNode;
}

export function Card({ title, description, icon, onPress, children }: CardProps) {
  const content = (
    <View className="flex-row items-start gap-4">
      {icon ? (
        <View className="h-12 w-12 items-center justify-center rounded-control bg-primary-soft">
          {icon}
        </View>
      ) : null}
      <View className="flex-1 gap-1">
        <Text className="text-lg font-semibold text-ink">{title}</Text>
        {description ? <Text className="text-base text-ink-muted">{description}</Text> : null}
        {children}
      </View>
    </View>
  );

  const className = 'rounded-card border border-border-subtle bg-surface p-5';

  if (!onPress) {
    return <View className={className}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      className={`${className} active:bg-surface-muted`}
    >
      {content}
    </Pressable>
  );
}
