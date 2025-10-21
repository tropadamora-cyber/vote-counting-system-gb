# 🚀 Guia de Instalação Local - Sistema de Contagem Paralela de Votos

## 📋 Pré-requisitos

Antes de começar, certifique-se que tem instalado:

- ✅ **Node.js** 16+ (https://nodejs.org/)
- ✅ **npm** 7+ (incluído com Node.js)
- ✅ **Git** (https://git-scm.com/) - Opcional

### Verificar Instalação

```bash
# Verificar Node.js
node --version
# Esperado: v16.0.0 ou superior

# Verificar npm
npm --version
# Esperado: v7.0.0 ou superior
```

---

## 📥 Passo 1: Extrair o Arquivo

### Windows
1. Clicar com botão direito no arquivo `.zip`
2. Selecionar "Extrair tudo..."
3. Escolher pasta de destino
4. Clicar "Extrair"

### macOS/Linux
```bash
# Se for .tar.gz
tar -xzf sistema_votacao_completo.tar.gz

# Se for .zip
unzip sistema_votacao_completo.zip
```

---

## 📂 Passo 2: Entrar na Pasta

```bash
cd sistema_votacao_completo
```

---

## 📦 Passo 3: Instalar Dependências

```bash
npm install
```

**Tempo esperado**: 2-5 minutos

**Resposta esperada**:
```
added 266 packages in 2m
```

---

## 🗄️ Passo 4: Configurar Base de Dados

### Opção A: SQLite (Recomendado para Teste Local)

SQLite é automático, apenas executar migrações:

```bash
npm run db:migrate
```

**Resposta esperada**:
```
Prisma schema loaded
Datasource "db": SQLite database "dev.db"
✔ Generated Prisma Client
✔ Database migration completed
```

### Opção B: MySQL/MariaDB (Alternativa)

Se preferir usar MySQL localmente:

1. **Criar base de dados**
```sql
CREATE DATABASE vote_counting;
CREATE USER 'votecounting'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON vote_counting.* TO 'votecounting'@'localhost';
FLUSH PRIVILEGES;
```

2. **Editar .env**
```bash
nano .env
```

Alterar:
```env
DATABASE_URL="mysql://votecounting:password123@localhost:3306/vote_counting"
```

3. **Executar migrações**
```bash
npm run db:migrate
```

4. **Importar dados de exemplo** (Opcional)
```bash
mysql -u votecounting -p vote_counting < schema.sql
```

---

## 🌱 Passo 5: Popular Base de Dados com Dados de Exemplo

```bash
npx ts-node src/scripts/seed.ts
```

**Resposta esperada**:
```
Iniciando população da base de dados...
✓ Utilizador admin criado: admin@example.com
✓ Utilizador líder criado: leader@example.com
✓ Delegado 1 criado: delegate1@example.com
✓ Delegado 2 criado: delegate2@example.com
✓ Círculo eleitoral criado: Catió / Komo
...
✅ Base de dados populada com sucesso!
```

---

## 🚀 Passo 6: Iniciar o Servidor

```bash
npm run dev
```

**Resposta esperada**:
```
Servidor iniciado em http://localhost:3000
Ambiente: development
```

---

## 🌐 Passo 7: Aceder ao Sistema

1. **Abrir navegador**
   ```
   http://localhost:3000
   ```

2. **Fazer login com credenciais de teste**

   | Função | Email | Senha |
   |--------|-------|-------|
   | Admin | admin@example.com | admin123 |
   | Líder | leader@example.com | leader123 |
   | Delegado 1 | delegate1@example.com | delegate123 |
   | Delegado 2 | delegate2@example.com | delegate123 |

3. **Explorar o sistema**
   - Dashboard
   - Submissões
   - Resultados
   - Círculos
   - Partidos

---

## ✅ Verificar Instalação

### Teste 1: Health Check

```bash
curl http://localhost:3000/health
```

**Resposta esperada**:
```json
{"status":"ok","message":"Sistema de Contagem Paralela de Votos está operacional"}
```

### Teste 2: Fazer Login via API

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**Resposta esperada**:
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

---

## 📁 Estrutura de Ficheiros

```
sistema_votacao_completo/
├── src/                              # Código TypeScript
│   ├── server.ts                    # Servidor principal
│   ├── middleware/auth.ts           # Autenticação
│   ├── routes/                      # 6 módulos de API
│   │   ├── auth.ts                  # Autenticação
│   │   ├── circles.ts               # Círculos eleitorais
│   │   ├── parties.ts               # Partidos
│   │   ├── delegates.ts             # Delegados
│   │   ├── dataSubmission.ts        # Submissão de dados
│   │   └── results.ts               # Resultados
│   └── scripts/seed.ts              # Dados de exemplo
├── public/                           # Frontend
│   ├── index.html                   # Interface web
│   ├── styles.css                   # Estilos
│   └── app.js                       # Lógica JavaScript
├── prisma/                           # Base de dados
│   ├── schema.prisma                # Esquema
│   └── migrations/                  # Histórico
├── package.json                      # Dependências
├── tsconfig.json                     # Config TypeScript
├── .env                              # Variáveis de ambiente
├── .env.example                      # Exemplo de .env
├── schema.sql                        # SQL para MySQL
├── README.md                         # Documentação
├── GUIA_UTILIZACAO.md                # Manual do utilizador
├── DEPLOYMENT.md                     # Deploy
├── PUBLICACAO.md                     # Publicação
├── MANUTENCAO_ATUALIZACOES.md        # Manutenção
└── GUIA_RAPIDO_ATUALIZACOES.md       # Atualizações rápidas
```

---

## 🆘 Problemas Comuns

### Erro: "npm: command not found"
**Solução**: Instalar Node.js de https://nodejs.org/

### Erro: "Cannot find module"
**Solução**: Reinstalar dependências
```bash
rm -rf node_modules
npm install
```

### Erro: "Port 3000 already in use"
**Solução**: Usar porta diferente
```bash
PORT=3001 npm run dev
```

### Erro: "Database connection error"
**Solução**: Executar migrações
```bash
npm run db:migrate
```

### Erro: "Cannot GET /"
**Solução**: Servidor não iniciou
```bash
npm run dev
```

### Erro de Login
**Solução**: Verificar credenciais
```
Email: admin@example.com
Senha: admin123
```

---

## 🧪 Executar Testes

Consultar `GUIA_TESTES_LOCAL.md` para testes completos.

---

## 📊 Comandos Úteis

```bash
# Iniciar servidor (desenvolvimento)
npm run dev

# Compilar TypeScript
npm run build

# Iniciar servidor (produção)
npm start

# Executar migrações de BD
npm run db:migrate

# Abrir Prisma Studio (gerenciar BD)
npm run db:studio

# Popular BD com dados de exemplo
npx ts-node src/scripts/seed.ts

# Parar servidor
Ctrl+C
```

---

## 🔧 Configuração Avançada

### Alterar Porta

Editar `.env`:
```env
PORT=3001
```

### Alterar Base de Dados

Editar `.env`:
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/vote_counting"
```

### Alterar JWT Secret

Editar `.env`:
```env
JWT_SECRET="sua-chave-secreta-aqui"
```

---

## 📚 Documentação

Após instalar, consulte:

| Ficheiro | Descrição |
|----------|-----------|
| README.md | Guia técnico |
| GUIA_UTILIZACAO.md | Manual do utilizador |
| GUIA_TESTES_LOCAL.md | Testes completos |
| DEPLOYMENT.md | Deploy em produção |
| PUBLICACAO.md | Publicação online |
| MANUTENCAO_ATUALIZACOES.md | Manutenção |

---

## ✅ Próximos Passos

1. ✅ Instalar dependências
2. ✅ Configurar base de dados
3. ✅ Popular dados de exemplo
4. ✅ Iniciar servidor
5. ✅ Fazer login
6. ✅ Explorar sistema
7. ✅ Executar testes (GUIA_TESTES_LOCAL.md)
8. ✅ Publicar em produção (PUBLICACAO.md)

---

## 🎉 Pronto!

Sistema está instalado e pronto para teste local!

**Aceder a**: http://localhost:3000

---

**Versão**: 1.0.0  
**Data**: Outubro 2025  
**Desenvolvido por**: Manus AI

**Boa sorte! 🚀**

