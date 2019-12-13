[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# TORO QUOTES

Este projeto é um teste para desenvolvedor fullstack para a Toro Investimentos.

## Projeto de telas
As telas do aplicativo estão demonstradas no arquivo ```toro_quotes-telas.pdf``` que se encontra na pasta raiz do projeto.

## Iniciando
O projeto foi feito com NodeJS e Angular.

Para ter uma cópia local do código fonte, você poderá rodar o comando ```git clone https://github.com/Platiplus/toro-quotes.git``` em um terminal
ou baixar a zip do projeto no botão que fica no canto superior direito da tela.

### Pré-requisitos

Caso queira rodar o projeto localmente sem a necessidade de containers:
[NodeJS](https://nodejs.org/)
[Angular CLI](https://cli.angular.io/)

Caso queira rodar o projeto em containers:
[Docker](https://www.docker.com/)
[Docker Compose](https://docs.docker.com/compose/install/)

Informações detalhadas sobre a instalação serão encontradas nos links acima.

### Rodando o projeto

#### Docker e Docker-compose
Para instalar o projeto através do docker, vá para a pasta raiz do projeto e rode o comando ```docker-compose up --build```.

O projeto estará rodando no endereço 'http://localhost'

#### Localmente
Caso desejar instalar o projeto localmente sem a utilização de containers, entre em cada pasta do projeto (api, auth, frontend e ws) e rode o comando ```npm install```.
Rodar o comando ```node server.js``` nas pastas ws, auth e api em abas separadas do seu terminal.
Rodar o comando ```ng serve``` na pasta frontend.

O projeto estará rodando no endereço 'http://localhost:4200'

#### Testes
Para rodar os testes, na pasta frontend e na pasta api, basta rodar o comando ```npm test``` em uma aba do terminal.

#### Fluxo simples sugerido
Registro > Login > Perfil (depósito e saque) > Bolsa de Valores (detalhes e compra) > Perfil (venda de ações) > Sair

## Desenvolvido com

* [NodeJS](https://nodejs.org/)
* [NPM](https://www.npmjs.com/)
* [Angular CLI](https://cli.angular.io/)

## Autor

* **Victor Rosa** - [Platiplus](https://github.com/Platiplus)

## Licença

Este projeto é OPEN SOURCE (MIT).
