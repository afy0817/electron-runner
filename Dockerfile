FROM electronuserland/builder:latest AS package
WORKDIR /app
ENV CI=true
RUN corepack enable && corepack prepare pnpm@10 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM package AS builder
WORKDIR /app
COPY . .
ARG TAG
ENV TAG=$TAG
RUN pnpm exec electron-vite build
RUN pnpm exec electron-builder --linux

FROM scratch AS artifacts
COPY --from=builder /app/release/ /
