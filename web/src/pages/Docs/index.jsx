/**
 * 使用文档页 - 内容与 openclawapi.ai 文档一致，OpenClaw API 品牌。
 * 基于 New API README 文档章节，去除 New API 品牌、统一为 OpenClaw API。
 */

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getSystemName } from '../../helpers';

const DOCS_BASE = 'https://openclawapi.ai/docs';

const docsNav = [
  { labelKey: '部署指南', href: DOCS_BASE },
  { labelKey: '接口文档', href: `${DOCS_BASE}/api-reference/chat-completions` },
  { labelKey: '常见问题', href: 'https://openclawapi.ai/#faq' },
  { labelKey: '联系我们', href: 'mailto:support@openclawapi.ai' },
];

export default function DocsPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${getSystemName()} - ${t('使用文档')}`;
  }, [t]);

  return (
    <div className='min-h-screen bg-semi-color-bg-0'>
      <div className='mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8'>
        <h1 className='text-2xl font-bold !text-semi-color-text-0 mb-2'>
          {t('使用文档')}
        </h1>
        <p className='!text-semi-color-text-1 mb-8'>
          {t('页脚品牌描述（与官网一致）')}
        </p>

        <div className='rounded-lg border border-semi-color-border bg-semi-color-bg-1 p-6'>
          <h2 className='text-lg font-semibold !text-semi-color-text-0 mb-4'>
            {t('快速导航')}
          </h2>
          <ul className='space-y-3'>
            {docsNav.map((item) => (
              <li key={item.labelKey}>
                <a
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm !text-semi-color-primary hover:!text-[var(--oc-accent)] transition-colors'
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className='mt-8 text-sm !text-semi-color-text-2'>
          {t('完整文档')}：{' '}
          <a
            href={DOCS_BASE}
            target='_blank'
            rel='noopener noreferrer'
            className='!text-semi-color-primary hover:!text-[var(--oc-accent)]'
          >
            openclawapi.ai/docs
          </a>
        </p>
      </div>
    </div>
  );
}
