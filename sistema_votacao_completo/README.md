# Sistema de Contagem Paralela de Votos - Guiné-Bissau

Um sistema completo para recolha e totalização de dados de atas de apuramento parcial (local) assinadas pelos delegados do partido, permitindo uma projeção rápida e independente dos resultados eleitorais.

## Características

- **Módulo de Configuração:** Gestão de círculos eleitorais, partidos, candidatos e delegados
- **Módulo de Inserção de Dados:** Interface móvel otimizada para recolha rápida de dados
- **Módulo de Processamento:** Totalização automática de votos por círculo, região e nacional
- **Módulo de Análise:** Dashboards em tempo real com resultados e projeções
- **Segurança:** Autenticação JWT, autorização por roles e validação de dados

## Requisitos

- Node.js 16+ 
- npm ou yarn
- SQLite3

## Instalação

1. **Clone ou extraia o projeto:**
```bash
cd parallel_vote_counting_system
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o ficheiro `.env` e configure:
- `DATABASE_URL`: Caminho da base de dados SQLite
- `PORT`: Porta do servidor (padrão: 3000)
- `JWT_SECRET`: Chave secreta para tokens JWT

4. **Crie a base de dados:**
```bash
npm run db:migrate
```

## Uso

### Desenvolvimento

Para iniciar o servidor em modo desenvolvimento:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

### Produção

1. **Compile o TypeScript:**
```bash
npm run build
```

2. **Inicie o servidor:**
```bash
npm start
```

## Estrutura do Projeto

```
parallel_vote_counting_system/
├── src/
│   ├── server.ts              # Servidor principal
│   ├── middleware/
│   │   └── auth.ts            # Middleware de autenticação
│   └── routes/
│       ├── auth.ts            # Rotas de autenticação
│       ├── circles.ts         # Rotas de círculos eleitorais
│       ├── parties.ts         # Rotas de partidos
│       ├── delegates.ts       # Rotas de delegados
│       ├── dataSubmission.ts  # Rotas de submissão de dados
│       └── results.ts         # Rotas de resultados
├── prisma/
│   ├── schema.prisma          # Esquema da base de dados
│   └── migrations/            # Histórico de migrações
├── dist/                      # Código compilado (gerado)
├── package.json               # Dependências do projeto
├── tsconfig.json              # Configuração do TypeScript
└── README.md                  # Este ficheiro
```

## API Endpoints

### Autenticação
- `POST /api/auth/register` - Registar novo utilizador
- `POST /api/auth/login` - Fazer login

### Círculos Eleitorais
- `GET /api/circles` - Listar todos os círculos
- `GET /api/circles/:id` - Obter detalhes de um círculo
- `POST /api/circles` - Criar novo círculo
- `PUT /api/circles/:id` - Atualizar círculo
- `DELETE /api/circles/:id` - Eliminar círculo

### Partidos
- `GET /api/parties` - Listar todos os partidos
- `GET /api/parties/:id` - Obter detalhes de um partido
- `POST /api/parties` - Criar novo partido
- `PUT /api/parties/:id` - Atualizar partido
- `DELETE /api/parties/:id` - Eliminar partido

### Delegados
- `POST /api/delegates/assign` - Atribuir delegado a um círculo
- `GET /api/delegates/circle/:circleId` - Listar delegados de um círculo
- `GET /api/delegates/user/:userId` - Listar círculos de um delegado
- `DELETE /api/delegates/:id` - Remover atribuição

### Submissão de Dados
- `POST /api/submissions` - Submeter dados de apuramento
- `GET /api/submissions` - Listar todas as submissões
- `GET /api/submissions/:id` - Obter detalhes de uma submissão
- `PUT /api/submissions/:id/verify` - Verificar/rejeitar submissão

### Resultados
- `GET /api/results/national` - Obter resultados nacionais
- `GET /api/results/circle/:circleId` - Obter resultados de um círculo
- `GET /api/results/coverage/stats` - Obter estatísticas de cobertura

## Modelos de Dados

### User
- Utilizadores do sistema com diferentes roles (ADMIN, PARTY_LEADER, REGIONAL_COORDINATOR, DELEGATE)

### ElectoralCircle
- Círculos eleitorais da Guiné-Bissau (29 no total)

### VotingAssembly
- Mesas/Assembleias de voto dentro de cada círculo

### Party
- Partidos políticos e coligações

### Candidate
- Candidatos de cada partido

### DataSubmission
- Submissões de dados de apuramento local

### Vote
- Contagem de votos por partido em cada submissão

### CircleResult & NationalResult
- Resultados totalizados por círculo e nacional

## Segurança

- **Autenticação:** JWT (JSON Web Tokens)
- **Autorização:** Controle de acesso por roles
- **Validação:** Validação de entrada em todos os endpoints
- **Criptografia:** Senhas criptografadas com bcryptjs

## Próximos Passos

1. **Frontend:** Desenvolver interface web/móvel para delegados
2. **Dashboards:** Criar visualizações avançadas de resultados
3. **Relatórios:** Implementar geração de relatórios em PDF
4. **Integração:** Conectar com sistemas de observação internacional
5. **Testes:** Adicionar testes unitários e de integração

## Suporte

Para questões ou problemas, contacte a equipa de desenvolvimento.

## Licença

ISC

