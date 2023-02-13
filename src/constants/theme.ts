export const THEME_MODE = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
} as const;
export type THEME_MODE_ENUM = typeof THEME_MODE[keyof typeof THEME_MODE];

