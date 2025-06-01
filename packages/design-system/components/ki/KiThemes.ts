import type { KiState, KiTheme, KiSize } from './types';

// Theme colors for different states of Ki - Enhanced with vibrant brand colors
export const themeColors: Record<
  KiTheme,
  Record<
    KiState,
    {
      primary: string;
      secondary: string;
      accent: string;
    }
  >
> = {
  default: {
    idle: {
      primary: "rgba(91, 110, 232, 0.9)", // Ki primary blue
      secondary: "rgba(168, 85, 247, 0.8)", // Ki purple
      accent: "rgba(52, 211, 153, 0.7)", // Ki green accent
    },
    listening: {
      primary: "rgba(168, 85, 247, 0.95)", // Vibrant purple
      secondary: "rgba(79, 70, 229, 0.85)", // Deep blue
      accent: "rgba(236, 72, 153, 0.8)", // Pink accent
    },
    thinking: {
      primary: "rgba(79, 70, 229, 0.9)", // Deep blue
      secondary: "rgba(147, 51, 234, 0.85)", // Rich purple
      accent: "rgba(59, 130, 246, 0.8)", // Blue accent instead of golden
    },
    speaking: {
      primary: "rgba(52, 211, 153, 0.95)", // Vibrant green
      secondary: "rgba(91, 110, 232, 0.9)", // Ki blue
      accent: "rgba(168, 85, 247, 0.85)", // Purple accent
    },
    typing: {
      primary: "rgba(236, 72, 153, 0.9)", // Pink
      secondary: "rgba(168, 85, 247, 0.85)", // Purple
      accent: "rgba(79, 70, 229, 0.8)", // Blue accent
    },
  },
  blue: {
    idle: {
      primary: "rgba(59, 130, 246, 0.7)",
      secondary: "rgba(96, 165, 250, 0.5)",
      accent: "rgba(37, 99, 235, 0.8)",
    },
    listening: {
      primary: "rgba(37, 99, 235, 0.7)",
      secondary: "rgba(59, 130, 246, 0.5)",
      accent: "rgba(29, 78, 216, 0.8)",
    },
    thinking: {
      primary: "rgba(30, 64, 175, 0.7)",
      secondary: "rgba(37, 99, 235, 0.5)",
      accent: "rgba(30, 58, 138, 0.8)",
    },
    speaking: {
      primary: "rgba(29, 78, 216, 0.7)",
      secondary: "rgba(37, 99, 235, 0.5)",
      accent: "rgba(30, 64, 175, 0.9)",
    },
    typing: {
      primary: "rgba(168, 85, 247, 0.7)",
      secondary: "rgba(192, 132, 252, 0.5)",
      accent: "rgba(147, 51, 234, 0.8)",
    },
  },
  purple: {
    idle: {
      primary: "rgba(139, 92, 246, 0.7)",
      secondary: "rgba(167, 139, 250, 0.5)",
      accent: "rgba(124, 58, 237, 0.8)",
    },
    listening: {
      primary: "rgba(124, 58, 237, 0.7)",
      secondary: "rgba(139, 92, 246, 0.5)",
      accent: "rgba(109, 40, 217, 0.8)",
    },
    thinking: {
      primary: "rgba(109, 40, 217, 0.7)",
      secondary: "rgba(124, 58, 237, 0.5)",
      accent: "rgba(91, 33, 182, 0.8)",
    },
    speaking: {
      primary: "rgba(91, 33, 182, 0.7)",
      secondary: "rgba(109, 40, 217, 0.5)",
      accent: "rgba(76, 29, 149, 0.9)",
    },
    typing: {
      primary: "rgba(168, 85, 247, 0.7)",
      secondary: "rgba(192, 132, 252, 0.5)",
      accent: "rgba(147, 51, 234, 0.8)",
    },
  },
  green: {
    idle: {
      primary: "rgba(16, 185, 129, 0.7)",
      secondary: "rgba(52, 211, 153, 0.5)",
      accent: "rgba(5, 150, 105, 0.8)",
    },
    listening: {
      primary: "rgba(5, 150, 105, 0.7)",
      secondary: "rgba(16, 185, 129, 0.5)",
      accent: "rgba(4, 120, 87, 0.8)",
    },
    thinking: {
      primary: "rgba(4, 120, 87, 0.7)",
      secondary: "rgba(5, 150, 105, 0.5)",
      accent: "rgba(6, 95, 70, 0.8)",
    },
    speaking: {
      primary: "rgba(6, 95, 70, 0.7)",
      secondary: "rgba(4, 120, 87, 0.5)",
      accent: "rgba(6, 78, 59, 0.9)",
    },
    typing: {
      primary: "rgba(168, 85, 247, 0.7)",
      secondary: "rgba(192, 132, 252, 0.5)",
      accent: "rgba(147, 51, 234, 0.8)",
    },
  },
  custom: {
    idle: {
      primary: "rgba(174, 213, 129, 0.7)",
      secondary: "rgba(200, 230, 150, 0.5)",
      accent: "rgba(150, 200, 100, 0.8)",
    },
    listening: {
      primary: "rgba(174, 213, 129, 0.7)",
      secondary: "rgba(200, 230, 150, 0.5)",
      accent: "rgba(150, 200, 100, 0.8)",
    },
    thinking: {
      primary: "rgba(174, 213, 129, 0.7)",
      secondary: "rgba(200, 230, 150, 0.5)",
      accent: "rgba(150, 200, 100, 0.8)",
    },
    speaking: {
      primary: "rgba(174, 213, 129, 0.7)",
      secondary: "rgba(200, 230, 150, 0.5)",
      accent: "rgba(150, 200, 100, 0.8)",
    },
    typing: {
      primary: "rgba(174, 213, 129, 0.7)",
      secondary: "rgba(200, 230, 150, 0.5)",
      accent: "rgba(150, 200, 100, 0.8)",
    },
  },
  minimal: {
    idle: {
      primary: "rgba(107, 114, 128, 0.3)",
      secondary: "rgba(156, 163, 175, 0.2)",
      accent: "rgba(75, 85, 99, 0.4)",
    },
    listening: {
      primary: "rgba(59, 130, 246, 0.4)",
      secondary: "rgba(96, 165, 250, 0.3)",
      accent: "rgba(37, 99, 235, 0.5)",
    },
    thinking: {
      primary: "rgba(139, 92, 246, 0.4)",
      secondary: "rgba(167, 139, 250, 0.3)",
      accent: "rgba(124, 58, 237, 0.5)",
    },
    speaking: {
      primary: "rgba(16, 185, 129, 0.5)",
      secondary: "rgba(52, 211, 153, 0.4)",
      accent: "rgba(5, 150, 105, 0.6)",
    },
    typing: {
      primary: "rgba(139, 92, 246, 0.4)",
      secondary: "rgba(167, 139, 250, 0.3)",
      accent: "rgba(124, 58, 237, 0.5)",
    },
  },
};

