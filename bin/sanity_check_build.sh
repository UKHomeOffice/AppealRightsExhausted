#!/bin/sh
set -e

export STATUS=$(drone build info $GIT_REPO $DRONE_BUILD_PARENT --format {{.Status}})
export BRANCH=$(drone build info $GIT_REPO $DRONE_BUILD_PARENT --format {{.Target}})
export EVENT=$(drone build info $GIT_REPO $DRONE_BUILD_PARENT --format {{.Event}})
export REFS=$(drone build info $GIT_REPO $DRONE_BUILD_PARENT --format {{.Ref}})

if [[ "$STATUS" != "success" || "$BRANCH" != "master" || "$EVENT" != "push" || "$REFS" != "refs/heads/master" ]]; then
  echo "Build number $DRONE_BUILD_PARENT has not passed all relevant checks to Staging!"
  exit 1
fi

echo "Build number $DRONE_BUILD_PARENT passed sanity check. Ready to deploy to PROD!"
