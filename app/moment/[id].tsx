import { Button } from '@/components/common/Button';
import { StarRating } from '@/components/moments/StarRating';
import { useTheme } from '@/constants/theme';
import { Moment } from '@/services/database';
import { useMomentsStore } from '@/store/momentsStore';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function MomentDetailScreen() {
    const { colors, typography, spacing, borderRadius } = useTheme();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { getMomentById, deleteMoment } = useMomentsStore();
    const [moment, setMoment] = useState<Moment | undefined>();

    useEffect(() => {
        if (id) {
            const foundMoment = getMomentById(parseInt(id));
            setMoment(foundMoment);
        }
    }, [id]);

    const handleDelete = () => {
        Alert.alert(
            'Supprimer ce moment ?',
            'Cette action est irréversible.',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: async () => {
                        if (moment) {
                            await deleteMoment(moment.id);
                            router.back();
                        }
                    },
                },
            ]
        );
    };

    if (!moment) {
        return (
            <View style={[styles.centered, { backgroundColor: colors.background }]}>
                <Text style={[typography.body, { color: colors.textSecondary }]}>
                    Moment introuvable
                </Text>
            </View>
        );
    }

    const formattedDate = format(new Date(moment.date), 'EEEE dd MMMM yyyy', { locale: fr });

    // Parse tags safely
    let topTags: string[] = [];
    let flopTags: string[] = [];
    try {
        topTags = JSON.parse(moment.topTags || '[]');
        flopTags = JSON.parse(moment.flopTags || '[]');
    } catch (e) {
        console.error("Error parsing tags", e);
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen
                options={{
                    title: 'Détails',
                    headerStyle: { backgroundColor: colors.background },
                    headerTintColor: colors.text,
                    headerShadowVisible: false,
                }}
            />
            <ScrollView
                contentContainerStyle={{ padding: spacing.md }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Card */}
                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: colors.card,
                            borderRadius: 20,
                            padding: 20,
                            marginBottom: spacing.md,
                        },
                    ]}
                >
                    <View style={styles.headerRow}>
                        <Ionicons name="location" size={20} color={colors.primary} />
                        <Text style={[typography.h2, { color: colors.text, marginLeft: spacing.sm, flex: 1 }]}>
                            {moment.location}
                        </Text>
                    </View>

                    <Text
                        style={[
                            typography.body,
                            { color: colors.textSecondary, marginTop: 4, marginBottom: 12, marginLeft: 28 },
                        ]}
                    >
                        {formattedDate}
                    </Text>

                    <View style={[styles.companionRow, { marginLeft: 28 }]}>
                        <Ionicons name="person-circle-outline" size={18} color={colors.textSecondary} />
                        <Text
                            style={[
                                typography.body,
                                { color: colors.textSecondary, marginLeft: spacing.xs },
                            ]}
                        >
                            Avec {moment.companion}
                        </Text>
                    </View>
                </View>

                {/* Ratings Card */}
                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: colors.card,
                            borderRadius: 20,
                            padding: 20,
                            marginBottom: spacing.md,
                        },
                    ]}
                >
                    <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.lg }]}>
                        Évaluation
                    </Text>

                    <View style={styles.ratingRow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="sparkles-outline" size={18} color="#FFD700" style={{ marginRight: 8 }} />
                            <Text style={[typography.body, { color: colors.textSecondary }]}>Plaisir</Text>
                        </View>
                        <StarRating value={moment.pleasureRating} readonly size={24} />
                    </View>

                    <View style={styles.ratingRow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="bed-outline" size={18} color="#4CAF50" style={{ marginRight: 8 }} />
                            <Text style={[typography.body, { color: colors.textSecondary }]}>Confort</Text>
                        </View>
                        <StarRating value={moment.comfortRating} readonly size={24} />
                    </View>

                    <View style={styles.ratingRow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="flame-outline" size={18} color="#FF5722" style={{ marginRight: 8 }} />
                            <Text style={[typography.body, { color: colors.textSecondary }]}>Audace</Text>
                        </View>
                        <StarRating value={moment.audacityRating} readonly size={24} />
                    </View>
                </View>

                {/* Tags Cards */}
                {topTags.length > 0 && (
                    <View
                        style={[
                            styles.card,
                            {
                                backgroundColor: colors.card,
                                borderRadius: 20,
                                padding: 20,
                                marginBottom: spacing.md,
                            },
                        ]}
                    >
                        <Text style={[typography.h3, { color: colors.text, marginBottom: 12 }]}>
                            ✨ Ce qui était top
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                            {topTags.map(tag => (
                                <View key={tag} style={[styles.tag, { borderColor: colors.primary, backgroundColor: colors.primary + '10' }]}>
                                    <Text style={[typography.caption, { color: colors.primary }]}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {flopTags.length > 0 && (
                    <View
                        style={[
                            styles.card,
                            {
                                backgroundColor: colors.card,
                                borderRadius: 20,
                                padding: 20,
                                marginBottom: spacing.md,
                            },
                        ]}
                    >
                        <Text style={[typography.h3, { color: colors.text, marginBottom: 12 }]}>
                            💭 Ce qui était flop
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                            {flopTags.map(tag => (
                                <View key={tag} style={[styles.tag, { borderColor: colors.textSecondary, borderWidth: 1 }]}>
                                    <Text style={[typography.caption, { color: colors.textSecondary }]}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Personal Notes */}
                {moment.personalNotes && (
                    <View
                        style={[
                            styles.card,
                            {
                                backgroundColor: colors.card,
                                borderRadius: 20,
                                padding: 20,
                                marginBottom: spacing.md,
                            },
                        ]}
                    >
                        <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.sm }]}>
                            � Notes
                        </Text>
                        <Text style={[typography.body, { color: colors.text }]}>
                            {moment.personalNotes}
                        </Text>
                    </View>
                )}

                {/* Action Button */}
                <Button
                    title="Supprimer ce moment"
                    onPress={handleDelete}
                    variant="outline"
                    style={{
                        marginTop: spacing.md,
                        borderColor: colors.error,
                        backgroundColor: colors.error,
                        borderRadius: 20
                    }}
                    textColor="#FFFFFF"
                />
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
    },
    card: {
        // Flat style generally looks better in dark mode, elevation in light
        //elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    companionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
    }
});
