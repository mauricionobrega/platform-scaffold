#!/usr/bin/env bash

OUTPUT_PATH=./reports/audit-prod.html
# Can also pass in URL as first argument. If none given, fallback to what's specified in package.json's siteUrl key.
URL=${1-$npm_package_siteUrl}

lighthouse \
	--view \
	--output=html \
	--output-path=$OUTPUT_PATH \
	$URL
