import { View, ViewStyle, StyleProp } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from './Text';
import { colors, radius } from '@/theme';

export type ImageSource = number | { uri: string } | null | undefined;

interface Props {
  source?: ImageSource;
  name: string;
  size?: number;
  rounded?: number | 'full';
  branchColor?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A veteran portrait. Renders the real photo when present; otherwise a
 * tasteful monogram on a navy→olive field so seeded/added stories without a
 * photo still look intentional and archival (never a broken image).
 */
export function Portrait({ source, name, size = 64, rounded = 'full', branchColor, style }: Props) {
  const br = rounded === 'full' ? size / 2 : rounded;
  // spec: fall back to the veteran's first initial when there is no photo
  const initials = (name.trim()[0] ?? 'V').toUpperCase();

  const wrap: ViewStyle = {
    width: size,
    height: size,
    borderRadius: br,
    overflow: 'hidden',
    backgroundColor: colors.navy,
  };

  if (source) {
    return (
      <View style={[wrap, style]}>
        <Image source={source} style={{ width: '100%', height: '100%' }} contentFit="cover" transition={200} />
      </View>
    );
  }

  return (
    <View style={[wrap, style]}>
      <LinearGradient
        colors={[colors.navySoft, branchColor ?? colors.olive] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text weight="serifBold" color={colors.onNavy} style={{ fontSize: size * 0.44 }}>
          {initials}
        </Text>
      </LinearGradient>
    </View>
  );
}
