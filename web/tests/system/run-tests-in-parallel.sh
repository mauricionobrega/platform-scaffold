#!/bin/bash -eu
set -o pipefail
set -o nounset



if [ $CIRCLE_NODE_TOTAL -eq 1 ]; then
  echo 'Running Lint'
  npm run lint
  npm test -- --runInBand
  npm run test:pwa-ci
  npm run test:e2e

else
  if [ $CIRCLE_NODE_INDEX -eq 0 ]; then
    echo 'Running Lint'
    npm run lint

    echo 'Running Unit Tests'
    npm test -- --runInBand

    echo 'Running Lighthouse Test'
    npm run test:pwa-ci
  fi

  #If the node total is greater than 1 assign the first node to lint. Divy up the remaining tests.
  if [ $CIRCLE_NODE_TOTAL -gt 1 ]; then
    echo $CIRCLE_NODE_TOTAL 'Circle CI nodes. Running tests in parallel.'
    echo 'This is Circle CI node' $CIRCLE_NODE_INDEX'.'
    sh ./start-test-server.sh


    # The other cirlce_node_index workbers should divide up the tests
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
