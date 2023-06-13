FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

CMD [ "node", "dist/main.js" ]