// Animation speed multipliers
export const speedMultipliers = {
  slow: 1.5,
  normal: 1,
  fast: 0.7,
};

// Base Ki shape
export const baseShape =
  "M100,56.25 C104.69,56.25 113.75,60.94 118.75,70.31 C123.44,79.69 123.44,98.44 118.75,107.81 C113.75,117.19 104.69,121.88 100,121.88 C95.31,121.88 86.25,117.19 81.25,107.81 C76.56,98.44 76.56,79.69 81.25,70.31 C86.25,60.94 95.31,56.25 100,56.25 Z";

// Shape variations for different states
export const shapeVariations: Record<KiState, string> = {
  idle: baseShape,
  listening:
    "M100,54.38 C105.63,54.38 115.94,59.06 120.63,69.38 C125.31,79.69 125.31,98.44 120.63,108.75 C115.94,119.06 105.63,123.75 100,123.75 C94.38,123.75 84.06,119.06 79.38,108.75 C74.69,98.44 74.69,79.69 79.38,69.38 C84.06,59.06 94.38,54.38 100,54.38 Z",
  thinking:
    "M100,55.31 C105.63,55.31 114.38,60 119.06,70.31 C123.75,80.63 123.75,97.5 119.06,107.81 C114.38,118.13 105.63,122.81 100,122.81 C94.38,122.81 85.63,118.13 80.94,107.81 C76.25,97.5 76.25,80.63 80.94,70.31 C85.63,60 94.38,55.31 100,55.31 Z",
  speaking:
    "M100,53.44 C106.56,53.44 116.88,58.13 122.5,69.38 C128.13,80.63 128.13,97.5 122.5,108.75 C116.88,120 106.56,124.06 100,124.06 C93.44,124.06 83.13,120 77.5,108.75 C71.88,97.5 71.88,80.63 77.5,69.38 C83.13,58.13 93.44,53.44 100,53.44 Z",
  typing:
    "M100,55.31 C106.25,55.31 115,59.38 119.69,69.38 C124.38,79.38 124.38,97.5 119.69,107.5 C115,117.5 106.25,121.56 100,121.56 C93.75,121.56 85,117.5 80.31,107.5 C75.63,97.5 75.63,79.38 80.31,69.38 C85,59.38 93.75,55.31 100,55.31 Z",
};

// Size mapping
export const dimensionsBySize: Record<KiSize, { width: number; height: number }> = {
  small: { width: 120, height: 120 },
  medium: { width: 200, height: 200 },
  large: { width: 280, height: 280 },
};

// Helper function to get colors based on theme and state
export const getThemeColors = (
  theme: KiTheme,
  state: KiState,
  customColors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  },
) => {
  if (theme === "custom" && customColors?.primary) {
    // Use custom colors if provided
    return {
      primary: customColors.primary || themeColors.default[state].primary,
      secondary: customColors.secondary || themeColors.default[state].secondary,
      accent: customColors.accent || themeColors.default[state].accent,
    };
  }

  return themeColors[theme][state];
};