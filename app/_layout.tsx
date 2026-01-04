import { database } from '@/services/database';
import { useMomentsStore } from '@/store/momentsStore';
import { useSettingsStore } from '@/store/settingsStore';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const { theme, loadSettings } = useSettingsStore();

  useEffect(() => {
    // Initialize database and settings
    const init = async () => {
      await database.init();
      await loadSettings();
      // Safely try to load moments
      try {
        if (useMomentsStore && useMomentsStore.getState) {
          await useMomentsStore.getState().loadMoments();
        }
      } catch (e) {
        console.warn('Failed to load moments on init:', e);
      }
    };
    init();
  }, []);

  const colorScheme = theme || systemColorScheme;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-moment"
          options={{
            presentation: 'modal',
            title: 'Nouveau moment',
            headerTitleAlign: 'left',
          }}
        />
        <Stack.Screen
          name="moment/[id]"
          options={{
            title: 'Détails',
            headerTitleAlign: 'left',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

