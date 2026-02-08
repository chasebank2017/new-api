# 后端与官网视觉/交互统一改造说明

本文档说明已完成的改造，以及登录注册、OAuth、用户工作台入口的后续建议。

## 一、已完成的改造

### 布局与官网一致（顶栏、主内容、页脚、侧栏）

- **顶栏**：与官网 Navbar 一致——`max-w-7xl` 容器居中、`border-b border-semi-color-border`、`bg-semi-color-bg-0/80 backdrop-blur-xl`，固定顶部。
- **主内容区**：控制台内容统一包在 `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6` 容器内，垂直 `flex flex-col gap-6`，避免挤在一起；主布局增加 `marginTop: 64` 避免被固定顶栏遮挡。
- **页脚**：与官网 Footer 一致——`border-t border-semi-color-border`、`max-w-7xl` 内层、五列网格（品牌/产品/支持/资源/法律）、底栏版权 + 社交链接；**已去除底部装饰性红球/插图**。
- **侧边栏**：与官网设计体系一致——`border-right: 1px solid var(--semi-color-border)`，沿用现有品牌色悬停与选中样式。

### Empty 状态无插图

- 404、403、About 空状态、仪表盘监控列表、以及**所有主要表格**（Tokens、Users、UsageLogs、TaskLogs、Subscriptions、Redemptions、Models、Channels、Deployments、MjLogs）的 Empty 已改为 `image={Empty.PRESENTED_IMAGE_SIMPLE}`，**不再使用 semi-illustrations 的插画**。
- 若其他页面（如部分 Setting 子页、Modal、NoticeModal、DocumentRenderer 等）仍使用 `IllustrationNoResult` / `IllustrationNoContent` / `IllustrationConstruction`，可按同样方式改为 `Empty.PRESENTED_IMAGE_SIMPLE` 并删除对应 `semi-illustrations` 引用。

### 1. 主题（深/浅色）与前端完全一致

- **存储键统一**：后端与官网共用 `localStorage` 键名 `theme`，取值仅 `dark` | `light`。
- **移除「跟随系统」**：后端不再提供「自动/跟随系统」选项，仅保留深色/浅色切换，与官网一致。
- **ThemeToggle 组件**：由下拉（浅色/深色/自动）改为**单一按钮**：当前为深色时显示太阳图标（点击切浅色），当前为浅色时显示月亮图标（点击切深色），交互与官网 Navbar 一致。
- **效果**：在官网选择深色后，再打开控制台（api.openclawapi.ai）会保持深色；反之亦然。

### 2. 语言与前端完全一致

- **存储键统一**：后端与官网共用 `localStorage` 键名 `locale`，取值 `en` | `zh`。
- **i18n 配置**：后端 i18next 使用 `lookupLocalStorage: 'locale'`，检测与缓存均写入 `locale`；切换语言时显式 `localStorage.setItem('locale', lang)`。
- **效果**：在官网切换为中文后，再打开控制台会保持中文；控制台切换语言后，再回官网也会一致。

### 3. 页脚与品牌统一

- **版权文案**：与官网一致——中文「© {年份} OpenClaw API. 保留所有权利。」，英文「All rights reserved.」。
- **品牌描述**：与官网一致，使用 i18n「页脚品牌描述（与官网一致）」：中文为 OpenClaw 官方适配 API 的完整描述，英文为 Enterprise-grade AI model gateway 等。
- **Footer 链接 hover**：列内链接 hover 使用 accent 色（`var(--oc-accent)`），与官网一致。
- **自定义 HTML 页脚**：当使用管理员配置的自定义 footer_html 时，不再叠加「设计与开发由 OpenClaw API」署名，避免与官网风格违和。
- **Demo 站页脚**：移除「相关项目」「友情链接」中的第三方项目链接；保留五列（品牌/产品/支持/资源/法律）。

### 4. 语言选择器与前端一致

- **展示**：Globe 图标 + 当前语言名称（中文 / English），与官网一致。
- **仅两档**：仅支持 中文 / English，移除国旗图标，下拉样式与品牌主色一致。

### 5. 注释与品牌

- 已修改的模块中，将 QuantumNous/AGPL 版权头替换为简短「OpenClaw API」说明，避免露出上游项目信息。

---

## 二、登录/注册与第三方登录的后续建议

您提到的需求包括：  
前端 Sign In 与后端用户体系一致、支持 Google/Apple/微软/微信/支付宝/QQ/手机号等登录方式。

### 当前后端能力（new-api 已有）

- **OAuth**：已有 GitHub、Discord、OIDC、LinuxDO 等（见 `oauth/`、`controller/oauth.go`）。
- **登录入口**：后端提供 `/login`、`/register` 等页面；前端官网 Navbar 的「登录」「获取 API Key」指向 `https://api.openclawapi.ai/login` 与 `https://api.openclawapi.ai/register`，即**同一套账号体系**。

### 建议的改造方向（分阶段）

