/**
 * 前后端语言/主题同步：使用 domain=.openclawapi.ai 的 cookie，
 * 使 openclawapi.ai 与 api.openclawapi.ai 共享 oc_locale、oc_theme。
 */

const COOKIE_DOMAIN = '.openclawapi.ai';
const MAX_AGE_YEAR = 365 * 24 * 60 * 60;

export function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split(';')
    .map((s) => s.trim())
    .find((s) => s.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

export function setCookie(name, value, options = {}) {
  if (typeof document === 'undefined') return;
  const { domain = COOKIE_DOMAIN, maxAge = MAX_AGE_YEAR, path = '/' } = options;
  const encoded = encodeURIComponent(value);
  const parts = [`${name}=${encoded}`, `path=${path}`, `max-age=${maxAge}`];
  if (domain) parts.push(`domain=${domain}`);
  document.cookie = parts.join('; ');
}
