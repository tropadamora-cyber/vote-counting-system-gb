-- ============================================================================
-- SCHEMA SQL - Sistema de Contagem Paralela de Votos - Guiné-Bissau
-- ============================================================================
-- Este ficheiro contém o esquema completo da base de dados
-- Pode ser importado diretamente no seu servidor SQL local
-- ============================================================================

-- Criar tabelas de utilizadores
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'DELEGATE',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Criar tabela de círculos eleitorais
CREATE TABLE IF NOT EXISTS electoral_circles (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    region VARCHAR(255) NOT NULL,
    deputies INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_region (region)
);

-- Criar tabela de mesas de voto
CREATE TABLE IF NOT EXISTS voting_assemblies (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    circleId VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (circleId) REFERENCES electoral_circles(id),
    UNIQUE KEY unique_name_circle (name, circleId),
    INDEX idx_circleId (circleId)
);

-- Criar tabela de partidos
CREATE TABLE IF NOT EXISTS parties (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    acronym VARCHAR(50) UNIQUE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_acronym (acronym)
);

-- Criar tabela de candidatos
CREATE TABLE IF NOT EXISTS candidates (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    partyId VARCHAR(255) NOT NULL,
    circleId VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (partyId) REFERENCES parties(id),
    FOREIGN KEY (circleId) REFERENCES electoral_circles(id) ON DELETE SET NULL,
    UNIQUE KEY unique_name_party (name, partyId),
    INDEX idx_partyId (partyId),
    INDEX idx_circleId (circleId)
);

-- Criar tabela de atribuição de delegados
CREATE TABLE IF NOT EXISTS delegate_assignments (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    circleId VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (circleId) REFERENCES electoral_circles(id),
    UNIQUE KEY unique_user_circle (userId, circleId),
    INDEX idx_userId (userId),
    INDEX idx_circleId (circleId)
);

-- Criar tabela de submissões de dados
CREATE TABLE IF NOT EXISTS data_submissions (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    votingAssemblyId VARCHAR(255) NOT NULL,
    registeredVoters INT NOT NULL,
    actualVoters INT NOT NULL,
    unusedBallots INT DEFAULT 0,
    nullVotes INT DEFAULT 0,
    blankVotes INT DEFAULT 0,
    minutesPhotoUrl VARCHAR(500),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (votingAssemblyId) REFERENCES voting_assemblies(id),
    UNIQUE KEY unique_assembly (votingAssemblyId),
    INDEX idx_userId (userId),
    INDEX idx_status (status),
    INDEX idx_submittedAt (submittedAt)
);

-- Criar tabela de votos
CREATE TABLE IF NOT EXISTS votes (
    id VARCHAR(255) PRIMARY KEY,
    dataSubmissionId VARCHAR(255) NOT NULL,
    partyId VARCHAR(255) NOT NULL,
    voteCount INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (dataSubmissionId) REFERENCES data_submissions(id) ON DELETE CASCADE,
    FOREIGN KEY (partyId) REFERENCES parties(id),
    UNIQUE KEY unique_submission_party (dataSubmissionId, partyId),
    INDEX idx_dataSubmissionId (dataSubmissionId),
    INDEX idx_partyId (partyId)
);

-- Criar tabela de resultados por círculo
CREATE TABLE IF NOT EXISTS circle_results (
    id VARCHAR(255) PRIMARY KEY,
    circleId VARCHAR(255) NOT NULL,
    partyId VARCHAR(255) NOT NULL,
    totalVotes INT NOT NULL,
    projectedSeats INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (circleId) REFERENCES electoral_circles(id),
    FOREIGN KEY (partyId) REFERENCES parties(id),
    UNIQUE KEY unique_circle_party (circleId, partyId),
    INDEX idx_circleId (circleId),
    INDEX idx_partyId (partyId)
);

-- Criar tabela de resultados nacionais
CREATE TABLE IF NOT EXISTS national_results (
    id VARCHAR(255) PRIMARY KEY,
    partyId VARCHAR(255) NOT NULL,
    totalVotes INT NOT NULL,
    projectedSeats INT,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (partyId) REFERENCES parties(id),
    UNIQUE KEY unique_party (partyId),
    INDEX idx_partyId (partyId)
);

-- ============================================================================
-- INSERIR DADOS DE EXEMPLO
-- ============================================================================

