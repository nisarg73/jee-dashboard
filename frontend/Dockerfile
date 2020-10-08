FROM node:14.4.0-alpine3.10

LABEL maintainer="Nisarg Patel <https://nisarg73.github.io/>"

USER root

WORKDIR /frontend

COPY . /frontend

RUN npm install

RUN npm run build
