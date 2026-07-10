import { View, ViewStyle, StyleProp } from 'react-native';
import { colors, radius, shadow, spacing } from '@/theme';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** 'paper' = raised cream card, 'navy' = dark card, 'outline' = flat bordered */
  tone?: 'paper' | 'navy' | 'outline';
  padded?: boolean;
}

/** Rounded surface with a quality shadow. The archival "card stock" of the app. */
export function Card({ children, style, tone = 'paper', padded = true }: Props) {
  const toneStyle: ViewStyle =
    tone === 'navy'
      ? { backgroundColor: colors.navySoft, borderColor: colors.navyLine, borderWidth: 1 }
      : tone === 'outline'
        ? { backgroundColor: colors.creamRaised, borderColor: colors.creamLine, borderWidth: 1 }
        : { backgroundColor: colors.creamRaised };

  return (
    <View
      style={[
        {
          borderRadius: radius.lg,
          padding: padded ? spacing.lg : 0,
          overflow: 'hidden',
        },
        toneStyle,
        tone !== 'outline' && shadow.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}
