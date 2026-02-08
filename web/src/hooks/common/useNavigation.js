/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import { useMemo } from 'react';

export const useNavigation = (t, docsLink, headerNavModules) => {
  const mainNavLinks = useMemo(() => {
    const defaultModules = {
      console: true,
      pricing: true,
    };
    const modules = headerNavModules || defaultModules;

    const internalLinks = [
      { text: t('我的'), itemKey: 'console', to: '/console' },
      { text: t('模型商店'), itemKey: 'pricing', to: '/pricing' },
      { text: t('使用文档'), itemKey: 'docs', to: '/docs', isExternal: false },
      {
        text: t('常见问题'),
        itemKey: 'faq',
        isExternal: true,
        externalLink: 'https://openclawapi.ai/#faq',
      },
    ].filter((link) => {
      if (link.itemKey === 'pricing') {
        return typeof modules.pricing === 'object'
          ? modules.pricing.enabled !== false
          : modules.pricing !== false;
      }
      if (link.itemKey === 'console') return modules[link.itemKey] !== false;
      return true; // 使用文档、常见问题始终显示
    });

    return internalLinks;
  }, [t, headerNavModules]);

  return {
    mainNavLinks,
  };
};
