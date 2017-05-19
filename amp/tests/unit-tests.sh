#!/bin/bash -eu
set -o pipefail
set -o nounset

# The follow makes sure all the processes spawned by 'npm run dev:serve' get cleaned up on exit
trap "kill 0" EXIT

webpack
npm run dev:serve > /dev/null 2>&1 &

# dev:serve needs a second to be ready
sleep 1s

mocha tests/unit --compilers js:babel-core/register
