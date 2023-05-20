FROM node:18-alpine

COPY package*.json .

RUN npm install

COPY . .

RUN npm install && npm run build

CMD ["node", "dist/src/main"]