FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.18.3 --activate

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
RUN pnpm turbo run build --filter=shop...

FROM base AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 medusa
USER medusa

COPY --from=installer --chown=medusa:nodejs /app .

WORKDIR /app/apps/shop

EXPOSE 9000

CMD ["pnpm", "start"]
