FROM node:14.17-alpine AS dependencies

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install -s; \
    else npm install -s --only=production; \
    fi

COPY .env.example .env

COPY ./ ./

EXPOSE 5000

CMD ["npm", "run", "dev"]