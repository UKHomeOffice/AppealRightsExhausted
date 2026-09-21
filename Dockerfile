FROM quay.io/ukhomeofficedigital/hof-nodejs:24.21.0-alpine3.24@sha256:80b294ce5027fdc87c58cc990f4d9804323a1734c1e8a1ae9d6bbe569fa8b01e

USER root

# Switch to UK Alpine mirrors, update package index and upgrade all installed packages
RUN echo "http://uk.alpinelinux.org/alpine/v3.24/main" > /etc/apk/repositories ; \
    echo "http://uk.alpinelinux.org/alpine/v3.24/community" >> /etc/apk/repositories ; \
    apk upgrade --no-cache    

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app

COPY --chown=999:998 . /app

RUN yarn install --frozen-lockfile --production && \
    yarn run postinstall

HEALTHCHECK --interval=5m --timeout=3s \
 CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
