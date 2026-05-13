# syntax=docker/dockerfile:1

# Install all dependencies and compile TypeScript to dist/
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.ts tsconfig.json ./
COPY src ./src

RUN npm run build \
  && mkdir -p dist/src/database \
  && cp -r src/database/data dist/src/database/data

# Production image: runtime deps only + compiled output
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN chown -R node:node /app /usr/local/bin/docker-entrypoint.sh
USER node

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
