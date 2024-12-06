FROM node:20.18-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/ ./src/

EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]


