# ExploreDenmark Documentation

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.5.

## Pré-requisitos

Certifique-se de que você possui as seguintes ferramentas instaladas em seu sistema:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (apenas para desenvolvimento fora do Docker)

## Executando o Aplicativo

### Usando Docker

Para rodar o aplicativo Angular e o JSON Server usando Docker, siga os passos abaixo:

1. **Construa e inicie os serviços**:
   No terminal, navegue até o diretório do seu projeto e execute:

   ```bash
   docker-compose up --build
   ```

   Isso irá:
  - Construir as imagens para o aplicativo Angular e o JSON Server.
  - Iniciar o aplicativo Angular na porta `4200`.
  - Iniciar o JSON Server na porta `3000`.

2. **Acesse o aplicativo**:
   Após a construção e inicialização dos serviços, você pode acessar o aplicativo Angular em [http://localhost:4200](http://localhost:4200) e o JSON Server em [http://localhost:3000](http://localhost:3000).

### Usando Angular CLI

Se você preferir rodar o aplicativo sem Docker, siga os passos abaixo:

1. **Instale as dependências**:
   Navegue até o diretório do seu projeto e execute:

   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**:
   Após a instalação das dependências, execute o seguinte comando:

   ```bash
   ng serve
   ```

   O aplicativo será iniciado na porta `4200`.

3. **Acesse o aplicativo**:
   Você pode acessar o aplicativo Angular em [http://localhost:4200](http://localhost:4200).

4. **Para rodar o JSON Server**:
   Certifique-se de que você tenha o JSON Server instalado globalmente ou como uma dependência do projeto. Se for necessário instalá-lo, execute:

   ```bash
   npm install -g json-server
   ```

   Em seguida, para iniciar o JSON Server, execute:

   ```bash
   json-server --watch db.json --port 3000
   ```

   Agora, você pode acessar o JSON Server em [http://localhost:3000](http://localhost:3000).

5. Rode
```bash
ng serve
```
