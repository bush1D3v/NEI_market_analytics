PT-BR 🇧🇷

# 📊 Nei Market Analytics

![License](https://img.shields.io/static/v1?label=license&message=MIT&color=orange) &nbsp;
![Bun version](https://img.shields.io/static/v1?label=bun&message=v1.1.24&color=yellow) &nbsp;
![Repository size](https://img.shields.io/github/repo-size/bush1D3v/NEI_market_analytics?color=blue) &nbsp;
![Pull request](https://img.shields.io/static/v1?label=PR&message=welcome&color=green)

## 🔍 Sobre o Projeto

O **NEI Market Analytics** é um projeto de código aberto projetado para fornecer análises abrangentes de valor de mercado para vários instrumentos financeiros e ativos digitais. Este repositório visa criar uma plataforma robusta para rastrear e analisar tendências de mercado em vários setores.

## 🛠️ Tecnologias e Ferramentas Utilizadas
<div align='center'>
   <img align='center' height='50' width='70' title='Vue.js' alt='vuejs' src='https://github.com/devicons/devicon/blob/master/icons/vuejs/vuejs-original.svg' />&nbsp;
   <img align='center' height='50' width='50' title='Shadcn-vue' alt='shadcnvue' src='https://github.com/user-attachments/assets/1d2298ae-03ea-4392-b0d2-e3fc12908bc7' />&nbsp;&nbsp;&nbsp;
   <img align='center' height='50' width='50' title='Pinia' alt='pinia' src='https://github.com/user-attachments/assets/abb5c37c-372d-4f29-b4ba-27fbe1d7c970' />&nbsp;
   <img align='center' height='55' width='55' title='Mitt' alt='mitt' src='https://github.com/user-attachments/assets/f37880f9-d7f9-42ff-ad39-8c3d8fbbecf1' />&nbsp;
   <img align='center' height='54' width='68' title='Bun.js' alt='bunjs' src='https://github.com/devicons/devicon/blob/master/icons/bun/bun-original.svg' />
   <img align='center' height='64' width='78' title='Node.js' alt='nodejs' src='https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg' />
   <img align='center' height='50' width='68' title='Tailwindcss' alt='tailwindcss' src='https://github.com/devicons/devicon/blob/master/icons/tailwindcss/tailwindcss-original.svg' />
   <img align='center' height='50' width='70' title='TypeScript' alt='typescript' src='https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg' />
   <img align='center' height='68' width='72' title='Potcss' alt='postcss' src='https://github.com/bush1D3v/my_portfolio/assets/133554156/85b7c73b-e181-4c95-b9de-a8e0ba0523d3' />&nbsp;
   <img align='center' height='49' width='49' title='Dotenv' alt='dotenv' src='https://github.com/bush1D3v/navarro_blog_api/assets/133554156/de030e87-8f12-4b6b-8c75-071bab8526a5' /> &nbsp;&nbsp;
   <img align='center' height='48' width='48' title='GitHub Actions' alt='github actions' src='https://github.com/bush1D3v/navarro_blog_api/assets/133554156/0ce89dba-2909-4673-8b71-94a135f61bfb' /> &nbsp;&nbsp;
   <img align='center' height='70' width='70' title='Docker' alt='docker' src='https://github.com/devicons/devicon/blob/master/icons/docker/docker-plain.svg' /> &nbsp;
   <img align='center' height='60' width='50' title='Vitest' alt='vitest' src='https://github.com/bush1D3v/tsbank_api/assets/133554156/74803ee6-3f6e-4335-9f56-cb887a4285ff' />  &nbsp;&nbsp;
   <img align='center' height='54' width='44' title='Storybook-js' alt='storybook-js' src='https://github.com/bush1D3v/my_portfolio/assets/133554156/213c8aa4-ce24-4b30-8e07-dceb476e8589' /> &nbsp;&nbsp;&nbsp;
   <img align='center' height='50' width='50' title='VueUse' alt='vueuse' src='https://github.com/user-attachments/assets/c4eb21ad-858d-4f28-a2c7-1dd0c23342c1' /> &nbsp;
   <img align='center' height='50' width='60' title='Biomejs' alt='biomejs' src='https://github.com/user-attachments/assets/b3d8a249-e17f-4e64-9608-4a4783b7bbc0' /> &nbsp;
   <img align='center' height='50' width='50' title='Chromatic' alt='chromatic' src='https://github.com/user-attachments/assets/6edd5832-5db7-4e2a-a8e4-4bbe7b8e7208' /> &nbsp;
</div>

## 🏗 Estrutura e Arquitetura

O projeto segue os princípios da **arquitetura limpa**, e o código foi organizado de acordo com os princípios de **modularidade**, **reutilização** e **responsabilidade única**.

## 🐳 Docker

Com a adição do Docker, você agora pode utilizar dos scripts fornecidos em `package.json` para poder construir a imagem docker e rodar o container da aplicação.

Para isso, segue a lista de funções de cada script:

> `docker-build`: Constrói as imagens docker do projeto <br> `docker-run`: Roda os containers de navarro_blog_front <br> `docker-up`: Sobe os contêineres navarro_blog_front <br> `docker-clean`: Remove as imagens docker do projeto

## Configuração IDE recomendada

Procure no arquivo [extensions.json](https://github.com/bush1D3v/NEI_market_analytics/blob/main/.vscode/extensions.json) as recomendações e instale-as no seu VSCode.

## Suporte de tipo para importações `.vue` em TS

O TypeScript não pode manipular informações de tipo para importações `.vue` por padrão, então substituímos o CLI `tsc` por `vue-tsc` para verificação de tipo. Em editores, precisamos de [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para tornar o serviço de linguagem TypeScript ciente dos tipos `.vue`.

## Configuração do projeto

```sh
bun install
```

### Compilar e recarregar rapidamente para desenvolvimento

```sh
bun dev
```

### Verificação de tipo, compilação e minimização para produção

```sh
bun build
```

### Executar testes de unidade com [Vitest](https://vitest.dev/)

```sh
bun tests
```

Isso executa os testes de ponta a ponta no servidor de desenvolvimento Vite.
É muito mais rápido do que a compilação de produção.

ENG 🇺🇸

# 📊 Nei Market Analytics

![License](https://img.shields.io/static/v1?label=license&message=MIT&color=orange) &nbsp;
![Bun version](https://img.shields.io/static/v1?label=bun&message=v1.1.24&color=yellow) &nbsp;
![Repository size](https://img.shields.io/github/repo-size/bush1D3v/NEI_market_analytics?color=blue) &nbsp;
![Pull request](https://img.shields.io/static/v1?label=PR&message=welcome&color=green)

## 🔍 About the Project

The **NEI Market Analytics** is an open-source project designed to provide comprehensive market value analyses for various financial instruments and digital assets. This repository aims to create a robust platform for tracking and analyzing market trends across multiple sectors.

## 🛠️ Technologies and Tools Used

<div align='center'>
   <img align='center' height='50' width='70' title='Vue.js' alt='vuejs' src='https://github.com/devicons/devicon/blob/master/icons/vuejs/vuejs-original.svg' />&nbsp;&nbsp;
   <img align='center' height='50' width='50' title='Shadcn-vue' alt='shadcnvue' src='https://github.com/user-attachments/assets/1d2298ae-03ea-4392-b0d2-e3fc12908bc7' />&nbsp;&nbsp;&nbsp;&nbsp;
   <img align='center' height='50' width='50' title='Pinia' alt='pinia' src='https://github.com/user-attachments/assets/abb5c37c-372d-4f29-b4ba-27fbe1d7c970' />&nbsp;&nbsp;
   <img align='center' height='55' width='55' title='Mitt' alt='mitt' src='https://github.com/user-attachments/assets/f37880f9-d7f9-42ff-ad39-8c3d8fbbecf1' />&nbsp;
   <img align='center' height='54' width='68' title='Bun.js' alt='bunjs' src='https://github.com/devicons/devicon/blob/master/icons/bun/bun-original.svg' />
   <img align='center' height='64' width='78' title='Node.js' alt='nodejs' src='https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg' />&nbsp;
   <img align='center' height='50' width='68' title='Tailwindcss' alt='tailwindcss' src='https://github.com/devicons/devicon/blob/master/icons/tailwindcss/tailwindcss-original.svg' />&nbsp;
   <img align='center' height='50' width='70' title='TypeScript' alt='typescript' src='https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg' />&nbsp;&nbsp;
   <img align='center' height='68' width='72' title='Potcss' alt='postcss' src='https://github.com/bush1D3v/my_portfolio/assets/133554156/85b7c73b-e181-4c95-b9de-a8e0ba0523d3' />&nbsp;
   <img align='center' height='49' width='49' title='Dotenv' alt='dotenv' src='https://github.com/bush1D3v/navarro_blog_api/assets/133554156/de030e87-8f12-4b6b-8c75-071bab8526a5' /> &nbsp;
   <img align='center' height='48' width='48' title='GitHub Actions' alt='github actions' src='https://github.com/bush1D3v/navarro_blog_api/assets/133554156/0ce89dba-2909-4673-8b71-94a135f61bfb' /> &nbsp;
   <img align='center' height='70' width='70' title='Docker' alt='docker' src='https://github.com/devicons/devicon/blob/master/icons/docker/docker-plain.svg' /> &nbsp;
   <img align='center' height='54' width='44' title='Vitest' alt='vitest' src='https://github.com/bush1D3v/tsbank_api/assets/133554156/74803ee6-3f6e-4335-9f56-cb887a4285ff' />  &nbsp;&nbsp;
   <img align='center' height='54' width='44' title='Storybook-js' alt='storybook-js' src='https://github.com/bush1D3v/my_portfolio/assets/133554156/213c8aa4-ce24-4b30-8e07-dceb476e8589' /> &nbsp;&nbsp;&nbsp;
   <img align='center' height='50' width='50' title='VueUse' alt='vueuse' src='https://github.com/user-attachments/assets/c4eb21ad-858d-4f28-a2c7-1dd0c23342c1' /> &nbsp;
   <img align='center' height='50' width='60' title='Biomejs' alt='biomejs' src='https://github.com/user-attachments/assets/b3d8a249-e17f-4e64-9608-4a4783b7bbc0' /> &nbsp;
   <img align='center' height='50' width='50' title='Chromatic' alt='chromatic' src='https://github.com/user-attachments/assets/6edd5832-5db7-4e2a-a8e4-4bbe7b8e7208' /> &nbsp;
</div>

## 🏗 Structure and Architecture

The project follows the principles of **clean architecture**, and the code was organized according to the principles of **modularity**, **reusability** and **single responsibility**.

## 🐳 Docker

With the addition of Docker, you can now use the scripts provided in `package.json` to build the docker image and run the application container.

To do this, here is the list of functions for each script:

> `docker-build`: Builds the project's docker images <br> `docker-run`: Runs the navarro_blog_front containers <br> `docker-up`: Builds and up the navarro_blog_front containers <br> `docker-clean `: Remove docker images

## Recommended IDE Setup

Search the [extensions.json](https://github.com/bush1D3v/NEI_market_analytics/blob/main/.vscode/extensions.json) file as per recommendations and install them in your VSCode.

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
bun tests
```
