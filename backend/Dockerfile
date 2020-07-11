FROM node:12-alpine
MAINTAINER okira omarrafat60@gmail.com

COPY package*.json ./

RUN npm init -y
RUN npm i
RUN mkdir src

WORKDIR /src

COPY . .

EXPOSE 3000
EXPOSE 27017