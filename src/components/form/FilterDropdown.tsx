import { useState } from 'react';
import { View, Modal, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../Text';
import { PressableScale } from '../PressableScale';
import { colors, radius, spacing, shadow } from '@/theme';

interface Props {
  /** label shown when nothing is selected, e.g. "All Conflicts" */
  allLabel: string;
  value?: string;
  options: readonly string[];
  onChange: (value: string | undefined) => void;
}

/** Compact pill dropdown for Browse filters, with an "All" reset option. */
export function FilterDropdown({ allLabel, value, options, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const active = !!value;

  return (
    <>
      <PressableScale onPress={() => setOpen(true)} to={0.98} style={[styles.pill, active && styles.pillActive]}>
        <Text variant="bodySm" weight="medium" color={active ? colors.navy : colors.inkSoft} numberOfLines={1} style={{ flex: 1 }}>
          {value ?? allLabel}
        </Text>
        <Ionicons name="chevron-down" size={16} color={active ? colors.navy : colors.inkFaint} />
      </PressableScale>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
            <View style={styles.handle} />
            <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
              <Row
                label={allLabel}
                active={!value}
                onPress={() => {
                  onChange(undefined);
                  setOpen(false);
                }}
              />
              {options.map((opt) => (
                <Row
                  key={opt}
                  label={opt}
                  active={opt === value}
                  onPress={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                />
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function Row({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <PressableScale to={0.98} onPress={onPress} style={[styles.option, active && styles.optionActive]}>
      <Text variant="body" weight={active ? 'bold' : 'regular'} color={active ? colors.navy : colors.ink} style={{ flex: 1 }}>
        {label}
      </Text>
      {active && <Ionicons name="checkmark-circle" size={20} color={colors.gold} />}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.creamRaised,
    borderWidth: 1,
    borderColor: colors.creamLine,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  pillActive: { borderColor: colors.gold, backgroundColor: 'rgba(198,162,76,0.10)' },
  backdrop: { flex: 1, backgroundColor: 'rgba(10,25,48,0.5)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    ...shadow.raised,
  },
  handle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: colors.creamLine, marginBottom: spacing.lg },
  option: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.md, borderRadius: radius.md },
  optionActive: { backgroundColor: 'rgba(198,162,76,0.12)' },
});
