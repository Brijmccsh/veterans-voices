import type { ImageSource } from '@/components/Portrait';

/** A local or bundled media reference: require()'d asset, remote/local uri, or none. */
export type MediaSource = number | { uri: string } | null;

/** Conflicts — the client's approved filter list, in display order. */
export const CONFLICTS = [
  'World War I',
  'World War II',
  'Korean War',
  'Vietnam War',
  'Gulf War',
  'War on Terror',
  'Iraq War',
  'Afghanistan War',
  'Cold War',
  'Peacetime Service',
  'Other',
] as const;
export type Conflict = (typeof CONFLICTS)[number];

/** Branches — the client's approved filter list. */
export const BRANCHES = [
  'Army',
  'Navy',
  'Marine Corps',
  'Air Force',
  'Space Force',
  'Coast Guard',
  'National Guard',
  'Other',
] as const;
export type Branch = (typeof BRANCHES)[number];

export const MEDIA_TYPES = ['written', 'audio', 'video', 'mixed'] as const;
export type MediaType = (typeof MEDIA_TYPES)[number];

/**
 * Story — matches the client's schema exactly (snake_case field names).
 * photo_url / audio_url / video_url accept a bundled require() asset or a
 * local { uri } from the submission form; null falls back gracefully.
 */
export interface Story {
  id: string;
  title: string;
  veteran_name: string;
  rank: string;
  branch: Branch;
  conflict: Conflict;
  theater: string;
  years_of_service: string; // e.g. "1942–1945"
  media_type: MediaType;
  photo_url: ImageSource;
  audio_url: MediaSource;
  video_url: MediaSource;
  summary: string;
  story_content: string; // full transcript
  featured: boolean;
  status: 'approved';
  /** true for stories added locally via the Submit form (still status:approved for the demo) */
  user_added?: boolean;
  /** display label for when the interview was recorded / added */
  recorded_label?: string;
}
