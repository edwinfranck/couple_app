import { useTheme } from '@/constants/theme';
import { database } from '@/services/database';
import { Stack, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

const StatBar = ({ label, value, color, max = 5 }: { label: string, value: number, color: string, max?: number }) => {
    const { colors, typography, borderRadius } = useTheme();
    const percentage = (value / max) * 100;

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={[typography.body, { color: colors.textSecondary }]}>{label}</Text>
                <Text style={[typography.h3, { color: colors.text, fontSize: 16 }]}>{value.toFixed(1)} <Text style={{ fontSize: 12, color: colors.textSecondary }}>/ {max}</Text></Text>
            </View>
            <View style={{ height: 8, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' }}>
                <View style={{ height: '100%', width: `${percentage}%`, backgroundColor: color, borderRadius: 4 }} />
            </View>
        </View>
    );
};

export default function StatsScreen() {
    const { colors, typography, spacing, borderRadius, isDark } = useTheme();
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            loadStats();
        }, [])
    );

    const loadStats = async () => {
        // Only set loading on first load to avoid flicker
        if (!stats) setIsLoading(true);
        try {
            const data = await database.getStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={[styles.centered, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!stats || stats.total === 0) {
        return (
            <View style={[styles.centered, { backgroundColor: colors.background }]}>
                <Stack.Screen
                    options={{
                        title: 'Statistiques',
                        headerStyle: { backgroundColor: colors.background },
                        headerTintColor: colors.text,
                        headerShadowVisible: false,
                    }}
                />
                <Text style={[typography.h2, { color: colors.text, textAlign: 'center' }]}>
                    Aucune statistique
                </Text>
                <Text
                    style={[
                        typography.body,
                        { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
                    ]}
                >
                    Ajoutez des moments pour voir vos statistiques
                </Text>
            </View>
        );
    }

    return (
        <View
            key={isDark ? 'dark' : 'light'}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <Stack.Screen
                options={{
                    title: 'Statistiques',
                    headerStyle: { backgroundColor: colors.background },
                    headerTintColor: colors.text,
                    headerShadowVisible: false,
                }}
            />
            <ScrollView
                style={[styles.container, { backgroundColor: colors.background }]}
                contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >

                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: colors.card,
                            borderRadius: 16,
                            padding: 24,
                            marginBottom: spacing.md,
                        },
                    ]}
                >
                    <Text style={[typography.h2, { color: colors.text, marginBottom: spacing.lg }]}>
                        Vue d'ensemble
                    </Text>

                    <View style={[styles.statRow, { marginBottom: 24 }]}>
                        <View>
                            <Text style={[typography.body, { color: colors.textSecondary }]}>
                                Total de moments
                            </Text>
                            <Text style={[typography.h1, { color: colors.primary, fontSize: 36, marginTop: 4 }]}>
                                {stats.total}
                            </Text>
                        </View>
                        {/* Maybe add a small chart icon or visual later if needed */}
                    </View>

                    <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(150,150,150,0.1)' : 'rgba(0,0,0,0.05)', marginBottom: 24 }]} />

                    <StatBar
                        label="Plaisir"
                        value={stats.avgPleasure}
                        color="#FFD700"
                    />
                    <StatBar
                        label="Confort"
                        value={stats.avgComfort}
                        color="#4CAF50"
                    />
                    <StatBar
                        label="Audace"
                        value={stats.avgAudacity}
                        color="#FF5722"
                    />
                </View>

                {stats.topLocations.length > 0 && (
                    <View
                        style={[
                            styles.card,
                            {
                                backgroundColor: colors.card,
                                borderRadius: 16,
                                padding: 24,
                            },
                        ]}
                    >
                        <Text style={[typography.h2, { color: colors.text, marginBottom: spacing.lg }]}>
                            Top 3 lieux
                        </Text>

                        {stats.topLocations.map((loc: any, index: number) => (
                            <View key={loc.location} style={styles.locationRow}>
                                <View style={[styles.locationRank, {
                                    backgroundColor: index === 0 ? colors.primary : colors.background,
                                    borderColor: isDark ? 'rgba(150,150,150,0.1)' : 'rgba(0,0,0,0.05)'
                                }]}>
                                    <Text style={[typography.h3, { color: index === 0 ? '#FFFFFF' : colors.primary }]}>
                                        {index + 1}
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[typography.body, { color: colors.text, fontWeight: '600' }]}>
                                        {loc.location}
                                    </Text>
                                    <View style={{ height: 4, backgroundColor: colors.border, borderRadius: 2, marginTop: 8, width: '100%' }}>
                                        {/* Simple relative bar for location frequency - assuming max is total moments or largest location count */}
                                        <View style={{ height: '100%', width: `${(loc.count / stats.total) * 100}%`, backgroundColor: colors.primary, borderRadius: 2 }} />
                                    </View>
                                </View>
                                <View style={{ marginLeft: 12, alignItems: 'flex-end' }}>
                                    <Text style={[typography.h3, { color: colors.text }]}>
                                        {loc.count}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    card: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    divider: {
        height: 1,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    locationRank: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1,
    }
});