-- Inserir utilizadores
INSERT INTO users (id, email, password, name, role) VALUES
('admin-001', 'admin@example.com', '$2a$10$5K.JqKQqKQqKQqKQqKQqKe5K.JqKQqKQqKQqKQqKQqKQqKQqKQqKQ', 'Administrador', 'ADMIN'),
('leader-001', 'leader@example.com', '$2a$10$5K.JqKQqKQqKQqKQqKQqKe5K.JqKQqKQqKQqKQqKQqKQqKQqKQqKQ', 'Líder do Partido', 'PARTY_LEADER'),
('coord-001', 'coordinator1@example.com', '$2a$10$5K.JqKQqKQqKQqKQqKQqKe5K.JqKQqKQqKQqKQqKQqKQqKQqKQqKQ', 'Coordenador Regional 1', 'REGIONAL_COORDINATOR'),
('delegate-001', 'delegate1@example.com', '$2a$10$5K.JqKQqKQqKQqKQqKQqKe5K.JqKQqKQqKQqKQqKQqKQqKQqKQqKQ', 'Delegado 1', 'DELEGATE'),
('delegate-002', 'delegate2@example.com', '$2a$10$5K.JqKQqKQqKQqKQqKQqKe5K.JqKQqKQqKQqKQqKQqKQqKQqKQqKQ', 'Delegado 2', 'DELEGATE');

-- Inserir círculos eleitorais
INSERT INTO electoral_circles (id, name, region, deputies) VALUES
('circle-001', 'Catió / Komo', 'Tombali', 7),
('circle-002', 'Bedanda / Cacine / Quebo', 'Tombali', 3),
('circle-003', 'Buba / Empada', 'Quinara', 4),
('circle-004', 'Fulacunda / Tite', 'Quinara', 6),
('circle-005', 'Bissorã', 'Oio', 3),
('circle-006', 'Farim', 'Oio', 3);

-- Inserir mesas de voto
INSERT INTO voting_assemblies (id, name, circleId) VALUES
('assembly-001', 'Mesa 1 - Catió / Komo', 'circle-001'),
('assembly-002', 'Mesa 2 - Catió / Komo', 'circle-001'),
('assembly-003', 'Mesa 3 - Catió / Komo', 'circle-001'),
('assembly-004', 'Mesa 1 - Bedanda / Cacine / Quebo', 'circle-002'),
('assembly-005', 'Mesa 2 - Bedanda / Cacine / Quebo', 'circle-002'),
('assembly-006', 'Mesa 3 - Bedanda / Cacine / Quebo', 'circle-002'),
('assembly-007', 'Mesa 1 - Buba / Empada', 'circle-003'),
('assembly-008', 'Mesa 2 - Buba / Empada', 'circle-003'),
('assembly-009', 'Mesa 3 - Buba / Empada', 'circle-003'),
('assembly-010', 'Mesa 1 - Fulacunda / Tite', 'circle-004'),
('assembly-011', 'Mesa 2 - Fulacunda / Tite', 'circle-004'),
('assembly-012', 'Mesa 3 - Fulacunda / Tite', 'circle-004'),
('assembly-013', 'Mesa 1 - Bissorã', 'circle-005'),
('assembly-014', 'Mesa 2 - Bissorã', 'circle-005'),
('assembly-015', 'Mesa 3 - Bissorã', 'circle-005'),
('assembly-016', 'Mesa 1 - Farim', 'circle-006'),
('assembly-017', 'Mesa 2 - Farim', 'circle-006'),
('assembly-018', 'Mesa 3 - Farim', 'circle-006');

-- Inserir partidos
INSERT INTO parties (id, name, acronym) VALUES
('party-001', 'Partido Africano para a Independência da Guiné e Cabo Verde', 'PAIGC'),
('party-002', 'Movimento para Alternância Democrática', 'MADEM'),
('party-003', 'Partido de Renovação Social', 'PRS'),
('party-004', 'Assembleia do Povo Unido', 'APU');

-- Inserir candidatos
INSERT INTO candidates (id, name, partyId, circleId) VALUES
('candidate-001', 'João Silva', 'party-001', 'circle-001'),
('candidate-002', 'Maria Santos', 'party-002', 'circle-001'),
('candidate-003', 'Pedro Oliveira', 'party-003', 'circle-001'),
('candidate-004', 'Ana Costa', 'party-004', 'circle-001'),
('candidate-005', 'Carlos Ferreira', 'party-001', 'circle-002'),
('candidate-006', 'Lucia Martins', 'party-002', 'circle-002'),
('candidate-007', 'Roberto Gomes', 'party-003', 'circle-002'),
('candidate-008', 'Fernanda Rocha', 'party-004', 'circle-002');

-- Atribuir delegados a círculos
INSERT INTO delegate_assignments (id, userId, circleId) VALUES
('assign-001', 'delegate-001', 'circle-001'),
('assign-002', 'delegate-002', 'circle-002');

-- ============================================================================
-- NOTAS IMPORTANTES
-- ============================================================================
-- 1. As senhas acima são hashes bcrypt de "admin123", "leader123", "delegate123"
-- 2. Para testar, use as credenciais:
--    - admin@example.com / admin123
--    - leader@example.com / leader123
--    - delegate1@example.com / delegate123
--    - delegate2@example.com / delegate123
-- 3. As senhas devem ser alteradas em produção
-- 4. Este ficheiro é apenas para teste local
-- ============================================================================

