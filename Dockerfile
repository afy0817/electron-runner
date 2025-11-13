FROM --platform=$BUILDPLATFORM node:22.11.0-alpine AS package
WORKDIR /app

RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ARG TARGETARCH
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm_$TARGETARCH,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM package AS builder
WORKDIR /app

COPY src ./src
COPY .prettierignore .prettierrc.yaml build.ts dev.ts electron.vite.config.ts electron-builder.yml eslint.config.mjs package.json pnpm-lock.yaml tsconfig.json tsconfig.node.json tsconfig.web.json ./

ARG ENV
ARG VITE_APP_VERSION
ARG TARGETARCH
RUN --mount=type=cache,id=pnpm_$TARGETARCH,target=/pnpm/store \
    pnpm build

FROM scratch AS artifacts
COPY --from=builder /app/release/ /
