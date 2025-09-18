FROM oven/bun:1-alpine AS base

FROM base AS builder
WORKDIR /app

RUN bun i -g turbo@^2
COPY . .
RUN turbo prune new-frontend --docker

FROM base AS deps
WORKDIR /app

COPY --from=builder /app/out/json .
RUN bun i

COPY --from=builder /app/out/full .
RUN bunx turbo run build

FROM base AS runner
WORKDIR /app

COPY --from=deps /app/apps/new-frontend/.next/standalone ./
COPY --from=deps /app/apps/new-frontend/.next/static ./apps/new-frontend/.next/static
COPY --from=deps /app/apps/new-frontend/public ./apps/new-frontend/public
RUN rm -rf ./apps/new-frontend/src

ENV PORT=3001
ENV HOSTNAME=0.0.0.0

EXPOSE 3001

CMD ["bun", "--bun", "run", "apps/new-frontend/server.js"]