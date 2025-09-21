FROM oven/bun:1-alpine AS base

FROM base AS builder
WORKDIR /app

RUN bun i -g turbo@^2
COPY . .
RUN turbo prune app-frontend --docker

FROM base AS deps
WORKDIR /app

COPY --from=builder /app/out/json .
RUN bun i

COPY --from=builder /app/out/full .
RUN bunx turbo run build

FROM base AS runner
WORKDIR /app

COPY --from=deps /app/apps/app-frontend/.next/standalone ./
COPY --from=deps /app/apps/app-frontend/.next/static ./apps/app-frontend/.next/static
COPY --from=deps /app/apps/app-frontend/public ./apps/app-frontend/public
RUN rm -rf ./apps/app-frontend/src

ENV PORT=3001
ENV HOSTNAME=0.0.0.0

EXPOSE 3001

CMD ["bun", "--bun", "run", "apps/app-frontend/server.js"]