import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** scale at press-in (default 0.97) */
  to?: number;
  /** fire a light haptic on press-in */
  haptic?: boolean;
}

/** A pressable that gently scales + dims on press. Calm, not bouncy. */
export function PressableScale({ children, style, to = 0.97, haptic = false, onPressIn, onPressOut, ...rest }: Props) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      {...rest}
      onPressIn={(e) => {
        scale.value = withTiming(to, { duration: 120, easing: Easing.out(Easing.quad) });
        opacity.value = withTiming(0.92, { duration: 120 });
        if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withTiming(1, { duration: 160, easing: Easing.out(Easing.quad) });
        opacity.value = withTiming(1, { duration: 160 });
        onPressOut?.(e);
      }}
      style={[animStyle, style]}
    >
      {children}
    </AnimatedPressable>
  );
}
