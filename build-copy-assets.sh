#!/bin/sh

# Remove the directories we're going to copy stuff to, so we don't get old files hanging around
rm -rf   public/fonts

# Copy our own assets
# cp -r    assets/images \
#          public/images

# mkdir -p public/assets/js
# cp -r    assets/js \
#          public/assets

# Copy GOV.UK Frontend JavaScript
# (See https://github.com/alphagov/govuk-frontend/blob/master/docs/installation/installing-with-npm.md#option-1-include-javascript)
mkdir -p public/js/govuk-frontend/govuk

cp       node_modules/govuk-frontend/govuk/all.js \
         public/js/govuk-frontend/govuk/all.js

cp       assets/js/init-govuk.js \
         public/js/govuk-frontend/govuk/init-govuk.js


# Copy GOV.UK Frontend images
# (See https://github.com/alphagov/govuk-frontend/blob/master/docs/installation/installing-with-npm.md#importing-assets)
# mkdir -p public/images
# cp -r    node_modules/govuk-frontend/govuk/assets/images \
#          public


# Copy GOV.UK Frontend fonts
# (See https://github.com/alphagov/govuk-frontend/blob/master/docs/installation/installing-with-npm.md#importing-assets)
# mkdir -p public/fonts

# cp -r    node_modules/govuk-frontend/govuk/assets/fonts \
#          public
