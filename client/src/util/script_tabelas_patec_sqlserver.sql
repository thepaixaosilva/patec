CREATE DATABASE PATEC;
USE PATEC;

CREATE TABLE ALUNO (
	ra CHAR(13),
    cpf CHAR(11) UNIQUE NOT NULL,
    nome_aluno VARCHAR(40) NOT NULL,
    data_nascimento DATE NOT NULL,
    PRIMARY KEY (ra)
);

ALTER TABLE ALUNO
ADD CONSTRAINT ck_data_nascimento
CHECK (data_nascimento >= '1900-01-01');

CREATE TABLE DISCIPLINA (
	codigo_disciplina CHAR(6),
    nome_disciplina VARCHAR(30) NOT NULL,
    semestre_disciplina CHAR(1) NOT NULL, 
    PRIMARY KEY (codigo_disciplina)
);

ALTER TABLE DISCIPLINA
ADD CONSTRAINT ck_semestre_disciplina
CHECK (semestre_disciplina IN ('1', '2', '3', '4', '5', '6'));

CREATE TABLE AVALIACAO (
	codigo_avaliacao INT IDENTITY(1,1),
    data_avaliacao DATE NOT NULL,
	tipo_avaliacao VARCHAR(25) NOT NULL,
    PRIMARY KEY (codigo_avaliacao)
);

ALTER TABLE AVALIACAO
ADD CONSTRAINT ck_tipo_avaliacao
CHECK (tipo_avaliacao IN ('1°BIM - SÁBADO', '2°BIM - SÁBADO', '1°BIM - SEGUNDA-FEIRA', '2°BIM - SEGUNDA-FEIRA', '1°BIM - SUB', '2°BIM - SUB'));

CREATE TABLE ALUNO_DISCIPLINA (
	codigo_disciplina CHAR(6) NOT NULL REFERENCES DISCIPLINA(codigo_disciplina) ON DELETE CASCADE,
    ra CHAR(13) NOT NULL REFERENCES ALUNO(ra) ON DELETE CASCADE,
    PRIMARY KEY (codigo_disciplina, ra)
);

CREATE TABLE GABARITO_OFICIAL (
	codigo_gabarito INT IDENTITY(1,1),
    questao_1 CHAR(1) NOT NULL,
    questao_2 CHAR(1) NOT NULL,
    questao_3 CHAR(1) NOT NULL, 
    questao_4 CHAR(1) NOT NULL, 
    questao_5 CHAR(1) NOT NULL,
    codigo_disciplina CHAR(6) NOT NULL REFERENCES DISCIPLINA(codigo_disciplina) ON DELETE CASCADE,
    codigo_avaliacao INT REFERENCES AVALIACAO(codigo_avaliacao) ON DELETE CASCADE,
    PRIMARY KEY (codigo_gabarito)
);

ALTER TABLE GABARITO_OFICIAL
ADD CONSTRAINT ck_q1
CHECK (questao_1 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE GABARITO_OFICIAL
ADD CONSTRAINT ck_q2
CHECK (questao_2 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE GABARITO_OFICIAL
ADD CONSTRAINT ck_q3
CHECK (questao_3 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE GABARITO_OFICIAL
ADD CONSTRAINT ck_q4
CHECK (questao_4 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE GABARITO_OFICIAL
ADD CONSTRAINT ck_q5
CHECK (questao_5 IN ('A', 'B', 'C', 'D', 'E'));

CREATE TABLE FOLHA_DE_RESPOSTAS (
	codigo_respostas INT IDENTITY(1,1),
    resposta_1 CHAR(1) NOT NULL,
    resposta_2 CHAR(1) NOT NULL,
    resposta_3 CHAR(1) NOT NULL, 
    resposta_4 CHAR(1) NOT NULL, 
    resposta_5 CHAR(1) NOT NULL,
    nota INT NOT NULL,
	codigo_gabarito INT REFERENCES GABARITO_OFICIAL(codigo_gabarito) ON DELETE CASCADE,
    ra CHAR(13) REFERENCES ALUNO(ra) ON DELETE CASCADE,
    PRIMARY KEY (codigo_respostas)
);

ALTER TABLE FOLHA_DE_RESPOSTAS
ADD CONSTRAINT ck_resp1
CHECK (resposta_1 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE FOLHA_DE_RESPOSTAS
ADD CONSTRAINT ck_resp2
CHECK (resposta_2 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE FOLHA_DE_RESPOSTAS
ADD CONSTRAINT ck_resp3
CHECK (resposta_3 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE FOLHA_DE_RESPOSTAS
ADD CONSTRAINT ck_resp4
CHECK (resposta_4 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE FOLHA_DE_RESPOSTAS
ADD CONSTRAINT ck_resp5
CHECK (resposta_5 IN ('A', 'B', 'C', 'D', 'E'));
