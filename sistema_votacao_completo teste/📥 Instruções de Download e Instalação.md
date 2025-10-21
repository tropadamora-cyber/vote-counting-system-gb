# 📥 Instruções de Download e Instalação

## 🎯 Arquivos Disponíveis

Existem **dois arquivos comprimidos** com o código completo do sistema:

### 1. **vote_counting_system_gb_completo.tar.gz** (60 KB)
- **Formato**: TAR.GZ (comprimido)
- **Tamanho**: 60 KB
- **Compatibilidade**: Linux, macOS, Windows (com 7-Zip ou WinRAR)
- **Recomendado para**: Linux e macOS

### 2. **vote_counting_system_gb_completo.zip** (76 KB)
- **Formato**: ZIP
- **Tamanho**: 76 KB
- **Compatibilidade**: Windows, macOS, Linux
- **Recomendado para**: Windows

---

## 📥 Como Fazer Download

### Opção 1: Linha de Comando (Linux/macOS)

```bash
# Fazer download do arquivo TAR.GZ
wget https://seu-servidor.com/vote_counting_system_gb_completo.tar.gz

# Ou usando curl
curl -O https://seu-servidor.com/vote_counting_system_gb_completo.tar.gz
```

### Opção 2: Navegador Web
1. Aceder a https://seu-servidor.com/downloads/
2. Clicar em `vote_counting_system_gb_completo.tar.gz` ou `.zip`
3. Fazer download

### Opção 3: GitHub (Se publicado)
```bash
git clone https://github.com/seu-usuario/vote-counting-system-gb.git
```

---

## 📦 Como Extrair

### Linux/macOS (TAR.GZ)

```bash
# Extrair arquivo
tar -xzf vote_counting_system_gb_completo.tar.gz

# Entrar na pasta
cd parallel_vote_counting_system

# Ver conteúdo
ls -la
```

### Windows (ZIP)

**Opção A: Explorador de Ficheiros**
1. Clicar com botão direito no arquivo `.zip`
2. Selecionar "Extrair tudo..."
3. Escolher pasta de destino
4. Clicar "Extrair"

**Opção B: Linha de Comando (PowerShell)**
```powershell
# Extrair
Expand-Archive vote_counting_system_gb_completo.zip -DestinationPath .

# Entrar na pasta
cd parallel_vote_counting_system
```

**Opção C: 7-Zip ou WinRAR**
1. Clicar com botão direito
2. Selecionar "7-Zip" → "Extrair aqui"
3. Ou "WinRAR" → "Extrair aqui"

### macOS (ZIP)

```bash
# Extrair (automático ao fazer download)
# Ou manualmente:
unzip vote_counting_system_gb_completo.zip

# Entrar na pasta
cd parallel_vote_counting_system
```

---

## 🚀 Instalação Após Extrair

### 1. Instalar Dependências

```bash
# Entrar na pasta do projeto
cd parallel_vote_counting_system

# Instalar dependências Node.js
npm install

# Aguardar conclusão (2-5 minutos)
```

### 2. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar arquivo .env (opcional)
nano .env
# Ou abrir em editor de texto
```

### 3. Criar Base de Dados

```bash
# Executar migrações
npm run db:migrate

# Ou usar Prisma Studio
npm run db:studio
```

### 4. Popular Base de Dados com Dados de Exemplo

```bash
# Executar script de população
npx ts-node src/scripts/seed.ts
```

### 5. Iniciar Servidor

```bash
# Modo desenvolvimento
npm run dev

# Servidor iniciará em http://localhost:3000
```

---

## 📋 Conteúdo do Arquivo

Após extrair, você terá:

```
parallel_vote_counting_system/
├── src/                              # Código TypeScript
│   ├── server.ts                    # Servidor principal
│   ├── middleware/auth.ts           # Autenticação
│   ├── routes/                      # 6 módulos de API
│   │   ├── auth.ts
│   │   ├── circles.ts
│   │   ├── parties.ts
│   │   ├── delegates.ts
│   │   ├── dataSubmission.ts
│   │   └── results.ts
│   └── scripts/seed.ts              # Dados de exemplo
├── public/                           # Frontend
│   ├── index.html                   # Interface web
│   ├── styles.css                   # Estilos
│   └── app.js                       # Lógica JavaScript
├── prisma/                           # Base de dados
│   ├── schema.prisma                # Esquema
│   └── migrations/                  # Histórico de mudanças
├── package.json                      # Dependências
├── tsconfig.json                     # Configuração TypeScript
├── Dockerfile                        # Containerização
├── docker-compose.yml                # Orquestração
├── nginx.conf                        # Configuração web
├── Procfile                          # Heroku
├── railway.json                      # Railway.app
├── README.md                         # Documentação técnica
├── GUIA_UTILIZACAO.md                # Manual do utilizador
├── DEPLOYMENT.md                     # Guia de implantação
├── PUBLICACAO.md                     # Instruções de publicação
├── MANUTENCAO_ATUALIZACOES.md        # Guia de manutenção
└── GUIA_RAPIDO_ATUALIZACOES.md       # Guia rápido

