FROM node:lts

LABEL maintainer="contato@platiplus.dev"

WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install --quiet

COPY . /usr/src/app