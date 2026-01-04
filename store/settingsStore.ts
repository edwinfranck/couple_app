import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface SettingsState {
    isDarkMode: boolean;
    isLoading: boolean;

    // Actions
    loadSettings: () => Promise<void>;
    toggleTheme: () => Promise<void>;
}

const THEME_KEY = '@moments_theme_mode';

export const useSettingsStore = create<SettingsState>((set, get) => ({
    isDarkMode: true, // Default to dark mode for "Premium" feel if preferred, or false.
    isLoading: false,

    loadSettings: async () => {
        set({ isLoading: true });
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_KEY);
            // Default to true (Dark mode) if not set, or parse the saved value
            const isDark = savedTheme !== null ? JSON.parse(savedTheme) : true;
            set({
                isDarkMode: isDark,
                isLoading: false
            });
        } catch (error) {
            console.error('Failed to load settings:', error);
            set({ isLoading: false });
        }
    },

    toggleTheme: async () => {
        try {
            const newMode = !get().isDarkMode;
            await AsyncStorage.setItem(THEME_KEY, JSON.stringify(newMode));
            set({ isDarkMode: newMode });
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    },
}));
