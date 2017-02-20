OUTPUT_PATH=./lighthouse/audit-prod.html
URL=https://localhost

lighthouse \
	--output=html \
	--output-path=$OUTPUT_PATH \
	$URL

open $OUTPUT_PATH