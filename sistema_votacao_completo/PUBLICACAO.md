# Guia de Publicação - Sistema de Contagem Paralela de Votos

## 🚀 Publicação Rápida (Recomendado)

### Opção 1: Railway.app (Mais Fácil)

1. **Criar Conta**
   - Aceder a https://railway.app
   - Registar com GitHub

2. **Conectar Repositório**
   - Clicar em "New Project"
   - Selecionar "Deploy from GitHub"
   - Autorizar e selecionar repositório

3. **Configurar Variáveis de Ambiente**
   ```
   JWT_SECRET=sua-chave-secreta-aqui
   NODE_ENV=production
   ```

4. **Adicionar PostgreSQL**
   - Clicar em "Add Service"
   - Selecionar "PostgreSQL"
   - Railway configurará automaticamente DATABASE_URL

5. **Deploy**
   - Clicar em "Deploy"
   - Aguardar conclusão
   - Aceder ao URL fornecido

### Opção 2: Heroku

1. **Instalar Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Criar Aplicação**
   ```bash
   heroku create vote-counting-system-gb
   heroku addons:create heroku-postgresql:hobby-dev
   ```

3. **Configurar Variáveis**
   ```bash
   heroku config:set JWT_SECRET=sua-chave-secreta
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Opção 3: Render

1. **Criar Conta**
   - Aceder a https://render.com
   - Registar com GitHub

2. **Novo Web Service**
   - Clicar em "New +"
   - Selecionar "Web Service"
   - Conectar repositório

3. **Configurar**
   - Runtime: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Adicionar PostgreSQL

4. **Deploy**
   - Clicar em "Create Web Service"

## 🐳 Publicação com Docker

### Docker Hub

```bash
# Build imagem
docker build -t seu-usuario/vote-counting-system-gb:1.0.0 .

# Login Docker Hub
docker login

# Push imagem
docker push seu-usuario/vote-counting-system-gb:1.0.0
```

### Executar Localmente com Docker

```bash
# Build
docker build -t vote-counting-system .

# Run
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e JWT_SECRET="sua-chave" \
  vote-counting-system
```

## ☁️ Publicação em Nuvem Avançada

### AWS (EC2 + RDS)

```bash
# 1. Criar EC2 instance
# 2. SSH para servidor
ssh -i key.pem ubuntu@your-instance-ip

# 3. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Clonar repositório
git clone seu-repo-url
cd vote_counting_system_gb

# 5. Instalar dependências
npm install
npm run build

# 6. Configurar PM2
npm install -g pm2
pm2 start dist/server.js --name "vote-counting"
pm2 startup
pm2 save

# 7. Configurar Nginx
sudo apt install nginx
# Copiar nginx.conf para /etc/nginx/sites-available/default
sudo systemctl restart nginx

# 8. SSL com Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d seu-dominio.com
```

### Google Cloud Platform

```bash
# Deploy com Cloud Run
gcloud run deploy vote-counting-system \
  --source . \
  --platform managed \
  --region us-central1 \
  --set-env-vars DATABASE_URL=postgresql://...,JWT_SECRET=...
```

### Microsoft Azure

```bash
# Deploy com App Service
az webapp up --name vote-counting-system --runtime "node|18"
```

## 📋 Checklist de Publicação

Antes de publicar, verificar:

- [ ] Variáveis de ambiente configuradas
- [ ] Base de dados migrada (`npm run db:migrate`)
- [ ] Código compilado (`npm run build`)
- [ ] Testes passando (`npm test`)
- [ ] HTTPS/SSL configurado
- [ ] Domínio apontando para servidor
- [ ] Backup da base de dados configurado
- [ ] Monitoramento ativado
- [ ] Logs configurados
- [ ] Rate limiting ativado

## 🔒 Segurança em Produção

1. **HTTPS Obrigatório**
   - Usar Let's Encrypt (gratuito)
   - Renovação automática de certificado

2. **Variáveis de Ambiente**
   - Nunca commitar `.env` no git
   - Usar secrets manager da plataforma

3. **Firewall**
   - Restringir acesso SSH
   - Apenas portas 80 e 443 abertas

4. **Atualizações**
   - Node.js atualizado
   - Dependências atualizadas regularmente
   - Patches de segurança aplicados

5. **Backup**
   - Backup diário da base de dados
   - Armazenamento em local seguro

## 📊 Monitoramento Pós-Publicação

### Verificar Status

```bash
# Aceder ao endpoint de saúde
curl https://seu-dominio.com/health

# Verificar logs
# Usar painel da plataforma (Railway, Heroku, etc.)

# Monitorar performance
# Usar ferramentas como New Relic, DataDog, etc.
```

### Alertas Recomendados

- Servidor down
- Taxa de erro elevada
- Tempo de resposta lento
- Espaço em disco baixo
- Falha de backup

## 🆘 Troubleshooting Pós-Publicação

### Erro 502 Bad Gateway
- Verificar se servidor está ativo
- Verificar logs
- Reiniciar aplicação

### Erro de Conexão à Base de Dados
- Verificar DATABASE_URL
- Verificar se BD está ativa
- Executar migrações

### Performance Lenta
- Verificar índices de BD
- Implementar caching
- Usar CDN para assets

### Erro de CORS
- Verificar API_BASE_URL
- Verificar configuração CORS em server.ts

## 📞 Suporte

Para questões sobre publicação:
- Documentação: README.md, DEPLOYMENT.md
- Comunidade: GitHub Issues
- Suporte: Contactar equipa de desenvolvimento

## 🎉 Próximos Passos

Após publicação bem-sucedida:

1. Testar todas as funcionalidades
2. Configurar monitoramento
3. Configurar backups automáticos
4. Documentar processo de deployment
5. Treinar utilizadores
6. Coletar feedback
7. Planejar melhorias futuras

---

**Versão**: 1.0.0  
**Data**: Outubro 2025  
**Desenvolvido por**: Manus AI

**Status**: ✅ Pronto para Publicação

