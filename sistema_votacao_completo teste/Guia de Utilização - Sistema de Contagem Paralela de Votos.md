# Guia de Utilização - Sistema de Contagem Paralela de Votos

## Visão Geral

O **Sistema de Contagem Paralela de Votos** é uma aplicação web completa desenvolvida para a Guiné-Bissau, permitindo que partidos políticos recolham, processem e analisem dados de apuramento de votos em tempo real, de forma rápida e independente.

## Características Principais

### 1. **Módulo de Autenticação**
- Sistema seguro de login com JWT (JSON Web Tokens)
- Diferentes níveis de acesso baseados em roles (ADMIN, PARTY_LEADER, REGIONAL_COORDINATOR, DELEGATE)
- Gestão de sessões de utilizador

### 2. **Módulo de Configuração**
- Cadastro de círculos eleitorais (29 no total, conforme Lei Eleitoral da Guiné-Bissau)
- Gestão de partidos políticos e candidatos
- Atribuição de delegados a círculos eleitorais
- Criação de mesas/assembleias de voto

### 3. **Módulo de Inserção de Dados**
- Interface intuitiva para delegados submeterem dados de apuramento local
- Recolha de:
  - Número de eleitores inscritos
  - Número de votantes
  - Número de boletins não usados/inutilizados
  - Contagem de votos por partido
  - Votos brancos e votos nulos
- Possibilidade de anexar foto da ata de apuramento assinada

### 4. **Módulo de Processamento**
- Totalização automática de votos por:
  - Assembleia de voto (local)
  - Círculo eleitoral
  - Região
  - Nacional
- Cálculo em tempo real de percentagens e projeções

### 5. **Módulo de Análise e Dashboards**
- Visão geral em tempo real com estatísticas de cobertura
- Resultados nacionais preliminares
- Resultados por círculo eleitoral
- Gráficos e tabelas interativas
- Taxa de cobertura (percentagem de assembleias processadas)

## Acesso ao Sistema

### Iniciar o Servidor

```bash
cd /home/ubuntu/parallel_vote_counting_system
npm run dev
```

O servidor estará disponível em: **http://localhost:3000**

### Credenciais de Teste

| Função | Email | Senha |
|--------|-------|-------|
| Administrador | admin@example.com | admin123 |
| Líder do Partido | leader@example.com | leader123 |
| Delegado 1 | delegate1@example.com | delegate123 |
| Delegado 2 | delegate2@example.com | delegate123 |

## Interface do Sistema

### 1. Tela de Login
- Acesso seguro com email e senha
- Redirecionamento automático para dashboard após login bem-sucedido

### 2. Dashboard Principal
Dividido em seções:

#### **Visão Geral**
- Estatísticas de cobertura
- Total de assembleias de voto
- Submissões recebidas e verificadas
- Percentagem de cobertura
- Resultados nacionais preliminares

#### **Submissões**
- Lista de todas as submissões de dados
- Status de cada submissão (PENDING, VERIFIED, REJECTED)
- Informações sobre votantes e votos nulos

#### **Resultados**
- Seleção de círculo eleitoral
- Visualização de resultados por círculo
- Distribuição de votos por partido
- Percentagens de votação

#### **Círculos**
- Lista de todos os círculos eleitorais
- Informações sobre região e número de deputados
- Número de mesas de voto em cada círculo

#### **Partidos**
- Lista de partidos políticos
- Siglas dos partidos
- Número de candidatos por partido

## Fluxo de Utilização

### Para Delegados

1. **Fazer Login**
   - Aceder ao sistema com credenciais fornecidas
   - Selecionar o círculo atribuído

2. **Submeter Dados**
   - Após apuramento local, aceder ao formulário de submissão
   - Preencher:
     - Número de eleitores inscritos
     - Número de votantes
     - Contagem de votos por partido
     - Votos brancos e nulos
   - Anexar foto da ata assinada
   - Submeter dados

3. **Acompanhar Status**
   - Verificar se a submissão foi recebida
   - Aguardar verificação pela liderança do partido

### Para Liderança do Partido

1. **Fazer Login**
   - Aceder com credenciais de PARTY_LEADER ou ADMIN

2. **Acompanhar Resultados em Tempo Real**
   - Visualizar dashboard com estatísticas de cobertura
   - Consultar resultados nacionais preliminares
   - Analisar resultados por círculo

3. **Verificar Submissões**
   - Revisar submissões pendentes
   - Validar dados de apuramento
   - Aprovar ou rejeitar submissões

4. **Gerar Relatórios**
   - Exportar dados de resultados
   - Analisar tendências por região/círculo

## Estrutura de Dados

### Modelos Principais

**User**
- Utilizadores do sistema com diferentes roles
- Autenticação via JWT

