import { useMemo, useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Screen, Text, StoryCard, NavHeader, PressableScale } from '@/components';
import { FilterDropdown } from '@/components/form/FilterDropdown';
import { colors, spacing, radius, shadow } from '@/theme';
import { useStories } from '@/state/StoriesContext';
import { filterStories } from '@/data/taxonomy';
import { CONFLICTS, BRANCHES } from '@/data/types';

export default function Browse() {
  const { stories } = useStories();
  const [query, setQuery] = useState('');
  const [conflict, setConflict] = useState<string | undefined>();
  const [branch, setBranch] = useState<string | undefined>();

  const results = useMemo(
    () => filterStories(stories, { query, conflict, branch }),
    [stories, query, conflict, branch],
  );

  const hasFilters = !!query || !!conflict || !!branch;

  return (
    <Screen padded={false} scroll={false}>
      <NavHeader back={false} eyebrow="The Living Library" title="Browse the Archive" />

      {/* Filters */}
      <View style={styles.controls}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.inkFaint} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search stories, veterans, places…"
            placeholderTextColor={colors.inkFaint}
            style={styles.input}
            autoCorrect={false}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {query.length > 0 && (
            <PressableScale onPress={() => setQuery('')} to={0.85}>
              <Ionicons name="close-circle" size={18} color={colors.inkFaint} />
            </PressableScale>
          )}
        </View>
        <View style={styles.filterRow}>
          <FilterDropdown allLabel="All Conflicts" value={conflict} options={CONFLICTS} onChange={setConflict} />
          <FilterDropdown allLabel="All Branches" value={branch} options={BRANCHES} onChange={setBranch} />
        </View>
        <View style={styles.countRow}>
          <Text variant="caption" color={colors.inkFaint}>
            {results.length} {results.length === 1 ? 'story' : 'stories'}
          </Text>
          {hasFilters && (
            <PressableScale
              to={0.95}
              onPress={() => {
                setQuery('');
                setConflict(undefined);
                setBranch(undefined);
                Keyboard.dismiss();
              }}
            >
              <Text variant="caption" weight="bold" color={colors.goldDeep}>
                Clear filters
              </Text>
            </PressableScale>
          )}
        </View>
      </View>

      {/* Grid */}
      <Animated.ScrollView
        entering={FadeIn}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContent}
      >
        <View style={styles.grid}>
          {results.map((s) => (
            <View key={s.id} style={styles.cell}>
              <StoryCard story={s} />
            </View>
          ))}
        </View>
        {results.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={30} color={colors.inkFaint} />
            <Text variant="body" color={colors.inkFaint} center style={{ marginTop: spacing.md }}>
              No stories match your search yet.
            </Text>
          </View>
        )}
      </Animated.ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  controls: { paddingHorizontal: spacing.lg, marginTop: -spacing.md, gap: spacing.md },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.creamRaised,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    height: 50,
    ...shadow.card,
  },
  input: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 15.5, color: colors.ink, paddingVertical: 0 },
  filterRow: { flexDirection: 'row', gap: spacing.md },
  countRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  gridContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xxxl * 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  cell: { width: '47.8%', flexGrow: 1 },
  empty: { alignItems: 'center', paddingVertical: spacing.xxxl, paddingHorizontal: spacing.xl },
});
