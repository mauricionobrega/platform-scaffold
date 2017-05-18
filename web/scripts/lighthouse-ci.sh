#!/usr/bin/env bash
# Run the Lighthouse test against the dev build with continuous integration.

# Location to save the generated HTML report.
OUTPUT_PATH=./lighthouse/audit-local.html
# See package.json's siteUrl key.
URL=${1-$npm_package_siteUrl}
# Append Mobify Hash to the URL to force the Mobify Tag to load the local bundle.
PREVIEW=#mobify-override\&mobify-path=true\&mobify-url=https://localhost:8443/loader.js\&mobify-global=true\&mobify-domain=\&mobify-all=true\&mobify=1\&mobify-debug=1\&mobify-js=1

trap 'kill $(jobs -pr)' SIGINT SIGTERM EXIT

# Lighthouse uses your local installation of Chrome, which should be at least
# version 54.0. Use a custom user agent containing "MobifyPreview" so that
# Preview will accept our requests, and disable device emulation so that the
# "MobifyPreview" user agent does not get overridden.

# Finally, parse the HTML report for the Lighthouse score.
# CI will fail the build if the score is below a threshold.
# See min_lighthouse_score in package.json

sudo apt-get install libnss3-tools
# Initialize database of certificates
mkdir -p $HOME/.pki/nssdb
# Pass in a password
certutil -d $HOME/.pki/nssdb -N --empty-password
# Add self-signed SSL certificate
certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n dev-server/localhost.pem -i dev-server/localhost.pem

npm run prod:build
npm run test:server &

# --ignore-certificate-errors thanks to https://github.com/GoogleChrome/lighthouse/issues/559
sleep 5
lighthouse \
    --chrome-flags='--user-agent="MobifyPreview" --allow-insecure-localhost --ignore-certificate-errors' \
    --output=html \
    --output-path=${OUTPUT_PATH} \
    --disable-device-emulation=true \
    "${URL}${PREVIEW}"

node ./lighthouse/check-score.js
