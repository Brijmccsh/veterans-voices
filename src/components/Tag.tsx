import { View, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { colors, radius, spacing } from '@/theme';

interface Props {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  /** background/foreground tone */
  tone?: 'olive' | 'gold' | 'navy' | 'ghostOnNavy';
  color?: string; // override bg (e.g. branch color)
  style?: StyleProp<ViewStyle>;
}

/** Small dignified chip for war / theater / branch metadata. */
export function Tag({ label, icon, tone = 'olive', color, style }: Props) {
  const tones: Record<string, { bg: string; fg: string }> = {
    olive: { bg: 'rgba(92,97,66,0.14)', fg: colors.olive },
    gold: { bg: 'rgba(198,162,76,0.16)', fg: colors.goldDeep },
    navy: { bg: 'rgba(15,35,64,0.10)', fg: colors.navy },
    ghostOnNavy: { bg: 'rgba(243,238,226,0.10)', fg: colors.onNavySoft },
  };
  const t = tones[tone];
  const bg = color ? hexWithAlpha(color, 0.16) : t.bg;
  const fg = color ?? t.fg;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          backgroundColor: bg,
          paddingHorizontal: spacing.md,
          paddingVertical: 5,
          borderRadius: radius.pill,
        },
        style,
      ]}
    >
      {icon && <Ionicons name={icon} size={12.5} color={fg} />}
      <Text variant="overline" weight="bold" color={fg} tracking={0.4} style={{ textTransform: 'uppercase' }}>
        {label}
      </Text>
    </View>
  );
}

function hexWithAlpha(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
