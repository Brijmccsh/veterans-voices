import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

import { Screen, Text, Tag, Divider, Portrait, NavHeader, AudioPlayer, VideoPlayer } from '@/components';
import { colors, spacing, radius, shadow, branchColor } from '@/theme';
import { useStories } from '@/state/StoriesContext';
import { MEDIA_META, toParagraphs } from '@/lib/media';

export default function StoryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getStory } = useStories();
  const story = id ? getStory(id) : undefined;

  if (!story) {
    return (
      <Screen padded={false}>
        <NavHeader title="Story" />
        <Text variant="body" color={colors.inkFaint} center style={{ marginTop: spacing.xxl }}>
          This story could not be found.
        </Text>
      </Screen>
    );
  }

  const bc = branchColor[story.branch] ?? colors.olive;
  const media = MEDIA_META[story.media_type];
  const paragraphs = toParagraphs(story.story_content);
  const showAudio = story.media_type === 'audio' || story.media_type === 'mixed';
  const showVideo = story.media_type === 'video';
  const showTranscript = story.media_type === 'written' || story.media_type === 'mixed' || paragraphs.length > 0;

  return (
    <Screen padded={false} contentStyle={{ paddingBottom: spacing.xxxl * 2 }}>
      <NavHeader title="" eyebrow="Oral History" />

      <View style={{ paddingHorizontal: spacing.lg, marginTop: -spacing.md }}>
        {/* Badges + title */}
        <Animated.View entering={FadeInDown.duration(420)}>
          <View style={styles.badges}>
            <Tag label={story.conflict} tone="navy" icon="ribbon-outline" />
            <Tag label={story.branch} color={bc} icon="shield-outline" />
            <Tag label={media.label} tone="gold" icon={media.icon} />
          </View>
          <Text variant="title" weight="serifBold" style={{ marginTop: spacing.md }}>
            {story.title}
          </Text>
        </Animated.View>

        {/* Veteran info card */}
        <Animated.View entering={FadeInDown.delay(80).duration(420)} style={styles.idCard}>
          <Portrait source={story.photo_url} name={story.veteran_name} size={72} rounded={radius.lg} branchColor={bc} />
          <View style={{ flex: 1 }}>
            <Text variant="heading" weight="serifBold" numberOfLines={2}>
              {story.veteran_name}
            </Text>
            <Text variant="bodySm" weight="medium" color={colors.inkSoft}>
              {story.rank}
            </Text>
            <View style={styles.idMetaRow}>
              <IdMeta icon="shield-outline" text={story.branch} />
              <IdMeta icon="time-outline" text={story.years_of_service} />
            </View>
            <IdMeta icon="location-outline" text={story.theater} />
          </View>
        </Animated.View>

        {/* Player by media type */}
        <View style={{ marginTop: spacing.xl }}>
          <Text variant="overline" weight="bold" color={colors.gold} tracking={1.5} style={styles.eyebrow}>
            {showVideo ? 'The Recording · Video' : showAudio ? 'The Recording · Audio' : 'Written Account'}
          </Text>
          <Animated.View entering={FadeIn.delay(120)}>
            {showVideo ? (
              <VideoPlayer source={story.video_url} veteranName={story.veteran_name} />
            ) : showAudio ? (
              <AudioPlayer source={story.audio_url} veteranName={story.veteran_name} />
            ) : (
              <View style={styles.writtenNote}>
                <Ionicons name="document-text-outline" size={18} color={colors.olive} />
                <Text variant="bodySm" color={colors.inkSoft} style={{ flex: 1 }}>
                  This account was preserved in writing.
                </Text>
              </View>
            )}
          </Animated.View>
          {story.recorded_label && (
            <Text variant="caption" color={colors.inkFaint} style={{ marginTop: spacing.sm }}>
              {story.recorded_label}
            </Text>
          )}
        </View>

        {/* Full transcript */}
        {showTranscript && paragraphs.length > 0 && (
          <View style={{ marginTop: spacing.xxl }}>
            <View style={styles.transcriptHead}>
              <Text variant="overline" weight="bold" color={colors.gold} tracking={1.5}>
                {story.media_type === 'written' ? 'THE ACCOUNT' : 'TRANSCRIPT'}
              </Text>
              <View style={{ flex: 1 }}>
                <Divider star={false} color={colors.creamLine} inset={spacing.md} />
              </View>
            </View>
            <View style={styles.transcriptBody}>
              {paragraphs.map((para, i) => (
                <Text
                  key={i}
                  variant="subheading"
                  weight="serif"
                  color={colors.ink}
                  style={{ lineHeight: 30, marginBottom: spacing.lg }}
                >
                  {para}
                </Text>
              ))}
            </View>
          </View>
        )}

        <View style={{ alignItems: 'center', marginTop: spacing.xl }}>
          <Ionicons name="star" size={13} color={colors.gold} />
          <Text variant="body" weight="serifItalic" color={colors.inkFaint} center style={{ marginTop: spacing.sm }}>
            Preserved so their voice is never lost.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

function IdMeta({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 }}>
      <Ionicons name={icon} size={13} color={colors.olive} />
      <Text variant="caption" color={colors.inkSoft} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  idCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: colors.creamRaised,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    ...shadow.card,
  },
  idMetaRow: { flexDirection: 'row', gap: spacing.lg },
  eyebrow: { textTransform: 'uppercase', marginBottom: spacing.md },
  writtenNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(92,97,66,0.10)',
    borderRadius: radius.md,
    padding: spacing.md,
  },
  transcriptHead: { flexDirection: 'row', alignItems: 'center' },
  transcriptBody: { marginTop: spacing.lg },
});
