# -----------------------------------------------
# Stage 1 (production base)
# -----------------------------------------------
FROM node:14.7-alpine as base

ENV NODE_ENV=production

EXPOSE 5050

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

# -----------------------------------------------
# Stage 2 (development)
# -----------------------------------------------
FROM base as dev

ENV NODE_ENV=development

ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app

RUN npm install --only=development

WORKDIR /app/server

CMD ["nodemon", "server.js"]

# -----------------------------------------------
# Stage 3 (production)
# -----------------------------------------------
FROM base as prod

WORKDIR /app/server

COPY ./server .

CMD ["node", "server.js"]