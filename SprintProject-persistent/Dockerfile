FROM node:17.5.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pm2@latest

RUN npm install


COPY . .

CMD ["pm2", "start","ecosystem.config.js","--env","production","--watch"]


