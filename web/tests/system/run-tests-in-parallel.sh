#!/bin/bash -eu
set -o pipefail
set -o nounset


# if git rev-parse ; then
#     # Get the current branch on CircleCI or local
#     CURRENT_BRANCH=${CIRCLE_BRANCH:-$(git branch | grep "*" | awk '{ print $2 }')}
# else
#     CURRENT_BRANCH=develop
# fi

# # Start preview if branch is not master.
# if [ "$CURRENT_BRANCH" != "master" ]; then
#     echo "Running tests against local build"
#     # Kill background processes when this script exits.
#     trap 'kill $(jobs -p)' EXIT > /dev/null 2>&1
#     export ACTIVE_PROFILE=local
#     npm run prod:build
#     npm run test:server > /dev/null 2>&1 &
# else
#     echo "Running tests against production"
#     export ACTIVE_PROFILE=production
# fi

if [ $CIRCLE_NODE_TOTAL -eq 1 ]; then
  echo 'Running Lint'
  # ESLint
  npm run lint
  npm run test:e2e --test tests/system/workflows/
else
  if [ $CIRCLE_NODE_INDEX -eq 0 ]; then
    echo 'Running Lint'
    # ESLint
    npm run lint
    npm run -- --runInBand
    npm run test:pwa-ci
  fi
fi
