# 🔑 Como Criar Token no DigitalOcean - Guia Passo a Passo

## 📋 Pré-requisitos

- ✅ Conta DigitalOcean criada (https://www.digitalocean.com)
- ✅ Email verificado
- ✅ Método de pagamento adicionado

---

## 🚀 Passo 1: Aceder ao Painel de Controlo

1. **Abrir navegador**
   - Aceder a: https://cloud.digitalocean.com

2. **Fazer login**
   - Email: seu-email@example.com
   - Senha: sua-senha
   - Clicar "Log In"

3. **Aguardar carregamento**
   - Será redirecionado para o painel principal

---

## 🔧 Passo 2: Aceder às Configurações de API

### Método 1: Através do Menu (Recomendado)

1. **Clicar no seu avatar** (canto superior direito)
   - Procurar foto de perfil ou inicial

2. **Selecionar "Account"** (ou "Conta")
   - Opção no menu dropdown

3. **Clicar em "API"** (ou "API Tokens")
   - No menu lateral esquerdo

### Método 2: Link Direto

Copiar e colar este URL:
```
https://cloud.digitalocean.com/account/api/tokens
```

---

## 🔐 Passo 3: Gerar Novo Token

1. **Clicar em "Generate New Token"**
   - Botão verde no canto superior direito

2. **Preencher Informações**

   **Token name** (Nome do Token):
   ```
   vote-counting-system-gb
   ```

   **Expiration** (Expiração):
   - Selecionar "No expiration" (Sem expiração)
   - Ou escolher data específica (ex: 1 ano)

   **Scopes** (Permissões):
   - Selecionar:
     ✅ Read (Leitura)
     ✅ Write (Escrita)
   
   **Nota**: Ambas são necessárias para deploy

3. **Clicar "Generate Token"**
   - Botão verde na parte inferior

---

## 📋 Passo 4: Copiar o Token

### ⚠️ IMPORTANTE

Após clicar "Generate Token", será exibido um token assim:

```
dop_v1_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

**COPIAR IMEDIATAMENTE!**

Este token só aparece uma vez. Se fechar a página, terá que gerar um novo.

---

## 💾 Passo 5: Guardar o Token com Segurança

### Opção A: Ficheiro de Texto (Temporário)

1. **Abrir editor de texto**
   - Notepad (Windows)
   - TextEdit (macOS)
   - gedit (Linux)

2. **Colar o token**
   ```
   DigitalOcean Token:
   dop_v1_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
   ```

3. **Guardar ficheiro**
   - Nome: `digitalocean_token.txt`
   - Localização: Pasta do projeto

### Opção B: Variável de Ambiente

```bash
# No terminal, guardar como variável
export DIGITALOCEAN_TOKEN="dop_v1_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz"

# Verificar se foi guardado
echo $DIGITALOCEAN_TOKEN
```

---

## ✅ Verificar se Token Funciona

### Teste Rápido (Linux/macOS)

```bash
# Substituir TOKEN pelo seu token real
curl -X GET "https://api.digitalocean.com/v2/account" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer dop_v1_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz"

# Resposta esperada:
# {"account":{"droplet_limit":25,...}}
```

---

## 🎯 Próximos Passos

Após criar o token:

1. ✅ Token criado e copiado
2. ✅ Guardado com segurança
3. ✅ Testado (opcional)
4. ✅ Pronto para usar na publicação

---

## 📸 Imagens Passo a Passo

### Passo 1: Painel Principal
```
DigitalOcean Dashboard
├── Menu Superior
│   └── Avatar (canto superior direito)
│       └── Account
│           └── API
```

### Passo 2: Página de API
```
API Tokens
├── Generate New Token (botão verde)
│   ├── Token name: vote-counting-system-gb
│   ├── Expiration: No expiration
│   ├── Scopes: Read + Write
│   └── Generate Token (botão)
└── Token gerado (copiar imediatamente!)
```

---

## ⚠️ Segurança do Token

### ✅ FAÇA

- ✅ Guardar em local seguro
- ✅ Usar variáveis de ambiente
- ✅ Nunca commitar no Git
- ✅ Regenerar se comprometido
- ✅ Usar expiração se possível

### ❌ NÃO FAÇA

- ❌ Partilhar token com ninguém
- ❌ Commitar no GitHub
- ❌ Colocar em código
- ❌ Enviar por email
- ❌ Deixar em ficheiros públicos

---

## 🔄 Se Perder o Token

Se fechar a página sem copiar:

1. **Voltar a https://cloud.digitalocean.com/account/api/tokens**
2. **Clicar no token anterior**
3. **Clicar "Revoke"** (eliminar)
4. **Gerar novo token**

---

## 🆘 Problemas Comuns

### "Não vejo opção de API"
- Verificar se está em "Account" (não em "Team")
- Tentar link direto: https://cloud.digitalocean.com/account/api/tokens

### "Token não funciona"
- Verificar se copiou corretamente
- Verificar se tem permissões Read + Write
- Tentar gerar novo token

### "Erro 401 Unauthorized"
- Token expirou
- Token foi revogado
- Token está incorreto
- Gerar novo token

---

## 📝 Resumo

| Passo | Ação |
|-------|------|
| 1 | Aceder a https://cloud.digitalocean.com |
| 2 | Avatar → Account → API |
| 3 | "Generate New Token" |
| 4 | Nome: vote-counting-system-gb |
| 5 | Expiration: No expiration |
| 6 | Scopes: Read + Write |
| 7 | Clicar "Generate Token" |
| 8 | **COPIAR IMEDIATAMENTE** |
| 9 | Guardar com segurança |
| 10 | Pronto para usar! |

---

## 🎉 Pronto!

Após completar estes passos, terá um token válido para publicar o sistema no DigitalOcean.

**Próximo passo**: Usar o token para publicar o sistema.

---

**Versão**: 1.0.0  
**Data**: Outubro 2025  
**Desenvolvido por**: Manus AI

---

## 📞 Precisa de Ajuda?

Se encontrar problemas ao criar o token:

1. Verificar se tem conta DigitalOcean ativa
2. Verificar se email foi verificado
3. Verificar se tem método de pagamento
4. Tentar novamente
5. Contactar suporte DigitalOcean se problema persistir

**Boa sorte! 🚀**

