# 🚀 Publicar Online em 10 Minutos - Railway.app

## 🎯 Objetivo

Publicar o sistema online **sem complicações** para testar em produção.

---

## ✅ Pré-requisitos

- ✅ Conta GitHub (https://github.com)
- ✅ Código do sistema no GitHub
- ✅ 10 minutos de tempo

---

## 📋 Passo 1: Criar Repositório GitHub

### 1.1 Criar Conta (se não tem)

1. Aceder a https://github.com
2. Clicar "Sign up"
3. Preencher dados
4. Verificar email

### 1.2 Criar Repositório

1. Aceder a https://github.com/new
2. **Repository name**: `vote-counting-system-gb`
3. **Description**: "Sistema de Contagem Paralela de Votos"
4. **Public** (importante!)
5. Clicar "Create repository"

### 1.3 Fazer Upload do Código

**Opção A: Via GitHub Web (Mais Fácil)**

1. Abrir repositório criado
2. Clicar "Add file" → "Upload files"
3. Arrastar pasta `sistema_votacao_completo` para a área
4. Clicar "Commit changes"

**Opção B: Via Git (Se tem Git instalado)**

```bash
cd sistema_votacao_completo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/vote-counting-system-gb.git
git push -u origin main
```

---

## 🚀 Passo 2: Publicar em Railway.app

### 2.1 Criar Conta Railway

1. Aceder a https://railway.app
2. Clicar "Login"
3. Selecionar "GitHub"
4. Autorizar Railway
5. Confirmar email

### 2.2 Criar Novo Projeto

1. Aceder a https://railway.app/dashboard
2. Clicar "New Project"
3. Selecionar "Deploy from GitHub"
4. Selecionar repositório criado
5. Clicar "Deploy"

### 2.3 Configurar Variáveis de Ambiente

1. Clicar em "Variables"
2. Adicionar:
   ```
   JWT_SECRET=sua-chave-secreta-aqui
   NODE_ENV=production
   ```
3. Clicar "Save"

### 2.4 Adicionar PostgreSQL

1. Clicar "Add Service"
2. Selecionar "PostgreSQL"
3. Railway configura automaticamente `DATABASE_URL`
4. Clicar "Deploy"

### 2.5 Aguardar Deploy

- Tempo: 3-5 minutos
- Ver progresso em "Deployments"
- Quando terminar, terá URL pública

---

## 🌐 Passo 3: Aceder ao Sistema Online

1. Aceder a Railway dashboard
2. Clicar em projeto
3. Copiar URL fornecida
4. Abrir no navegador

**Exemplo**: `https://vote-counting-system-gb-production.up.railway.app`

---

## 🔐 Fazer Login Online

Usar credenciais de teste:

| Email | Senha |
|-------|-------|
| admin@example.com | admin123 |
| leader@example.com | leader123 |
| delegate1@example.com | delegate123 |

---

## ✅ Verificar se Funciona

### Teste 1: Aceder ao Sistema
- ✅ Página carrega
- ✅ Sem erros 502/503

### Teste 2: Fazer Login
- ✅ Login bem-sucedido
- ✅ Dashboard carrega

### Teste 3: Testar Funcionalidades
- ✅ Submissões carregam
- ✅ Resultados carregam
- ✅ API funciona

---

## 🔄 Atualizar Sistema Online

Após fazer alterações locais:

```bash
git add .
git commit -m "Descrição da mudança"
git push origin main
```

Railway faz deploy automático em 2-5 minutos.

---

## 🎯 Alternativa: Heroku (Se Preferir)

### Publicar em Heroku

```bash
# 1. Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# 2. Login
heroku login

# 3. Criar app
heroku create vote-counting-system-gb

# 4. Adicionar PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# 5. Configurar variáveis
heroku config:set JWT_SECRET=sua-chave

# 6. Deploy
git push heroku main

# 7. Ver URL
heroku open
```

---

## 💡 Recomendação

### Para Teste Rápido: Railway.app
- ✅ Mais fácil
- ✅ Sem CLI necessário
- ✅ Deploy automático
- ✅ Recomendado!

### Para Produção: DigitalOcean
- ✅ Mais robusto
- ✅ Melhor performance
- ✅ Escalabilidade
- ✅ Para depois

---

## 🆘 Problemas Comuns

### "Build failed"
- Verificar logs em Railway
- Verificar se package.json está correto
- Tentar fazer push novamente

### "Database connection error"
- Aguardar PostgreSQL iniciar (2-3 minutos)
- Verificar DATABASE_URL em Variables
- Fazer rollback se necessário

### "Erro 502 Bad Gateway"
- Aguardar 5-10 minutos
- Verificar logs
- Fazer rollback se persistir

---

## 📊 Status Após Publicação

Após publicar com sucesso:

| Item | Status |
|------|--------|
| URL Pública | ✅ Ativa |
| Sistema Online | ✅ Funcionando |
| Base de Dados | ✅ PostgreSQL |
| Backups | ✅ Automáticos |
| Monitoramento | ✅ Incluído |

---

## 🎉 Pronto!

Sistema está **online e acessível publicamente**!

---

## 📞 Próximos Passos

1. ✅ Testar online
2. ✅ Fazer testes completos
3. ✅ Coletar feedback
4. ✅ Fazer melhorias
5. ✅ Configurar domínio personalizado (opcional)

---

**Versão**: 1.0.0  
**Data**: Outubro 2025  
**Desenvolvido por**: Manus AI

**Sistema Online em 10 Minutos! 🚀**

