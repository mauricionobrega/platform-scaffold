#!/usr/bin/env bash

OUTPUT_PATH=./reports/audit-prod.html
# See package.json's siteUrl key.
URL=${1-$npm_package_siteUrl}

lighthouse \
	--view \
	--output=html \
	--output-path=$OUTPUT_PATH \
	$URL
