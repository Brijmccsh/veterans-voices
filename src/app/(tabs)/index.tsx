import { View, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Screen, Text, Button, Divider, SectionHeader, StoryCard, FlagBackdrop } from '@/components';
import { colors, spacing, radius, shadow } from '@/theme';
import { useStories } from '@/state/StoriesContext';
import { featuredStories, recentStories } from '@/data/taxonomy';

const LOGO = require('@/assets/brand/logo.png');
const TAGLINE_PLAQUE = require('@/assets/brand/tagline.png');

const PILLARS: { icon: keyof typeof Ionicons.glyphMap; title: string; body: string }[] = [
  { icon: 'archive-outline', title: 'Preserve', body: 'Archive stories in written, audio, and video formats' },
  { icon: 'compass-outline', title: 'Discover', body: 'Explore by conflict, theater, and branch of service' },
  { icon: 'people-outline', title: 'Connect', body: 'Share voices with future generations' },
];

export default function Home() {
  const insets = useSafeAreaInsets();
  const { stories } = useStories();
  const featured = featuredStories(stories);
  const recent = recentStories(stories, 4);

  return (
    <Screen padded={false} contentStyle={{ paddingBottom: spacing.xxxl * 2 }}>
      {/* Hero */}
      <FlagBackdrop intensity="header" style={{ paddingTop: insets.top + spacing.lg }}>
        <View style={styles.hero}>
          <Image source={LOGO} style={styles.logo} contentFit="contain" />
          <Text variant="overline" weight="bold" color={colors.gold} tracking={2} center style={styles.eyebrow}>
            THE LIVING LIBRARY OF VETERAN VOICES
          </Text>
          <Text variant="display" weight="serifBold" color={colors.onNavy} center style={{ marginTop: spacing.sm }}>
            Every Veteran Has a Story Worth Telling
          </Text>
          <Text variant="body" color={colors.onNavySoft} center style={styles.heroSub}>
            A living library preserving the voices and experiences of those who served — across time, conflict, and
            geography.
          </Text>
          <View style={styles.heroActions}>
            <Button label="Browse the Archive" icon="library" variant="gold" onPress={() => router.navigate('/browse')} />
          </View>
          <View style={{ marginTop: spacing.xl }}>
            <Divider color={colors.navyLine} />
          </View>
        </View>
      </FlagBackdrop>

      {/* Mission pillars */}
      <View style={styles.section}>
        <View style={{ gap: spacing.md }}>
          {PILLARS.map((p, i) => (
            <Animated.View key={p.title} entering={FadeInDown.delay(80 + i * 70).duration(420)}>
              <View style={styles.pillar}>
                <View style={styles.pillarIcon}>
                  <Ionicons name={p.icon} size={22} color={colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text variant="subheading" weight="serifBold">
                    {p.title}
                  </Text>
                  <Text variant="bodySm" color={colors.inkSoft} style={{ marginTop: 2 }}>
                    {p.body}
                  </Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Featured Stories */}
      {featured.length > 0 && (
        <View style={styles.section}>
          <SectionHeader eyebrow="From the Collection" title="Featured Stories" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.xs }}
          >
            {featured.map((s) => (
              <View key={s.id} style={{ width: 288 }}>
                <StoryCard story={s} />
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Recent Stories */}
      <View style={styles.section}>
        <SectionHeader eyebrow="Newly Preserved" title="Recent Stories" />
        <View style={styles.grid}>
          {recent.map((s, i) => (
            <Animated.View key={s.id} entering={FadeIn.delay(100 + i * 60)} style={styles.gridCell}>
              <StoryCard story={s} />
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Final CTA with tagline plaque */}
      <FlagBackdrop intensity="footer" style={styles.cta} radius={radius.lg}>
        <View style={styles.plaqueCard}>
          <Image source={TAGLINE_PLAQUE} style={styles.plaque} contentFit="contain" />
        </View>
        <Text variant="title" weight="serifBold" color={colors.onNavy} center style={{ marginTop: spacing.xl }}>
          Help Preserve a Veteran&apos;s Story
        </Text>
        <Text variant="bodySm" color={colors.onNavySoft} center style={{ marginTop: spacing.sm, marginBottom: spacing.lg }}>
          Every voice added to the living library is kept for the generations who come after.
        </Text>
        <Button label="Submit a Story" icon="add-circle" variant="gold" size="lg" onPress={() => router.navigate('/contribute')} />
      </FlagBackdrop>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, alignItems: 'center' },
  logo: { width: 96, height: 96, borderRadius: radius.lg, marginBottom: spacing.md },
  eyebrow: { textTransform: 'uppercase' },
  heroSub: { marginTop: spacing.md, maxWidth: 380, lineHeight: 24 },
  heroActions: { marginTop: spacing.xl, alignItems: 'center' },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xxl },
  pillar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.creamRaised,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.hairline,
  },
  pillarIcon: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  gridCell: { width: '47.8%', flexGrow: 1 },
  cta: {
    marginTop: spacing.xxxl,
    marginHorizontal: spacing.lg,
    padding: spacing.xl,
    alignItems: 'center',
  },
  plaqueCard: {
    backgroundColor: colors.cream,
    borderRadius: radius.md,
    padding: spacing.sm,
    width: '100%',
    ...shadow.card,
  },
  plaque: { width: '100%', height: 92 },
});
