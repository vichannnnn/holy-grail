#!/bin/bash

if [[ -z "$PORKBUN_API_KEY" || -z "$PORKBUN_SECRET_API_KEY" ]]; then
  echo "Error: Environment variables PORKBUN_API_KEY and PORKBUN_SECRET_API_KEY must be set."
  exit 1
fi

ALB_DNS_NAME=$1
DOMAIN=$2
SUBDOMAIN=$3

if [[ "$SUBDOMAIN" == "NONE" ]]; then
  SUBDOMAIN=""
fi

FULL_DOMAIN="${SUBDOMAIN}.${DOMAIN}"

EXISTING_RECORDS=$(curl -s -X POST "https://porkbun.com/api/json/v3/dns/retrieve/${DOMAIN}" \
  -H "Content-Type: application/json" \
  -d '{
    "apikey": "'${PORKBUN_API_KEY}'",
    "secretapikey": "'${PORKBUN_SECRET_API_KEY}'"
  }')


# Step 2: Check if the record already exists
RECORD=$(echo "$EXISTING_RECORDS" | grep -o "{[^}]*}" | grep "\"name\":\"$FULL_DOMAIN\"")
echo "$RECORD"

if [[ -n "$RECORD" ]]; then
  echo "CNAME record for $FULL_DOMAIN already exists. Skipping creation and proceeding to update existing record."

  RECORD_ID=$(echo "$RECORD" | grep -o '"id":"[^"]*' | cut -d':' -f2 | tr -d '"')
  echo "Existing record found for $FULL_DOMAIN. Record ID: $RECORD_ID"

  # Step 3: Update the existing record
  echo "Updating CNAME record for $FULL_DOMAIN to point to $ALB_DNS_NAME"
  curl -s -X POST "https://porkbun.com/api/json/v3/dns/edit/${DOMAIN}/${RECORD_ID}" \
    -H "Content-Type: application/json" \
    -d '{
      "apikey": "'${PORKBUN_API_KEY}'",
      "secretapikey": "'${PORKBUN_SECRET_API_KEY}'",
      "name": "'${SUBDOMAIN}'",
      "type": "CNAME",
      "content": "'${ALB_DNS_NAME}'",
      "ttl": 600
    }'

  echo "Updated CNAME record for $SUBDOMAIN.$DOMAIN pointing to $ALB_DNS_NAME successfully"
  exit 0
fi


echo "Creating CNAME record for $SUBDOMAIN.$DOMAIN pointing to $ALB_DNS_NAME"


# Create a CNAME record via Porkbun API
curl -s -X POST "https://api.porkbun.com/api/json/v3/dns/create/${DOMAIN}" \
  -H "Content-Type: application/json" \
  -d '{
    "apikey": "'${PORKBUN_API_KEY}'",
    "secretapikey": "'${PORKBUN_SECRET_API_KEY}'",
    "name": "'${SUBDOMAIN}'",
    "type": "CNAME",
    "content": "'${ALB_DNS_NAME}'",
    "ttl": 600
  }'

echo "Created CNAME record for $SUBDOMAIN.$DOMAIN pointing to $ALB_DNS_NAME successfully"