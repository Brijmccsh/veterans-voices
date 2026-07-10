import { View, ScrollView, StyleSheet, ViewStyle, StyleProp, RefreshControlProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
  /** background color of the page; defaults to warm cream */
  background?: string;
  /** apply horizontal padding to the content */
  padded?: boolean;
  /** respect the top safe-area inset (off when a full-bleed header handles it) */
  topInset?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  refreshControl?: React.ReactElement<RefreshControlProps>;
}

/** The page wrapper. Handles safe areas, background, and scroll consistently. */
export function Screen({
  children,
  scroll = true,
  background = colors.cream,
  padded = false,
  topInset = false,
  contentStyle,
  refreshControl,
}: Props) {
  const insets = useSafeAreaInsets();
  const pad: ViewStyle = {
    paddingHorizontal: padded ? spacing.lg : 0,
    paddingTop: topInset ? insets.top : 0,
    // leave room for the floating tab bar
    paddingBottom: spacing.xxxl + insets.bottom,
  };

  if (scroll) {
    return (
      <View style={[styles.flex, { backgroundColor: background }]}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[pad, contentStyle]}
          showsVerticalScrollIndicator={false}
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      </View>
    );
  }
  return <View style={[styles.flex, { backgroundColor: background }, pad, contentStyle]}>{children}</View>;
}

const styles = StyleSheet.create({ flex: { flex: 1 } });
