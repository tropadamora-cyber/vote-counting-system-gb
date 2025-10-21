# 📝 Guia de Manutenção e Atualizações - Sistema de Contagem Paralela de Votos

## 🎯 Visão Geral

Este guia explica como **modificar, atualizar e manter** o sistema após ser publicado em produção. Inclui procedimentos para diferentes plataformas de hosting.

---

## 🔄 Fluxo de Atualização (Geral)

```
1. Fazer alterações no código local
   ↓
2. Testar localmente
   ↓
3. Fazer commit e push para GitHub
   ↓
4. Plataforma faz deploy automático
   ↓
5. Verificar se tudo funciona
```

---

## 📝 Tipos de Modificações

### 1️⃣ Modificações Simples (Frontend)
**Tempo**: 2-5 minutos  
**Risco**: Baixo

Exemplos:
- Alterar texto da interface
- Mudar cores/estilos
- Corrigir typos
- Ajustar layout

**Procedimento**:
```bash
# 1. Editar ficheiro
nano public/index.html
# ou
nano public/styles.css

# 2. Testar localmente
npm run dev

# 3. Fazer commit
git add .
git commit -m "Alteração: descrição da mudança"

# 4. Push para GitHub
git push origin main

# 5. Deploy automático (2-5 minutos)
```

### 2️⃣ Modificações de Backend
**Tempo**: 10-30 minutos  
**Risco**: Médio

Exemplos:
- Adicionar novo endpoint
- Modificar lógica de negócio
- Corrigir bugs
- Otimizar performance

**Procedimento**:
```bash
# 1. Editar ficheiro TypeScript
nano src/routes/circles.ts

# 2. Compilar localmente
npm run build

# 3. Testar
npm run dev

# 4. Fazer commit
git add .
git commit -m "Backend: descrição da mudança"

# 5. Push
git push origin main

# 6. Deploy automático
```

### 3️⃣ Modificações de Base de Dados
**Tempo**: 30-60 minutos  
**Risco**: Alto (requer backup)

Exemplos:
- Adicionar novo campo
- Criar nova tabela
- Alterar relacionamentos
- Mudar tipos de dados

**Procedimento**:
```bash
# 1. Fazer backup ANTES
# (Ver seção de Backups)

# 2. Editar schema.prisma
nano prisma/schema.prisma

# 3. Criar migração
npx prisma migrate dev --name descricao_mudanca

# 4. Testar localmente
npm run dev

# 5. Fazer commit
git add .
git commit -m "Database: descrição da mudança"

# 6. Push
git push origin main

# 7. Deploy automático (executa migração)
```

---

## 🛠️ Guia por Plataforma

### Railway.app (Recomendado)

#### Modificações Simples
```
1. Editar ficheiro localmente
2. git push origin main
3. Railway detecta automaticamente
4. Deploy automático em 1-2 minutos
5. Verificar em https://seu-dominio.com
```

#### Verificar Status
- Aceder a https://railway.app
- Selecionar projeto
- Ver "Deployments" para histórico
- Ver "Logs" para erros

#### Rollback (Voltar Atrás)
```
1. Aceder a railway.app
2. Clicar em "Deployments"
3. Selecionar versão anterior
4. Clicar "Redeploy"
```

#### Acessar Variáveis de Ambiente
```
1. Aceder a railway.app
2. Selecionar projeto
3. Clicar em "Variables"
4. Editar JWT_SECRET, DATABASE_URL, etc.
5. Salvar (redeploy automático)
```

---

### Heroku

#### Modificações Simples
```bash
# 1. Editar ficheiro
nano src/routes/circles.ts

# 2. Fazer commit
git add .
git commit -m "Descrição da mudança"

# 3. Push para Heroku
git push heroku main

# 4. Heroku faz deploy automaticamente
# Acompanhar em: heroku logs --tail
```

#### Verificar Status
```bash
# Ver logs em tempo real
heroku logs --tail

# Ver aplicações
heroku apps

# Verificar variáveis de ambiente
heroku config
```

#### Rollback
```bash
# Ver histórico de releases
heroku releases

# Voltar para versão anterior
heroku rollback v5

# Verificar se funcionou
heroku logs --tail
```

#### Modificar Variáveis de Ambiente
```bash
# Ver variáveis
heroku config

# Adicionar/modificar
heroku config:set JWT_SECRET=nova-chave

# Remover
heroku config:unset JWT_SECRET

# Verificar
heroku config
```

---

### Docker (Servidor Próprio)

#### Modificações Simples
```bash
# 1. SSH para servidor
ssh user@seu-servidor.com

# 2. Entrar no diretório
cd /app/vote_counting_system_gb

# 3. Puxar últimas alterações
git pull origin main

# 4. Recompilar
npm run build

# 5. Reiniciar com Docker
docker-compose down
docker-compose up -d

# 6. Verificar status
docker-compose logs -f app
```

