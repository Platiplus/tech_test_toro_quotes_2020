FROM node:lts

LABEL maintainer="contato@platiplus.dev"

WORKDIR /usr/src/app

COPY package.json .
RUN npm install --quiet

COPY . .