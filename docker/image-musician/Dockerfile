FROM node:alpine

WORKDIR /opt/app

COPY src/package*.json ./

RUN npm install

COPY src/index.js .

EXPOSE 2205

CMD ["node", "--experimental-modules" ,"index.js"]
