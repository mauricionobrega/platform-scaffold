OUTPUT_PATH=./lighthouse/audit-prod.html

lighthouse \
	--output=html \
	--output-path=$OUTPUT_PATH \
	https://www.merlinspotions.com

open $OUTPUT_PATH