#!/bin/bash

if [[ -z "$PORKBUN_API_KEY" || -z "$PORKBUN_SECRET_API_KEY" ]]; then
  echo "Error: Environment variables PORKBUN_API_KEY and PORKBUN_SECRET_API_KEY must be set."
  exit 1
fi

DOMAIN=$1
SUBDOMAIN=$2
TYPE=$3

FULL_DOMAIN="${SUBDOMAIN}.${DOMAIN}"

EXISTING_RECORDS=$(curl -s -X POST "https://api.porkbun.com/api/json/v3/dns/retrieveByNameType/${DOMAIN}/${TYPE}/${SUBDOMAIN}" \
  -H "Content-Type: application/json" \
  -d '{
    "apikey": "'${PORKBUN_API_KEY}'",
    "secretapikey": "'${PORKBUN_SECRET_API_KEY}'"
  }')

RECORD_ID=$(echo "$EXISTING_RECORDS" | jq -r '.records[0].id')


if [[ -z "$RECORD_ID" || "$RECORD_ID" == "null" ]]; then
  echo "No existing DNS record found for $SUBDOMAIN.$DOMAIN. Skipping deletion."
  exit 0
fi

echo "Deleting CNAME record for $FULL_DOMAIN with ID $RECORD_ID"
curl -s -X POST "https://api.porkbun.com/api/json/v3/dns/delete/${DOMAIN}/${RECORD_ID}" \
  -H "Content-Type: application/json" \
  -d '{
    "apikey": "'${PORKBUN_API_KEY}'",
    "secretapikey": "'${PORKBUN_SECRET_API_KEY}'"
  }'
echo "Deleted CNAME record for $FULL_DOMAIN successfully."
