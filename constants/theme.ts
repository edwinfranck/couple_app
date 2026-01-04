// Theme configuration for Moments app
import { useSettingsStore } from '@/store/settingsStore';

const lightColors = {
  primary: '#5E72E4',
  background: '#F7F8FC',
  card: '#FFFFFF',
  text: '#1A1F36',
  textSecondary: '#697386',
  border: '#E3E8EE',
  error: '#EF4444',
};

const darkColors = {
  primary: '#8B9DFF', // Slightly lighter for contrast on black
  background: '#000000', // True black
  card: '#121212', // Deep gray surface
  text: '#FFFFFF',
  textSecondary: '#9CA3AF', // Neutral Gray 400
  border: '#27272A', // Neutral Gray 800
  error: '#EF4444',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontFamily: 'Outfit_700Bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontFamily: 'Outfit_600SemiBold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 18,
    fontFamily: 'Outfit_600SemiBold',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontFamily: 'Outfit_600SemiBold',
    lineHeight: 24,
  },
};

export const useTheme = () => {
  // We can still use system scheme for initialization logic in store, 
  // but here we trust the store's isDarkMode which now defaults to true or saved value.
  const { isDarkMode } = useSettingsStore();

  const colors = isDarkMode ? darkColors : lightColors;

  return {
    colors,
    spacing,
    borderRadius,
    typography,
    isDark: isDarkMode,
  };
};
