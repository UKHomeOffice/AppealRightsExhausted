# -----------------------------
# Stage 1: Builder
# -----------------------------
FROM quay.io/ukhomeofficedigital/hof-nodejs:24.22.2_3-alpine@sha256:ebf742568d6fa9505e5b8740dbb6bf7f4d38ea3a22fc2a940ee57cfa3a95a41e AS builder

USER root
WORKDIR /app

COPY . /app

RUN yarn install --frozen-lockfile --production

# -----------------------------
# Stage 2: Runtime
# -----------------------------
FROM quay.io/ukhomeofficedigital/hof-nodejs:24.22.2_3-alpine@sha256:ebf742568d6fa9505e5b8740dbb6bf7f4d38ea3a22fc2a940ee57cfa3a95a41e

USER root

RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

WORKDIR /app

COPY --from=builder --chown=999:998 /app/node_modules /app/node_modules
COPY --from=builder --chown=999:998 /app/. /app

USER 999

HEALTHCHECK --interval=5m --timeout=3s \
 CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
