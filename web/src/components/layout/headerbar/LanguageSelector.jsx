/**
 * 与官网 openclawapi.ai 一致：Globe + 语言名，仅 中文/English 两档。
 */

import React from 'react';
import { Button, Dropdown } from '@douyinfe/semi-ui';
import { Globe } from 'lucide-react';

const localeNames = { en: 'English', zh: '中文' };

const LanguageSelector = ({ currentLang, onLanguageChange, t }) => {
  return (
    <Dropdown
      position='bottomRight'
      render={
        <Dropdown.Menu className='!bg-semi-color-bg-overlay !border-semi-color-border !shadow-lg !rounded-lg'>
          <Dropdown.Item
            onClick={() => onLanguageChange('zh')}
            className={`!flex !items-center !gap-2 !px-3 !py-1.5 !text-sm !text-semi-color-text-0 ${currentLang === 'zh' ? '!bg-semi-color-primary-light-default !font-semibold' : 'hover:!bg-semi-color-fill-1'}`}
          >
            <span>{localeNames.zh}</span>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => onLanguageChange('en')}
            className={`!flex !items-center !gap-2 !px-3 !py-1.5 !text-sm !text-semi-color-text-0 ${currentLang === 'en' ? '!bg-semi-color-primary-light-default !font-semibold' : 'hover:!bg-semi-color-fill-1'}`}
          >
            <span>{localeNames.en}</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <Button
        icon={<Globe size={15} />}
        aria-label={t('common.changeLanguage')}
        theme='borderless'
        type='tertiary'
        className='!flex !items-center !gap-1.5 !px-2.5 !py-1.5 !text-sm !rounded-lg !bg-transparent hover:!bg-semi-color-fill-1 focus:!bg-semi-color-fill-1'
      >
        <span className='!text-semi-color-text-1'>{localeNames[currentLang] || localeNames.en}</span>
      </Button>
    </Dropdown>
  );
};

export default LanguageSelector;
