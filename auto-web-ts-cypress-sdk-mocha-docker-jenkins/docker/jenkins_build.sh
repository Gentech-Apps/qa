#!/usr/bin/env bash
set -ex

WORKSPACE=$1
BUILD_NUMBER=$2

REPOSITORY="12345678.dkr.ecr.some-region.amazonaws.com/internals/cypress"

aws ecr get-login-password --region some-region | sudo docker login --username AWS --password-stdin 12345678.dkr.ecr.some-region.amazonaws.com

docker_tag=${REPOSITORY}:${BUILD_NUMBER}

sudo docker build --no-cache \
             --tag $docker_tag \
             --file ${WORKSPACE}/docker/Dockerfile \
             ${WORKSPACE}/

sudo docker push $docker_tag

docker image rm $docker_tag

MANIFEST=$(aws ecr batch-get-image --repository-name internals/cypress --image-ids imageTag=${BUILD_NUMBER} --output json | jq --raw-output --join-output '.images[0].imageManifest')

aws ecr put-image --repository-name internals/cypress --image-tag latest --image-manifest "$MANIFEST"