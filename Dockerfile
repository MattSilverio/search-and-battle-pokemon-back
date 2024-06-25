# Use uma imagem base do Node.js
FROM node:14-alpine

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
