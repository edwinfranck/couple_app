import { database } from '@/services/database';
import { useMomentsStore } from '@/store/momentsStore';
import { useSettingsStore } from '@/store/settingsStore';
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  useFonts,
} from '@expo-google-fonts/outfit';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const { isDarkMode, loadSettings } = useSettingsStore();
  const [appIsReady, setAppIsReady] = React.useState(false);

  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  useEffect(() => {
    const init = async () => {
      try {
        await database.init();
        await loadSettings();
        if (useMomentsStore && useMomentsStore.getState) {
          await useMomentsStore.getState().loadMoments();
        }
      } catch (e) {
        console.warn('Initialization failed:', e);
      } finally {
        setAppIsReady(true);
      }
    };
    init();
  }, []);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'Outfit_700Bold',
          },
          headerShadowVisible: false, // Cleaner look globally
        }}
      >
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

