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
  primary: '#7C8FFF',
  background: '#0F1419',
  card: '#1A1F2E',
  text: '#FFFFFF',
  textSecondary: '#A0AEC0',
  border: '#2D3748',
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
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
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
