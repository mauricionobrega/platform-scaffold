#!/usr/bin/env bash

# Location to save the generated HTML report.
OUTPUT_PATH=./reports/audit-local.html
# Change www.merlinspotions.com to the project's URL. 
URL=https://www.merlinspotions.com/#mobify-override\&mobify-path=true\&mobify-url=https://localhost:8443/loader.js\&mobify-global=true\&mobify-domain=\&mobify-all=true\&mobify=1\&mobify-debug=1\&mobify-js=1

# The development server should already be running via 'npm run dev'
# Lighthouse uses your local installation of Chrome, which should be at least 
# version 54.0. Use a custom user agent containing "MobifyPreview" so that 
# Preview will accept our requests, and disable device emulation so that the
# "MobifyPreview" user agent does not get overridden. 

lighthouse \
	--view \
	--chrome-flags='--user-agent="MobifyPreview" --allow-insecure-localhost' \
	--output=html \
	--output-path=${OUTPUT_PATH} \
	--disable-device-emulation=true \
	"${URL}"

 