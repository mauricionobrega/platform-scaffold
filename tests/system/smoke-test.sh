#!/bin/bash -eu
set -o pipefail

# Run automated system tests to verify that checkout still works.

# This script starts grunt preview if the current branch is not master.
# The ACTIVE_PROFILE environment variable defines which testing environment
# should be used in tests/system/site.js.

# If the project is not using git, assume we want to test the local build.

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
    while ! echo exit | nc localhost 8443; do sleep 5; done
else
    echo "Running tests against production"
    export ACTIVE_PROFILE=production
fi

# Run the tests to verify that checkout flow still works.
npm run nightwatch
