#!/usr/bin/env bash

# Location to save the generated HTML report.
OUTPUT_PATH=./reports/audit-local.html
# Can also pass in URL as first argument. If none given, fallback to what's specified in package.json's siteUrl key.
URL=${1-$npm_package_siteUrl}
# This is the Mobify hash that gets appended to the URL after Previewing.
PREVIEW=#mobify-override\&mobify-path=true\&mobify-url=https://localhost:8443/loader.js\&mobify-global=true\&mobify-domain=\&mobify-all=true\&mobify=1\&mobify-debug=1\&mobify-js=1

# The development server should already be running via 'npm run dev'
# Lighthouse uses your local installation of Chrome, which should be at least 
# version 54.0. Use a custom user agent containing "MobifyPreview" so that 
# Preview will accept our requests, and disable device emulation so that the
# "MobifyPreview" user agent does not get overridden. 
# Make sure you have trusted the self-signed SSL certificate. 
# See 'Prevent SSL Errors in Preview' in the README.

lighthouse \
	--view \
	--chrome-flags='--user-agent="MobifyPreview" --allow-insecure-localhost --unsafely-treat-insecure-origin-as-secure' \
	--output=html \
	--output-path=${OUTPUT_PATH} \
	--disable-device-emulation=true \
	"${URL}${PREVIEW}"

 