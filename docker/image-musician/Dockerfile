FROM node:alpine

WORKDIR /opt/app

COPY package*.json ./

RUN npm install

COPY index.js .

EXPOSE 2205

CMD ["node", "--experimental-modules" ,"index.js"]
