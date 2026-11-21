import { View } from 'react-native';
import Svg, { Circle, G, Path, Rect, Text as SvgText } from 'react-native-svg';

import { DemoBadge } from '@/components/DemoBadge';
import type { PlaceCategory } from '@/data/demo-places';
import { colors } from '@/theme/tokens';

import { MapPois } from './MapPois';

const GATES = [
  { name: 'A13', y: 300 },
  { name: 'A12', y: 225 },
  { name: 'A11', y: 150 },
  { name: 'A10', y: 75 },
];

/** Gangveien fra der du står, opp terminalen og bort til gaten. */
const ROUTE =
  'M120 372 L120 330 Q120 315 135 315 L190 315 Q205 315 205 300 L205 240 Q205 225 220 225 L238 225';

/**
 * Tegnet kart med en rute til gaten. Det er en illustrasjon, ikke et ekte kart over Gardermoen,
 * og merkes alltid slik til vi har verifiserte kartdata.
 */
export function MapIllustration({
  gate,
  highlight = null,
}: {
  gate: string;
  highlight?: PlaceCategory | null;
}) {
  return (
    <View className="gap-2">
      <DemoBadge source="illustration" />
      <View
        accessible
        accessibilityLabel={`Illustrasjon av kart med rute til gate ${gate}`}
        className="overflow-hidden rounded-card border border-border-subtle"
      >
        <View style={{ width: '100%', aspectRatio: 340 / 400 }}>
          <Svg width="100%" height="100%" viewBox="0 0 340 400">
            <Rect width={340} height={400} fill="#EEF1F6" />
            {/* Hovedhallen nederst og piren med gater opp mot høyre */}
            <Path
              d="M20 330 L180 330 L180 30 Q180 20 190 20 L222 20 Q232 20 232 30 L232 390 L20 390 Z"
              fill="#FFFFFF"
              stroke={colors.border.DEFAULT}
              strokeWidth={1.5}
            />
            <Rect x={36} y={344} width={60} height={32} rx={6} fill="#E4E7EC" />
            <Rect x={40} y={60} width={110} height={250} rx={10} fill="#F4F3FF" stroke="#E0DEFA" />
            {GATES.map(({ name, y }) => (
              <G key={name}>
                <Rect x={232} y={y - 12} width={44} height={24} rx={4} fill="#E4E7EC" />
                <Rect
                  x={284}
                  y={y - 14}
                  width={44}
                  height={28}
                  rx={8}
                  fill={name === gate ? colors.primary.DEFAULT : '#FFFFFF'}
                  stroke={name === gate ? colors.primary.DEFAULT : colors.border.DEFAULT}
                />
                <SvgText
                  x={306}
                  y={y + 5}
                  fontSize={13}
                  fontWeight="bold"
                  fill={name === gate ? '#FFFFFF' : colors.ink.DEFAULT}
                  textAnchor="middle"
                >
                  {name}
                </SvgText>
              </G>
            ))}
            {/* Ruten, en lys kant under og blå linje over */}
            <Path
              d={ROUTE}
              stroke="#FFFFFF"
              strokeWidth={11}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d={ROUTE}
              stroke={colors.primary.DEFAULT}
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Du er her */}
            <Circle cx={120} cy={372} r={16} fill={colors.primary.DEFAULT} opacity={0.18} />
            <Circle
              cx={120}
              cy={372}
              r={8}
              fill={colors.primary.DEFAULT}
              stroke="#FFFFFF"
              strokeWidth={3}
            />
            {/* Nål ved gaten */}
            <Path
              d="M244 225 C244 213 260 205 260 193 A16 16 0 1 0 228 193 C228 205 244 213 244 225 Z"
              fill={colors.danger.DEFAULT}
            />
            <Circle cx={244} cy={193} r={6} fill="#FFFFFF" />
          </Svg>
          <MapPois highlight={highlight} />
        </View>
      </View>
    </View>
  );
}