NÃO INCLUÍDOS (por serem gerados automaticamente):
✗ node_modules/                      # Instalado com npm install
✗ dist/                              # Gerado com npm run build
✗ .git/                              # Repositório Git
✗ *.db                               # Base de dados (criada automaticamente)
✗ .env                               # Variáveis de ambiente (use .env.example)
```

---

## ✅ Verificar Instalação

Após completar os passos acima:

```bash
# Verificar se servidor está funcionando
curl http://localhost:3000/health

# Resposta esperada:
# {"status":"ok","message":"Sistema de Contagem Paralela de Votos está operacional"}
```

---

## 🌐 Acessar Sistema

Após iniciar o servidor:

1. **Abrir navegador**
   ```
   http://localhost:3000
   ```

2. **Fazer login com credenciais de teste**
   - Email: `admin@example.com`
   - Senha: `admin123`

3. **Explorar funcionalidades**
   - Ver dashboard
   - Submeter dados
   - Consultar resultados

---

## 🐳 Alternativa: Usar Docker

Se tiver Docker instalado:

```bash
# 1. Extrair arquivo
tar -xzf vote_counting_system_gb_completo.tar.gz
cd parallel_vote_counting_system

# 2. Build imagem Docker
docker build -t vote-counting-system .

# 3. Executar com Docker Compose
docker-compose up -d

# 4. Acessar
# http://localhost:3000
```

---

## 🆘 Problemas Comuns

### "npm: command not found"
**Solução**: Instalar Node.js
```bash
# Linux
sudo apt-get install nodejs npm

# macOS
brew install node

# Windows
Fazer download de https://nodejs.org/
```

### "Cannot find module"
**Solução**: Reinstalar dependências
```bash
rm -rf node_modules
npm install
```

### "Port 3000 already in use"
**Solução**: Usar porta diferente
```bash
PORT=3001 npm run dev
```

### "Database connection error"
**Solução**: Executar migrações
```bash
npm run db:migrate
```

---

## 📚 Documentação

Após extrair, consulte:

| Ficheiro | Descrição |
|----------|-----------|
| README.md | Guia técnico completo |
| GUIA_UTILIZACAO.md | Manual do utilizador |
| DEPLOYMENT.md | Como implantar em produção |
| PUBLICACAO.md | Como publicar online |
| MANUTENCAO_ATUALIZACOES.md | Como manter e atualizar |
| GUIA_RAPIDO_ATUALIZACOES.md | Guia rápido de atualizações |

---

## 🚀 Próximos Passos

1. ✅ Fazer download do arquivo
2. ✅ Extrair arquivo
3. ✅ Instalar dependências (`npm install`)
4. ✅ Configurar BD (`npm run db:migrate`)
5. ✅ Popular dados (`npx ts-node src/scripts/seed.ts`)
6. ✅ Iniciar servidor (`npm run dev`)
7. ✅ Testar em http://localhost:3000
8. ✅ Publicar em produção (seguir PUBLICACAO.md)

---

## 📞 Suporte

Se encontrar problemas:

1. Verificar mensagens de erro
2. Consultar documentação (README.md, DEPLOYMENT.md)
3. Verificar se Node.js está instalado
4. Tentar reinstalar dependências
5. Contactar suporte se problema persistir

---

## ✨ Resumo

| Passo | Comando |
|-------|---------|
| 1. Extrair | `tar -xzf vote_counting_system_gb_completo.tar.gz` |
| 2. Entrar | `cd parallel_vote_counting_system` |
| 3. Instalar | `npm install` |
| 4. Migrar BD | `npm run db:migrate` |
| 5. Popular | `npx ts-node src/scripts/seed.ts` |
| 6. Iniciar | `npm run dev` |
| 7. Acessar | `http://localhost:3000` |

---

**Versão**: 1.0.0  
**Data**: Outubro 2025  
**Desenvolvido por**: Manus AI

**Pronto para começar! 🚀**

