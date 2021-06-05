# -----------------------------------------------
# Stage 1 (production base)
# -----------------------------------------------
FROM node:14.7-alpine as base

ENV NODE_ENV=production

WORKDIR /app/client

COPY package*.json ./

RUN npm ci && npm cache clean --force

# -----------------------------------------------
# Stage 2 (development)
# -----------------------------------------------
FROM base as dev

ENV NODE_ENV=development

EXPOSE 3000

WORKDIR /app/client

RUN npm install

CMD [ "npm", "run", "start" ]

# -----------------------------------------------
# Stage 3 (production)
# -----------------------------------------------
FROM base as prod

WORKDIR /app/client

COPY src public ./

CMD [ "npm", "run", "build" ]

