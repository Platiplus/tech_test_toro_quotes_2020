FROM node:lts

LABEL maintainer="contato@platiplus.dev"

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

COPY package.json /usr/src/app

RUN npm install -g nodemon

RUN npm install

COPY . /usr/src/app

CMD [ "nodemon", "-L", "src/server.js" ]
