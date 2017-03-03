#!/usr/bin/env bash
# Run the Lighthouse test against the dev build with continuous integration.

OUTPUT_PATH=./lighthouse/audit-local.html
URL=https://localhost

concurrently --kill-others --success --raw \
	'chrome-debug --allow-insecure-localhost --user-agent="Chrome MobifyPreview"' \
	"sleep 5 && lighthouse --skip-autolaunch --output=html \
		--output-path=./lighthouse/audit-local.html \
		https://www.merlinspotions.com/#mobify-override&mobify-path=true&mobify-url=https://localhost:8443/loader.js&mobify-global=true&mobify-domain=&mobify-all=true&mobify=1&mobify-debug=1&mobify-js=1"


node ./lighthouse/check-score.js
