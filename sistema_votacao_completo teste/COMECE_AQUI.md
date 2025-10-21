# 🚀 COMECE AQUI - Guia Rápido de Teste Local

## ⚡ 5 Passos para Começar em 5 Minutos

### 1️⃣ Instalar Dependências
```bash
npm install
```
⏱️ Tempo: 2-5 minutos

### 2️⃣ Configurar Base de Dados
```bash
npm run db:migrate
```
⏱️ Tempo: 30 segundos

### 3️⃣ Popular com Dados de Exemplo
```bash
npx ts-node src/scripts/seed.ts
```
⏱️ Tempo: 30 segundos

### 4️⃣ Iniciar Servidor
```bash
npm run dev
```
⏱️ Tempo: 10 segundos

### 5️⃣ Abrir no Navegador
```
http://localhost:3000
```

---

## 🔐 Credenciais de Teste

| Função | Email | Senha |
|--------|-------|-------|
| **Admin** | admin@example.com | admin123 |
| **Líder** | leader@example.com | leader123 |
| **Delegado 1** | delegate1@example.com | delegate123 |
| **Delegado 2** | delegate2@example.com | delegate123 |

---

## 📚 Documentação

| Ficheiro | Descrição |
|----------|-----------|
| **INSTALAR_LOCALMENTE.md** | Guia detalhado de instalação |
| **GUIA_TESTES_LOCAL.md** | Testes completos do sistema |
| **README.md** | Documentação técnica |
| **GUIA_UTILIZACAO.md** | Manual do utilizador |
| **schema.sql** | SQL para MySQL (opcional) |

---

## ✅ Verificar Instalação

```bash
# Testar se servidor está funcionando
curl http://localhost:3000/health

# Resposta esperada:
# {"status":"ok","message":"Sistema de Contagem Paralela de Votos está operacional"}
```

---

## 🆘 Problemas?

### "npm: command not found"
Instalar Node.js: https://nodejs.org/

### "Port 3000 already in use"
```bash
PORT=3001 npm run dev
```

### "Cannot find module"
```bash
rm -rf node_modules
npm install
```

---

## 📞 Próximos Passos

1. ✅ Seguir os 5 passos acima
2. ✅ Fazer login com credenciais de teste
3. ✅ Explorar o sistema
4. ✅ Ler GUIA_TESTES_LOCAL.md para testes completos
5. ✅ Ler PUBLICACAO.md para publicar online

---

**Pronto! Sistema está funcionando em http://localhost:3000 🎉**

