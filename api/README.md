
<h1 align="center" style="font-weight: bold;">Patec-API 💻</h1>

<p align="center">
    <a href="https://nestjs.com" target="_blank">
        <img src="https://skillicons.dev/icons?i=nestjs" alt="NestJS" />
    </a>
    <a href="https://www.typescriptlang.org" target="_blank">
        <img src="https://skillicons.dev/icons?i=typescript" alt="TypeScript" />
    </a>
    <a href="https://www.sqlite.org" target="_blank">
        <img src="https://skillicons.dev/icons?i=sqlite" alt="SQLite" />
    </a>
</p>

<p align="center">
    <a href="#about">Sobre</a> •
    <a href="#technologies">Tecnologias</a> •
    <a href="#started">Para começar</a> •
    <a href="#features">Funcionalidades</a> •
    <a href="#colab">Contribuidores</a>
</p>

<h2 id="about">📌 Sobre</h2>

Patec-API é uma API RESTful construída com NestJS, TypeScript e SQLite. O projeto utiliza práticas modernas de desenvolvimento e inclui autenticação JWT, validação de dados, e documentação via Swagger. Versão atual: 0.0.1

<h2 id="technologies">💻 Tecnologias</h2>

- **[NestJS](https://nestjs.com/)** (^10.0.0) - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** (^5.1.3) - Superset JavaScript com tipagem estática
- **[SQLite](https://www.sqlite.org/)** (^5.1.7) - Banco de dados SQL embutido
- **[TypeORM](https://typeorm.io/)** (^0.3.20) - ORM para TypeScript e JavaScript
- **[JWT](https://jwt.io/)** (@nestjs/jwt ^10.2.0) - JSON Web Token para autenticação
- **[Swagger](https://swagger.io/)** (@nestjs/swagger ^7.4.2) - Documentação da API
- **[Jest](https://jestjs.io/)** (^29.5.0) - Framework de testes

<h2 id="started">🚀 Para começar</h2>

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn
- Git

### Clonando o repositório

```bash
git clone https://github.com/matsilva03/Patec-API.git
cd Patec-API
```

### Instalando dependências

```bash
npm install
# ou
yarn install
```

### Configurando o ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=             # Porta da aplicação
NUMBER_OF_ROUNDS= # Número de rounds para hash de senha
ADMIN_NAME=       # Nome do administrador
ADMIN_EMAIL=      # Email do administrador
ADMIN_PASSWORD=   # Senha do administrador
```

### Scripts disponíveis

```bash
# desenvolvimento
npm run start:dev          # Inicia o servidor em modo de desenvolvimento
npm run start:debug        # Inicia o servidor em modo debug

# formatação e linting
npm run format            # Formata o código usando Prettier
npm run lint             # Executa o ESLint

# build e produção
npm run build            # Compila o projeto
npm run start:prod       # Inicia o servidor em modo de produção

# testes
npm run test            # Executa testes unitários
npm run test:watch      # Executa testes em modo watch
npm run test:cov        # Gera relatório de cobertura de testes
npm run test:debug      # Executa testes em modo debug
npm run test:e2e        # Executa testes end-to-end

# utilitários
npm run create-coordinator  # Cria um novo coordenador no sistema
```

<h2 id="features">🔥 Funcionalidades</h2>

✅ Autenticação JWT com bcrypt
✅ Validação de dados com class-validator
✅ Documentação automática com Swagger
✅ Testes unitários e E2E com Jest
✅ Integração com SQLite via TypeORM
✅ Sistema de coordenadores com CLI

<h2 id="colab">🤝 Contribuidores</h2>

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/IsabellaOshima">
        <img src="https://avatars.githubusercontent.com/u/143272475?v=4" width="100px;" alt="Isabella Oshima's Profile Picture"/><br>
        <sub>
            <b>Isabella Oshima</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/matsilva03">
        <img src="https://avatars.githubusercontent.com/u/72952802?v=4" width="100px;" alt="Matheus Silva's Profile Picture"/><br>
        <sub>
            <b>Matheus Silva</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/SammySant">
        <img src="https://avatars.githubusercontent.com/u/56184189?v=4" width="100px;" alt="Samuel Azevedo's Profile Picture"/><br>
        <sub>
            <b>Samuel Azevedo</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/VictoriaMiki">
        <img src="https://avatars.githubusercontent.com/u/143273627?v=4" width="100px;" alt="Victoria Fujii's Profile Picture"/><br>
        <sub>
            <b>Victoria Fujii</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<h2 id="contribute">📫 Contribuindo</h2>

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add: some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Links úteis

- [Convenções de commit](https://www.conventionalcommits.org/pt-br/v1.0.0/)
- [Documentação do NestJS](https://docs.nestjs.com/)
- [Guia de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do TypeORM](https://typeorm.io/)
