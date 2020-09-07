# Alphavantage Clone

A clone of https://alphavantage.co project that relies heavily on the Node.js backend that allows developers to fetch dummy data stored in a Postgres database using unique non-expiring Api Keys stored in the MongoDB Users database all running using Docker

## Getting Started

this is a guide to how you can clone and install the dependencies to get it running

## Prerequisites

`Node.js`\
`npm` Package Manager\
`Docker`

## Steps

after cloning the project go to the root directory for both frontend and backend and run `npm install` which will install all the dependencies needed.\
to start the server in the backend directory run `docker build .` then `docker-compose up` to spin the containers with all the images: node:12-alpine, mongodb and postrgres
