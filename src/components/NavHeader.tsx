import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PressableScale } from './PressableScale';
import { Text } from './Text';
import { FlagBackdrop } from './FlagBackdrop';
import { colors, spacing, radius } from '@/theme';

interface Props {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  back?: boolean;
  right?: React.ReactNode;
}

/** Compact flag-backed header for pushed / tab screens. */
export function NavHeader({ title, eyebrow, subtitle, back = true, right }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <FlagBackdrop intensity="header" style={{ paddingTop: insets.top + spacing.sm }}>
      <View style={styles.bar}>
        {back ? (
          <PressableScale
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
            to={0.9}
            style={styles.iconBtn}
          >
            <Ionicons name="chevron-back" size={22} color={colors.onNavy} />
          </PressableScale>
        ) : (
          <View style={styles.iconBtn} />
        )}
        <View style={{ flex: 1 }} />
        {right ?? <View style={styles.iconBtn} />}
      </View>
      <View style={styles.titleWrap}>
        {eyebrow && (
          <Text variant="overline" weight="bold" color={colors.gold} tracking={1.6} style={{ textTransform: 'uppercase' }}>
            {eyebrow}
          </Text>
        )}
        {title.length > 0 && (
          <Text variant="title" weight="serifBold" color={colors.onNavy}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text variant="bodySm" color={colors.onNavySoft} style={{ marginTop: 2 }}>
            {subtitle}
          </Text>
        )}
      </View>
    </FlagBackdrop>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xl,
  },
});
