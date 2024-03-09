# Utilisez une image Node.js de votre choix
FROM node:14

# Installation des outils MongoDB
RUN apt-get update && \
    apt-get install -y mongodb-clients && \
    rm -rf /var/lib/apt/lists/*

# Configuration de l'environnement de travail
WORKDIR /usr/src/app

# Copiez les fichiers nécessaires (package.json, dist, etc.)
COPY package*.json ./
COPY dist ./dist

# Installation des dépendances
RUN npm install --production

# Exécutez l'application NestJS
CMD ["npm", "start"]
