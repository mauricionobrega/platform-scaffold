#!/usr/bin/env bash

OUTPUT_PATH=./lighthouse/audit-local.html
URL=https://www.merlinspotions.com/#mobify-override\&mobify-path=true\&mobify-url=https://localhost:8443/loader.js\&mobify-global=true\&mobify-domain=\&mobify-all=true\&mobify=1\&mobify-debug=1\&mobify-js=1
# URL="https://www.merlinspotions.com/#mobify-override&mobify-path=true&mobify-url=https://localhost:8443/loader.js&mobify-global=true&mobify-domain=&mobify-all=true&mobify=1&mobify-debug=1&mobify-js=1"

# The development server should already be running via 'npm run dev'
# chrome-debug is available via the Lighthouse module. This uses your local
# installation of Chrome, which should be at least version 54.0. 
# Use a custom user agent containing "MobifyPreview" so that Preview will
# accept our requests. 

# Change www.merlinspotions.com to the project's URL. 

# concurrently --kill-others --success --raw \
# 	'chrome-debug --allow-insecure-localhost --user-agent="Chrome MobifyPreview"' \
# 	"sleep 5 && lighthouse --skip-autolaunch --output=html \
# 		--output-path=./lighthouse/audit-local.html \
# 		https://www.merlinspotions.com/#mobify-override&mobify-path=true&mobify-url=https://localhost:8443/loader.js&mobify-global=true&mobify-domain=&mobify-all=true&mobify=1&mobify-debug=1&mobify-js=1"

lighthouse \
	--chrome-flags='--user-agent="MobifyPreview" --allow-insecure-localhost' \
	--output=html \
	--output-path=${OUTPUT_PATH} \
	--view=true \
	--disable-device-emulation=true \
	"https://www.merlinspotions.com/#mobify-override&mobify-path=true&mobify-url=https://localhost:8443/loader.js&mobify-global=true&mobify-domain=&mobify-all=true&mobify=1&mobify-debug=1&mobify-js=1"
	# "${URL}"
	# ${URL}

# open ${OUTPUT_PATH}

 