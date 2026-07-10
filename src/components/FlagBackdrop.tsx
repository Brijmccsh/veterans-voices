import { ImageBackground, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme';

const FLAG = require('@/assets/brand/flag.jpg');

interface Props {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** How strongly the navy sits over the flag. Higher = flag fainter. */
  intensity?: 'header' | 'footer';
  radius?: number;
}

/**
 * A navy panel with the US flag inset behind it — heavily washed out under a
 * navy overlay + gradient so the flag is only faintly visible and the navy
 * dominates. Used behind the home header and the footer band (rule #2).
 */
export function FlagBackdrop({ children, style, intensity = 'header', radius = 0 }: Props) {
  const flagOpacity = intensity === 'header' ? 0.22 : 0.14;
  return (
    <View style={[{ borderRadius: radius, overflow: 'hidden' }, style]}>
      <ImageBackground source={FLAG} resizeMode="cover" style={StyleSheet.absoluteFill}>
        {/* Desaturating navy wash */}
        <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.navy, opacity: 1 - flagOpacity }]} />
        {/* Gentle vertical depth so text stays legible */}
        <LinearGradient
          colors={['rgba(10,25,48,0.55)', 'rgba(15,35,64,0.30)', 'rgba(10,25,48,0.80)'] as const}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>
      {children}
    </View>
  );
}
