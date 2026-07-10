import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';

interface Props {
  /** color of the rule + star */
  color?: string;
  /** show the centered star motif */
  star?: boolean;
  inset?: number;
}

/** A thin rule with an optional centered star — a quiet military flourish. */
export function Divider({ color = colors.creamLine, star = true, inset = 0 }: Props) {
  const line = { flex: 1, height: 1, backgroundColor: color };
  if (!star) return <View style={[line, { marginHorizontal: inset }]} />;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginHorizontal: inset }}>
      <View style={line} />
      <Ionicons name="star" size={11} color={color} />
      <View style={line} />
    </View>
  );
}
