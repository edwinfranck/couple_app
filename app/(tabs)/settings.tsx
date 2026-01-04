
import { useTheme } from '@/constants/theme';
import { useSettingsStore } from '@/store/settingsStore';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
    const { colors, typography, spacing, borderRadius } = useTheme();
    const { isDarkMode, toggleTheme } = useSettingsStore();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen
                options={{
                    title: 'Paramètres',
                    headerStyle: { backgroundColor: colors.background },
                    headerTintColor: colors.text,
                    headerShadowVisible: false,
                }}
            />
            <ScrollView
                style={[styles.container, { backgroundColor: colors.background }]}
                contentContainerStyle={{ padding: spacing.md }}
            >

                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: colors.card,
                            borderRadius: 16,
                            padding: 20,
                            marginBottom: spacing.md,
                        },
                    ]}
                >
                    <Text style={[typography.h2, { color: colors.text, marginBottom: spacing.md }]}>
                        Apparence
                    </Text>

                    <View style={styles.settingRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={[typography.body, { color: colors.text }]}>
                                Thème sombre
                            </Text>
                            <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 4 }]}>
                                {isDarkMode ? 'Activé' : 'Désactivé'}
                            </Text>
                        </View>
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleTheme}
                            trackColor={{ false: 'rgba(120,120,120,0.3)', true: colors.primary }}
                            thumbColor="#FFFFFF"
                        />
                    </View>
                </View>

                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: colors.card,
                            borderRadius: 16,
                            padding: 20,
                        },
                    ]}
                >
                    <Text style={[typography.h2, { color: colors.text, marginBottom: spacing.md }]}>
                        À propos
                    </Text>

                    <Text style={[typography.body, { color: colors.textSecondary, lineHeight: 24 }]}>
                        <Text style={{ fontWeight: '600', color: colors.text }}>Moments</Text> est une
                        application simple et privée pour documenter vos expériences marquantes.
                    </Text>

                    <Text
                        style={[
                            typography.bodySmall,
                            { color: colors.textSecondary, marginTop: spacing.md },
                        ]}
                    >
                        Version 1.0.0
                    </Text>

                    <Text
                        style={[
                            typography.caption,
                            { color: colors.textSecondary, marginTop: spacing.sm },
                        ]}
                    >
                        100% gratuit • 100% offline • 100% privé
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        // Flat styling handles dark/light transition better simply by color
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
