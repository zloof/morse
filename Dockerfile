FROM node:14.15.0 as base

WORKDIR /app

COPY package.json package-lock.json ./app/

RUN npm install --only=prod

COPY . /app


FROM base as server

CMD node src/server.js

FROM base as client

CMD node src/client.js