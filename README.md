# AppealRightsExhausted
A calculator to determine Appeal Rights Exhausted

# Setup

## Install prerequisites

Install Node version manager:

[NVM](https://github.com/nvm-sh/nvm)

use Node version 14 or above:

```bash
nvm install 14
nvm use 14
```

Install yarn and run yarn:

[install yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)

```bash
yarn
```

Install brew:

[Brew installation instructions](https://brew.sh/)

Install redis:

```bash
brew install redis
```

Start redis:

```bash
brew services start redis
```

## Run the app

Any of the following commands will start the app, accessible at `localhost:8080`. `npm run dev` starts the app in 'watch' mode, so it will update as you make code changes. `npm run debug` starts the app with Node dev tools available in the Chrome browser, accessible on the [Chrome inspect page](chrome://inspect/#devices).

```bash
yarn start
yarn start:dev
yarn run debug
```
