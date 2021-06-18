FROM node:14-alpine

RUN apk upgrade --no-cache
RUN apk add git
RUN addgroup -S app
RUN adduser -S app -G app -u 999 -h /app/
RUN chown -R app:app /app/

RUN mkdir /public
RUN chown -R app:app /public

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci --production
COPY . /app

RUN npm --loglevel warn run postinstall

USER 999

CMD /app/run.sh
