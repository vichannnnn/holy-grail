FROM oven/bun:1-alpine AS base

FROM base AS builder
WORKDIR /app

RUN bun i -g turbo@^2
COPY . .
RUN turbo prune frontend --docker

FROM base AS deps
WORKDIR /app

COPY --from=builder /app/out/json .
RUN bun i

COPY --from=builder /app/out/full .
RUN bunx turbo run build

FROM base AS runner
WORKDIR /app

COPY --from=deps /app/apps/frontend/.next/standalone ./
COPY --from=deps /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=deps /app/apps/frontend/public ./apps/frontend/public
RUN rm -rf ./apps/frontend/src

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["bun", "--bun", "run", "apps/frontend/server.js"]