import { useTheme } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SuggestionChipsProps {
    suggestions: string[];
    selectedTags: string[];
    onToggle: (tag: string) => void;
    maxSelections?: number;
}

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({
    suggestions,
    selectedTags,
    onToggle,
    maxSelections,
}) => {
    const { colors, typography, spacing, borderRadius } = useTheme();

    const isSelected = (tag: string) => selectedTags.includes(tag);
    const canSelect = !maxSelections || selectedTags.length < maxSelections;

    const handlePress = (tag: string) => {
        if (isSelected(tag) || canSelect) {
            onToggle(tag);
        }
    };

    return (
        <View style={[styles.container, { gap: spacing.sm }]}>
            {suggestions.map((suggestion) => {
                const selected = isSelected(suggestion);
                return (
                    <TouchableOpacity
                        key={suggestion}
                        style={[
                            styles.chip,
                            {
                                backgroundColor: selected ? colors.primary : colors.card,
                                borderRadius: borderRadius.full,
                                paddingHorizontal: spacing.md,
                                paddingVertical: spacing.sm,
                                borderWidth: 1,
                                borderColor: selected ? colors.primary : colors.border,
                            },
                        ]}
                        onPress={() => handlePress(suggestion)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                typography.bodySmall,
                                {
                                    color: selected ? '#FFFFFF' : colors.text,
                                    fontWeight: selected ? '600' : '400',
                                },
                            ]}
                        >
                            {suggestion}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        marginBottom: 8,
    },
});
