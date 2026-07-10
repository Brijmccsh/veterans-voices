import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SEED_STORIES } from '@/data/stories';
import type { Story } from '@/data/types';

const STORAGE_KEY = 'vv.userStories.v2';

/** Fields the Submit form collects to build a new local Story. */
export type NewStoryInput = Omit<Story, 'id' | 'featured' | 'status' | 'user_added' | 'recorded_label'> & {
  recorded_label?: string;
};

interface StoriesContextValue {
  stories: Story[];
  ready: boolean;
  addStory: (input: NewStoryInput) => Story;
  getStory: (id: string) => Story | undefined;
}

const StoriesContext = createContext<StoriesContextValue | null>(null);

let idCounter = 0;
function makeId(): string {
  // unique, collision-safe id for locally-added stories (never collides with "1".."5")
  return `u-${Date.now().toString(36)}-${idCounter++}`;
}

export function StoriesProvider({ children }: { children: React.ReactNode }) {
  const [userStories, setUserStories] = useState<Story[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setUserStories(JSON.parse(raw) as Story[]);
      } catch {
        // ignore corrupt cache — start clean
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const persist = useCallback(async (next: Story[]) => {
    setUserStories(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // best-effort; local demo persistence
    }
  }, []);

  const addStory = useCallback(
    (input: NewStoryInput): Story => {
      const story: Story = {
        ...input,
        id: makeId(),
        featured: false,
        status: 'approved',
        user_added: true,
        recorded_label: input.recorded_label ?? 'Added to the archive',
      };
      persist([story, ...userStories]); // newest first
      return story;
    },
    [userStories, persist],
  );

  const value = useMemo<StoriesContextValue>(() => {
    // user-added first so a fresh submission is easy to find during a demo
    const stories = [...userStories, ...SEED_STORIES];
    return {
      stories,
      ready,
      addStory,
      getStory: (id) => stories.find((s) => s.id === id),
    };
  }, [userStories, ready, addStory]);

  return <StoriesContext.Provider value={value}>{children}</StoriesContext.Provider>;
}

export function useStories() {
  const ctx = useContext(StoriesContext);
  if (!ctx) throw new Error('useStories must be used within StoriesProvider');
  return ctx;
}
