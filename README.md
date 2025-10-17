# Advogados Processos API - Pack de Aprendizado

Este projeto foi **modificado por Diego Escouto** a partir do projeto original de [Fabio Sperotto](https://github.com/fabiosperotto/pratica-api-rest).

Pacote de programação para disciplinas de desenvolvimento web back-end, utilizando Javascript com Node.js + [Express](https://expressjs.com/). O objetivo é servir de exemplo para a elaboração de uma API para comunicar dados em JSON a respeito de uma modelagem de advogados e processos. É uma API RESTful com validações de schemas JSON ([Ajv](https://ajv.js.org/)) e autenticação via JWT Token ([jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)). Na persistência de dados, utiliza o ORM [Sequelize](https://sequelize.org/) com banco de dados MySQL.

> Este projeto faz parte de uma série de aprendizado em APIs. Nesta mesma série, você pode acessar o mesmo projeto implementado com [PHP e Lumen](https://github.com/fabiosperotto/pratica-api-rest).

---

## Compatibilidade

- Node.js 18.16.x
- npm 9.5.x
- Express 4.18.2
- MySQL 8.0
- Ajv 8.12.0
- cors 2.8.5
- jsonwebtoken 9.0.1
- mysql2 3.6.0
- sequelize 3.6.0

---

## Recursos

- Utilização do framework Express como base;
- Validação de documentos JSON com Ajv;
- ORM Sequelize para criação/alteração de banco de dados relacionais, incluindo relacionamento entre tabelas;
- Configurações sobre [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) e [Bearer Tokens](https://oauth.net/2/bearer-tokens/).

---

## Modelagem de Referência

Este projeto faz referência a uma modelagem de advogados e processos judiciais, com relacionamento entre as entidades.

![Imagem da Modelagem do sistema](/modelagem/modelagem.png)

---

## Passo a Passo para Iniciar e Rodar o Projeto

### 1. Instale o Node.js e o MySQL

- **Windows:**  
  Baixe e instale o [Node.js](https://nodejs.org/) e o [MySQL](https://dev.mysql.com/downloads/installer/).
- **Linux:**  
  Siga os tutoriais para instalar [Node.js](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04) e [MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-22-04).

### 2. Baixe o Projeto

- Clique em "Code" > "Download ZIP" ou use o comando:
  ```bash
  git clone https://github.com/diego-escouto/Advogados_Processos.git
  ```
- Entre na pasta do projeto:
  ```bash
  cd Advogados_Processos
  ```

### 3. Instale as Dependências

- Copie o arquivo de exemplo de ambiente:
  ```bash
  cp .env.example .env
  ```
- Abra o arquivo `.env` e preencha com seus dados do banco de dados e uma chave secreta para o JWT.
- Instale as dependências do projeto:
  ```bash
  npm install
  ```

### 4. Configure o Banco de Dados

- Crie um banco de dados MySQL chamado `apiadvogadodb` (ou o nome que você colocou no `.env`).
- Você pode usar o [MySQL Workbench](https://www.mysql.com/products/workbench/) ou [DBeaver](https://dbeaver.io/) para facilitar.

### 5. Rode o Projeto

- Execute o comando para iniciar o servidor:
  ```bash
  npm run dev
  ```
  ou
  ```bash
  npx nodemon
  ```
- O servidor estará rodando em `http://localhost:3000`.

### 6. Teste a API

- Acesse a documentação interativa do Swagger para testar os endpoints:
  [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Organização do Projeto

O projeto segue uma estrutura em MVC com arquivos individuais de rotas e validadores JSON:

- `/app`
  - `/commons`: helpers reutilizáveis pela aplicação;
  - `/controllers`: os Controllers da aplicação;
  - `/middlewares`: todos os middlewares da aplicação;
  - `/models`: Models e inicializador index para o ORM;
  - `/routes`: arquivos de rotas da aplicação;
  - `/schemas`: esquemas JSON utilizados para validações;
- `/modelagem`: documentações sobre o banco de dados;
- `app.js`: inicialização do projeto;
- `config.js`: propriedades configuráveis globais da aplicação.

---

## Documentação

### Validação de dados JSON com Ajv

Ao receber documentos JSON do cliente, este projeto utiliza a biblioteca Ajv para avaliar se os dados estão adequados conforme a necessidade do back-end. Para criar um schema de validação, verifique exemplos em `app/schemas`. Você pode especificar regras de campos obrigatórios, tipos de dados, entre outros.

No controller, utilize o objeto do Ajv, informe o schema de validação e os dados recebidos para validação. Exemplo pode ser consultado no método `create` em `app/controllers/AdvogadoController`.

### Banco de Dados

Este projeto utiliza o ORM Sequelize, onde por meio do arquivo `app/models/conexao.js` é realizada a conexão com o banco de dados. A parametrização do Sequelize está em `config.js`.

Cada model do projeto (`app/models`) é uma classe com dados privados. Na mesma classe, a Model do Sequelize para cada entidade é inicializada. Métodos comuns do ORM como `create`, `update`, entre outros, são acoplados à classe. Isso facilita caso futuramente seja necessário trocar o Sequelize por outro framework. Cada model exporta sua classe e a model Sequelize conectada, respectivamente.

Em `app/models/index.js` é realizada a importação das models e a sincronização com o banco de dados. A sincronização verifica se existe a tabela da model criada no BD e, caso não exista, cria as tabelas necessárias. Em `app/models/relations.js` são implementados e configurados os relacionamentos entre as models.

### Autenticação

Para utilizar a API é necessário ter um token de acesso, enviado pelo cliente via cabeçalho da requisição. No cabeçalho deve ser especificado Bearer token, onde o token é gerado para um usuário autorizado. Um middleware em `app/middlewares` verifica se existe o token na requisição e se ele é válido.

O projeto segue o padrão de implementação de tokens via JWT Token. É necessário que um usuário faça o cadastro para se tornar autorizado. Ao fazer o cadastro, o token é gerado e retornado ao usuário. Por padrão, cada token tem um tempo de validade definido em `config.js` (`jwt.expiration`).

Também existe a implementação de login para os usuários. Ao enviar e-mail e senha corretos, a API verifica as credenciais e gera um token.

---

## Documentação da API

Acesse a documentação interativa do Swagger em:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Documentações Externas

- [Express](https://expressjs.com/pt-br/)
- [Sequelize ORM](https://sequelize.org/docs/v6/getting-started/)
- [Ajv](https://ajv.js.org/)
- [JWT](https://jwt.io/)

---

## Dependências

- [npm](https://www.npmjs.com/)

---

## Contribuindo com o projeto

Serão aceitas atualizações de pacotes, correções de bugs e melhorias didáticas. Novas funcionalidades podem ser debatidas e adicionadas ao projeto conforme a necessidade do desenvolvimento de back-end para sistemas jurídicos.
