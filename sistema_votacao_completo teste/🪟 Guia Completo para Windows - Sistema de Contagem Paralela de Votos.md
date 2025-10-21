# 🪟 Guia Completo para Windows - Sistema de Contagem Paralela de Votos

## ✅ Pré-requisitos para Windows

### 1. Instalar Node.js

1. **Aceder a**: https://nodejs.org/
2. **Clicar em**: "Download" (versão LTS recomendada)
3. **Executar instalador** (.msi)
4. **Seguir passos** (Next, Next, Finish)
5. **Reiniciar computador** (importante!)

### 2. Verificar Instalação

Abrir **PowerShell** ou **Command Prompt** (cmd):

```powershell
node --version
npm --version
```

Deve mostrar versões (ex: v18.0.0, 9.0.0)

---

## 📥 Passo 1: Fazer Download

### Opção A: Ficheiro ZIP (Recomendado para Windows)

1. **Descarregar**: `sistema_votacao_completo.zip`
2. **Guardar em**: `C:\Users\SeuNome\Documents\`

### Opção B: Ficheiro TAR.GZ

Se preferir, também pode usar `.tar.gz` (requer 7-Zip ou WinRAR)

---

## 📂 Passo 2: Extrair Ficheiro ZIP

### Método 1: Explorador de Ficheiros (Mais Fácil)

1. **Abrir Explorador de Ficheiros**
   - Tecla Windows + E

2. **Navegar para ficheiro**
   - `C:\Users\SeuNome\Documents\sistema_votacao_completo.zip`

3. **Clicar com botão direito**
   - Selecionar "Extrair tudo..."

4. **Escolher pasta de destino**
   - Recomendado: `C:\Users\SeuNome\Documents\`

5. **Clicar "Extrair"**

6. **Aguardar conclusão**
   - Deve aparecer pasta `sistema_votacao_completo`

### Método 2: PowerShell

```powershell
# Navegar para pasta
cd C:\Users\SeuNome\Documents

# Extrair
Expand-Archive sistema_votacao_completo.zip -DestinationPath .

