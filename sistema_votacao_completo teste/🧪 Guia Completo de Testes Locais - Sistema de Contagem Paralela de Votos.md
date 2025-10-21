# 🧪 Guia Completo de Testes Locais - Sistema de Contagem Paralela de Votos

## 🎯 Objetivo

Testar completamente o sistema **antes de publicar em produção** para garantir que tudo funciona corretamente.

---

## ✅ Pré-requisitos

- ✅ Node.js 16+ instalado
- ✅ npm instalado
- ✅ Código do sistema extraído
- ✅ Dependências instaladas (`npm install`)
- ✅ Base de dados criada (`npm run db:migrate`)

---

## 🚀 Passo 1: Iniciar o Sistema Localmente

### Opção A: Modo Desenvolvimento (Recomendado para Testes)

```bash
# 1. Entrar na pasta
cd parallel_vote_counting_system

# 2. Iniciar servidor
npm run dev

# Resposta esperada:
# Servidor iniciado em http://localhost:3000
# Ambiente: development
```

### Opção B: Modo Produção

```bash
# 1. Compilar
npm run build

# 2. Iniciar
npm start

# Resposta esperada:
# Servidor iniciado em http://localhost:3000
# Ambiente: production
```

---

## 🌐 Passo 2: Aceder ao Sistema

1. **Abrir navegador**
   ```
   http://localhost:3000
   ```

2. **Verificar se página carrega**
   - Deve ver tela de login
   - Sem erros na consola

---

## 🔐 Passo 3: Testar Autenticação

### Teste 1: Login com Admin

```
Email: admin@example.com
Senha: admin123
```

**Esperado:**
- ✅ Login bem-sucedido
- ✅ Redirecionamento para dashboard
- ✅ Nome do utilizador exibido
- ✅ Sem erros na consola

### Teste 2: Login com Líder

```
Email: leader@example.com
Senha: leader123
```

**Esperado:**
- ✅ Login bem-sucedido
- ✅ Dashboard carrega
- ✅ Acesso a todas as seções

### Teste 3: Login com Delegado

```
Email: delegate1@example.com
Senha: delegate123
```

**Esperado:**
- ✅ Login bem-sucedido
- ✅ Dashboard carrega
- ✅ Acesso limitado (conforme role)

### Teste 4: Credenciais Inválidas

```
Email: admin@example.com
Senha: senha-errada
```

**Esperado:**
- ✅ Mensagem de erro exibida
- ✅ Não faz login
- ✅ Sem travamentos

---

## 📊 Passo 4: Testar Dashboard

### Teste 1: Visão Geral

**Verificar:**
- ✅ Estatísticas carregam
- ✅ Total de assembleias exibido
- ✅ Submissões recebidas mostradas
- ✅ Percentagem de cobertura calculada
- ✅ Resultados nacionais exibidos

### Teste 2: Submissões

**Verificar:**
- ✅ Lista de submissões carrega
- ✅ Status de cada submissão exibido
- ✅ Informações de votantes visíveis
- ✅ Sem erros ao carregar

### Teste 3: Resultados

**Verificar:**
- ✅ Dropdown de círculos carrega
- ✅ Seleção de círculo funciona
- ✅ Resultados exibem corretamente
- ✅ Percentagens calculadas

### Teste 4: Círculos

**Verificar:**
- ✅ Lista de círculos carrega
- ✅ Informações de região exibidas
- ✅ Número de deputados correto
- ✅ Número de mesas correto

### Teste 5: Partidos

**Verificar:**
- ✅ Lista de partidos carrega
- ✅ Siglas exibidas corretamente
- ✅ Número de candidatos correto
- ✅ Sem erros

---

## 🔌 Passo 5: Testar API (Avançado)

### Teste 1: Health Check

```bash
curl http://localhost:3000/health
```

**Resposta esperada:**
```json
{"status":"ok","message":"Sistema de Contagem Paralela de Votos está operacional"}
```

