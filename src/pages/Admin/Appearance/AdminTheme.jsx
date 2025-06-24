import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiRefreshCw, FiPalette } = FiIcons;

const AdminTheme = () => {
  const { colors, updateThemeColors, resetToDefaultColors, generateColorPalette } = useTheme();
  const [colorCustomizer, setColorCustomizer] = useState({
    primary: colors.primary?.['600'] || '#0284c7',
    accent: colors.accent?.['600'] || '#d97706',
    success: colors.success?.['600'] || '#059669',
    error: colors.error?.['600'] || '#dc2626'
  });

  const handleColorChange = (colorType, value) => {
    setColorCustomizer(prev => ({
      ...prev,
      [colorType]: value
    }));
  };

  const applyColorChanges = async () => {
    const newColors = {
      primary: generateColorPalette(colorCustomizer.primary),
      accent: generateColorPalette(colorCustomizer.accent),
      success: generateColorPalette(colorCustomizer.success),
      error: generateColorPalette(colorCustomizer.error)
    };
    await updateThemeColors(newColors);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Theme Customizer</h1>
        <p className="text-gray-600 mt-1">Customize your platform's appearance and branding</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Color Customization */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <SafeIcon icon={FiPalette} className="w-5 h-5" />
            Color Customization
          </h3>
          
          <div className="space-y-6">
            {Object.entries(colorCustomizer).map(([colorType, value]) => (
              <div key={colorType} className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {colorType} Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => handleColorChange(colorType, e.target.value)}
                    className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleColorChange(colorType, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="#000000"
                  />
                </div>
                <div 
                  className="w-full h-8 rounded-lg border"
                  style={{ backgroundColor: value }}
                ></div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={applyColorChanges}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              Apply Changes
            </button>
            <button
              onClick={resetToDefaultColors}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
            >
              <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
              Reset to Default
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <button 
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: colorCustomizer.primary }}
              >
                Primary Button
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: colorCustomizer.accent }}
              >
                Accent Button
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(colorCustomizer).map(([name, color]) => (
                <div key={name} className="text-center">
                  <div 
                    className="w-full h-16 rounded-lg mb-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  <p className="text-sm text-gray-600 capitalize">{name}</p>
                  <p className="text-xs text-gray-500">{color}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTheme;