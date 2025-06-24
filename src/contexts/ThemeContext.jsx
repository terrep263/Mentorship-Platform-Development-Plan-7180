import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSiteSettings } from '../hooks/useSupabase';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const { settings, updateSetting, loading } = useSiteSettings();
  const [currentTheme, setCurrentTheme] = useState('light');
  const [colors, setColors] = useState({
    primary: { 50: '#f0f9ff', 100: '#e0f2fe', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 900: '#0c4a6e' },
    accent: { 500: '#f59e0b', 600: '#d97706' },
    success: { 500: '#10b981', 600: '#059669' },
    warning: { 500: '#f59e0b', 600: '#d97706' },
    error: { 500: '#ef4444', 600: '#dc2626' }
  });

  useEffect(() => {
    if (settings.theme_colors) {
      setColors(settings.theme_colors);
      applyThemeColors(settings.theme_colors);
    }
  }, [settings]);

  const applyThemeColors = (themeColors) => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(themeColors).forEach(([colorName, colorShades]) => {
      Object.entries(colorShades).forEach(([shade, value]) => {
        root.style.setProperty(`--color-${colorName}-${shade}`, value);
      });
    });
  };

  const updateThemeColors = async (newColors) => {
    const success = await updateSetting('theme_colors', newColors);
    if (success) {
      setColors(newColors);
      applyThemeColors(newColors);
    }
    return success;
  };

  const resetToDefaultColors = async () => {
    const defaultColors = {
      primary: { 50: '#f0f9ff', 100: '#e0f2fe', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 900: '#0c4a6e' },
      accent: { 500: '#f59e0b', 600: '#d97706' },
      success: { 500: '#10b981', 600: '#059669' },
      warning: { 500: '#f59e0b', 600: '#d97706' },
      error: { 500: '#ef4444', 600: '#dc2626' }
    };
    return updateThemeColors(defaultColors);
  };

  const generateColorPalette = (baseColor) => {
    // Simple color palette generator (you can enhance this)
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    return {
      50: `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`,
      100: `rgb(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 30)})`,
      500: baseColor,
      600: `rgb(${Math.max(0, r - 20)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 20)})`,
      700: `rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`,
      900: `rgb(${Math.max(0, r - 80)}, ${Math.max(0, g - 80)}, ${Math.max(0, b - 80)})`
    };
  };

  const value = {
    currentTheme,
    setCurrentTheme,
    colors,
    updateThemeColors,
    resetToDefaultColors,
    generateColorPalette,
    loading,
    settings
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};