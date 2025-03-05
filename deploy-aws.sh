#!/bin/bash

# Carrega variáveis de ambiente de produção
set -a
source .env.production
set +a

# Build das imagens
docker-compose -f docker-compose.yml build

# Login no ECR (substitua com suas credenciais AWS)
aws ecr get-login-password --region sua-regiao | docker login --username AWS --password-stdin seu-account.dkr.ecr.sua-regiao.amazonaws.com

# Tag e push das imagens
docker tag app-frontend:latest seu-account.dkr.ecr.sua-regiao.amazonaws.com/app-frontend:latest
docker tag app-backend:latest seu-account.dkr.ecr.sua-regiao.amazonaws.com/app-backend:latest

docker push seu-account.dkr.ecr.sua-regiao.amazonaws.com/app-frontend:latest
docker push seu-account.dkr.ecr.sua-regiao.amazonaws.com/app-backend:latest

# Deploy na ECS (se estiver usando)
aws ecs update-service --cluster seu-cluster --service seu-service --force-new-deployment 