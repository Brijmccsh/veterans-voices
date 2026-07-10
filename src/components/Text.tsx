import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { colors, fonts, type as typeScale, TypeVariant } from '@/theme';

type Weight = 'regular' | 'medium' | 'bold' | 'serif' | 'serifBold' | 'serifItalic';

export interface TextProps extends RNTextProps {
  variant?: TypeVariant;
  weight?: Weight;
  color?: string;
  center?: boolean;
  /** letterSpacing shortcut — used for overlines/eyebrows */
  tracking?: number;
}

const fontForWeight: Record<Weight, string> = {
  regular: fonts.body,
  medium: fonts.bodyMedium,
  bold: fonts.bodyBold,
  serif: fonts.serif,
  serifBold: fonts.serifBold,
  serifItalic: fonts.serifItalic,
};

/**
 * Base Text. Enforces a lineHeight that comfortably fits the fontSize so
 * large serif glyphs (and any custom fontSize) never get clipped — a bug
 * we've hit before with variant line-heights and big display type.
 */
export function Text({
  variant = 'body',
  weight = 'regular',
  color = colors.ink,
  center,
  tracking,
  style,
  ...rest
}: TextProps) {
  const base = typeScale[variant];
  const flat = (Array.isArray(style) ? Object.assign({}, ...style.filter(Boolean)) : style) as
    | TextStyle
    | undefined;

  const fontSize = (flat?.fontSize as number) ?? base.fontSize;
  // Never let lineHeight fall below ~1.28x the actual fontSize.
  const minLine = Math.ceil(fontSize * 1.28);
  const lineHeight = Math.max((flat?.lineHeight as number) ?? base.lineHeight, minLine);

  return (
    <RNText
      allowFontScaling={false}
      {...rest}
      style={[
        {
          fontFamily: fontForWeight[weight],
          fontSize,
          lineHeight,
          color,
          ...(center ? { textAlign: 'center' } : null),
          ...(tracking != null ? { letterSpacing: tracking } : null),
        },
        style,
      ]}
    />
  );
}
