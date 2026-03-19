FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.18.3 --activate
ENV MEDUSA_ADMIN_ONBOARDING_TYPE=none

FROM base AS builder
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app
COPY . .
RUN npx turbo prune --scope=shop --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm run --filter=shop build

FROM base AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production

COPY --from=installer --chown=medusa:nodejs /app/apps/shop/.medusa/server .

WORKDIR /app

RUN pnpm install
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 medusa
USER medusa

EXPOSE 9000

# Run migrations automatically on startup before launching the server
CMD ["pnpm", "start"]
