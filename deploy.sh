#!/bin/bash

# Build e push das imagens
docker-compose build

# Parar containers existentes
docker-compose down

# Iniciar novos containers
docker-compose up -d

# Verificar logs
docker-compose logs -f 