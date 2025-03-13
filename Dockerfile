# Build Stage
FROM node:20.17.0-alpine3.20@sha256:2cc3d19887bfea8bf52574716d5f16d4668e35158de866099711ddfb2b16b6e0 AS build

USER root

# Update packages as a result of Anchore security vulnerability checks
RUN apk update && \
    apk add --no-cache gnutls binutils nodejs npm apk-tools libjpeg-turbo libcurl libx11 libxml2

# Setup nodejs group & user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999
WORKDIR /app

# Copy source code and install dependencies
COPY --chown=999:998 package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --ignore-optional && \
    yarn run postinstall

COPY --chown=999:998 . .

# Final Stage (Minimal Runtime)
FROM node:20.17.0-alpine3.20@sha256:2cc3d19887bfea8bf52574716d5f16d4668e35158de866099711ddfb2b16b6e0 AS runtime

USER root

# Install only necessary runtime dependencies
RUN apk add --no-cache gnutls binutils libjpeg-turbo libcurl libx11 libxml2

# Use the same user setup as build stage
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999
WORKDIR /app

# Copy built artifacts from build stage
COPY --from=build --chown=999:998 /app /app

HEALTHCHECK --interval=5m --timeout=3s \
 CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
