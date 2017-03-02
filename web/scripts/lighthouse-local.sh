#!/usr/bin/env bash

OUTPUT_PATH=./lighthouse/audit-local.html
URL="https://www.merlinspotions.com/#mobify-override\&mobify-path=true\&mobify-url=https://localhost:8443/loader.js\&mobify-global=true\&mobify-domain=\&mobify-all=true\&mobify=1\&mobify-debug=1\&mobify-js=1"

concurrently --kill-others --success first --raw \
	'chrome-debug --allow-insecure-localhost --user-agent="Chrome MobifyPreview"' \
	"sleep 5 && lighthouse \
		--skip-autolaunch \
		--output=html \
		--output-path=${OUTPUT_PATH} \
		${URL}"

open $OUTPUT_PATH

 