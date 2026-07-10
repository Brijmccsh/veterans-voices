import { useState } from 'react';
import { View, Modal, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../Text';
import { PressableScale } from '../PressableScale';
import { colors, radius, spacing, shadow } from '@/theme';

interface Props {
  label: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  options: string[];
  disabled?: boolean;
  onSelect: (value: string) => void;
}

/** A tap-to-open option picker rendered in a bottom sheet modal. */
export function SelectField({ label, required, value, placeholder = 'Select…', options, disabled, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <View style={styles.labelRow}>
        <Text variant="bodySm" weight="bold" color={colors.ink}>
          {label}
        </Text>
        {required && (
          <Text variant="bodySm" weight="bold" color={colors.gold}>
            {' '}
            *
          </Text>
        )}
      </View>

      <PressableScale
        disabled={disabled}
        onPress={() => setOpen(true)}
        to={0.98}
        style={[styles.field, disabled && { opacity: 0.5 }]}
      >
        <Text variant="body" color={value ? colors.ink : colors.inkFaint} style={{ flex: 1 }} numberOfLines={1}>
          {value ?? placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.inkFaint} />
      </PressableScale>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
            <View style={styles.handle} />
            <Text variant="heading" weight="serifBold" style={{ marginBottom: spacing.md }}>
              {label}
            </Text>
            <ScrollView style={{ maxHeight: 360 }} showsVerticalScrollIndicator={false}>
              {options.map((opt) => {
                const active = opt === value;
                return (
                  <PressableScale
                    key={opt}
                    to={0.98}
                    onPress={() => {
                      onSelect(opt);
                      setOpen(false);
                    }}
                    style={[styles.option, active && styles.optionActive]}
                  >
                    <Text variant="body" weight={active ? 'bold' : 'regular'} color={active ? colors.navy : colors.ink} style={{ flex: 1 }}>
                      {opt}
                    </Text>
                    {active && <Ionicons name="checkmark-circle" size={20} color={colors.gold} />}
                  </PressableScale>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.creamRaised,
    borderWidth: 1,
    borderColor: colors.creamLine,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  backdrop: { flex: 1, backgroundColor: 'rgba(10,25,48,0.5)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    ...shadow.raised,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.creamLine,
    marginBottom: spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  optionActive: { backgroundColor: 'rgba(198,162,76,0.12)' },
});
