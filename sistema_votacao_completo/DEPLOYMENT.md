# Guia de Implantação - Sistema de Contagem Paralela de Votos

## Visão Geral

Este documento descreve como implantar o Sistema de Contagem Paralela de Votos em um servidor de produção para alojamento permanente.

## Requisitos de Servidor

- **Node.js**: v16 ou superior
- **npm**: v7 ou superior
- **Espaço em disco**: Mínimo 2GB
- **RAM**: Mínimo 512MB (recomendado 1GB)
- **Conexão de Internet**: Estável e de alta velocidade

## Plataformas Recomendadas para Alojamento

### 1. **Heroku** (Recomendado para Prototipagem)
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Criar aplicação
heroku create vote-counting-system-gb

# Configurar variáveis de ambiente
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### 2. **Railway.app** (Recomendado)
- Suporta Node.js e PostgreSQL
- Fácil de configurar
- Bom para projetos de médio porte

### 3. **Render** (Alternativa)
- Hospedagem gratuita com limite
- Suporta Node.js e PostgreSQL
- Interface intuitiva

### 4. **DigitalOcean** (Para Produção)
```bash
# Criar droplet com Node.js
# SSH para o servidor
ssh root@your_server_ip

# Instalar dependências
apt update && apt upgrade -y
apt install nodejs npm git -y

# Clonar repositório
git clone your-repo-url
cd vote_counting_system_gb

# Instalar dependências
npm install

# Compilar TypeScript
npm run build

# Instalar PM2 para gerenciar processo
npm install -g pm2

# Iniciar aplicação
pm2 start dist/server.js --name "vote-counting"
pm2 startup
pm2 save
```

### 5. **AWS EC2** (Para Grande Escala)
- Escalabilidade automática
- Backup automático
- Monitoramento avançado

## Passos de Implantação

### 1. Preparar o Código

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/vote-counting-system-gb.git
cd vote_counting_system_gb

# Instalar dependências
npm install

# Compilar TypeScript
npm run build
```

### 2. Configurar Variáveis de Ambiente

Criar ficheiro `.env` em produção:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vote_counting"

# Server
PORT=3000
NODE_ENV=production

# JWT
JWT_SECRET=seu-chave-secreta-muito-segura-aqui

# API Configuration
API_BASE_URL=https://seu-dominio.com
```

### 3. Configurar Base de Dados

Para produção, usar **PostgreSQL** em vez de SQLite:

```bash
# Atualizar .env com PostgreSQL
DATABASE_URL="postgresql://user:password@host:5432/vote_counting"

# Executar migrações
npm run db:migrate

# Verificar base de dados
npm run db:studio
```

### 4. Iniciar Servidor

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm run build
npm start
```

### 5. Configurar Domínio

- Registar domínio (ex: votacao.gw)
- Configurar DNS para apontar para servidor
- Configurar SSL/TLS (Let's Encrypt)

## Monitoramento e Manutenção

### Verificar Status

```bash
# Verificar se servidor está ativo
curl https://seu-dominio.com/health

# Ver logs
pm2 logs vote-counting

# Monitorar recursos
pm2 monit
```

### Backup Automático

```bash
# Backup diário da base de dados
0 2 * * * pg_dump vote_counting > /backup/vote_counting_$(date +\%Y\%m\%d).sql
```

### Atualizações

```bash
# Puxar últimas alterações
git pull origin main

# Instalar novas dependências
npm install

# Compilar
npm run build

# Reiniciar
pm2 restart vote-counting
```

## Segurança em Produção

1. **HTTPS Obrigatório**
   ```bash
   # Usar Let's Encrypt para certificado gratuito
   certbot certonly --standalone -d seu-dominio.com
   ```

2. **Variáveis de Ambiente Seguras**
   - Nunca commitar `.env` no git
   - Usar gerenciador de secrets do servidor

3. **Rate Limiting**
   - Implementar rate limiting na API
   - Proteger contra ataques DDoS

4. **Firewall**
   - Restringir acesso apenas às portas necessárias
   - Configurar regras de entrada/saída

5. **Atualizações Regulares**
   - Manter Node.js atualizado
   - Atualizar dependências regularmente

## Troubleshooting

### Erro: "Cannot find module"
```bash
npm install
npm run build
```

### Erro: "Port already in use"
```bash
# Mudar porta em .env
PORT=3001
```

### Erro: "Database connection failed"
```bash
# Verificar DATABASE_URL
# Verificar se servidor de BD está ativo
# Executar migrações: npm run db:migrate
```

### Erro: "CORS error"
```bash
# Verificar API_BASE_URL em .env
# Verificar configuração CORS em server.ts
```

## Performance

### Otimizações Recomendadas

1. **Caching**
   - Implementar Redis para cache
   - Cache de resultados frequentes

2. **CDN**
   - Usar CloudFlare para servir assets estáticos
   - Reduzir latência global

3. **Compressão**
   - Gzip ativado por padrão
   - Minificar assets

4. **Banco de Dados**
   - Criar índices nas colunas frequentemente consultadas
   - Usar connection pooling

## Escalabilidade

Para suportar milhões de utilizadores:

1. **Load Balancing**
   - Usar Nginx como reverse proxy
   - Distribuir carga entre múltiplos servidores

2. **Microserviços**
   - Separar API em serviços independentes
   - Usar message queues (RabbitMQ, Kafka)

3. **Caching Distribuído**
   - Redis para cache compartilhado
   - Session store distribuído

4. **Base de Dados**
   - Replicação de BD
   - Sharding para dados muito grandes

## Exemplo de Implantação Completa (Railway.app)

1. Criar conta em railway.app
2. Conectar repositório GitHub
3. Configurar variáveis de ambiente
4. Selecionar Node.js como runtime
5. Adicionar PostgreSQL como plugin
6. Deploy automático ao fazer push

## Suporte e Documentação

- **README.md**: Documentação técnica
- **GUIA_UTILIZACAO.md**: Manual do utilizador
- **API Endpoints**: Documentados em README.md

## Contacto

Para questões sobre implantação, contacte a equipa de desenvolvimento.

---

**Versão**: 1.0.0  
**Data**: Outubro 2025  
**Desenvolvido por**: Manus AI

