#!/bin/bash

docker build -t test-repo-image:latest .
snyk config set api=$SNYK_TOKEN
snyk container test test-repo-image
curl -s https://ci-tools.anchore.io/inline_scan-latest | bash -s -- -r test-repo-image:latest
