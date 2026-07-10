import { View, ActivityIndicator, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PressableScale } from './PressableScale';
import { Text } from './Text';
import { colors, radius, spacing, shadow } from '@/theme';

type Variant = 'gold' | 'navy' | 'ghost' | 'outline';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: keyof typeof Ionicons.glyphMap;
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  onPress,
  variant = 'gold',
  icon,
  full,
  disabled,
  loading,
  size = 'md',
  style,
}: Props) {
  const height = size === 'lg' ? 56 : 48;
  const palette: Record<Variant, { bg: string; fg: string; border?: string }> = {
    gold: { bg: colors.gold, fg: colors.navyDeep },
    navy: { bg: colors.navy, fg: colors.onNavy },
    ghost: { bg: 'transparent', fg: colors.navy },
    outline: { bg: 'transparent', fg: colors.navy, border: colors.navyLine },
  };
  const p = palette[variant];
  const isDim = disabled || loading;

  return (
    <PressableScale
      haptic
      disabled={isDim}
      onPress={onPress}
      style={[
        {
          height,
          borderRadius: radius.pill,
          backgroundColor: p.bg,
          borderWidth: p.border ? 1.5 : 0,
          borderColor: p.border,
          paddingHorizontal: spacing.xl,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.sm,
          alignSelf: full ? 'stretch' : 'flex-start',
          opacity: isDim ? 0.5 : 1,
        },
        variant === 'gold' && shadow.hairline,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={p.fg} />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={size === 'lg' ? 20 : 18} color={p.fg} />}
          <Text weight="bold" variant={size === 'lg' ? 'subheading' : 'body'} color={p.fg}>
            {label}
          </Text>
        </>
      )}
    </PressableScale>
  );
}
