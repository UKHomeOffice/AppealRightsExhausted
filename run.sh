#!/bin/bash

if [ "$NODE_ENV" = "development" ] #use this for local machine dev on port 8080
then echo "starting the service"
     if pidof -o %PPID -x "are">/dev/null; then
       echo "stopping pid $$"
       npm stop
     fi

     CONFIG_FILE=config_dev.yml npm run dev


elif [ "$NODE_ENV" = "so-ci" ] #use this on ci.so
then echo "starting service"
     SITEROOT=/are node /var/www/are/app.js
fi
