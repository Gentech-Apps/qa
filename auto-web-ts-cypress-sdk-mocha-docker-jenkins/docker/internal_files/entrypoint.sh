#!/bin/bash +e

ENV=${1}
BROWSER=${2}
SPEC=${3}
cypress_key=$(aws secretmanager get-secrets-value \
  --secret-id qa-internal/automation/${ENV}/cypress-cloud-record-key \
  --region us-east-1 \
  --output text \
  --query SecretString)

# For jenkins build
aws secretsmanager get-secret-value \
  --secret-id qa-internal/automation/${ENV}/demo.conf \
  --region us-east-1 \
  --output text \
  --query SecretString > /root/demo.conf

set -x

npx cypress run \
  --browser ${BROWSER} \
  --headless \
  --config-file automation.config.ts ${SPEC}

cp -r /app/cypress/report/html /tmp/report/