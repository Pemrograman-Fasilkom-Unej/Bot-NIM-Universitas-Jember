FROM node:14.4.0-alpine

COPY package.json .
COPY package-lock.json .

RUN npm install --production

COPY . .

ENV NODE_ENV production
ENV DATABASE_HOST mysql

ENV DATABASE_NAME nim_bot
ENV DATABASE_USERNAME root
ENV DATABASE_PASSWORD pass

ENV BOT_NAME "Search NIM Bot"
ENV BOT_USERNAME unej_nim_bot
ENV BOT_TOKEN token

ENV REDIS_HOST redis
ENV REDIS_PORT 6379
ENV REDIS_PASSWORD null

ENV WEBHOOK_DOMAIN https://yourdomain.com
ENV WEBHOOK_PORT 3000

EXPOSE 3000

CMD ["node", "index.js"]