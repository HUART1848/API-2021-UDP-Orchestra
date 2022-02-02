FROM node:alpine

WORKDIR /opt/app

COPY src/package*.json ./

RUN npm install

COPY src/index.js .

# ENTRYPOINT instead of CMD to be able to use CLI arguments
ENTRYPOINT ["node --experimental-modules", "index.js"]
