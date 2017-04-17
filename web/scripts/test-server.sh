#!/usr/bin/env bash
# Start test server on build folder

http-server --ssl --cors --p=8443 \
	--key lighthouse/server.pem --cert lighthouse/server.pem build
