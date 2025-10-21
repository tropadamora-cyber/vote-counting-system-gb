# Plano de Implementação Detalhado para o Sistema de Contagem Paralela de Votos na Guiné-Bissau

## 1. Introdução

Este documento apresenta um plano de implementação detalhado para um sistema de contagem paralela de votos, alinhado com a Lei Eleitoral da Guiné-Bissau. O objetivo é fornecer uma projeção rápida e independente dos resultados eleitorais, complementando os processos oficiais e garantindo maior transparência e capacidade de auditoria.

O sistema proposto baseia-se na recolha e totalização de dados das atas de apuramento parcial (local) assinadas pelos delegados do partido, conforme descrito no documento inicial fornecido. A sua estrutura e funcionalidades serão adaptadas para refletir os procedimentos de apuramento em diferentes níveis administrativos, conforme estipulado na legislação eleitoral guineense.

## 2. Módulos do Sistema e Requisitos Legais

### 2.1. Módulo de Configuração (Pré-Eleição)

Este módulo será responsável pela preparação do sistema antes do dia da eleição, integrando a estrutura eleitoral da Guiné-Bissau.

**Requisitos:**

*   **Geografia Eleitoral:**
    *   Cadastro de todos os **Círculos Eleitorais** (29 no total, sendo 27 nacionais e 2 no exterior, conforme Artigo 114.º da Lei Eleitoral [1]).
    *   Cadastro de todas as **Assembleias de Voto (Mesas/Secções)** dentro de cada círculo.
    *   A distribuição de deputados por círculo eleitoral será configurada com base no anexo da Lei Eleitoral (Artigo 115.º).
*   **Partidos e Candidaturas:**
    *   Cadastro de todos os partidos/coligações e seus candidatos, incluindo os elementos do boletim de voto (nomes, fotografias, conforme Artigo 102.º para Presidenciais).
*   **Delegados:**
    *   Cadastro e gestão de acessos (login/senha) para os delegados/escrutinadores autorizados a inserir dados em cada Assembleia de Voto.

### 2.2. Módulo de Inserção de Dados (Pós-Apuramento Local)

Este módulo é crítico para a recolha rápida e precisa dos dados após o apuramento local nas mesas de voto.

**Requisitos:**

*   **Entrada de Dados por Delegado:**
    *   Interface otimizada para dispositivos móveis (aplicação web responsiva ou app híbrida).
    *   O delegado acede ao sistema com o seu login e seleciona a sua Assembleia de Voto.
    *   Formulário de inserção de dados correspondente à Ata de Apuramento Parcial (local), incluindo:
        *   Número de Eleitores Inscritos.
        *   Número de Votantes (pelos Cadernos Eleitorais).
        *   Número de Boletins Não Usados/Inutilizados.
        *   Contagem de Votos por Partido/Candidato.
        *   Votos Brancos e Votos Nulos (conforme Artigo 77.º da Lei Eleitoral [1]).
    *   **Mecanismo de Confirmação:** Exigência de anexo de uma foto da Ata de Apuramento assinada, para auditoria e validação posterior (conforme Artigo 81.º, n.º 3, que permite a verificação da contagem pelos delegados [1]).
*   **Validação de Dados:** Implementação de verificações básicas (ex: número de votantes não pode ser maior que o número de inscritos).

### 2.3. Módulo de Processamento e Totalização (O "Motor" do Sistema)

Este módulo processará os dados em tempo real, seguindo a hierarquia de apuramento oficial.

**Requisitos:**

*   **Totalização por Círculo:** Soma dos votos inseridos de todas as Assembleias de Voto dentro de um Círculo Eleitoral (similar ao Apuramento do Círculo, Artigo 83.º [1]).
*   **Totalização Regional:** Soma dos votos dos círculos dentro de cada Região (similar ao Apuramento Regional, Artigo 88.º [1]).
*   **Totalização Nacional:** Soma dos votos de todas as Regiões para obter o resultado geral (similar ao Apuramento Nacional, Artigo 93.º [1]).
*   **Cálculo de Mandatos (Deputados):** Implementar o método de atribuição de mandatos usado na Guiné-Bissau (geralmente o Método de Hondt para eleições legislativas, conforme Artigo 116.º, que se refere ao sistema de representação proporcional para as eleições legislativas [1]). Este cálculo será feito para cada Círculo, com base nos votos totalizados até o momento, permitindo projetar a distribuição de deputados em tempo real.

### 2.4. Módulo de Visualização e Análise (Dashboards)

Este módulo fornecerá informações cruciais para a liderança do partido, com acesso restrito.

**Requisitos:**

*   **Dashboard Nacional:**
    *   Resultados Totais (Votos): Total de votos do partido e de cada concorrente.
    *   Projeção de Mandatos: Número total de deputados projetados para o partido e para os concorrentes.
    *   Taxa de Cobertura: Percentagem de Assembleias de Voto cujas atas já foram inseridas.
    *   Gráficos Nacionais: Distribuição percentual de votos por partido.