### Teste 2: Login via API

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**Resposta esperada:**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "admin@example.com",
    "name": "Administrador",
    "role": "ADMIN"
  }
}
```

### Teste 3: Listar Círculos

```bash
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  http://localhost:3000/api/circles
```

**Resposta esperada:**
```json
[
  {
    "id": "...",
    "name": "Catió / Komo",
    "region": "Tombali",
    "deputies": 7
  },
  ...
]
```

### Teste 4: Listar Partidos

```bash
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  http://localhost:3000/api/parties
```

**Resposta esperada:**
```json
[
  {
    "id": "...",
    "name": "Partido Africano para a Independência da Guiné e Cabo Verde",
    "acronym": "PAIGC"
  },
  ...
]
```

---

## 📝 Passo 6: Testar Submissão de Dados

### Teste 1: Submeter Dados (via Interface)

1. **Fazer login como delegado**
   ```
   Email: delegate1@example.com
   Senha: delegate123
   ```

2. **Ir para "Submissões"**

3. **Preencher formulário** (se disponível)
   - Selecionar assembleia de voto
   - Inserir número de votantes
   - Inserir contagem de votos
   - Submeter

4. **Verificar**
   - ✅ Submissão recebida
   - ✅ Status "PENDING"
   - ✅ Dados salvos na BD

### Teste 2: Submeter via API

```bash
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "votingAssemblyId": "ASSEMBLY_ID",
    "registeredVoters": 500,
    "actualVoters": 450,
    "unusedBallots": 10,
    "nullVotes": 5,
    "blankVotes": 3,
    "votes": [
      {
        "partyId": "PARTY_ID_1",
        "voteCount": 200
      },
      {
        "partyId": "PARTY_ID_2",
        "voteCount": 150
      }
    ]
  }'
```

---

## 📊 Passo 7: Testar Resultados

### Teste 1: Resultados Nacionais

```bash
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  http://localhost:3000/api/results/national
```

**Verificar:**
- ✅ Resultados retornados
- ✅ Percentagens calculadas
- ✅ Partidos ordenados por votos

### Teste 2: Resultados por Círculo

```bash
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  http://localhost:3000/api/results/circle/CIRCLE_ID
```

**Verificar:**
- ✅ Resultados do círculo
- ✅ Informações do círculo
- ✅ Percentagens corretas

### Teste 3: Estatísticas de Cobertura

```bash
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  http://localhost:3000/api/results/coverage/stats
```

**Verificar:**
- ✅ Total de assembleias
- ✅ Submissões recebidas
- ✅ Percentagem de cobertura

---

## 🔍 Passo 8: Verificar Consola do Navegador

### Abrir Developer Tools

```
Windows/Linux: F12 ou Ctrl+Shift+I
macOS: Cmd+Option+I
```

### Verificar Abas

1. **Console**
   - ✅ Sem erros vermelhos
   - ✅ Sem avisos críticos
   - ✅ Mensagens normais de log

2. **Network**
   - ✅ Requisições HTTP 200 (sucesso)
   - ✅ Sem requisições 404 (não encontrado)
   - ✅ Sem requisições 500 (erro servidor)
   - ✅ Tempo de resposta < 1 segundo

3. **Application**
   - ✅ Token JWT armazenado
   - ✅ Dados de utilizador guardados
   - ✅ Sem erros de storage

---

## ⚡ Passo 9: Teste de Performance

### Teste 1: Tempo de Carregamento

```bash
# Abrir DevTools → Network
# Recarregar página (F5)
# Verificar tempo total
```

**Esperado:**
- ✅ Página carrega em < 3 segundos
- ✅ Recursos carregam em < 1 segundo
- ✅ Sem travamentos

### Teste 2: Teste de Carga

```bash
# Instalar Apache Bench
sudo apt-get install apache2-utils

# Teste simples
ab -n 100 -c 10 http://localhost:3000/health

