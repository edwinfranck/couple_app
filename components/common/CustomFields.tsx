import { useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CustomField {
    id: string;
    label: string;
    value: string;
}

interface CustomFieldsProps {
    fields: CustomField[];
    onFieldChange: (id: string, value: string) => void;
    onFieldLabelChange: (id: string, label: string) => void;
    onAddField: () => void;
    onRemoveField: (id: string) => void;
}

export const CustomFields: React.FC<CustomFieldsProps> = ({
    fields,
    onFieldChange,
    onFieldLabelChange,
    onAddField,
    onRemoveField,
}) => {
    const { colors, typography, spacing, borderRadius } = useTheme();

    return (
        <View>
            {fields.map((field) => (
                <View key={field.id} style={[styles.fieldContainer, { marginBottom: spacing.md }]}>
                    <TextInput
                        style={[
                            styles.labelInput,
                            typography.bodySmall,
                            {
                                backgroundColor: colors.card,
                                borderRadius: borderRadius.sm,
                                padding: spacing.sm,
                                borderWidth: 1,
                                borderColor: colors.border,
                                color: colors.text,
                                marginBottom: spacing.xs,
                            },
                        ]}
                        placeholder="Nom du champ (ex: Durée)"
                        placeholderTextColor={colors.textSecondary}
                        value={field.label}
                        onChangeText={(text) => onFieldLabelChange(field.id, text)}
                    />

                    <View style={styles.valueRow}>
                        <TextInput
                            style={[
                                styles.valueInput,
                                typography.body,
                                {
                                    backgroundColor: colors.card,
                                    borderRadius: borderRadius.sm,
                                    padding: spacing.sm,
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                    color: colors.text,
                                    flex: 1,
                                },
                            ]}
                            placeholder="Valeur"
                            placeholderTextColor={colors.textSecondary}
                            value={field.value}
                            onChangeText={(text) => onFieldChange(field.id, text)}
                        />

                        <TouchableOpacity
                            style={[
                                styles.removeButton,
                                {
                                    backgroundColor: colors.error,
                                    borderRadius: borderRadius.sm,
                                    padding: spacing.sm,
                                    marginLeft: spacing.sm,
                                },
                            ]}
                            onPress={() => onRemoveField(field.id)}
                        >
                            <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            <TouchableOpacity
                style={[
                    styles.addButton,
                    {
                        backgroundColor: colors.card,
                        borderRadius: borderRadius.md,
                        padding: spacing.md,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        borderStyle: 'dashed',
                    },
                ]}
                onPress={onAddField}
            >
                <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
                <Text style={[typography.body, { color: colors.primary, marginLeft: spacing.sm }]}>
                    Ajouter un champ personnalisé
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    fieldContainer: {
        // Container for each custom field
    },
    labelInput: {
        minHeight: 40,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    valueInput: {
        minHeight: 40,
    },
    removeButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
