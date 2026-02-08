#!/bin/bash
# 在本地执行：SSH 到服务器 → sed 改 compose 镜像 → pull → up → prune
# 用法：./scripts/deploy-remote.sh  或  bash scripts/deploy-remote.sh

set -e
SERVER="${DEPLOY_SERVER:-root@101.36.104.77}"
COMPOSE_DIR="${DEPLOY_COMPOSE_DIR:-/opt/openclawapi.ai}"
IMAGE="${DEPLOY_IMAGE:-chasebank2023/new-api:latest}"

echo "→ 在服务器 $SERVER 上更新 new-api 并重启 ..."
ssh "$SERVER" "cd $COMPOSE_DIR && \
  sed -i 's|image:.*new-api.*|image: $IMAGE|g' docker-compose.yml && \
  docker compose pull new-api && \
  docker compose up -d new-api && \
  docker image prune -f"
echo "→ 完成。可访问 https://api.openclawapi.ai 检查。"
