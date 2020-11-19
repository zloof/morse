FROM node:14.15.0 as base

WORKDIR /app

ARG PORT
ENV PORT ${PORT}

ARG BRANCH_NAME
ENV BRANCH_NAME ${BRANCH_NAME}

COPY package.json package-lock.json /app/

RUN npm install --only=prod

COPY . /app


FROM base as server

CMD npm run server


FROM base as client

RUN npm i

CMD npm run test
