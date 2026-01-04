import { useTheme } from '@/constants/theme';
import { Moment } from '@/services/database';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StarRating } from './StarRating';

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
    const { colors, typography, spacing, borderRadius } = useTheme();

    const formattedDate = format(new Date(moment.date), 'dd MMM yyyy', { locale: fr });
    const icon = LOCATION_ICONS[moment.location] || 'location';

    return (
        <TouchableOpacity
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 12,
                },
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.header}>
                <View style={styles.locationContainer}>
                    <Ionicons name={icon} size={24} color={colors.primary} />
                    <View style={{ marginLeft: 12 }}>
                        <Text style={[typography.h3, { color: colors.text }]}>{moment.location}</Text>
                        <Text style={[typography.caption, { color: colors.textSecondary }]}>
                            Avec {moment.companion}
                        </Text>
                    </View>
                </View>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                    {formattedDate}
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.ratingsContainer}>
                <View style={styles.ratingItem}>
                    <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: 4 }]}>Plaisir</Text>
                    <StarRating value={moment.pleasureRating} readonly size={16} />
                </View>
                <View style={styles.ratingItem}>
                    <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: 4 }]}>Confort</Text>
                    <StarRating value={moment.comfortRating} readonly size={16} />
                </View>
                <View style={styles.ratingItem}>
                    <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: 4 }]}>Audace</Text>
                    <StarRating value={moment.audacityRating} readonly size={16} />
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        // Shadow will be handled by theme usually, but adding default elevation for light mode
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(150,150,150,0.1)',
        marginVertical: 12,
    },
    ratingsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingItem: {
        alignItems: 'center',
    },
});
