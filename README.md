# AppealRightsExhausted
A calculator to determine Appeal Rights Exhausted

# Setup
# Comment to trigger a build to test nginx ratew limiter on the nginx deployment

## Install prerequisites

Install Node version manager:

[NVM](https://github.com/nvm-sh/nvm)

use Node version 20 or above:

```bash
nvm install 20
nvm use 20
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

## Bank Holiday Exclusion Dates

Exclusion dates are needed to be updated in the application to ensure the right ARE date is given to the user. This is usually if they specify a date that lands on a bank holiday or a date between the period of 27th December-31st December when British courts are shut.

In order to ensure these are up to date and not manually hard coded into the application the Gov.UK Bank Holidays website/API is used to fetch this information.

In the 'data/exclusion_days.json' file, this is created using the 'apps/are_form/models/exclusion_dates.js' model to call the API and transform the data into the appropriate format.

Currently, this file is committed to the project but is automatically updated whenever this application is run locally in case there is an update to the bank holidays API. Also, once the application is running, this data is updated once a day to ensure when there are infrequent updates to the API, if the server itself has not been restarted for a prolonged period of time, that the latest information is being used to process the ARE date for the user. Furthermore, if the server is restarted, or a deployment has been made to production, it also attempts to update the data file by calling the API at this moment too. All in all, this process has been put in place to look at for infrequent API updates, but also to ensure an offline backup of the data exists in the Gov.UK site or Bank Holidays page/API is down for any particular reason.
