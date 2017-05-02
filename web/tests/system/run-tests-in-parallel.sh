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
    trap 'kill $(jobs -p)' EXIT > /dev/null 2>&1
    export ACTIVE_PROFILE=local
    npm run prod:build
    npm run test:server > /dev/null 2>&1 &
else
    echo "Running tests against production"
    export ACTIVE_PROFILE=production
fi

if [ $CIRCLE_NODE_TOTAL -eq 1 ]; then
  echo 'Running Lint'
  # ESLint
  npm run lint
  npm test -- --runInBand
  npm run test:pwa-ci
else
  if [ $CIRCLE_NODE_INDEX -eq 0 ]; then
    echo 'Running Lint'
    # ESLint
    npm run lint
    npm test -- --runInBand
    npm run test:pwa-ci
  fi

  #If the node total is greater than 1 assign the first node to lint. Divy up the remaining tests.
  if [ $CIRCLE_NODE_TOTAL -gt 1 ]; then
    echo $CIRCLE_NODE_TOTAL 'Circle CI nodes. Running tests in parallel.'
    echo 'This is Circle CI node' $CIRCLE_NODE_INDEX'.'
    # The other cirlce_node_index workers should divide up the tests
    if [ $CIRCLE_NODE_INDEX -ge 0 ]; then
      i=0
      for testfile in $(find ./tests/system/workflows/ -name '*.js'| sort); do
        if [ $(expr $i % $(expr $CIRCLE_NODE_TOTAL - 1)) -eq $(expr $CIRCLE_NODE_INDEX - 1) ]; then
          echo 'Running test: ' ${testfile}
          npm run test:e2e --test ${testfile}
        fi
        ((i=i+1))
      done
    fi
  fi
fi
