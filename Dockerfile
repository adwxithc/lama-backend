# syntax=docker/dockerfile:1.6

# -------- Stage 1: Build --------
FROM node:20-bullseye-slim AS builder

WORKDIR /usr/src/app

# Copy dependency files first (better caching)
COPY package*.json ./

# Use cache mount for faster installs
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build


# -------- Stage 2: Production --------
FROM node:20-bullseye-slim

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install only production dependencies with cache mount
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci --omit=dev

# Copy built output only
COPY --from=builder /usr/src/app/dist ./dist

# Switch to non-root user
USER node

EXPOSE 5000

CMD ["node", "dist/index.js"]