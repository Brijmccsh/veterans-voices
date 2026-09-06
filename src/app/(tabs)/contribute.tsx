import { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { Screen, Text, Button, Card, Divider, Portrait, PressableScale, NavHeader } from '@/components';
import { FormField } from '@/components/form/FormField';
import { SelectField } from '@/components/form/SelectField';
import { colors, spacing, radius, shadow, branchColor } from '@/theme';
import { useStories } from '@/state/StoriesContext';
import { pickImage, pickVideo } from '@/lib/pickImage';
import { BRANCHES, CONFLICTS, MEDIA_TYPES } from '@/data/types';
import type { Branch, Conflict, MediaType } from '@/data/types';

const MEDIA_LABELS: Record<MediaType, string> = {
  written: 'Written account',
  audio: 'Audio recording',
  video: 'Video recording',
  mixed: 'Audio + written',
};

export default function Contribute() {
  const { addStory } = useStories();

  const [title, setTitle] = useState('');
  const [veteranName, setVeteranName] = useState('');
  const [rank, setRank] = useState('');
  const [branch, setBranch] = useState<Branch | undefined>();
  const [conflict, setConflict] = useState<Conflict | undefined>();
  const [theater, setTheater] = useState('');
  const [years, setYears] = useState('');
  const [mediaType, setMediaType] = useState<MediaType | undefined>();
  const [summary, setSummary] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [audioAttached, setAudioAttached] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const canSubmit = !!(title.trim() && veteranName.trim() && branch && conflict && mediaType);
  const needsVideo = mediaType === 'video';
  const needsAudioNote = mediaType === 'audio' || mediaType === 'mixed';

  const addPhoto = async () => {
    const uri = await pickImage();
    if (uri) setPhotoUri(uri);
  };
  const addVideo = async () => {
    const uri = await pickVideo();
    if (uri) setVideoUri(uri);
  };

  const resetForm = () => {
    setTitle('');
    setVeteranName('');
    setRank('');
    setBranch(undefined);
    setConflict(undefined);
    setTheater('');
    setYears('');
    setMediaType(undefined);
    setSummary('');
    setStoryContent('');
    setPhotoUri(null);
    setVideoUri(null);
    setAudioAttached(false);
    setAudioPlaying(false);
  };

  const submit = () => {
    if (!canSubmit || !branch || !conflict || !mediaType) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const story = addStory({
      title: title.trim(),
      veteran_name: veteranName.trim(),
      rank: rank.trim() || '—',
      branch,
      conflict,
      theater: theater.trim() || '—',
      years_of_service: years.trim() || '—',
      media_type: mediaType,
      photo_url: photoUri ? { uri: photoUri } : null,
      audio_url: null, // audio is attached after review in the demo flow
      video_url: mediaType === 'video' && videoUri ? { uri: videoUri } : null,
      summary: summary.trim() || `${veteranName.trim()} served with the ${branch} during the ${conflict}.`,
      story_content: storyContent.trim(),
    });

    resetForm();
    Alert.alert('Story submitted', `“${story.title}” has been added to the living library.`, [
      { text: 'View story', onPress: () => router.push(`/story/${story.id}`) },
    ]);
  };

  return (
    <Screen padded={false}>
      <NavHeader back={false} eyebrow="Preserve a Story" title="Submit a Story" />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{ paddingHorizontal: spacing.lg, marginTop: -spacing.sm }}>
          {/* Portrait */}
          <Card style={{ alignItems: 'center', paddingVertical: spacing.xl }}>
            <PressableScale onPress={addPhoto} to={0.95}>
              <View>
                <Portrait
                  source={photoUri ? { uri: photoUri } : null}
                  name={veteranName || 'V'}
                  size={104}
                  rounded={radius.xl}
                  branchColor={branch ? branchColor[branch] : undefined}
                />
                <View style={styles.cameraBadge}>
                  <Ionicons name="camera" size={16} color={colors.navyDeep} />
                </View>
              </View>
            </PressableScale>
            <Text variant="bodySm" weight="medium" color={colors.inkSoft} style={{ marginTop: spacing.md }}>
              {photoUri ? 'Tap to change photo' : 'Add a portrait photo'}
            </Text>
          </Card>

          <View style={{ height: spacing.xl }} />

          <Section label="STORY" />
          <FormField label="Story title" required value={title} onChangeText={setTitle} placeholder="e.g. Signals in the Dark" />
          <SelectField
            label="Media type"
            required
            value={mediaType ? MEDIA_LABELS[mediaType] : undefined}
            options={MEDIA_TYPES.map((m) => MEDIA_LABELS[m])}
            onSelect={(labelSel) => {
              const found = MEDIA_TYPES.find((m) => MEDIA_LABELS[m] === labelSel);
              if (found) setMediaType(found);
            }}
          />

          <Section label="VETERAN DETAILS" />
          <FormField label="Full name" required value={veteranName} onChangeText={setVeteranName} placeholder="e.g. Margaret Chen" />
          <FormField label="Rank" value={rank} onChangeText={setRank} placeholder="e.g. Sergeant First Class" />
          <SelectField label="Branch of service" required value={branch} options={[...BRANCHES]} onSelect={(v) => setBranch(v as Branch)} />

          <Section label="SERVICE" />
          <SelectField label="Conflict" required value={conflict} options={[...CONFLICTS]} onSelect={(v) => setConflict(v as Conflict)} />
          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            <View style={{ flex: 1 }}>
              <FormField label="Theater" value={theater} onChangeText={setTheater} placeholder="e.g. Pacific Theater" />
            </View>
            <View style={{ flex: 1 }}>
              <FormField label="Years of service" value={years} onChangeText={setYears} placeholder="1965–1968" />
            </View>
          </View>

          <Section label="RECORDING & PHOTO" />
          {needsVideo && (
            <PressableScale onPress={addVideo} to={0.98} style={styles.uploadRow}>
              <View style={styles.uploadIcon}>
                <Ionicons name="videocam-outline" size={20} color={colors.gold} />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="body" weight="bold">
                  Video recording
                </Text>
                <Text variant="caption" color={colors.inkFaint}>
                  {videoUri ? 'Video attached' : 'Attach the interview video'}
                </Text>
              </View>
              <Ionicons name={videoUri ? 'checkmark-circle' : 'add'} size={22} color={videoUri ? colors.olive : colors.navy} />
            </PressableScale>
          )}
          {videoUri && (
            <View style={styles.videoThumb}>
              <Ionicons name="film-outline" size={18} color={colors.onNavySoft} />
              <Text variant="caption" color={colors.onNavySoft} numberOfLines={1} style={{ flex: 1 }}>
                Video ready to preview on the story page
              </Text>
            </View>
          )}
          {needsAudioNote && (
            <>
              <PressableScale
                onPress={() => {
                  setAudioAttached(true);
                  Haptics.selectionAsync();
                }}
                to={0.98}
                style={styles.uploadRow}
              >
                <View style={styles.uploadIcon}>
                  <Ionicons name="mic-outline" size={20} color={colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text variant="body" weight="bold">
                    Audio recording
                  </Text>
                  <Text variant="caption" color={colors.inkFaint}>
                    {audioAttached ? 'Interview recording attached' : 'Attach the interview recording'}
                  </Text>
                </View>
                <Ionicons name={audioAttached ? 'checkmark-circle' : 'cloud-upload-outline'} size={22} color={audioAttached ? colors.olive : colors.navy} />
              </PressableScale>

              {audioAttached && (
                <View style={styles.audioPlayer}>
                  <PressableScale
                    onPress={() => {
                      setAudioPlaying((p) => !p);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    }}
                    to={0.9}
                    style={styles.audioPlayBtn}
                  >
                    <Ionicons
                      name={audioPlaying ? 'pause' : 'play'}
                      size={20}
                      color={colors.navyDeep}
                      style={{ marginLeft: audioPlaying ? 0 : 2 }}
                    />
                  </PressableScale>
                  <View style={{ flex: 1 }}>
                    <View style={styles.audioScrub}>
                      <View style={[styles.audioScrubFill, { width: audioPlaying ? '34%' : '0%' }]} />
                    </View>
                    <View style={styles.audioTimeRow}>
                      <Text variant="caption" color={colors.onNavySoft}>
                        {audioPlaying ? '0:23' : '0:00'}
                      </Text>
                      <Text variant="caption" color={colors.onNavySoft}>
                        Interview recording
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </>
          )}

          <View style={{ height: spacing.lg }} />
          <FormField
            label="Short summary"
            value={summary}
            onChangeText={setSummary}
            placeholder="A sentence or two describing this veteran's service."
            multiline
          />
          <FormField
            label="Full account / transcript"
            value={storyContent}
            onChangeText={setStoryContent}
            placeholder="The veteran's story, in their own words…"
            multiline
            style={{ minHeight: 140 }}
          />

          <Divider color={colors.creamLine} inset={0} />
          <View style={{ marginTop: spacing.xl }}>
            <Button label="Submit to the archive" icon="shield-checkmark" variant="gold" size="lg" full disabled={!canSubmit} onPress={submit} />
            {!canSubmit && (
              <Text variant="caption" color={colors.inkFaint} center style={{ marginTop: spacing.md }}>
                Title, media type, veteran name, branch, and conflict are required.
              </Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function Section({ label }: { label: string }) {
  return (
    <Text variant="overline" weight="bold" color={colors.gold} tracking={1.5} style={styles.section}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  section: { textTransform: 'uppercase', marginBottom: spacing.md, marginTop: spacing.sm },
  cameraBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.creamRaised,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.creamRaised,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.creamLine,
    padding: spacing.md,
  },
  videoThumb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.navy,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.navy,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    ...shadow.hairline,
  },
  audioPlayBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioScrub: {
    height: 4,
    borderRadius: 3,
    backgroundColor: colors.navyLine,
    overflow: 'hidden',
  },
  audioScrubFill: {
    height: '100%',
    backgroundColor: colors.gold,
    borderRadius: 3,
  },
  audioTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
