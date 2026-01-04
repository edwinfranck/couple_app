import { useTheme } from '@/constants/theme';
import { database } from '@/services/database';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

const StatBar = ({ label, value, color, max = 5, icon }: { label: string, value: number, color: string, max?: number, icon: keyof typeof Ionicons.glyphMap }) => {
    const { colors, typography } = useTheme();
    const percentage = (value / max) * 100;

    return (
        <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{
                    width: 32, height: 32, borderRadius: 10,
                    backgroundColor: color + '20', alignItems: 'center', justifyContent: 'center', marginRight: 12
                }}>
                    <Ionicons name={icon} size={18} color={color} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[typography.body, { color: colors.text, fontWeight: '500' }]}>{label}</Text>
                    <Text style={[typography.h3, { color: colors.text, fontSize: 16 }]}>{value.toFixed(1)} <Text style={{ fontSize: 12, color: colors.textSecondary }}>/ {max}</Text></Text>
                </View>
            </View>
            <View style={{ height: 10, backgroundColor: colors.border, borderRadius: 5, overflow: 'hidden' }}>
                <View style={{ height: '100%', width: `${percentage}%`, backgroundColor: color, borderRadius: 5 }} />
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
                <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <Ionicons name="stats-chart" size={40} color={colors.textSecondary} />
                </View>
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
                            borderRadius: 24,
                            padding: 24,
                            marginBottom: spacing.md,
                            borderWidth: 1,
                            borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                        },
                    ]}
                >
                    <Text style={[typography.h2, { color: colors.text, marginBottom: spacing.lg }]}>
                        Vue d'ensemble
                    </Text>

                    <View style={[styles.statRow, { marginBottom: 32 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{
                                width: 48, height: 48, borderRadius: 16,
                                backgroundColor: colors.primary + '15', alignItems: 'center', justifyContent: 'center', marginRight: 16
                            }}>
                                <Ionicons name="images" size={24} color={colors.primary} />
                            </View>
                            <View>
                                <Text style={[typography.body, { color: colors.textSecondary }]}>
                                    Moments capturés
                                </Text>
                                <Text style={[typography.h1, { color: colors.text, fontSize: 32, marginTop: 2 }]}>
                                    {stats.total}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <StatBar
                        label="Plaisir"
                        value={stats.avgPleasure}
                        color="#FFD700"
                        icon="sparkles"
                    />
                    <StatBar
                        label="Confort"
                        value={stats.avgComfort}
                        color="#4CAF50"
                        icon="bed"
                    />
                    <StatBar
                        label="Audace"
                        value={stats.avgAudacity}
                        color="#FF5722"
                        icon="flame"
                    />
                </View>

                {stats.topLocations.length > 0 && (
                    <View
                        style={[
                            styles.card,
                            {
                                backgroundColor: colors.card,
                                borderRadius: 24,
                                padding: 24,
                                borderWidth: 1,
                                borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                            },
                        ]}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                            <Ionicons name="trophy" size={24} color="#FFD700" style={{ marginRight: 12 }} />
                            <Text style={[typography.h2, { color: colors.text }]}>
                                Lieux favoris
                            </Text>
                        </View>

                        {stats.topLocations.map((loc: any, index: number) => (
                            <View key={loc.location} style={styles.locationRow}>
                                <View style={[styles.locationRank, {
                                    backgroundColor: index === 0 ? colors.primary : colors.background,
                                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                                }]}>
                                    <Text style={[typography.h3, { color: index === 0 ? '#FFFFFF' : colors.primary, fontSize: 16 }]}>
                                        #{index + 1}
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <Text style={[typography.body, { color: colors.text, fontWeight: '600' }]}>
                                            {loc.location}
                                        </Text>
                                        <Text style={[typography.h3, { color: colors.textSecondary, fontSize: 14 }]}>
                                            {loc.count}
                                        </Text>
                                    </View>

                                    <View style={{ height: 6, backgroundColor: colors.border, borderRadius: 3, width: '100%' }}>
                                        <View style={{ height: '100%', width: `${(loc.count / stats.total) * 100}%`, backgroundColor: colors.primary, borderRadius: 3 }} />
                                    </View>
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
        //elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    locationRank: {
        width: 40,
        height: 40,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1,
    }
});
