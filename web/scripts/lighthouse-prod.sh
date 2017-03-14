#!/usr/bin/env bash

OUTPUT_PATH=./reports/audit-prod.html
URL=https://www.merlinspotions.com

lighthouse \
	--view \
	--output=html \
	--output-path=$OUTPUT_PATH \
	$URL
