import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { PressableScale } from './PressableScale';
import { Text } from './Text';
import { colors, radius, spacing, shadow } from '@/theme';
import { formatTime } from '@/lib/format';

interface Props {
  source: number | { uri: string } | null;
  /** fallback duration (seconds) shown before the file reports its own */
  fallbackDuration?: number;
  veteranName: string;
}

/**
 * The interview audio player. Real playback via expo-audio: play/pause,
 * a draggable scrubber, 15s skip, and elapsed / total time. When no
 * recording is attached yet (locally-added stories), it shows a calm
 * "recording pending" state instead of a dead control.
 */
export function AudioPlayer({ source, fallbackDuration = 0, veteranName }: Props) {
  const player = useAudioPlayer(source ?? undefined);
  const status = useAudioPlayerStatus(player);
  const [scrubbing, setScrubbing] = useState<number | null>(null);

  const duration = status.duration > 0 ? status.duration : fallbackDuration;
  const position = scrubbing ?? status.currentTime ?? 0;

  // Reset to start when the clip finishes so it can be replayed cleanly.
  useEffect(() => {
    if (status.didJustFinish) {
      player.pause();
      player.seekTo(0);
    }
  }, [status.didJustFinish]);

  if (!source) {
    return (
      <View style={[styles.card, styles.pending]}>
        <Ionicons name="mic-outline" size={22} color={colors.onNavySoft} />
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

  const toggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (status.playing) player.pause();
    else player.play();
  };

  const skip = (delta: number) => {
    const next = Math.min(Math.max((status.currentTime ?? 0) + delta, 0), duration || 0);
    player.seekTo(next);
    Haptics.selectionAsync();
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <PressableScale onPress={() => skip(-15)} to={0.88} style={styles.skip}>
          <Ionicons name="play-back" size={18} color={colors.onNavySoft} />
          <Text variant="overline" weight="bold" color={colors.onNavySoft} style={{ marginTop: 1 }}>
            15
          </Text>
        </PressableScale>

        <PressableScale onPress={toggle} to={0.92} style={styles.playBtn}>
          <Ionicons
            name={status.playing ? 'pause' : 'play'}
            size={28}
            color={colors.navyDeep}
            style={{ marginLeft: status.playing ? 0 : 3 }}
          />
        </PressableScale>

        <PressableScale onPress={() => skip(15)} to={0.88} style={styles.skip}>
          <Ionicons name="play-forward" size={18} color={colors.onNavySoft} />
          <Text variant="overline" weight="bold" color={colors.onNavySoft} style={{ marginTop: 1 }}>
            15
          </Text>
        </PressableScale>
      </View>

      <Slider
        style={{ width: '100%', height: 36, marginTop: spacing.sm }}
        minimumValue={0}
        maximumValue={duration || 1}
        value={position}
        minimumTrackTintColor={colors.gold}
        maximumTrackTintColor={colors.navyLine}
        thumbTintColor={colors.goldSoft}
        onSlidingStart={() => setScrubbing(status.currentTime ?? 0)}
        onValueChange={(v) => setScrubbing(v)}
        onSlidingComplete={(v) => {
          player.seekTo(v);
          setScrubbing(null);
        }}
      />

      <View style={styles.timeRow}>
        <Text variant="caption" weight="medium" color={colors.onNavySoft}>
          {formatTime(position)}
        </Text>
        <View style={styles.liveDot}>
          <Ionicons name="headset" size={12} color={colors.gold} />
          <Text variant="caption" weight="medium" color={colors.gold}>
            Oral history recording
          </Text>
        </View>
        <Text variant="caption" weight="medium" color={colors.onNavySoft}>
          {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.navy,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.navyLine,
    ...shadow.card,
  },
  pending: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  playBtn: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.hairline,
  },
  skip: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  liveDot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
