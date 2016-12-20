#!/bin/bash -eu
set -o pipefail
set -o nounset

# Run automated system tests to verify that checkout still works.

# This script starts the local dev server if the current branch is not master.
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
    while ! echo exit | nc localhost 8443; do sleep 20; done
else
    echo "Running tests against production"
    export ACTIVE_PROFILE=production
fi

# Run the tests to verify that checkout flow still works.
# Finds all test files to distribute evenly among machines for parallelism
if [[  -z "${VALUE}" ]]; then
    npm run test:e2e
else
  testfiles=$(find ./tests/system/workflows/ -name '*.js'| sort | awk "NR % ${CIRCLE_NODE_TOTAL} == ${CIRCLE_NODE_INDEX}")
  if [ -z "$testfiles" ]
  then
      echo "more parallelism than tests"
  else
      npm run test:e2e --tests $testfiles
  fi
fi