1. **统一入口与话术**
   - 官网「登录」→ 跳转 api.openclawapi.ai 登录页（已如此）。
   - 官网「获取 API Key」→ 未登录时跳转注册/登录，已登录跳转控制台令牌页或首页。
   - 控制台内「用户管理」仅对管理员可见；普通用户只有「个人设置」「令牌」「用量」等，避免与「官网登录」产生概念割裂。

2. **第三方登录扩展**
   - **Google / Apple / Microsoft**：在现有 OAuth 体系上增加对应 Provider（如 OIDC 或各平台 OAuth2），配置 Client ID/Secret，在登录/注册页增加「使用 Google/Apple/Microsoft 登录」按钮。
   - **微信 / 支付宝 / QQ**：需使用各平台开放平台（微信开放平台、支付宝开放平台、QQ 互联）的 OAuth 或扫码登录，后端新增对应 oauth provider 与路由，前端登录页增加对应按钮。
   - **手机号验证登录**：需短信/验证码服务（如 Twilio、阿里云、腾讯云），后端提供发送验证码、校验接口，登录/注册页提供「手机号 + 验证码」选项。

3. **前后端共享登录状态（可选）**
   - 若官网与 api 同主域（例如 openclawapi.ai 与 api.openclawapi.ai），可考虑共享 Cookie 或统一 SSO；若跨域，可继续使用「官网点登录 → 跳转 api 子域登录」的当前方式，并在登录后重定向回官网或控制台。

以上可作为后续迭代的改造计划，按优先级分阶段实现。

---

## 三、用户工作台入口建议

- **官网**：导航「登录」→ 控制台登录页；「获取 API Key」→ 未登录先注册/登录，已登录→ 控制台（令牌或首页）。
- **控制台**：登录后首页即「工作台」（用量、令牌、充值等）；侧栏根据角色显示「用户管理」（仅管理员）、「令牌」「用量」「充值」等，不单独强调「用户管理」为第一入口，避免与官网「登录」概念混淆。

这样用户会自然形成「官网 = 品牌与文档，控制台 = 登录后的工作台」的认知，前后端一体感更强。

---

## 四、官网与后端一致性审查与巡检（2025-02）

以下为对官网（openclawapi.ai）与后端控制台（new-api/web）的逐项对比结论与已做修正。

### 已修复的不一致

| 项目 | 官网 | 后端（修复前） | 修复 |
|------|------|----------------|------|
| 页脚版权 | 「保留所有权利。」/「All rights reserved.» | 「版权所有」/「All rights reserved」 | 统一为「保留所有权利。」并加 i18n |
| 页脚品牌描述 | 完整 tagline（OpenClaw 官方适配…） | 短句「企业级AI模型…」 | 使用 i18n「页脚品牌描述（与官网一致）」 |
| Footer 链接 hover | `hover:text-accent`（青色） | `hover:text-primary`（红） | 改为 `hover:!text-[var(--oc-accent)]` |
| 自定义 HTML 页脚 | 无额外署名 | 有「设计与开发由 OpenClaw API」 | 移除该署名块 |
| Dashboard 顶栏按钮 | 品牌色体系 | 绿/蓝（green-500, blue-500） | 搜索→ primary 红，刷新→ accent 青；标题用 `!text-semi-color-text-0` |

### 已一致、无需改动的部分

- **容器**：顶栏、主内容、页脚均为 `max-w-7xl px-4 sm:px-6 lg:px-8`，与官网一致。
- **顶栏高度**：`h-16`，与官网一致。
- **页脚结构**：五列网格（品牌/产品/支持/资源/法律）、底栏版权+社交图标，与官网一致。
- **字体与排版**：`index.css` 已设 16px、line-height 1.7、标题 600，与官网 globals.css 一致。
- **品牌色与选中**：`--oc-brand`、`--oc-accent`、选中红色背景深色字，与官网一致。
- **卡片**：12px 圆角、hover 红色边框与阴影，与官网 card-hover 一致。

### 已完成的后续统一项

- **顶栏 Logo 文字**：HeaderLogo 内对 `systemName` 中的「Claw」做品牌色高亮（`renderBrandName`），与官网「Open**Claw** API」一致。
- **Footer 品牌区 logo**：新增 `CrabLogo.jsx`（与官网 SVG 一致），customFooter 品牌列为 logo + 文字，并链至官网。
- **业务组件颜色**：充值/订阅卡片、定价卡片、仪表盘、签到日历、Auth 链接等处的紫色/蓝色/橙色已改为 `!text-semi-color-primary` 或 `!text-[var(--oc-accent)]`，灰色标题改为 `!text-semi-color-text-0`。
- **其余 Empty 插图**：UpstreamRatioSync、SettingsUptimeKuma/FAQ/Announcements/APIInfo、TopupHistoryModal、UserSubscriptionsModal、PrefillGroupManagement、MissingModelsModal、PricingTable、PricingCardView、SingleModelSelectModal、ModelSelectModal、MultiKeyManageModal、NoticeModal、UptimePanel、FaqPanel、ApiInfoPanel、AnnouncementsPanel、DocumentRenderer 均已改为 `Empty.PRESENTED_IMAGE_SIMPLE`，并移除 `@douyinfe/semi-illustrations` 引用。
