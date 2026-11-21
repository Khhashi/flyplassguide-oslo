import { View } from 'react-native';
import Svg, { Circle, Path, Rect, Text as SvgText } from 'react-native-svg';

import { DemoBadge } from '@/components/DemoBadge';
import { colors } from '@/theme/tokens';

const GATES = ['A10', 'A11', 'A12', 'A13'];

/**
 * Tegnet kart med en rute til gaten. Det er en illustrasjon, ikke et ekte kart over Gardermoen,
 * og merkes alltid slik til vi har verifiserte kartdata.
 */
export function MapIllustration({ gate }: { gate: string }) {
  return (
    <View className="gap-2">
      <DemoBadge source="illustration" />
      <View
        accessible
        accessibilityLabel={`Illustrasjon av kart med rute til gate ${gate}`}
        className="overflow-hidden rounded-card bg-surface-muted"
      >
        <Svg width="100%" height={320} viewBox="0 0 340 320">
          <Rect x={150} y={20} width={60} height={290} rx={10} fill={colors.border.subtle} />
          {GATES.map((name, i) => (
            <SvgText
              key={name}
              x={226}
              y={70 + i * 60}
              fontSize={15}
              fontWeight="bold"
              fill={colors.ink.muted}
            >
              {name}
            </SvgText>
          ))}
          <Path
            d="M180 290 L180 200 L200 170 L200 185"
            stroke={colors.primary.DEFAULT}
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle
            cx={180}
            cy={290}
            r={10}
            fill={colors.primary.DEFAULT}
            stroke="white"
            strokeWidth={4}
          />
          <Circle cx={200} cy={185} r={9} fill={colors.danger.DEFAULT} />
          <Circle
            cx={110}
            cy={120}
            r={14}
            fill={colors.warning.soft}
            stroke={colors.warning.DEFAULT}
          />
          <Circle
            cx={110}
            cy={220}
            r={14}
            fill={colors.primary.soft}
            stroke={colors.primary.DEFAULT}
          />
        </Svg>
      </View>
    </View>
  );
}
