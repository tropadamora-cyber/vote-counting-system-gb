# ⚡ Guia Rápido de Atualizações - 5 Passos

## 🎯 Processo Simplificado

```
┌─────────────────────────────────────────────────────────────┐
│  FAZER ALTERAÇÃO NO CÓDIGO LOCALMENTE                       │
│  (Editar ficheiro em seu computador)                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  TESTAR LOCALMENTE                                          │
│  npm run dev                                                │
│  (Verificar se funciona)                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  FAZER COMMIT E PUSH                                        │
│  git add .                                                  │
│  git commit -m "descrição"                                  │
│  git push origin main                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  DEPLOY AUTOMÁTICO                                          │
│  (Plataforma faz tudo automaticamente)                      │
│  ⏱️ Tempo: 2-10 minutos                                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  VERIFICAR EM PRODUÇÃO                                      │
│  Aceder a https://seu-dominio.com                           │
│  Testar funcionalidades                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Passo a Passo Detalhado

### 1️⃣ EDITAR FICHEIRO

**Opção A: Usar Terminal**
```bash
# Entrar no diretório
cd /home/ubuntu/parallel_vote_counting_system

# Editar ficheiro
nano src/routes/circles.ts
# ou
nano public/index.html
# ou
nano public/styles.css
```

**Opção B: Usar Editor (VS Code, etc.)**
- Abrir pasta do projeto
- Editar ficheiro desejado
- Salvar (Ctrl+S)

### 2️⃣ TESTAR LOCALMENTE

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Abrir navegador
# http://localhost:3000

# Testar alterações
# Fazer login
# Testar funcionalidades

# Parar servidor
# Ctrl+C
```

### 3️⃣ FAZER COMMIT

```bash
# Ver ficheiros alterados
git status

# Adicionar ficheiros
git add .

# Fazer commit com mensagem descritiva
git commit -m "Frontend: Alterar cor primária para vermelho"
# ou
git commit -m "Backend: Corrigir bug no cálculo de votos"
# ou
git commit -m "Database: Adicionar campo phone ao User"
```

### 4️⃣ FAZER PUSH

```bash
# Enviar para GitHub
git push origin main

# Pronto! Plataforma faz deploy automático
```

### 5️⃣ VERIFICAR

```bash
# Aceder ao site
https://seu-dominio.com

# Verificar se alterações estão visíveis
# Testar funcionalidades
# Verificar logs se houver erro
```

---

## 🚀 Exemplos Rápidos

### Alterar Texto da Interface

**Ficheiro**: `public/index.html`

```html
<!-- ANTES -->
<h1>Sistema de Contagem Paralela de Votos</h1>

<!-- DEPOIS -->
<h1>Sistema de Contagem Paralela de Votos - Guiné-Bissau</h1>
```

**Comandos**:
```bash
nano public/index.html
# Editar
git add public/index.html
git commit -m "UI: Atualizar título"
git push origin main
# ✅ Pronto em 2-5 minutos
```

---

### Alterar Cor

**Ficheiro**: `public/styles.css`

```css
/* ANTES */
--primary-color: #1e3a8a;

/* DEPOIS */
--primary-color: #dc2626;
```

**Comandos**:
```bash
nano public/styles.css
# Editar
git add public/styles.css
git commit -m "UI: Mudar cor primária"
git push origin main
# ✅ Pronto em 2-5 minutos
```

---

### Corrigir Typo

**Ficheiro**: `public/index.html`

```html
<!-- ANTES -->
<button>Entrar</button>

<!-- DEPOIS -->
<button>Entrar no Sistema</button>
```

**Comandos**:
```bash
nano public/index.html
# Editar
git add public/index.html
git commit -m "Fix: Corrigir texto do botão"
git push origin main
# ✅ Pronto em 2-5 minutos
```

---

## ⚠️ Se Algo Correr Mal

### Opção 1: Voltar Atrás (Rollback)

**Railway.app**:
1. Aceder a railway.app
2. Clicar em "Deployments"
3. Selecionar versão anterior
4. Clicar "Redeploy"

**Heroku**:
```bash
heroku rollback
```

**Docker**:
```bash
git checkout HEAD~1
npm run build
docker-compose restart
```

### Opção 2: Corrigir e Fazer Push Novamente

```bash
# 1. Corrigir o ficheiro
nano ficheiro-com-erro.ts

# 2. Fazer commit
git add .
git commit -m "Fix: Corrigir erro anterior"

# 3. Push
git push origin main

# 4. Esperar deploy
```

---

## 🔍 Verificar Status

### Railway.app
- Aceder a https://railway.app
- Ver "Deployments" para histórico
- Ver "Logs" para erros

### Heroku
```bash
heroku logs --tail
```

### Docker
```bash
docker logs -f vote_counting_app
```

---

## 📊 Tempo de Deploy por Tipo

| Tipo | Tempo | Risco |
|------|-------|-------|
| Texto/UI | 2-5 min | Baixo |
| Estilos (CSS) | 2-5 min | Baixo |
| Backend simples | 5-10 min | Médio |
| Novo endpoint | 10-15 min | Médio |
| Mudança BD | 15-30 min | Alto |

---

## ✅ Checklist Rápido

Antes de fazer push:

- [ ] Ficheiro editado
- [ ] Testado localmente (npm run dev)
- [ ] Sem erros na compilação
- [ ] Commit message descritivo
- [ ] Pronto para push

---

## 🎓 Dicas Importantes

### ✅ Faça
- ✅ Fazer commits pequenos e frequentes
- ✅ Mensagens de commit descritivas
- ✅ Testar localmente antes de push
- ✅ Fazer backup antes de mudanças críticas
- ✅ Verificar logs após deploy

### ❌ Não Faça
- ❌ Fazer push sem testar
- ❌ Commits com mensagens vagas ("fix", "update")
- ❌ Modificar múltiplas coisas num commit
- ❌ Deixar console.log no código
- ❌ Commitar ficheiros sensíveis (.env)

---

## 🆘 Problemas Comuns

### "Não vejo minhas alterações"
```bash
# Solução: Limpar cache do navegador
# Ctrl+Shift+Del (Windows/Linux)
# Cmd+Shift+Del (Mac)
# Ou usar modo incógnito
```

### "Erro 502 Bad Gateway"
```bash
# Solução: Esperar 5-10 minutos
# Verificar logs
# Se persistir, fazer rollback
```

### "Erro de compilação"
```bash
# Solução: Testar localmente
npm run build
# Ver mensagem de erro
# Corrigir
# Fazer push novamente
```

---

## 📞 Precisa de Ajuda?

1. **Verificar logs** (primeira coisa)
2. **Consultar MANUTENCAO_ATUALIZACOES.md** (guia completo)
3. **Fazer rollback** se necessário
4. **Contactar suporte** se problema persistir

---

## 🎯 Resumo em 1 Minuto

```bash
# 1. Editar
nano ficheiro.ts

# 2. Testar
npm run dev

# 3. Commit
git add .
git commit -m "descrição"

# 4. Push
git push origin main

# 5. Esperar 2-10 minutos
# 6. Verificar em https://seu-dominio.com
```

**Pronto! 🚀**

---

**Versão**: 1.0.0  
**Data**: Outubro 2025  
**Desenvolvido por**: Manus AI