# Entrar na pasta
cd sistema_votacao_completo
```

---

## 🖥️ Passo 3: Abrir PowerShell na Pasta

### Método 1: Explorador (Mais Fácil)

1. **Abrir Explorador de Ficheiros**
2. **Navegar para**: `C:\Users\SeuNome\Documents\sistema_votacao_completo`
3. **Clicar em cima da pasta** (na barra de endereço)
4. **Digitar**: `powershell`
5. **Pressionar Enter**

PowerShell abre nessa pasta.

### Método 2: Manual

1. **Abrir PowerShell**
   - Tecla Windows → digitar "PowerShell" → Enter

2. **Navegar para pasta**
   ```powershell
   cd C:\Users\SeuNome\Documents\sistema_votacao_completo
   ```

---

## 📦 Passo 4: Instalar Dependências

No PowerShell, executar:

```powershell
npm install
```

**Tempo esperado**: 2-5 minutos

**Resposta esperada**:
```
added 266 packages in 2m 45s
```

⚠️ **Se tiver erro**: Reiniciar PowerShell e tentar novamente

---

## 🗄️ Passo 5: Configurar Base de Dados

No PowerShell, executar:

```powershell
npm run db:migrate
```

**Resposta esperada**:
```
✔ Database migration completed
```

---

## 🌱 Passo 6: Popular Base de Dados

No PowerShell, executar:

```powershell
npx ts-node src/scripts/seed.ts
```

**Resposta esperada**:
```
✅ Base de dados populada com sucesso!
```

---

## 🚀 Passo 7: Iniciar Servidor

No PowerShell, executar:

```powershell
npm run dev
```

**Resposta esperada**:
```
Servidor iniciado em http://localhost:3000
Ambiente: development
```

⚠️ **Não fechar PowerShell!** Manter aberto enquanto usar o sistema.

---

## 🌐 Passo 8: Aceder ao Sistema

1. **Abrir navegador** (Chrome, Firefox, Edge, etc.)

2. **Digitar na barra de endereço**:
   ```
   http://localhost:3000
   ```

3. **Pressionar Enter**

4. **Fazer login com credenciais de teste**:

   | Função | Email | Senha |
   |--------|-------|-------|
   | Admin | admin@example.com | admin123 |
   | Líder | leader@example.com | leader123 |
   | Delegado 1 | delegate1@example.com | delegate123 |
   | Delegado 2 | delegate2@example.com | delegate123 |

---

## ✅ Verificar Instalação

### Teste 1: Verificar Servidor

No PowerShell (em outra janela), executar:

```powershell
curl http://localhost:3000/health
```

Deve retornar:
```json
{"status":"ok","message":"Sistema de Contagem Paralela de Votos está operacional"}
```

### Teste 2: Fazer Login

1. Aceder a http://localhost:3000
2. Fazer login com admin@example.com / admin123
3. Deve ver dashboard

---

## 🆘 Problemas Comuns no Windows

### Erro: "npm: command not found"

**Solução**:
1. Instalar Node.js de https://nodejs.org/
2. Reiniciar computador
3. Tentar novamente

### Erro: "Port 3000 already in use"

**Solução**: Usar porta diferente

```powershell
$env:PORT=3001
npm run dev
```

Depois aceder a: http://localhost:3001

### Erro: "Cannot find module"

**Solução**: Reinstalar dependências

```powershell
rm -r node_modules
npm install
```

### Erro: "Database connection error"

**Solução**: Executar migrações

```powershell
npm run db:migrate
```

### PowerShell não reconhece comandos

**Solução**: Fechar e reabrir PowerShell após instalar Node.js

---

## 🎨 Personalizar Porta (Opcional)

Se quiser usar porta diferente de 3000:

### Método 1: Variável de Ambiente

```powershell
$env:PORT=3001
npm run dev
```

Depois aceder a: http://localhost:3001

### Método 2: Editar .env

1. **Abrir ficheiro** `.env` com Notepad
2. **Encontrar linha**: `PORT=3000`
3. **Alterar para**: `PORT=3001`
4. **Guardar** (Ctrl+S)
5. **Reiniciar servidor**

---

## 📁 Ficheiros Importantes

| Ficheiro | Descrição |
|----------|-----------|
| COMECE_AQUI.md | Guia rápido |
| INSTALAR_LOCALMENTE.md | Instalação detalhada |
| GUIA_TESTES_LOCAL.md | Testes completos |
| README.md | Documentação técnica |
| .env | Configurações |
| package.json | Dependências |

---

## 🧪 Próximos Passos

Após ter sistema funcionando:

1. **Ler COMECE_AQUI.md** - Visão geral
2. **Ler GUIA_TESTES_LOCAL.md** - Testes completos
3. **Explorar sistema** - Fazer login e testar
4. **Ler PUBLICACAO.md** - Quando quiser publicar

---

## 💡 Dicas para Windows

### Abrir PowerShell Rapidamente

1. **Tecla Windows + X**
2. **Selecionar "Windows PowerShell"** ou "Terminal"

### Navegar Pastas no PowerShell

```powershell
# Ver pasta atual
pwd

# Listar ficheiros
ls

# Entrar em pasta
cd nome_pasta

# Voltar atrás
cd ..

# Ir para Documents
cd ~\Documents
```

### Copiar/Colar no PowerShell

- **Copiar**: Ctrl+C
- **Colar**: Ctrl+V (ou Shift+Insert)

---

## 🎯 Resumo Rápido

| Passo | Comando | Tempo |
|-------|---------|-------|
| 1. Extrair | Clicar direito → Extrair | 30s |
| 2. Abrir PowerShell | Explorador → powershell | 10s |
| 3. Instalar | npm install | 3min |
| 4. Migrar BD | npm run db:migrate | 30s |
| 5. Popular | npx ts-node src/scripts/seed.ts | 30s |
| 6. Iniciar | npm run dev | 10s |
| 7. Aceder | http://localhost:3000 | - |

**Total: ~5 minutos**

---

## ✨ Pronto!

Sistema está funcionando em http://localhost:3000

**Aproveite! 🎉**

---

**Versão**: 1.0.0  
**Data**: Outubro 2025  
**Desenvolvido por**: Manus AI

**Guia Específico para Windows ✅**

