import { useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StarRatingProps {
    value: number;
    onChange?: (rating: number) => void;
    label?: string;
    icon?: string; // Icon name from Ionicons
    iconColor?: string;
    readonly?: boolean;
    size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
    value,
    onChange,
    label,
    icon,
    iconColor,
    readonly = false,
    size = 32,
}) => {
    const { colors, typography, spacing } = useTheme();

    const handlePress = (rating: number) => {
        if (!readonly && onChange) {
            onChange(rating);
        }
    };

    return (
        <View style={styles.container}>
            {(label || icon) && (
                <View style={[styles.labelContainer, { marginRight: readonly ? 0 : spacing.md }]}>
                    {icon && (
                        <Ionicons
                            name={icon as any}
                            size={20}
                            color={iconColor || colors.primary}
                            style={{ marginRight: spacing.sm }}
                        />
                    )}
                    {label && <Text style={[typography.body, { color: colors.text }]}>{label}</Text>}
                </View>
            )}

            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                        key={star}
                        onPress={() => handlePress(star)}
                        disabled={readonly}
                        activeOpacity={0.7}
                        style={{ paddingHorizontal: readonly ? 1 : 4 }}
                    >
                        <Ionicons
                            name={star <= value ? 'star' : 'star-outline'}
                            size={size}
                            color="#FFA000" // Amber/Gold
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Ensures label is left, stars right
        marginBottom: 16,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
