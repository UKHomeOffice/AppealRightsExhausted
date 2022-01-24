#!/bin/sh

# Remove the directories we're going to copy stuff to, so we don't get old files hanging around
rm -rf   public/fonts

# Copy our own assets
# cp -r    assets/images \
#          public/images

# mkdir -p public/assets/js
# cp -r    assets/js \
#          public/assets

# Copy GOV.UK Frontend images
# (See https://github.com/alphagov/govuk-frontend/blob/master/docs/installation/installing-with-npm.md#importing-assets)
cp -r    node_modules/govuk-frontend/govuk/assets/images \
         public/


# Copy GOV.UK Frontend fonts
# (See https://github.com/alphagov/govuk-frontend/blob/master/docs/installation/installing-with-npm.md#importing-assets)
mkdir -p public/fonts

cp -r    node_modules/govuk-frontend/govuk/assets/fonts \
         public/