# Teste mais pesado
ab -n 1000 -c 50 http://localhost:3000/api/results/national
```

**Esperado:**
- ✅ Sem erros
- ✅ Tempo de resposta < 500ms
- ✅ Taxa de sucesso 100%

---

## 🐛 Passo 10: Teste de Bugs

### Teste 1: Logout

1. **Fazer login**
2. **Clicar "Sair"**
3. **Verificar**
   - ✅ Redirecionado para login
   - ✅ Token removido
   - ✅ Dados de utilizador limpos

### Teste 2: Navegação

1. **Clicar em diferentes menus**
2. **Verificar**
   - ✅ Todas as seções carregam
   - ✅ Sem erros 404
   - ✅ Transições suaves

### Teste 3: Validação de Entrada

1. **Tentar submeter formulário vazio**
2. **Verificar**
   - ✅ Mensagem de erro exibida
   - ✅ Formulário não submete
   - ✅ Sem travamentos

### Teste 4: Responsividade

1. **Redimensionar navegador**
2. **Testar em diferentes tamanhos**
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)
3. **Verificar**
   - ✅ Interface adapta-se
   - ✅ Botões funcionam
   - ✅ Sem elementos sobrepostos

---

## 📋 Checklist de Testes

### Autenticação
- [ ] Login com admin funciona
- [ ] Login com líder funciona
- [ ] Login com delegado funciona
- [ ] Credenciais inválidas rejeitadas
- [ ] Logout funciona

### Dashboard
- [ ] Visão geral carrega
- [ ] Estatísticas exibidas
- [ ] Submissões carregam
- [ ] Resultados carregam
- [ ] Círculos carregam
- [ ] Partidos carregam

### API
- [ ] Health check funciona
- [ ] Login via API funciona
- [ ] Listar círculos funciona
- [ ] Listar partidos funciona
- [ ] Submeter dados funciona
- [ ] Resultados carregam

### Performance
- [ ] Página carrega em < 3s
- [ ] Sem erros na consola
- [ ] Sem requisições falhadas
- [ ] Responsivo em mobile
- [ ] Sem travamentos

### Segurança
- [ ] Token JWT armazenado
- [ ] Autorização por role funciona
- [ ] Sem dados sensíveis expostos
- [ ] CORS configurado

---

## 🆘 Problemas Comuns Durante Testes

### "Cannot GET /"
**Solução**: Servidor não iniciou
```bash
npm run dev
```

### "Cannot find module"
**Solução**: Dependências não instaladas
```bash
npm install
```

### "Port 3000 already in use"
**Solução**: Usar porta diferente
```bash
PORT=3001 npm run dev
```

### "Database connection error"
**Solução**: Base de dados não criada
```bash
npm run db:migrate
```

### "Erro 401 Unauthorized"
**Solução**: Token inválido ou expirado
```bash
Fazer login novamente
```

### "Erro 404 Not Found"
**Solução**: Endpoint não existe
```bash
Verificar URL da API
Consultar README.md
```

---

## 📊 Relatório de Testes

Após completar todos os testes, criar um relatório:

```markdown
# Relatório de Testes - Sistema de Contagem Paralela de Votos

## Data: [data]
## Testador: [nome]

### Resultados

#### Autenticação
- [x] Login funciona
- [x] Logout funciona
- [x] Autorização funciona

#### Dashboard
- [x] Visão geral funciona
- [x] Submissões carregam
- [x] Resultados carregam

#### API
- [x] Endpoints funcionam
- [x] Validação funciona
- [x] Erros tratados

#### Performance
- [x] Carregamento rápido
- [x] Sem travamentos
- [x] Responsivo

### Problemas Encontrados

1. [Problema 1]
   - Descrição: ...
   - Solução: ...

2. [Problema 2]
   - Descrição: ...
   - Solução: ...

### Conclusão

Sistema está [PRONTO/NÃO PRONTO] para publicação.

Recomendações:
- ...
- ...
```

---

## ✅ Próximos Passos

Após completar todos os testes:

1. ✅ Todos os testes passaram
2. ✅ Nenhum erro crítico
3. ✅ Performance aceitável
4. ✅ Pronto para publicar

**Se tudo passou, sistema está pronto para publicação!**

---

**Versão**: 1.0.0  
**Data**: Outubro 2025  
**Desenvolvido por**: Manus AI

**Boa sorte com os testes! 🧪**

