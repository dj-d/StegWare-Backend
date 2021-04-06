FROM node:latest

#ENV PORT=3000

COPY . /app
WORKDIR /app

RUN npm i -g npm@latest && npm ci && npm audit fix

#EXPOSE $PORT
ENTRYPOINT ["npm", "start"]
