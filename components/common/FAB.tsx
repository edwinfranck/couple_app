import { useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface FABProps {
    onPress: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
}

export const FAB: React.FC<FABProps> = ({ onPress, icon = 'add' }) => {
    const { colors, spacing } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.fab,
                {
                    backgroundColor: colors.primary,
                    bottom: spacing.lg,
                    right: spacing.lg,
                },
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Ionicons name={icon} size={28} color="#FFFFFF" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});
