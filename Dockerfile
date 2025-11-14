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

# Build app + package
RUN pnpm exec electron-vite build
RUN pnpm exec electron-builder --linux

RUN mkdir -p /release-final \
    && cp -r /app/release/* /release-final/

# artifacts stage = buildx가 export할 rootfs
FROM scratch AS artifacts
COPY --from=builder /release-final/ /