#### Verificar Status
```bash
# Ver containers em execução
docker ps

# Ver logs
docker logs vote_counting_app

# Ver recursos
docker stats
```

#### Rollback
```bash
# Ver histórico de commits
git log --oneline

# Voltar para commit anterior
git checkout <commit-hash>

# Recompilar e reiniciar
npm run build
docker-compose restart
```

#### Modificar Variáveis de Ambiente
```bash
# Editar .env
nano .env

# Reiniciar containers
docker-compose restart

# Verificar
docker-compose logs app
```

---

### AWS EC2 (Servidor Próprio)

#### Modificações Simples
```bash
# 1. SSH para servidor
ssh -i key.pem ubuntu@seu-ip.com

# 2. Entrar no diretório
cd /home/ubuntu/vote_counting_system_gb

# 3. Puxar alterações
git pull origin main

# 4. Recompilar
npm run build

# 5. Reiniciar com PM2
pm2 restart vote-counting

# 6. Verificar
pm2 logs vote-counting
```

#### Verificar Status
```bash
# Ver processos
pm2 list

# Ver logs
pm2 logs vote-counting

# Monitorar recursos
pm2 monit
```

#### Rollback
```bash
# Ver histórico
git log --oneline

# Voltar atrás
git checkout <commit-hash>

# Recompilar
npm run build

# Reiniciar
pm2 restart vote-counting
```

---

## 🔧 Exemplos Práticos de Modificações

### Exemplo 1: Alterar Cor da Interface

**Ficheiro**: `public/styles.css`

```css
/* ANTES */
:root {
    --primary-color: #1e3a8a;
}

/* DEPOIS */
:root {
    --primary-color: #dc2626;  /* Mudou para vermelho */
}
```

**Deploy**:
```bash
git add public/styles.css
git commit -m "UI: Alterar cor primária para vermelho"
git push origin main
# Automático: 2-5 minutos
```

---

### Exemplo 2: Adicionar Novo Campo na Base de Dados

**Ficheiro**: `prisma/schema.prisma`

```prisma
model User {
  id        String     @id @default(cuid())
  email     String     @unique
  password  String
  name      String
  role      UserRole   @default(DELEGATE)
  phone     String?    // ← NOVO CAMPO
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  @@map("users")
}
```

**Deploy**:
```bash
# 1. Criar migração
npx prisma migrate dev --name add_phone_to_user

# 2. Fazer commit
git add prisma/
git commit -m "Database: Adicionar campo phone ao User"

# 3. Push
git push origin main

# 4. Deploy automático (executa migração)
```

---

### Exemplo 3: Corrigir Bug no Backend

**Ficheiro**: `src/routes/results.ts`

```typescript
// ANTES (com bug)
const coverage = totalAssemblies > 0 ? ((submittedAssemblies / totalAssemblies) * 100).toFixed(2) : '0.00';

// DEPOIS (corrigido)
const coverage = totalAssemblies > 0 ? ((submittedAssemblies / totalAssemblies) * 100).toFixed(2) : '0.00';
// Corrigir lógica se necessário
```

**Deploy**:
```bash
git add src/routes/results.ts
git commit -m "Fix: Corrigir cálculo de cobertura"
git push origin main
# Automático: 5-10 minutos
```

---

### Exemplo 4: Adicionar Novo Endpoint

**Ficheiro**: `src/routes/circles.ts`

```typescript
// Adicionar novo endpoint
router.get('/statistics', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const totalCircles = await prisma.electoralCircle.count();
    const totalAssemblies = await prisma.votingAssembly.count();
    
    res.json({
      totalCircles,
      totalAssemblies,
      averageAssembliesPerCircle: totalAssemblies / totalCircles
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
```

**Deploy**:
```bash
# 1. Compilar
npm run build

# 2. Testar localmente
npm run dev

# 3. Fazer commit
git add src/routes/circles.ts
git commit -m "Feature: Adicionar endpoint de estatísticas"

# 4. Push
git push origin main
```

---

## 🔐 Backups Antes de Modificações Críticas

### Backup Manual da Base de Dados

#### Railway.app
```bash
# 1. Aceder a railway.app
# 2. Selecionar PostgreSQL
# 3. Clicar em "Connect"
# 4. Usar comando pg_dump
pg_dump postgresql://user:pass@host:5432/db > backup.sql
```

#### Heroku
```bash
# Criar backup
heroku pg:backups:capture

# Listar backups
heroku pg:backups

# Download
heroku pg:backups:download

# Restaurar
heroku pg:backups:restore b001 DATABASE_URL
```

