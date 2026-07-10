import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PressableScale } from './PressableScale';
import { Text } from './Text';
import { Tag } from './Tag';
import { colors, radius, shadow, spacing, branchColor } from '@/theme';
import { MEDIA_META } from '@/lib/media';
import type { Story } from '@/data/types';

interface Props {
  story: Story;
}

/**
 * Archive story card: photo (or first-initial fallback), conflict + branch
 * badges, title, veteran name + rank, summary, and a media-type icon with
 * years of service. Fills its container width — used in grids and rows.
 */
export function StoryCard({ story }: Props) {
  const bc = branchColor[story.branch] ?? colors.olive;
  const media = MEDIA_META[story.media_type];
  const initial = (story.veteran_name.trim()[0] ?? 'V').toUpperCase();

  return (
    <PressableScale onPress={() => router.push(`/story/${story.id}`)} style={styles.card}>
      {/* Photo / initial banner */}
      <View style={styles.banner}>
        {story.photo_url ? (
          <Image source={story.photo_url} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
        ) : (
          <LinearGradient colors={[colors.navySoft, bc] as const} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill}>
            <View style={styles.initialWrap}>
              <Text weight="serifBold" color={colors.onNavy} style={{ fontSize: 52 }}>
                {initial}
              </Text>
            </View>
          </LinearGradient>
        )}
        {/* media-type chip */}
        <View style={styles.mediaChip}>
          <Ionicons name={media.icon} size={12} color={colors.navyDeep} />
          <Text variant="overline" weight="bold" color={colors.navyDeep} tracking={0.3}>
            {media.label}
          </Text>
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.badges}>
          <Tag label={story.conflict} tone="navy" />
          <Tag label={story.branch} color={bc} />
        </View>

        <Text weight="serifBold" variant="subheading" numberOfLines={2} style={{ marginTop: spacing.sm }}>
          {story.title}
        </Text>
        <Text variant="caption" weight="medium" color={colors.inkSoft} numberOfLines={1} style={{ marginTop: 2 }}>
          {story.veteran_name} · {story.rank}
        </Text>

        <Text variant="caption" color={colors.inkFaint} numberOfLines={2} style={{ marginTop: 6, lineHeight: 17 }}>
          {story.summary}
        </Text>

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Ionicons name={media.icon} size={13} color={colors.gold} />
            <Text variant="caption" weight="medium" color={colors.goldDeep} numberOfLines={1}>
              {media.label}
            </Text>
          </View>
          <Text variant="caption" color={colors.inkFaint} numberOfLines={1}>
            {story.years_of_service}
          </Text>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.creamRaised,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadow.card,
  },
  banner: {
    height: 108,
    backgroundColor: colors.navy,
  },
  initialWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mediaChip: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  body: { padding: spacing.md },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.creamLine,
    gap: spacing.sm,
  },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 1 },
});
