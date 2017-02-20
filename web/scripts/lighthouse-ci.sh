OUTPUT_PATH=./lighthouse/audit-local.html
URL=https://localhost

concurrently --kill-others --success first --raw \
	'npm run dev' \
	'npm run proxy' \
	'chrome-debug --allow-insecure-localhost' \
	"while ! echo exit | nc localhost 8443; do sleep 20; done && lighthouse \
		--skip-autolaunch \
		--output=html \
		--output-path=${OUTPUT_PATH} \
		${URL}"

node ./lighthouse/check-score.js
