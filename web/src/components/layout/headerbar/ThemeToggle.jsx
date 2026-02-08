/**
 * 与官网 openclawapi.ai 一致：单一按钮切换深色/浅色，无“跟随系统”选项。
 */

import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, onThemeToggle, t }) => {
  const isDark = theme === 'dark';

  return (
    <Button
      icon={isDark ? <Sun size={18} /> : <Moon size={18} />}
      aria-label={t('切换主题')}
      theme='borderless'
      type='tertiary'
      className='!p-1.5 !text-current focus:!bg-semi-color-fill-1 !rounded-lg !bg-transparent hover:!bg-semi-color-fill-1'
      onClick={() => onThemeToggle(isDark ? 'light' : 'dark')}
    />
  );
};

export default ThemeToggle;
