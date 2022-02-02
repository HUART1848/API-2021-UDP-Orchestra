FROM node:alpine

WORKDIR /opt/app

COPY src/package*.json ./

RUN npm install

COPY src/index.js .

EXPOSE 2205

# ENTRYPOINT instead of CMD to be able to use CLI arguments
CMD ["node", "--experimental-modules", "index.js"]
