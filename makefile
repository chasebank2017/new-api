# 远程 VPS 配置
REMOTE_IP = 101.36.104.77
REMOTE_DIR = /opt/openclawapi.ai
DOCKER_IMAGE = chasebank2023/new-api:latest

# 远程部署命令
DEPLOY_CMD = ssh root@$(REMOTE_IP) "cd $(REMOTE_DIR) && \
	sed -i 's|image:.*new-api.*|image: $(DOCKER_IMAGE)|g' docker-compose.yml && \
	docker compose pull new-api && \
	docker compose up -d new-api && \
	docker image prune -f"

.PHONY: deploy push-only update-remote

# 一键完成：构建(amd64) -> 推送 -> 远程更新
deploy:
	@echo "🚀 [Local] 正在进行交叉编译并推送 amd64 镜像到 Docker Hub..."
	docker buildx build --platform linux/amd64 -t $(DOCKER_IMAGE) --push .
	@echo "✅ [Local] 镜像推送成功！"
	@echo "📡 [Remote] 正在通知 VPS ($(REMOTE_IP)) 执行更新..."
	@$(DEPLOY_CMD)
	@echo "🎉 [Finish] 远程更新已完成！"

# 仅推送镜像 (amd64)
push-only:
	@echo "📤 正在推送 amd64 镜像..."
	docker buildx build --platform linux/amd64 -t $(DOCKER_IMAGE) --push .

# 仅触发远程更新 (假设镜像已更新)
update-remote:
	@echo "📡 仅触发远程更新..."
	@$(DEPLOY_CMD)
