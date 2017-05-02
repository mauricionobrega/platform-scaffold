#!/bin/bash -eu
set -o pipefail
set -o nounset


if git rev-parse ; then
    # Get the current branch on CircleCI or local
    CURRENT_BRANCH=${CIRCLE_BRANCH:-$(git branch | grep "*" | awk '{ print $2 }')}
else
    CURRENT_BRANCH=develop
fi

# Start preview if branch is not master.
if [ "$CURRENT_BRANCH" != "master" ]; then
    echo "Running tests against local build"
    # Kill background processes when this script exits.
    trap 'kill $(jobs -p)' EXIT
    export ACTIVE_PROFILE=local
    npm run dev &
    while ! echo exit | nc -z localhost 8443; do sleep 20; done
else
    echo "Running tests against production"
    export ACTIVE_PROFILE=production
fi