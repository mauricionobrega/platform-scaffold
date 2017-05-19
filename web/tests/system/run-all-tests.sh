#!/bin/bash -eu
set -o pipefail
set -o nounset

#If the node total is 1, run all the tests sequentially. 
if [ $CIRCLE_NODE_TOTAL -eq 1 ]; then
  echo 'Running lint'
  npm run lint
  echo 'Running Unit Tests'
  npm test -- --runInBand
  echo 'Running Lighthouse Tests'
  npm run test:pwa-ci
  echo 'Running End to End Tests'
  npm run test:e2e

else
  #If the node total is greater than 1 
  if [ $CIRCLE_NODE_TOTAL -gt 1 ]; then
    echo $CIRCLE_NODE_TOTAL 'Circle CI nodes. Running tests in parallel.'
    echo 'This is Circle CI node' $CIRCLE_NODE_INDEX'.'

    #Assign the first node to running lighthouse Tests
    if [ $CIRCLE_NODE_INDEX -eq 0 ]; then
      echo 'Running Lighthouse Test'
      npm run test:pwa-ci
    fi

    # The other cirlce_node_index worker will run the rest of the tests
    if [ $CIRCLE_NODE_INDEX -gt 0 ]; then
      echo 'Running Lint'
      npm run lint
    
      echo 'Running Unit Tests'
      npm test -- --runInBand
    
      echo 'Running End to End Tests'
      #If we have nodes > 2, it will be part of the division to run another test:e2e
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
