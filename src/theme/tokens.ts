/**
 * Veterans' Voices — design tokens.
 * One source of truth for the whole app. Palette pulled from the logo
 * (charcoal + olive/camo + brass gold) and brief (navy + gold + cream).
 * Tone: solemn, archival, premium. No bright/playful values live here.
 */

export const colors = {
  // Core surfaces
  navy: '#0F2340',        // primary — headers, footer, hero
  navyDeep: '#0A1930',    // gradient bottoms, tab bar
  navySoft: '#1B3358',    // raised navy surfaces / pressed states
  navyLine: '#24406B',    // hairlines on navy

  // Shared accent — ties navy to the olive/gold logo
  gold: '#C6A24C',
  goldSoft: '#D8BE7E',
  goldDeep: '#9C7C33',

  // Secondary, straight from the logo
  olive: '#5C6142',
  oliveSoft: '#7B8060',

  // Warm paper
  cream: '#F5EFE2',
  creamRaised: '#FBF7EE', // cards on cream
  creamLine: '#E4DAC5',   // hairlines on cream

  // Ink (text on cream)
  ink: '#1D2733',
  inkSoft: '#4A5666',
  inkFaint: '#7A8494',

  // Text on navy
  onNavy: '#F3EEE2',
  onNavySoft: '#B9C3D4',
  onNavyFaint: '#7E8DA6',

  // Status / rare use
  danger: '#9E3B34',
  white: '#FFFFFF',
  black: '#000000',
  overlayNavy: 'rgba(15,35,64,0.82)', // for the washed flag motif
} as const;

/** Branch-of-service accent chips (muted, dignified — not rainbow). */
export const branchColor: Record<string, string> = {
  Army: '#4B5320',
  Navy: '#243A5E',
  'Marine Corps': '#6E2B2B',
  'Air Force': '#2E4A63',
  'Space Force': '#1E2E52',
  'Coast Guard': '#7A4A1E',
  'National Guard': '#3B4A2E',
  Other: '#4A5666',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 26,
  pill: 999,
} as const;

export const fonts = {
  // Playfair Display — serif display headings (loaded in _layout)
  serif: 'PlayfairDisplay_600SemiBold',
  serifBold: 'PlayfairDisplay_700Bold',
  serifItalic: 'PlayfairDisplay_500Medium_Italic',
  // Inter — clean sans body
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;

/**
 * Type scale. lineHeight is generous relative to size — the base Text
 * component enforces at least this so large serif glyphs never clip
 * (a gotcha we've hit before).
 */
export const type = {
  display: { fontSize: 34, lineHeight: 42 },
  title: { fontSize: 26, lineHeight: 34 },
  heading: { fontSize: 21, lineHeight: 28 },
  subheading: { fontSize: 18, lineHeight: 25 },
  body: { fontSize: 16, lineHeight: 25 },
  bodySm: { fontSize: 14, lineHeight: 21 },
  caption: { fontSize: 12.5, lineHeight: 17 },
  overline: { fontSize: 11.5, lineHeight: 15 },
} as const;

export const shadow = {
  // Soft, quality shadows — not neon glows.
  card: {
    shadowColor: '#0A1930',
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  raised: {
    shadowColor: '#0A1930',
    shadowOpacity: 0.22,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
  },
  hairline: {
    shadowColor: '#0A1930',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
} as const;

export type Spacing = keyof typeof spacing;
export type TypeVariant = keyof typeof type;
