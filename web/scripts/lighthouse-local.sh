OUTPUT_PATH=./lighthouse/audit-local.html
URL=https://localhost

concurrently --kill-others --success first --raw \
	'npm run proxy' \
	'chrome-debug --allow-insecure-localhost' \
	"sleep 5 && lighthouse \
		--skip-autolaunch \
		--output=html \
		--output-path=${OUTPUT_PATH} \
		${URL}"

open $OUTPUT_PATH

 