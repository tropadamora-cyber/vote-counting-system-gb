# 🪟 Guia Rápido para Windows - 5 Passos em 5 Minutos

## ✅ Pré-requisito: Node.js Instalado

Se não tem Node.js:
1. Aceder a https://nodejs.org/
2. Descarregar LTS
3. Executar instalador
4. Reiniciar computador

---

## 🚀 5 Passos para Começar

### 1️⃣ Extrair Ficheiro ZIP

1. **Descarregar**: `sistema_votacao_completo.zip`
2. **Clicar direito** no ficheiro
3. **Selecionar**: "Extrair tudo..."
4. **Clicar**: "Extrair"

### 2️⃣ Abrir PowerShell na Pasta

1. **Abrir Explorador de Ficheiros** (Windows + E)
2. **Entrar em**: `sistema_votacao_completo`
3. **Clicar na barra de endereço** (onde diz o caminho)
4. **Digitar**: `powershell`
5. **Pressionar Enter**

### 3️⃣ Instalar Dependências

No PowerShell, copiar e colar:

```powershell
npm install
```

⏱️ Aguardar 2-5 minutos

### 4️⃣ Configurar Base de Dados

```powershell
npm run db:migrate
npx ts-node src/scripts/seed.ts
```

⏱️ Aguardar 1 minuto

### 5️⃣ Iniciar Servidor

```powershell
npm run dev
```

⏱️ Aguardar 10 segundos

---

## 🌐 Aceder ao Sistema

**Abrir navegador e ir para:**
```
http://localhost:3000
```

### Fazer Login

| Email | Senha |
|-------|-------|
| admin@example.com | admin123 |

---

## ✅ Pronto!

Sistema está funcionando! 🎉

---

## 🆘 Se Tiver Erro

### "npm: command not found"
- Instalar Node.js: https://nodejs.org/
- Reiniciar computador

### "Port 3000 already in use"
```powershell
$env:PORT=3001
npm run dev
```
Depois aceder a: http://localhost:3001

### "Cannot find module"
```powershell
rm -r node_modules
npm install
```

---

## 📚 Documentação Incluída

- **WINDOWS_GUIA.md** - Guia detalhado para Windows
- **COMECE_AQUI.md** - Guia rápido geral
- **GUIA_TESTES_LOCAL.md** - Testes completos

---

**Pronto em 5 minutos! 🚀**

