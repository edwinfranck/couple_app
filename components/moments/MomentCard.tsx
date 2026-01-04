import { useTheme } from '@/constants/theme';
import { Moment } from '@/services/database';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MomentCardProps {
    moment: Moment;
    onPress: () => void;
}

const LOCATION_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
    'Chez moi': 'home',
    'Hôtel': 'bed',
    'Extérieur': 'leaf',
    'Voiture': 'car',
    'Restaurant': 'restaurant',
    'Autre': 'location',
};

export const MomentCard: React.FC<MomentCardProps> = ({ moment, onPress }) => {
    const { colors, typography, spacing, borderRadius, isDark } = useTheme();

    const formattedDate = format(new Date(moment.date), 'dd MMM yyyy', { locale: fr });
    const icon = LOCATION_ICONS[moment.location] || 'location';

    // Parse tags to show a preview
    let topTags: string[] = [];
    try {
        topTags = JSON.parse(moment.topTags || '[]');
    } catch (e) { }

    // Take only first 2 tags
    const previewTags = topTags.slice(0, 2);
    const hasMoreTags = topTags.length > 2;

    return (
        <TouchableOpacity
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderRadius: 20, // More rounded
                    padding: 20,
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' // Subtle border
                },
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.header}>
                <View style={styles.locationContainer}>
                    <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : colors.primary + '10' }]}>
                        <Ionicons name={icon} size={20} color={colors.primary} />
                    </View>
                    <View style={{ marginLeft: 12, flex: 1 }}>
                        <Text style={[typography.h3, { color: colors.text }]}>{moment.location}</Text>
                        <Text style={[typography.caption, { color: colors.textSecondary }]}>
                            {formattedDate} • Avec {moment.companion}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Tags preview */}
            {previewTags.length > 0 && (
                <View style={{ flexDirection: 'row', marginTop: 12, flexWrap: 'wrap', gap: 8 }}>
                    {previewTags.map(tag => (
                        <View key={tag} style={[styles.miniTag, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30' }]}>
                            <Text style={[typography.caption, { color: colors.primary, fontSize: 11, fontWeight: '600' }]}>{tag}</Text>
                        </View>
                    ))}
                    {hasMoreTags && (
                        <View style={[styles.miniTag, { backgroundColor: isDark ? '#333' : '#f0f0f0', borderColor: 'transparent' }]}>
                            <Text style={[typography.caption, { color: colors.textSecondary, fontSize: 11 }]}>+{topTags.length - 2}</Text>
                        </View>
                    )}
                </View>
            )}

            <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]} />

            <View style={styles.ratingsContainer}>
                <View style={styles.ratingItem}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                        <Ionicons name="sparkles" size={12} color="#FFD700" style={{ marginRight: 4 }} />
                        <Text style={[typography.caption, { color: colors.textSecondary }]}>Plaisir</Text>
                    </View>
                    <Text style={[typography.h3, { color: colors.text, fontSize: 16 }]}>{moment.pleasureRating}</Text>
                </View>

                <View style={[styles.verticalDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]} />

                <View style={styles.ratingItem}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                        <Ionicons name="bed" size={12} color="#4CAF50" style={{ marginRight: 4 }} />
                        <Text style={[typography.caption, { color: colors.textSecondary }]}>Confort</Text>
                    </View>
                    <Text style={[typography.h3, { color: colors.text, fontSize: 16 }]}>{moment.comfortRating}</Text>
                </View>

                <View style={[styles.verticalDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]} />

                <View style={styles.ratingItem}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                        <Ionicons name="flame" size={12} color="#FF5722" style={{ marginRight: 4 }} />
                        <Text style={[typography.caption, { color: colors.textSecondary }]}>Audace</Text>
                    </View>
                    <Text style={[typography.h3, { color: colors.text, fontSize: 16 }]}>{moment.audacityRating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        //elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    miniTag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
    },
    divider: {
        height: 1,
        marginVertical: 16,
    },
    ratingsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingItem: {
        alignItems: 'center',
        flex: 1,
    },
    verticalDivider: {
        width: 1,
        height: 24,
    }
});
