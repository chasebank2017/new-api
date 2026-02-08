# 通过 Docker Hub 部署后端（本地构建 → 推送 → 服务器拉取重启）

## 一、本机执行（构建并推送）

在 **new-api** 项目根目录执行。将 `YOUR_DOCKERHUB_USER` 换成你的 Docker Hub 用户名。

```bash
cd /Users/chasebank2017/Downloads/new-api

# 1. 登录 Docker Hub（未登录时执行一次）
docker login

# 2. 构建镜像（约 10–15 分钟，Vite 打包较慢）
docker build -t YOUR_DOCKERHUB_USER/new-api:latest .

# 3. 推送到 Docker Hub
docker push YOUR_DOCKERHUB_USER/new-api:latest
```

构建若因内存不足被 Kill，可在 Docker Desktop → Settings → Resources 将 Memory 调到 6GB+ 后重试。

---

## 二、服务器执行（拉取并重启）

SSH 登录后，**二选一**：

### 方式 A：服务器上改用「仅拉镜像、不构建」

编辑 `docker-compose.yml`，把 **new-api** 的 `build` 整段删掉，只保留 `image` 并改成你的镜像名：

```yaml
  new-api:
    image: YOUR_DOCKERHUB_USER/new-api:latest   # 改成你的 Docker Hub 用户名
    container_name: openclawapi-backend
    restart: always
    ports:
      - "3001:3000"
    volumes:
      - new-api-data:/data
    environment:
      - SQL_DSN=root:${MYSQL_ROOT_PASSWORD:-openclawapi2024}@tcp(mysql:3306)/new_api
      - REDIS_CONN_STRING=redis://redis:6379
      - SESSION_SECRET=${SESSION_SECRET:-openclawapi-session-secret-change-me}
      - TZ=Asia/Shanghai
      - SYSTEM_NAME=OpenClaw API
      - FOOTER_HTML=&copy; 2026 OpenClaw API. All rights reserved.
      - LOGO=
      - THEME=default
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - openclawapi
```

然后执行：

```bash
cd /opt/openclawapi.ai
sudo docker compose pull new-api
sudo docker compose up -d new-api
```

### 方式 B：不改 compose，每次先拉再强制用新镜像重启

若暂时不想改 `docker-compose.yml`（仍保留 `build`），可先拉你的镜像再强制用该镜像起容器：

```bash
cd /opt/openclawapi.ai
sudo docker pull YOUR_DOCKERHUB_USER/new-api:latest
sudo docker compose stop new-api
sudo docker compose rm -f new-api
# 用刚拉取的镜像起一个新容器（需与当前 compose 里端口、卷、环境一致）
sudo docker run -d --name openclawapi-backend --restart always \
  -p 3001:3000 \
  -v openclawapi_new-api-data:/data \
  -e SQL_DSN="root:${MYSQL_ROOT_PASSWORD:-openclawapi2024}@tcp(mysql:3306)/new_api" \
  -e REDIS_CONN_STRING=redis://redis:6379 \
  -e SESSION_SECRET="${SESSION_SECRET:-openclawapi-session-secret-change-me}" \
  -e TZ=Asia/Shanghai \
  -e SYSTEM_NAME="OpenClaw API" \
  --network openclawapi_openclawapi \
  YOUR_DOCKERHUB_USER/new-api:latest
```

推荐用 **方式 A**，把 compose 里 new-api 改成只填 `image: YOUR_DOCKERHUB_USER/new-api:latest`，以后更新只需 `docker compose pull new-api && docker compose up -d new-api`。

---

## 三、验证

```bash
docker ps --filter name=openclawapi-backend --format "{{.Image}} {{.Status}}"
```

浏览器访问：`https://api.openclawapi.ai`（或你的后端地址），确认为最新界面。
