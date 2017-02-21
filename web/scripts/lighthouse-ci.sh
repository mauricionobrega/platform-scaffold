OUTPUT_PATH=./lighthouse/audit-local.html
URL=https://localhost

concurrently --kill-others --success first --raw \
	'npm run dev' \
	'npm run proxy' \
	'chrome-debug --allow-insecure-localhost' \
	'sleep 40 && lighthouse \
		--skip-autolaunch \
		--output=html \
		--output-path=./lighthouse/audit-local.html \
		https://localhost'

node ./lighthouse/check-score.js
