import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Text } from '../Text';
import { colors, radius, spacing } from '@/theme';

interface Props extends TextInputProps {
  label: string;
  required?: boolean;
  hint?: string;
}

export function FormField({ label, required, hint, style, multiline, ...rest }: Props) {
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
      <TextInput
        {...rest}
        multiline={multiline}
        placeholderTextColor={colors.inkFaint}
        style={[styles.input, multiline && styles.multiline, style]}
      />
      {hint && (
        <Text variant="caption" color={colors.inkFaint} style={{ marginTop: 4 }}>
          {hint}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  input: {
    backgroundColor: colors.creamRaised,
    borderWidth: 1,
    borderColor: colors.creamLine,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: colors.ink,
  },
  multiline: { minHeight: 96, textAlignVertical: 'top', lineHeight: 23 },
});
