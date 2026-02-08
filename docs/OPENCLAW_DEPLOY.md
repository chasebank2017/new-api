# OpenClaw API 定制版部署说明

本仓库已按 [OpenClaw API](https://openclawapi.ai) 官网前端的品牌与样式做了定制，包括：

## 已做修改摘要

| 位置 | 修改内容 |
|------|----------|
| **common/constants.go** | 默认 `SystemName = "OpenClaw API"`，`Footer = "© 2026 OpenClaw API. All rights reserved."` |
| **web/index.html** | 标题、描述、theme-color、favicon 指向 OpenClaw 品牌 |
| **web/public/logo.svg** | 使用官网同款螃蟹爪 Logo（coral-red #ff4d4d） |
| **web/src/helpers/utils.jsx** | 未配置时的默认系统名为「OpenClaw API」，默认 logo 为 `/logo.svg` |
| **web/src/components/layout/Footer.jsx** | 页脚品牌与链接改为 OpenClaw API / openclawapi.ai，文档链接指向官网 |
| **web/src/index.css** | 注入 OpenClaw 品牌主题：coral-red 主色、cyan 强调色、深/浅色背景、Satoshi 字体、侧栏选中样式 |

效果：管理后台与官网在**品牌名、Logo、主色、字体、深色主题**上保持一致。

---

## 部署方式一：使用官方 New-API 镜像（未改代码）

若你使用的是上游 `calciumion/new-api:latest` 等官方镜像，未使用本定制代码：

1. 在 **docker-compose** 中设置环境变量：
   ```yaml
   environment:
     - SYSTEM_NAME=OpenClaw API
     - FOOTER_HTML=&copy; 2026 OpenClaw API. All rights reserved.
   ```
2. 登录管理后台 → **系统设置** → **自定义设置** → **自定义 CSS**，粘贴 [OpenClaw API 仓库](https://github.com/openclawapi/openclawapi-ai) 中 `backend-theme/custom.css` 的**全部内容**并保存，即可获得与官网一致的配色与品牌名显示。

---

## 部署方式二：使用本定制版构建镜像（推荐）

使用本仓库（已含 OpenClaw 品牌与主题）构建镜像并部署到 openclawapi.ai 栈。

### 1. 构建镜像

在 **new-api 项目根目录**（即本仓库）执行：

```bash
docker build -t openclawapi/new-api:latest .
```

（若使用 Docker Compose 的 build 方式，见下。）

### 2. 在 openclawapi-ai 项目中用本镜像替换官方镜像

在 **openclawapi-ai** 的 `docker-compose.yml` 中，将 `new-api` 服务由拉取镜像改为**构建本地 new-api**，或使用你刚构建的镜像。

**方式 A：使用已构建的镜像**

```yaml
new-api:
  image: openclawapi/new-api:latest   # 使用上面构建的镜像
  container_name: openclawapi-backend
  # ... 其余配置不变，保留 SYSTEM_NAME、FOOTER_HTML 等环境变量
```

**方式 B：从本地 new-api 目录构建**

假设 new-api 与 openclawapi-ai 同级目录：

```yaml
new-api:
  build:
    context: ../new-api
    dockerfile: Dockerfile
  image: openclawapi/new-api:latest
  container_name: openclawapi-backend
  # ... 其余配置不变
```

### 3. 启动/更新

```bash
cd /path/to/openclawapi-ai
docker compose up -d --build new-api
```

访问 `https://api.openclawapi.ai`，应看到 OpenClaw API 品牌名、Logo、coral-red 主题与 Satoshi 字体；无需再粘贴自定义 CSS 即可与官网风格一致（若仍需微调，仍可在后台粘贴 `backend-theme/custom.css`）。

---

## 与官网前端的一致性

| 项目 | 说明 |
|------|------|
| **品牌名** | 系统名称、页脚、标题均为 OpenClaw API |
| **Logo** | 使用与官网一致的螃蟹爪 SVG（#ff4d4d） |
| **主色** | coral-red #ff4d4d（hover #ff6b6b，active #e63946） |
| **强调色** | cyan #00e5cc（成功/信息） |
| **深色背景** | #050810、#0a0f1a、#111827、#1a2035 |
| **字体** | Satoshi（body），与官网一致 |
| **文档/链接** | 关于、文档、API 文档等指向 openclawapi.ai |

---

## 故障排查

- **仍显示「New API」**：清除浏览器缓存并重新登录；确认后台「系统设置」中系统名称已设为「OpenClaw API」并保存。
- **Logo 不显示**：确认 `web/public/logo.svg` 存在且默认 getLogo 返回 `/logo.svg`；若后台自定义了 Logo 地址，请填写可访问的 URL。
- **主题未生效**：确认 `web/src/index.css` 已包含 OpenClaw 主题变量；若使用官方镜像，必须在「自定义 CSS」中粘贴完整 `custom.css`。
