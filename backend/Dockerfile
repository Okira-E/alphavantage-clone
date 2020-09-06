FROM node:12-alpine
LABEL author=okira email=omarrafat60@gmail.com

COPY package*.json ./

RUN npm init -y
RUN npm i
RUN mkdir src

WORKDIR /src

COPY . .

EXPOSE 3200
EXPOSE 27017