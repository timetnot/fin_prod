FROM node:20-slim

WORKDIR /app

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci --only=production

COPY . .

# Generate Prisma client
RUN npx prisma generate

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/src/main.js"]
