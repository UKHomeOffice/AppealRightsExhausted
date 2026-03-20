#! /bin/bash
set -e

export INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-internal-annotations.yaml
export INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-external-annotations.yaml
export CONFIGMAP_VALUES=$HOF_CONFIG/configmap-values.yaml
export NGINX_SETTINGS=$HOF_CONFIG/nginx-settings.yaml

kd='kd --insecure-skip-tls-verify --timeout 10m --check-interval 10s'
redis_storage_files='kube/redis/redis-persistent-volume-claim.yml'
redis_runtime_files='kube/redis/redis-service.yml -f kube/redis/redis-network-policy.yml -f kube/redis/redis-deployment.yml'
export REDIS_STORAGE_CLASS=${REDIS_STORAGE_CLASS:-gp2-encrypted-eu-west-2b}

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(cat /root/.dockersock/branch_name.txt)

  $kd --delete -f kube/configmaps/configmap.yml
  $kd --delete -f kube/redis -f kube/app
  echo "Torn Down UAT Branch - are-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(echo $DRONE_SOURCE_BRANCH | tr '[:upper:]' '[:lower:]' | tr '/' '-')

if [[ ${REDIS_PVC_RECREATE} == "true" ]]; then
  $kd --delete -f kube/redis/redis-persistent-volume-claim.yml || true
fi

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  $kd -f kube/configmaps -f kube/certs
  $kd -f $redis_storage_files
  $kd -f $redis_runtime_files -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml -f kube/app
  $kd -f $redis_storage_files
  $kd -f $redis_runtime_files
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/app/networkpolicy-internal.yml -f kube/app/ingress-internal.yml
  $kd -f $redis_storage_files
  $kd -f $redis_runtime_files -f kube/app/deployment.yml
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/app/networkpolicy-external.yml -f kube/app/ingress-external.yml
  $kd -f $redis_storage_files
  $kd -f $redis_runtime_files -f kube/app/deployment.yml
fi

sleep $READY_FOR_TEST_DELAY

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  echo "Branch internal 1 - $DRONE_BUILD_NUMBER.internal.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Branch internal 2 - are-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Branch external 1 - are-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Branch external 2 - $DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  echo "UAT internal 1 - are.uat.internal.sas-notprod.homeoffice.gov.uk"
  echo "UAT internal 2 - $APP_NAME.uat.internal.sas-notprod.homeoffice.gov.uk"
  echo "UAT external - $APP_NAME.uat.sas-notprod.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  echo "STG internal 1 - stg.internal.are.sas.homeoffice.gov.uk"
  echo "STG internal 2 - stg.internal.$APP_NAME.sas.homeoffice.gov.uk"
  echo "STG external - preprod.notprod.$APP_NAME.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  echo "PROD external - $PRODUCTION_URL"
fi