**ElectoralCircle**
- Círculos eleitorais (29 no total)
- Informações sobre região e número de deputados

**VotingAssembly**
- Mesas/Assembleias de voto
- Associadas a um círculo eleitoral

**Party**
- Partidos políticos e coligações
- Informações sobre candidatos

**DataSubmission**
- Submissões de dados de apuramento local
- Status de verificação

**Vote**
- Contagem de votos por partido
- Associada a uma submissão de dados

**CircleResult & NationalResult**
- Resultados totalizados
- Cálculos automáticos

## API Endpoints

### Autenticação
```
POST /api/auth/register      - Registar novo utilizador
POST /api/auth/login         - Fazer login
```

### Círculos Eleitorais
```
GET    /api/circles          - Listar todos os círculos
GET    /api/circles/:id      - Obter detalhes de um círculo
POST   /api/circles          - Criar novo círculo (ADMIN/PARTY_LEADER)
PUT    /api/circles/:id      - Atualizar círculo (ADMIN/PARTY_LEADER)
DELETE /api/circles/:id      - Eliminar círculo (ADMIN)
```

### Partidos
```
GET    /api/parties          - Listar todos os partidos
GET    /api/parties/:id      - Obter detalhes de um partido
POST   /api/parties          - Criar novo partido (ADMIN/PARTY_LEADER)
PUT    /api/parties/:id      - Atualizar partido (ADMIN/PARTY_LEADER)
DELETE /api/parties/:id      - Eliminar partido (ADMIN)
```

### Delegados
```
POST   /api/delegates/assign - Atribuir delegado a um círculo
GET    /api/delegates/circle/:circleId - Listar delegados de um círculo
GET    /api/delegates/user/:userId     - Listar círculos de um delegado
DELETE /api/delegates/:id    - Remover atribuição
```

### Submissões de Dados
```
POST   /api/submissions      - Submeter dados de apuramento
GET    /api/submissions      - Listar todas as submissões
GET    /api/submissions/:id  - Obter detalhes de uma submissão
PUT    /api/submissions/:id/verify - Verificar/rejeitar submissão
```

### Resultados
```
GET    /api/results/national           - Obter resultados nacionais
GET    /api/results/circle/:circleId   - Obter resultados de um círculo
GET    /api/results/coverage/stats     - Obter estatísticas de cobertura
```

## Conformidade Legal

O sistema foi desenvolvido em conformidade com a **Lei Eleitoral da Guiné-Bissau**, incluindo:

- **Lei nº 10/2013**: Lei eleitoral para o Presidente da República e Assembleia Nacional Popular
- **Lei nº 11/2013**: Lei do Recenseamento Eleitoral
- **Lei nº 12/2013**: Lei da Comissão Nacional de Eleições

### Procedimentos Implementados

1. **Apuramento Local** (Artigos 79-82)
   - Contagem de votos nas mesas de voto
   - Separação de votos nulos e em branco
   - Lavratura de ata de apuramento

2. **Apuramento por Círculo** (Artigos 83-85)
   - Totalização de votos por círculo
   - Verificação e confrontação de resultados

3. **Apuramento Regional** (Artigos 86-89)
   - Centralização de resultados por região
   - Lavratura de ata de apuramento regional

4. **Apuramento Nacional** (Artigos 90-97)
   - Centralização de resultados nacionais
   - Distribuição de mandatos
   - Publicação de resultados oficiais

## Segurança

- **Autenticação**: JWT com expiração de 24 horas
- **Autorização**: Controle de acesso baseado em roles
- **Criptografia**: Senhas criptografadas com bcryptjs
- **Validação**: Validação de entrada em todos os endpoints
- **CORS**: Configurado para acesso seguro

## Manutenção e Suporte

### Backup da Base de Dados
```bash
cp /home/ubuntu/parallel_vote_counting_system/prisma/dev.db /backup/dev.db.backup
```

### Consultar Base de Dados
```bash
npm run db:studio
```

### Logs do Servidor
Verificar a saída do console para mensagens de erro e informações de depuração.

## Próximos Passos

1. **Implementar Upload de Fotos**: Integração com S3 ou serviço de armazenamento
2. **Notificações em Tempo Real**: WebSockets para atualizações automáticas
3. **Relatórios Avançados**: Geração de PDFs e gráficos detalhados
4. **Integração com CNE**: Conexão com sistemas oficiais de apuramento
5. **App Móvel**: Desenvolvimento de aplicação nativa para iOS/Android
6. **Testes Automatizados**: Suite completa de testes unitários e de integração

## Contacto e Suporte

Para questões, sugestões ou problemas, contacte a equipa de desenvolvimento.

---

**Versão**: 1.0.0  
**Data**: Outubro 2025  
**Desenvolvido por**: Manus AI

