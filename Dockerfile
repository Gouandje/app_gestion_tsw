FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

# Installez les dépendances pour le développement, y compris mongodb-clients pour mongodump
RUN apk --no-cache add mongodb-tools \
    && npm install --only=development

COPY . . 

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

# Copiez les fichiers construits à partir de la phase de développement
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]