*   **Dashboard por Círculo Eleitoral:**
    *   Resultados Locais (Votos): Votos do partido e concorrentes no círculo.
    *   Projeção de Mandatos no Círculo.
    *   Gráficos: Evolução da votação e distribuição de votos no círculo.
*   **Relatórios de Desvios (Auditoria):** Ferramenta para identificar discrepâncias entre os dados inseridos e, se possível, comparar com resultados oficiais posteriores.

## 3. Fases de Implementação

### Fase 1: Planeamento e Análise Detalhada

*   **Objetivo:** Refinar os requisitos e definir a arquitetura técnica do sistema.
*   **Atividades:**
    *   Revisão aprofundada da Lei Eleitoral da Guiné-Bissau, focando em artigos específicos sobre apuramento, círculos eleitorais, e método de atribuição de mandatos (Artigos 79.º a 97.º, 113.º a 116.º [1]).
    *   Mapeamento detalhado dos processos de apuramento oficial com as funcionalidades do sistema.
    *   Definição da arquitetura de software (frontend, backend, base de dados).
    *   Seleção das tecnologias a utilizar (linguagens de programação, frameworks, base de dados, infraestrutura cloud).
    *   Criação de wireframes e protótipos para as interfaces de inserção de dados e dashboards.
    *   Elaboração de um plano de segurança e privacidade de dados.

### Fase 2: Desenvolvimento

*   **Objetivo:** Construir os módulos do sistema.
*   **Atividades:**
    *   **Desenvolvimento do Módulo de Configuração:** Implementação das funcionalidades de cadastro de geografia eleitoral, partidos, candidaturas e delegados.
    *   **Desenvolvimento do Módulo de Inserção de Dados:** Criação da interface móvel e do formulário de inserção, incluindo validações e funcionalidade de upload de fotos.
    *   **Desenvolvimento do Módulo de Processamento e Totalização:** Implementação da lógica de agregação de votos (local, círculo, regional, nacional) e do algoritmo de cálculo de mandatos (Método de Hondt).
    *   **Desenvolvimento do Módulo de Visualização e Análise:** Construção dos dashboards e relatórios.
    *   Integração entre os módulos.

### Fase 3: Testes e Validação

*   **Objetivo:** Garantir a robustez, precisão e conformidade do sistema.
*   **Atividades:**
    *   **Testes Unitários e de Integração:** Verificar o funcionamento individual e integrado de cada componente.
    *   **Testes de Aceitação do Utilizador (UAT):** Envolver utilizadores finais (delegados, liderança do partido) para validar as funcionalidades e usabilidade.
    *   **Testes de Performance e Escalabilidade:** Assegurar que o sistema consegue lidar com o volume de dados esperado durante o dia da eleição.
    *   **Testes de Segurança:** Auditoria de segurança para identificar e corrigir vulnerabilidades.
    *   **Validação Legal:** Revisão do sistema por especialistas legais para garantir a conformidade com a Lei Eleitoral da Guiné-Bissau.

### Fase 4: Formação e Implementação

*   **Objetivo:** Preparar os utilizadores e colocar o sistema em produção.
*   **Atividades:**
    *   **Criação de Materiais de Formação:** Manuais, guias rápidos e vídeos tutoriais para delegados e equipas de gestão.
    *   **Sessões de Formação:** Treinamento intensivo para delegados sobre a utilização do módulo de inserção de dados.
    *   **Implantação do Sistema:** Configuração e lançamento do sistema em ambiente de produção.
    *   **Suporte Técnico:** Estabelecimento de uma equipa de suporte para o dia da eleição.

## 4. Recomendações Adicionais

*   **Infraestrutura Robusta:** Utilizar serviços de cloud que garantam alta disponibilidade e escalabilidade para suportar picos de acesso durante a eleição.
*   **Segurança de Dados:** Implementar criptografia de ponta a ponta, autenticação multifator e auditorias regulares para proteger a integridade e confidencialidade dos dados.
*   **Plano de Contingência:** Desenvolver um plano para lidar com falhas de conectividade ou interrupções de energia, especialmente nas assembleias de voto mais remotas.
*   **Monitorização em Tempo Real:** Implementar ferramentas de monitorização para acompanhar o desempenho do sistema e a taxa de inserção de dados.
*   **Comunicação:** Manter canais de comunicação claros com os delegados e a equipa de gestão para resolver quaisquer problemas rapidamente.

## Referências

[1] Lei Eleitoral da Guiné-Bissau. Disponível em: [http://www.cne.gw/images/PDF/legislacaoeleitoal.pdf](http://www.cne.gw/images/PDF/legislacaoeleitoal.pdf)