#### Docker
```bash
# Backup PostgreSQL
docker exec vote_counting_db pg_dump -U votecounting vote_counting > backup.sql

# Restaurar
docker exec -i vote_counting_db psql -U votecounting vote_counting < backup.sql
```

---

## 📊 Monitoramento Após Atualização

### Verificar se Tudo Funciona

```bash
# 1. Testar endpoint de saúde
curl https://seu-dominio.com/health

# 2. Verificar logs
# Railway: Ver em dashboard
# Heroku: heroku logs --tail
# Docker: docker logs -f vote_counting_app

# 3. Testar funcionalidades principais
# - Fazer login
# - Submeter dados
# - Ver resultados

# 4. Verificar performance
# - Tempo de resposta
# - Uso de CPU/memória
# - Erros na consola
```

---

## ⚠️ Troubleshooting Pós-Atualização

### Erro 502 Bad Gateway
```bash
# Solução:
# 1. Verificar logs
# 2. Verificar se servidor está ativo
# 3. Fazer rollback se necessário
```

### Erro de Conexão à BD
```bash
# Solução:
# 1. Verificar DATABASE_URL
# 2. Executar migrações: npx prisma migrate deploy
# 3. Fazer rollback se necessário
```

### Performance Lenta
```bash
# Solução:
# 1. Verificar índices de BD
# 2. Verificar logs para queries lentas
# 3. Otimizar código
# 4. Aumentar recursos (RAM, CPU)
```

### Erro de CORS
```bash
# Solução:
# 1. Verificar API_BASE_URL
# 2. Verificar configuração CORS em server.ts
# 3. Limpar cache do navegador
```

---

## 🔄 Workflow de Desenvolvimento Recomendado

### Desenvolvimento Local
```bash
# 1. Criar branch para feature
git checkout -b feature/nova-funcionalidade

# 2. Fazer alterações
nano src/routes/circles.ts

# 3. Testar localmente
npm run dev

# 4. Compilar
npm run build

# 5. Fazer commit
git add .
git commit -m "Feature: descrição"

# 6. Push para GitHub
git push origin feature/nova-funcionalidade

# 7. Criar Pull Request (opcional)

# 8. Merge para main
git checkout main
git merge feature/nova-funcionalidade

# 9. Push para main
git push origin main

# 10. Deploy automático
```

---

## 📋 Checklist de Atualização

Antes de fazer push para produção:

- [ ] Código compilado sem erros
- [ ] Testado localmente
- [ ] Sem console.log desnecessários
- [ ] Variáveis de ambiente configuradas
- [ ] Backup da BD feito (se necessário)
- [ ] Commit message descritivo
- [ ] Sem ficheiros sensíveis (chaves, senhas)
- [ ] Documentação atualizada
- [ ] Logs verificados após deploy

---

## 🆘 Suporte Rápido

### Problemas Comuns

| Problema | Solução |
|----------|---------|
| Não vejo minhas alterações | Limpar cache do navegador (Ctrl+Shift+Del) |
| Erro 404 em novo endpoint | Recompilar e reiniciar servidor |
| BD não atualiza | Executar migrações: `npx prisma migrate deploy` |
| Servidor não inicia | Verificar logs: `npm run dev` |
| Erro de permissão | Verificar variáveis de ambiente |

---

## 📞 Contacto para Ajuda

Se encontrar problemas:

1. **Verificar logs** (primeira coisa)
2. **Consultar documentação** (README.md, DEPLOYMENT.md)
3. **Fazer rollback** se necessário
4. **Contactar suporte** se problema persistir

---

## 🎓 Resumo Rápido

### Para Modificações Simples
```bash
# 1. Editar ficheiro
# 2. git add .
# 3. git commit -m "descrição"
# 4. git push origin main
# 5. Esperar 2-5 minutos
# 6. Verificar em https://seu-dominio.com
```

### Para Modificações de BD
```bash
# 1. Fazer backup
# 2. Editar prisma/schema.prisma
# 3. npx prisma migrate dev --name descrição
# 4. Testar localmente
# 5. git push origin main
# 6. Esperar 10-15 minutos
# 7. Verificar logs
```

### Para Rollback
```bash
# Railway: Clicar "Redeploy" em versão anterior
# Heroku: heroku rollback
# Docker: git checkout <commit> && npm run build && restart
```

---

**Versão**: 1.0.0  
**Data**: Outubro 2025  
**Desenvolvido por**: Manus AI

---

## ✅ Próximos Passos

1. Publicar o sistema (seguir PUBLICACAO.md)
2. Testar todas as funcionalidades
3. Configurar monitoramento
4. Documentar processos da sua equipa
5. Treinar utilizadores
6. Manter sistema atualizado

**Boa sorte com o seu sistema! 🚀**

