import Types from '../types';

export function onThemeChange(theme: any) {
  console.log('onThemeChange', theme);
  return {
    type: Types.THEME_CHANGE,
    theme: theme,
  };
}
