FROM oven/bun:1-alpine AS base

FROM base AS builder
WORKDIR /app

RUN bun i -g turbo@^2

COPY . .

RUN turbo prune frontend --docker

FROM base AS deps
WORKDIR /app

COPY --from=builder /app/out/json .
RUN bun install

COPY --from=builder /app/out/full .
RUN bunx turbo run build --filter=frontend -- --webpack

FROM base AS runner
WORKDIR /app

COPY --from=deps /app .

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

WORKDIR /app/apps/frontend
CMD ["bun", "run", "start"]
