import type { Story } from './types';

/** Only approved stories are ever shown in the archive. */
export function approvedStories(stories: Story[]): Story[] {
  return stories.filter((s) => s.status === 'approved');
}

export function featuredStories(stories: Story[]): Story[] {
  return approvedStories(stories).filter((s) => s.featured);
}

export function recentStories(stories: Story[], limit = 4): Story[] {
  // user-added first (they sort to the front of the array), then seed order
  return approvedStories(stories).slice(0, limit);
}

export function findStory(stories: Story[], id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}

/**
 * Browse filter: free-text query across title / veteran / theater / summary /
 * transcript, plus optional conflict and branch filters. Approved only.
 */
export function filterStories(
  stories: Story[],
  opts: { query?: string; conflict?: string; branch?: string },
): Story[] {
  const q = (opts.query ?? '').trim().toLowerCase();
  return approvedStories(stories).filter((s) => {
    if (opts.conflict && s.conflict !== opts.conflict) return false;
    if (opts.branch && s.branch !== opts.branch) return false;
    if (!q) return true;
    return [s.title, s.veteran_name, s.theater, s.summary, s.story_content]
      .filter(Boolean)
      .some((f) => f.toLowerCase().includes(q));
  });
}
