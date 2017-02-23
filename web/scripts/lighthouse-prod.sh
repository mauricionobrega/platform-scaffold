#!/usr/bin/env bash

OUTPUT_PATH=./lighthouse/audit-prod.html
URL=https://www.merlinspotions.com

lighthouse \
	--output=html \
	--output-path=$OUTPUT_PATH \
	$URL

open $OUTPUT_PATH