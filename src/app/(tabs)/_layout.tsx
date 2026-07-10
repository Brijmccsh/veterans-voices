import { View, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PressableScale } from '@/components/PressableScale';
import { Text } from '@/components/Text';
import { colors, radius, shadow, spacing } from '@/theme';

/** Minimal shape of the props expo-router hands the custom tabBar renderer. */
interface TabBarProps {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: {
    emit: (e: { type: 'tabPress'; target: string; canPreventDefault: true }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
}

const TABS: { name: string; label: string; icon: keyof typeof Ionicons.glyphMap; activeIcon: keyof typeof Ionicons.glyphMap }[] = [
  { name: 'index', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'browse', label: 'Browse', icon: 'library-outline', activeIcon: 'library' },
  { name: 'contribute', label: 'Submit', icon: 'add-circle-outline', activeIcon: 'add-circle' },
];

function GlassTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <View style={styles.barShadow}>
        <BlurView intensity={Platform.OS === 'ios' ? 40 : 24} tint="dark" style={styles.bar}>
          <View style={styles.barTint} />
          {state.routes.map((route, index) => {
            const tab = TABS.find((t) => t.name === route.name);
            if (!tab) return null;
            const focused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
            };
            return (
              <PressableScale key={route.key} onPress={onPress} to={0.9} haptic style={styles.item}>
                <Ionicons
                  name={focused ? tab.activeIcon : tab.icon}
                  size={23}
                  color={focused ? colors.gold : colors.onNavyFaint}
                />
                <Text
                  variant="overline"
                  weight={focused ? 'bold' : 'medium'}
                  color={focused ? colors.gold : colors.onNavyFaint}
                  numberOfLines={1}
                  style={{ marginTop: 3 }}
                >
                  {tab.label}
                </Text>
              </PressableScale>
            );
          })}
        </BlurView>
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <GlassTabBar {...props} />} screenOptions={{ headerShown: false }}>
      {TABS.map((t) => (
        <Tabs.Screen key={t.name} name={t.name} />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    backgroundColor: 'transparent',
  },
  barShadow: {
    borderRadius: radius.xl,
    ...shadow.raised,
  },
  bar: {
    flexDirection: 'row',
    borderRadius: radius.xl,
    overflow: 'hidden',
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.navyLine,
  },
  barTint: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10,25,48,0.72)',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 0,
  },
});
