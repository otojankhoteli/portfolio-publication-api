FROM node:14-alpine as builder

WORKDIR /app
EXPOSE 80

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY ormconfig.ts .

RUN yarn install

COPY src src
COPY index.ts .

RUN npx tsc

FROM node:14-alpine
WORKDIR /app

COPY --from=builder /app/dist .
COPY yarn.lock .
COPY package.json .
RUN yarn install --production

CMD ["node", "./index.js"]