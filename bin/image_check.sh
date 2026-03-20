#!/bin/bash

docker build -t test-repo-image:latest . || docker build -t test-repo-image:latest ..
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image --severity LOW,MEDIUM,HIGH,CRITICAL test-repo-image:latest
