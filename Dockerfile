# Stage 1: Development
FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

# Installez les dépendances pour le développement, y compris mongodb-clients pour mongodump
RUN apk --no-cache add mongodb-tools \
    && npm install --only=development

COPY . .

RUN ls -la  # Ajoutez cette ligne pour afficher le contenu du répertoire de travail

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Installez seulement les dépendances de production
RUN npm install --only=prod

# Copiez les fichiers construits à partir de la phase de développement
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
