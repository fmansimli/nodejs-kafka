FROM node:18-alpine AS builder

WORKDIR /temp-apps/app

COPY package*.json ./

RUN npm update -g npm
RUN npm install

COPY . ./

RUN npm run build

# prod stage

FROM node:18-alpine
WORKDIR /apps/myapp

COPY --from=builder /temp-apps/app/dist ./dist/

COPY package*.json ./
COPY .env ./


ENV HOST_URL http://example.com

RUN npm update -g npm
RUN npm install -g pm2
RUN npm install

EXPOSE 3001

CMD ["npm","run","serve:pm2"]