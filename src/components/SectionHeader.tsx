import { View } from 'react-native';
import { Text } from './Text';
import { colors, spacing } from '@/theme';

interface Props {
  eyebrow?: string;
  title: string;
  onNavy?: boolean;
  right?: React.ReactNode;
}

/** Serif section title with a gold eyebrow — the archival header style. */
export function SectionHeader({ eyebrow, title, onNavy, right }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
        gap: spacing.md,
      }}
    >
      <View style={{ flex: 1 }}>
        {eyebrow && (
          <Text
            variant="overline"
            weight="bold"
            color={colors.gold}
            tracking={1.5}
            style={{ textTransform: 'uppercase', marginBottom: 4 }}
          >
            {eyebrow}
          </Text>
        )}
        <Text variant="heading" weight="serifBold" color={onNavy ? colors.onNavy : colors.ink}>
          {title}
        </Text>
      </View>
      {right}
    </View>
  );
}
