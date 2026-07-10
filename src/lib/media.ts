import type { Ionicons } from '@expo/vector-icons';
import type { MediaType } from '@/data/types';

type IconName = keyof typeof Ionicons.glyphMap;

/** Icon + label for each media type — used on cards and detail badges. */
export const MEDIA_META: Record<MediaType, { icon: IconName; label: string }> = {
  written: { icon: 'document-text-outline', label: 'Written' },
  audio: { icon: 'headset-outline', label: 'Audio' },
  video: { icon: 'videocam-outline', label: 'Video' },
  mixed: { icon: 'albums-outline', label: 'Audio + Text' },
};

/** Split a story_content transcript string into display paragraphs. */
export function toParagraphs(content: string): string[] {
  return content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}
