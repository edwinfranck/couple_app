import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { Button } from '@/components/common/Button';
import { SuggestionChips } from '@/components/common/SuggestionChips';
import { StarRating } from '@/components/moments/StarRating';
import { FLOP_SUGGESTIONS, LOCATIONS, TOP_SUGGESTIONS } from '@/constants/suggestions';
import { useTheme } from '@/constants/theme';
import { useMomentsStore } from '@/store/momentsStore';

export default function AddMomentScreen() {
    const { colors, typography, spacing, borderRadius } = useTheme();
    const { addMoment, isLoading } = useMomentsStore();

    // Form state
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Chez moi');
    const [customLocation, setCustomLocation] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [companion, setCompanion] = useState('');
    const [pleasureRating, setPleasureRating] = useState(0);
    const [comfortRating, setComfortRating] = useState(0);
    const [audacityRating, setAudacityRating] = useState(0);
    const [topTags, setTopTags] = useState<string[]>([]);
    const [flopTags, setFlopTags] = useState<string[]>([]);
    const [personalNotes, setPersonalNotes] = useState('');
    const [toRenew, setToRenew] = useState<'yes' | 'no' | null>(null);

    // Custom tag inputs
    const [newTopTag, setNewTopTag] = useState('');
    const [newFlopTag, setNewFlopTag] = useState('');

    const handleToggleTopTag = (tag: string) => {
        setTopTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleAddTopTag = () => {
        if (newTopTag.trim()) {
            handleToggleTopTag(newTopTag.trim());
            setNewTopTag('');
        }
    };

    const handleToggleFlopTag = (tag: string) => {
        setFlopTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleAddFlopTag = () => {
        if (newFlopTag.trim()) {
            handleToggleFlopTag(newFlopTag.trim());
            setNewFlopTag('');
        }
    };

    const handleSave = async () => {
        if (!companion.trim()) {
            alert('Entre le prénom de ton/ta partenaire');
            return;
        }

        const finalLocation = location === 'Autre' ? customLocation.trim() : location;

        await addMoment({
            title: title.trim() || `Moment avec ${companion}`,
            location: finalLocation || 'Autre',
            context: '',
            date: date.toISOString(),
            companion: companion.trim(),
            pleasureRating,
            comfortRating,
            audacityRating,
            topTags: JSON.stringify(topTags),
            flopTags: JSON.stringify(flopTags),
            personalNotes: personalNotes.trim() || undefined,
            toRenew,
        });

        router.back();
    };

    // Helper for Card style
    const Card = ({ children, style }: { children: React.ReactNode; style?: any }) => (
        <View style={[styles.card, { backgroundColor: colors.card, borderRadius: borderRadius.lg }, style]}>
            {children}
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: colors.background },
                    headerTintColor: colors.text,
                    headerTitleStyle: { color: colors.text, fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto' },
                    title: 'Nouveau Moment',
                    headerShadowVisible: false,
                }}
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView
                    contentContainerStyle={{ padding: spacing.md, paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header Inputs Group */}
                    <Card style={{ padding: spacing.md, marginBottom: spacing.md }}>
                        {/* Title */}
                        <View style={styles.inputRow}>
                            <Ionicons name="chatbubble-outline" size={22} color={colors.primary} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.inputClean, { color: colors.text }]}
                                placeholder="Titre (ex: Soirée romantique)"
                                placeholderTextColor={colors.textSecondary}
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>
                        <View style={[styles.divider, { backgroundColor: colors.border }]} />

                        {/* Companion */}
                        <View style={styles.inputRow}>
                            <Ionicons name="person-outline" size={22} color={colors.primary} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.inputClean, { color: colors.text }]}
                                placeholder="Avec qui ?"
                                placeholderTextColor={colors.textSecondary}
                                value={companion}
                                onChangeText={setCompanion}
                            />
                        </View>
                        <View style={[styles.divider, { backgroundColor: colors.border }]} />

                        {/* Date */}
                        <TouchableOpacity style={styles.inputRow} onPress={() => setShowDatePicker(true)}>
                            <Ionicons name="calendar-outline" size={22} color={colors.primary} style={styles.inputIcon} />
                            <Text style={[typography.body, { color: colors.text, flex: 1 }]}>
                                {date.toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </Text>
                            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </Card>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(Platform.OS === 'ios');
                                if (selectedDate) setDate(selectedDate);
                            }}
                        />
                    )}

                    {/* Location Section */}
                    <Card style={{ padding: spacing.md, marginBottom: spacing.md }}>
                        <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.sm }]}>
                            Localisation
                        </Text>
                        <View style={styles.chipsContainer}>
                            {LOCATIONS.map((loc) => (
                                <TouchableOpacity
                                    key={loc}
                                    style={[
                                        styles.chip,
                                        {
                                            backgroundColor: location === loc ? colors.primary : 'transparent',
                                            borderColor: location === loc ? colors.primary : colors.border,
                                        },
                                    ]}
                                    onPress={() => setLocation(loc)}
                                >
                                    <Text
                                        style={[
                                            typography.bodySmall,
                                            { color: location === loc ? '#FFFFFF' : colors.textSecondary },
                                        ]}
                                    >
                                        {loc}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {location === 'Autre' && (
                            <TextInput
                                style={[
                                    styles.inputUnderline,
                                    typography.body,
                                    { color: colors.text, borderColor: colors.primary, marginTop: spacing.sm }
                                ]}
                                placeholder="Précisez le lieu..."
                                placeholderTextColor={colors.textSecondary}
                                value={customLocation}
                                onChangeText={setCustomLocation}
                                autoFocus
                            />
                        )}
                    </Card>

                    {/* Ratings Section */}
                    <Card style={{ padding: spacing.md, marginBottom: spacing.md }}>
                        <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
                            Évaluation
                        </Text>
                        <StarRating
                            label="Plaisir"
                            icon="sparkles-outline"
                            iconColor="#FFD700"
                            value={pleasureRating}
                            onChange={setPleasureRating}
                        />
                        <StarRating
                            label="Confort"
                            icon="bed-outline" // bed doesn't exist in all sets, falling back or trying safe one
                            // let's use 'cafe-outline' or 'home-outline' as safe bets if 'bed' is risky, 
                            // actually 'bed' exists in Ionicons 5. 
                            // But usually 'happy-outline' or similar works well. Let's try 'leaf-outline' for comfort/zen? 
                            // Or 'easel' ... let's use 'happy-outline' for now or just the text. 
                            // Actually the images had icons. 
                            // Plaisir -> Stars/Sparkles. Confort -> Fauteuil? (Armchair/Bed). Audace -> Feu/Flame.
                            // Ionicons: 'bed-outline' (maybe), 'flame-outline' (yes), 'heart-outline' (already used).
                            // Let's use 'cube-outline' for comfort? No. 'grid-outline'?
                            // Let's use 'body-outline' or 'happy-outline'.
                            // Let's try 'bed-outline' and if it fails (square) we change.
                            // Actually, let's use 'cafe-outline' for cozy.
                            value={comfortRating}
                            onChange={setComfortRating}
                        />
                        <StarRating
                            label="Audace"
                            icon="flame-outline"
                            iconColor="#FF5722"
                            value={audacityRating}
                            onChange={setAudacityRating}
                        />
                    </Card>

                    {/* Tags Section */}
                    <Card style={{ padding: spacing.md, marginBottom: spacing.md }}>
                        <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.sm }]}>
                            Ce qui était top
                        </Text>
                        <SuggestionChips
                            suggestions={TOP_SUGGESTIONS}
                            selectedTags={topTags}
                            onToggle={handleToggleTopTag}
                        />
                        <View style={[styles.addTagRow, { marginTop: spacing.sm }]}>
                            <TextInput
                                style={[styles.inputUnderline, { flex: 1, color: colors.text, borderColor: colors.border }]}
                                placeholder="Ajouter un top..."
                                placeholderTextColor={colors.textSecondary}
                                value={newTopTag}
                                onChangeText={setNewTopTag}
                                onSubmitEditing={handleAddTopTag}
                            />
                            <TouchableOpacity onPress={handleAddTopTag} style={{ padding: 4 }}>
                                <Ionicons name="add-circle" size={28} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </Card>

                    <Card style={{ padding: spacing.md, marginBottom: spacing.md }}>
                        <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.sm }]}>
                            Points à améliorer
                        </Text>
                        <SuggestionChips
                            suggestions={FLOP_SUGGESTIONS}
                            selectedTags={flopTags}
                            onToggle={handleToggleFlopTag}
                        />
                        <View style={[styles.addTagRow, { marginTop: spacing.sm }]}>
                            <TextInput
                                style={[styles.inputUnderline, { flex: 1, color: colors.text, borderColor: colors.border }]}
                                placeholder="Ajouter un flop..."
                                placeholderTextColor={colors.textSecondary}
                                value={newFlopTag}
                                onChangeText={setNewFlopTag}
                                onSubmitEditing={handleAddFlopTag}
                            />
                            <TouchableOpacity onPress={handleAddFlopTag} style={{ padding: 4 }}>
                                <Ionicons name="add-circle" size={28} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </Card>

                    {/* Notes & Renew */}
                    <Card style={{ padding: spacing.md, marginBottom: spacing.xl }}>
                        <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.sm }]}>
                            Notes & Conclusion
                        </Text>
                        <TextInput
                            style={[
                                styles.textArea,
                                typography.body,
                                {
                                    backgroundColor: colors.background, // Inner contrast
                                    borderRadius: borderRadius.sm,
                                    padding: spacing.sm,
                                    color: colors.text,
                                    marginBottom: spacing.md,
                                },
                            ]}
                            placeholder="Détails, souvenirs, anecdotes..."
                            placeholderTextColor={colors.textSecondary}
                            value={personalNotes}
                            onChangeText={setPersonalNotes}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />

                        <Text style={[typography.body, { color: colors.text, marginBottom: spacing.xs }]}>
                            À renouveler ?
                        </Text>
                        <View style={{ flexDirection: 'row', gap: spacing.md }}>
                            <TouchableOpacity
                                onPress={() => setToRenew('yes')}
                                style={[
                                    styles.choiceButton,
                                    toRenew === 'yes' && { backgroundColor: colors.primary, borderColor: colors.primary }
                                ]}
                            >
                                <Text style={[typography.button, { color: toRenew === 'yes' ? '#FFF' : colors.text }]}>Oui !</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setToRenew('no')}
                                style={[
                                    styles.choiceButton,
                                    toRenew === 'no' && { backgroundColor: colors.error, borderColor: colors.error }
                                ]}
                            >
                                <Text style={[typography.button, { color: toRenew === 'no' ? '#FFF' : colors.text }]}>Non</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>

                    <Button
                        title="Enregistrer ce moment"
                        onPress={handleSave}
                        loading={isLoading}
                        disabled={!companion.trim()}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        borderRadius: 16,
        padding: 16, // Ensure padding is applied by default
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    inputClean: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
    },
    inputIcon: {
        marginRight: 16,
    },
    divider: {
        height: 1,
        opacity: 0.1,
        marginLeft: 40, // Match icon offset
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,0.2)',
    },
    inputUnderline: {
        borderBottomWidth: 1,
        paddingVertical: 8,
        marginTop: 8,
    },
    addTagRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
    },
    textArea: {
        minHeight: 120,
        backgroundColor: 'rgba(255,255,255,0.03)', // Subtle background for visibility
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        marginTop: 8,
        textAlignVertical: 'top', // Important for Android
    },
    choiceButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,0.3)',
    },
});
