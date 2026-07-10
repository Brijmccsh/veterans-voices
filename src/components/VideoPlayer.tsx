import { View, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { colors, radius, spacing, shadow } from '@/theme';

interface Props {
  source: number | { uri: string } | null;
  veteranName: string;
}

/**
 * The interview video player. Real playback via expo-video with native
 * transport controls. When no recording is attached yet, shows a calm
 * "recording pending" state instead of a broken frame.
 */
export function VideoPlayer({ source, veteranName }: Props) {
  const player = useVideoPlayer(source ?? '', (p) => {
    p.muted = false;
    p.loop = false;
  });

  if (!source) {
    return (
      <View style={[styles.card, styles.pending]}>
        <Ionicons name="videocam-outline" size={22} color={colors.onNavySoft} />
        <View style={{ flex: 1 }}>
          <Text weight="bold" color={colors.onNavy}>
            Recording being prepared
          </Text>
          <Text variant="caption" color={colors.onNavySoft}>
            {veteranName}&apos;s full interview will be added to the archive.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="contain"
        nativeControls
        allowsFullscreen
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.navyDeep,
    borderRadius: radius.lg,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.navyLine,
    ...shadow.card,
  },
  video: {
    width: '100%',
    height: 300,
    borderRadius: radius.md,
    backgroundColor: colors.navyDeep,
  },
  pending: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
});
