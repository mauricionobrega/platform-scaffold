# Run the Lighthouse test against the dev build with continuous integration.

# Start the dev server
# Spin up Chrome with the option to load a site with insecure certificates
# Wait a bit for the dev server to be ready	then run Lighthouse against 
# the proxied site
# Parse the HTML report from Lighthouse
concurrently --kill-others --success first --raw \
	'npm run dev' \
	'chrome-debug --allow-insecure-localhost' \
	'sleep 40 && lighthouse \
		--skip-autolaunch \
		--output=html \
		--output-path=./lighthouse/audit-local.html \
		https://localhost'

node ./lighthouse/check-score.js
