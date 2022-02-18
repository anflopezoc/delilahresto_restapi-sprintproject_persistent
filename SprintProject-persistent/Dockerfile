FROM node:17.5.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm i -g pm2@latest

COPY . .

CMD ["pm2-runtime","start","ecosystem.config.js","--env","production","--watch"]



 