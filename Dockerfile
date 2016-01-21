FROM vaijab/nodejs:0.12.7

RUN useradd -d /app app
USER app

WORKDIR /app
COPY package.json /app/package.json
COPY assets /app/assets
RUN npm install
COPY . /app

USER root
EXPOSE 8080
CMD /app/run.sh

