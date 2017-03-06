#!/usr/bin/env bash
# Run the Lighthouse test against the dev build with continuous integration.

# The development server should already be running via 'npm run dev'
# chrome-debug is available via the Lighthouse module.
# Use a custom user agent containing "MobifyPreview" so that Preview will
# accept our requests. 

# Finally, parse the HTML report for the Lighthouse score. 
# CI will fail the build if the score is below a threshold.
# See min_lighthouse_score in package.json

# Change www.merlinspotions.com to the project's URL. 

concurrently --kill-others --success --raw \
	'chrome-debug --allow-insecure-localhost --user-agent="Chrome MobifyPreview"' \
	"sleep 5 && lighthouse --skip-autolaunch --output=html \
		--output-path=./lighthouse/audit-local.html \
		https://www.merlinspotions.com/#mobify-override&mobify-path=true&mobify-url=https://localhost:8443/loader.js&mobify-global=true&mobify-domain=&mobify-all=true&mobify=1&mobify-debug=1&mobify-js=1"

node ./lighthouse/check-score.js
