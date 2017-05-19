#!/bin/bash -eu
set -o pipefail
set -o nounset

# This script starts the local dev server if the current git branch is not master.
if git rev-parse ; then
    # Get the current branch on CircleCI or local
    CURRENT_BRANCH=${CIRCLE_BRANCH:-$(git branch | grep "*" | awk '{ print $2 }')}
else
    CURRENT_BRANCH=develop
fi

# Start preview if branch is not master.
if [ "$CURRENT_BRANCH" != "master" ]; then
    echo "Running tests against local build."
    # Kill background processes when this script exits.
    trap 'kill $(jobs -p)' EXIT
    export ACTIVE_PROFILE=local
    echo "Running Test Server."
    npm run prod:build
    npm run test:server
else
    echo "On production branch, test server not needed."
    export ACTIVE_PROFILE=production
fi
