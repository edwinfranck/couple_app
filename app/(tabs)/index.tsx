import { FAB } from '@/components/common/FAB';
import { MomentCard } from '@/components/moments/MomentCard';
import { useTheme } from '@/constants/theme';
import { useMomentsStore } from '@/store/momentsStore';
import { router, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { colors, typography, spacing } = useTheme();
  const { moments, isLoading, loadMoments } = useMomentsStore();

  useEffect(() => {
    loadMoments();
  }, []);

  const handleAddMoment = () => {
    router.push('/add-moment');
  };

  const handleMomentPress = (id: number) => {
    router.push(`/moment/${id}`);
  };

  if (isLoading && moments.length === 0) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Moments',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />
      {moments.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[typography.h2, { color: colors.text, textAlign: 'center' }]}>
            Aucun moment enregistré
          </Text>
          <Text
            style={[
              typography.body,
              { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
            ]}
          >
            Appuyez sur le bouton + pour ajouter votre premier moment
          </Text>
        </View>
      ) : (
        <FlatList
          data={moments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MomentCard moment={item} onPress={() => handleMomentPress(item.id)} />
          )}
          contentContainerStyle={{ padding: spacing.md }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FAB onPress={handleAddMoment} />
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
});
