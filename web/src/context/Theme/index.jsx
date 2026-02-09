/**
 * 主题与官网 openclawapi.ai 一致：仅深色/浅色，共用 localStorage key "theme"，
 * 与前端通过 cookie oc_theme (domain=.openclawapi.ai) 同步。
 */

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import { getCookie, setCookie } from '../../helpers/cookie';

const STORAGE_KEY = 'theme';

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

const ActualThemeContext = createContext(null);
export const useActualTheme = () => useContext(ActualThemeContext);

const SetThemeContext = createContext(null);
export const useSetTheme = () => useContext(SetThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, _setTheme] = useState(() => {
    try {
      const fromCookie = getCookie('oc_theme');
      if (fromCookie === 'dark' || fromCookie === 'light') return fromCookie;
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  // 应用主题到 DOM（与前端一致：html 使用 .light class，body 保留 theme-mode 供 Semi 使用）
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'light') {
      root.classList.add('light');
      body.removeAttribute('theme-mode');
    } else {
      root.classList.remove('light');
      body.setAttribute('theme-mode', 'dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
      setCookie('oc_theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const setTheme = useCallback((newTheme) => {
    const value =
      newTheme === 'light' || newTheme === 'dark' ? newTheme : theme === 'dark' ? 'light' : 'dark';
    _setTheme(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
      setCookie('oc_theme', value);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  return (
    <SetThemeContext.Provider value={setTheme}>
      <ActualThemeContext.Provider value={theme}>
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
      </ActualThemeContext.Provider>
    </SetThemeContext.Provider>
  );
};
