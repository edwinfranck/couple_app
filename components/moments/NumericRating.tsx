import { useTheme } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NumericRatingProps {
    value: number;
    onChange: (rating: number) => void;
    color?: string;
    label: string;
    max?: number;
}

export const NumericRating: React.FC<NumericRatingProps> = ({
    value,
    onChange,
    color = '#4A90E2',
    label,
    max = 5,
}) => {
    const { colors, typography, spacing, borderRadius } = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[typography.body, { color: colors.text }]}>{label}</Text>
            </View>

            <View style={[styles.buttonsRow, { gap: spacing.sm, marginTop: spacing.sm }]}>
                {Array.from({ length: max }, (_, i) => i + 1).map((num) => (
                    <TouchableOpacity
                        key={num}
                        style={[
                            styles.button,
                            {
                                backgroundColor: num <= value ? color : colors.card,
                                borderRadius: borderRadius.sm,
                                flex: 1, // Take full available width
                                height: 44,
                                borderWidth: 1,
                                borderColor: num <= value ? color : colors.border,
                            },
                        ]}
                        onPress={() => onChange(num)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                typography.body,
                                {
                                    color: num <= value ? '#FFFFFF' : colors.text,
                                    fontWeight: num <= value ? '600' : '400',
                                },
                            ]}
                        >
                            {num}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        //elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
});
